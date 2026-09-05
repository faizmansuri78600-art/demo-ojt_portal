import React, { useState } from "react";
import {
  FaUsers,
  FaGraduationCap,
  FaUserTie,
  FaBuilding,
  FaShieldAlt,
  FaSearch,
  FaFilter,
  FaRedo,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

function ManageUsers() {
  // =====================================================
  // SEARCH AND FILTER STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");
  const [status, setStatus] = useState("All Status");

  // =====================================================
  // MODAL STATES
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Selected user for View/Edit
  const [selectedUser, setSelectedUser] = useState(null);

  // =====================================================
  // NEW USER FORM
  // =====================================================

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
    phone: "",
    status: "Active",
  });

  // =====================================================
  // USERS DATA
  // =====================================================

  const [users, setUsers] = useState([
    {
      id: "USR001",
      name: "John Doe",
      email: "john.doe@student.aisc.edu",
      role: "Student",
      phone: "+91 98765 43210",
      status: "Active",
      date: "May 17, 2025",
    },
    {
      id: "USR002",
      name: "Aisha Shaikh",
      email: "aisha.shaikh@student.aisc.edu",
      role: "Student",
      phone: "+91 98765 43211",
      status: "Active",
      date: "May 16, 2025",
    },
    {
      id: "USR003",
      name: "Rahul Kumar",
      email: "rahul.kumar@aisc.edu",
      role: "Faculty",
      phone: "+91 87654 32109",
      status: "Active",
      date: "May 15, 2025",
    },
    {
      id: "USR004",
      name: "Priya Sharma",
      email: "priya.sharma@aisc.edu",
      role: "Faculty",
      phone: "+91 87654 32110",
      status: "Active",
      date: "May 14, 2025",
    },
    {
      id: "USR005",
      name: "TechSoft Solutions",
      email: "hr@techsoft.com",
      role: "Company",
      phone: "+91 98765 40001",
      status: "Active",
      date: "May 12, 2025",
    },
    {
      id: "USR006",
      name: "InnovateX Pvt. Ltd.",
      email: "contact@innovatex.com",
      role: "Company",
      phone: "+91 98765 40002",
      status: "Inactive",
      date: "May 10, 2025",
    },
    {
      id: "USR007",
      name: "OJT Coordinator",
      email: "coordinator@aisc.edu",
      role: "Coordinator",
      phone: "+91 76543 21098",
      status: "Active",
      date: "May 09, 2025",
    },
    {
      id: "USR008",
      name: "Admin User",
      email: "admin@aisc.edu",
      role: "Admin",
      phone: "+91 70000 00001",
      status: "Active",
      date: "May 01, 2025",
    },
  ]);

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.phone.toLowerCase().includes(searchText);

    const roleMatch =
      role === "All Roles" || user.role === role;

    const statusMatch =
      status === "All Status" || user.status === status;

    return searchMatch && roleMatch && statusMatch;
  });

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setRole("All Roles");
    setStatus("All Status");
  };

  // =====================================================
  // ADD USER
  // =====================================================

  const handleAddUser = () => {
    if (
      newUser.name.trim() === "" ||
      newUser.email.trim() === "" ||
      newUser.phone.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const newUserData = {
      id: `USR${String(users.length + 1).padStart(3, "0")}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      status: newUser.status,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setUsers([newUserData, ...users]);

    setNewUser({
      name: "",
      email: "",
      role: "Student",
      phone: "",
      status: "Active",
    });

    setShowAddModal(false);
  };

  // =====================================================
  // VIEW USER
  // =====================================================

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // =====================================================
  // EDIT USER
  // =====================================================

  const handleEdit = (user) => {
    setSelectedUser({ ...user });
    setShowEditModal(true);
  };

  // =====================================================
  // SAVE EDITED USER
  // =====================================================

  const handleUpdateUser = () => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      )
    );

    setShowEditModal(false);
    setSelectedUser(null);
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (confirmDelete) {
      setUsers(
        users.filter((item) => item.id !== user.id)
      );
    }
  };

  // =====================================================
  // ROLE COLORS
  // =====================================================

  const roleColors = {
    Student: "bg-blue-100 text-blue-700",
    Faculty: "bg-purple-100 text-purple-700",
    Company: "bg-orange-100 text-orange-700",
    Coordinator: "bg-cyan-100 text-cyan-700",
    Admin: "bg-gray-100 text-gray-700",
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Users
          </h1>

          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-gray-400">
              Dashboard
            </span>

            <span className="text-gray-400">
              /
            </span>

            <span className="text-gray-700">
              Manage Users
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm font-medium transition"
        >
          <FaPlus />
          Add New User
        </button>

      </div>


      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

        {/* Total Users */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaUsers />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Total Users
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                524
              </h2>

              <p className="text-xs text-green-600">
                ↑ 12% from last month
              </p>
            </div>

          </div>
        </div>


        {/* Students */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <FaGraduationCap />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Students
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                312
              </h2>

              <p className="text-xs text-green-600">
                ↑ 10% from last month
              </p>
            </div>

          </div>
        </div>


        {/* Faculty */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FaUserTie />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Faculty / Mentors
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                86
              </h2>

              <p className="text-xs text-green-600">
                ↑ 8% from last month
              </p>
            </div>

          </div>
        </div>


        {/* Companies */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <FaBuilding />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Companies
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                104
              </h2>

              <p className="text-xs text-green-600">
                ↑ 15% from last month
              </p>
            </div>

          </div>
        </div>


        {/* Coordinators */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <FaShieldAlt />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Coordinators
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                22
              </h2>

              <p className="text-xs text-green-600">
                ↑ 5% from last month
              </p>
            </div>

          </div>
        </div>

      </div>


      {/* ================================================= */}
      {/* USERS TABLE */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-5">

        {/* FILTER BAR */}

        <div className="flex flex-col xl:flex-row gap-3 mb-5">

          {/* Search */}

          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


          {/* Role */}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white outline-none min-w-[150px]"
          >
            <option>All Roles</option>
            <option>Student</option>
            <option>Faculty</option>
            <option>Company</option>
            <option>Coordinator</option>
            <option>Admin</option>
          </select>


          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white outline-none min-w-[150px]"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>


          {/* Filter */}

          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-5 py-3 text-sm text-gray-700 hover:bg-gray-50">
            <FaFilter />
            Filter
          </button>


          {/* Reset */}

          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <FaRedo />
            Reset
          </button>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="bg-gray-50 border-y border-gray-200">

                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600">
                  User ID
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600">
                  Name
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600">
                  Email
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600">
                  Role
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600">
                  Phone
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600">
                  Registered On
                </th>

                <th className="text-center px-4 py-4 text-xs font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >

                  {/* ID */}

                  <td className="px-4 py-4 text-sm text-gray-700">
                    {user.id}
                  </td>


                  {/* NAME */}

                  <td className="px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                        {user.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span className="text-sm font-medium text-gray-800">
                        {user.name}
                      </span>

                    </div>

                  </td>


                  {/* EMAIL */}

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>


                  {/* ROLE */}

                  <td className="px-4 py-4">

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}
                    >
                      {user.role}
                    </span>

                  </td>


                  {/* PHONE */}

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {user.phone}
                  </td>


                  {/* STATUS */}

                  <td className="px-4 py-4">

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>

                  </td>


                  {/* DATE */}

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {user.date}
                  </td>


                  {/* ACTIONS */}

                  <td className="px-4 py-4">

                    <div className="flex justify-center gap-2">

                      {/* VIEW */}

                      <button
                        onClick={() => handleView(user)}
                        title="View"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FaEye size={13} />
                      </button>


                      {/* EDIT */}

                      <button
                        onClick={() => handleEdit(user)}
                        title="Edit"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50"
                      >
                        <FaEdit size={13} />
                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() => handleDelete(user)}
                        title="Delete"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50"
                      >
                        <FaTrash size={13} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* TABLE FOOTER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">

          <p className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </p>

          <div className="flex items-center gap-2">

            <button className="px-3 py-2 border rounded-lg text-sm">
              ‹
            </button>

            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>

            <button className="px-3 py-2 border rounded-lg text-sm">
              2
            </button>

            <button className="px-3 py-2 border rounded-lg text-sm">
              3
            </button>

            <span className="px-2 text-gray-500">
              ...
            </span>

            <button className="px-3 py-2 border rounded-lg text-sm">
              66
            </button>

            <button className="px-3 py-2 border rounded-lg text-sm">
              ›
            </button>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* ADD USER MODAL */}
      {/* ================================================= */}

      {showAddModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

            <div className="flex items-center justify-between px-6 py-4 border-b">

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Add New User
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Enter user details below
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>


            <div className="p-6 space-y-4">

              {/* NAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>


              {/* EMAIL */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>


              {/* PHONE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>


              {/* ROLE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>

                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white"
                >
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Company</option>
                  <option>Coordinator</option>
                  <option>Admin</option>
                </select>
              </div>


              {/* STATUS */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>

                <select
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      status: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

            </div>


            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Add User
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* VIEW USER MODAL */}
      {/* ================================================= */}

      {showViewModal && selectedUser && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-md rounded-xl shadow-xl">

            <div className="flex items-center justify-between px-6 py-4 border-b">

              <h2 className="text-lg font-semibold text-gray-800">
                User Details
              </h2>

              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>


            <div className="p-6">

              {/* PROFILE */}

              <div className="flex flex-col items-center mb-6">

                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                  {selectedUser.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {selectedUser.name}
                </h3>

                <span
                  className={`mt-2 px-3 py-1 rounded-full text-xs ${roleColors[selectedUser.role]}`}
                >
                  {selectedUser.role}
                </span>

              </div>


              {/* DETAILS */}

              <div className="space-y-4">

                <div>
                  <p className="text-xs text-gray-500">
                    User ID
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.id}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.email}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.phone}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${
                      selectedUser.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>


                <div>
                  <p className="text-xs text-gray-500">
                    Registered On
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.date}
                  </p>
                </div>

              </div>

            </div>


            <div className="flex justify-end px-6 py-4 border-t bg-gray-50">

              <button
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* EDIT USER MODAL */}
      {/* ================================================= */}

      {showEditModal && selectedUser && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

            <div className="flex items-center justify-between px-6 py-4 border-b">

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Edit User
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update user information
                </p>
              </div>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>


            <div className="p-6 space-y-4">

              {/* NAME */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>

                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />

              </div>


              {/* PHONE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>

                <input
                  type="text"
                  value={selectedUser.phone}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>

                <select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      role: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white"
                >
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Company</option>
                  <option>Coordinator</option>
                  <option>Admin</option>
                </select>

              </div>


              {/* STATUS */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>

                <select
                  value={selectedUser.status}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      status: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>

            </div>


            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

              <button
                onClick={() => setShowEditModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateUser}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageUsers;