import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import {
    blockOrActivePromotion,
    getALlPromotion,
    getPromotionByCondition,
    savePromotion,
} from "../controllers/promotion.controller";
import { veryfyToken } from "../middleware/verifyToken";

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
        this.router.get("/bykm", catchAsync(getPromotionByCondition));
        this.router.use(veryfyToken);
        this.router.get("/", catchAsync(getALlPromotion));
        this.router.get("/status", catchAsync(blockOrActivePromotion));
        this.router.post("/", catchAsync(savePromotion));
    }
}

export default new PromotionRouter().router;
