import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle2, LogIn, LogOut } from "lucide-react";

const STORAGE_KEY = "attendance_today";

function todayKey() {
  return new Date().toDateString();
}

function loadAttendance() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (parsed.date !== todayKey()) return null;

    return parsed;
  } catch {
    return null;
  }
}

function formatTime(d) {
  return d
    ? new Date(d).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";
}

export default function TodayAttendance() {
  const navigate = useNavigate();

  const [data, setData] = useState(loadAttendance());
  const [now, setNow] = useState(Date.now());

  // Refresh from storage whenever the tab regains focus
  useEffect(() => {
    const refresh = () => setData(loadAttendance());

    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  // Update total hours every 30 seconds while checked in
  useEffect(() => {
    if (data?.status !== "checked-in") return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, [data?.status]);

  const handleMarkAttendance = () => {
    navigate("/student/attendance/mark");
  };

  const status = data?.status ?? null;

  const checkInTime = formatTime(data?.checkInTime);
  const checkOutTime = formatTime(data?.checkOutTime);

  const totalHours = (() => {
    if (!data?.checkInTime) return "--";

    const end = data?.checkOutTime
      ? new Date(data.checkOutTime)
      : new Date(now);

    const ms = end - new Date(data.checkInTime);

    if (ms < 0) return "--";

    const h = Math.floor(ms / 3600000);
    const m = Math.round((ms % 3600000) / 60000);

    return `${h}h ${m}m`;
  })();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">
          Today's Attendance
        </h3>

        <span className="text-xs text-slate-400">
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Attendance Status */}
      <div className="flex flex-col items-center py-3">

        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>

        <p className="text-sm font-semibold text-green-600">
          {status ? "Present" : "Not marked yet"}
        </p>

        <p className="text-xs text-slate-400">
          {status
            ? "You have checked in for today"
            : "You haven't checked in yet"}
        </p>

      </div>

      {/* Check In / Check Out */}
      <div className="grid grid-cols-2 gap-3 my-3">

        {/* Check In */}
        <div className="bg-blue-50/60 rounded-lg p-3 flex flex-col">
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
            <LogIn className="w-3.5 h-3.5 text-blue-500" />
            Check In
          </div>

          <span className="text-sm font-semibold text-slate-800">
            {checkInTime}
          </span>
        </div>

        {/* Check Out */}
        <div className="bg-rose-50 rounded-lg p-3 flex flex-col">
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
            Check Out
          </div>

          <span className="text-sm font-semibold text-slate-800">
            {checkOutTime}
          </span>
        </div>

      </div>

      {/* Total Hours - Light Blue Background */}
      <div className="bg-blue-50/60 rounded-lg p-3 flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>Total Hours</span>

        <span className="font-semibold text-slate-800">
          {totalHours}
        </span>
      </div>

      {/* Mark Attendance Button */}
      <button
        onClick={handleMarkAttendance}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-4 h-4" />
        Mark Attendance
      </button>

    </div>
  );
}