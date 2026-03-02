import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Username || !formData.email || !formData.password || !formData.mobile) {
      setMessage("All fields are required ❗");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ Signup API Call
      const res = await API.post("auth/signup", formData);

      console.log("Signup Success:", res.data);

      setMessage("Signup Successful ✅ Redirecting to Send OTP...");

      // ✅ Redirect after success
      setTimeout(() => {
        navigate("/sendotp", { state: formData });
      }, 1000);

    } catch (error) {
      console.log(error);
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server Error ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-black to-gray-900 min-h-screen pt-32 px-4">

      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {message && (
          <p className="text-center text-sm mb-4 text-green-400">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            name="Username"
            placeholder="Full Name"
            value={formData.Username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-600 focus:border-green-500 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-600 focus:border-green-500 outline-none"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-600 focus:border-green-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-600 focus:border-green-500 outline-none"
            required
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 transition-all text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}