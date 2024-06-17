import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { IUser } from "../models/user.model";

export const useGetAllUsers = (search: string) => {
     const {
          data: users,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IUser[], Error>({
          queryKey: ["getAllStaff", search],
          queryFn: async () => {
               const response = await userService.getAllUser(search);
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
