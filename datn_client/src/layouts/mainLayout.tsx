import { Layout, Menu, Image, Dropdown, Space } from "antd";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { MenuItems } from "../constants/menuItems";
import HeaderComponent from "../page/header";
import { DownOutlined } from "@ant-design/icons";
import { useNotificationContext } from "../contexts/notification";
import { useEffect } from "react";
import { toast } from "react-toastify";
const { Header, Content, Sider } = Layout;

const MainLayout = () => {
     const { userLogin } = useAuthContext();
     const { notification } = useNotificationContext();
     if (!userLogin) return <Navigate to="/login" />;

     console.log({ notification });
     useEffect(() => {
          toast.info(notification?.notification?.body);
     }, [notification]);
     return (
          <>
               <Layout className="fixed top-0 left-0 right-0 bottom-0">
                    <Sider
                         breakpoint="lg"
                         collapsedWidth="0"
                         className="flex flex-col border-solid border-[#f5f5f5] border-r-2 fixed top-0 bottom-0 left-0"
                         theme="light"
                    >
                         <div className="logo !bg-white right-0  top-0 left-0 z-10  h-20 flex justify-center items-center">
                              <Image
                                   className="!h-20 mb-1"
                                   preview={false}
                                   src="../public/logo.png"
                              />
                         </div>
                         <Menu
                              theme="light"
                              defaultSelectedKeys={["4"]}
                              className="w-full h-full flex flex-col"
                              style={{
                                   backgroundColor: "#",
                                   boxSizing: "border-box",
                                   marginTop: "20px",
                              }}
                         >
                              <div className=" flex items-start justify-start flex-col gap-4  ml-5">
                                   {MenuItems.map((menu) => {
                                        if (menu.children) {
                                             return (
                                                  <Dropdown
                                                       menu={{
                                                            items: menu.children,
                                                       }}
                                                       key={menu.id}
                                                  >
                                                       <a
                                                            onClick={(e) =>
                                                                 e.preventDefault()
                                                            }
                                                       >
                                                            <Space>
                                                                 <span>
                                                                      {menu.icon && (
                                                                           <menu.icon />
                                                                      )}
                                                                 </span>
                                                                 <span className="ml-1">
                                                                      {
                                                                           menu.title
                                                                      }
                                                                 </span>
                                                                 <DownOutlined />
                                                            </Space>
                                                       </a>
                                                  </Dropdown>
                                             );
                                        } else {
                                             return (
                                                  <NavLink
                                                       to={menu.link ?? ""}
                                                       className="flex justify-start items-center gap-3 "
                                                       key={menu.id}
                                                  >
                                                       {menu.icon ? (
                                                            <span>
                                                                 <menu.icon />
                                                            </span>
                                                       ) : (
                                                            <></>
                                                       )}
                                                       <span>
                                                            {menu.title || ""}
                                                       </span>
                                                  </NavLink>
                                             );
                                        }
                                   })}
                              </div>
                         </Menu>
                    </Sider>
                    <Layout className="sticky bottom-0 right-0">
                         <Header
                              className="site-layout-sub-header-background !h-14 sticky top-0 z-10 !bg-[#FBC632] border-solid border-[#f5f5f5] border-b-2 "
                              style={{ padding: 0 }}
                         >
                              <HeaderComponent />
                         </Header>
                         <Content className="overflow-x-auto site-layout-sub-header-background">
                              <Outlet />
                         </Content>
                    </Layout>
               </Layout>
          </>
     );
};

export default MainLayout;
