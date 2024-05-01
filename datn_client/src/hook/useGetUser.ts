import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { IUser } from "../models/user.model";

export interface Users {
     users: IUser[];
     limit: number;
     page: number;
     totalPage: number;
}

export const useGetAllUsers = (page: number, limit: number, search: string) => {
     const {
          data: users,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Users, Error>({
          queryKey: ["getAllStaff", page, limit, search],
          queryFn: async () => {
               const response = await userService.getAllUser(
                    page,
                    limit,
                    search
               );
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          users,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type UsersHook = ReturnType<typeof useGetAllUsers>;

export default useGetAllUsers;
