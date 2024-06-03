import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { veryfyToken } from "../middleware/verifyToken";
import {
    booking,
    cancelBooking,
    getAllbooking,
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
        this.router.get("/cancel", catchAsync(cancelBooking));

        this.router.use(veryfyToken);
    }
}

export default new BookingRouter().router;
