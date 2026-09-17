import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
import { useNavigate } from "react-router-dom";
import tcsLogo from "../../assets/logos/tcslogo.png";
import { useEffect, useState } from "react";

import {
  getDashboard,
  getStudentTask,
  completeTask,
  getStudentNotifications,
} from "../../services/StudentServices";

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
  Briefcase,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

export default function StudentDashboard() {
  // =========================
  // Dashboard State
  // =========================

  const [dashboardData, setDashboardData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // =========================
  // Load Dashboard Data
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboard = await getDashboard();
        setDashboardData(dashboard);

        // Notifications from dashboard backend
        setNotifications(dashboard?.notifications || []);
      } catch (error) {
        console.error("Dashboard loading error:", error);

        setError(
          error.message || "Failed to load dashboard"
        );
      }

      // =========================
      // Task
      // =========================

      try {
        const task = await getStudentTask();
        setTaskData(task.task);
      } catch (error) {
        console.log(
          "No task assigned:",
          error.message
        );

        setTaskData(null);
      }

      // =========================
      // Notifications API
      // =========================

      try {
        const notificationData =
          await getStudentNotifications();

        setNotifications(
          notificationData.notifications || []
        );
      } catch (error) {
        console.error(
          "Notification loading error:",
          error
        );
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // =========================
  // Today's Date
  // =========================

  const today = new Date();

  const todayDate = today.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    }
  );

  // =========================
  // Statistics Cards
  // =========================

  const statCards = [
    {
      label: "Applied Opportunities",
      value:
        dashboardData?.appliedOpportunities || 0,
      sub: "Applications",
      subColor: "text-green-600",
      icon: Briefcase,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },

    {
      label: "Active OJT",
      value:
        dashboardData?.activeOJT || 0,
      sub:
        dashboardData?.activeOJT > 0
          ? "Ongoing"
          : "Not Started",
      subColor: "text-gray-400",
      icon: Building2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },

    {
      label: "Hours Completed",
      value: `${dashboardData?.hoursCompleted || 0} / ${
        dashboardData?.totalHours || 0
      }`,
      sub: `${dashboardData?.hoursPercent || 0}%`,
      subColor: "text-green-600",
      icon: Clock,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      progress:
        dashboardData?.hoursPercent || 0,
    },

    {
      label: "Attendance",
      value: `${
        dashboardData?.attendancePercent || 0
      }%`,
      sub: "Current",
      subColor: "text-green-600",
      icon: CheckCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },

    {
      label: "Pending Reports",
      value:
        dashboardData?.pendingReports || 0,
      sub: "Reports",
      subColor: "text-red-500",
      icon: FileText,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },

    {
      label: "Certificate Status",
      value:
        dashboardData?.certificateStatus ||
        "Not Issued",
      sub: "Current Status",
      subColor: "text-blue-500",
      icon: Award,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
  ];

  // =========================
  // Upcoming Deadlines
  // =========================

  const upcomingDeadlines =
    dashboardData?.upcomingDeadlines || [];

  // =========================
  // Quick Actions
  // =========================

  const quickActions = [
    {
      label: "Search OJT",
      icon: Search,
    },
    {
      label: "My Applications",
      icon: ClipboardList,
    },
    {
      label: "Upload Report",
      icon: Upload,
    },
    {
      label: "Weekly Diary",
      icon: BookOpen,
    },
    {
      label: "View Certificate",
      icon: Award,
    },
  ];

  // =========================
  // Announcements
  // =========================

  const announcements =
    dashboardData?.announcements || [];

  // =========================
  // OJT Progress
  // =========================

  const hoursCompleted =
    dashboardData?.hoursCompleted || 0;

  const totalHours =
    dashboardData?.totalHours || 0;

  const progressPercent =
    dashboardData?.hoursPercent || 0;

  const radius = 54;

  const circumference =
    2 * Math.PI * radius;

  const dashOffset =
    circumference -
    (progressPercent / 100) *
      circumference;

  // =========================
  // Attendance Summary
  // =========================

  const attendance =
    dashboardData?.attendance || {
      present: 0,
      absent: 0,
      leave: 0,
      total: 0,
      percentage: 0,
    };

  const attendanceTotal =
    attendance.total || 0;

  const presentPct =
    attendanceTotal > 0
      ? Math.round(
          (attendance.present /
            attendanceTotal) *
            100
        )
      : 0;

  const absentPct =
    attendanceTotal > 0
      ? Math.round(
          (attendance.absent /
            attendanceTotal) *
            100
        )
      : 0;

  const leavePct =
    Math.max(
      100 -
        presentPct -
        absentPct,
      0
    );

  // =========================
  // Company Logo
  // =========================

  <img
  src={dashboardData?.companyLogo}
  alt={dashboardData?.company || "Company"}
  className="w-full h-full object-contain"
/>

  // =========================
  // Return
  // =========================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar activePage="Dashboard" />

      {/* Loading */}
      {loading && (
        <div className="fixed top-20 right-6 z-40 bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-blue-600 shadow-sm">
          Loading dashboard...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="fixed top-20 right-6 z-40 bg-white border border-red-200 rounded-md px-3 py-2 text-xs text-red-600 shadow-sm">
          {error}
        </div>
      )}

      {/* Main Content */}
      <main className="ml-64 pt-20 p-6 min-h-screen overflow-y-auto">

        {/* =========================
            Welcome Section
        ========================= */}

        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back,{" "}
              {dashboardData?.studentName ||
                "Student"}
              !
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Here's what's happening with your
              OJT journey today.
            </p>
          </div>

          <div className="flex gap-3">

            {/* Today's Date */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">

              <Calendar
                size={16}
                className="text-blue-600"
              />

              <div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Today's Date
                </p>

                <p className="text-sm font-medium text-gray-700 leading-tight">
                  {todayDate}
                </p>
              </div>

            </div>

            {/* Semester */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">

              <GraduationCap
                size={16}
                className="text-purple-600"
              />

              <div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Current Semester
                </p>

                <p className="text-sm font-medium text-gray-700 leading-tight">
                  Semester{" "}
                  {dashboardData?.semester ||
                    "Not Set"}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* =========================
            Statistics Cards
        ========================= */}

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
                  <Icon
                    size={18}
                    className={iconColor}
                  />
                </div>

                <p className="text-xs text-gray-500">
                  {label}
                </p>

                <p className="text-xl font-bold text-gray-800 mt-0.5">
                  {value}
                </p>

                {progress !== undefined ? (
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>
                ) : (
                  <p
                    className={`text-xs mt-1 ${subColor}`}
                  >
                    {sub}
                  </p>
                )}

              </div>
            )
          )}

        </div>

        {/* =========================
            Row 1
        ========================= */}

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
                    strokeDasharray={
                      circumference
                    }
                    strokeDashoffset={
                      dashOffset
                    }
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

                <span className="text-gray-500">
                  Remaining Hours
                </span>

                <span className="font-medium text-gray-700">
                  {Math.max(
                    totalHours -
                      hoursCompleted,
                    0
                  )}{" "}
                  Hours
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Expected Completion
                </span>

                <span className="font-medium text-gray-700">
                  {dashboardData?.expectedEndDate ||
                    "Not Set"}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Daily Average
                </span>

                <span className="font-medium text-gray-700">
                  {dashboardData?.dailyAverage ||
                    0}{" "}
                  Hours / Day
                </span>

              </div>

            </div>

            <button className="w-full flex items-center justify-center gap-1 text-blue-600 text-xs font-medium mt-4 border border-blue-100 bg-blue-50 py-2 rounded-md hover:bg-blue-100">
              View Progress Details
              <ArrowRight size={12} />
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
  src={dashboardData?.companyLogo || ""}
  alt={dashboardData?.company || "Company"} 
  className="w-full h-full object-contain" 
