import { Avatar, Dropdown, MenuProps } from "antd";
import { useAuthContext } from "../contexts/authContext";
import {
     UserOutlined,
     CaretDownOutlined,
     PoweroffOutlined,
     ProfileOutlined,
} from "@ant-design/icons";

import cookiesService from "../services/cookiesService";
import { useNavigate } from "react-router-dom";
const HeaderComponent = () => {
     const { userLogin } = useAuthContext();
     const navigate = useNavigate();
     if (!userLogin) return <></>;
     const handleLogout = () => {
          cookiesService.removeCookie("token");
          cookiesService.removeCookie("userAuth");
          navigate("/login");
     };
     const items: MenuProps["items"] = [
          {
               key: "1",
               label: (
                    <p className="flex items-center gap-2">
                         {" "}
                         <ProfileOutlined /> Profile
                    </p>
               ),
          },
          {
               key: "2",
               label: (
                    <p
                         className="flex gap-2 text-red-600"
                         onClick={handleLogout}
                    >
                         <PoweroffOutlined /> Logout
                    </p>
               ),
          },
     ];
     return (
          <div className="flex justify-end items-center gap-2 mr-5 blue-300 w-ful">
               <Dropdown menu={{ items }} className="mr-4">
                    <div className="flex justify-end items-center gap-3">
                         <Avatar
                              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                              size="large"
                              icon={<UserOutlined />}
                         />
                         <div className="flex gap-1 items-center">
                              <strong>Xin Chào</strong>
                              <p>{userLogin.fullName}</p>
                              <CaretDownOutlined />
                         </div>
                    </div>
               </Dropdown>
          </div>
     );
};
export default HeaderComponent;
