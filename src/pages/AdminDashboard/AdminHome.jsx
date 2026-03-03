import React from "react";
import { Users, FileText, DollarSign, CheckCircle } from "lucide-react";

export default function AdminHome() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-white min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">

      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Loan Dashboard Overview
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Welcome back, Admin 👋 Here’s your loan project summary
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

        {/* Applicants */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-700/20 border border-indigo-500/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-indigo-300 text-xs sm:text-sm">Total Applicants</h3>
              <p className="text-2xl sm:text-3xl font-bold text-indigo-400 mt-2">1,240</p>
            </div>
            <Users className="text-indigo-400 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Active Loans */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-700/20 border border-emerald-500/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-emerald-300 text-xs sm:text-sm">Active Loans</h3>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-2">820</p>
            </div>
            <FileText className="text-emerald-400 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Approved Loans */}
        <div className="bg-gradient-to-br from-sky-900/40 to-sky-700/20 border border-sky-500/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sky-300 text-xs sm:text-sm">Approved Loans</h3>
              <p className="text-2xl sm:text-3xl font-bold text-sky-400 mt-2">670</p>
            </div>
            <CheckCircle className="text-sky-400 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Total Disbursed */}
        <div className="bg-gradient-to-br from-amber-900/40 to-amber-700/20 border border-amber-500/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-300 text-xs sm:text-sm">Total Disbursed</h3>
              <p className="text-2xl sm:text-3xl font-bold text-amber-400 mt-2">₹1.9 Cr</p>
            </div>
            <DollarSign className="text-amber-400 w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

      </div>

      {/* Recent Applications */}
      <div className="mt-10 sm:mt-14 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">

        <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-cyan-400">
          Recent Loan Applications
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">

            <thead>
              <tr className="text-gray-400 border-b border-gray-700 text-sm sm:text-base">
                <th className="py-3 sm:py-4">Customer</th>
                <th className="py-3 sm:py-4">Loan Type</th>
                <th className="py-3 sm:py-4">Amount</th>
                <th className="py-3 sm:py-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-300 text-sm sm:text-base">

              <tr className="border-b border-gray-800 hover:bg-indigo-900/20 transition">
                <td className="py-3 sm:py-4 flex items-center gap-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-indigo-400"
                  />
                  Rahul Sharma
                </td>
                <td>Personal Loan</td>
                <td>₹2,50,000</td>
                <td className="text-emerald-400 font-semibold">Approved</td>
              </tr>

              <tr className="border-b border-gray-800 hover:bg-sky-900/20 transition">
                <td className="py-3 sm:py-4 flex items-center gap-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-sky-400"
                  />
                  Pooja Verma
                </td>
                <td>Business Loan</td>
                <td>₹7,50,000</td>
                <td className="text-yellow-400 font-semibold">Pending</td>
              </tr>

              <tr className="hover:bg-red-900/20 transition">
                <td className="py-3 sm:py-4 flex items-center gap-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/65.jpg"
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-red-400"
                  />
                  Amit Singh
                </td>
                <td>Home Loan</td>
                <td>₹18,00,000</td>
                <td className="text-red-400 font-semibold">Rejected</td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}