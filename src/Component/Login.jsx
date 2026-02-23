import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios"; // make sure the path is correct

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("auth/login", formData);
      console.log("Login Response:", response.data);

      // redirect to landing page after successful login
      navigate("/"); // <-- changed here
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto 
                      bg-gradient-to-br from-gray-900 to-gray-800 
                      p-6 sm:p-8 
                      rounded-2xl 
                      shadow-2xl 
                      border border-green-500/20">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center text-sm mb-8">
          Login to access your CredFlow dashboard
        </p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-green-400 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="text-green-400 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 
                       hover:opacity-90 text-white 
                       py-2.5 rounded-full 
                       font-semibold text-sm 
                       transition duration-300 hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            Don’t have an account?{" "}
            <Link 
              to="/signup" 
              className="text-green-400 font-medium hover:text-green-300 transition"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}