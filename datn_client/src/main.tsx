import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts/authContext.tsx";
import { StyleProvider } from "@ant-design/cssinjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <AuthContextProvider>
               <StyleProvider hashPriority="high">
                    <App />
               </StyleProvider>
          </AuthContextProvider>
     </React.StrictMode>
);
