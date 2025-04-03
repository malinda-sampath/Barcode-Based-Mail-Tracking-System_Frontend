import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SuperSidebar";
import Header from "./Header";

const SuperLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open state

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-neutral-100">
      {/* Sidebar */}
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />

      {/* Content area, dynamically adjusting margin */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 
          ${isSidebarOpen ? "" : "ml-16"} 
          sm:ml-16 md:ml-24 lg:ml-60`} // Add responsive margin classes
      >
        <Header />
        <div className="h-full p-3 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperLayout;
