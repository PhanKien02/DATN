import { Model } from "sequelize-typescript";
import { database } from "../configs/database";

export interface IPrams<T> {
    model: new () => Model<T>;
}

export abstract class Repository<T> {
    protected model: new () => Model<T>;
    constructor(params: new () => Model<T>) {
        this.model = params;
    }
    public repository() {
        return database.getRepository(this.model);
    }
}
