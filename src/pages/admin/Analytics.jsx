import React, { useState } from "react";
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
} from "react-icons/fa";

function Analytics() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  // ================= APPLICATION DATA =================

  const applications = [
    {
      id: "APP001",
      name: "John Doe",
      department: "BCA",
      company: "TechSoft Solutions",
      position: "Web Developer",
      date: "May 16, 2025",
      status: "Approved",
      initials: "JD",
    },
    {
      id: "APP002",
      name: "Aisha Shaikh",
      department: "BCA",
      company: "InnovateX Pvt. Ltd.",
      position: "UI/UX Intern",
      date: "May 15, 2025",
      status: "Pending",
      initials: "AS",
    },
    {
      id: "APP003",
      name: "Rahul Kumar",
      department: "BCA",
      company: "CodePixel Pvt. Ltd.",
      position: "Backend Intern",
      date: "May 14, 2025",
      status: "Approved",
      initials: "RK",
    },
    {
      id: "APP004",
      name: "Priya Sharma",
      department: "BCA",
      company: "Brainwave LLC",
      position: "Data Analyst Intern",
      date: "May 13, 2025",
      status: "Rejected",
      initials: "PS",
    },
    {
      id: "APP005",
      name: "Tanishq Chavan",
      department: "BCA",
      company: "Alpha Infotech",
      position: "Full Stack Intern",
      date: "May 12, 2025",
      status: "Pending",
      initials: "TC",
    },
  ];

  // ================= FILTER =================

  const filteredApplications = applications.filter((app) => {
    const matchSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "All Status" || app.status === status;

    return matchSearch && matchStatus;
  });

  // ================= STATUS BADGE =================

  const getStatusClass = (value) => {
    if (value === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (value === "Pending") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Application Report
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
            <span>Dashboard</span>
            <span>›</span>
            <span>Analytics & Reports</span>
            <span>›</span>
            <span>Application Report</span>
          </div>
        </div>

        {/* Date */}

        <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700">
          📅 Jan 01, 2025 – May 17, 2025
        </div>

      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* Total */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
            <FaFileAlt />
          </div>

          <div>
            <p className="text-sm text-slate-600">
              Total Applications
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              320
            </h2>

            <p className="text-xs text-green-600 mt-1">
              ↑ 12% from last month
            </p>
          </div>

        </div>

        {/* Approved */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
            <FaCheckCircle />
          </div>

          <div>
            <p className="text-sm text-slate-600">
              Approved
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              140
            </h2>

            <p className="text-xs text-green-600 mt-1">
              ↑ 8% from last month
            </p>
          </div>

        </div>

        {/* Pending */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-2xl">
            <FaClock />
          </div>

          <div>
            <p className="text-sm text-slate-600">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              120
            </h2>

            <p className="text-xs text-green-600 mt-1">
              ↑ 15% from last month
            </p>
          </div>

        </div>

        {/* Rejected */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl">
            <FaTimesCircle />
          </div>

          <div>
            <p className="text-sm text-slate-600">
              Rejected
            </p>

            <h2 className="text-3xl font-bold text-blue-950">
              60
            </h2>

            <p className="text-xs text-green-600 mt-1">
              ↑ 5% from last month
            </p>
          </div>

        </div>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

        {/* APPLICATION STATUS */}

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-blue-950 mb-6">
            Application Status Distribution
          </h2>

          <div className="flex flex-col items-center">

            {/* Donut */}

            <div
              className="w-44 h-44 rounded-full flex items-center justify-center"
              style={{
                background:
                  "conic-gradient(#2563eb 0% 37.5%, #16a34a 37.5% 81.3%, #f97316 81.3% 100%)",
              }}
            >
              <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-blue-950">
                  320
                </span>
                <span className="text-sm text-slate-500">
                  Total
                </span>
              </div>
            </div>

            {/* Legend */}

            <div className="w-full mt-6 space-y-3">

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-blue-600">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  Pending
                </span>

                <span>120 (37.5%)</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-green-600">
                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                  Approved
                </span>

                <span>140 (43.8%)</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-orange-500">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  Rejected
                </span>

                <span>60 (18.7%)</span>
              </div>

            </div>

          </div>

        </div>

        {/* MONTHLY TREND */}

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-blue-950 mb-5">
            Monthly Applications Trend
          </h2>

          <div className="h-64 flex items-end justify-around border-b border-l border-slate-200 px-4 pb-3">

            {[
              { month: "Jan", value: 40 },
              { month: "Feb", value: 55 },
              { month: "Mar", value: 65 },
              { month: "Apr", value: 80 },
              { month: "May", value: 90 },
            ].map((item) => (

              <div
                key={item.month}
                className="flex flex-col items-center justify-end h-full"
              >

                <span className="text-sm font-semibold text-blue-950 mb-2">
                  {item.value}
                </span>

                <div
                  className="w-8 bg-blue-500 rounded-t-md"
                  style={{
                    height: `${item.value * 2}px`,
                  }}
                ></div>

                <span className="text-xs text-slate-500 mt-2">
                  {item.month}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* KEY INSIGHTS */}

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-blue-950 mb-6 flex items-center gap-2">
            <FaLightbulb className="text-blue-500" />
            Key Insights
          </h2>

          <div className="space-y-5 text-sm text-slate-700">

            <p className="flex gap-3">
              <span className="text-green-600 text-lg">↑</span>
              12% increase in total applications compared to last month
            </p>

            <p className="flex gap-3">
              <span className="text-green-600 text-lg">↑</span>
              Highest applications received in May 2025 (90)
            </p>

            <p className="flex gap-3">
              <span className="text-green-600 text-lg">↑</span>
              TechSoft Solutions received maximum applications (48)
            </p>

            <p className="flex gap-3">
              <span className="text-green-600 text-lg">↑</span>
              Most applications from Computer Applications department (62%)
            </p>

          </div>

        </div>

      </div>

      {/* ================= FILTER SECTION ================= */}

      <div className="bg-white border rounded-xl p-4 shadow-sm mb-5">

        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}

          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by student name or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Department */}

          <select className="border border-slate-200 rounded-lg px-4 py-3">
            <option>All Departments</option>
            <option>BCA</option>
            <option>BBA</option>
            <option>BCS</option>
          </select>

          {/* Company */}

          <select className="border border-slate-200 rounded-lg px-4 py-3">
            <option>All Companies</option>
            <option>TechSoft Solutions</option>
            <option>InnovateX Pvt. Ltd.</option>
            <option>CodePixel Pvt. Ltd.</option>
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-3"
          >
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2">
            <FaFilter />
            Filter
          </button>

          <button
            onClick={() => {
              setSearch("");
              setStatus("All Status");
            }}
            className="border border-slate-300 px-5 py-3 rounded-lg"
          >
            Reset
          </button>

        </div>

      </div>

      {/* ================= APPLICATION TABLE ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

        <div className="lg:col-span-3 bg-white border rounded-xl shadow-sm overflow-hidden">

          <div className="flex justify-between items-center p-5 border-b">

            <h2 className="text-lg font-semibold text-blue-950">
              Recent Applications
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

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

                {filteredApplications.map((app) => (

                  <tr
                    key={app.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-4 py-4 font-medium">
                      {app.id}
                    </td>

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                          {app.initials}
                        </div>

                        {app.name}

                      </div>

                    </td>

                    <td className="px-4 py-4">
                      {app.department}
                    </td>

                    <td className="px-4 py-4">
                      {app.company}
                    </td>

                    <td className="px-4 py-4">
                      {app.position}
                    </td>

                    <td className="px-4 py-4">
                      {app.date}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusClass(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>

                    </td>

                    <td className="px-4 py-4">

                      <button className="w-9 h-9 border rounded-lg text-slate-600 hover:text-blue-600">
                        <FaEye className="mx-auto" />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div className="p-4 text-sm text-slate-500 border-t">
            Showing 1 to {filteredApplications.length} of 320 applications
          </div>

        </div>

        {/* ================= TOP COMPANIES ================= */}

        <div className="bg-white border rounded-xl shadow-sm p-5">

          <h2 className="text-lg font-semibold text-blue-950 mb-5 flex items-center gap-2">
            🏆 Top Companies by Applications
          </h2>

          <div className="space-y-5">

            {[
              ["TechSoft Solutions", 48, "15%"],
              ["InnovateX Pvt. Ltd.", 42, "13%"],
              ["CodePixel Pvt. Ltd.", 38, "12%"],
              ["Brainwave LLC", 32, "10%"],
              ["Alpha Infotech", 28, "9%"],
            ].map((company) => (

              <div key={company[0]}>

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <FaBuilding />
                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-sm">
                      {company[0]}
                    </p>

                    <p className="text-xs text-slate-500">
                      {company[1]} Applications
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-2 mt-2">

                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: company[2],
                      }}
                    ></div>

                  </div>

                  <span className="text-xs text-slate-500">
                    {company[2]}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* ================= EXPORT BUTTON ================= */}

      <div className="flex justify-end mt-5">

        <button className="bg-white border border-blue-200 text-blue-600 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-50">
          <FaDownload />
          Export Report
        </button>

      </div>

    </div>
  );
}

export default Analytics;