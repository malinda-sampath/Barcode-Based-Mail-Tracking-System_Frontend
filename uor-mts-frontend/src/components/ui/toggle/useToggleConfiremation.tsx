import { useState } from "react";

export const useToggleConfirmation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [confirmationConfig, setConfirmationConfig] = useState<{
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  const showConfirmation = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText: string = "Yes",
    cancelText: string = "No"
  ) => {
    setConfirmationConfig({
      message,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
    });
    setIsVisible(true);
  };

  const hideConfirmation = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    confirmationConfig,
    showConfirmation,
    hideConfirmation,
  };
};
