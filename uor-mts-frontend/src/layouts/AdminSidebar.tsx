import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import Logo from "../assets/Logo.png";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { 
  ADMIN_DASHBOARD_SIDEBAR_LINKS, 
  ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS 
} from "./DashboardLayout";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 mb-2 rounded-md hover:bg-white hover:no-underline hover:text-[#611010] active:bg-white text-base";

interface SidebarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobile(false); // Desktop
        setIsOpen(true);
        setIsSidebarOpen(true);
      } else {
        setIsMobile(true); // Mobile
        setIsOpen(false);
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 flex flex-col bg-[#611010] text-white h-screen transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      } sm:w-60 p-3`}
    >
      {/* Toggle Button for Mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="sm:hidden text-white bg-[#F99C30] p-2 rounded-md mb-3 w-10 ml-auto"
        >
          {isOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
        </button>
      )}

      {/* Sidebar Logo */}
      <div className="flex items-center px-2 py-2">
        <img
          src={Logo}
          alt="Ruhuna_Logo"
          className={`object-cover ${isOpen ? "w-24 h-24" : "hidden"}`}
        />
        {isOpen && !isMobile && (
          <span className="text-lg text-neutral-100">
            <b className="text-[#F99C30]">GENERAL</b> ADMIN
          </span>
        )}
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 py-8 flex flex-col gap-0.5 overflow-y-auto">
        {ADMIN_DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} isOpen={isOpen} />
        ))}
      </div>

      {/* Sidebar Bottom Links */}
      <div className="flex flex-col gap-0.5 pt-2 border-t border-[#F99C30]">
        {ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS .map((item) => (
          <SidebarLink key={item.key} item={item} isOpen={isOpen} />
        ))}
        <div className={classNames("text-[#F99C30]", linkClass)}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          {isOpen && "Logout"}
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  item: { key: string; path: string; label: string; icon: React.ReactNode };
  isOpen: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, isOpen }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "text-[#611010] bg-white" : "",
        linkClass
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {isOpen && item.label}
    </Link>
  );
};

export default AdminSidebar;
