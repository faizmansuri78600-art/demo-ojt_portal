import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaLightbulb,
  FaBuilding,
  FaRedo,
} from "react-icons/fa";

function Analytics() {
  // =====================================================
  // API
  // =====================================================

  const API_URL = "http://localhost:5000";

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [department, setDepartment] =
    useState("All Departments");
  const [companyFilter, setCompanyFilter] =
    useState("All Companies");

  const [applications, setApplications] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  // =====================================================
  // FETCH ANALYTICS DATA
  // =====================================================

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "Admin token not found. Please login again."
        );
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
          data.message ||
            "Failed to fetch analytics data"
        );
      }

      const dashboard = data.dashboard;

      // =================================================
      // APPLICATION STATISTICS
      // =================================================

      setStats({
        total:
          dashboard.applications?.total || 0,

        approved:
          dashboard.applications?.approved || 0,

        pending:
          dashboard.applications?.pending || 0,

        rejected:
          dashboard.applications?.rejected || 0,
      });

      // =================================================
      // RECENT APPLICATIONS
      // =================================================

      const recentApplications =
        dashboard.recentApplications || [];

      const formattedApplications =
        recentApplications.map((application) => ({
          id: application.applicationId,
          studentId: application.studentId,
          name:
            application.studentName ||
            "Unknown Student",

          department: "BCA",

          company:
            application.companyName ||
            getCompanyName(
              application.companyId,
              dashboard.topCompanies
            ),

          companyId: application.companyId,

          position:
            application.opportunityTitle ||
            "Unknown Opportunity",

          date: application.appliedOn || "",

          status: convertStatus(
            application.status
          ),

          initials: getInitials(
            application.studentName
          ),
        }));

      setApplications(formattedApplications);

      // =================================================
      // TOP COMPANIES
      // =================================================

      const companies =
        dashboard.topCompanies || [];

      setTopCompanies(
        companies.map((company) => ({
          id: company.companyId,
          name:
            company.companyName ||
            "Unknown Company",

          city: company.city || "—",

          applications:
            company.opportunityCount || 0,
        }))
      );
    } catch (error) {
      console.error(
        "Analytics Fetch Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load analytics data"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CONVERT BACKEND STATUS
  // =====================================================

  const convertStatus = (value) => {
    if (!value) {
      return "Pending";
    }

    if (
      value.toLowerCase() === "selected"
    ) {
      return "Approved";
    }

    if (
      value.toLowerCase() === "rejected"
    ) {
      return "Rejected";
    }

    return "Pending";
  };

  // =====================================================
  // GET COMPANY NAME
  // =====================================================

  const getCompanyName = (
    companyId,
    companies = []
  ) => {
    const company = companies.find(
      (item) =>
        item.companyId === companyId
    );

    return (
      company?.companyName ||
      companyId ||
      "Unknown Company"
    );
  };

  // =====================================================
  // GET INITIALS
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
  // FILTER APPLICATIONS
  // =====================================================

  const filteredApplications =
    applications.filter((app) => {
      const searchValue =
        search.toLowerCase();

      const matchSearch =
        app.name
          .toLowerCase()
          .includes(searchValue) ||
        app.company
          .toLowerCase()
          .includes(searchValue) ||
        app.position
          .toLowerCase()
          .includes(searchValue);

      const matchStatus =
        status === "All Status" ||
        app.status === status;

      const matchDepartment =
        department === "All Departments" ||
        app.department === department;

      const matchCompany =
        companyFilter === "All Companies" ||
        app.company === companyFilter;

      return (
        matchSearch &&
        matchStatus &&
        matchDepartment &&
        matchCompany
      );
    });

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setStatus("All Status");
    setDepartment("All Departments");
    setCompanyFilter("All Companies");
  };

  // =====================================================
  // PERCENTAGES
  // =====================================================

  const totalApplications =
    stats.total || 0;

  const pendingPercentage =
    totalApplications > 0
      ? (stats.pending /
          totalApplications) *
        100
      : 0;

  const approvedPercentage =
    totalApplications > 0
      ? (stats.approved /
          totalApplications) *
        100
      : 0;

  const rejectedPercentage =
    totalApplications > 0
      ? (stats.rejected /
          totalApplications) *
        100
      : 0;

  // =====================================================
  // DONUT GRADIENT
  // =====================================================

  const approvedEnd =
    pendingPercentage +
    approvedPercentage;

  const donutGradient =
    totalApplications > 0
      ? `conic-gradient(
          #2563eb 0% ${pendingPercentage}%,
          #16a34a ${pendingPercentage}% ${approvedEnd}%,
          #f97316 ${approvedEnd}% 100%
        )`
      : "conic-gradient(#e5e7eb 0% 100%)";

  // =====================================================
  // UNIQUE COMPANIES
  // =====================================================

  const companyNames = [
    ...new Set(
      applications
        .map((app) => app.company)
        .filter(Boolean)
    ),
  ];

  // =====================================================
  // APPLICATION STATUS CLASS
  // =====================================================

  const getStatusClass = (value) => {
    if (value === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (value === "Pending") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-700";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold text-blue-950">
            Application Report
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">

            <span>
              Dashboard
            </span>

            <span>
              ›
            </span>

            <span>
              Analytics & Reports
            </span>

            <span>
              ›
            </span>

            <span>
              Application Report
            </span>

          </div>

        </div>

        {/* REFRESH */}

        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 flex items-center gap-2 hover:bg-slate-50 disabled:opacity-50"
        >
          <FaRedo
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* STAT CARDS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* TOTAL */}

        <div className="bg-white border border-gray-200   rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
            <FaFileAlt />
          </div>

          <div>

            <p className="text-sm text-slate-600">
              Total Applications
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              {loading
                ? "..."
                : stats.total}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              From all applications
            </p>

          </div>

        </div>

        {/* APPROVED */}

        <div className="bg-white border border-gray-200   rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
            <FaCheckCircle />
          </div>

          <div>

            <p className="text-sm text-slate-600">
              Approved
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              {loading
                ? "..."
                : stats.approved}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Selected applications
            </p>

          </div>

        </div>

        {/* PENDING */}

        <div className="bg-white border border-gray-200   rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-2xl">
            <FaClock />
          </div>

          <div>

            <p className="text-sm text-slate-600">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              {loading
                ? "..."
                : stats.pending}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Applications awaiting review
            </p>

          </div>

        </div>

        {/* REJECTED */}

        <div className="bg-white border border-gray-200   rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl">
            <FaTimesCircle />
          </div>

          <div>

            <p className="text-sm text-slate-600">
              Rejected
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              {loading
                ? "..."
                : stats.rejected}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Rejected applications
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* CHARTS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

        {/* APPLICATION STATUS */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-blue-950 mb-6">
            Application Status Distribution
          </h2>

          <div className="flex flex-col items-center">

            {/* DONUT */}

            <div
              className="w-44 h-44 rounded-full flex items-center justify-center"
              style={{
                background:
                  donutGradient,
              }}
            >

              <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">

                <span className="text-2xl font-bold text-blue-950">
                  {loading
                    ? "..."
                    : totalApplications}
                </span>

                <span className="text-sm text-slate-500">
                  Total
                </span>

              </div>

            </div>

            {/* LEGEND */}

            <div className="w-full mt-6 space-y-3">

              {/* PENDING */}

              <div className="flex justify-between">

                <span className="flex items-center gap-2 text-blue-600">

                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>

                  Pending

                </span>

                <span>
                  {stats.pending}{" "}
                  (
                  {pendingPercentage.toFixed(
                    1
                  )}
                  %)
                </span>

              </div>

              {/* APPROVED */}

              <div className="flex justify-between">

                <span className="flex items-center gap-2 text-green-600">

                  <span className="w-3 h-3 rounded-full bg-green-600"></span>

                  Approved

                </span>

                <span>
                  {stats.approved}{" "}
                  (
                  {approvedPercentage.toFixed(
                    1
                  )}
                  %)
                </span>

              </div>

              {/* REJECTED */}

              <div className="flex justify-between">

                <span className="flex items-center gap-2 text-orange-500">

                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>

                  Rejected

                </span>

                <span>
                  {stats.rejected}{" "}
                  (
                  {rejectedPercentage.toFixed(
                    1
                  )}
                  %)
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* MONTHLY TREND */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-blue-950 mb-5">
            Monthly Applications Trend
          </h2>

          <div className="h-64 flex items-center justify-center border-b border-l border-slate-200 px-4 pb-3">

            <div className="text-center">

              <FaFileAlt className="mx-auto text-3xl text-slate-300 mb-3" />

              <p className="text-sm font-medium text-slate-600">
                Monthly trend unavailable
              </p>

              <p className="text-xs text-slate-400 mt-2 max-w-xs">
                The current backend does not provide
                month-wise application statistics.
              </p>

            </div>

          </div>

        </div>

        {/* KEY INSIGHTS */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-blue-950 mb-6 flex items-center gap-2">

            <FaLightbulb className="text-blue-500" />

            Key Insights

          </h2>

          <div className="space-y-5 text-sm text-slate-700">

            <p className="flex gap-3">

              <span className="text-blue-600 text-lg">
                •
              </span>

              There are{" "}
              <strong>
                {stats.total}
              </strong>{" "}
              total applications in the system.

            </p>

            <p className="flex gap-3">

              <span className="text-green-600 text-lg">
                ↑
              </span>

              <span>
                <strong>
                  {stats.approved}
                </strong>{" "}
                applications have been selected.

              </span>

            </p>

            <p className="flex gap-3">

              <span className="text-orange-500 text-lg">
                •
              </span>

              <span>
                <strong>
                  {stats.pending}
                </strong>{" "}
                applications are currently pending.

              </span>

            </p>

            <p className="flex gap-3">

              <span className="text-red-500 text-lg">
                ↓
              </span>

              <span>
                <strong>
                  {stats.rejected}
                </strong>{" "}
                applications have been rejected.

              </span>

            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* FILTER SECTION */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-5">

        <div className="flex flex-col lg:flex-row gap-3">

          {/* SEARCH */}

          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by student name, company or position..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-200 rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* DEPARTMENT */}

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="border border-slate-200 rounded-lg px-4 py-3"
          >

            <option value="All Departments">
              All Departments
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="BBA">
              BBA
            </option>

            <option value="BCS">
              BCS
            </option>

          </select>

          {/* COMPANY */}

          <select
            value={companyFilter}
            onChange={(e) =>
              setCompanyFilter(
                e.target.value
              )
            }
            className="border border-slate-200 rounded-lg px-4 py-3"
          >

            <option value="All Companies">
              All Companies
            </option>

            {companyNames.map(
              (company) => (
                <option
                  key={company}
                  value={company}
                >
                  {company}
                </option>
              )
            )}

          </select>

          {/* STATUS */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border border-slate-200 rounded-lg px-4 py-3"
          >

            <option value="All Status">
              All Status
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

          {/* FILTER */}

          <button
            onClick={() => {}}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2"
          >

            <FaFilter />

            Filter

          </button>

          {/* RESET */}

          <button
            onClick={resetFilters}
            className="border border-slate-300 px-5 py-3 rounded-lg"
          >
            Reset
          </button>

        </div>

      </div>

      {/* ================================================= */}
      {/* APPLICATION TABLE */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

        {/* TABLE */}

        <div className="lg:col-span-3 bg-white border  border-gray-200 rounded-xl shadow-sm overflow-hidden">

          <div className="flex justify-between items-center p-5 border-b border-gray-200 ">

            <h2 className="text-lg font-semibold text-blue-950">
              Recent Applications
            </h2>

            <span className="text-sm text-slate-500">
              {filteredApplications.length} shown
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm min-w-[1000px]">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left px-4 py-4">
                    App ID
                  </th>

                  <th className="text-left px-4 py-4">
                    Student Name
                  </th>

                  <th className="text-left px-4 py-4">
                    Department
                  </th>

                  <th className="text-left px-4 py-4">
                    Company
                  </th>

                  <th className="text-left px-4 py-4">
                    Position
                  </th>

                  <th className="text-left px-4 py-4">
                    Applied On
                  </th>

                  <th className="text-left px-4 py-4">
                    Status
                  </th>

                  <th className="text-left px-4 py-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-12 text-slate-500"
                    >

                      <div className="inline-block w-7 h-7 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>

                      <p>
                        Loading applications...
                      </p>

                    </td>

                  </tr>

                ) : filteredApplications.length ===
                  0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-12 text-slate-500"
                    >
                      No applications found.
                    </td>

                  </tr>

                ) : (

                  filteredApplications.map(
                    (app) => (

                      <tr
                        key={app.id}
                        className="border-t hover:bg-slate-50"
                      >

                        {/* ID */}

                        <td className="px-4 py-4 font-medium">
                          {app.id}
                        </td>

                        {/* STUDENT */}

                        <td className="px-4 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                              {app.initials}
                            </div>

                            {app.name}

                          </div>

                        </td>

                        {/* DEPARTMENT */}

                        <td className="px-4 py-4">
                          {app.department}
                        </td>

                        {/* COMPANY */}

                        <td className="px-4 py-4">
                          {app.company}
                        </td>

                        {/* POSITION */}

                        <td className="px-4 py-4">
                          {app.position}
                        </td>

                        {/* DATE */}

                        <td className="px-4 py-4">
                          {formatDate(
                            app.date
                          )}
                        </td>

                        {/* STATUS */}

                        <td className="px-4 py-4">

                          <span
                            className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusClass(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>

                        </td>

                        {/* ACTION */}

                        <td className="px-4 py-4">

                          <button
                            onClick={() =>
                              alert(
                                `Application ID: ${app.id}\nStudent: ${app.name}\nCompany: ${app.company}\nPosition: ${app.position}\nStatus: ${app.status}`
                              )
                            }
                            title="View Application"
                            className="w-9 h-9 border rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                          >

                            <FaEye className="mx-auto" />

                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

          <div className="p-4 text-sm text-slate-500 border-t">

            Showing{" "}
            {filteredApplications.length}{" "}
            of{" "}
            {applications.length}{" "}
            recent applications

          </div>

        </div>

        {/* ================================================= */}
        {/* TOP COMPANIES */}
        {/* ================================================= */}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

          <h2 className="text-lg font-semibold text-blue-950 mb-5 flex items-center gap-2">

            🏆 Top Companies by Applications

          </h2>

          {topCompanies.length ===
          0 ? (

            <div className="text-center py-10">

              <FaBuilding className="mx-auto text-3xl text-slate-300 mb-3" />

              <p className="text-sm text-slate-500">
                No company data available.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {topCompanies.map(
                (company, index) => {

                  const maxApplications =
                    Math.max(
                      ...topCompanies.map(
                        (item) =>
                          item.applications
                      ),
                      1
                    );

                  const percentage =
                    (company.applications /
                      maxApplications) *
                    100;

                  return (

                    <div
                      key={
                        company.id ||
                        company.name ||
                        index
                      }
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <FaBuilding />
                        </div>

                        <div className="flex-1">

                          <p className="font-medium text-sm">
                            {company.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {company.city}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-2 mt-2">

                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{
                              width: `${percentage}%`,
                            }}
                          ></div>

                        </div>

                        <span className="text-xs text-slate-500">
                          {company.applications}
                        </span>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* EXPORT REPORT */}
      {/* ================================================= */}

      <div className="flex justify-end mt-5">

        <button
          onClick={() =>
            alert(
              "Export functionality will be connected after the report API is implemented."
            )
          }
          className="bg-white border border-blue-200 text-blue-600 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-50"
        >

          <FaDownload />

          Export Report

        </button>

      </div>

    </div>
  );
}

export default Analytics;