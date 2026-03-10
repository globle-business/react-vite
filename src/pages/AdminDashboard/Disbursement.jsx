import React from "react";

export default function Disbursement() {

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-6">
        Loan Disbursement
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl grid md:grid-cols-2 gap-6">

        <input placeholder="Bank Name" className="p-3 rounded bg-gray-800" />
        <input placeholder="Account Number" className="p-3 rounded bg-gray-800" />
        <input placeholder="IFSC Code" className="p-3 rounded bg-gray-800" />
        <input placeholder="Transfer Amount" className="p-3 rounded bg-gray-800" />
        <input placeholder="Transaction ID" className="p-3 rounded bg-gray-800" />

      </div>

      <div className="mt-6">

        <button className="bg-green-600 px-6 py-2 rounded-lg">
          Mark as Disbursed
        </button>

      </div>

    </div>
  );
}