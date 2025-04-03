import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap`}
        >
          {text}
          <div
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 -translate-x-1/2 ${
              position === "top"
                ? "top-full left-1/2 -mt-1"
                : position === "bottom"
                ? "bottom-full left-1/2 -mb-1"
                : position === "left"
                ? "left-full top-1/2 -ml-1"
                : "right-full top-1/2 -mr-1"
            }`}
          />
        </div>
      )}
    </div>
  );
};
