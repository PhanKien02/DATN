import { BaseRouter } from "./BaseRouter";
import {
    blockOrActiveUser,
    createStaff,
    getAllUser,
    getProfile,
    searchDrivingAround,
    updateProfile,
    updateStaff,
} from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";
import { veryfyToken } from "../middleware/verifyToken";

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
        this.router.get("/driver", catchAsync(searchDrivingAround));
        this.router.use(veryfyToken);
        this.router.get("/", catchAsync(getAllUser));
        this.router.get("/profile", catchAsync(getProfile));
        this.router.put("/profile", catchAsync(updateProfile));
        this.router.post("/", catchAsync(createStaff));
        this.router.put("/", catchAsync(updateStaff));
        this.router.get("/active", catchAsync(blockOrActiveUser));
    }
}

export default new UserRouter().router;
