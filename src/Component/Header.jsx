import React, { useState, useEffect } from "react";
import { Bell, MoreVertical, User, LogOut } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);

  // ✅ Get Logged In User
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const firstLetter = storedUser?.Username
    ? storedUser.Username.charAt(0).toUpperCase()
    : "?";

  // ⏰ Live Time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dayName = time.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();
  const currentYear = time.getFullYear();

  const handleLogout = () => {
    console.log("User Logged Out");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect
  };

  return (
    <>
      <header className="bg-[rgb(11,14,31)] shadow-lg px-6 py-4 flex justify-between items-center relative">
        
        {/* Left Section */}
        <div>
          <h1 className="text-xl font-semibold text-green-400">
            Welcome 👋
          </h1>
          <p className="text-sm text-blue-300">
            {dayName} | {formattedDate} | {formattedTime}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 relative">

          {/* 🔔 Bell */}
          <div className="relative cursor-pointer">
            <Bell className="text-blue-400 hover:text-green-400 transition" size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[rgb(11,14,31)]"></span>
          </div>

          {/* ✅ Profile Circle With First Letter */}
          <div className="w-9 h-9 flex items-center justify-center text-white font-bold bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-md">
            {firstLetter}
          </div>

          {/* 3 Dot Menu */}
          <div
            className="cursor-pointer"
            onClick={() => setOpenModal(!openModal)}
          >
            <MoreVertical className="text-blue-400 hover:text-green-400 transition" />
          </div>

        </div>
      </header>

      {/* Dropdown */}
      {openModal && (
        <div className="absolute right-6 top-20 bg-[rgb(18,22,45)] text-white shadow-2xl rounded-lg w-48 border border-blue-900 z-50">

          <div className="px-4 py-3 hover:bg-blue-900/40 cursor-pointer flex items-center gap-2">
            <User size={18} className="text-green-400" />
            Profile
          </div>

          <div
            onClick={handleLogout}
            className="px-4 py-3 hover:bg-red-600/40 cursor-pointer flex items-center gap-2"
          >
            <LogOut size={18} className="text-red-400" />
            Logout
          </div>

        </div>
      )}
    </>
  );
}