import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts/authContext.tsx";
import { StyleProvider } from "@ant-design/cssinjs";
import { NotificationContextProvider } from "./contexts/notification.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <AuthContextProvider>
               <NotificationContextProvider>
                    <StyleProvider hashPriority="high">
                         <App />
                    </StyleProvider>
               </NotificationContextProvider>
          </AuthContextProvider>
     </React.StrictMode>
);
