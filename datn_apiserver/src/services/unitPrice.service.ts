import { Op } from "sequelize";
import unitPriceRepository from "../repositories/unitPriceRepository";
import { PricePayLoad } from "../types/UnitPrice";
import { BadRequestError } from "../utils/httpErrors";

class unitPrice {
    async saveUnitPrice(price: PricePayLoad) {
        const checkTime = unitPriceRepository.findAll({
            where: {
                [Op.or]: {
                    timeStart: {
                        [Op.between]: [price.timeStart, price.timeEnd],
                    },
                    timeEnd: { [Op.between]: [price.timeStart, price.timeEnd] },
                },
            },
        });

        const checkKm = unitPriceRepository.findAll({
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
        return await unitPriceRepository.create(price);
    }
}
export default new unitPrice();
