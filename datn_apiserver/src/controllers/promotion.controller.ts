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

export const savePromotion = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const promotion = req.body;
    const user = req.user;
    const result = promotionService.savePromotion(user, promotion);
    res.status(httpStatus.OK).send(result);
};
export const blockOrActivePromotion = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const promotionId = req.query.promotionId;
    const status = req.query.status;
    const user = req.user;
    const result = promotionService.blockOrActivePromotion(
        user,
        +promotionId,
        status == "true" ? true : false
    );
    res.status(httpStatus.OK).send(result);
};
export const getPromotionByCondition = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const km = req.query.km;
    const result = await promotionService.getPromotionByCondition(+km);
    res.status(httpStatus.OK).send(result);
};
