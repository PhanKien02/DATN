import React, { PropsWithChildren } from "react";
import { LoginComponets } from "../page/login";
import { useAuthContext } from "../contexts/authContext";
function RequireAuth({ children }: PropsWithChildren) {
     const { isAuth } = useAuthContext();
     if (!isAuth) {
          return <LoginComponets />;
     }
     return children;
}
export default RequireAuth;
