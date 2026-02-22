import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
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

        <form className="space-y-5">

          <div>
            <label className="text-green-400 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 
                       hover:opacity-90 text-white 
                       py-2.5 rounded-full 
                       font-semibold text-sm 
                       transition duration-300 hover:scale-105"
          >
            Login
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