import { Outlet } from "react-router-dom";

const MainLayout = () => {
     return (
          <>
               <p>Main layouts</p>
               <Outlet />
          </>
     );
};

export default MainLayout;
