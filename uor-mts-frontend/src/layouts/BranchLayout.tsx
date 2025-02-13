import React from "react"; // Import React
import { Outlet } from "react-router-dom"; // Import Outlet for rendering nested routes
import BranchSidebar from "./BranchSidebar"; // Import Sidebar component
import Header from "./Header"; // Import Header component


const BranchLayout: React.FC = () => {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-neutral-100">
 
  <div>
    <BranchSidebar />
  </div>

  
  <div className="flex flex-col flex-1 ml-60">
    <Header /> 
    <div className="h-full p-4 overflow-x-hidden overflow-y-auto">
      <Outlet />
    </div>
  </div>

 
  {/* <p>Footer</p> */}
</div>

  );
};

export default BranchLayout;
