import MainLayout from "../layouts/mainLayout";
import BookingManagerPage from "../page/booking";
import DashboadPage from "../page/dashboad";
import InvoiceManagerPage from "../page/invoice";
import { LoginPage } from "../page/login";
import PromotionManagerPage from "../page/promotion";
import UnitPriceManagerPage from "../page/unitPrice";
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
                    path: "/nguoi-dung",
                    id: "staff",
                    Component: UserManagerPage,
               },
               {
                    path: "/khuyen-mai",
                    id: "promotion",
                    Component: PromotionManagerPage,
               },
               {
                    path: "/don-gia",
                    id: "unitPrice",
                    Component: UnitPriceManagerPage,
               },
               {
                    path: "/don-hang",
                    id: "booking",
                    Component: BookingManagerPage,
               },
               {
                    path: "/hoa-don",
                    id: "invoice",
                    Component: InvoiceManagerPage,
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
