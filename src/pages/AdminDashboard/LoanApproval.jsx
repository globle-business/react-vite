import React from "react";

export default function LoanApproval() {

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-6">
        Loan Approval
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl grid md:grid-cols-2 gap-6">

        <input placeholder="Loan Amount" className="p-3 rounded bg-gray-800" />
        <input placeholder="Interest Rate (%)" className="p-3 rounded bg-gray-800" />
        <input placeholder="EMI Amount" className="p-3 rounded bg-gray-800" />
        <input placeholder="Tenure (Months)" className="p-3 rounded bg-gray-800" />

      </div>

      <div className="flex gap-4 mt-6">

        <button className="bg-green-600 px-5 py-2 rounded-lg">
          Final Approve
        </button>

        <button className="bg-red-600 px-5 py-2 rounded-lg">
          Reject
        </button>

      </div>

    </div>
  );
}