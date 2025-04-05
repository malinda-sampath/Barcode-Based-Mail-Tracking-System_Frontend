import React, { useState } from "react";
import gallery_1 from "../../../assets/gallery_1.png"; // Import your background image

const TrackingForm = () => {
  const [selectedMailType, setSelectedMailType] = useState<string | null>(null);
  const [registerCode, setRegisterCode] = useState("");
  const [trackingNumber, setTrackingNumber] = useState(""); // State for tracking number
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control showing success message

  const handleMailTypeSelect = (type: string) => {
    setSelectedMailType(type);
    setRegisterCode(""); // Reset register code when changing mail type
    
    if (type === 'REGULAR MAIL') {
      // Generate tracking number for regular mail
      generateTrackingNumber();
    }
  };

  // Function to generate a random tracking number
  const generateTrackingNumber = () => {
    const newTrackingNumber = "M" + Math.floor(100000 + Math.random() * 900000);
    setTrackingNumber(newTrackingNumber);
    
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (selectedMailType === 'REGISTER POST MAIL' && !registerCode) {
      // If Register Post is selected but no code entered, don't proceed
      return;
    }

    // BACKEND INTEGRATION: Process the mail tracking request
    if (selectedMailType === 'REGULAR MAIL') {
      // BACKEND INTEGRATION: Submit regular mail tracking
      console.log(`Proceeding with Regular Mail, tracking number: ${trackingNumber}`);
      
  
      setShowSuccessMessage(true);
      
    } else if (selectedMailType === 'REGISTER POST MAIL') {
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
      //         // Handle successful response
      //         console.log("Successfully submitted register post tracking request");
      //         // Show success message
      //         setShowSuccessMessage(true);
      //     } else {
      //         console.error("Failed to submit tracking request");
      //     }
      // } catch (error) {
      //     console.error("Error submitting tracking request:", error);
      // }
      
      // For development, show success message directly
      setShowSuccessMessage(true);
    }
  };

  // Handle continue button click after success
  const handleContinue = () => {
    // BACKEND INTEGRATION: Navigate to next step or reset form
    console.log("Continue button clicked");
    // Reset state for new tracking request
    setSelectedMailType(null);
    setRegisterCode("");
    setTrackingNumber("");
    setShowSuccessMessage(false);
    
    // BACKEND INTEGRATION: Navigate to next page or dashboard
    // window.location.href = "/tracking/results";
    // OR using React Router navigate
    // navigate("/tracking/results");
  };

  // If showSuccessMessage is true, render success message
  if (showSuccessMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center" 
           style={{ backgroundImage: `url(${gallery_1})` }}>
        <div className="w-[650px] h-[450px] border-2 p-8 bg-white opacity-85  
                       flex flex-col items-center justify-center text-center rounded-xl  
                       shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300">
          <div className="w-full flex flex-col items-center justify-center">
            {/* Progress indicator for success page (step 4) */}
            <div className="w-3/4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs mt-1">Email</span>
                </div>
                
                <div className="flex-1 h-1 mx-2 bg-green-500"></div>
                
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs mt-1">OTP</span>
                </div>
                
                <div className="flex-1 h-1 mx-2 bg-green-500"></div>
                
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs mt-1">Form</span>
                </div>
                
                <div className="flex-1 h-1 mx-2 bg-green-500"></div>
                
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <span className="text-xs mt-1">Done</span>
                </div>
              </div>
            </div>
            
            {/* Success message with check icon */}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
              <p className="text-green-600 font-medium mb-2">
                {selectedMailType === 'REGULAR MAIL' 
                  ? `Your tracking request for ${trackingNumber} has been submitted.` 
                  : `Your tracking request for register code ${registerCode} has been submitted.`}
              </p>
              <p className="text-gray-600 mb-8">
                You will receive updates about your mail status.
              </p>
              
              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className="text-white font-bold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 w-48"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center" 
         style={{ backgroundImage: `url(${gallery_1})` }}>
      <div 
          className="w-[650px] h-[450px] border-2 p-8 bg-white opacity-85  
          flex flex-col items-center justify-center text-center rounded-xl  
          shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300">
          
          {/* Container for aligned content - centered vertically and horizontally */}
          <div className="w-full flex flex-col items-center justify-center">
              {/* Progress indicator - step 3 in progress */}
              <div className="w-3/4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-xs mt-1">Email</span>
                  </div>
                  
                  <div className="flex-1 h-1 mx-2 bg-green-500"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-xs mt-1">OTP</span>
                  </div>
                  
                  <div className="flex-1 h-1 mx-2 bg-green-500"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold">
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
                      type="button"
                      className={`flex items-center justify-center rounded-sm font-medium text-sm transition-colors w-[220px] h-[42px] whitespace-nowrap bg-white text-gray-700
                          ${selectedMailType === 'REGULAR MAIL' 
                              ? 'border-4 border-orange-500' 
                              : 'border-2 border-gray-300 hover:border-gray-400'}`}
                      onClick={() => handleMailTypeSelect('REGULAR MAIL')}
                  >
                      REGULAR MAIL
                  </button>
                  
                  <button 
                      type="button"
                      className={`flex items-center justify-center rounded-sm font-medium text-sm transition-colors w-[220px] h-[42px] whitespace-nowrap bg-white text-gray-700
                          ${selectedMailType === 'REGISTER POST MAIL' 
                              ? 'border-4 border-orange-500' 
                              : 'border-2 border-gray-300 hover:border-gray-400'}`}
                      onClick={() => handleMailTypeSelect('REGISTER POST MAIL')}
                  >
                      REGISTER POST MAIL
                  </button>
              </div>
              
              {/* Dynamic content based on selected mail type */}
              <form onSubmit={handleNext} className="w-full">
                {selectedMailType && (
                    <div className="w-[520px] mb-8 mx-auto">
                        {selectedMailType === 'REGULAR MAIL' ? (
                            <div className="flex items-center ml-8">
                                <span className="text-base font-medium mr-4">Your tracking number:</span>
                                {/* BACKEND INTEGRATION: Display tracking number from backend */}
                                <span className="text-base font-bold ml-2">{trackingNumber}</span>
                            </div>
                        ) : selectedMailType === 'REGISTER POST MAIL' ? (
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
                
                {/* Next button - centered */}
                <div className="flex justify-center">
                  <button 
                      type="submit"
                      className={`flex items-center justify-center rounded-md font-medium text-sm w-[190px] h-[34px]
                          ${(selectedMailType === 'REGULAR MAIL' || (selectedMailType === 'REGISTER POST MAIL' && registerCode))
                              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition-colors' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      disabled={selectedMailType === 'REGISTER POST MAIL' && !registerCode}
                  >
                      NEXT
                  </button>
                </div>
              </form>
          </div>
      </div>
    </div>
  );
};

export default TrackingForm;
