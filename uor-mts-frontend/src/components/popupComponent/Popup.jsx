import React from "react";

const Popup = ({ isOpen, onClose, children, topic }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative p-6 bg-white rounded-xl shadow-xl w-full max-w-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          ✖
        </button>

        {/* Popup Content */}
        <h2 className="mb-5 text-2xl font-bold text-center text-[#611010] uppercase tracking-wide">
          {topic}
        </h2>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
