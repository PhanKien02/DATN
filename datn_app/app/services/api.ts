import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';
const url = 'https://965f-116-110-225-120.ngrok-free.app/api/';
export const api = createApi({
    // Tương tự tên Slice khi tạo Slice thông thường
    reducerPath: 'api',
    // Cấu hình chung cho tất cả request
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        timeout: 1000 * 60 * 3,
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
            query: ({email, fullName, password, roleName, phone}) => ({
                url: `${url}authenticate/sign-up`,
                method: 'POST',
                body: {email, fullName, password, roleName, phone},
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
                url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${API_GG_MAP_KEY}`,
                method: 'GET',
            }),
        }),

        getDirections: builder.query({
            query: ({origin, destination}) => ({
                url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_GG_MAP_KEY}`,
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
        trackingLocationDriver: builder.mutation({
            query: ({id, lat, long}) => ({
                url: `${url}route/`,
                method: 'POST',
                body: {id, lat, long},
            }),
        }),
        rejectBooking: builder.mutation({
            query: ({bookingId, driverId}) => ({
                url: `${url}/booking/reject`,
                body: {bookingId, driverId},
                method: 'PUT',
            }),
        }),
        getBookingById: builder.query({
            query: ({bookingId}) => ({
                url: `${url}/booking/byId`,
                params: {bookingId},
                method: 'GET',
            }),
        }),
        _getBookingById: builder.mutation({
            query: ({bookingId}) => ({
                url: `${url}/booking/byId`,
                params: {bookingId},
                method: 'GET',
            }),
        }),

        acceptBooking: builder.mutation({
            query: ({bookingId, driverId}) => ({
                url: `${url}/booking/accept`,
                body: {bookingId, driverId},
                method: 'PUT',
            }),
        }),

        startMoing: builder.mutation({
            query: ({bookingId, images}) => ({
                url: `${url}/booking/moving`,
                body: {bookingId, images},
                method: 'PUT',
            }),
        }),
        completeMoving: builder.mutation({
            query: ({bookingId, idDriver}) => ({
                url: `${url}/booking/complete`,
                body: {bookingId, idDriver},
                method: 'PUT',
            }),
        }),
        getProfile: builder.query({
            query: () => ({
                url: `${url}users/profile`,
                method: 'GET',
            }),
        }),
        updateProfile: builder.mutation({
            query: profile => ({
                url: `${url}users/profile`,
                body: {profile},
                method: 'PUT',
            }),
        }),
        rateBooking: builder.mutation({
            query: ({bookingId, rate}) => ({
                url: `${url}booking/rate`,
                body: {bookingId, rate},
                method: 'PUT',
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
    useTrackingLocationDriverMutation,
    useRejectBookingMutation,
    useGetBookingByIdQuery,
    useAcceptBookingMutation,
    useStartMoingMutation,
    useCompleteMovingMutation,
    use_getBookingByIdMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useRateBookingMutation,
} = api;
