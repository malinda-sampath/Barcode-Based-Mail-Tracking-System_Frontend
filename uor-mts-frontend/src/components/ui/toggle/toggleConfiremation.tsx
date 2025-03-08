import React, { useEffect, useState } from "react";

interface ToggleConfirmationProps {
  message: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ToggleConfirmation: React.FC<ToggleConfirmationProps> = ({
  message,
  visible,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsExiting(false);
  }, [visible]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (visible) {
      window.addEventListener("keydown", handleEscKey);
    } else {
      window.removeEventListener("keydown", handleEscKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [visible]);

  const handleConfirm = () => {
    setIsExiting(true);
    setTimeout(() => {
      onConfirm();
    }, 300);
  };

  const handleCancel = () => {
    setIsExiting(true);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 transition-all duration-300 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleCancel}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${
          isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        } border border-gray-200 dark:border-gray-700`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-6">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
            <svg
              className="w-8 h-8 text-yellow-500 dark:text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="text-xl font-semibold text-gray-800 dark:text-white">
            Confirmation Required
          </div>
        </div>

        <div className="mb-8 text-gray-600 dark:text-gray-300 text-lg border-l-4 border-yellow-500 pl-4 py-2">
          {message}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium shadow-md"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleConfirmation;
