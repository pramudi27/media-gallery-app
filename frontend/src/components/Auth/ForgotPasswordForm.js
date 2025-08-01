import React, { useState } from "react";
import api from "../../api/api";
import OTPForm from "./OTPForm";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      await api.post("/auth/forgot-password", { email });
      setStep(2);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword });
      setMsg("Password reset! Please log in.");
      setStep(3);
    } catch (error) {
      setErr(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
          <button type="submit">Send OTP</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleReset}>
          <input type="text" maxLength={6} required value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP" />
          <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password" />
          <button type="submit">Reset Password</button>
        </form>
      )}
      {step === 3 && <div>Password reset complete. <a href="/login">Login</a></div>}
    </div>
  );
};

export default ForgotPasswordForm;
