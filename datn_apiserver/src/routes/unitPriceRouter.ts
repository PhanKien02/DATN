import { BaseRouter } from "./BaseRouter";
import { seederUser } from "../controllers/test.controller";
import catchAsync from "../utils/catchAsync";
import {
    getAllPrice,
    getPrice,
    savePrice,
} from "../controllers/price.cotntroller";
import { veryfyToken } from "../middleware/verifyToken";

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
        this.router.get("/time", catchAsync(getPrice));
        this.router.use(veryfyToken);
        this.router.get("/", catchAsync(getAllPrice));
        this.router.post("/", catchAsync(savePrice));
    }
}

export default new unitPriceRouter().router;
