import { useState, useEffect } from "react";

interface TimeOutProps {
  onBack: () => void;
  onTimeout: () => void; // Notify parent when timeout ends
}

const TimeOut: React.FC<TimeOutProps> = ({ onBack, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState<number>(30); // Start from 30 seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout(); // Notify parent when timer reaches 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  return (
    <div>
      <button
        onClick={onBack}
        className={`w-[110px] text-md py-3 rounded-md transition-colors duration-200 ${
          timeLeft > 0
            ? "text-[#ffffff] cursor-not-allowed"
            : "text-[#4169E1] hover:underline"
        }`}
        disabled={timeLeft > 0}
      >
        <p>{timeLeft > 0 ? timeLeft + " sec" : "Retry"}</p>
      </button>
    </div>
  );
};

export default TimeOut;
