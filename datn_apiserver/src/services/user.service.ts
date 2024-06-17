import "dotenv/config";
import userRepository from "../repositories/userRepository";
import { compare } from "bcryptjs";
import { BadRequestError } from "../utils/httpErrors";
import { signToken } from "../utils/auth/jwt";
import { IUser, Login, UserPayLoad } from "../types/User";
import { Op, QueryTypes, Sequelize, where } from "sequelize";
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
import { SubjectEmail } from "../constants/email";
import { UserRoles } from "../domain/Enums/userRoles";
import routeDriverRepository from "../repositories/routeDriverRepository";
import { StatusDriver } from "../constants/statusDriver";

class userService {
    async signUp(newUser: UserPayLoad) {
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
                statusDriver:
                    newUser.roleName === UserRoles.DRIVER
                        ? StatusDriver.FREE
                        : null,
                activeKey: otp,
            });
            await mailService.sendmail(
                newUser.email,
                SubjectEmail.ACTIVE,
                mailActive(newUser.fullName, otp)
            );
            await t.commit();
            return user;
        } catch (error) {
            await t.rollback();
            throw new BadRequestError("Đăng Ký Người Dùng Thất Bại");
        }
    }
    async login(login: Login) {
        const user = await userRepository.findOne({
            where: {
                email: login.email,
            },
            include: [
                {
                    model: authorityRepository,
                    attributes: ["name"],
                },
            ],
            nest: true,
        });

        if (!user)
            throw new BadRequestError("Email Hoặc Mật Khẩu Không Chính Xác");
        const checkPassword = await compare(
            login.password,
            user.toJSON().password
        );
        if (!checkPassword)
            throw new BadRequestError("Email Hoặc Mật Khẩu Không Chính Xác");
        const token = signToken({
            userId: user["id"],
            roleId: user["roleId"],
            email: user["email"],
            fullName: user["fullName"],
        });
        if (login.fcmId)
            await userRepository.update(
                { fcmId: login.fcmId },
                {
                    where: {
                        email: login.email,
                        id: user.toJSON().id,
                    },
                }
            );
        return {
            token: token,
            user: { ...user.toJSON(), roleName: user.toJSON().role.name },
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
    async getAllUser(search?: string): Promise<IUser[]> {
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
        const { rows } = await userRepository.findAndCountAll({
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

        return users;
    }
    async updateStaff(user: User, userUpdate: UserPayLoad) {
        const userForUpdate = await userRepository.findByPk(userUpdate.id);
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

    async verifyAccout(email: string, otp: string) {
        const user = await userRepository.findOne({
            where: {
                email: email,
                activeKey: otp,
            },
            raw: true,
        });
        if (!user) throw new BadRequestError("OTP Không Đúng");
        return await userRepository.update(
            { activated: true },
            {
                where: {
                    email: email,
                    activeKey: otp,
                },
            }
        );
    }
    async resendActive(email: string) {
        const otp = genKeyActive();
        const t = await database.transaction();
        const user = await userRepository.findOne({
            where: {
                email: email,
                activated: false,
            },
        });
        if (!user) throw new BadRequestError("Email Không Tồn Tại");
        try {
            await userRepository.update(
                { activeKey: otp },
                { where: { email: email } }
            );
            await mailService.sendmail(
                email,
                SubjectEmail.ACTIVE,
                mailActive(user.toJSON().fullName, otp)
            );
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new BadRequestError("Resend OTP Thất Bại");
        }
    }
    async searchDrivingAround(lat: number, long: number) {
        let now = new Date();
        now.setMinutes(now.getMinutes() - 60 * 5);
        const later = now.toISOString().slice(0, 19).replace("T", " ");
        const drivers = await userRepository.findAll({
            include: [
                {
                    model: routeDriverRepository,
                    where: {
                        lat: {
                            [Op.between]: [lat - 0.00872, lat + 0.00872],
                        },
                        long: {
                            [Op.between]: [long - 0.00872, long + 0.00872],
                        },
                        time: {
                            [Op.gte]: later,
                        },
                    },
                },
                {
                    model: authorityRepository,
                    where: {
                        name: UserRoles.DRIVER,
                    },
                },
            ],
            where: {
                statusDriver: StatusDriver.FREE,
            },
        });
        return drivers;
    }
}
export default new userService();
