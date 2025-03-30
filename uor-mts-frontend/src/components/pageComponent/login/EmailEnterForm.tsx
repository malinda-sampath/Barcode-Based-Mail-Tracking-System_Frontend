import React from "react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface EmailEnterFormProps {
  onBack: () => void;
  setOTP: (otp: string) => void;
  onOTPSend: () => void;
  setEmail: (email: string) => void;
  email: string; // Function prop to handle back navigation
}

interface OTPResponse {
  status: number;
  message: string;
  data: string;
}

const EmailEnterForm: React.FC<EmailEnterFormProps> = ({
  onBack,
  setOTP,
  onOTPSend,
  setEmail,
  email,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [otp, issetOTP] = useState<boolean>(false);

  const handleEmail = async () => {
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/password/get-otp/${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
        }
      );

      const output: OTPResponse = await response.json();
      setOTP(output.data);
      issetOTP(true);
      onOTPSend();
    } catch (e) {
      setError("Request failed. Please check your connection.");
      console.error("Error logging in:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEmail();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-center bg-cover brightness-100 bg-[url(./assets/uorbg.jpg)] h-screen w-full">
      <form
        className="w-[700px] h-auto rounded-xl opacity-90 pt-4 mx-auto bg-[#681d1d] shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between w-full px-4">
          <button
            onClick={onBack} // Trigger the back navigation
            className="text-white bg-white/20 rounded-xl hover:bg-white/50 hover:text-gray-200 transition-all duration-300 ease-in-out p-1 flex items-center justify-center"
            title="Go back"
            aria-label="Go back"
          >
            <ArrowLeft size={32} />
          </button>
        </div>

        <h3 className="mb-8 text-2xl font-semibold text-center text-white">
          Enter Your Email Here
        </h3>

        {/* Centered Input Fields and Button */}
        <div className="flex flex-col items-center space-y-6">
          <input
            type="text"
            placeholder="Enter email"
            className="w-full max-w-md px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-none"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            // Trigger the OTP send
            className="w-[110px] bg-[#4169E1] text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {loading ? "Sending..." : "Send OTP"} {/* Display loading state */}
          </button>
          <div>
            {error && <p className="text-red-500 pb-5">{error}</p>}{" "}
            {/* Display error message */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailEnterForm;
