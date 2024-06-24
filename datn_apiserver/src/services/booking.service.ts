import { Op, where } from "sequelize";
import { database } from "../configs/database";
import { BookingStatus, PaymentMethod } from "../domain/Enums/booking";
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
import imageRepository from "../repositories/imageRepository";

class BookingService {
    async booking(user: User, booking: BookingPayLoad) {
        const t = await database.transaction();
        const newBooking = await bookingRepository.create({
            ...booking,
            statused: BookingStatus.FIND_DRIVER,
            paymentStatus: false,
            date: new Date(),
        });
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
        const [listBooking, bookings] = await Promise.all([
            bookingRepository.findAll(),
            bookingRepository.findAll({
                ...query,
                include: [
                    {
                        model: userRepository,
                        association: "customer",
                        as: "customer",
                    },
                    {
                        model: userRepository,
                        association: "driver",
                        as: "driver",
                    },
                    unitPriceRepository,
                    promotionRepository,
                    imageRepository,
                ],
                order: [["createdDate", "DESC"]],
            }),
        ]);

        return {
            bookings: bookings,
            limit: limit,
            page: page,
            total: listBooking.length,
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
                    association: "customer",
                    as: "customer",
                },
                {
                    model: userRepository,
                    association: "driver",
                    as: "driver",
                },
                promotionRepository,
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
        if (!booking)
            throw new BadRequestError("Có Lỗi Hệ Thống Vui Lòng Thử Lại");
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
    async startMoving(idBooking: number, images: string[]) {
        const booking = await bookingRepository.findOne({
            where: {
                id: idBooking,
                statused: BookingStatus.DRIVER_ACCEPTED,
            },
        });
        if (!booking)
            throw new BadRequestError("Có Lỗi Hệ Thống Vui Lòng Thử Lại");
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
        return Promise.all([
            bookingRepository.update(
                { statused: BookingStatus.MOVING },
                { where: { id: idBooking } }
            ),
            imageRepository.bulkCreate(
                images.map((image) => {
                    return {
                        link: image,
                        bookingid: idBooking,
                    };
                })
            ),
        ]);
    }

    async completeBookinng(idBoking: number, idDriver: string) {
        const booking = await bookingRepository.findOne({
            where: {
                id: idBoking,
                statused: BookingStatus.MOVING,
                driverId: idDriver,
            },
            include: [{ model: userRepository, as: "driver" }],
        });
        if (!booking)
            throw new BadRequestError("Có Lỗi Hệ Thống Vui Lòng Thử Lại");
        const bookingData = booking.dataValues;
        if (!bookingData.paymentStatus) {
            await invoiceRepository.create({
                bookingId: bookingData.id,
                totalCost: bookingData.totalPayment,
                cashier: bookingData.driver.fullName,
                paymentMethod: PaymentMethod.CASH,
                date: new Date(),
            });
        }
        if (booking.dataValues.promotion)
            await promotionRepository.decrement(
                { amount: 1 },
                { where: { id: booking.dataValues.promotion.id } }
            );
        return await Promise.all([
            bookingRepository.update(
                {
                    statused: BookingStatus.COMPLETE,
                    paymentStatus: true,
                },
                {
                    where: {
                        id: idBoking,
                        statused: BookingStatus.MOVING,
                    },
                }
            ),
            userRepository.update(
                {
                    statusDriver: StatusDriver.FREE,
                },
                {
                    where: { id: idDriver },
                }
            ),
        ]);
    }
    async ratingBooking(bkId: number, rate: number) {
        const bk = await bookingRepository.findByPk(bkId);
        console.log({ bkId, rate });
        if (!bk) throw new BadRequestError("Chuyến Đi Không Tồn Tại");
        if (bk.dataValues.statused != BookingStatus.COMPLETE)
            throw new BadRequestError("Chuyến Đi Chưa Hoàn Thành");

        return await bookingRepository.update(
            { rate: rate },
            {
                where: {
                    id: bkId,
                },
            }
        );
    }
}
export default new BookingService();
