import React, { useState, useEffect } from 'react';
import bgImage from '../assets/uorbg.jpg';

const UrgentMailTracking: React.FC = () => {
    const [selectedMailType, setSelectedMailType] = useState<string | null>(null);
    const [registerCode, setRegisterCode] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("123456"); // State for tracking number

    const handleMailTypeSelect = (type: string) => {
        setSelectedMailType(type);
        setRegisterCode(""); // Reset register code when changing mail type
        
        if (type === 'REGULAR') {
            // BACKEND INTEGRATION: Generate tracking number from backend
            generateTrackingNumber();
        }
    };

    // BACKEND INTEGRATION: Function to generate tracking number
    const generateTrackingNumber = async () => {
        // Currently using dummy data
        setTrackingNumber("123456");
        
        // BACKEND INTEGRATION: Replace with actual API call
        // try {
        //     const response = await fetch('your-api-endpoint/generate-tracking-number', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ mailType: 'REGULAR' })
        //     });
        //     const data = await response.json();
        //     if (data.success) {
        //         setTrackingNumber(data.trackingNumber);
        //     } else {
        //         console.error("Failed to generate tracking number");
        //     }
        // } catch (error) {
        //     console.error("Error generating tracking number:", error);
        // }
    };

    const handleNext = async () => {
        // Validate inputs
        if (selectedMailType === 'REGISTER' && !registerCode) {
            // If Register Post is selected but no code entered, don't proceed
            return;
        }

        // BACKEND INTEGRATION: Process the mail tracking request
        if (selectedMailType === 'REGULAR') {
            // BACKEND INTEGRATION: Submit regular mail tracking
            console.log(`Proceeding with Regular Mail, tracking number: ${trackingNumber}`);
            
            // BACKEND INTEGRATION: Replace with actual API call
            // try {
            //     const response = await fetch('your-api-endpoint/track-regular-mail', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ trackingNumber })
            //     });
            //     const data = await response.json();
            //     if (data.success) {
            //         // Navigate to tracking results page or update UI
            //         // window.location.href = `/tracking-results?id=${trackingNumber}`;
            //     } else {
            //         console.error("Failed to submit tracking request");
            //     }
            // } catch (error) {
            //     console.error("Error submitting tracking request:", error);
            // }
        } else if (selectedMailType === 'REGISTER') {
            // BACKEND INTEGRATION: Submit register post mail tracking
            console.log(`Proceeding with Register Post Mail, code: ${registerCode}`);
            
            // BACKEND INTEGRATION: Replace with actual API call
            // try {
            //     const response = await fetch('your-api-endpoint/track-register-mail', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ registerCode })
            //     });
            //     const data = await response.json();
            //     if (data.success) {
            //         // Navigate to tracking results page or update UI
            //         // window.location.href = `/tracking-results?id=${registerCode}`;
            //     } else {
            //         console.error("Failed to submit tracking request");
            //     }
            // } catch (error) {
            //     console.error("Error submitting tracking request:", error);
            // }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center" 
             style={{ backgroundImage: `url(${bgImage})` }}>
            <div 
                className="w-[650px] h-[450px] border-2 p-8 bg-white  
                flex flex-col items-center justify-center text-center rounded-xl  
                shadow-lg shadow-black">
                
                {/* Container for aligned content - centered vertically and horizontally */}
                <div className="w-full flex flex-col items-center justify-center">
                    {/* Text header - centered */}
                    <div className="w-full flex mb-5">
                        <div className="w-[520px] text-left ml-16">
                            <p className="text-base">
                                Choose your mail type<span className="text-red-600">*</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* Mail type selection buttons - centered with equal width */}
                    <div className="w-[520px] flex flex-row gap-8 mb-8 justify-center">
                        <button 
                            className={`flex items-center justify-center rounded-sm font-medium text-sm transition-colors w-[220px] h-[42px] whitespace-nowrap bg-white text-gray-700
                                ${selectedMailType === 'REGULAR' 
                                    ? 'border-4 border-orange-500' 
                                    : 'border-2 border-gray-300 hover:border-gray-400'}`}
                            onClick={() => handleMailTypeSelect('REGULAR')}
                        >
                            REGULAR MAIL
                        </button>
                        
                        <button 
                            className={`flex items-center justify-center rounded-sm font-medium text-sm transition-colors w-[220px] h-[42px] whitespace-nowrap bg-white text-gray-700
                                ${selectedMailType === 'REGISTER' 
                                    ? 'border-4 border-orange-500' 
                                    : 'border-2 border-gray-300 hover:border-gray-400'}`}
                            onClick={() => handleMailTypeSelect('REGISTER')}
                        >
                            REGISTER POST MAIL
                        </button>
                    </div>
                    
                    {/* Dynamic content based on selected mail type */}
                    {selectedMailType && (
                        <div className="w-[520px] mb-8">
                            {selectedMailType === 'REGULAR' ? (
                                <div className="flex items-center ml-8">
                                    <span className="text-base font-medium mr-4">Your tracking number:</span>
                                    {/* BACKEND INTEGRATION: Display tracking number from backend */}
                                    <span className="text-base font-bold ml-2">{trackingNumber}</span>
                                </div>
                            ) : selectedMailType === 'REGISTER' ? (
                                <div className="flex items-center ml-8">
                                    <span className="text-base font-medium mr-4">
                                        Register Post code<span className="text-red-600">*</span>:
                                    </span>
                                    {/* BACKEND INTEGRATION: This input value will be sent to backend */}
                                    <input
                                        type="text"
                                        value={registerCode}
                                        onChange={(e) => setRegisterCode(e.target.value)}
                                        className="border border-gray-300 rounded-sm p-2 text-base w-[200px] ml-2"
                                        placeholder="Enter register post code"
                                        required
                                    />
                                </div>
                            ) : null}
                        </div>
                    )}
                    
                    {/* Next button - 4/5 height of mail buttons */}
                    <button 
                        className={`flex items-center justify-center rounded-md font-medium text-sm w-[190px] h-[34px]
                            ${(selectedMailType === 'REGULAR' || (selectedMailType === 'REGISTER' && registerCode))
                                ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition-colors' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        onClick={handleNext}
                        disabled={selectedMailType === 'REGISTER' && !registerCode}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UrgentMailTracking;