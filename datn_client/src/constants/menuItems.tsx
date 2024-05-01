import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { FaCarRear } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdPriceCheck } from "react-icons/md";
export type MenuItems = {
     title: string;
     icon?: IconType;
     link?: string;
     id: string;
     children?: MenuProps["items"];
};
export const MenuItems: MenuItems[] = [
     {
          title: "Trang chủ",
          icon: FaHome,
          id: "index",
          link: "/",
     },
     {
          title: "Nhân Viên",
          id: "QLNV",
          icon: FaHouseUser,
          children: [
               {
                    key: "1",
                    label: (
                         <NavLink
                              to="/nhan-vien"
                              className="flex items-center gap-3 !text-blue-600"
                         >
                              <FaUserTie /> <span>Nhân Viên</span>
                         </NavLink>
                    ),
               },
               {
                    key: "1",
                    label: (
                         <NavLink
                              to="/nhan-vien"
                              className="flex items-center gap-3 !text-blue-600"
                         >
                              <FaCarRear /> <span>Tài Xế</span>
                         </NavLink>
                    ),
               },
               {
                    key: "1",
                    label: (
                         <NavLink
                              to="/nhan-vien"
                              className="flex items-center gap-3 !text-blue-600"
                         >
                              <FaUser /> <span>Người Dùng</span>
                         </NavLink>
                    ),
               },
          ],
     },
     {
          title: "Đơn Giá",
          link: "###",
          id: "price",
          icon: MdPriceCheck,
     },
     {
          title: "Khuyễn Mãi",
          link: "/khuyen-mai",
          id: "promotion",
          icon: MdDiscount,
     },
     {
          title: "Hóa Đơn",
          link: "###",
          id: "invoice",
          icon: FaFileInvoiceDollar,
     },
];
