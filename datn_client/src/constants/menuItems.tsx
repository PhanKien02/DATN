import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import type { MenuProps } from "antd";
import { FaCar } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
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
          title: "Danh Sách Đơn Hàng",
          link: "/don-hang",
          id: "booking",
          icon: FaCar,
     },
     {
          title: "Người Dùng",
          id: "QLNV",
          icon: FaUserTie,
          link: "/nguoi-dung",
     },
     {
          title: "Đơn Giá",
          link: "/don-gia",
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
          link: "/hoa-don",
          id: "invoice",
          icon: FaFileInvoiceDollar,
     },
];
