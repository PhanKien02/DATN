import { database } from "../configs/database";
import { BookingStatus } from "../domain/Enums/booking";
import bookingRepository from "../repositories/bookingRepository";
import invoiceRepository from "../repositories/invoiceRepository";
import { BookingPayLoad } from "../types/booking";
import { BadRequestError } from "../utils/httpErrors";

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
}
export default new BookingService();
