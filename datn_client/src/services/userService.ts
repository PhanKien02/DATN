import { IUser } from "../models/user.model";
import baseRequest from "./baseRequest";

class UserService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "users";
     async getAllUser(search: string) {
          const response = await baseRequest.get(this.BasseUrl, {
               params: { search },
          });
          return response.data;
     }
     async createUser(user: IUser) {
          const response = await baseRequest.post(this.BasseUrl, user);
          return response.data;
     }
     async updateStaff(user: IUser) {
          const response = await baseRequest.put(this.BasseUrl, user);
          return response.data;
     }
     async getUserById(idStaff: number) {
          const response = await baseRequest.get(this.BasseUrl + "/" + idStaff);
          return response.data;
     }

     async blockOrActiveUser(userId: number, isActive: boolean) {
          await baseRequest.get(this.BasseUrl + "/active", {
               params: { userId, isActive },
          });
     }

     async searchDrivingAround(lat: number, long: number) {
          const res = await baseRequest.get(this.BasseUrl + "/driver", {
               params: { lat, long },
          });
          return res.data;
     }
}

export const userService = new UserService();
