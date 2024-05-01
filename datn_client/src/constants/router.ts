import MainLayout from "../layouts/mainLayout";
import DashboadPage from "../page/dashboad";
import { LoginPage } from "../page/login";
import PromotionManagerPage from "../page/promotion";
import UserManagerPage from "../page/users";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const routers: RouteObject[] = [
     {
          path: "/",
          Component: MainLayout,
          id: "main",
          children: [
               {
                    path: "/",
                    index: true,
                    id: "dashboad",
                    Component: DashboadPage,
               },
               {
                    path: "/nhan-vien",
                    id: "staff",
                    Component: UserManagerPage,
               },
               {
                    path: "/khuyen-mai",
                    id: "promotion",
                    Component: PromotionManagerPage,
               },
          ],
     },
     {
          path: "/login",
          id: "login",
          Component: LoginPage,
     },
];
export default createBrowserRouter(routers);
