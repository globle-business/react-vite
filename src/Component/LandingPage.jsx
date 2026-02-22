import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {

  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6);
  const [loanTenure, setLoanTenure] = useState(36);
  const [email, setEmail] = useState("");

   const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState("Starting Application...");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
const [step, setStep] = useState(1);
const [decision, setDecision] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const timer = setTimeout(() => {

    // If reached step 4 → reset to 1
    if (step === 4) {
      setStep(1);
      setDecision("");
    }

    // If reached step 3 and rejected → reset
    else if (step === 3 && decision === "rejected") {
      setStep(1);
      setDecision("");
    }

    // Otherwise go to next step
    else {
      setStep((prev) => prev + 1);
    }

  }, 3000); // 3 seconds per step

  return () => clearTimeout(timer);

}, [step, decision]);
  const calculateEMI = () => {
    const P = Number(loanAmount);
    const r = Number(interestRate) / 12 / 100;
    const n = Number(loanTenure);

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    return emi ? emi.toFixed(2) : 0;
  };

  const totalPayable = () => {
    return (calculateEMI() * loanTenure).toFixed(2);
  };

  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
 <section className="pt-20 md:pt-24 pb-16 md:pb-20 bg-black">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    {/* Left Content */}
    <div className="text-center md:text-left md:pl-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
        Fast & Secure <span className="text-blue-400">Loan Matching</span> in USA
      </h1>

      <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
        Connect with trusted lenders across the United States and get approved quickly.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
  
  <Link to="/apply">
    <button className="bg-gradient-to-r from-blue-600 to-green-500 hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition hover:scale-105 duration-300 w-full sm:w-auto">
      Apply Now
    </button>
  </Link>

</div>

        <button className="border border-blue-500 text-blue-300 px-5 py-2 rounded-full font-semibold hover:bg-blue-900 transition">
          Check Eligibility
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start text-sm font-semibold text-gray-300">
        <span className="text-green-400">🔒 SSL Secured</span>
        <span className="text-blue-400">⭐ 4.8/5 Rating</span>
        <span className="text-green-400">🇺🇸 Serving All 50 States</span>
      </div>
    </div>

    {/* Right Image */}
    <div className="flex justify-center md:justify-end mt-10 mr-10 md:mt-0">
      <img
        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
        alt="Loan USA"
        className="w-full max-w-md md:max-w-full h-72 sm:h-80 md:h-96 object-cover rounded-2xl shadow-xl mt-5 "
      />
    </div>

  </div>
</section>

      {/* QUICK MATCH BAR */}
