// import React from "react";
// import {
//   FaUsers,
//   FaBuilding,
//   FaFolderOpen,
//   FaFileAlt,
//   FaUser,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaBell,
//   FaCalendarAlt,
// } from "react-icons/fa";

// function Dashboard() {
//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">

//       {/* ================= WELCOME ================= */}
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-blue-950">
//             Welcome back, Dr. HOD Kamil Khan!
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Here's what's happening with the OJT Portal today.
//           </p>
//         </div>

//         {/* Date */}
//         <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 flex items-center gap-3">
//           <FaCalendarAlt className="text-blue-600" />

//           <span className="text-gray-700">
//             May 17, 2025
//           </span>
//         </div>
//       </div>

//       {/* ================= STAT CARDS ================= */}
//       <div className="grid grid-cols-4 gap-5 mb-6">

//         {/* Users */}
//         <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
//           <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
//             <FaUsers className="text-2xl text-blue-600" />
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Total Users
//             </p>

//             <h2 className="text-2xl font-bold text-blue-950">
//               524
//             </h2>

//             <p className="text-green-600 text-xs mt-1">
//               ↑ 12% from last month
//             </p>
//           </div>
//         </div>

//         {/* Companies */}
//         <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
//           <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
//             <FaBuilding className="text-2xl text-green-600" />
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Total Companies
//             </p>

//             <h2 className="text-2xl font-bold text-blue-950">
//               86
//             </h2>

//             <p className="text-green-600 text-xs mt-1">
//               ↑ 8% from last month
//             </p>
//           </div>
//         </div>

//         {/* Opportunities */}
//         <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
//           <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
//             <FaFolderOpen className="text-2xl text-purple-600" />
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               OJT Opportunities
//             </p>

//             <h2 className="text-2xl font-bold text-blue-950">
//               128
//             </h2>

//             <p className="text-green-600 text-xs mt-1">
//               ↑ 15% from last month
//             </p>
//           </div>
//         </div>

//         {/* Applications */}
//         <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
//           <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
//             <FaFileAlt className="text-2xl text-orange-500" />
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Total Applications
//             </p>

//             <h2 className="text-2xl font-bold text-blue-950">
//               320
//             </h2>

//             <p className="text-green-600 text-xs mt-1">
//               ↑ 10% from last month
//             </p>
//           </div>
//         </div>

//       </div>


//       {/* ================= MIDDLE SECTION ================= */}
//       <div className="grid grid-cols-3 gap-5 mb-6">

//         {/* Applications Overview */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">

//           <h2 className="text-lg font-semibold text-blue-950 mb-5">
//             Applications Overview
//           </h2>

//           <div className="flex items-center justify-center">

//             {/* Donut */}
//             <div
//               className="w-48 h-48 rounded-full flex items-center justify-center"
//               style={{
//                 background:
//                   "conic-gradient(#2878e5 0% 37.5%, #20a957 37.5% 81.3%, #ff7517 81.3% 100%)",
//               }}
//             >
//               <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
//                 <span className="text-2xl font-bold">
//                   320
//                 </span>

//                 <span className="text-gray-500 text-sm">
//                   Total
//                 </span>
//               </div>
//             </div>

//           </div>

//           {/* Legend */}
//           <div className="mt-6 space-y-3">

//             <div className="flex justify-between">
//               <span className="text-blue-600">
//                 🔵 Pending
//               </span>

//               <span>
//                 120 (37.5%)
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-green-600">
//                 🟢 Approved
//               </span>

//               <span>
//                 140 (43.8%)
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-orange-500">
//                 🟠 Rejected
//               </span>

//               <span>
//                 60 (18.7%)
//               </span>
//             </div>

//           </div>

//           <button className="w-full mt-5 border border-blue-300 text-blue-600 rounded-lg py-2 hover:bg-blue-50">
//             View All Applications
//           </button>

//         </div>


//         {/* Recent Activities */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">

//           <h2 className="text-lg font-semibold text-blue-950 mb-5">
//             Recent Activities
//           </h2>

//           <div className="space-y-5">

//             <Activity
//               icon={<FaUser />}
//               text={
//                 <>
//                   New company <b>"TechSoft Solutions"</b> registered
//                 </>
//               }
//               time="2 mins ago"
//             />

//             <Activity
//               icon={<FaFolderOpen />}
//               text={
//                 <>
//                   New OJT opportunity <b>"Web Developer"</b> posted
//                 </>
//               }
//               time="15 mins ago"
//             />

//             <Activity
//               icon={<FaUser />}
//               text={
//                 <>
//                   User <b>John Doe</b> registered
//                 </>
//               }
//               time="1 hour ago"
//             />

//             <Activity
//               icon={<FaFileAlt />}
//               text={
//                 <>
//                   Application approved for <b>Sarah Khan</b>
//                 </>
//               }
//               time="2 hours ago"
//             />

