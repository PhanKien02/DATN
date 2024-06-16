import { useQuery } from "@tanstack/react-query";
import { IUser } from "../models/user.model";
import { userService } from "../services/userService";

export const useSearchDrivingAround = (lat: number, long: number) => {
     console.log({ lat, long });

     const {
          data: drivers,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IUser[], Error>({
          queryKey: ["searchDrivingAround", lat, long],
          queryFn: async () => await userService.searchDrivingAround(lat, long),
          refetchOnWindowFocus: false,
     });

     return {
          drivers,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
