import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gallery_1 from "../../../assets/gallery_1.png";
import TrackingForm from "./TrackingForm";
import { verifyOTP, getCachedOtp } from "../../../services/Tracking/TrackingEmailService";

// Define props interface
interface TrackingOTPProps {
  email: string;
  onReturn: () => void;
  onVerificationSuccess?: () => void;
}

const TrackingOTP = ({ email, onReturn, onVerificationSuccess }: TrackingOTPProps) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [showTrackingForm, setShowTrackingForm] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [backendOtp, setBackendOtp] = useState<string | null>(null);
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Get the already cached OTP from the service
    const cachedOtp = getCachedOtp(email);
    if (cachedOtp) {
      console.log(`Retrieved cached OTP for ${email}`);
      setBackendOtp(cachedOtp);
    } else {
      console.error("No OTP found for this email. Please go back and try again.");
      setMessage("No OTP found for this email. Please go back and try again.");
      
      // Return to email page after a delay if no OTP is found
      setTimeout(() => {
        onReturn();
      }, 3000);
      return;
    }
    
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
  }, [email, onReturn]);

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

  // Handle verification failure
  const handleVerificationFailure = () => {
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
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.join("").length === 6) {
      setIsVerifying(true);
      setMessage("");
      
      try {
        // We need the backend OTP to verify
        if (!backendOtp) {
          setMessage("Unable to verify OTP. Please try again later.");
          setIsVerifying(false);
          return;
        }
        
        // Verify the OTP using the service
        const response = await verifyOTP(email, otp.join(""), backendOtp);
        
        // Only log the response status, not the OTP details
        if (process.env.NODE_ENV === 'development') {
          console.log("OTP verification status:", response.status);
        }
        
        if (response.status === 200) {
          // OTP verified successfully
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          
          setMessage("OTP verified successfully!");
          
          // Show the TrackingForm after a brief delay
          setTimeout(() => {
            setShowTrackingForm(true);
            
            // If parent provided a success callback, call it
            if (onVerificationSuccess) {
              onVerificationSuccess();
            }
          }, 1000);
        } else if (response.status === 400) {
          // Invalid OTP
          handleVerificationFailure();
        } else {
          // Other error (shouldn't happen with client-side verification)
          setMessage("Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setMessage("An unexpected error occurred. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    } else {
      setMessage("Please enter all 6 digits of the OTP.");
    }
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
        <h2 className="text-lg font-bold text-center mb-4">Enter OTP</h2>
        
        {/* Progress indicator */}
        <div className="w-3/4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <span className="text-xs mt-1">Done</span>
            </div>
            
            <div className="flex-1 h-1 mx-2 bg-green-500"></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold 
                ${attempts >= 3 ? 'bg-red-500 text-white' : 
                  timeLeft === 0 ? 'bg-red-500 text-white' : 
                  'bg-yellow-500 text-white'}`}>
                {attempts >= 3 || timeLeft === 0 ? '!' : '2'}
              </div>
              <span className="text-xs mt-1">
                {attempts >= 3 || timeLeft === 0 ? 'Failed' : 'OTP'}
              </span>
            </div>
            
            <div className="flex-1 h-1 mx-2 bg-gray-300"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-xs mt-1">Form</span>
            </div>
            
            <div className="flex-1 h-1 mx-2 bg-gray-300"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold">
                4
              </div>
              <span className="text-xs mt-1">Done</span>
            </div>
          </div>
        </div>
        
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
            disabled={otp.join("").length !== 6 || isVerifying}
            className={`w-full p-2 rounded font-medium 
              ${otp.join("").length === 6 && !isVerifying ? "bg-black text-white hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}>
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        
        {message && (
          <p className={`mt-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackingOTP;
