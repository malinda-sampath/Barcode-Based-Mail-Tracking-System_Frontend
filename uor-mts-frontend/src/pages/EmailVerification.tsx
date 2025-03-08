import React, { useState, useRef } from "react";
import gallery_1 from "../assets/gallery_1.png";

export default function EmailVerification() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const otpRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

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

        try {
            const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/email-verification/verify/${email}`;
            console.log("API URL:", apiUrl);

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to send OTP");
            }

            setMessage("OTP sent to your email!");
            setIsVerified(true);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage("Server error. Please try again later.");
        }
    };

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
            setMessage("OTP verified successfully!");
        } else {
            setMessage("Invalid OTP. Please try again.");
        }
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




