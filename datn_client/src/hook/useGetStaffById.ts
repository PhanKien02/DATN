import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { IUser } from "../models/user.model";

export const useGetStaffById = (idStaff: number) => {
     const {
          data: user,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IUser, Error>({
          queryKey: ["getStaffById", idStaff],
          queryFn: async () => await userService.getUserById(idStaff),
          refetchOnWindowFocus: false,
     });

     return {
          user,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
