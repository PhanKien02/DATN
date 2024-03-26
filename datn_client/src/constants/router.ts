import React from "react";
import MainLayout from "../layouts/mainLayout";
import DashboadPage from "../page/dashboad";
import ProductsPage from "../page/productPage";

type Router = {
     path: string;
     component: () => React.JSX.Element;
     children?: Router[];
};
export const router: Router =
{
     path: "/",
     component: MainLayout,
     children: [
          {
               path: "/",
               component: DashboadPage
          },
          {
               path: "/products",
               component: ProductsPage
          }
     ]
}
