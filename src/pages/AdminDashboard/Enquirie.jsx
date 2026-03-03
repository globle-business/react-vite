import React, { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function AdminEnquirie() {

  const [enquiries, setEnquiries] = useState([
    {
      id: "ENQ-1001",
      name: "John Anderson",
      email: "john@email.com",
      phone: "+1 202-555-0178",
      loanType: "Home Loan",
      amount: "$150,000",
      status: "Pending",
      startDate: "2026-03-01",
      purpose: "Buying new house with better location",
      message: "Looking for home loan with low interest rate."
    },
    {
      id: "ENQ-1002",
      name: "Emily Carter",
      email: "emily@email.com",
      phone: "+1 202-555-0123",
      loanType: "Car Loan",
      amount: "$25,000",
      status: "Approved",
      startDate: "2026-02-25",
      purpose: "Purchase new car for family",
      message: "Need car loan for 5 years."
    },
    {
      id: "ENQ-1003",
      name: "Michael Smith",
      email: "michael@email.com",
      phone: "+1 202-555-0145",
      loanType: "Personal Loan",
      amount: "$10,000",
      status: "Rejected",
      startDate: "2026-02-20",
      purpose: "Medical emergency support",
      message: "Urgent personal loan requirement."
    }
  ]);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const total = enquiries.length;
  const pending = enquiries.filter(e => e.status === "Pending").length;
  const approved = enquiries.filter(e => e.status === "Approved").length;

  const updateStatus = (id, newStatus) => {
    setEnquiries(enquiries.map(e =>
      e.id === id ? { ...e, status: newStatus } : e
    ));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 text-white">

        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">
          Loan Enquiries
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

          <div className="bg-blue-600/20 border border-blue-500/30 p-5 rounded-xl">
            <p className="text-sm text-blue-300">Total Enquiries</p>
            <h2 className="text-2xl font-bold text-blue-400">{total}</h2>
          </div>

          <div className="bg-yellow-600/20 border border-yellow-500/30 p-5 rounded-xl">
            <p className="text-sm text-yellow-300">Pending</p>
            <h2 className="text-2xl font-bold text-yellow-400">{pending}</h2>
          </div>

          <div className="bg-emerald-600/20 border border-emerald-500/30 p-5 rounded-xl">
            <p className="text-sm text-emerald-300">Approved</p>
            <h2 className="text-2xl font-bold text-emerald-400">{approved}</h2>
          </div>

        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-gray-900/70 border border-gray-700 rounded-xl overflow-x-auto">

          <table className="w-full text-left text-sm min-w-[900px]">

            <thead className="bg-indigo-900/50 text-gray-300">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Loan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Purpose</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((enq) => (
                <tr
                  key={enq.id}
                  className="border-b border-gray-800 hover:bg-indigo-900/20 transition"
                >
                  <td className="p-4 whitespace-nowrap">{enq.id}</td>

                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{enq.name}</span>
                      <span className="text-xs text-gray-400 break-all">
                        {enq.email}
                      </span>
                      <span className="text-xs text-gray-400">
                        {enq.phone}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 whitespace-nowrap">{enq.loanType}</td>

                  <td className="p-4 whitespace-nowrap">{enq.amount}</td>

                  <td className="p-4 whitespace-nowrap">{enq.startDate}</td>

                  {/* PURPOSE TWO LINES */}
                  <td className="p-4 max-w-[180px]">
                    <p className="line-clamp-2">
                      {enq.purpose}
                    </p>
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      enq.status === "Pending"
                        ? "bg-yellow-600/30 text-yellow-400"
                        : enq.status === "Approved"
                        ? "bg-emerald-600/30 text-emerald-400"
                        : "bg-red-600/30 text-red-400"
                    }`}>
                      {enq.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center items-center gap-4">

                      <button
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setShowModal(true);
                        }}
                        className="text-sky-400 hover:scale-110 transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => updateStatus(enq.id, "Approved")}
                        className="text-emerald-400 hover:scale-110 transition"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        onClick={() => updateStatus(enq.id, "Rejected")}
                        className="text-red-400 hover:scale-110 transition"
                      >
                        <XCircle size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

      {/* MODAL */}
      {showModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto text-white">

            <h2 className="text-xl font-bold mb-4 text-cyan-400">
              Enquiry Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selectedEnquiry.id}</p>
              <p><strong>Name:</strong> {selectedEnquiry.name}</p>
              <p><strong>Email:</strong> {selectedEnquiry.email}</p>
              <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
              <p><strong>Loan Type:</strong> {selectedEnquiry.loanType}</p>
              <p><strong>Amount:</strong> {selectedEnquiry.amount}</p>
              <p><strong>Date:</strong> {selectedEnquiry.startDate}</p>
              <p><strong>Purpose:</strong> {selectedEnquiry.purpose}</p>
              <p><strong>Message:</strong> {selectedEnquiry.message}</p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-4 py-2 bg-red-600 rounded w-full hover:bg-red-700 transition"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}