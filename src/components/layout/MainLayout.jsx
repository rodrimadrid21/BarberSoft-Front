import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout d-flex">
      <Sidebar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;