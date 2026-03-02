import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function SendOtp() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await API.post("auth/send-otp", { email });

      setMessage("OTP Sent Successfully 📩");

      setTimeout(() => {
        navigate("/verifyotp", { state: { email } });
      }, 1200);

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-black to-gray-900 min-h-screen pt-32 px-4">

      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Send OTP
        </h2>

        <p className="text-gray-400 text-sm text-center mb-6">
          Enter your email to receive OTP
        </p>

        {message && (
          <p className="text-center text-sm mb-4 text-green-400">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSendOtp}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-600 focus:border-green-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition-all text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full bg-gray-700 hover:bg-gray-600 transition-all text-white py-3 rounded-lg font-semibold"
          >
            Back to Signup
          </button>

        </form>
      </div>
    </section>
  );
}