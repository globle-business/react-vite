import React from "react";

export default function Documents() {

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-6">
        Document Verification
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl grid md:grid-cols-2 gap-6">

        <input type="file" className="bg-gray-800 p-3 rounded" />
        <p>Aadhar Card</p>

        <input type="file" className="bg-gray-800 p-3 rounded" />
        <p>PAN Card</p>

        <input type="file" className="bg-gray-800 p-3 rounded" />
        <p>Bank Statement</p>

        <input type="file" className="bg-gray-800 p-3 rounded" />
        <p>Salary Slip</p>

      </div>

      <div className="flex gap-4 mt-6">

        <button className="bg-green-600 px-5 py-2 rounded-lg">
          Verify Documents
        </button>

        <button className="bg-red-600 px-5 py-2 rounded-lg">
          Reject
        </button>

      </div>

    </div>
  );
}