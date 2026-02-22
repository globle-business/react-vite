import React from "react";

export default function ApplyForm() {
  return (
    <section className="bg-black min-h-screen pt-24 pb-16 px-4">

      <div className="max-w-2xl mx-auto 
                      bg-gradient-to-br from-gray-900 to-gray-800 
                      p-6 sm:p-8 
                      rounded-2xl 
                      shadow-2xl 
                      border border-green-500/20">

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
          Loan Enquiry Form
        </h2>

        <p className="text-gray-400 text-center mb-8 text-sm">
          Get matched with verified lenders in minutes.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="text-green-400 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="text-green-400 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="text-green-400 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 234 567 8900"
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="text-green-400 text-sm font-medium">
              State ID
            </label>
            <input
              type="text"
              placeholder="Driver License / ID"
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-green-400 text-sm font-medium">
              SSN Number
            </label>
            <input
              type="password"
              placeholder="XXX-XX-XXXX"
              className="w-full mt-1 px-4 py-2.5 rounded-lg 
                         bg-black/70 text-white 
                         border border-gray-700 
                         focus:ring-2 focus:ring-green-500 
                         outline-none transition text-sm"
            />
          </div>

          <div className="md:col-span-2 text-center mt-3">
            <button
              type="submit"
              className="w-full sm:w-auto 
                         bg-gradient-to-r from-green-500 to-blue-600 
                         hover:opacity-90 
                         text-white 
                         px-8 py-2.5 
                         rounded-full 
                         font-semibold 
                         text-sm
                         shadow-lg 
                         transition duration-300 hover:scale-105"
            >
              Submit Application
            </button>
          </div>

        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          🔒 256-bit SSL encrypted. Your data stays secure.
        </p>

      </div>

    </section>
  );
}