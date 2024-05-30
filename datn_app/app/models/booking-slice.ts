import {createSlice} from '@reduxjs/toolkit';
import {Image} from '../interface/image';
import {IUser} from '../interface/user';

interface bookingState {
    id?: number;

    date: string;

    statused: string;

    cancelReason: string;

    rate: number;

    totalPayment: number;

    longDistance: number;

    paymentStatus: boolean;

    pick_up_point: string;

    dropOffPoint: string;

    vehicleReceiptImage?: Image[];

    driverId: number;

    customerId: number;
}
const initialState: bookingState = {
    id: undefined,

    date: '',

    statused: '',

    cancelReason: '',

    rate: 0,

    totalPayment: 0,

    longDistance: 0,

    paymentStatus: false,

    pick_up_point: '',

    dropOffPoint: '',

    vehicleReceiptImage: [],

    driverId: 0,

    customerId: 0,
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        BOOKING: (state, action) => {
            state = action.payload;
        },
    },
});
export const {BOOKING} = bookingSlice.actions;

export default bookingSlice.reducer;
