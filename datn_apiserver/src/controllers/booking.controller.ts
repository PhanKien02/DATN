import { Response } from "express";
import AuthenticatedRequest from "../types/request";
import httpStatus from "http-status";
import bookingService from "../services/booking.service";

export const booking = async (req: AuthenticatedRequest, res: Response) => {
    const booking = req.body.payload;

    const result = await bookingService.booking(booking);
    return res.status(httpStatus.OK).send(result);
};
export const getAllbooking = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const limit = req.query.limit ?? 10;
    const page = req.query.page ?? 1;
    const search = req.query.search as string;

    const result = await bookingService.getAllBooking(+page, +limit, search);
    return res.status(httpStatus.OK).send(result);
};

export const cancelBooking = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { id, cancelReason } = req.query;
    console.log(req.query);

    const result = await bookingService.cacelBooking(
        +id,
        cancelReason.toString()
    );
    return res.status(httpStatus.OK).send(result);
};
9;
