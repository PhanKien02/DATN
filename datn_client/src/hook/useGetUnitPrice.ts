import { useQuery } from "@tanstack/react-query";
import { IUnitPrice } from "../models/unitPrice";
import unitPriceService from "../services/unitPriceService";

export const useGetUnitPrice = () => {
     const {
          data: prices,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IUnitPrice[], Error>({
          queryKey: ["getUnitPrice"],
          queryFn: async () => await unitPriceService.getAllPrice(),
          refetchOnWindowFocus: false,
     });

     return {
          prices,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
