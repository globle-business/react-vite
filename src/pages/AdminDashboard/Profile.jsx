import React, { useState } from "react";

export default function Profile() {

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    Username: storedUser.Username || "",
    email: storedUser.email || "",
    mobile: storedUser.mobile || ""
  });

  const firstLetter = storedUser?.Username
    ? storedUser.Username.charAt(0).toUpperCase()
    : "?";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setEditMode(false);
    alert("Profile Updated Successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] p-8 text-white">

      <div className="max-w-3xl mx-auto bg-gray-900/70 border border-gray-700 rounded-2xl shadow-xl p-8">

        {/* Profile Header */}
        <div className="flex items-center gap-6">

          {/* Avatar */}
          <div className="w-20 h-20 flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-lg">
            {firstLetter}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-cyan-400">
              {storedUser.Username}
            </h2>
            <p className="text-gray-400">
              {storedUser.email}
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Profile Details */}
        <div className="space-y-5">

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Username
            </label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 bg-gray-600 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Save Changes
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}