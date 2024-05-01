import { useQuery } from "@tanstack/react-query";
import { IProvince } from "../models/provinceModel";
import { provinceService } from "../services/provinceService";

export const useGetProvince = () => {
     const {
          data: provinces,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IProvince[], Error>({
          queryKey: ["getProvince"],
          queryFn: async () => await provinceService.getAllProvince(),
          refetchOnWindowFocus: false,
     });

     return {
          provinces,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
