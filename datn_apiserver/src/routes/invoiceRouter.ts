import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { veryfyToken } from "../middleware/verifyToken";
import {
    acceptBooking,
    assignDriver,
    booking,
    cancelBooking,
    completeBooking,
    getAllbooking,
    getBookingById,
    rejectBooking,
    startMoving,
} from "../controllers/booking.controller";
import { getAllInvoice } from "../controllers/invoice.controller";

/**
 * @description AuthLoginRouter
 */
class InvoiceRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(getAllInvoice));
    }
}

export default new InvoiceRouter().router;
