import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gallery_1 from "../../../assets/gallery_1.png"; // Import the background image
import TrackingOTP from "./TrackingOTP"; // Import the OTP component
import { sendVerificationEmail } from "../../../services/Tracking/TrackingEmailService"; // Import the service

const TrackingEmailEnter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showOTP, setShowOTP] = useState(false); // State to control which component is shown
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@usci\.ruh\.ac\.lk$/.test(email);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMessage("Check your email and try again!");
      return;
    }

    // Set loading state
    setIsLoading(true);
    setMessage("Sending verification email...");

    try {
      // Call the API through our service
      const response = await sendVerificationEmail(email);
      
      // Handle the response based on status
      if (response.status === 200) {
        setMessage("OTP sent to your email!");
        setShowOTP(true); // Show OTP component on success
      } else {
        // Handle error based on response status
        setMessage(response.data?.message || "Failed to send verification email. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Email verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Return to email form (for use in TrackingOTP component)
  const handleReturnToEmail = () => {
    setShowOTP(false);
  };

  // If showOTP is true, render the TrackingOTP component; otherwise, render the email form
  if (showOTP) {
    return <TrackingOTP email={email} onReturn={handleReturnToEmail} />;
  }

  return (
    // Full screen container with background image
    <div className="flex flex-col items-center justify-center h-screen text-center" 
         style={{ backgroundImage: `url(${gallery_1})` }}>
      {/* Larger box with opacity effect */}
      <div className="w-[550px] h-[500px] border-2 p-6 bg-white opacity-95 
                     flex flex-col items-center justify-center text-center rounded-xl 
                     shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-lg font-bold text-center mb-4">Email Verification</h2>
        
        {/* Progress indicator */}
        <div className="w-3/4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span className="text-xs mt-1">Email</span>
            </div>
            
            <div className="flex-1 h-1 mx-2 bg-gray-300"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-xs mt-1">OTP</span>
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
        
        <form onSubmit={handleEmailSubmit} className="w-80 mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your university email
            </label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="example@usci.ruh.ac.lk" 
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={!isValidEmail(email) || isLoading}
            className={`w-full p-2 mt-4 rounded font-medium
              ${isValidEmail(email) && !isLoading
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-gray-400 cursor-not-allowed"}`}
          >
            {isLoading ? "Processing..." : "Proceed"}
          </button>
        </form>
        
        {message && (
          <p style={{ marginTop: "10px", color: message.includes("sent") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackingEmailEnter;
