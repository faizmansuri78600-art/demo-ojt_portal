import { useMemo, useState } from "react";
import { Eye, Pencil, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useAttendance } from "./AttendanceContext";
import { daysInMonth, dayLabel } from "./AttendanceData";
import { DayStatusIcon, StatusBadge, LegendDot } from "./AttendanceStatusIcons";
import StudentDetailModal from "./StudentDetailModal";

const PAGE_SIZE = 8;

export default function StudentAttendanceTable() {
  const { filteredStudents, records, monthKey, studentStats, verifyDay, verifyAllPending, totals } = useAttendance();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { student, mode }

  function handleVerifyAll() {
    const count = verifyAllPending();
    alert(count > 0 ? `Verified ${count} pending attendance entr${count === 1 ? "y" : "ies"}.` : "No pending entries to verify.");
  }

  const totalEntries = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE));
  const pageStudents = useMemo(
    () => filteredStudents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredStudents, page]
  );

  const rangeStart = totalEntries === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalEntries);

  // First 5 days of the selected month + last day, mirroring the original sparse column layout
  const total = daysInMonth(monthKey);
  const shownDays = [1, 2, 3, 4, 5, total];
  const monthRecords = records[monthKey] || {};

  return (
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
        <h2 className="text-sm font-semibold text-slate-900">Student Attendance List</h2>
        <div className="flex flex-wrap items-center gap-4">
          <LegendDot color="#22c55e" label="Present" />
          <LegendDot color="#ef4444" label="Absent" />
          <LegendDot color="#f59e0b" label="Late" />
          <LegendDot color="#cbd5e1" label="Holiday" />
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-amber-400" />
            Pending verification
          </span>
        </div>
        <button
          onClick={handleVerifyAll}
          disabled={totals.pending === 0}
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Verify Pending ({totals.pending})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs text-slate-500">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Student Name</th>
              <th className="px-4 py-3 font-medium">Internship / Opportunity</th>
              {shownDays.map((day) => {
                const { label, sub } = dayLabel(monthKey, day);
                return (
                  <th key={day} className="px-2 py-3 text-center font-medium">
                    <div>{label}</div>
                    <div className="text-[10px] font-normal text-slate-400">{sub}</div>
                  </th>
                );
              })}
              <th className="px-4 py-3 font-medium">Present %</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageStudents.map((student, idx) => {
              const stats = studentStats[student.id] || { pct: 0, badge: "—" };
              return (
                <tr key={student.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3 text-slate-500">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                        {student.initials}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-400">{student.program}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{student.internship}</td>
                  {shownDays.map((day) => {
                    const entry = monthRecords[day]?.[student.id];
                    const pending = entry && !entry.verified;
                    return (
                      <td key={day} className="px-2 py-3 text-center">
                        <div className="flex justify-center">
                          <button
                            disabled={!pending}
                            onClick={() => {
                              verifyDay(monthKey, day, student.id);
                            }}
                            title={
                              !entry
                                ? "No entry"
                                : pending
                                ? `Self-marked "${entry.status}" — click to verify`
                                : `${entry.status} (verified)`
                            }
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              pending ? "cursor-pointer ring-2 ring-amber-300" : "cursor-default"
                            }`}
                          >
                            <DayStatusIcon status={entry?.status} />
                          </button>
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 font-medium text-slate-900">{stats.pct.toFixed(2)}%</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={stats.badge} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModal({ student, mode: "view" })}
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setModal({ student, mode: "edit" })}
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        title="Edit attendance"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {pageStudents.length === 0 && (
              <tr>
                <td colSpan={shownDays.length + 6} className="px-4 py-8 text-center text-sm text-slate-400">
                  No students match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-4">
        <p className="text-xs text-slate-500">
          Showing {rangeStart} to {rangeEnd} of {totalEntries} entries
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-slate-200 p-1.5 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-7 w-7 rounded-md text-xs font-medium transition ${
                n === page ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-slate-200 p-1.5 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
        <Info size={13} />
        Attendance is calculated based on marked working days in {monthKey}.
      </div>

      {modal && <StudentDetailModal student={modal.student} mode={modal.mode} onClose={() => setModal(null)} />}
    </div>
  );
}