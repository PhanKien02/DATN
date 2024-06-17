import { IBooking } from "./booking";

export interface IInvoice {
     id: number;

     totalCost: number;

     cashier: string;

     paymentMethod: string;

     date: Date;

     bookingId: number;

     booking: IBooking;

     // income: Income;

     // incomeId: number;
}
