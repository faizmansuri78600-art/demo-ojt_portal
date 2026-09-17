import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminNavbar() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  // Menu button
  const handleMenu = () => {
    // For now this button gives a simple visual response.
    // Sidebar toggle can be connected later.
    console.log("Menu clicked");
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-7">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-5">

        {/* Menu Button */}
        <button
          onClick={handleMenu}
          className="text-blue-600 text-xl hover:text-blue-800 transition"
          title="Menu"
        >
          <FaBars />
        </button>

        {/* Search */}
        <div className="relative w-96">

          <input
            type="text"
            placeholder="Search something..."
            className="w-full h-11 border border-gray-300 rounded-lg px-4 pr-10 text-sm outline-none focus:border-blue-500"
          />

          <FaSearch className="absolute right-4 top-3.5 text-gray-400" />

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* NOTIFICATION */}
        <div className="relative">

          <button
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
            }}
            className="relative text-gray-500 hover:text-blue-600 transition"
            title="Notifications"
          >

            <FaBell className="text-xl" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>

          </button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">

              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">
                  Notifications
                </h3>
              </div>

              <div className="p-4">

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    New user registered
                  </p>
                  <p className="text-xs text-gray-500">
                    A new user has registered.
                  </p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    New application received
                  </p>
                  <p className="text-xs text-gray-500">
                    A student submitted an application.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    System update
                  </p>
                  <p className="text-xs text-gray-500">
                    Dashboard data was updated.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* PROFILE */}
        <div className="relative">

          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationOpen(false);
            }}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1 transition"
          >

            {/* Profile Icon */}
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUserCircle className="text-blue-500 text-2xl" />
            </div>

            {/* Name */}
            <div className="leading-tight text-left">

              <p className="text-sm font-semibold text-gray-800">
                Dr . HOD Kamil Khan
              </p>

              <p className="text-xs text-gray-500">
                Head of Department
              </p>

            </div>

            <FaChevronDown
              className={`text-gray-400 text-xs transition ${
                profileOpen ? "rotate-180" : ""
              }`}
            />

          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">

              {/* Profile */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/admin/settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUserCircle className="text-blue-500" />
                Profile / Settings
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/admin/settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="text-gray-500" />
                Settings
              </button>

              <div className="border-t border-gray-200"></div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;