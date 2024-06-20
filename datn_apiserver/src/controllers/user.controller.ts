import { Request, Response } from "express";
import AuthenticatedRequest from "../types/request";
import userService from "../services/user.service";
import httpStatus from "http-status";

export const signUp = async (req: Request, res: Response) => {
    const newUser = req.body;
    const result = await userService.signUp(newUser);
    return res.status(httpStatus.OK).send(result);
};
export const createStaff = async (req: AuthenticatedRequest, res: Response) => {
    const newUser = req.body;
    const user = req.user;
    const result = await userService.createStaff(user, newUser);
    return res.status(httpStatus.OK).send(result);
};

export const login = async (req: Request, res: Response) => {
    const login = req.body;
    const result = await userService.login(login);
    return res.status(httpStatus.OK).send(result);
};

export const getAllUser = async (req: AuthenticatedRequest, res: Response) => {
    const search = req.query.search as string;
    const result = await userService.getAllUser(search);

    return res.status(httpStatus.OK).send(result);
};
export const updateStaff = async (req: AuthenticatedRequest, res: Response) => {
    const userUpdate = req.body;
    const user = req.user;
    await userService.updateStaff(user, userUpdate);
    return res.status(httpStatus.OK).send("OK");
};
export const blockOrActiveUser = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const user = req.user;
    const userId = req.query.userId;
    const active = req.query.isActive as string;
    await userService.blockOrActiveUser(
        user,
        +userId,
        active === "true" ? true : false
    );
    return res.status(httpStatus.OK).send("OK");
};

export const verifyAccout = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const email = req.query.email as string;
    const otp = req.query.otp as string;
    const response = await userService.verifyAccout(email, otp);
    return res.status(httpStatus.OK).send(response);
};

export const resendEmail = async (req: AuthenticatedRequest, res: Response) => {
    const email = req.query.email as string;
    const response = await userService.resendActive(email);
    return res.status(httpStatus.OK).send(response);
};

export const searchDrivingAround = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { lat, long } = req.query;
    const response = await userService.searchDrivingAround(+lat, +long);
    return res.status(httpStatus.OK).send(response);
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const response = await userService.getProfile(user);
    return res.status(httpStatus.OK).send(response);
};
export const updateProfile = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const profile = req.body.profile;

    await userService.updateProfile(profile);
    return res.status(httpStatus.OK).send();
};
