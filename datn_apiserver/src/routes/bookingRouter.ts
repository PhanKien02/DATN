import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { veryfyToken } from "../middleware/verifyToken";
import {
    acceptBooking,
    assignDriver,
    booking,
    cancelBooking,
    getAllbooking,
    getBookingById,
    rejectBooking,
} from "../controllers/booking.controller";

/**
 * @description AuthLoginRouter
 */
class BookingRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.post("/", catchAsync(booking));
        this.router.get("/", catchAsync(getAllbooking));
        this.router.get("/byId", catchAsync(getBookingById));
        this.router.get("/cancel", catchAsync(cancelBooking));
        this.router.put("/assign", catchAsync(assignDriver));
        this.router.put("/reject", catchAsync(rejectBooking));
        this.router.put("/accept", catchAsync(acceptBooking));
    }
}

export default new BookingRouter().router;
