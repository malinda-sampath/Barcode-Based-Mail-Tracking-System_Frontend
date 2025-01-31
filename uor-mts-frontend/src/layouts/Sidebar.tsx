import React from "react";
import { FcBullish } from "react-icons/fc";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "./DashboardLayout";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import Logo from "../assets/Logo.png";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

// Define the type for a sidebar item
interface SidebarItem {
  key: string;
  path: string;
  label: string;
  icon: React.ReactNode; // Icon can be any JSX element (like <FcBullish />, <HiOutlineLogout />)
}

// Define a link class for shared styling
const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 mb-2 rounded-md hover:bg-white hover:no-underline hover:text-[#611010] hover:rounded-md active:bg-white rounded-md text-base";

// Sidebar component
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false); // Start with the collapsed state on mobile
  const [isMobile, setIsMobile] = React.useState(false); // Track whether it's a mobile screen or not

  // Effect to handle screen size changes
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobile(false); // Large screen, always open sidebar
        setIsOpen(true); // Force open the sidebar on large screens
      } else {
        setIsMobile(true); // Small screen, toggle sidebar based on isOpen state
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for screen resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-col bg-[#611010] text-white ${
        isOpen ? "w-60" : "w-16"
      } sm:flex p-3 transition-all duration-300`}
    >
      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white bg-[#F99C30] p-2 rounded-md mb-3 w-10 ml-auto"
        >
          {isOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
        </button>
      )}

      {/* Sidebar Header */}
      <div className="flex items-center px-2 py-2">
        <img
          src={Logo}
          alt="Ruhuna_Logo"
          className={`object-cover ${isOpen ? "w-24 h-24" : "hidden"}`}
        />
        {isOpen && !isMobile && (
          <span className="text-lg text-neutral-100">
            <b className="text-[#F99C30]">GENRAL</b> ADMIN
          </span>
        )}
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 py-8 flex flex-col gap-0.5 overflow-y-auto">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} isOpen={isOpen} />
        ))}
      </div>

      {/* Bottom Links */}
      <div className="flex flex-col gap-0.5 pt-2 border-t border-[#F99C30]">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
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

// SidebarLink component
interface SidebarLinkProps {
  item: SidebarItem; // Each SidebarLink receives an item of type SidebarItem
  isOpen: boolean; // Prop to determine if sidebar is open
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

export default Sidebar;
