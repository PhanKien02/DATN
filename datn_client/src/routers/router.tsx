import { BrowserRouter, Route, Routes } from "react-router-dom";
import { router } from "../constants/router";
import RequireAuth from "./authRequire";

export const AppRouter = () => {
     return (
          <>
               <BrowserRouter>
                    <RequireAuth>
                         <Routes>
                              {
                                   <Route
                                        path={router.path}
                                        Component={router.component}
                                   >
                                        {router.children &&
                                             router.children.map((child) => (
                                                  <Route
                                                       path={child.path}
                                                       Component={
                                                            child.component
                                                       }
                                                  />
                                             ))}
                                   </Route>
                              }
                         </Routes>
                    </RequireAuth>
               </BrowserRouter>
          </>
     );
};
