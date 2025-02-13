import type React from "react";
import Logo from "../assets/Logo.png"; // Import the logo

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 bg-center bg-cover brightness-100 bg-custom-bg">
      {/* Header Section */}
      <form
        className="w-[800px] h-[470px] rounded-md opacity-90 pt-14  mx-auto bg-[#681d1d] shadow-md  space-y-6"
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
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full max-w-md px-4 py-3 text-white border rounded bg-white/20 border-white/10 placeholder-white/70 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-[95px] bg-[#4169E1] text-white py-3 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}