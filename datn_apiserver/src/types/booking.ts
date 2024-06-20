import { User } from "../utils/user";
import { IUser } from "./User";
import { Image } from "./image";
import { IPromotion } from "./promotion";

export interface IBooking {
    id: number;

    date: Date;

    statused: string;

    cancelReason: string;

    rate: number;

    totalPayment: number;

    longDistance: number;

    paymentStatus: boolean;

    originAddress: string;

    originlongitude: number;

    originLatitude: number;

    destinationAddress: string;

    vehicleReceiptImage?: Image[];

    customer: IUser;

    driver: IUser;

    driverId: number;

    customerId: number;

    promotion?: IPromotion;
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
