import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar() {
  const menuStyle = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg mb-2 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0">

      {/* Logo */}
      <div className="h-24 bg-blue-900 flex items-center px-5">
        <div>
          <h1 className="text-white text-xl font-bold">
            AISC OJT PORTAL
          </h1>

          <p className="text-blue-100 text-sm mt-1">
            ADMIN (HOD)
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-3">

        <NavLink
          to="/admin/dashboard"
          className={menuStyle}
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={menuStyle}
        >
          <FaUsers />
          <span>Manage Users</span>
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={menuStyle}
        >
          <FaChartBar />
          <span>Analytics & Reports</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={menuStyle}
        >
          <FaCog />
          <span>System Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="absolute bottom-5 left-3 right-3">

        <button className="flex items-center gap-4 px-4 py-3 text-gray-600 hover:text-blue-700 w-full">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;