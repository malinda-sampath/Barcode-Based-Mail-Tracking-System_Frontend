import React,{useState} from "react";
import { ArrowLeft } from "lucide-react";
import TimeOut from "./TimeOut";

interface OtpEnterFormProps {
  onBack: () => void;
  otp: string;
   // Function prop to handle back navigation
}

const OtpEnterForm: React.FC<OtpEnterFormProps> = ({onBack,otp}) => {
  const [error, setError] = useState<string>("");
  const [inputOTP, setInputOTP] = useState(Array(6).fill(""));
  const [retryCount, setRetryCount] = useState<number>(0);

    const handleOTP = () => {
      
    }

    const handleChange = (index: number, value: string) => {
      if (!/^\d?$/.test(value)) return; // Allow only single digit numbers
      const newOtp = [...inputOTP];
      newOtp[index] = value;
      setInputOTP(newOtp);
    
      // Move to the next input field if a digit is entered
      if (value && index < inputOTP.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    };    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
          Enter OTP
        </h3>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex gap-2">
            {inputOTP.map((digit: string, index: number) => ( // Explicitly type digit as string
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                placeholder="x"
                className="w-12 text-center px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-none"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !inputOTP[index] && index > 0) {
                    const prevInput = document.getElementById(`otp-input-${index - 1}`);
                    if (prevInput) (prevInput as HTMLInputElement).focus();
                  }
                }}
              />        
            ))}
          </div>

          <div>
            <TimeOut/>

            <button
              type="submit"
              className="w-[110px] bg-[#4169E1] text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Next
            </button>

          </div>
          <div>
            {error && <p className="text-red-500 pb-5">{error}</p>} {/* Display error message */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpEnterForm;