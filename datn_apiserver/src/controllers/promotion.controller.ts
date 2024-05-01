import httpStatus from "http-status";
import provinceService from "../services/province.service";
import AuthenticatedRequest from "../types/request";
import { Response } from "express";
import promotionService from "../services/promotion.service";

export const getALlPromotion = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const result = await promotionService.getAllPromotion();
    return res.status(httpStatus.OK).send(result);
};
