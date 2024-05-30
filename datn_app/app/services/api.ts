import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';
const url = 'http://192.168.1.22:8000/api/';
export const api = createApi({
    // Tương tự tên Slice khi tạo Slice thông thường
    reducerPath: 'api',
    // Cấu hình chung cho tất cả request
    baseQuery: fetchBaseQuery({
        baseUrl: '',
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
                url: `${url}authenticate/login`,
                method: 'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
            query: ({email, fullName, password, roleName}) => ({
                url: `${url}authenticate/sign-up`,
                method: 'POST',
                body: {email, fullName, password, roleName},
            }),
        }),

        verifyOTP: builder.mutation({
            query: ({email, otp}) => ({
                url: `${url}authenticate/verify`,
                method: 'POST',
                params: {email, otp},
            }),
        }),
        resendOTP: builder.mutation({
            query: ({email}) => ({
                url: `${url}authenticate/resend-verify`,
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
        searchAddress: builder.mutation({
            query: ({search}) => ({
                url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=AIzaSyDTG54SAIAXyrtxlDvnx7mHHnqzexM0law`,
                method: 'GET',
            }),
        }),

        getDirections: builder.query({
            query: ({origin, destination}) => ({
                url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyDTG54SAIAXyrtxlDvnx7mHHnqzexM0law`,
                method: 'GET',
            }),
        }),

        getPromotion: builder.query({
            query: ({km}) => ({
                url: `${url}promotion/bykm`,
                params: {km},
                method: 'GET',
            }),
        }),

        getPrice: builder.query({
            query: () => ({
                url: `${url}price/time`,
                method: 'GET',
            }),
        }),
        booking: builder.mutation({
            query: ({payload}) => ({
                url: `${url}booking`,
                body: {payload},
                method: 'POST',
            }),
        }),
        cancelBooking: builder.mutation({
            query: ({id, cancelReason}) => ({
                url: `${url}booking/cancel`,
                params: {id, cancelReason},
                method: 'GET',
            }),
        }),
        getLocationFromAddress: builder.mutation({
            query: ({address}) => ({
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address,
                )}&key=${API_GG_MAP_KEY}`,
                method: 'GET',
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
    useSearchAddressMutation,
    useGetDirectionsQuery,
    useGetPromotionQuery,
    useGetPriceQuery,
    useGetLocationFromAddressMutation,
    useBookingMutation,
    useCancelBookingMutation,
} = api;