//           </div>

//           <button className="w-full mt-5 border border-blue-300 text-blue-600 rounded-lg py-2 hover:bg-blue-50">
//             View All Activities
//           </button>

//         </div>


//         {/* Top Companies */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">

//           <div className="flex justify-between items-center mb-5">

//             <h2 className="text-lg font-semibold text-blue-950">
//               Top Companies
//             </h2>

//             <button className="text-blue-600 text-sm">
//               View All
//             </button>

//           </div>

//           <div className="space-y-4">

//             <Company
//               name="CodePixel Pvt. Ltd."
//               opportunities="24 Opportunities"
//             />

//             <Company
//               name="InnovateX Solutions"
//               opportunities="18 Opportunities"
//             />

//             <Company
//               name="TechSoft Solutions"
//               opportunities="15 Opportunities"
//             />

//             <Company
//               name="Brainwave LLC"
//               opportunities="12 Opportunities"
//             />

//             <Company
//               name="Alpha Infotech"
//               opportunities="10 Opportunities"
//             />

//           </div>

//         </div>

//       </div>


//       {/* ================= BOTTOM SECTION ================= */}
//       <div className="grid grid-cols-3 gap-5">

//         {/* User Role Distribution */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">

//           <h2 className="text-lg font-semibold text-blue-950 mb-6">
//             User Role Distribution
//           </h2>

//           <div className="flex items-end justify-around h-52">

//             <Bar
//               value="300"
//               label="Students"
//               height="90%"
//               color="bg-blue-500"
//             />

//             <Bar
//               value="86"
//               label="Companies"
//               height="55%"
//               color="bg-green-500"
//             />

//             <Bar
//               value="12"
//               label="Coordinators"
//               height="20%"
//               color="bg-purple-500"
//             />

//             <Bar
//               value="26"
//               label="Faculty Mentors"
//               height="30%"
//               color="bg-orange-500"
//             />

//             <Bar
//               value="6"
//               label="Admins"
//               height="15%"
//               color="bg-red-500"
//             />

//           </div>

//         </div>


//         {/* Monthly Registrations */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">

//           <div className="flex justify-between items-center">

//             <h2 className="text-lg font-semibold text-blue-950">
//               Monthly Registrations
//             </h2>

//             <button className="text-blue-600 text-sm">
//               View Report
//             </button>

//           </div>

//           <div className="mt-8 h-44 flex items-end justify-between">

//             {[
//               ["Jan", "40"],
//               ["Feb", "55"],
//               ["Mar", "65"],
//               ["Apr", "80"],
//               ["May", "90"],
//             ].map(([month, value]) => (

//               <div
//                 key={month}
//                 className="flex flex-col items-center"
//               >
//                 <span className="text-sm font-semibold mb-2">
//                   {value}
//                 </span>

//                 <div
//                   className="w-8 bg-blue-500 rounded-t-md"
//                   style={{
//                     height: `${Number(value) * 1.3}px`,
//                   }}
//                 />

//                 <span className="text-xs text-gray-500 mt-2">
//                   {month}
//                 </span>
//               </div>

//             ))}

//           </div>

//         </div>


//         {/* System Announcements */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">

//           <div className="flex justify-between items-center mb-5">

//             <h2 className="text-lg font-semibold text-blue-950">
//               System Announcements
//             </h2>

//             <button className="text-blue-600 text-sm">
//               View All
//             </button>

//           </div>

//           <div className="space-y-5">

//             <Announcement
//               title="System Maintenance"
//               text="Scheduled maintenance on May 20, 2025"
//             />

//             <Announcement
//               title="New Feature Released"
//               text="Analytics & Reports section updated."
//             />

//             <Announcement
//               title="Reminder"
//               text="Please verify all pending applications."
//             />

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }


// /* ================= ACTIVITY COMPONENT ================= */

// function Activity({ icon, text, time }) {
//   return (
//     <div className="flex gap-3">

//       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//         {icon}
//       </div>

//       <div className="text-sm">
//         <p className="text-gray-700">
//           {text}
//         </p>

//         <span className="text-gray-400 text-xs">
//           {time}
//         </span>
//       </div>

//     </div>
//   );
// }


// /* ================= COMPANY COMPONENT ================= */

// function Company({ name, opportunities }) {
//   return (
//     <div className="flex items-center gap-3">

//       <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
//         <FaBuilding className="text-blue-500" />
//       </div>

//       <div>
//         <p className="font-semibold text-sm">
//           {name}
//         </p>

//         <span className="text-gray-400 text-xs">
//           {opportunities}
//         </span>
//       </div>

//     </div>
//   );
// }


// /* ================= BAR COMPONENT ================= */

// function Bar({ value, label, height, color }) {
//   return (
//     <div className="flex flex-col items-center justify-end h-full">

