import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { trackingLocation } from "../controllers/routeDriver.controller";

/**
 * @description AuthLoginRouter
 */
class routerDriverRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.post("/", catchAsync(trackingLocation));
    }
}

export default new routerDriverRouter().router;
