import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[rgb(11,14,31)]">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}