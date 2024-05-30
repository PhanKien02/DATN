import { User } from "../utils/user";
import { Image } from "./image";

export interface IBooking {
    id?: number;

    date: Date;

    statused: string;

    cancelReason: string;

    rate: number;

    totalPayment: number;

    longDistance: number;

    paymentStatus: boolean;

    pick_up_point: string;

    dropOffPoint: string;

    vehicleReceiptImage?: Image[];

    customer: User;

    customerId: number;

    promotionId: number;
}
export interface BookingPayLoad {
    customerId: number;

    pick_up_point: string;

    dropOffPoint: string;

    paymentStatus: boolean;

    totalPayment: number;

    longDistance: number;

    promotionId: number;

    paymentMethod: string;

    unitPriceId: number;
}
