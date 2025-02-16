import React, { useEffect, useState } from "react";
import LoginForm from "../components/login/LoginForm";
import EmailEnterForm from "../components/login/EmailEnterForm";
import OtpEnterForm from "../components/login/OtpEnterForm";

const Login: React.FC = () => {
  const [view, setView] = useState<"login" | "emailEnter" | "otp">("login");
  const [resetEmail, setResetEmail] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");

  return (
    <div>
      {/* {view === "login" && <LoginForm onEmailEnter={() => setView("emailEnter")} />}
      {view === "emailEnter" && <EmailEnterForm onOTPSend={() => setView("otp")} onBack={() => setView("login")} setOTP={setOTP} />} */}
      {<OtpEnterForm onBack={() => setView("emailEnter")} otp={OTP}/>} 
      {/* {view === "otp" && <OtpEnterForm onBack={() => setView("emailEnter")} otp={OTP}/>}  */}
    </div>
  );
};

export default Login;
