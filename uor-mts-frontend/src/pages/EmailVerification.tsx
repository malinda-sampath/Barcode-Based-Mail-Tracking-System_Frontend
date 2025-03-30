import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import gallery_1 from "../assets/gallery_1.png";

export default function EmailVerification() {
    const navigate = useNavigate(); // Initialize navigate hook
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(30);
    const [attempts, setAttempts] = useState(0);
    const [isOtpVerified, setIsOtpVerified] = useState(false); // Add this new state for OTP verification status
    const otpRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    // BACKEND INTEGRATION: Replace this hardcoded OTP with the one generated from backend
    const hardcodedOtp = "123456"; // This should come from the backend

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

        // BACKEND INTEGRATION: Replace this with actual API call
        // const response = await fetch('your-backend-url/email-verification', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // });
        // const data = await response.json();
        // if (data.success) {
        //     setMessage("OTP sent to your email!");
        //     setIsVerified(true);
        //     setTimeLeft(60);
        //     setAttempts(0);
        // } else {
        //     setMessage(data.message || "Failed to send OTP. Please try again.");
        // }
        
        // Simulating successful OTP sending without backend
        setMessage("OTP sent to your email!");
        setIsVerified(true);
        setTimeLeft(60); // Reset timer to 60 seconds
        setAttempts(0); // Reset attempts counter
    };

    // Effect to focus on first OTP input when verification state changes
    useEffect(() => {
        if (isVerified && otpRefs.current[0]) {
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
                        setIsVerified(false);
                        setOtp(Array(6).fill(""));
                        setMessage("OTP verification timeout. Please try again.");
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        // Cleanup timer when component unmounts or isVerified changes
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isVerified]);

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
                // - Redirect user to appropriate page 
                // - Set user verification status in your app state/context
                
                // Example redirect after successful verification
                // setTimeout(() => {
                //     window.location.href = '/dashboard';
                // }, 1000);
            } else {
                // Increment attempt counter
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);
                
                if (newAttempts >= 3) {
                    // Maximum attempts reached, reset to email page
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    setIsVerified(false);
                    setOtp(Array(6).fill(""));
                    setMessage("Maximum attempts reached. Please try again with a new OTP.");
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
        // Navigate to UrgentMailTracking page using the correct route
        navigate('/urgent-mail-tracking');
        
        // If the above doesn't work, you might need to use the exact path structure
        // navigate('/pages/UrgentMailTracking');
        
        // For debugging
        console.log("Navigating to UrgentMailTracking page");
    };

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    // Progress bar component with updated state and colors
    const ProgressBar = () => {
        return (
            <div className="w-3/4 mb-4">
                <div className="flex items-center justify-between">
                    {/* First step with label below */}
                    <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold 
                            ${isVerified ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                            {isVerified ? '✓' : '1'}
                        </div>
                        <span className="text-xs mt-1">{isVerified ? 'Finished' : 'Email'}</span>
                    </div>
                    
                    {/* Line connecting steps */}
                    <div className="flex-1 h-1 mx-2">
                        <div className={`h-full ${isVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    
                    {/* Second step with label below */}
                    <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold 
                            ${isOtpVerified ? 'bg-green-500 text-white' : 
                              attempts >= 3 ? 'bg-red-500 text-white' : 
                              timeLeft === 0 ? 'bg-red-500 text-white' : 
                              isVerified ? 'bg-yellow-500 text-white' : 
                              'bg-blue-500 text-white'}`}>
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
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center" style={{ backgroundImage: `url(${gallery_1})` }}>
            <div 
                className="w-[550px] h-[500px] border-2 p-6 bg-white opacity-85  
                flex flex-col items-center justify-center text-center rounded-xl  
                shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-bold">{isOtpVerified ? "Verification Complete" : isVerified ? "Enter OTP" : "Email Verification"}</h2>
                
                {/* Progress Bar */}
                <ProgressBar />
                
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
                        
                        {/* OK Button (without using a separate component) */}
                        <button
                            className="text-white font-bold py-1 px-3 rounded-lg m-4 bg-green-500 hover:bg-green-600 w-full"
                            onClick={handleOkClick}
                        >
                            OK
                        </button>
                    </div>
                ) : !isVerified ? (
                    <form onSubmit={handleEmailSubmit} className="w-80 mt-4">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="example@usci.ruh.ac.lk" 
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                        <button type="submit" 
                            disabled={!isValidEmail(email)}
                            className={`w-full p-2 mt-4 rounded  
                                ${isValidEmail(email) ? "bg-black text-white hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}>
                            Proceed
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit} className="w-80 mt-4">
                        <div className="text-sm mb-2 text-gray-600">
                            Time remaining: <span className={timeLeft <= 10 ? "text-red-600 font-bold" : ""}>{formatTime(timeLeft)}</span>
                        </div>
                        <div className="text-xs mb-2 text-gray-500">
                            Attempts: {attempts}/3
                        </div>
                        <div className="flex justify-center space-x-2">
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
                            className={`w-full p-2 mt-4 rounded 
                                ${otp.join("").length === 6 ? "bg-black text-white hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}>
                            Verify OTP
                        </button>
                    </form>
                )}
                {!isOtpVerified && message && (
                    <p style={{ marginTop: "10px", color: message.includes("success") ? "green" : "red" }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}