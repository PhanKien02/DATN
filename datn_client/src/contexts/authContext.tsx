import React, {
     createContext,
     useContext,
     PropsWithChildren,
     useState,
} from "react";
import { IUser } from "../models/user.model";

interface AuthContextType {
     isAuth: boolean;
     setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
     userLogin?: IUser;
     setUserLogin: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
     undefined
);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
     const [isAuth, setIsAuth] = useState(false);
     const [userLogin, setUserLogin] = useState<IUser | undefined>(undefined);
     const contextValue: AuthContextType = {
          isAuth,
          setIsAuth,
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
