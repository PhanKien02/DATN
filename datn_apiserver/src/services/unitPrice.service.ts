import { Op } from "sequelize";
import unitPriceRepository from "../repositories/unitPriceRepository";
import { PricePayLoad } from "../types/UnitPrice";
import { BadRequestError } from "../utils/httpErrors";
import { User } from "../utils/user";

class unitPrice {
    async saveUnitPrice(user: User, price: PricePayLoad) {
        const checkTime = await unitPriceRepository.findOne({
            where: {
                [Op.or]: {
                    timeStart: {
                        [Op.between]: [price.timeStart, price.timeEnd],
                    },
                    timeEnd: { [Op.between]: [price.timeStart, price.timeEnd] },
                },
            },
        });
        if (checkTime) throw new BadRequestError("Thời gian không hợp lệ");
        if (price.id) {
            const unitPriceForUpdate = await unitPriceRepository.findByPk(
                price.id
            );
            if (!unitPriceForUpdate)
                throw new BadRequestError("Unit Price Không Tồn Tại");
            else {
                if (
                    price.presentPrice !==
                    unitPriceForUpdate.toJSON().presentPrice
                ) {
                    await unitPriceRepository.update(
                        {
                            ...price,
                            pastPrice: unitPriceForUpdate.toJSON().presentPrice,
                            updatedBy: user.userId,
                        },
                        {
                            where: {
                                id: price.id,
                            },
                        }
                    );
                } else {
                    await unitPriceRepository.update(
                        { ...price, updatedBy: user.userId },
                        {
                            where: {
                                id: price.id,
                            },
                        }
                    );
                }
            }
        } else
            return await unitPriceRepository.create({
                ...price,
                createdBy: user.userId,
            });
    }
    async getAllPrice() {
        return await unitPriceRepository.findAll();
    }

    async getPriceByTime() {
        const jsDate = new Date();
        const hours = String(jsDate.getHours()).padStart(2, "0");
        const minutes = String(jsDate.getMinutes()).padStart(2, "0");
        const seconds = String(jsDate.getSeconds()).padStart(2, "0");
        const mytime = `${hours}:${minutes}:${seconds}`;

        return await unitPriceRepository.findOne({
            where: {
                timeStart: {
                    [Op.lte]: mytime,
                },
                timeEnd: {
                    [Op.gte]: mytime,
                },
            },
        });
    }
}
export default new unitPrice();
