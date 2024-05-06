import { BaseRouter } from "./BaseRouter";
import { seederUser } from "../controllers/test.controller";
import catchAsync from "../utils/catchAsync";
import { getAllPrice, savePrice } from "../controllers/price.cotntroller";

/**
 * @description AuthLoginRouter
 */
class unitPriceRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(getAllPrice));
        this.router.post("/", catchAsync(savePrice));
    }
}

export default new unitPriceRouter().router;
