import React from "react"; // Import React
import { Outlet } from "react-router-dom"; // Import Outlet for rendering nested routes
import Sidebar from "./Sidebar"; // Import Sidebar component
import Header from "./Header"; // Import Header component

// Define the Layout component
const Layout: React.FC = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar /> {/* Sidebar component */}
      <div className="flex flex-col flex-1">
        <Header /> {/* Header component */}
        <div>
          <Outlet />
        </div>{" "}
        {/* Render nested routes */}
      </div>
      {/* <p>Footer</p> */} {/* Footer (commented out) */}
    </div>
  );
};

export default Layout;
