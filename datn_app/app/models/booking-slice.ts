import {createSlice} from '@reduxjs/toolkit';
import {IBooking} from '../interface/booking';

interface bookinSlice {
    booking: IBooking | null;
}

const initialState: bookinSlice = {
    booking: null,
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        BOOKING: (state, action) => {
            state.booking = action.payload;
        },
    },
});
export const {BOOKING} = bookingSlice.actions;

export default bookingSlice.reducer;
