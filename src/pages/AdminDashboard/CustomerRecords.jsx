import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import API from "../../api/axios";

export default function CustomerRecords() {

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: ""
  });

  // ================= FETCH USERS =================
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {

      const res = await API.get("/users/all-users");
      const users = res.data.users;

      const formatted = users.map((u) => ({
        id: u._id,
        username: u.Username,
        email: u.email,
        phone: u.mobile,
        createdAt: u.createdAt,
        status: "Active"
      }));

      setCustomers(formatted);

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/delete-user/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // ================= CREATE / UPDATE =================
  const handleFormSubmit = async (e) => {

    e.preventDefault();

    try {

      if (selectedCustomer) {

        await API.put(`/users/update-user/${selectedCustomer.id}`, {
          Username: formData.username,
          email: formData.email,
          mobile: formData.mobile
        });

      } else {

        await API.post("/users/create-user", {
          Username: formData.username,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile
        });

      }

      fetchCustomers();
      setShowFormModal(false);
      setSelectedCustomer(null);

      setFormData({
        username: "",
        email: "",
        password: "",
        mobile: ""
      });

    } catch (error) {
      console.error("Save Error:", error.response?.data || error.message);
    }
  };

  // ================= VIEW =================
  const handleView = (cust) => {

    setSelectedCustomer(cust);
    setShowViewModal(true);

  };

  // ================= EDIT =================
  const openEditModal = (cust) => {

    setSelectedCustomer(cust);

    // ✅ Edit modal me existing data fill hoga
    setFormData({
      username: cust.username || "",
      email: cust.email || "",
      mobile: cust.phone || "",
      password: ""
    });

    setShowFormModal(true);

  };

  // ================= STATUS TOGGLE =================
  const toggleStatus = (id) => {

    setCustomers((prev) =>
      prev.map((cust) =>
        cust.id === id
          ? { ...cust, status: cust.status === "Active" ? "Deactive" : "Active" }
          : cust
      )
    );

  };

  const totalCustomers = customers.length;

  return (
    <div className="min-h-full p-4 md:p-8 text-white bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

        <h1 className="text-2xl font-bold text-cyan-400">
          Customer Management
        </h1>

        <button
          onClick={() => {

            setSelectedCustomer(null);

            setFormData({
              username: "",
              email: "",
              password: "",
              mobile: ""
            });

            setShowFormModal(true);

          }}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 w-fit"
        >
          <Plus size={18} /> Add Customer
        </button>

      </div>

      {/* STATS */}
      <div className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-xl w-fit">
        <p>Total Users</p>
        <h2 className="text-2xl font-bold">{totalCustomers}</h2>
      </div>

      {/* TABLE */}
      <div className="bg-gray-900/70 border border-gray-700 rounded-xl overflow-x-auto">

        <table className="min-w-[800px] w-full text-left text-sm">

          <thead className="bg-indigo-900/50 text-gray-300">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((cust) => (

              <tr
                key={cust.id}
                className="border-b border-gray-800 hover:bg-indigo-900/20 transition"
              >

                <td className="p-4 whitespace-nowrap">
                  {cust.id.slice(0, 6)}...{cust.id.slice(-4)}
                </td>

                <td className="p-4">

                  <div className="flex flex-col">

                    <span className="font-semibold">
                      {cust.username}
                    </span>

                    <span className="text-xs text-gray-400 break-all">
                      {cust.email}
                    </span>

                    <span className="text-xs text-gray-400">
                      {cust.phone}
                    </span>

                  </div>

                </td>

                <td className="p-4 whitespace-nowrap">

                  {cust.createdAt
                    ? new Date(cust.createdAt).toLocaleDateString()
                    : "N/A"}

                </td>

                <td className="p-4">

                  <button
                    onClick={() => toggleStatus(cust.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition
                    ${cust.status === "Active"
                        ? "bg-emerald-600/30 text-emerald-400"
                        : "bg-red-600/30 text-red-400"
                      }`}
                  >
                    {cust.status}
                  </button>

                </td>

                <td className="p-4 flex justify-center gap-4">

                  <button
                    onClick={() => handleView(cust)}
                    className="text-sky-400 hover:text-sky-300"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => openEditModal(cust)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(cust.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* CREATE / EDIT MODAL */}
      {showFormModal && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4">

          <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-6">
              {selectedCustomer ? "Edit Customer" : "Create Customer"}
            </h2>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4"
              autoComplete="off"
            >

              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
                required
              />

              <input
                type="text"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
                required
              />

              {!selectedCustomer && (
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-700"
                  required
                />
              )}

              <div className="flex justify-end gap-4 pt-4">

                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
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

      {/* VIEW MODAL */}
      {showViewModal && selectedCustomer && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4">

          <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">
              Customer Details
            </h2>

            <div className="space-y-2 text-sm">

              <p><strong>ID:</strong> {selectedCustomer.id}</p>
              <p><strong>Name:</strong> {selectedCustomer.username}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Status:</strong> {selectedCustomer.status}</p>

            </div>

            <button
              onClick={() => setShowViewModal(false)}
              className="mt-6 px-4 py-2 bg-red-600 rounded w-full"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}