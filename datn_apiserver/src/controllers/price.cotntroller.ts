import { Response } from "express";
import AuthenticatedRequest from "../types/request";
import unitPriceService from "../services/unitPrice.service";
import httpStatus from "http-status";

export const getAllPrice = async (req: AuthenticatedRequest, res: Response) => {
    const result = await unitPriceService.getAllPrice();
    console.log({ result });

    return res.status(httpStatus.OK).send(result);
};
export const savePrice = (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const price = req.body;
    const result = unitPriceService.saveUnitPrice(user, price);
    return res.status(httpStatus.OK).send(result);
};
