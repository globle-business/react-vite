import React, { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import API from "../../api/axios";

export default function AdminEnquirie() {

  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= GET ALL ENQUIRIES ================= */

  const fetchEnquiries = async () => {
    try {

      const res = await API.get("/loan-enquiries/all-enquiries");

      setEnquiries(res.data.enquiries || []);

    } catch (error) {

      console.error("Error fetching enquiries", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  /* ================= GET SINGLE ================= */

  const handleView = async (id) => {
    try {

      const res = await API.get(`/loan-enquiries/enquiry/${id}`);

      setSelectedEnquiry(res.data.enquiry);
      setShowModal(true);

    } catch (error) {

      console.error("Error fetching enquiry", error);

    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {

      await API.delete(`/loan-enquiries/delete-enquiry/${id}`);

      setEnquiries(enquiries.filter((e) => e._id !== id));
      setOpenMenu(null);

    } catch (error) {

      console.error("Delete error", error);

    }
  };

  /* ================= STATUS UI (LOCAL) ================= */

  const updateStatus = (id, newStatus) => {
    setEnquiries(
      enquiries.map((e) =>
        e._id === id ? { ...e, status: newStatus } : e
      )
    );
    setOpenMenu(null);
  };

  const total = enquiries.length;
  const pending = enquiries.filter((e) => e.status === "Pending").length;
  const approved = enquiries.filter((e) => e.status === "Approved").length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading enquiries...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 text-white">

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

        {/* TABLE */}
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
                  key={enq._id}
                  className="border-b border-gray-800 hover:bg-indigo-900/20 transition"
                >

                  <td className="p-4 whitespace-nowrap">
                    {enq._id.slice(-6)}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{enq.fullName}</span>
                      <span className="text-xs text-gray-400 break-all">
                        {enq.email}
                      </span>
                      <span className="text-xs text-gray-400">
                        {enq.mobileNumber}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {enq.loanType || "N/A"}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {enq.loanAmount || "N/A"}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 max-w-[180px]">
                    <p className="line-clamp-2">
                      {enq.loanPurpose || "N/A"}
                    </p>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        enq.status === "Pending"
                          ? "bg-yellow-600/30 text-yellow-400"
                          : enq.status === "Approved"
                          ? "bg-emerald-600/30 text-emerald-400"
                          : "bg-red-600/30 text-red-400"
                      }`}
                    >
                      {enq.status || "Pending"}
                    </span>
                  </td>

                  {/* ACTION MENU */}
                  <td className="p-4 relative">

                    <div className="flex justify-center">

                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === enq._id ? null : enq._id)
                        }
                        className="text-gray-300 hover:text-white"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenu === enq._id && (
                        <div className="absolute right-6 top-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-36 z-20">

                          <button
                            onClick={() => {
                              handleView(enq._id);
                              setOpenMenu(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 text-sm"
                          >
                            <Eye size={16} /> View
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(enq._id, "Approved")
                            }
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 text-sm text-emerald-400"
                          >
                            <CheckCircle size={16} /> Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(enq._id, "Rejected")
                            }
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 text-sm text-red-400"
                          >
                            <XCircle size={16} /> Reject
                          </button>

                          <button
                            onClick={() => handleDelete(enq._id)}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 text-sm text-red-500"
                          >
                            Delete
                          </button>

                        </div>
                      )}

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
              <p><strong>Name:</strong> {selectedEnquiry.fullName}</p>
              <p><strong>Email:</strong> {selectedEnquiry.email}</p>
              <p><strong>Phone:</strong> {selectedEnquiry.mobileNumber}</p>
              <p><strong>State:</strong> {selectedEnquiry.state}</p>
              <p><strong>Zip Code:</strong> {selectedEnquiry.zipCode}</p>
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