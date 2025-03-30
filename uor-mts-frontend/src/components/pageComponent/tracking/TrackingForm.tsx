import React, { useState } from "react";
import gallery_1 from "../../../assets/gallery_1.png"; // Import your background image

const TrackingForm = () => {
  const [selectedMailType, setSelectedMailType] = useState<string | null>(null);
  const [registerCode, setRegisterCode] = useState("");
  const [trackingNumber, setTrackingNumber] = useState(""); // State for tracking number

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
      
      // BACKEND INTEGRATION: Replace with actual API call
      // try {
      //     const response = await fetch('your-api-endpoint/track-regular-mail', {
      //         method: 'POST',
      //         headers: { 'Content-Type': 'application/json' },
      //         body: JSON.stringify({ trackingNumber })
      //     });
      //     const data = await response.json();
      //     if (data.success) {
      //         // Handle successful response
      //         console.log("Successfully submitted tracking request");
      //     } else {
      //         console.error("Failed to submit tracking request");
      //     }
      // } catch (error) {
      //     console.error("Error submitting tracking request:", error);
      // }
      
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
         style={{ backgroundImage: `url(${gallery_1})` }}>
      <div 
          className="w-[650px] h-[450px] border-2 p-8 bg-white opacity-95  
          flex flex-col items-center justify-center text-center rounded-xl  
          shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300">
          
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
