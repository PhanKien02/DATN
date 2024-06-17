import { Response } from "express";
import AuthenticatedRequest from "../types/request";
import httpStatus from "http-status";
import routeDriverService from "../services/routeDriver.service";

export const trackingLocation = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { id, lat, long } = req.body;
    const result = await routeDriverService.trackingLocation(+id, +lat, +long);
    return res.status(httpStatus.OK).send(result);
};
