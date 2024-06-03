import { BookingStatus } from "../constants/booking";
import { Image } from "./image";
import { IPromotion } from "./promotion";
import { IUser } from "./user.model";

export interface IBooking {
     id?: number;

     date: Date;

     statused: BookingStatus.FIND_DRIVER;

     cancelReason: string;

     rate: number;

     totalPayment: number;

     longDistance: number;

     paymentStatus: boolean;

     pick_up_point: string;

     dropOffPoint: string;

     vehicleReceiptImage?: Image[];

     customer: IUser;

     driver: IUser;

     driverId: number;

     customerId: number;

     promotion: IPromotion;
}
export interface BookingPayLoad {
     customerId: number;
     pick_up_point: string;
     dropOffPoint: string;
     paymentStatus: boolean;
     totalPayment: number;
     longDistance: number;
     paymentMethod: string;
     promotionId?: number;
     unitPriceId: number;
}
