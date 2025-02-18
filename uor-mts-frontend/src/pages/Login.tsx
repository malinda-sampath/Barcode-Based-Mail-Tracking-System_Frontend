import React, { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import EmailEnterForm from "../components/login/EmailEnterForm";
import OtpEnterForm from "../components/login/OtpEnterForm";
import PasswordResetForm from "../components/login/PasswordResetForm";

const Login: React.FC = () => {
  const [view, setView] = useState<
    "login" | "emailEnter" | "otp" | "passwordReset"
  >("login");
  const [email, setEmail] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");

  return (
    <div>
      {view === "login" && (
        <LoginForm onEmailEnter={() => setView("emailEnter")} />
      )}
      {view === "emailEnter" && (
        <EmailEnterForm
          onOTPSend={() => setView("otp")}
          onBack={() => setView("login")}
          email={email}
          setEmail={setEmail}
          setOTP={setOTP}
        />
      )}
      {view === "otp" && (
        <OtpEnterForm
          onBack={() => setView("emailEnter")}
          onOTPSubmit={() => setView("passwordReset")}
          otp={OTP}
        />
      )}
      {view === "passwordReset" && (
        <PasswordResetForm
          onBack={() => setView("login")}
          email={email}
          toLogin={() => setView("login")}
        />
      )}
    </div>
  );
};

export default Login;
