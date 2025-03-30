import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gallery_1 from "../../../assets/gallery_1.png"; // Import the background image
import TrackingForm from "./TrackingForm"; // Import TrackingForm component

// Define props interface
interface TrackingOTPProps {
  email: string;
  onReturn: () => void;
  onVerificationSuccess?: () => void; // Add optional callback prop
}

const TrackingOTP = ({ email, onReturn, onVerificationSuccess }: TrackingOTPProps) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showTrackingForm, setShowTrackingForm] = useState(false); // Add state to control showing TrackingForm
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // BACKEND INTEGRATION: Replace this hardcoded OTP with the one generated from backend
  const hardcodedOtp = "123456"; // This should come from the backend

  // Effect to focus on first OTP input and start timer
  useEffect(() => {
    // Focus on the first OTP input
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 50);

    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // Time's up, clear interval and return to email page
          if (timerRef.current) clearInterval(timerRef.current);
          setMessage("OTP verification timeout. Please try again.");
          // Return to email page after timeout
          setTimeout(() => {
            onReturn();
          }, 3000);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup timer when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [onReturn]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace key in OTP input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.join("").length === 6) {
      // BACKEND INTEGRATION: Replace this with actual API call
      // const response = await fetch('your-backend-url/validate-otp', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ email, otp: otp.join("") })
      // });
      // const data = await response.json();
      // const isOtpCorrect = data.success;
      
      // Using hardcoded OTP comparison for now
      const isOtpCorrect = otp.join("") === hardcodedOtp;
      
      if (isOtpCorrect) {
        // Clear the timer when OTP is submitted successfully
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setMessage("OTP verified successfully!");
        setIsOtpVerified(true);
        
        // BACKEND INTEGRATION: Additional steps after verification
        // - Store authentication token from response
        // - Set user verification status in your app state/context
      } else {
        // Increment attempt counter
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          // Maximum attempts reached, reset to email page
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setMessage("Maximum attempts reached. Please try again with a new OTP.");
          
          // Return to email page after max attempts
          setTimeout(() => {
            onReturn();
          }, 3000);
        } else {
          // Still have attempts left
          setOtp(Array(6).fill(""));
          setMessage(`Invalid OTP. ${3 - newAttempts} attempts remaining.`);
          // Focus on first input after clearing
          setTimeout(() => {
            otpRefs.current[0]?.focus();
          }, 50);
        }
      }
    } else {
      setMessage("Please enter all 6 digits of the OTP.");
    }
  };

  // Handle OK button click after successful verification
  const handleOkClick = () => {
    // Navigate to TrackingForm by setting state
    setShowTrackingForm(true);
    
    // If parent provided a success callback, call it
    if (onVerificationSuccess) {
      onVerificationSuccess();
    }
    
    // For debugging
    console.log("Navigating to TrackingForm after successful verification");
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // If verification is complete and user clicked OK, show TrackingForm
  if (showTrackingForm) {
    return <TrackingForm />;
  }

  return (
    // Full screen container with background image
    <div className="flex flex-col items-center justify-center h-screen text-center" 
         style={{ backgroundImage: `url(${gallery_1})` }}>
      {/* Larger box with opacity effect */}
      <div className="w-[550px] h-[500px] border-2 p-6 bg-white opacity-85 
                     flex flex-col items-center justify-center text-center rounded-xl 
                     shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-lg font-bold text-center mb-4">
          {isOtpVerified ? "Verification Complete" : "Enter OTP"}
        </h2>
        
        {/* Progress indicator */}
        <div className="w-3/4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <span className="text-xs mt-1">Finished</span>
            </div>
            
            <div className="flex-1 h-1 mx-2 bg-green-500"></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold 
                ${isOtpVerified ? 'bg-green-500 text-white' : 
                  attempts >= 3 ? 'bg-red-500 text-white' : 
                  timeLeft === 0 ? 'bg-red-500 text-white' : 
                  'bg-yellow-500 text-white'}`}>
                {isOtpVerified ? '✓' : 
                 attempts >= 3 || timeLeft === 0 ? '!' : '2'}
              </div>
              <span className="text-xs mt-1">
                {isOtpVerified ? 'Finished' : 
                 attempts >= 3 || timeLeft === 0 ? 'Failed' : 'OTP'}
              </span>
            </div>
          </div>
        </div>
        
        {isOtpVerified ? (
          <div className="w-80 mt-4 text-center">
            {/* Success message with OK symbol */}
            <div className="mb-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-green-600 font-medium">Your email has been successfully verified!</p>
            </div>
            
            {/* OK Button */}
            <button
              type="button"
              className="text-white font-bold py-1 px-3 rounded-lg m-4 bg-green-500 hover:bg-green-600 w-full"
              onClick={handleOkClick}
            >
              OK
            </button>
          </div>
        ) : (
          <form onSubmit={handleOtpSubmit} className="w-80 mt-4">
            <div className="mb-2">
              <p className="text-sm text-gray-600 mb-1">
                OTP sent to: <span className="font-medium">{email}</span>
              </p>
              <div className="text-sm text-gray-600">
                Time remaining: <span className={timeLeft <= 10 ? "text-red-600 font-bold" : ""}>{formatTime(timeLeft)}</span>
              </div>
              <div className="text-xs text-gray-500">
                Attempts: {attempts}/3
              </div>
            </div>
            
            <div className="flex justify-center space-x-2 my-4">
              {otp.map((digit, index) => (
                <input 
                  key={index} 
                  type="text" 
                  value={digit} 
                  maxLength={1} 
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-10 text-center border border-gray-300 rounded"
                />
              ))}
            </div>
            
            <button type="submit" 
              disabled={otp.join("").length !== 6}
              className={`w-full p-2 rounded font-medium 
                ${otp.join("").length === 6 ? "bg-black text-white hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}>
              Verify OTP
            </button>
          </form>
        )}
        
        {!isOtpVerified && message && (
          <p className={`mt-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackingOTP;
