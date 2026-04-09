import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import API from "../../api/axios";

export default function LoanType() {

  const [loanTypes, setLoanTypes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editLoan, setEditLoan] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    interest: "",
    status: "Active"
  });

  /* ================= GET LOAN TYPES ================= */

  const fetchLoanTypes = async () => {
    try {

      const res = await API.get("/loan-enquiries/loan-types");

      const data = res.data.loanTypes.map((name, index) => ({
        id: index + 1,
        name,
        interest: "",
        status: "Active"
      }));

      setLoanTypes(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoanTypes();
  }, []);

  /* ================= OPEN CREATE ================= */

  const openCreate = () => {
    setEditLoan(null);
    setFormData({ name: "", interest: "", status: "Active" });
    setShowModal(true);
  };

  /* ================= OPEN EDIT ================= */

  const openEdit = (loan) => {
    setEditLoan(loan);
    setFormData(loan);
    setShowModal(true);
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editLoan) {

        await API.patch(`/loan-enquiries/toggle-loan-type/${editLoan.id}`);

        setLoanTypes(
          loanTypes.map((l) =>
            l.id === editLoan.id ? { ...l, ...formData } : l
          )
        );

      } else {

        const res = await API.post("/loan-enquiries/add-loan-type", {
          name: formData.name
        });

        const newLoan = {
          id: res.data.data._id,
          name: res.data.data.name,
          interest: formData.interest,
          status: "Active"
        };

        setLoanTypes([...loanTypes, newLoan]);

      }

      setShowModal(false);

    } catch (error) {
      console.log(error);
    }

  };

  /* ================= DELETE / TOGGLE ================= */

  const handleDelete = async (id) => {

    try {

      await API.patch(`/loan-enquiries/toggle-loan-type/${id}`);

      setLoanTypes(
        loanTypes.map((loan) =>
          loan.id === id
            ? {
                ...loan,
                status: loan.status === "Active" ? "Inactive" : "Active"
              }
            : loan
        )
      );

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-cyan-400">
          Loan Type Management
        </h1>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} /> Add Loan Type
        </button>
      </div>

      <div className="bg-gray-900/70 border border-gray-700 rounded-xl overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-indigo-900/50">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Loan Name</th>
              <th className="p-4">Interest Rate</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loanTypes.map((loan) => (
              <tr key={loan.id} className="border-b border-gray-800">
                <td className="p-4">{loan.id}</td>
                <td className="p-4">{loan.name}</td>
                <td className="p-4">{loan.interest}</td>

                <td
                  className={`p-4 ${
                    loan.status === "Active"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {loan.status}
                </td>

                <td className="p-4 flex justify-center gap-4">
                  <button
                    onClick={() => openEdit(loan)}
                    className="text-yellow-400"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(loan.id)}
                    className="text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-6">
              {editLoan ? "Edit Loan Type" : "Create Loan Type"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Loan Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
                required
              />

              <input
                type="text"
                placeholder="Interest Rate (e.g. 10%)"
                value={formData.interest}
                onChange={(e) =>
                  setFormData({ ...formData, interest: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
                required
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}