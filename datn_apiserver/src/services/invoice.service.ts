import { Op, where } from "sequelize";
import invoiceRepository from "../repositories/invoiceRepository";
import bookingRepository from "../repositories/bookingRepository";
import userRepository from "../repositories/userRepository";
import unitPriceRepository from "../repositories/unitPriceRepository";
import promotionRepository from "../repositories/promotionRepository";
import imageRepository from "../repositories/imageRepository";

class InvoiceService {
    async getAllInvoice(page: number, limit: number, search?: string) {
        const filter = {};
        if (search)
            filter["where"] = {
                fullName: {
                    [Op.like]: `%${search}%`,
                },
            };
        const [totalInvoice, invoices] = await Promise.all([
            invoiceRepository.findAll(),
            invoiceRepository.findAll({
                include: [
                    {
                        model: bookingRepository,
                        include: [
                            {
                                model: userRepository,
                                association: "customer",
                                as: "customer",
                                where: filter,
                            },
                            {
                                model: userRepository,
                                association: "driver",
                                as: "driver",
                                where: filter,
                            },
                            unitPriceRepository,
                            promotionRepository,
                            imageRepository,
                        ],
                    },
                ],
                limit: limit,
                offset: (page - 1) * limit,
            }),
        ]);
        return {
            invoices,
            page,
            limit,
            total: Math.ceil(totalInvoice.length / limit),
        };
    }
}
export default new InvoiceService();
