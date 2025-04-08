import React, { useState, useEffect } from "react";
import gallery_1 from "../../../assets/gallery_1.png";
import { submitTrackingRequest } from "../../../services/Tracking/TrackingService";
import { getUserEmail } from "../../../services/Tracking/TrackingEmailService"; // Assuming this function exists to get the verified email

// Function to generate a tracking number with 3 alphabetic and 5 numeric characters
const generateUUID = (): string => {
  // Generate 3 random uppercase letters
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  // Generate 5 random digits
  const numbers = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `${letters}${numbers}`;
};

const TrackingForm = () => {
  const [selectedMailType, setSelectedMailType] = useState<string | null>(null);
  const [registerCode, setRegisterCode] = useState("");
  const [trackingNumber, setTrackingNumber] = useState(""); // State for tracking number
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control showing success message
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if form has been submitted
  const [isLoading, setIsLoading] = useState(false); // Track loading state during API calls
  const [error, setError] = useState<string | null>(null); // Track any errors

  // Function to handle mail type selection
  const handleMailTypeSelect = (type: string) => {
    setSelectedMailType(type);
    setRegisterCode(""); // Reset register code when changing mail type
    setError(null); // Clear any existing errors

    if (type === "REGULAR MAIL" && (trackingNumber === "" || hasSubmitted)) {
      // Generate new tracking number only if it doesn't exist yet or after submission
      setTrackingNumber(generateUUID());
      setHasSubmitted(false); // Reset submission state
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setIsLoading(true); // Start loading

    // Validate inputs
    if (selectedMailType === "REGISTER POST MAIL" && !registerCode) {
      // If Register Post is selected but no code entered, don't proceed
      setIsLoading(false);
      return;
    }

    try {
      const email = getUserEmail(); // Get the user's email from wherever it's stored

      if (!email) {
        setError("User email not found. Please restart the verification process.");
        setIsLoading(false);
        return;
      }

      // BACKEND INTEGRATION: Process the mail tracking request
      if (selectedMailType === "REGULAR MAIL") {
        // Submit regular mail tracking with generated UUID
        console.log(`Submitting Regular Mail tracking: ${trackingNumber}`);

        const response = await submitTrackingRequest(
          email,
          "REGULAR MAIL",
          trackingNumber
        );

        if (response.status >= 200 && response.status < 300) {
          setShowSuccessMessage(true);
          setHasSubmitted(true); // Mark as submitted so new ID will be generated next time
        } else {
          // More detailed error message based on status code
          if (response.status === 500) {
            setError(`Server error (500): ${response.data?.message || "Unknown server error"}. Please try again later.`);
          } else if (response.status === 400) {
            setError(`Bad request (400): ${response.data?.message || "Invalid data provided"}`);
          } else {
            setError(`Request failed with status ${response.status}: ${response.data?.message || "Please try again."}`);
          }
        }
      } else if (selectedMailType === "REGISTER POST MAIL") {
        // Similar error handling for register post mail...
        console.log(`Submitting Register Post Mail tracking: ${registerCode}`);

        const response = await submitTrackingRequest(
          email,
          "REGISTER POST MAIL",
          registerCode
        );

        if (response.status >= 200 && response.status < 300) {
          setShowSuccessMessage(true);
          setHasSubmitted(true); // Mark as submitted
        } else {
          // More detailed error message based on status code
          if (response.status === 500) {
            setError(`Server error (500): ${response.data?.message || "Unknown server error"}. Please try again later.`);
          } else if (response.status === 400) {
            setError(`Bad request (400): ${response.data?.message || "Invalid data provided"}`);
          } else {
            setError(`Request failed with status ${response.status}: ${response.data?.message || "Please try again."}`);
          }
        }
      }
    } catch (err) {
      console.error("Error in handleNext:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // End loading regardless of outcome
    }
  };

  // Handle continue button click after success
  const handleContinue = () => {
    // Reset state for new tracking request
    setSelectedMailType(null);
    setRegisterCode("");
    setTrackingNumber(""); // Clear the tracking number
    setShowSuccessMessage(false);
    setHasSubmitted(true); // Ensure new tracking ID will be generated
    setError(null);
  };

  // Add error message display
  const ErrorMessage = () => {
    if (!error) return null;
    return <div className="text-red-500 mb-4 text-center">{error}</div>;
  };

  // If showSuccessMessage is true, render success message
  if (showSuccessMessage) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen text-center"
        style={{ backgroundImage: `url(${gallery_1})` }}
      >
        <div
          className="w-[650px] h-[450px] border-2 p-8 bg-white opacity-85  
                       flex flex-col items-center justify-center text-center rounded-xl  
                       shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300"
        >
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
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
              <p className="text-green-600 font-medium mb-2">
                {selectedMailType === "REGULAR MAIL"
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
    <div
      className="flex flex-col items-center justify-center h-screen text-center"
      style={{ backgroundImage: `url(${gallery_1})` }}
    >
      <div
        className="w-[650px] h-[450px] border-2 p-8 bg-white opacity-85  
          flex flex-col items-center justify-center text-center rounded-xl  
          shadow-lg shadow-black hover:opacity-100 transition-opacity duration-300"
      >
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

          {/* Display any errors */}
          <ErrorMessage />

          {/* Mail type selection buttons - centered with equal width */}
          <div className="w-[520px] flex flex-row gap-8 mb-8 justify-center">
            <button
              type="button"
              className={`flex items-center justify-center rounded-sm font-medium text-sm transition-colors w-[220px] h-[42px] whitespace-nowrap bg-white text-gray-700
                          ${
                            selectedMailType === "REGULAR MAIL"
                              ? "border-4 border-orange-500"
                              : "border-2 border-gray-300 hover:border-gray-400"
                          }`}
              onClick={() => handleMailTypeSelect("REGULAR MAIL")}
              disabled={isLoading}
            >
              REGULAR MAIL
            </button>

            <button
              type="button"
              className={`flex items-center justify-center rounded-sm font-medium text-sm transition-colors w-[220px] h-[42px] whitespace-nowrap bg-white text-gray-700
                          ${
                            selectedMailType === "REGISTER POST MAIL"
                              ? "border-4 border-orange-500"
                              : "border-2 border-gray-300 hover:border-gray-400"
                          }`}
              onClick={() => handleMailTypeSelect("REGISTER POST MAIL")}
              disabled={isLoading}
            >
              REGISTER POST MAIL
            </button>
          </div>

          {/* Dynamic content based on selected mail type */}
          <form onSubmit={handleNext} className="w-full">
            {selectedMailType && (
              <div className="w-[520px] mb-8 mx-auto">
                {selectedMailType === "REGULAR MAIL" ? (
                  <div className="flex items-center ml-8">
                    <span className="text-base font-medium mr-4">
                      Your tracking number:
                    </span>
                    <span className="text-base font-bold ml-2">
                      {trackingNumber}
                    </span>
                  </div>
                ) : selectedMailType === "REGISTER POST MAIL" ? (
                  <div className="flex items-center ml-8">
                    <span className="text-base font-medium mr-4">
                      Register Post code<span className="text-red-600">*</span>:
                    </span>
                    <input
                      type="text"
                      value={registerCode}
                      onChange={(e) => setRegisterCode(e.target.value)}
                      className="border border-gray-300 rounded-sm p-2 text-base w-[200px] ml-2"
                      placeholder="Enter register post code"
                      required
                      disabled={isLoading}
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
                          ${
                            selectedMailType === "REGULAR MAIL" ||
                            (selectedMailType === "REGISTER POST MAIL" &&
                              registerCode)
                              ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition-colors"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                disabled={
                  (selectedMailType === "REGISTER POST MAIL" && !registerCode) ||
                  isLoading
                }
              >
                {isLoading ? "SUBMITTING..." : "NEXT"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrackingForm;
