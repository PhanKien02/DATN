import httpStatus from "http-status";
import provinceService from "../services/province.service";
import AuthenticatedRequest from "../types/request";
import { Response } from "express";

export const getAllProvince = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const result = await provinceService.getProvince();
    return res.status(httpStatus.OK).send(result);
};
