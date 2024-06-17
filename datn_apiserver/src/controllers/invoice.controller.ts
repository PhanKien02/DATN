import { Response } from "express";
import AuthenticatedRequest from "../types/request";
import unitPriceService from "../services/unitPrice.service";
import httpStatus from "http-status";
import invoiceService from "../services/invoice.service";

export const getAllInvoice = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { page, limit, search } = req.query;
    const result = await invoiceService.getAllInvoice(
        +page,
        +limit,
        search.toString()
    );

    return res.status(httpStatus.OK).send(result);
};
