import React from "react";

export default function LoanProcessing() {

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-6">
        Loan Processing
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl grid md:grid-cols-2 gap-6">

        <input placeholder="CIBIL Score" className="p-3 rounded bg-gray-800" />
        <input placeholder="Monthly Income" className="p-3 rounded bg-gray-800" />
        <input placeholder="Loan Amount" className="p-3 rounded bg-gray-800" />
        <input placeholder="Loan Tenure (Months)" className="p-3 rounded bg-gray-800" />

        <select className="p-3 rounded bg-gray-800">
          <option>Employment Type</option>
          <option>Salaried</option>
          <option>Self Employed</option>
        </select>

      </div>

      <div className="flex gap-4 mt-6">

        <button className="bg-green-600 px-5 py-2 rounded-lg">
          Approve Loan
        </button>

        <button className="bg-red-600 px-5 py-2 rounded-lg">
          Reject Loan
        </button>

      </div>

    </div>
  );
}