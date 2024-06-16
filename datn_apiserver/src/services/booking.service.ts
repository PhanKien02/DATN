import { Op, where } from "sequelize";
import { database } from "../configs/database";
import { BookingStatus } from "../domain/Enums/booking";
import bookingRepository from "../repositories/bookingRepository";
import invoiceRepository from "../repositories/invoiceRepository";
import { BookingPayLoad } from "../types/booking";
import { BadRequestError } from "../utils/httpErrors";
import userRepository from "../repositories/userRepository";
import unitPriceRepository from "../repositories/unitPriceRepository";
import promotionRepository from "../repositories/promotionRepository";
import notificatioinService from "./notificatioin.service";
import { User } from "../utils/user";
import { UserRoles } from "../domain/Enums/userRoles";
import authorityRepository from "../repositories/authorityRepository";
import { StatusDriver } from "../constants/statusDriver";

class BookingService {
    async booking(user: User, booking: BookingPayLoad) {
        const t = await database.transaction();
        console.log({ booking });

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
        const admins = await userRepository.findAll({
            include: [
                {
                    model: authorityRepository,
                    where: {
                        name: UserRoles.ADMIN,
                    },
                },
            ],
        });
        const fcmIds = admins.map((admin) => admin.toJSON().id);
        await notificatioinService.pushNotification(
            fcmIds,
            "Lượt Đặt Mới",
            "Có Lượt Đặt Hàng Mới Vui Lòng Kiểm Tra",
            {
                bookingId: newBooking.id.toString(),
            }
        );
        await t.commit();
        return newBooking;
    }

    async cacelBooking(user: User, bookingId: number, cancelReason: string) {
        const booking = await bookingRepository.findOne({
            where: {
                id: bookingId,
            },
            include: [
                {
                    model: userRepository,
                    as: "driver",
                    foreignKey: "driverId",
                },
            ],
        });
        if (!booking) throw new BadRequestError("Đơn Hàng Không Tồn Tại");
        else {
            await bookingRepository.update(
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
            const admins = await userRepository.findAll({
                include: [
                    {
                        model: authorityRepository,
                        where: {
                            name: UserRoles.ADMIN,
                        },
                    },
                ],
            });

            const adminIds = admins.map((admin) => admin.toJSON().id);
            await notificatioinService.pushNotification(
                adminIds,
                "Hủy Đơn Hàng",
                `${booking.toJSON().driver.fullName} Đã Hủy Đơn Hàng`,
                {
                    bookingId: booking.id.toString(),
                }
            );
        }
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
            order: [["createdDate", "DESC"]],
        });

        return {
            bookings: rows,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }

    async assignDriver(id: number, driverId: number) {
        const booking = await bookingRepository.findByPk(id);
        if (!booking)
            throw new BadRequestError("Có Lỗi Hệ Thống Vui Lòng Thử Lại Sau");
        const driver = await userRepository.findOne({
            where: {
                id: driverId,
                statusDriver: StatusDriver.FREE,
            },
        });
        if (!driver) throw new BadRequestError("Tài Xế Không Phù Hợp");
        await bookingRepository.update(
            {
                driverId: driverId,
                statused: BookingStatus.WAIT_FOR_CONFIRMATION,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        await notificatioinService.pushNotification(
            [driver.dataValues.id],
            "Đơn Hàng Mới",
            `Bạn Có Cuốc Mới Đi Đến ${booking.dataValues.destinationAddress}`,
            { bookingId: `${booking.id}` }
        );
    }

    async rejectBooking(idBooking: number, driverId: number) {
        console.log({ idBooking, driverId });

        const booking = await bookingRepository.findByPk(idBooking);
        if (!booking)
            throw new BadRequestError("Có Lỗi Hệ Thống Vui Lòng Thử Lại Sau");
        await bookingRepository.update(
            {
                statused: BookingStatus.DRIVER_REJECT,
            },
            {
                where: {
                    id: idBooking,
                },
            }
        );
        const admins = await userRepository.findAll({
            include: [
                {
                    model: authorityRepository,
                    where: {
                        name: UserRoles.ADMIN,
                    },
                },
            ],
        });

        const adminIds = admins.map((admin) => admin.toJSON().id);
        const driver = await userRepository.findByPk(driverId);

        await notificatioinService.pushNotification(
            adminIds,
            "Hủy Cuốc",
            `${driver.dataValues.fullName} Đã Từ Chối Nhận Cuốc`
        );
    }

    async getBookingById(bkId: number) {
        const booking = await bookingRepository.findOne({
            where: {
                id: bkId,
            },
            include: [
                {
                    model: userRepository,
                    as: "customer",
                },
            ],
        });
        if (!booking) throw new BadRequestError("Cuốc Xe Không Tồn Tại");
        else return booking;
    }

    async acceptBooking(bookingId: number, driverId: number) {
        const t = await database.transaction();
        const booking = await bookingRepository.findOne({
            where: {
                id: bookingId,
            },
            include: [
                {
                    model: userRepository,
                    as: "customer",
                },
            ],
        });
        if (!booking) throw new BadRequestError("Cuốc Xe Không Tồn Tại");
        Promise.all([
            bookingRepository.update(
                {
                    statused: BookingStatus.DRIVER_ACCEPTED,
                },
                {
                    where: {
                        id: bookingId,
                    },
                }
            ),
            userRepository.update(
                {
                    statusDriver: StatusDriver.MOVING,
                },
                {
                    where: {
                        id: driverId,
                    },
                }
            ),
        ]).then(() => t.commit());
        const admins = await userRepository.findAll({
            include: [
                {
                    model: authorityRepository,
                    where: {
                        name: UserRoles.ADMIN,
                    },
                },
            ],
        });
        console.log("cus", booking.dataValues.customer);

        const fcmIds = admins
            .map((admin) => admin.toJSON().id)
            .concat([booking.dataValues.customer.id]);
        await notificatioinService.pushNotification(
            fcmIds,
            "Thông Báo Đơn Hàng",
            "Tài Xế Đã Chấp Nhận Đơn Hàng",
            {
                bookingId: bookingId.toString(),
            }
        );
    }
}
export default new BookingService();
