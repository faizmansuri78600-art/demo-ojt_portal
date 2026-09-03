
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/common/SSidebar";
import Header from "../../components/common/SHeader";
import {
  CheckCircle2,
  Clock,
  LogIn,
  LogOut,
} from "lucide-react";

const STORAGE_KEY = "attendance_today";

function todayKey() {
  return new Date().toDateString();
}

function loadAttendance() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Reset automatically when the date changes
    if (parsed.date !== todayKey()) return null;

    return parsed;
  } catch {
    return null;
  }
}

function saveAttendance(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatTime(d) {
  return d
    ? new Date(d).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";
}

export default function MarkAttendance() {
  const navigate = useNavigate();

  const [data, setData] = useState(loadAttendance());

  const status = data?.status ?? null;

  // Check In is allowed only once per day
  const canCheckIn = status === null;

  // Check Out is allowed only after Check In
  const canCheckOut = status === "checked-in";

  const handleCheckIn = () => {
    if (!canCheckIn) return;

    const next = {
      date: todayKey(),
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      status: "checked-in",
    };

    setData(next);
    saveAttendance(next);
  };

  const handleCheckOut = () => {
    if (!canCheckOut) return;

    const next = {
      ...data,
      checkOutTime: new Date().toISOString(),
      status: "checked-out",
    };

    setData(next);
    saveAttendance(next);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activePage="Attendance" />

      <div className="ml-64">
        <Header />

        <main className="p-4 pt-20 lg:p-6 lg:pt-24 space-y-4">

          <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-md mx-auto text-center">

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>

            {/* Heading */}
            <h1 className="text-lg font-bold text-slate-800 mb-1">
              Mark Your Attendance
            </h1>

            {/* Date */}
            <p className="text-sm text-slate-400 mb-6">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Status */}
            {status && (
              <div className="flex items-center justify-center gap-2 text-green-600 mb-6 text-sm">
                <CheckCircle2 className="w-5 h-5" />

                <span className="font-medium">
                  {status === "checked-in" &&
                    `Checked in at ${formatTime(data.checkInTime)}`}

                  {status === "checked-out" &&
                    `Checked in ${formatTime(data.checkInTime)} · Checked out ${formatTime(
                      data.checkOutTime
                    )}`}
                </span>
              </div>
            )}

            {/* Check In / Check Out */}
            <div className="grid grid-cols-2 gap-3">

              {/* Check In */}
              <button
                onClick={handleCheckIn}
                disabled={!canCheckIn}
                className={`flex items-center justify-center gap-2 font-medium py-3 rounded-lg transition-colors ${
                  canCheckIn
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <LogIn className="w-4 h-4" />
                Check In
              </button>

              {/* Check Out */}
              <button
                onClick={handleCheckOut}
                disabled={!canCheckOut}
                className={`flex items-center justify-center gap-2 font-medium py-3 rounded-lg transition-colors ${
                  canCheckOut
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <LogOut className="w-4 h-4" />
                Check Out
              </button>

            </div>

            {/* Completed message */}
            {status === "checked-out" && (
              <>
                <div className="mt-5 p-3 rounded-lg bg-green-50 border border-green-100">
                  <p className="text-xs text-green-600 font-medium">
                    Today's attendance is completed.
                  </p>

                  <p className="text-[11px] text-green-500 mt-1">
                    You can check in again tomorrow.
                  </p>
                </div>

                <Link
                  to="/student/attendance"
                  className="mt-4 inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Return to Attendance
                </Link>
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

