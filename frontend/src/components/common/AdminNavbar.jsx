import React from "react";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

function AdminNavbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-7">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-5">

        {/* Menu Button */}
        <button className="text-blue-600 text-xl">
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

        {/* Notification */}
        <div className="relative cursor-pointer">

          <FaBell className="text-gray-500 text-xl" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>

        </div>


        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          {/* Profile Icon */}
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FaUserCircle className="text-blue-500 text-2xl" />
          </div>

          {/* Name */}
          <div className="leading-tight">

            <p className="text-sm font-semibold text-gray-800">
              Dr . HOD Kamil Khan
            </p>

            <p className="text-xs text-gray-500">
              Head of Department
            </p>

          </div>

          <FaChevronDown className="text-gray-400 text-xs" />

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;