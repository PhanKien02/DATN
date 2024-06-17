import { useQuery } from "@tanstack/react-query";
import bookingService from "../services/bookingService";
import { IBooking } from "../models/booking";

export interface Bookings {
     bookings: IBooking[];
     limit: number;
     page: number;
     total: number;
}

export const useGetAllBooking = (
     page: number,
     limit: number,
     search?: string
) => {
     const {
          data: bookings,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Bookings, Error>({
          queryKey: ["getAllBooking", page, limit, search],
          queryFn: async () => {
               const response = await bookingService.getAllBooking(
                    page,
                    limit,
                    search || ""
               );
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          bookings,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type BookingHook = ReturnType<typeof useGetAllBooking>;

export default useGetAllBooking;
