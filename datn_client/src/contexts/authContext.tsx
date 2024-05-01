import React, {
     createContext,
     useContext,
     PropsWithChildren,
     useState,
} from "react";
import { IUser } from "../models/user.model";
import cookiesService from "../services/cookiesService";

interface AuthContextType {
     userLogin?: IUser;
     setUserLogin: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
     undefined
);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
     const [userLogin, setUserLogin] = useState<IUser | undefined>(
          cookiesService.getFromCookie("userAuth") as IUser
     );
     const contextValue: AuthContextType = {
          userLogin,
          setUserLogin,
     };
     return (
          <AuthContext.Provider value={contextValue}>
               {children}
          </AuthContext.Provider>
     );
};

export const useAuthContext = (): AuthContextType => {
     const context = useContext(AuthContext);
     if (!context) {
          throw new Error(
               "useUserProfileContext must be used within a UserProfileProvider"
          );
     }
     return context;
};
