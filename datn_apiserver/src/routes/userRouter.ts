import { BaseRouter } from "./BaseRouter";
import {
    blockOrActiveUser,
    createStaff,
    getAllUser,
    updateStaff,
} from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";

/**
 * @description AuthLoginRouter
 */
class UserRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(getAllUser));
        this.router.post("/", catchAsync(createStaff));
        this.router.put("/", catchAsync(updateStaff));
        this.router.get("/active", catchAsync(blockOrActiveUser));
    }
}

export default new UserRouter().router;
