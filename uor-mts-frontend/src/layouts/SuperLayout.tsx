import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SuperSidebar";
import Header from "./Header";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open state

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-neutral-100">
      {/* Sidebar */}
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />

      {/* Content area, dynamically adjusting margin */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-16"
        }`}
      >
        <Header />
        <div className="h-full p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