//       <span className="text-xs font-semibold mb-1">
//         {value}
//       </span>

//       <div
//         className={`w-8 ${color} rounded-t-md`}
//         style={{ height }}
//       />

//       <span className="text-xs text-gray-500 mt-2 text-center">
//         {label}
//       </span>

//     </div>
//   );
// }


// /* ================= ANNOUNCEMENT ================= */

// function Announcement({ title, text }) {
//   return (
//     <div className="flex gap-3">

//       <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
//         <FaBell className="text-green-600" />
//       </div>

//       <div>
//         <p className="font-semibold text-sm">
//           {title}
//         </p>

//         <p className="text-xs text-gray-500 mt-1">
//           {text}
//         </p>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBuilding,
  FaFolderOpen,
  FaFileAlt,
  FaUser,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Admin token not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard/full",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load dashboard");
      }

      setDashboard(data.dashboard);
    } catch (err) {
      console.error("Dashboard Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-blue-950 text-lg font-semibold">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-5">
          <p className="font-semibold">Failed to load dashboard</p>
          <p className="text-sm mt-1">{error}</p>

          <button
            onClick={fetchDashboard}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    users,
    companies,
    opportunities,
    applications,
    topCompanies,
    recentApplications,
    recentAnnouncements,
  } = dashboard;

  const pending = applications.pending || 0;
  const approved = applications.approved || 0;
  const rejected = applications.rejected || 0;
  const totalApplications = applications.total || 0;

  const pendingPercent = totalApplications
    ? (pending / totalApplications) * 100
    : 0;

  const approvedPercent = totalApplications
    ? (approved / totalApplications) * 100
    : 0;

  const rejectedPercent = totalApplications
    ? (rejected / totalApplications) * 100
    : 0;

  const maxRoleValue = Math.max(
    users.students,
    users.faculty,
    users.companyCoordinators,
    users.collegeCoordinators,
    users.administrators,
    1
  );

  const getBarHeight = (value) => {
    return `${Math.max((value / maxRoleValue) * 90, value > 0 ? 10 : 0)}%`;
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* ================= WELCOME ================= */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Welcome back, Dr. HOD Kamil Khan!
          </h1>

          <p className="text-gray-500 mt-2">
            Here's what's happening with the OJT Portal today.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 flex items-center gap-3">
          <FaCalendarAlt className="text-blue-600" />

          <span className="text-gray-700">
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-4 gap-5 mb-6">

        {/* Users */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <FaUsers className="text-2xl text-blue-600" />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total Users</p>

            <h2 className="text-2xl font-bold text-blue-950">
              {users.total}
            </h2>

            <p className="text-gray-400 text-xs mt-1">
              All registered users
            </p>
          </div>
        </div>

        {/* Companies */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <FaBuilding className="text-2xl text-green-600" />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total Companies</p>

            <h2 className="text-2xl font-bold text-blue-950">
              {companies.total}
            </h2>

            <p className="text-gray-400 text-xs mt-1">
              {companies.verified} verified companies
            </p>
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <FaFolderOpen className="text-2xl text-purple-600" />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              OJT Opportunities
            </p>

            <h2 className="text-2xl font-bold text-blue-950">
              {opportunities.total}
            </h2>

            <p className="text-gray-400 text-xs mt-1">
              {opportunities.open} currently open
            </p>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <FaFileAlt className="text-2xl text-orange-500" />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Total Applications
            </p>

            <h2 className="text-2xl font-bold text-blue-950">
              {applications.total}
            </h2>

            <p className="text-gray-400 text-xs mt-1">
              {applications.pending} pending review
            </p>
          </div>
        </div>

      </div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="grid grid-cols-3 gap-5 mb-6">

        {/* Applications Overview */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <h2 className="text-lg font-semibold text-blue-950 mb-5">
            Applications Overview
          </h2>

          <div className="flex items-center justify-center">

            <div
              className="w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(
                  #2878e5 0% ${pendingPercent}%,
                  #20a957 ${pendingPercent}% ${pendingPercent + approvedPercent}%,
                  #ff7517 ${pendingPercent + approvedPercent}% 100%
                )`,
              }}
            >
              <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">
                  {totalApplications}
                </span>

                <span className="text-gray-500 text-sm">
                  Total
                </span>
              </div>
            </div>

          </div>

          <div className="mt-6 space-y-3">

            <div className="flex justify-between">
              <span className="text-blue-600">
                🔵 Pending
              </span>

              <span>
                {pending} ({pendingPercent.toFixed(1)}%)
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-green-600">
                🟢 Approved
              </span>

              <span>
                {approved} ({approvedPercent.toFixed(1)}%)
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-orange-500">
                🟠 Rejected
              </span>

              <span>
                {rejected} ({rejectedPercent.toFixed(1)}%)
              </span>
            </div>

          </div>

          <button className="w-full mt-5 border border-blue-300 text-blue-600 rounded-lg py-2 hover:bg-blue-50">
            View All Applications
          </button>

        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <h2 className="text-lg font-semibold text-blue-950 mb-5">
            Recent Applications
          </h2>

          <div className="space-y-5">

            {recentApplications.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No recent applications.
              </p>
            ) : (
              recentApplications.slice(0, 4).map((application) => (
                <Activity
                  key={application.applicationId}
                  icon={<FaFileAlt />}
                  text={
                    <>
                      <b>{application.studentName}</b> applied for{" "}
                      <b>{application.opportunityTitle}</b>
                    </>
                  }
                  time={`${application.appliedOn} • ${application.status}`}
                />
              ))
            )}

          </div>

          <button className="w-full mt-5 border border-blue-300 text-blue-600 rounded-lg py-2 hover:bg-blue-50">
            View All Applications
          </button>

        </div>

        {/* Top Companies */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-blue-950">
              Top Companies
            </h2>

            <button className="text-blue-600 text-sm">
              View All
            </button>
          </div>

          <div className="space-y-4">

            {topCompanies.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No company data available.
              </p>
            ) : (
              topCompanies.map((company) => (
                <Company
                  key={company.companyId}
                  name={company.companyName}
                  opportunities={`${company.opportunityCount} Opportunities`}
                />
              ))
            )}

          </div>

        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="grid grid-cols-3 gap-5">

        {/* User Role Distribution */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <h2 className="text-lg font-semibold text-blue-950 mb-6">
            User Role Distribution
          </h2>

          <div className="flex items-end justify-around h-52">

            <Bar
              value={users.students}
              label="Students"
              height={getBarHeight(users.students)}
              color="bg-blue-500"
            />

            <Bar
              value={users.companyCoordinators}
              label="Company Coord."
              height={getBarHeight(users.companyCoordinators)}
              color="bg-green-500"
            />

            <Bar
              value={users.collegeCoordinators}
              label="College Coord."
              height={getBarHeight(users.collegeCoordinators)}
              color="bg-purple-500"
            />

            <Bar
              value={users.faculty}
              label="Faculty"
              height={getBarHeight(users.faculty)}
              color="bg-orange-500"
            />

            <Bar
              value={users.administrators}
              label="Admins"
              height={getBarHeight(users.administrators)}
              color="bg-red-500"
            />

          </div>

        </div>

        {/* Monthly Registrations */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <div className="flex justify-between items-center">

            <h2 className="text-lg font-semibold text-blue-950">
              Monthly Registrations
            </h2>

            <button className="text-blue-600 text-sm">
              View Report
            </button>

          </div>

          <div className="mt-8 h-44 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Monthly registration data
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Backend endpoint does not currently provide monthly
                registration statistics.
              </p>
            </div>
          </div>

        </div>

        {/* System Announcements */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-lg font-semibold text-blue-950">
              System Announcements
            </h2>

            <button className="text-blue-600 text-sm">
              View All
            </button>

          </div>

          <div className="space-y-5">

            {recentAnnouncements.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No announcements available.
              </p>
            ) : (
              recentAnnouncements.slice(0, 3).map((announcement) => (
                <Announcement
                  key={announcement._id}
                  title={announcement.title}
                  text={announcement.message}
                />
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


/* ================= ACTIVITY COMPONENT ================= */

function Activity({ icon, text, time }) {
  return (
    <div className="flex gap-3">

      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>

      <div className="text-sm">
        <p className="text-gray-700">
          {text}
        </p>

        <span className="text-gray-400 text-xs">
          {time}
        </span>
      </div>

    </div>
  );
}


/* ================= COMPANY COMPONENT ================= */

function Company({ name, opportunities }) {
  return (
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
        <FaBuilding className="text-blue-500" />
      </div>

      <div>
        <p className="font-semibold text-sm">
          {name}
        </p>

        <span className="text-gray-400 text-xs">
          {opportunities}
        </span>
      </div>

    </div>
  );
}


/* ================= BAR COMPONENT ================= */

function Bar({ value, label, height, color }) {
  return (
    <div className="flex flex-col items-center justify-end h-full">

      <span className="text-xs font-semibold mb-1">
        {value}
      </span>

      <div
        className={`w-8 ${color} rounded-t-md`}
        style={{ height }}
      />

      <span className="text-xs text-gray-500 mt-2 text-center">
        {label}
      </span>

    </div>
  );
}


/* ================= ANNOUNCEMENT ================= */

function Announcement({ title, text }) {
  return (
    <div className="flex gap-3">

      <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
        <FaBell className="text-green-600" />
      </div>

      <div>
        <p className="font-semibold text-sm">
          {title}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {text}
        </p>
      </div>

    </div>
  );
}

export default Dashboard;