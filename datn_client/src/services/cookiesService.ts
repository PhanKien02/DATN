
import Cookies from "js-cookie";
import { IUser } from "../models/user.model";

interface CookieKey {
     userAuth: IUser;
     token: string;
     refrestToken: string;
}

class CookiesService<T extends keyof CookieKey> {
     setCookie(cookieName: T, data: CookieKey[T]) {
          Cookies.set(cookieName, JSON.stringify(data));
     }

     getFromCookie(cookieName: T) {
          if (typeof window === "undefined") return undefined;
          const cookieValue = Cookies?.get(cookieName) ?? "{}";
          const value: CookieKey[T] = JSON.parse(cookieValue);
          return Object.keys(value).length ? value : undefined;
     }
     removeCookie(cookieName: T) {
          Cookies.remove(cookieName);
     }
}

export default new CookiesService();
