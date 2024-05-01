import { BaseRouter } from "./BaseRouter";
import { seederUser } from "../controllers/test.controller";
import catchAsync from "../utils/catchAsync";

/**
 * @description AuthLoginRouter
 */
class TestRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(seederUser));
    }
}

export default new TestRouter().router;
