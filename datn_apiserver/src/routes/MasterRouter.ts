import { errorHandler } from "../middleware/errorHandler";
import bodyParser from "body-parser";
import cors from "cors";
import { BaseRouter } from "./BaseRouter";
import testRouter from "./TestRouter";
import authLoginRouter from "./AuthLoginRouter";
import userRouter from "./userRouter";
import provinceRouter from "./provinceRouter";
import promotionRouter from "./promotionRouter";
import { veryfyToken } from "../middleware/verifyToken";

class MasterRouter extends BaseRouter {
    constructor() {
        super();
        this.configure();
        this.init();
    }

    private configure() {
        // define onfigurations
        this.router.use(cors());
        this.router.use(bodyParser.json()); // to support JSON-encoded bodies
        this.router.use(
            bodyParser.urlencoded({
                // to support URL-encoded bodies
                extended: true,
            })
        );
    }

    /**
     * Connect routes to their matching routers.
     */
    protected init() {
        this.router.use("/authenticate", authLoginRouter);
        this.router.use("/test", testRouter);
        this.router.use("/province", provinceRouter);
        this.router.use(veryfyToken);
        this.router.use("/users", userRouter);
        this.router.use("/promotion", promotionRouter);
        this.router.use(errorHandler);
    }
}

export default new MasterRouter().router;
