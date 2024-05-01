import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./constants/router";
import { ToastContainer } from "react-toastify";

function App() {
     const queryClient = new QueryClient();
     return (
          <QueryClientProvider client={queryClient}>
               <RouterProvider router={routers} />
               <ToastContainer autoClose={2000} limit={3} />
          </QueryClientProvider>
     );
}

export default App;
