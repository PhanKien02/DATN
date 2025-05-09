import { Server } from "./server";
import morgan from "morgan";
import dotenv from "dotenv";
import { database } from "./configs/database";
var admin = require("firebase-admin");
import path from "path";

var serviceAccount = require("../firebase-adminsdk.json");
dotenv.config({
    path: ".env",
});
export class Application {
    server: Server;
    init() {
        this.initServer();
    }

    private initServer() {
        this.server = new Server();
        this.server.app.use(morgan("common"));
        database
            .sync()
            .then((res) => {
                console.log("conect db success");
            })
            .catch((err) => {
                console.log("connect db error:", err);
            });
        database.addModels([path.resolve("./src/domain/*.ts")]);

        //firebase
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: "datn-44ee0",
        });
    }

    async start() {
        ((port = process.env.APP_PORT || 3000) => {
            this.server.app.listen(port, () =>
                console.log(`> Listening on port ${port}`)
            );
            this.server.app.use("/api", this.server.router);
        })();
    }
}
