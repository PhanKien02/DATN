import { BaseRouter } from "./BaseRouter";
import { getAllUser } from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";
import {
    blockOrActivePromotion,
    getALlPromotion,
    savePromotion,
} from "../controllers/promotion.controller";

/**
 * @description AuthLoginRouter
 */
class PromotionRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(getALlPromotion));
        this.router.get("/status", catchAsync(blockOrActivePromotion));
        this.router.post("/", catchAsync(savePromotion));
    }
}

export default new PromotionRouter().router;
