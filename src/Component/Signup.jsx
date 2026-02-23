import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("auth/signup", formData);

      setMessage("Signup Successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
    <section className="bg-black min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
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
            className="w-full px-4 py-2 rounded bg-black text-white border"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-black text-white border"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-black text-white border"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-black text-white border"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}