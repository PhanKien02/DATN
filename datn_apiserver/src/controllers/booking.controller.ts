import { Response } from "express";
import AuthenticatedRequest from "../types/request";
import httpStatus from "http-status";
import bookingService from "../services/booking.service";

export const booking = async (req: AuthenticatedRequest, res: Response) => {
    const booking = req.body.payload;
    const user = req.user;
    const result = await bookingService.booking(user, booking);
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
    const user = req.user;

    const result = await bookingService.cacelBooking(
        user,
        +id,
        cancelReason.toString()
    );
    return res.status(httpStatus.OK).send(result);
};

export const assignDriver = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { id, driver } = req.body;
    await bookingService.assignDriver(id, driver);
    return res.status(httpStatus.OK).send();
};

export const rejectBooking = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { bookingId, driverId } = req.body;
    await bookingService.rejectBooking(bookingId, driverId);
    return res.status(httpStatus.OK).send();
};

export const getBookingById = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { bookingId } = req.query;
    const response = await bookingService.getBookingById(+bookingId);
    return res.status(httpStatus.OK).send(response);
};
export const acceptBooking = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { bookingId, driverId } = req.body;
    await bookingService.acceptBooking(+bookingId, driverId);
    return res.status(httpStatus.OK).send();
};

export const startMoving = async (req: AuthenticatedRequest, res: Response) => {
    const { bookingId, images } = req.body;

    const response = await bookingService.startMoving(+bookingId, images);
    return res.status(httpStatus.OK).send(response);
};

export const completeBooking = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { bookingId, idDriver } = req.body;

    const response = await bookingService.completeBookinng(
        +bookingId,
        idDriver
    );
    return res.status(httpStatus.OK).send(response);
};

export const rateBooking = async (req: AuthenticatedRequest, res: Response) => {
    const { bookingId, rate } = req.body;
    const response = await bookingService.ratingBooking(bookingId, rate);
    return res.status(httpStatus.OK).send(response);
};
