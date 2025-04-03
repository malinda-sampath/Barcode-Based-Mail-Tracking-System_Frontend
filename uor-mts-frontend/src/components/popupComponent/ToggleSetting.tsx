import React, { useState } from "react";
import Popup from "./Popup";
import Button from "../buttonComponents/Button";
import { FaDownload, FaTrash, FaArchive } from "react-icons/fa";

interface ToggleSettingProps {
  actionType: "downloadAll" | "deleteAccount";
  buttonText: string;
  dialogTitle: string;
  dialogDescription: React.ReactNode;
  onConfirm: () => void;
  icon: React.ReactNode;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({
  actionType,
  buttonText,
  dialogTitle,
  dialogDescription,
  onConfirm,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getColorClasses = () => {
    return actionType === "downloadAll" 
      ? {
          border: "border-blue-200",
          text: "text-blue-600",
          bg: "bg-blue-600",
          hover: "hover:bg-blue-700"
        }
      : {
          border: "border-red-200",
          text: "text-red-600",
          bg: "bg-red-600",
          hover: "hover:bg-red-700"
        };
  };

  const colors = getColorClasses();

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border ${colors.border} ml-12 mb-6`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-lg font-semibold ${colors.text} mb-1`}>
            {dialogTitle}
          </h2>
          <p className="text-sm text-gray-600">
            {actionType === "downloadAll" 
              ? "Download a complete archive of all your backup files" 
              : "Permanent actions that cannot be undone"}
          </p>
        </div>
        
        <div className="relative">
          <Button
            text={buttonText}
            bgColor={colors.bg}
            hoverColor={colors.hover}
            height="h-10"
            width="w-40"
            //textColor="text-white"
            onClick={() => setIsOpen(true)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
            {icon}
          </span>
        </div>
      </div>

      <Popup 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        topic={dialogTitle}
      >
        <div className="space-y-4">
          <div className="text-gray-700">
            {dialogDescription}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              text="Cancel"
              bgColor="bg-gray-700"
              hoverColor="hover:bg-gray-300"
              height="h-12"
              width="w-24"
              onClick={() => setIsOpen(false)}
            />
            <Button
              text={actionType === "downloadAll" ? "Download" : "Delete Anyway"}
              bgColor={colors.bg}
              hoverColor={colors.hover}
              height="h-12"
              width="w-32"
              onClick={() => {
                onConfirm();
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};


export default ToggleSetting;