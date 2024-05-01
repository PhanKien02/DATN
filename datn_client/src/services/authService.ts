import { LoginPayLoad, LoginResponse } from "../models/user.model";
import baseRequest from "./baseRequest";
const baseUrl = import.meta.env.FE_BASE_API_URL;

class AuthService {
     async login(payLoad: LoginPayLoad) {
          const login = await baseRequest.post<LoginResponse>(
               `${baseUrl}authenticate/login`,
               payLoad
          );
          return login.data;
     }
}
export default new AuthService();
