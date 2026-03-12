import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ApplyForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [loanTypes, setLoanTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    state: "",
    zipCode: "",
    loanType: "",
    loanAmount: "",
    loanPurpose: "",
    preferredContact: "",
    employmentStatus: "",
    monthlyIncome: "",
    creditScore: "",
  });

  const handleCancel = () => navigate("/");

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.mobileNumber) newErrors.mobileNumber = "Required";
      if (!formData.state) newErrors.state = "Required";
      if (!formData.zipCode) newErrors.zipCode = "Required";
    }

    if (step === 2) {
      if (!formData.loanType) newErrors.loanType = "Required";
      if (!formData.loanAmount) newErrors.loanAmount = "Required";
      if (!formData.loanPurpose) newErrors.loanPurpose = "Required";
    }

    if (step === 3) {
      if (!formData.employmentStatus) newErrors.employmentStatus = "Required";
      if (!formData.monthlyIncome) newErrors.monthlyIncome = "Required";
      if (!formData.creditScore) newErrors.creditScore = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < 3) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

 useEffect(() => {
  const fetchLoanTypes = async () => {
    try {
      const res = await API.get("/loan-enquiries/loan-types");

      const types =
        res?.data?.loanTypes ||
        res?.data?.data ||
        res?.data ||
        [];

      setLoanTypes(types);

    } catch (error) {
      console.error("Loan types fetch error:", error);
      setLoanTypes([]);
    }
  };

  fetchLoanTypes();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "zipCode") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 6) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    try {
      setLoading(true);

      const res = await API.post("/loan-enquiries/create-enquiry", {
        ...formData
      });

      if (res.data.success) {
        setSuccessMsg("✅ Enquiry submitted successfully!");
        setShowModal(true);

        setFormData({
          fullName: "",
          email: "",
          mobileNumber: "",
          state: "",
          zipCode: "",
          loanType: "",
          loanAmount: "",
          loanPurpose: "",
          preferredContact: "",
          employmentStatus: "",
          monthlyIncome: "",
          creditScore: "",
        });

        setStep(1);
      }

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const inputStyle =
    "w-full mt-1 px-4 py-2 rounded-lg bg-black/60 text-white border border-gray-700 focus:bg-black focus:ring-2 focus:ring-green-500 hover:border-green-500 hover:bg-black/70 outline-none transition text-sm";

  return (
    <section className="bg-[rgb(11,14,31)] min-h-screen pt-24 pb-12 px-4">

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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 border border-green-500/30 rounded-xl p-6 max-w-md w-full text-center shadow-xl">

            <h3 className="text-xl font-bold text-green-400 mb-3">
              Enquiry Submitted ✅
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              Thank you for submitting your enquiry. Our agent will contact you shortly.
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => navigate("/signup")}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm"
              >
                Signup
              </button>

              <button
                onClick={closeModal}
                className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-full text-sm"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-2xl shadow-2xl border border-green-500/20">

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          Loan Enquiry Form
        </h2>

        {/* STEPPER UI SAME */}
        <div className="relative flex items-center justify-between mb-2 px-6">

          <div className="absolute top-4 left-[17.5%] right-[17.5%] h-0.5 bg-gray-700"></div>

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

        {/* FORM SAME */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-green-400 text-sm">Full Name</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className={inputStyle}/>
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-green-400 text-sm">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" className={inputStyle}/>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-green-400 text-sm">Mobile Number</label>
                <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} type="tel" className={inputStyle}/>
                {formData.mobileNumber.length === 10 && (
                  <p className="text-xs text-gray-400 mt-1">Maximum 10 digits allowed</p>
                )}
              </div>

              <div>
                <label className="text-green-400 text-sm">State</label>
                <input name="state" value={formData.state} onChange={handleChange} type="text" className={inputStyle}/>
                {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Zip Code</label>
                <input name="zipCode" value={formData.zipCode} onChange={handleChange} type="text" className={inputStyle}/>
                {formData.zipCode.length === 6 && (
                  <p className="text-xs text-gray-400 mt-1">Maximum 6 digits allowed</p>
                )}
              </div>

            </div>
          )}

          {/* STEP 2 & 3 SAME AS YOUR FILE */}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-green-400 text-sm">Loan Type</label>
                <select name="loanType" value={formData.loanType} onChange={handleChange} className={inputStyle}>
                  <option value="">Select Loan Type</option>
                  {loanTypes.map((loan) => (
                    <option key={loan} value={loan}>{loan}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-green-400 text-sm">Loan Amount</label>
                <input name="loanAmount" value={formData.loanAmount} onChange={handleChange} type="number" min="0"
                onKeyDown={(e)=>{ if(e.key==="-"||e.key==="e"){e.preventDefault();}}} className={inputStyle}/>
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Loan Purpose</label>
                <input name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} type="text" className={inputStyle}/>
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Preferred Contact</label>
                <select name="preferredContact" value={formData.preferredContact} onChange={handleChange} className={inputStyle}>
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>

            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-green-400 text-sm">Employment Status</label>
                <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className={inputStyle}>
                  <option value="">Select</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>

              <div>
                <label className="text-green-400 text-sm">Monthly Income</label>
                <select name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} className={inputStyle}>
                  <option>0-2000</option>
                  <option>2000-4000</option>
                  <option>4000-7000</option>
                  <option>7000-10000</option>
                  <option>10000+</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-green-400 text-sm">Credit Score Range</label>
                <select name="creditScore" value={formData.creditScore} onChange={handleChange} className={inputStyle}>
                  <option>300-579</option>
                  <option>580-669</option>
                  <option>670-739</option>
                  <option>740+</option>
                </select>
              </div>

            </div>
          )}

          <div className="flex justify-between pt-4 flex-wrap gap-3">

            {step > 1 && (
              <button type="button" onClick={prevStep} className="px-5 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition">
                Back
              </button>
            )}

            {step < 3 && (
              <button type="button" onClick={nextStep} className="ml-auto bg-gradient-to-r from-green-500 to-blue-600 text-white px-7 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">
                Next
              </button>
            )}

            {step === 3 && (
              <button type="submit" disabled={loading} className="ml-auto bg-gradient-to-r from-green-500 to-blue-600 text-white px-7 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            )}

            <button type="button" onClick={handleCancel} className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">
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