import userRepository from "../repositories/userRepository";
import { Request, Response } from "express";
import httpStatus from "http-status";
import authorityRepository from "../repositories/authorityRepository";
import { UserRoles } from "../domain/Enums/userRoles";

export const seederUser = async (req: Request, res: Response) => {
    await authorityRepository.bulkCreate([
        {
            name: UserRoles.ADMIN,
            description: "Role Admin",
        },
        {
            name: UserRoles.DRIVER,
            description: "Role Driver",
        },
        {
            name: UserRoles.USER,
            description: "Role User",
        },
    ]);
    await userRepository.create({
        email: "admin@gmail.com",
        password: "admin",
        roleId: 1,
        fullName: "Phan Kiên",
        gender: true,
        activated: true,
    });

    res.status(httpStatus.OK).send("OKe");
};
