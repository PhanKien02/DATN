import { Op } from "sequelize";
import { database } from "../configs/database";
import { BookingStatus } from "../domain/Enums/booking";
import bookingRepository from "../repositories/bookingRepository";
import invoiceRepository from "../repositories/invoiceRepository";
import { BookingPayLoad } from "../types/booking";
import { BadRequestError } from "../utils/httpErrors";
import userRepository from "../repositories/userRepository";
import unitPriceRepository from "../repositories/unitPriceRepository";
import promotionRepository from "../repositories/promotionRepository";

class BookingService {
    async booking(booking: BookingPayLoad) {
        console.log({ booking });

        const t = await database.transaction();
        const newBooking = await bookingRepository.create({
            ...booking,
            statused: BookingStatus.FIND_DRIVER,
            date: new Date(),
        });
        if (booking.paymentStatus === true) {
            await invoiceRepository
                .create({
                    bookingId: newBooking.toJSON().id,
                    totalCost: booking.totalPayment,
                    paymentMethod: booking.paymentMethod,
                    date: new Date(),
                    cashier: "Chuyển Khoản",
                })
                .catch(() => t.rollback());
        }
        await t.commit();
        return newBooking;
    }

    async cacelBooking(bookingId: number, cancelReason: string) {
        const booking = await bookingRepository.findOne({
            where: {
                id: bookingId,
            },
        });
        if (!booking) throw new BadRequestError("Đơn Hàng Không Tồn Tại");
        else
            return await bookingRepository.update(
                {
                    statused: BookingStatus.CANCELLED,
                    cancelReason: cancelReason,
                },
                {
                    where: {
                        id: bookingId,
                    },
                }
            );
    }

    async getAllBooking(page: number, limit: number, search?: string) {
        const query = {};
        if (search)
            query["where"] = {
                [Op.or]: [
                    {
                        fullName: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            };
        query["limit"] = limit;
        query["offset"] = (page - 1) * limit;
        const { rows, count } = await bookingRepository.findAndCountAll({
            ...query,
            include: [
                {
                    model: userRepository,
                    association: "customer",
                    as: "customer",
                },
                unitPriceRepository,
                promotionRepository,
            ],
        });

        return {
            bookings: rows,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }
}
export default new BookingService();
