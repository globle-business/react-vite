import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, MessageCircle, User } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-900/40 text-green-400 border-l-4 border-green-400"
        : "hover:bg-blue-900/30 text-blue-200"
    }`;

  return (
    <aside className="w-64 bg-[rgb(11,14,31)] text-white min-h-screen px-6 py-6 flex flex-col">

      {/* Logo Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          CredFlow
        </h1>

        {/* Full Divider Line */}
        <div className="w-full h-[1px] bg-blue-900 mt-4"></div>
      </div>

      {/* Top Navigation */}
      <nav className="space-y-3 flex-1 mt-4">

        <Link to="/admin" className={linkStyle("/admin/home")}>
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link to="/admin/Customer" className={linkStyle("/admin/Customer")}>
          <Users size={22} />
          Customer
        </Link>

        <Link to="/admin/enquiry" className={linkStyle("/admin/enquiry")}>
          <MessageCircle size={22} />
          Enquiry
        </Link>

           <Link to="/admin/loantype" className={linkStyle("/admin/loantype")}>
          <MessageCircle size={22} />
          Loantype
        </Link>


      </nav>

      {/* Bottom Profile */}
      <div className="mt-auto pt-6">
        <div className="w-full h-[1px] bg-blue-900 mb-4"></div>

        <Link to="/admin/profile" className={linkStyle("/admin/profile")}>
          <User size={22} />
          Profile
        </Link>
      </div>

    </aside>
  );
}