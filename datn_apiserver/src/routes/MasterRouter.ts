import { errorHandler } from "../middleware/errorHandler";
import bodyParser from "body-parser";
import cors from "cors";
import { BaseRouter } from "./BaseRouter";
import testRouter from "./TestRouter";
import authLoginRouter from "./AuthLoginRouter";
import userRouter from "./userRouter";
import provinceRouter from "./provinceRouter";
import promotionRouter from "./promotionRouter";
import unitPriceRouter from "./unitPriceRouter";
import bookingRouter from "./bookingRouter";
import { getMessaging } from "firebase-admin/messaging";

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
        this.router.use("/users", userRouter);
        this.router.use("/promotion", promotionRouter);
        this.router.use("/price", unitPriceRouter);
        this.router.use("/booking", bookingRouter);
        this.router.use(errorHandler);
        // this.router.post("/sendNotification", (req, res) => {
        //     const receivedToken =
        //         // "crv7u0jr7KgnDsc4H4yePv:APA91bEB_sp04uvNJAoUx9017qoKMZ76TAUPZTJ6lb4qrUvqTiBa4qZSTO7KB2nXPENNHjh-APD2o_x3qF7JUzAmRfgz7Mp7klYmi-U127oUoNFTJ-twGJojCpeWDgdK72HPyzCfwkOR",
        //         "dSB8u4RFTEqj4aNHWXiOd2:APA91bEAHVHy5hcI8mNFkYo3zgzF8VZ04A1fXA_LRTD5NvpTBVYmi4s-1sNY9FblxpiDWO0m4SM-w2_WExsMvEcDTZN4fOZVXQQmDA1RulxB9HJlR-pZ_RXOTD1JrZxnHR4VNP1rodPK"; // Fcm token received by front end application
        //     const message = {
        //         notification: {
        //             title: "Notification Received !",
        //             body: "Hello",
        //         },
        //         token: receivedToken,
        //     };
        //     getMessaging()
        //         .send(message)
        //         .then((response) => {
        //             res.status(200).json({
        //                 message: "Notification Sent",
        //                 token: receivedToken,
        //             });
        //             console.log(response);
        //         })

        //         .catch((error) => {
        //             res.status(400).send(error);
        //             console.log("Error sending message:", error);
        //         });
        // });
    }
}

export default new MasterRouter().router;
