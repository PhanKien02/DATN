import { BaseRouter } from "./BaseRouter";
import { getAllUser } from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";
import { getAllProvince } from "../controllers/province.controller";

/**
 * @description AuthLoginRouter
 */
class ProvinceRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(getAllProvince));
    }
}

export default new ProvinceRouter().router;
