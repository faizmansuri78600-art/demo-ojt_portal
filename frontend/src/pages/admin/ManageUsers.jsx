import React, { useEffect, useState } from "react";
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
  // API URL
  // =====================================================

  const API_URL = "http://localhost:5000";

  // =====================================================
  // SEARCH AND FILTER STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");
  const [status, setStatus] = useState("All Status");

  // =====================================================
  // LOADING AND ERROR STATES
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // MODAL STATES
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // =====================================================
  // BUTTON LOADING STATES
  // =====================================================

  const [addingUser, setAddingUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  // =====================================================
  // SELECTED USER
  // =====================================================

  const [selectedUser, setSelectedUser] = useState(null);

  // =====================================================
  // NEW USER FORM
  // =====================================================

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    phone: "",
    status: "Active",
  });

  // =====================================================
  // USERS DATA
  // =====================================================

  const [users, setUsers] = useState([]);

  // =====================================================
  // DASHBOARD STATISTICS
  // =====================================================

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalFaculty: 0,
    totalCompanies: 0,
    totalCoordinators: 0,
  });

  // =====================================================
  // FETCH USERS
  // =====================================================

  useEffect(() => {
    fetchUsers();
    fetchStatistics();
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Admin token not found. Please login again.");
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error("Fetch Users Error:", error);
      setError(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH STATISTICS
  // =====================================================

  const fetchStatistics = async () => {
    try {
      const token = getToken();

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/dashboard/full`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch statistics"
        );
      }

      const dashboard = data.dashboard;

      setStats({
        totalUsers: dashboard.users?.total || 0,
        totalStudents: dashboard.users?.students || 0,
        totalFaculty: dashboard.users?.faculty || 0,
        totalCompanies: dashboard.companies?.total || 0,
        totalCoordinators:
          (dashboard.users?.companyCoordinators || 0) +
          (dashboard.users?.collegeCoordinators || 0),
      });
    } catch (error) {
      console.error("Fetch Statistics Error:", error);
    }
  };

  // =====================================================
  // REFRESH DATA
  // =====================================================

  const refreshData = () => {
    fetchUsers();
    fetchStatistics();
  };

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const userName = (user.name || "").toLowerCase();
    const userEmail = (user.email || "").toLowerCase();
    const userPhone = (user.phone || "").toLowerCase();

    const searchMatch =
      userName.includes(searchText) ||
      userEmail.includes(searchText) ||
      userPhone.includes(searchText);

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
  // RESET NEW USER FORM
  // =====================================================

  const resetNewUserForm = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "Student",
      phone: "",
      status: "Active",
    });
  };

  // =====================================================
  // ADD USER
  // =====================================================

  const handleAddUser = async () => {
    if (
      newUser.name.trim() === "" ||
      newUser.email.trim() === "" ||
      newUser.password.trim() === ""
    ) {
      alert("Please fill name, email and password.");
      return;
    }

    try {
      setAddingUser(true);

      const token = getToken();

      if (!token) {
        alert("Admin token not found. Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newUser.name.trim(),
            email: newUser.email.trim(),
            password: newUser.password,
            role: newUser.role,
            phone: newUser.phone.trim(),
            status: newUser.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create user"
        );
      }

      alert("User created successfully.");

      setUsers((prevUsers) => [
        data.user,
        ...prevUsers,
      ]);

      resetNewUserForm();
      setShowAddModal(false);

      fetchStatistics();
    } catch (error) {
      console.error("Add User Error:", error);
      alert(error.message || "Failed to create user.");
    } finally {
      setAddingUser(false);
    }
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
    setSelectedUser({
      ...user,
      password: "",
    });

    setShowEditModal(true);
  };

  // =====================================================
  // UPDATE USER
  // =====================================================

  const handleUpdateUser = async () => {
    if (!selectedUser) {
      return;
    }

    if (
      !selectedUser.name?.trim() ||
      !selectedUser.email?.trim()
    ) {
      alert("Name and email are required.");
      return;
    }

    try {
      setUpdatingUser(true);

      const token = getToken();

      if (!token) {
        alert("Admin token not found. Please login again.");
        return;
      }

      const updateData = {
        name: selectedUser.name.trim(),
        email: selectedUser.email.trim(),
        role: selectedUser.role,
        phone: selectedUser.phone || "",
        status: selectedUser.status,
      };

      // Password is optional during edit
      if (selectedUser.password?.trim()) {
        updateData.password =
          selectedUser.password.trim();
      }

      const response = await fetch(
        `${API_URL}/api/admin/users/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user"
        );
      }

      alert("User updated successfully.");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? data.user
            : user
        )
      );

      setShowEditModal(false);
      setSelectedUser(null);

      fetchStatistics();
    } catch (error) {
      console.error("Update User Error:", error);
      alert(
        error.message || "Failed to update user."
      );
    } finally {
      setUpdatingUser(false);
    }
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingUserId(user.id);

      const token = getToken();

      if (!token) {
        alert("Admin token not found. Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete user"
        );
      }

      alert("User deleted successfully.");

      setUsers((prevUsers) =>
        prevUsers.filter(
          (item) => item.id !== user.id
        )
      );

      fetchStatistics();
    } catch (error) {
      console.error("Delete User Error:", error);
      alert(
        error.message || "Failed to delete user."
      );
    } finally {
      setDeletingUserId(null);
    }
  };

  // =====================================================
  // ROLE COLORS
  // =====================================================

  const roleColors = {
    Student: "bg-blue-100 text-blue-700",
    Faculty: "bg-purple-100 text-purple-700",
    CompanyCoordinator:
      "bg-orange-100 text-orange-700",
    CollegeCoordinator:
      "bg-cyan-100 text-cyan-700",
    Administrator:
      "bg-gray-100 text-gray-700",
  };

  // =====================================================
  // ROLE DISPLAY NAME
  // =====================================================

  const getRoleDisplayName = (userRole) => {
    const roleNames = {
      Student: "Student",
      Faculty: "Faculty",
      CompanyCoordinator:
        "Company Coordinator",
      CollegeCoordinator:
        "College Coordinator",
      Administrator: "Administrator",
    };

    return roleNames[userRole] || userRole;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // USER INITIALS
  // =====================================================

  const getInitials = (name) => {
    if (!name) {
      return "U";
    }

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
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

        <div className="flex gap-3">

          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            <FaRedo
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={() => {
              resetNewUserForm();
              setShowAddModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm font-medium transition"
          >
            <FaPlus />
            Add New User
          </button>

        </div>

      </div>

      {/* ================================================= */}
      {/* ERROR MESSAGE */}
      {/* ================================================= */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

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
                {stats.totalUsers}
              </h2>

              <p className="text-xs text-gray-500">
                Registered users
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
                {stats.totalStudents}
              </h2>

              <p className="text-xs text-gray-500">
                Student accounts
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
                {stats.totalFaculty}
              </h2>

              <p className="text-xs text-gray-500">
                Faculty accounts
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
                {stats.totalCompanies}
              </h2>

              <p className="text-xs text-gray-500">
                Registered companies
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
                {stats.totalCoordinators}
              </h2>

              <p className="text-xs text-gray-500">
                College + Company
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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Role */}

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white outline-none min-w-[190px]"
          >
            <option value="All Roles">
              All Roles
            </option>

            <option value="Student">
              Student
            </option>

            <option value="Faculty">
              Faculty
            </option>

            <option value="CompanyCoordinator">
              Company Coordinator
            </option>

            <option value="CollegeCoordinator">
              College Coordinator
            </option>

            <option value="Administrator">
              Administrator
            </option>
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white outline-none min-w-[150px]"
          >
            <option value="All Status">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          {/* Filter */}

          <button
            onClick={() => {}}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
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

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading ? (
          <div className="py-16 text-center">

            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>

            <p className="text-sm text-gray-500">
              Loading users...
            </p>

          </div>
        ) : (

          /* ================================================= */
          /* TABLE */
          /* ================================================= */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1200px]">

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

                {filteredUsers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-12 text-gray-500 text-sm"
                    >
                      No users found.
                    </td>
                  </tr>

                ) : (

                  filteredUsers.map((user) => (

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
                            {getInitials(user.name)}
                          </div>

                          <span className="text-sm font-medium text-gray-800">
                            {user.name || "—"}
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
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            roleColors[user.role] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {getRoleDisplayName(
                            user.role
                          )}
                        </span>

                      </td>

                      {/* PHONE */}

                      <td className="px-4 py-4 text-sm text-gray-600">
                        {user.phone || "—"}
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
                        {formatDate(user.date)}
                      </td>

                      {/* ACTIONS */}

                      <td className="px-4 py-4">

                        <div className="flex justify-center gap-2">

                          {/* VIEW */}

                          <button
                            onClick={() =>
                              handleView(user)
                            }
                            title="View"
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <FaEye size={13} />
                          </button>

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              handleEdit(user)
                            }
                            title="Edit"
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50"
                          >
                            <FaEdit size={13} />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(user)
                            }
                            disabled={
                              deletingUserId === user.id
                            }
                            title="Delete"
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingUserId ===
                            user.id ? (
                              <div className="w-3 h-3 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                            ) : (
                              <FaTrash size={13} />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

        {/* ================================================= */}
        {/* TABLE FOOTER */}
        {/* ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">

          <p className="text-sm text-gray-500">
            Showing {filteredUsers.length} of{" "}
            {users.length} users
          </p>

          <div className="text-sm text-gray-500">
            Page 1
          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* ADD USER MODAL */}
      {/* ================================================= */}

      {showAddModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

            {/* HEADER */}

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
                onClick={() =>
                  setShowAddModal(false)
                }
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            {/* FORM */}

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

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value,
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

                  <option value="Student">
                    Student
                  </option>

                  <option value="Faculty">
                    Faculty
                  </option>

                  <option value="CompanyCoordinator">
                    Company Coordinator
                  </option>

                  <option value="CollegeCoordinator">
                    College Coordinator
                  </option>

                  <option value="Administrator">
                    Administrator
                  </option>

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

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

              <button
                onClick={() =>
                  setShowAddModal(false)
                }
                disabled={addingUser}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                disabled={addingUser}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
              >
                {addingUser
                  ? "Adding..."
                  : "Add User"}
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

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b">

              <h2 className="text-lg font-semibold text-gray-800">
                User Details
              </h2>

              <button
                onClick={() =>
                  setShowViewModal(false)
                }
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            {/* DETAILS */}

            <div className="p-6">

              {/* PROFILE */}

              <div className="flex flex-col items-center mb-6">

                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                  {getInitials(
                    selectedUser.name
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {selectedUser.name}
                </h3>

                <span
                  className={`mt-2 px-3 py-1 rounded-full text-xs ${
                    roleColors[
                      selectedUser.role
                    ] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {getRoleDisplayName(
                    selectedUser.role
                  )}
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
                    {selectedUser.phone ||
                      "—"}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${
                      selectedUser.status ===
                      "Active"
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
                    {formatDate(
                      selectedUser.date
                    )}
                  </p>

                </div>

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex justify-end px-6 py-4 border-t bg-gray-50">

              <button
                onClick={() =>
                  setShowViewModal(false)
                }
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

            {/* HEADER */}

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
                onClick={() =>
                  setShowEditModal(false)
                }
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            {/* FORM */}

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

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                  <span className="text-gray-400 font-normal">
                    {" "}
                    (optional)
                  </span>
                </label>

                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={
                    selectedUser.password || ""
                  }
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      password: e.target.value,
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
                  value={selectedUser.phone || ""}
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

                  <option value="Student">
                    Student
                  </option>

                  <option value="Faculty">
                    Faculty
                  </option>

                  <option value="CompanyCoordinator">
                    Company Coordinator
                  </option>

                  <option value="CollegeCoordinator">
                    College Coordinator
                  </option>

                  <option value="Administrator">
                    Administrator
                  </option>

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

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                disabled={updatingUser}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateUser}
                disabled={updatingUser}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
              >
                {updatingUser
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageUsers;