import { useQuery } from "@tanstack/react-query";
import { IInvoice } from "../models/invoice";
import invoiceSerice from "../services/invoiceSerice";

export interface Invoices {
     invoices: IInvoice[];
     limit: number;
     page: number;
     total: number;
}

export const useGetAllInvoice = (
     page: number,
     limit: number,
     search?: string
) => {
     const {
          data: invoices,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Invoices, Error>({
          queryKey: ["geAllInvocie", page, limit, search],
          queryFn: async () => {
               const response = await invoiceSerice.getAllInvoice(
                    page,
                    limit,
                    search || ""
               );
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          invoices,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type BookingHook = ReturnType<typeof useGetAllInvoice>;

export default useGetAllInvoice;
