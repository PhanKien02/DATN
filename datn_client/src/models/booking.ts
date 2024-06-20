import { BookingStatus } from "../constants/booking";
import { Image } from "./image";
import { IPromotion } from "./promotion";
import { IUnitPrice } from "./unitPrice";
import { IUser } from "./user.model";

export interface IBooking {
     id: number;

     date: Date;

     statused: BookingStatus.FIND_DRIVER;

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

     promotion: IPromotion;

     unitPrice: IUnitPrice;
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
}
