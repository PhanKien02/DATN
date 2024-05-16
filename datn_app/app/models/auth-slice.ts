import {createSlice} from '@reduxjs/toolkit';
import {api} from '../services/api';

export interface authSlice {
    id: number;
    fcmId?: string;
    roleName: string;
}

const initialState: authSlice = {
    id: 0,
    roleName: '',
    fcmId: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            api.endpoints.login.matchFulfilled,
            (state, action) => {
                state = action.payload;
            },
        );
    },
});

// Action creators are generated for each case reducer function
export default authSlice.reducer;
