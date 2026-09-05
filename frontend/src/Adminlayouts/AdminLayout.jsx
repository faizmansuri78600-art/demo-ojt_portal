import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/AdminSidebar";
import Navbar from "../components/common/AdminNavbar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="ml-64">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;