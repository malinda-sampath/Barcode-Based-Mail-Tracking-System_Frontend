import React, { useState } from "react";
import Logo from "../../assets/Logo.png"; // Import the logo
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onEmailEnter: () => void; // Function prop to handle forgot password click
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
    expiresIn: number;
  };
}

const getDashboardRoute = (userRole: string) => {
  switch (userRole) {
    case "ROLE_SUPER_ADMIN":
      return "/admin/";

    case "ROLE_MAIL_HANDLER":
      return "/mail-handler/";

    default:
      return "/";
  }
};

const LoginForm: React.FC<LoginFormProps> = ({ onEmailEnter }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    const loginRequest: LoginRequest = { email, password };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginRequest),
        }
      );

      const output: LoginResponse = await response.json();

      if (output.status === 200 && output.data.token) {
        localStorage.setItem("token", output.data.token);

        const decoded: any = jwtDecode(output.data.token);
        navigate(getDashboardRoute(decoded.role[0].authority));
      } else {
        setError(output.message || "Invalid credentials.");
      }
    } catch (e) {
      setError("Login failed. Please check your connection.");
      console.error("Error logging in:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-center bg-cover brightness-100 bg-[url(./assets/uorbg.jpg)] h-screen w-full">
      {/* Header Section */}
      <form
        className="w-[700px] h-auto rounded-xl opacity-90 pt-14  mx-auto bg-[#681d1d] shadow-md  space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Logo */}
          <div>
            <img
              src={Logo} // Use the imported logo
              alt="University Logo"
              className="w-20 h-26"
            />
          </div>

          {/* University Name and Title */}
          <div>
            <h1 className="text-[#FFD700] text-3xl font-bold tracking-wide">
              GENERAL ADMINISTRATIVE UNIT
            </h1>
            <h2 className="text-[#FFD700] text-xl mt-1 text-left">
              UNIVERSITY OF RUHUNA
            </h2>
          </div>
        </div>

        <h3 className="mb-8 text-2xl font-semibold text-center text-white">
          LOGIN
        </h3>

        {/* Centered Input Fields and Button */}
        <div className="flex flex-col items-center space-y-6">
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full max-w-md px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-none"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full max-w-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-none pr-12"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div>
            <p>
              <button
                onClick={onEmailEnter}
                className="text-[#FFD700] hover:underline "
              >
                Forgot Password?
              </button>
            </p>
          </div>

          <button
            type="submit"
            className="w-[110px] bg-[#4169E1] text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {loading ? "Loading..." : "Login"}
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

export default LoginForm;
