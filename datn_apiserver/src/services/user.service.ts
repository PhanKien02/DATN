import "dotenv/config";
import userRepository from "../repositories/userRepository";
import { compare } from "bcryptjs";
import { BadRequestError, NotFoundError } from "../utils/httpErrors";
import { signToken } from "../utils/auth/jwt";
import { Login, UserPayLoad, UserResponse } from "../types/User";
import { Op } from "sequelize";
import { tranformModel } from "./helper/tranformModelToObject";
import authorityRepository from "../repositories/authorityRepository";
import { database } from "../configs/database";
import { genKeyActive } from "../utils/auth/genKeyActive";
import mailService from "./mail.service";
import { mailActive } from "../utils/mailTemplate/mailActive";
import { User } from "../utils/user";
import wardRepository from "../repositories/wardRepository";
import districtsRepository from "../repositories/districtsRepository";
import provinceRepository from "../repositories/provinceRepository";

class userService {
    async signUp(newUser: UserPayLoad) {
        console.log({ newUser });

        const checkEmail = await userRepository.findOne({
            where: {
                email: newUser.email,
            },
        });
        if (checkEmail) throw new BadRequestError("Email Đã Tồn Tại");
        const role = await authorityRepository.findOne({
            where: {
                name: newUser.roleName,
            },
        });
        if (!role) throw new BadRequestError("Role Không tồn tại");
        const t = await database.transaction();
        try {
            const otp = genKeyActive();

            const user = await userRepository.create({
                ...newUser,
                activated: false,
                roleId: role.toJSON().id,
                activeKey: otp,
            });
            await mailService.sendmail(
                newUser.email,
                "Active Accout",
                mailActive(newUser.fullName, otp)
            );
            t.commit();
            return user;
        } catch (error) {
            t.rollback();
            throw new BadRequestError("Đăng Ký Người Dùng Thất Bại");
        }
    }
    async login(login: Login) {
        const user = await userRepository.findOne({
            where: {
                email: login.email,
                activated: true,
            },
            nest: true,
        });

        if (!user)
            throw new BadRequestError("Email Hoặc Mật Khẩu Không Chính Xác");
        const checkPassword = await compare(
            login.password,
            user.toJSON().password
        );
        console.log({ checkPassword });

        if (!checkPassword)
            throw new BadRequestError("Email Hoặc Mật Khẩu Không Chính Xác");
        const token = signToken({
            userId: user["id"],
            roleId: user["roleId"],
            email: user["email"],
            fullName: user["fullName"],
        });
        return {
            token: token,
            user: user,
        };
    }
    async createStaff(user: User, payload: UserPayLoad) {
        const checkEmail = await userRepository.findOne({
            where: {
                email: payload.email,
            },
        });
        if (checkEmail) throw new BadRequestError("Email Đã Tồn Tại");
        const checkPhone = await userRepository.findOne({
            where: {
                phone: payload.phone,
            },
        });
        const role = await authorityRepository.findOne({
            where: {
                name: "ADMIN",
            },
        });
        if (checkPhone) throw new BadRequestError("Số Điện Thoại Đã Tồn Tại");
        const newUser = await userRepository.create({
            ...payload,
            password: "123456",
            activated: true,
            roleId: role.id,
            createdBy: user.userId,
        });
        return newUser;
    }
    async getAllUser(
        limit: number,
        page: number,
        search?: string
    ): Promise<UserResponse> {
        const query = {};
        if (search)
            query["where"] = {
                [Op.or]: [
                    {
                        fullName: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            };
        query["limit"] = limit;
        query["offset"] = (page - 1) * limit;
        const { rows, count } = await userRepository.findAndCountAll({
            ...query,
            include: [
                {
                    model: authorityRepository,
                    attributes: ["name"],
                },
                {
                    model: wardRepository,
                    include: [
                        {
                            model: districtsRepository,
                            include: [
                                {
                                    model: provinceRepository,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        let users = tranformModel(rows);
        users = users.map((user) => {
            return {
                ...user,
                role: user.role.name,
                districtId: user?.ward?.district?.id,
                provinceId: user?.ward?.district?.province?.id,
            };
        });

        return {
            users: users,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }
    async updateStaff(user: User, userUpdate: UserPayLoad) {
        const userForUpdate = await userRepository.findByPk(userUpdate.id);
        console.log({ ward: userUpdate.wardId });
        if (!userForUpdate)
            throw new BadRequestError("Nhân Viên Không Tồn Tại");
        else
            return await userRepository.update(
                {
                    updatedBy: user.userId,
                    fullName: userUpdate.fullName,
                    gender: userUpdate.gender,
                    wardId: userUpdate.wardId,
                    dob: userUpdate.dob,
                    email: userUpdate.email,
                    phone: userUpdate.phone,
                },
                {
                    where: {
                        id: userUpdate.id,
                    },
                }
            );
    }
    async blockOrActiveUser(userLogin: User, idUser: number, active: boolean) {
        const user = await userRepository.findOne({
            where: {
                id: idUser,
                activated: active,
            },
        });
        if (!user) throw new BadRequestError("User Không Tồn Tại");
        await userRepository.update(
            {
                activated: !active,
                updatedBy: userLogin.userId,
            },
            {
                where: {
                    id: idUser,
                    activated: active,
                },
            }
        );
    }
}
export default new userService();
