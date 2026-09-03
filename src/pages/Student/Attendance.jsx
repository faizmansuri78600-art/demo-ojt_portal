import { Link } from "react-router-dom";
import Sidebar from "../../components/common/SSidebar";
import Header from "../../components/common/SHeader";
import AttendanceStats from "../../components/Student/AttendanceStats";
import AttendanceCalendar from "../../components/Student/AttendanceCalendar";
import TodayAttendance from "../../components/Student/TodayAttendance";
import AttendanceSummary from "../../components/Student/AttendanceSummary";
import AttendanceHistory from "../../components/Student/AttendanceHistory";
import AttendanceRules from "../../components/Student/AttendanceRules";

export default function Attendance() {
  const handleMarkAttendance = () => {
    console.log("Mark attendance clicked");
  };

  const handleDownloadReport = () => {
    console.log("Download report clicked");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar activePage="Attendance" />

      <div className="ml-64">
        <Header />

        {/* pt-16 pushes content below the fixed/sticky Topbar.
            Change this to match your Topbar's actual height
            (h-16 => pt-16, h-20 => pt-20, etc). */}
        <main className="p-4 pt-20 lg:p-6 lg:pt-24 space-y-4">

          {/* =========================
              ATTENDANCE PAGE HEADER
          ========================== */}
          <div className="w-full">

            {/* Breadcrumb */}
            <div className="flex items-center text-xs mb-1">
              <Link
                to="/dashboard"
                className="text-slate-400 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <span className="mx-2 text-slate-400">
                &gt;
              </span>

              <span className="text-slate-500">
                Attendance
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-xl font-bold text-slate-800">
              Attendance
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-slate-400">
              Track your OJT attendance and working hours.
            </p>

          </div>

          {/* Attendance Statistics */}
          <AttendanceStats />

          {/* Calendar / Today's Attendance / Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            <AttendanceCalendar />

            <TodayAttendance
              onMarkAttendance={handleMarkAttendance}
            />

            <AttendanceSummary />

          </div>

          {/* Attendance History / Rules */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            <div className="lg:col-span-2">
              <AttendanceHistory />
            </div>

            <AttendanceRules
              onDownloadReport={handleDownloadReport}
            />

          </div>

        </main>
      </div>
    </div>
  );
}