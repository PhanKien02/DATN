// import { useAuthContext } from "../contexts/authContext";
import { Image } from "antd";
import { Button, Form, Input } from "antd";
// import { IUser } from "../models/user.model";
import { useAuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginPayLoad, LoginResponse } from "../models/user.model";
import authService from "../services/authService";
import cookiesService from "../services/cookiesService";
import { useEffect, useState } from "react";
import { getTokenFcm } from "../utils/firebase/getTokenFcm";

export const LoginPage = () => {
     const [fcmId, setFcmId] = useState<string | undefined>();
     const { setUserLogin } = useAuthContext();
     const navigate = useNavigate();
     const onFinish = async (login: LoginPayLoad) => {
          await authService
               .login({ ...login, fcmId: fcmId || "" })
               .then((data: LoginResponse) => {
                    cookiesService.setCookie("token", data.token.token);
                    cookiesService.setCookie("refrestToken", data.refreshToken);
                    cookiesService.setCookie("userAuth", data.user);
                    setUserLogin(data.user);
                    navigate("/");
                    toast.success("Xin Chào " + data.user.fullName);
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error("Login Error");
               });
     };
     useEffect(() => {
          getTokenFcm().then((token) => setFcmId(token));
     }, []);
     return (
          <>
               <div className="flex h-full justify-between items-center gap-5">
                    <div className="flex-[0.9] flex justify-center items-center h-full ml-5 mt-2">
                         <Image
                              src="/public/login_image.png"
                              preview={false}
                              className="rounded-3xl !w-[90%]"
                         />
                    </div>
                    <div className="flex-1 flex justify-center">
                         <div className="w-4/5 bg-white shadow-[0px_35px_35px_30px_rgba(0,0,0,0.3)] p-10  rounded-3xl">
                              <h1 className="text-[#002278]">Login</h1>
                              <Form
                                   name="loginForm"
                                   initialValues={{ remember: true }}
                                   onFinish={onFinish}
                                   autoComplete="off"
                                   layout="vertical"
                                   className="text-left"
                              >
                                   <Form.Item
                                        label="email"
                                        name="email"
                                        rules={[
                                             {
                                                  required: true,
                                                  message: "Please input your email!",
                                             },
                                        ]}
                                   >
                                        <Input />
                                   </Form.Item>
                                   <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                             {
                                                  required: true,
                                                  message: "Please input your password!",
                                             },
                                        ]}
                                   >
                                        <Input.Password autoComplete="on" />
                                   </Form.Item>
                                   <Form.Item className="w-full flex justify-center">
                                        <Button
                                             type="primary"
                                             htmlType="submit"
                                             className="w-48 h-10 rounded-lg"
                                        >
                                             Login
                                        </Button>
                                   </Form.Item>
                              </Form>
                         </div>
                    </div>
               </div>
          </>
     );
};
