import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const Toast = ({
  message,
  type,
  duration = 3000,
  onClose,
  position = "bottom-right",
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    const timeout = setTimeout(onClose, 300);
    return () => clearTimeout(timeout);
  }, [onClose]);

  useEffect(() => {
    if (!isVisible || duration === Infinity) return;

    let startTime = Date.now();
    let animationFrame: number;
    let remainingTime = duration;

    const updateProgress = () => {
      if (!isPaused) {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.max(
          0,
          ((remainingTime - elapsed) / duration) * 100
        );

        setProgress(newProgress);

        if (newProgress > 0) {
          animationFrame = requestAnimationFrame(updateProgress);
        } else {
          handleClose();
        }
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, handleClose, isVisible, isPaused]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  const styles = useMemo(
    () => ({
      success: {
        background: "bg-emerald-500",
        hoverBackground: "hover:bg-emerald-600",
        icon: CheckCircle as LucideIcon,
        iconColor: "text-emerald-50",
        label: "Success notification",
      },
      error: {
        background: "bg-red-500",
        hoverBackground: "hover:bg-red-600",
        icon: AlertCircle as LucideIcon,
        iconColor: "text-red-50",
        label: "Error notification",
      },
      info: {
        background: "bg-blue-500",
        hoverBackground: "hover:bg-blue-600",
        icon: Info as LucideIcon,
        iconColor: "text-blue-50",
        label: "Information notification",
      },
      warning: {
        background: "bg-amber-500",
        hoverBackground: "hover:bg-amber-600",
        icon: AlertTriangle as LucideIcon,
        iconColor: "text-amber-50",
        label: "Warning notification",
      },
    }),
    []
  );

  const positionClasses = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  };

  const currentStyle = styles[type];
  const Icon = currentStyle.icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      aria-label={currentStyle.label}
      className={cn(
        "fixed transform transition-all duration-300 z-50",
        positionClasses[position],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={cn(
          "relative flex items-center min-w-[320px] max-w-md p-4 rounded-lg shadow-lg text-white",
          currentStyle.background,
          currentStyle.hoverBackground
        )}
      >
        <div className="flex-shrink-0 mr-3" aria-hidden="true">
          <Icon
            className={cn("w-6 h-6", currentStyle.iconColor)}
            strokeWidth={2.5}
          />
        </div>

        <div className="flex-1 pr-8">
          <p className="text-sm font-medium">{message}</p>
        </div>

        <button
          onClick={handleClose}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full",
            "hover:bg-white hover:bg-opacity-20",
            "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50",
            "transition-colors duration-200"
          )}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>

        {duration !== Infinity && (
          <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-25 w-full rounded-b-lg overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-linear rounded-b-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;
