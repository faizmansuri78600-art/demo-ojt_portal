import { useState } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
 import { useNavigate } from "react-router-dom";
import tcsLogo from "../../assets/logos/tcslogo.png";
 
import {
  Calendar,
  GraduationCap,
  Bell,
  CheckCircle,
  Clock,
  Building2,
  FileText,
  BookOpen,
  Award,
  Upload,
  Search,
  MapPin,
  User,
  AlertCircle,
  Briefcase,
  ClipboardList,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
 
export default function StudentDashboard() {
  // ---- Static sample data (no backend yet) ----
  const navigate = useNavigate();
 
  const statCards = [
    {
      label: "Applied Opportunities",
      value: "12",
      sub: "+2 this month",
      subColor: "text-green-600",
      icon: Briefcase,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Active OJT",
      value: "1",
      sub: "Ongoing",
      subColor: "text-gray-400",
      icon: Building2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Hours Completed",
      value: "85 / 120",
      sub: "71%",
      subColor: "text-green-600",
      icon: Clock,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      progress: 71,
    },
    {
      label: "Attendance",
      value: "92%",
      sub: "+2% this month",
      subColor: "text-green-600",
      icon: CheckCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      label: "Pending Reports",
      value: "2",
      sub: "Due this week",
      subColor: "text-red-500",
      icon: FileText,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      label: "Certificate Status",
      value: "Not Issued",
      sub: "In Progress",
      subColor: "text-blue-500",
      icon: Award,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
  ];
 
  const recentActivities = [
    {
      text: "Weekly Diary Week 6 submitted",
      time: "17 May 2025, 10:30 AM",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      text: "Attendance marked for today",
      time: "17 May 2025, 09:15 AM",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      text: "Report reviewed by mentor",
      time: "16 May 2025, 04:15 PM",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      text: "Company meeting scheduled",
      time: "15 May 2025, 11:20 AM",
      icon: Calendar,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
  ];
 
  const upcomingDeadlines = [
    {
      title: "Weekly Diary - Week 7",
      sub: "Due in 3 days",
      date: "20 May 2025",
      color: "bg-red-50 border-red-100 text-red-600",
    },
    {
      title: "Project Report Submission",
      sub: "Due in 12 days",
      date: "29 May 2025",
      color: "bg-orange-50 border-orange-100 text-orange-600",
    },
    {
      title: "Mentor Meeting",
      sub: "Due in 15 days",
      date: "01 Jun 2025",
      color: "bg-blue-50 border-blue-100 text-blue-600",
    },
    {
      title: "Final Presentation",
      sub: "Due in 21 days",
      date: "07 Jun 2025",
      color: "bg-green-50 border-green-100 text-green-600",
    },
  ];
 
  const notifications = [
    {
      text: "New opportunity posted: Python Developer Intern",
      time: "2 hours ago",
      dot: "bg-blue-500",
    },
    {
      text: "Your weekly diary has been approved",
      time: "Today, 10:30 AM",
      dot: "bg-green-500",
    },
    {
      text: "Attendance missing for 1 day this week",
      time: "Today, 09:15 AM",
      dot: "bg-yellow-500",
    },
    {
      text: "Mentor meeting scheduled on 20 May 2025",
      time: "Yesterday, 04:30 PM",
      dot: "bg-purple-500",
    },
  ];
 
  const quickActions = [
  {
    label: "Search OJT",
    icon: Search,
    path: "/student/browse-ojt",
  },
  {
    label: "My Applications",
    icon: ClipboardList,
    path: "/student/my-applications",
  },
  {
    label: "Upload Report",
    icon: Upload,
    path: "/student/reports",
  },
  {
    label: "Weekly Diary",
    icon: BookOpen,
    path: "/student/weekly-diary",
  },
  {
    label: "View Certificate",
    icon: Award,
    path: "/student/certificate",
  },
];
 
  const announcements = [
    {
      text: "OJT Orientation session for all students on 25 May 2025.",
      date: "16 May 2025",
    },
    {
      text: "New companies are added. Check opportunities now!",
      date: "15 May 2025",
    },
  ];
 
  // ---- Circular progress math for OJT Progress card ----
  const hoursCompleted = 85;
  const totalHours = 120;
  const progressPercent = Math.round((hoursCompleted / totalHours) * 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progressPercent / 100) * circumference;
 
  // ---- Attendance summary donut (conic-gradient, no chart library needed) ----
  const attendance = { present: 24, absent: 4, leave: 2, total: 30 };
  const presentPct = Math.round((attendance.present / attendance.total) * 100);
  const absentPct = Math.round((attendance.absent / attendance.total) * 100);
  const leavePct = 100 - presentPct - absentPct;
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <Header />

      {/* Fixed Sidebar */}
      <Sidebar activePage="Dashboard" />

      {/* Scrollable Main Content */}
      <main className="ml-64 pt-20 p-6 min-h-screen overflow-y-auto">
        
        {/* ===== Welcome section ===== */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, Ayesha! 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here's what's happening with your OJT journey today.
            </p>
          </div>
 
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
              <Calendar size={16} className="text-blue-600" />
              <div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Today's Date
                </p>
                <p className="text-sm font-medium text-gray-700 leading-tight">
                  17 May 2025, Sat
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
              <GraduationCap size={16} className="text-purple-600" />
              <div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Current Semester
                </p>
                <p className="text-sm font-medium text-gray-700 leading-tight">
                  Semester VI
                </p>
              </div>
            </div>
          </div>
        </div>
 
        {/* ===== Statistics cards ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {statCards.map(
            ({
              label,
              value,
              sub,
              subColor,
              icon: Icon,
              iconBg,
              iconColor,
              progress,
            }) => (
              <div
                key={label}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div
                  className={`w-9 h-9 rounded-md ${iconBg} flex items-center justify-center mb-3`}
                >
                  <Icon size={18} className={iconColor} />
                </div>

                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-xl font-bold text-gray-800 mt-0.5">
                  {value}
                </p>

                {progress !== undefined ? (
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                ) : (
                  <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>
                )}
              </div>
            )
          )}
        </div>
 
        {/* ===== Row 1: OJT Progress / Assigned Company / Today's Task ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          
          {/* OJT Progress */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              OJT Progress
            </h3>

            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">
                    {hoursCompleted}
                  </span>
                  <span className="text-xs text-gray-400">
                    of {totalHours}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Hours Completed
              </p>
            </div>
 
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Remaining Hours</span>
                <span className="font-medium text-gray-700">
                  {totalHours - hoursCompleted} Hours
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Expected Completion</span>
                <span className="font-medium text-gray-700">
                  30 Jun 2025
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Daily Average</span>
                <span className="font-medium text-gray-700">
                  4.2 Hours / Day
                </span>
              </div>
            </div>
 
            <button className="w-full flex items-center justify-center gap-1 text-blue-600 text-xs font-medium mt-4 border border-blue-100 bg-blue-50 py-2 rounded-md hover:bg-blue-100">
              View Progress Details <ArrowRight size={12} />
            </button>
          </div>
 
          {/* Assigned Company */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Assigned Company
              </h3>
              <button className="text-xs text-blue-600 font-medium">
                View Details
              </button>
            </div>
 
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={tcsLogo}
                  alt="TCS"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Tata Consultancy Services
                  </p>

                  <span className="text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">
                    Active
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  Software Developer Intern
                </p>
              </div>
            </div>
 
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <User size={13} />
                <span>Supervisor:</span>
                <span className="text-gray-700 font-medium ml-auto">
                  Mr. Rahul Sharma
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={13} />
                <span>Joining Date:</span>
                <span className="text-gray-700 font-medium ml-auto">
                  01 Apr 2025
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={13} />
                <span>Expected End Date:</span>
                <span className="text-gray-700 font-medium ml-auto">
                  30 Jun 2025
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={13} />
                <span>Location:</span>
                <span className="text-gray-700 font-medium ml-auto">
                  Pune, Maharashtra
                </span>
              </div>
            </div>
          </div>
 
          {/* Today's Task */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Today's Task
              </h3>

              <span className="text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">
                In Progress
              </span>
            </div>
 
            <p className="text-sm font-semibold text-gray-800">
              Implement User Authentication
            </p>

            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Integrate login &amp; registration API and validate user roles.
            </p>
 
            <div className="flex items-center justify-between mt-4 text-xs">
              <div>
                <p className="text-gray-400">Priority</p>
                <p className="text-red-500 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  High
                </p>
              </div>

              <div>
                <p className="text-gray-400">Due Date</p>
                <p className="text-gray-700 font-medium mt-0.5">
                  17 May 2025
                </p>
              </div>
            </div>
 
            <button
  onClick={() => alert("Task completed successfully! 🎉")}
  className="w-full flex items-center justify-center gap-1.5 text-white text-xs font-medium mt-5 bg-blue-600 py-2.5 rounded-md hover:bg-blue-700"
>
  <CheckCircle size={14} />
  Mark Task Complete
</button>
          </div>
        </div>
 
        {/* ===== Row 2: Recent Activities / Upcoming Deadlines / Notifications ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          
          {/* Recent Activities */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Recent Activities
              </h3>
            </div>

            <ul className="space-y-3">
              {recentActivities.map(
                ({ text, time, icon: Icon, color, bg }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={13} className={color} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-700 leading-tight">
                        {text}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {time}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>

            <button className="text-xs text-blue-600 font-medium mt-3">
              View All Activities
            </button>
          </div>
 
          {/* Upcoming Deadlines */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Upcoming Deadlines
              </h3>

              <button className="text-xs text-blue-600 font-medium">
                View Calendar
              </button>
            </div>

            <ul className="space-y-2">
              {upcomingDeadlines.map(
                ({ title, sub, date, color }, i) => (
                  <li
                    key={i}
                    className={`flex items-center justify-between border rounded-md px-3 py-2 ${color}`}
                  >
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {title}
                      </p>
                      <p className="text-[11px]">{sub}</p>
                    </div>

                    <span className="text-[11px] font-medium whitespace-nowrap">
                      {date}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
 
          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Notifications
              </h3>

              <button className="text-xs text-blue-600 font-medium">
                View All
              </button>
            </div>

            <ul className="space-y-3">
              {notifications.map(({ text, time, dot }, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dot}`}
                  />

                  <div>
                    <p className="text-xs text-gray-700 leading-tight">
                      {text}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
 
        {/* ===== Row 3: Quick Actions / Attendance Summary / Announcements ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Actions
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3">
              {quickActions.map(({ label, icon: Icon }) => (
  <button
    key={label}
    onClick={() => {
      if (label === "Search OJT") {
        navigate("/browse-ojt");
      } else if (label === "My Applications") {
        navigate("/Myapplication");
      } else if (label === "Upload Report") {
        navigate("/Reports");
      } else if (label === "Weekly Diary") {
        navigate("/weekly-diary");
      } else if (label === "View Certificate") {
        navigate("/certificate");
      }
    }}
    className="flex flex-col items-center justify-center gap-2 border border-gray-100 rounded-lg py-3 hover:bg-gray-50 cursor-pointer"
  >
                  <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center">
                    <Icon size={16} className="text-blue-600" />
                  </div>

                  <span className="text-[11px] text-gray-600 text-center leading-tight">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
 
          {/* Attendance Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Attendance Summary
            </h3>

            <div className="flex items-center justify-center">
              <div
                className="relative w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#22c55e 0% ${presentPct}%, #ef4444 ${presentPct}% ${presentPct + absentPct}%, #eab308 ${presentPct + absentPct}% 100%)`,
                }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-800">
                    {attendance.total}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Total
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-500">
                  Present: {attendance.present} Days ({presentPct}%)
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-gray-500">
                  Absent: {attendance.absent} Days ({absentPct}%)
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-gray-500">
                  Leave: {attendance.leave} Days ({leavePct}%)
                </span>
              </div>
            </div>
          </div>
 
          {/* Announcements */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Announcements
              </h3>

              <button className="text-xs text-blue-600 font-medium">
                View All
              </button>
            </div>

            <ul className="space-y-3">
              {announcements.map(({ text, date }, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell size={12} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-700 leading-snug">
                      {text}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}