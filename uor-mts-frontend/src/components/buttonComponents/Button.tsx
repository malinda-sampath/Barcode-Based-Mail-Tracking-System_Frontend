import React from 'react';

interface ButtonProps {
  text: string; // The text to display on the button
  bgColor: string; // The background color class (e.g., 'bg-blue-500')
  hoverColor: string; // The hover color class (e.g., 'hover:bg-blue-700')
  height?: string; // Optional height class (e.g., 'h-10')
  width?: string; // Optional width class (e.g., 'w-32')
}

const Button: React.FC<ButtonProps> = ({ text, bgColor, hoverColor, height, width }) => {
  const buttonClasses = `text-white font-bold py-1 px-3 rounded-lg m-4 ${bgColor} hover:${hoverColor} ${height} ${width}`;
  
  return (
    <div>
      <button className={buttonClasses}>{text}</button>
    </div>
  );
};

export default Button;