<section className="py-12 md:py-16 bg-black text-center">

  {/* Loan Process Progress Line */}
  <div className="w-full">
    <div className="max-w-5xl mx-auto relative px-4">

      {/* Thick Line */}
      <div className="relative w-full h-3 sm:h-4 bg-gray-800 rounded-full">

        {/* Moving Highlight */}
        <div
          className="absolute top-0 left-0 h-3 sm:h-4 bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-1000"
          style={{ width: `${(step - 1) * 33}%` }}
        ></div>

        {/* Moving Circle */}
        <div
          className="absolute top-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white border-4 border-green-500 rounded-full shadow-xl flex items-center justify-center text-lg sm:text-xl transition-all duration-1000"
          style={{
            left: `${(step - 1) * 33}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          {step === 1 && "📝"}
          {step === 2 && "💳"}
          {step === 3 && "🔍"}
          {step === 4 && "🏦"}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-10 sm:mt-12 text-xs sm:text-sm font-semibold px-1">

        <div className={`${step >= 1 ? "text-blue-400" : "text-gray-500"}`}>
          Step 1 <br /> Fill Form
        </div>

        <div className={`${step >= 2 ? "text-green-400" : "text-gray-500"}`}>
          Step 2 <br /> Pay Fee
        </div>

        <div className={`${step >= 3 ? "text-blue-400" : "text-gray-500"}`}>
          Step 3 <br /> Review
        </div>

        <div className={`${step === 4 ? "text-green-400" : "text-gray-500"}`}>
          Step 4 <br /> Transfer
        </div>

      </div>

      {/* Dynamic Messages */}
      <div className="mt-8 sm:mt-10 text-white px-4">

        {step === 2 && (
          <p className="text-yellow-400 text-sm sm:text-base">
            Before filling the form, a service fee will be charged.
          </p>
        )}

        {step === 3 && !decision && (
          <div className="mt-4">
            <select
              className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-green-500 text-sm sm:text-base w-full sm:w-auto"
              onChange={(e) => {
                setDecision(e.target.value);
                if (e.target.value === "approved") {
                  setTimeout(() => setStep(4), 1500);
                }
              }}
            >
              <option value="">Select Decision</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}

        {decision === "approved" && step === 4 && (
          <p className="text-green-400 font-bold mt-6 text-sm sm:text-base">
            ✅ Payment transfer successfully completed.
          </p>
        )}

        {decision === "rejected" && (
          <p className="text-red-400 font-bold mt-6 text-sm sm:text-base">
            ❌ Application rejected. Your fee has been refunded.
          </p>
        )}

      </div>

    </div>
  </div>
</section>


<section className="py-16 md:py-20 bg-black">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
      Simple. Secure. Risk-Free.
    </h2>

    <p className="text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base">
      Our process is transparent and straightforward. If your loan is not approved,
      your payment is fully refunded.
    </p>

    {/* Steps */}
    <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-10">

      {/* Step 1 */}
      <div className="bg-gray-900 border border-blue-500 rounded-2xl p-6 sm:p-8 w-full md:w-1/3 shadow-lg min-h-[280px] flex flex-col">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold">
          1
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-3">
          Submit Application
        </h3>

        <p className="text-gray-400 text-sm sm:text-base flex-grow">
          Complete our secure online application and pay the standard service
          fee to begin processing.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-gray-900 border border-green-500 rounded-2xl p-6 sm:p-8 w-full md:w-1/3 shadow-lg min-h-[280px] flex flex-col">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center text-white text-lg sm:text-xl font-bold">
          2
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-3">
          Approval & Document Processing
        </h3>

        <p className="text-gray-400 text-sm sm:text-base flex-grow">
          Once approved, our team assists with document verification and final
          processing — or the lender proceeds directly with bank coordination.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-gray-900 border border-blue-500 rounded-2xl p-6 sm:p-8 w-full md:w-1/3 shadow-lg min-h-[280px] flex flex-col">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold">
          3
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-3">
          Funds Disbursed
        </h3>

        <p className="text-gray-400 text-sm sm:text-base flex-grow">
          After final confirmation, funds are securely transferred directly to
          your registered bank account.
        </p>
      </div>

    </div>

    {/* Refund Notice */}
    <div className="mt-12 md:mt-16">
      <div className="inline-block bg-gradient-to-r from-blue-600 to-green-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg">
        <p className="text-white font-semibold text-sm sm:text-base">
          Not Approved? Receive a 100% Refund.
        </p>
      </div>
    </div>

  </div>
</section>
      {/* EMI CALCULATOR */}
    <section className="py-16 md:py-20 bg-black">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">

    {/* Image */}
    <div className="flex justify-center md:justify-start">
      <img
        src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc"
        alt="EMI"
        className="w-full max-w-md md:max-w-full h-72 sm:h-80 md:h-[400px] object-cover rounded-2xl shadow-lg"
      />
    </div>

    {/* Calculator Card */}
    <div className="bg-gray-900 p-5 sm:p-6 rounded-2xl shadow-xl border border-blue-500 w-full">

      <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-white text-center md:text-left">
        EMI Calculator
      </h2>

      <div className="space-y-5">

        {/* Loan Amount */}
        <div>
          <label className="font-semibold text-blue-400 text-sm sm:text-base">
            Loan Amount: ${loanAmount}
          </label>
          <input
            type="range"
            min="1000"
            max="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full accent-blue-500 mt-2"
          />
        </div>

        {/* Interest */}
        <div>
          <label className="font-semibold text-green-400 text-sm sm:text-base">
            Interest Rate: {interestRate}%
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full accent-green-500 mt-2"
          />
        </div>

        {/* Tenure */}
        <div>
          <label className="font-semibold text-blue-400 text-sm sm:text-base">
            Tenure: {loanTenure} Months
          </label>
          <input
            type="range"
            min="6"
            max="60"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            className="w-full accent-blue-500 mt-2"
          />
        </div>

        {/* Results */}
        <div className="mt-6 border-t border-gray-700 pt-5">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">

            {/* Left Side */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Estimated EMI
              </h3>

              <div className="text-3xl sm:text-4xl font-bold text-green-400 mt-1">
                ${calculateEMI()}
              </div>
            </div>

            {/* Right Side */}
            <div className="text-left sm:text-right">
              <p className="text-gray-400 text-sm sm:text-base">
                Total Payable: ${totalPayable()}
              </p>

              <p className="mt-2 text-blue-400 font-semibold text-sm sm:text-base">
                Estimated Service Fee: ${Math.round(loanAmount * 0.02)}
              </p>
            </div>

          </div>

        </div>

        {/* Terms Message */}
        <div className="mt-4 text-xs sm:text-sm text-gray-500 text-center">
          *Service fee may vary based on loan amount and lender terms.  
          By proceeding, you agree to our Terms & Conditions.
        </div>

      </div>
    </div>

  </div>
</section>
      {/* LOAN CATEGORY */}
  <section className="py-16 md:py-20 bg-black text-center">

  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
    Explore Our Loan Solutions
  </h2>

  <p className="text-gray-400 mb-12 text-sm sm:text-base max-w-2xl mx-auto">
    Flexible financing options tailored to your personal and business needs.
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">

    {[
      { 
        title: "Personal Loan", 
        desc: "Quick access to funds for medical expenses, travel, or unexpected needs with flexible repayment options." 
      },
      { 
        title: "Business Financing", 
        desc: "Fuel your company’s growth with working capital and expansion loans designed for entrepreneurs." 
      },
      { 
        title: "Home Mortgage", 
        desc: "Affordable mortgage plans with competitive rates to help you secure your dream home." 
      },
      { 
        title: "Auto Loan", 
        desc: "Drive away with confidence through low-interest vehicle financing and easy EMIs." 
      }
    ].map((loan, i) => (
      <div 
        key={i} 
        className="bg-gray-900 rounded-xl overflow-hidden 
                   border border-green-500/20 
                   shadow-md 
                   hover:shadow-[0_0_18px_rgba(0,255,150,0.25)] 
                   transition duration-300 
                   hover:-translate-y-1"
      >

        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="Loan"
            className="h-36 sm:h-40 w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="p-4 sm:p-5 text-left">

          <h3 className="text-lg font-semibold text-white mb-2">
            {loan.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
            {loan.desc}
          </p>

          <button className="bg-green-500 hover:bg-green-600 
                             text-black px-4 py-2 rounded-full 
                             text-xs sm:text-sm font-semibold 
                             transition duration-300">
            Apply Now →
          </button>

        </div>

      </div>
    ))}

  </div>

</section>
     

      {/* RATING SECTION */}
<section className="py-16 bg-black text-center">

  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
    Trusted Across the United States 🇺🇸
  </h2>

  <p className="text-gray-400 mb-10 text-base md:text-lg">
    Rated 4.8/5 by over 12,000 verified borrowers nationwide
  </p>

  {/* Scroll Wrapper */}
  <div className="max-w-6xl mx-auto px-4 md:px-6 overflow-x-auto no-scrollbar">

    <div className="flex gap-5 md:gap-6 snap-x snap-mandatory">

      {[{
          name: "James Wilson",
          location: "Dallas, TX",
          feedback:
            "Fast approval and transparent process. The journey was smooth and clearly explained.",
          img: "https://randomuser.me/api/portraits/men/45.jpg",
          rating: 5
        },
        {
          name: "Olivia Martinez",
          location: "Los Angeles, CA",
          feedback:
            "Got competitive offers within hours. The team was responsive and professional.",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
          rating: 5
        },
        {
          name: "William Anderson",
          location: "Miami, FL",
          feedback:
            "Smooth process and quick fund transfer. Everything handled efficiently.",
          img: "https://randomuser.me/api/portraits/men/72.jpg",
          rating: 4
        },
        {
          name: "Sophia Clark",
          location: "New York, NY",
          feedback:
            "Very helpful support team. Platform is easy and transparent.",
          img: "https://randomuser.me/api/portraits/women/50.jpg",
          rating: 5
        }].map((user, i) => (
        <div
          key={i}
          className="bg-gray-900 
                     border border-green-500/30 
                     rounded-2xl 
                     shadow-md 
                     p-5 md:p-6
                     w-[85%]          /* mobile */
                     sm:w-[70%] 
                     md:w-[45%] 
                     lg:w-[32%] 
                     min-w-[85%] 
                     sm:min-w-[70%] 
                     md:min-w-[45%] 
                     lg:min-w-[32%]
                     flex-shrink-0 
                     text-left 
                     snap-start"
        >
          {/* Review Text */}
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5 min-h-[80px]">
            {user.feedback}
          </p>

          {/* Stars */}
          <div className="text-green-400 text-lg md:text-xl mb-4">
            {"★".repeat(user.rating)}
            {"☆".repeat(5 - user.rating)}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              src={user.img}
              alt={user.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <h3 className="font-semibold text-white text-sm md:text-base">
                {user.name}
              </h3>
              <p className="text-xs md:text-sm text-blue-400">
                {user.location}
              </p>
            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>



    {/* PRE-QUALIFICATION FORM */}
<section className="py-16 md:py-20 bg-black text-center px-4">

  <div className="max-w-4xl mx-auto bg-gray-900 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-green-500/30">

    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
      Check Your Loan Eligibility Instantly
    </h2>

    <p className="text-gray-400 mb-8 text-sm sm:text-base">
      Fill in your details to receive personalized loan offers with no impact on your credit score.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Loan Amount */}
      <div className="text-left">
        <label className="font-semibold text-green-400 text-sm sm:text-base">
          Loan Amount
        </label>
        <input
          type="number"
          placeholder="Enter amount (e.g. 25000)"
          className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>

      {/* Employment Type */}
      <div className="text-left">
        <label className="font-semibold text-green-400 text-sm sm:text-base">
          Employment Type
        </label>
        <select className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
          <option>Salaried</option>
          <option>Self Employed</option>
          <option>Business Owner</option>
          <option>Other</option>
        </select>
      </div>

      {/* Credit Score */}
      <div className="text-left">
        <label className="font-semibold text-green-400 text-sm sm:text-base">
          Estimated Credit Score
        </label>
        <select className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
          <option>Excellent (750+)</option>
          <option>Good (700-749)</option>
          <option>Fair (650-699)</option>
          <option>Poor (Below 650)</option>
        </select>
      </div>

      {/* Email */}
      <div className="text-left">
        <label className="font-semibold text-green-400 text-sm sm:text-base">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>

    </div>

    <button className="mt-8 w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-full font-semibold shadow-md transition duration-300 hover:scale-105 text-sm sm:text-base">
      Get Instant Offers
    </button>

    <p className="mt-4 text-xs sm:text-sm text-gray-500">
      🔒 Your information is secure and will not affect your credit score.
    </p>

  </div>
</section>


{/* FOOTER */}
<footer className="bg-black text-white pt-12 md:pt-16 pb-8 px-4 sm:px-6">

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">

    {/* Company Info */}
    <div>
      <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-4">
        CredFlow
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        CredFlow is a trusted U.S. online loan marketplace connecting borrowers 
        with verified lenders for fast, secure, and transparent financial solutions.
      </p>

      <p className="mt-4 text-sm text-blue-400">
        🇺🇸 Serving customers across the United States
      </p>
    </div>

    {/* Loan Products */}
    <div>
      <h4 className="text-lg font-semibold text-green-400 mb-4">
        Loan Solutions
      </h4>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li>Personal Loans</li>
        <li>Business Financing</li>
        <li>Debt Consolidation</li>
        <li>Emergency Funding</li>
        <li>Installment Loans</li>
      </ul>
    </div>

    {/* Company Links */}
    <div>
      <h4 className="text-lg font-semibold text-green-400 mb-4">
        Company
      </h4>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li>About CredFlow</li>
        <li>How It Works</li>
        <li>Careers</li>
        <li>Partner With Us</li>
        <li>FAQs</li>
      </ul>
    </div>

    {/* Legal & Contact */}
    <div>
      <h4 className="text-lg font-semibold text-green-400 mb-4">
        Legal & Support
      </h4>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
        <li>Responsible Lending Policy</li>
        <li>support@credflow.com</li>
        <li>+1 (800) 456-7890</li>
      </ul>
    </div>

  </div>

  {/* Divider */}
  <div className="border-t border-gray-800 mt-10 pt-6 text-center">

    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 text-gray-400 text-sm">
      <span className="hover:text-green-400 cursor-pointer">Facebook</span>
      <span className="hover:text-green-400 cursor-pointer">Twitter</span>
      <span className="hover:text-green-400 cursor-pointer">LinkedIn</span>
      <span className="hover:text-green-400 cursor-pointer">Instagram</span>
    </div>

    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
      © 2026 CredFlow. All rights reserved.  
      CredFlow is not a direct lender. We connect borrowers with independent third-party lenders. 
      Loan approval and terms are subject to lender evaluation and state regulations.
    </p>

  </div>

</footer>
    </div>
  );
}
