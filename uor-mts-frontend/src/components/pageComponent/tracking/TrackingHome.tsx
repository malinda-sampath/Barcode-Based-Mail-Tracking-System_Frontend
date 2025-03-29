import React from "react";
import Logo from "../../../assets/Logo.png";

interface TrackingHomeProps {
  onProceed: () => void;
}

const TrackingHome: React.FC<TrackingHomeProps> = ({ onProceed }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-center bg-cover brightness-100 bg-[url(./assets/uorbg.jpg)] h-screen w-full">
      <form className="w-[700px] h-auto rounded-xl opacity-90 pt-14 mx-auto bg-[#681d1d] shadow-md space-y-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Logo */}
          <div>
            <img
              src={Logo} // Use the imported logo
              alt="University Logo"
              className="w-20 h-26"
            />
          </div>

          {/* University Name and Title */}
          <div>
            <h1 className="text-[#FFD700] text-3xl font-bold tracking-wide">
              GENERAL ADMINISTRATIVE UNIT
            </h1>
            <h2 className="text-[#FFD700] text-xl mt-1 text-left">
              UNIVERSITY OF RUHUNA
            </h2>
          </div>
        </div>

        <h3 className="mb-4 text-2xl font-semibold text-center text-white">
          Urgent Mail Tracking System
        </h3>
        <p className="text-white text-center px-8 mb-6">
          Efficiently track and manage university mail with real-time updates
          and secure handling.
        </p>

        {/* Centered Input Fields and Button */}
        <div className="flex flex-col items-center space-y-6">
          <button
            className="w-[110px] bg-[#4169E1] text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={onProceed}
          >
            Proceed
          </button>
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default TrackingHome;
