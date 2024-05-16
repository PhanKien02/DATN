import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    // Tương tự tên Slice khi tạo Slice thông thường
    reducerPath: 'api',

    // Cấu hình chung cho tất cả request
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.1.1:8000/api/',
        prepareHeaders: (headers, {getState}) => {
            // getState() giúp lấy ra toàn bộ state trong store
            // getState().user lấy ra state trong userSlice
            const token = getState();

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
    }),
});
export const {useLoginMutation, useRegisterMutation} = api;
