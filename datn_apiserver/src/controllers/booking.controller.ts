import { Response } from "express";
import AuthenticatedRequest from "../types/request";
import httpStatus from "http-status";
import bookingService from "../services/booking.service";

export const booking = async (req: AuthenticatedRequest, res: Response) => {
    const booking = req.body.payload;
    console.log(req.body);

    const result = await bookingService.booking(booking);
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
