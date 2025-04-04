import React, { useState } from "react";

interface ViewPopupProps {
  onClose: () => void;
}

const ViewPopup: React.FC<ViewPopupProps> = ({ onClose }) => {
  const [claimer, setClaimer] = useState("");

  const handleClaim = () => {
    if (claimer.trim() === "") {
      alert("Please enter a name!");
      return;
    }
    console.log(`Mail claimed by: ${claimer}`);
    setClaimer(""); // Clear input after claiming
    onClose(); // Close popup after claiming
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Popup Card */}
      <div className="relative p-6 text-center bg-white shadow-lg rounded-2xl w-96">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/128/259/259503.png"
            alt="Claim Icon"
            className="w-14 h-14"
          />
        </div>

        {/* Title */}
        <h2 className="mb-3 text-lg font-semibold">Who is Claimed?</h2>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter Name"
          value={claimer}
          onChange={(e) => setClaimer(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Claim Button */}
        <button
          onClick={handleClaim}
          className="w-full py-2 mt-4 font-bold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
        >
          CLAIMED
        </button>
      </div>
    </div>
  );
};

export default ViewPopup;
