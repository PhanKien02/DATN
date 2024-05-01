import { useQuery } from "@tanstack/react-query";
import promotionService from "../services/promotionService";
import { IPromotion } from "../models/promotion";

export const useGetPromotion = () => {
     const {
          data: promotion,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IPromotion[], Error>({
          queryKey: ["getPromotion"],
          queryFn: async () => await promotionService.getAllPromotion(),
          refetchOnWindowFocus: false,
     });

     return {
          promotion,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
