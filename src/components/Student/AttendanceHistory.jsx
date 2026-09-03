import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ROWS = [
  { date: "24 May 2025 (Sat)", checkIn: "09:32 AM", checkOut: "06:05 PM", hours: "8h 33m", status: "Present", remarks: "-" },
  { date: "23 May 2025 (Fri)", checkIn: "09:28 AM", checkOut: "06:00 PM", hours: "8h 32m", status: "Present", remarks: "-" },
  { date: "22 May 2025 (Thu)", checkIn: "09:30 AM", checkOut: "06:10 PM", hours: "8h 40m", status: "Present", remarks: "-" },
  { date: "21 May 2025 (Wed)", checkIn: "09:35 AM", checkOut: "06:02 PM", hours: "8h 27m", status: "Present", remarks: "-" },
  { date: "20 May 2025 (Tue)", checkIn: "09:40 AM", checkOut: "01:15 PM", hours: "3h 35m", status: "Half Day", remarks: "Left early (Medical)" },
];

const STATUS_STYLES = {
  Present: "bg-green-100 text-green-700",
  Absent: "bg-red-100 text-red-600",
  "Half Day": "bg-amber-100 text-amber-700",
};

export default function AttendanceHistory() {
  const [page, setPage] = useState(1);
  const totalPages = 4;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Attendance History</h3>
        <Link to="/attendance/history" className="text-xs font-medium text-blue-700 hover:underline">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400">
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Check In</th>
              <th className="py-2 font-medium">Check Out</th>
              <th className="py-2 font-medium">Total Hours</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.date} className="border-b border-slate-50 text-slate-600 last:border-0">
                <td className="py-2.5">{row.date}</td>
                <td className="py-2.5">{row.checkIn}</td>
                <td className="py-2.5">{row.checkOut}</td>
                <td className="py-2.5">{row.hours}</td>
                <td className="py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-2.5 text-slate-400">{row.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`h-7 w-7 rounded-md text-xs font-medium ${
              n === page ? "bg-blue-700 text-white" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
