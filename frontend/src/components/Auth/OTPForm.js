import React, { useState } from "react";

const OTPForm = ({ email, onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Enter the OTP sent to {email}:</p>
      <input
        type="text"
        maxLength={6}
        required
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default OTPForm;
