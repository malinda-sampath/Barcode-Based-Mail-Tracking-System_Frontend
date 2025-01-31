import React from 'react'; // Import React
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi"; // Import icons
import { RxAvatar } from "react-icons/rx"; // Import more icons

// Define the types for your component props (optional 'username' prop)
interface HeaderProps {
  username?: string;  // Optional 'username' prop, defaulting to a string value
}

// Define the Header component as a functional component
const Header: React.FC<HeaderProps> = ({ username = "Malinda-Sampath" }) => {
  return (
    <div className="bg-transparent h-16 px-4 flex justify-between w-full items-center">
      <div></div>
      <div className="flex items-center gap-2 mr-2">
        <HiOutlineBell fontSize={24} className="text-[#F99C30]" />
        <RxAvatar fontSize={24} />
        <span>{username}</span>
      </div>
    </div>
  );
};

export default Header;
