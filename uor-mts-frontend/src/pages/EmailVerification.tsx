import React, { useState, useRef, useEffect } from "react";
import gallery_1 from "../assets/gallery_1.png";

export default function EmailVerification() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(30);
    const [attempts, setAttempts] = useState(0);
    const otpRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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

        // BACKEND CONNECTION NEEDED HERE
        // This is where we would send a request to the backend to send an OTP to the user's email
        // Example endpoint: POST /email-verification/verify/${email}
        
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
        
        // BACKEND CONNECTION NEEDED HERE
        // This is where we would send the OTP to the backend for verification
        // Example endpoint: POST /email-verification/validate-otp with the OTP and email in the request body
        
        // Simulating OTP verification without backend
        if (otp.join("").length === 6) {
            // In a real application, we would check if the OTP is correct here
            const isOtpCorrect = false; // Simulating incorrect OTP for testing
            
            if (isOtpCorrect) {
                // Clear the timer when OTP is submitted successfully
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
                setMessage("OTP verified successfully!");
                // After successful verification, you might want to:
                // - Store authentication token
                // - Redirect user to another page
                // - Update user verification status
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

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center" style={{ backgroundImage: `url(${gallery_1})` }}>
            <div 
                className="w-[499px] h-[398px] border-2 p-4 bg-white opacity-65  
                flex flex-col items-center justify-center text-center rounded-xl  
                shadow-lg shadow-black hover:opacity-95 transition-opacity duration-300">
                <h2 className="text-lg font-bold">{isVerified ? "Enter OTP" : "Email Verification"}</h2>
                {!isVerified ? (
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
                {message && <p style={{ marginTop: "10px", color: message.includes("success") ? "green" : "red" }}>{message}</p>}
            </div>
        </div>
    );
}