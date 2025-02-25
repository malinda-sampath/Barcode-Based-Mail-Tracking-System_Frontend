import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordResetFormProps {
  onBack: () => void;
  email: string;
  toLogin: () => void;
}

interface ResetPasswrodRequest {
  email: string;
  password: string;
}
interface ResetPasswrodResponse {
  status: number;
  message: string;
  data: any;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  onBack,
  email,
  toLogin,
}) => {
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleResetPassword = async () => {
    setError("");
    const resetPasswrodRequest: ResetPasswrodRequest = { email, password };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/password/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resetPasswrodRequest),
        }
      );

      const output: ResetPasswrodResponse = await response.json();

      if (output.status === 200) {
        toLogin();
      } else {
        setError(output.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else {
      handleResetPassword();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-center bg-cover brightness-100 bg-[url(./assets/uorbg.jpg)] h-screen w-full">
      {/* Header Section */}
      <form
        className="w-[700px] h-auto rounded-xl opacity-90 pt-14  mx-auto bg-[#681d1d] shadow-md  space-y-6"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-8 text-2xl font-semibold text-center text-white">
          Reset Your Password
        </h3>

        {/* Centered Input Fields and Button */}
        <div className="flex flex-col items-center space-y-6">
          {/* Password Input Field */}
          <div className="relative w-full max-w-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-none pr-12"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={() => {
                setShowPassword(!showPassword);
                showConfirmPassword
                  ? setShowConfirmPassword(!showConfirmPassword)
                  : setShowConfirmPassword(showConfirmPassword);
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* Confirm Password Input Field */}
          <div className="relative w-full max-w-md">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-none pr-12"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
                showPassword
                  ? setShowPassword(!showPassword)
                  : setShowPassword(showPassword);
              }}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="space-x-6">
            <button
              type="submit"
              className="w-[110px] bg-[#4169E1] text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
              onClick={onBack}
            >
              Back to login
            </button>
            <button
              type="submit"
              className="w-[110px] bg-[#4169E1] text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
          <div>
            {error && <p className="text-red-500 pb-5">{error}</p>}{" "}
            {/* Display error message */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;
