import { useState, useEffect } from "react";

const TimeOut = () => {
  const [timeLeft, setTimeLeft] = useState<number>(30); // Start from 30 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <button
      className={`w-[110px] text-md py-3 rounded-md transition-colors duration-200 mr-8 ${
        timeLeft > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#4169E1] hover:bg-blue-700 text-white"
      }`}
      disabled={timeLeft > 0}
    >
      {timeLeft > 0 ? timeLeft : "Try Again"}
    </button>
  )};

export default TimeOut;