/>

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <p className="text-sm font-semibold text-gray-800">
                    {dashboardData?.company ||
                      "Not Assigned"}
                  </p>

                  <span className="text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">
                    {dashboardData?.status ||
                      "Active"}
                  </span>

                </div>

                <p className="text-xs text-gray-500">
                  {dashboardData?.opportunityTitle ||
                    "OJT"}
                </p>

              </div>

            </div>

            <div className="space-y-2.5 text-xs">

              <div className="flex items-center gap-2 text-gray-500">

                <User size={13} />

                <span>
                  Supervisor:
                </span>

                <span className="text-gray-700 font-medium ml-auto">
                  {dashboardData?.mentor ||
                    "Not Assigned"}
                </span>

              </div>

              <div className="flex items-center gap-2 text-gray-500">

                <Calendar size={13} />

                <span>
                  Joining Date:
                </span>

                <span className="text-gray-700 font-medium ml-auto">
                  {dashboardData?.joiningDate ||
                    "Not Set"}
                </span>

              </div>

              <div className="flex items-center gap-2 text-gray-500">

                <Calendar size={13} />

                <span>
                  Expected End Date:
                </span>

                <span className="text-gray-700 font-medium ml-auto">
                  {dashboardData?.expectedEndDate ||
                    "Not Set"}
                </span>

              </div>

              <div className="flex items-center gap-2 text-gray-500">

                <MapPin size={13} />

                <span>
                  Location:
                </span>

                <span className="text-gray-700 font-medium ml-auto">
                  {dashboardData?.location ||
                    "Not Set"}
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
                {taskData?.status ||
                  "Pending"}
              </span>

            </div>

            <p className="text-sm font-semibold text-gray-800">
              {taskData?.title ||
                "No task assigned"}
            </p>

            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              {taskData?.description ||
                "No task description"}
            </p>

            <div className="flex items-center justify-between mt-4 text-xs">

              <div>

                <p className="text-gray-400">
                  Priority
                </p>

                <p className="text-red-500 font-medium flex items-center gap-1 mt-0.5">

                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />

                  {taskData?.priority ||
                    "Medium"}

                </p>

              </div>

              <div>

                <p className="text-gray-400">
                  Due Date
                </p>

                <p className="text-gray-700 font-medium mt-0.5">
                  {taskData?.dueDate
                    ? new Date(
                        taskData.dueDate
                      ).toLocaleDateString(
                        "en-GB"
                      )
                    : "No due date"}
                </p>

              </div>

            </div>

            <button
              onClick={async () => {

                if (!taskData?._id) {
                  alert(
                    "No task assigned."
                  );
                  return;
                }

                try {

                  const response =
                    await completeTask(
                      taskData._id
                    );

                  setTaskData(
                    response.task
                  );

                  alert(
                    "Task completed successfully! 🎉"
                  );

                } catch (error) {

                  console.error(
                    "Task completion error:",
                    error
                  );

                  alert(
                    error.message ||
                      "Failed to complete task"
                  );
                }

              }}
              disabled={
                !taskData?._id ||
                taskData?.status ===
                  "Completed"
              }
              className="w-full flex items-center justify-center gap-1.5 text-white text-xs font-medium mt-5 bg-blue-600 py-2.5 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >

              <CheckCircle size={14} />

              {taskData?.status ===
              "Completed"
                ? "Task Completed"
                : "Mark Task Complete"}

            </button>

          </div>

        </div>

        {/* =========================
            Row 2
        ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* Recent Activities */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">

            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Recent Activities
            </h3>

            <ul className="space-y-3">

              {dashboardData?.appliedOpportunities >
                0 && (
                <li className="flex items-start gap-3">

                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">

                    <Briefcase
                      size={13}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-gray-700 leading-tight">
                      OJT application
                      submitted
                    </p>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Application recorded
                    </p>

                  </div>

                </li>
              )}

              {dashboardData?.activeOJT >
                0 && (
                <li className="flex items-start gap-3">

                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0">

                    <CheckCircle
                      size={13}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-gray-700 leading-tight">
                      OJT assigned at{" "}
                      {dashboardData?.company ||
                        "company"}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Status:{" "}
                      {dashboardData?.status ||
                        "Ongoing"}
                    </p>

                  </div>

                </li>
              )}

              {dashboardData?.attendancePercent >
                0 && (
                <li className="flex items-start gap-3">

                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center shrink-0">

                    <Calendar
                      size={13}
                      className="text-purple-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-gray-700 leading-tight">
                      Attendance updated
                    </p>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Current attendance:{" "}
                      {
                        dashboardData.attendancePercent
                      }%
                    </p>

                  </div>

                </li>
              )}

              {!dashboardData?.appliedOpportunities &&
                !dashboardData?.activeOJT &&
                !dashboardData?.attendancePercent && (
                  <li className="text-xs text-gray-400">
                    No recent activities
                  </li>
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

              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map(
                  (item, i) => (
                    <li
                      key={item._id || i}
                      className="flex items-center justify-between border border-blue-100 bg-blue-50 rounded-md px-3 py-2"
                    >

                      <div>

                        <p className="text-xs font-medium text-gray-800">
                          {item.title}
                        </p>

                        <p className="text-[11px] text-blue-600">
                          {item.priority ||
                            "Pending"}
                        </p>

                      </div>

                      <span className="text-[11px] font-medium text-blue-600 whitespace-nowrap">
                        {item.dueDate
                          ? new Date(
                              item.dueDate
                            ).toLocaleDateString(
                              "en-GB"
                            )
                          : "No Date"}
                      </span>

                    </li>
                  )
                )
              ) : (
                <li className="text-xs text-gray-400">
                  No upcoming deadlines
                </li>
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

              {notifications.length > 0 ? (
                notifications.map(
                  (
                    {
                      message,
                      dateTime,
                      status,
                    },
                    i
                  ) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5"
                    >

                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          status === "Unread"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      />

                      <div>

                        <p className="text-xs text-gray-700 leading-tight">
                          {message}
                        </p>

                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {new Date(
                            dateTime
                          ).toLocaleString()}
                        </p>

                      </div>

                    </li>
                  )
                )
              ) : (
                <li className="text-xs text-gray-400">
                  No notifications
                </li>
              )}

            </ul>

          </div>

        </div>

        {/* =========================
            Row 3
        ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">

            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Actions
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3">

              {quickActions.map(
                ({
                  label,
                  icon: Icon,
                }) => (
                  <button
                    key={label}
                    onClick={() => {

                      if (
                        label ===
                        "Search OJT"
                      ) {
                        navigate(
                          "/browse-ojt"
                        );
                      }

                      else if (
                        label ===
                        "My Applications"
                      ) {
                        navigate(
                          "/Myapplication"
                        );
                      }

                      else if (
                        label ===
                        "Upload Report"
                      ) {
                        navigate(
                          "/Reports"
                        );
                      }

                      else if (
                        label ===
                        "Weekly Diary"
                      ) {
                        navigate(
                          "/weekly-diary"
                        );
                      }

                      else if (
                        label ===
                        "View Certificate"
                      ) {
                        navigate(
                          "/certificate"
                        );
                      }

                    }}
                    className="flex flex-col items-center justify-center gap-2 border border-gray-100 rounded-lg py-3 hover:bg-gray-50 cursor-pointer"
                  >

                    <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center">

                      <Icon
                        size={16}
                        className="text-blue-600"
                      />

                    </div>

                    <span className="text-[11px] text-gray-600 text-center leading-tight">
                      {label}
                    </span>

                  </button>
                )
              )}

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
                  background: `conic-gradient(
                    #22c55e 0% ${presentPct}%,
                    #ef4444 ${presentPct}% ${
                      presentPct +
                      absentPct
                    }%,
                    #eab308 ${
                      presentPct +
                      absentPct
                    }% 100%
                  )`,
                }}
              >

                <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">

                  <span className="text-lg font-bold text-gray-800">
                    {attendanceTotal}
                  </span>

                  <span className="text-[10px] text-gray-400">
                    Total
                  </span>

                </div>

              </div>

            </div>

            {/* Present */}
            <div className="flex justify-center mt-4 text-xs">

              <div className="flex items-center gap-1.5">

                <span className="w-2 h-2 rounded-full bg-green-500" />

                <span className="text-gray-500">
                  Present:{" "}
                  {attendance.present}{" "}
                  Days ({presentPct}%)
                </span>

              </div>

            </div>

            {/* Absent */}
            <div className="flex justify-center mt-1.5 text-xs">

              <div className="flex items-center gap-1.5">

                <span className="w-2 h-2 rounded-full bg-red-500" />

                <span className="text-gray-500">
                  Absent:{" "}
                  {attendance.absent}{" "}
                  Days ({absentPct}%)
                </span>

              </div>

            </div>

            {/* Leave */}
            <div className="flex justify-center mt-1.5 text-xs">

              <div className="flex items-center gap-1.5">

                <span className="w-2 h-2 rounded-full bg-yellow-500" />

                <span className="text-gray-500">
                  Leave:{" "}
                  {attendance.leave}{" "}
                  Days ({leavePct}%)
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

              {announcements.length > 0 ? (
                announcements.map(
                  (
                    {
                      message,
                      dateTime,
                    },
                    i
                  ) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5"
                    >

                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">

                        <Bell
                          size={12}
                          className="text-blue-600"
                        />

                      </div>

                      <div>

                        <p className="text-xs text-gray-700 leading-snug">
                          {message}
                        </p>

                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {dateTime
                            ? new Date(
                                dateTime
                              ).toLocaleDateString(
                                "en-GB"
                              )
                            : ""}
                        </p>

                      </div>

                    </li>
                  )
                )
              ) : (
                <li className="text-xs text-gray-400">
                  No announcements
                </li>
              )}

            </ul>

          </div>

        </div>

      </main>
    </div>
  );
}