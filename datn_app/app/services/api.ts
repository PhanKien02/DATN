import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';

export const api = createApi({
    // Tương tự tên Slice khi tạo Slice thông thường
    reducerPath: 'api',

    // Cấu hình chung cho tất cả request
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.1.8:8000/api/',
        prepareHeaders: (headers, {getState}) => {
            // getState() giúp lấy ra toàn bộ state trong store
            // getState().user lấy ra state trong userSlice
            const token = getState()['auth'].token;

            // Nếu có token thì thêm vào headers
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    // Các endpoints (lệnh gọi request)
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: `authenticate/login`,
                method: 'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
            query: ({email, fullName, password, roleName}) => ({
                url: 'authenticate/sign-up',
                method: 'POST',
                body: {email, fullName, password, roleName},
            }),
        }),

        verifyOTP: builder.mutation({
            query: ({email, otp}) => ({
                url: 'authenticate/verify',
                method: 'POST',
                params: {email, otp},
            }),
        }),
        resendOTP: builder.mutation({
            query: ({email}) => ({
                url: 'authenticate/resend-verify',
                method: 'POST',
                params: {email},
            }),
        }),
        caculateDistance: builder.mutation({
            query: ({destinationAddress, departureAddress}) => ({
                url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destinationAddress}&origins=${departureAddress}&units=imperial&key=${API_GG_MAP_KEY}`,
                method: 'POST',
            }),
        }),
    }),
});
export const {
    useLoginMutation,
    useRegisterMutation,
    useVerifyOTPMutation,
    useResendOTPMutation,
    useCaculateDistanceMutation,
} = api;
