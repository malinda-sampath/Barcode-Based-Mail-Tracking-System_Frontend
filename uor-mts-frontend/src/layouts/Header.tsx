import React from 'react'; // Import React
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi"; // Import icons
import { RxAvatar } from "react-icons/rx"; // Import more icons
import { ProfileMenue } from '../HeaderComponents/ProfileMenue';

// Define the types for your component props (optional 'username' prop)
interface HeaderProps {
  username?: string;  // Optional 'username' prop, defaulting to a string value
}

// Define the Header component as a functional component
const Header: React.FC<HeaderProps> = ({ username = "Malinda-Sampath" }) => {
  return (
    <div className="flex items-center justify-between w-full h-6 px-4 mt-4 mb-0 bg-transparent">
      <div></div>
      <div className="flex items-center gap-2 mr-2">
        <HiOutlineBell fontSize={24} className="text-[#F99C30]" />
        <ProfileMenue/>
        <span>{username}</span>
      </div>
    </div>
  );
};

export default Header;
