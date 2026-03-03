import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleCancel = () => navigate("/");

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const inputStyle =
    "w-full mt-1 px-4 py-2 rounded-lg bg-black/60 text-white border border-gray-700 \
    focus:bg-black focus:ring-2 focus:ring-green-500 \
    hover:border-green-500 hover:bg-black/70 \
    outline-none transition text-sm";

  return (
    <section className="bg-[rgb(11,14,31)] min-h-screen pt-25 pb-12 px-4">

      {/* Autofill Fix */}
      <style>
        {`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        select:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #000 inset !important;
          box-shadow: 0 0 0px 1000px #000 inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}
      </style>

      <div className="max-w-xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-2xl shadow-2xl border border-green-500/20">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          Loan Enquiry Form
        </h2>

        {/* Step Indicator */}
    {/* Step Indicator */}
<div className="relative flex items-center justify-between mb-2 px-6">

  {/* Background Line (center se center tak) */}
  <div className="absolute top-4 left-[17.5%] right-[17.5%] h-0.5 bg-gray-700"></div>

  {/* Active Progress Line */}
  <div
    className="absolute top-4 left-[17.5%] h-0.5 bg-green-500 transition-all duration-500"
    style={{
      width:
        step === 1
          ? "0%"
          : step === 2
          ? "35.5%"
          : "65%",
    }}
  ></div>

  {[1, 2, 3].map((item) => (
    <div key={item} className="relative z-10 flex flex-col items-center w-1/3">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition
        ${
          step >= item
            ? "bg-green-500 text-black"
            : "bg-gray-700 text-gray-300"
        }`}
      >
        {item}
      </div>

      <span className="text-xs mt-2 text-gray-400">
        {item === 1 && "Basic"}
        {item === 2 && "Loan"}
        {item === 3 && "Financial"}
      </span>
    </div>
  ))}
</div>

        <form className="space-y-5">

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-green-400 text-sm">Full Name</label>
                <input type="text" className={inputStyle} />
              </div>

              <div>
                <label className="text-green-400 text-sm">Email</label>
                <input type="email" className={inputStyle} />
              </div>

              <div>
                <label className="text-green-400 text-sm">Mobile Number</label>
                <input type="tel" className={inputStyle} />
              </div>

              <div>
                <label className="text-green-400 text-sm">State</label>
                <input type="text" className={inputStyle} />
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Zip Code</label>
                <input type="text" className={inputStyle} />
              </div>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-green-400 text-sm">Loan Type</label>
                <select className={inputStyle}>
                  <option value="">Select Loan Type</option>
                  <option value="personal">Personal</option>
                  <option value="auto">Auto</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div>
                <label className="text-green-400 text-sm">Loan Amount</label>
                <input type="number" className={inputStyle} />
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Loan Purpose</label>
                <input type="text" className={inputStyle} />
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Preferred Contact</label>
                <select className={inputStyle}>
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-green-400 text-sm">Employment Status</label>
                <select className={inputStyle}>
                  <option value="">Select</option>
                  <option value="employed">Employed</option>
                  <option value="self_employed">Self Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div>
                <label className="text-green-400 text-sm">Monthly Income</label>
                <select className={inputStyle}>
                  <option>0-2000</option>
                  <option>2000-4000</option>
                  <option>4000-7000</option>
                  <option>7000-10000</option>
                  <option>10000+</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Credit Score Range</label>
                <select className={inputStyle}>
                  <option>300-579</option>
                  <option>580-669</option>
                  <option>670-739</option>
                  <option>740+</option>
                </select>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-4 flex-wrap gap-3">

            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Back
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-gradient-to-r from-green-500 to-blue-600 text-white px-7 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition"
              >
                Next
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                className="ml-auto bg-gradient-to-r from-green-500 to-blue-600 text-white px-7 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition"
              >
                Submit Enquiry
              </button>
            )}

            <button
              type="button"
              onClick={handleCancel}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            >
              Cancel
            </button>

          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          🔒 256-bit SSL encrypted. Your data stays secure.
        </p>
      </div>
    </section>
  );
}