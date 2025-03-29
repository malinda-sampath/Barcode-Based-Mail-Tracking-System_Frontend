import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import TimeOut from "./TimeOut";

interface OtpEnterFormProps {
  onBack: () => void;
  onOTPSubmit: () => void;
  otp: string;
}

const OtpEnterForm: React.FC<OtpEnterFormProps> = ({
  onBack,
  otp,
  onOTPSubmit,
}) => {
  const [error, setError] = useState<string>("");
  const [inputOTP, setInputOTP] = useState(Array(6).fill(""));
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Refs for input fields

  // OTP Validation only after all fields are filled
  useEffect(() => {
    if (inputOTP.every((digit) => digit !== "")) {
      handleOTP();
    }
  }, [inputOTP]); // Trigger validation when OTP is updated

  const handleOTP = () => {
    if (inputOTP.join("") === otp) {
      onOTPSubmit();
    } else {
      setError("Invalid OTP");
    }
  };

  const handleTimeout = () => {
    setIsDisabled(true);
    setError("Time out! Please try again.");
    // Disable OTP input when timeout ends
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digit numbers
    const newOtp = [...inputOTP];
    newOtp[index] = value;
    setInputOTP(newOtp);

    // Move to the next input field if a digit is entered
    if (value && index < inputOTP.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Use ref for focusing the next input
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    handleOTP();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-center bg-cover brightness-100 bg-[url(./assets/uorbg.jpg)] h-screen w-full">
      <form
        className="w-[700px] h-auto rounded-xl opacity-90 pt-4 mx-auto bg-[#681d1d] shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between w-full px-4">
          <button
            onClick={onBack} // Trigger the back navigation
            className="text-white bg-white/20 rounded-xl hover:bg-white/50 hover:text-gray-200 transition-all duration-300 ease-in-out p-1 flex items-center justify-center"
            title="Go back"
            aria-label="Go back"
          >
            <ArrowLeft size={32} />
          </button>
        </div>

        <div className="justify-center space-y-2 mb-4">
          <h3 className="text-2xl font-semibold text-center text-white">
            Verify
          </h3>
          <p className="text-center text-white">
            Enter the 6-digit OTP sent to your email address
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="flex gap-2">
            {inputOTP.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)} // Attach ref to each input
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                placeholder="x"
                className="w-12 text-center px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-red-600"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={isDisabled}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !digit && index > 0) {
                    inputRefs.current[index - 1]?.focus(); // Focus previous input on backspace
                  }
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center">
            <p className="text-left text-white">Didn't receive the OTP? </p>
            <TimeOut onBack={onBack} onTimeout={handleTimeout} />
          </div>

          <div>
            {error && <p className="text-red-500 mb-5">{error}</p>}{" "}
            {/* Display error message */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpEnterForm;
