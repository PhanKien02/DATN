import { Model } from "sequelize-typescript";

export const tranformModel = (models: Model[]) => {
    return models.map((model) => {
        return model.toJSON();
    });
};
