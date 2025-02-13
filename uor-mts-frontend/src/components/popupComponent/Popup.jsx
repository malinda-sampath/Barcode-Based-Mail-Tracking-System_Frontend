import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg w-[600px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
        >
          ✖
        </button>
        
        {/* Popup Content */}
        <h2 className="mb-4 text-xl font-semibold text-center text-[#611010]">BRANCH</h2>
        {children}
      </div>
    </div>
  );
};

export default Popup;
