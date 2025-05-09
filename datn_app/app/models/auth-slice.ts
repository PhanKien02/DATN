import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../interface/user';

export interface authSlice {
    user: IUser | null;
    token: string;
}
let tokenStroage = '';
let userStroage = null;

const initialState: authSlice = {
    user: userStroage || null,
    token: tokenStroage || '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        SETUP: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
});
export const {LOGIN, SETUP} = authSlice.actions;
// Action creators are generated for each case reducer function
export default authSlice.reducer;
