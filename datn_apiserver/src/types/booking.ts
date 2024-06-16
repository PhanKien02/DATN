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

    originLocaition: number;

    originAddress: string;

    originlongitude: number;

    originLatitude: number;

    destinationAddress: string;

    vehicleReceiptImage?: Image[];

    customer: User;

    customerId: number;

    promotionId: number;

    destinationLatitude: number;

    destinationLongitude: number;
}
export interface BookingPayLoad {
    customerId: number;

    originAddress: string;

    originlongitude: number;

    originLatitude: number;

    destinationAddress: string;

    paymentStatus: boolean;

    totalPayment: number;

    longDistance: number;

    promotionId: number;

    paymentMethod: string;

    unitPriceId: number;
    destinationLatitude: number;

    destinationLongitude: number;
}
