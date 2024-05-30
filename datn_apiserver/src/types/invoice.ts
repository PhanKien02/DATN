import { PaymentMethod } from "../domain/Enums/booking";
import Booking from "../domain/booking.entity";

export interface Invoce {
    id: number;

    totalCost: number;

    cashier: string;

    paymentMethod: PaymentMethod;

    date: Date;

    bookingId: number;

    booking?: Booking;
}
