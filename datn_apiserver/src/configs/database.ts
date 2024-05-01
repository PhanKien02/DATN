import "dotenv/config";
import path from "path";
import { Sequelize } from "sequelize-typescript";
export const database = new Sequelize({
    dialect: "mysql",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    storage: ":memory:",
    models: [path.resolve("./src/domain/*.ts")],
    repositoryMode: true,
    logging: false,
});
