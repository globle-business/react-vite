import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    const savedOtp = localStorage.getItem("otp");

    if (otp === savedOtp) {
      setMessage("OTP Verified Successfully ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setMessage("Invalid OTP ❌");
    }
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-96">

        <h2 className="text-white text-xl mb-4 text-center">
          Verify OTP
        </h2>

        {message && (
          <p className="text-center text-green-400 mb-3">
            {message}
          </p>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black text-white border"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Verify
          </button>
        </form>

      </div>
    </section>
  );
}