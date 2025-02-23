import React from "react";
import Toast from "./toast"; // Assuming your Toast component is in the same directory

interface ToastData {
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface ToastContainerProps {
  toasts: ToastData[]; // Define the 'toasts' prop here
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const removeToast = (index: number) => {
    // Logic to remove toast (e.g., call a function passed from the parent component)
  };

  return (
    <div>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(index)} // Handle toast close
        />
      ))}
    </div>
  );
};

export default ToastContainer;
