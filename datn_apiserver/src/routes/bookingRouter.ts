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
    rateBooking,
    rejectBooking,
    startMoving,
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
        this.router.put("/moving", catchAsync(startMoving));
        this.router.put("/complete", catchAsync(completeBooking));
        this.router.put("/rate", catchAsync(rateBooking));
    }
}

export default new BookingRouter().router;
