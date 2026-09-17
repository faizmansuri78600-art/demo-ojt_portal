import { useState } from "react";
import { Plus, Download } from "lucide-react";
import MarkAttendanceModal from "./MarkAttendanceModal";
import ReportModal from "./ReportModal";

export default function AttendanceHeader() {
  const [showMark, setShowMark] = useState(false);
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Attendance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track and manage student attendance for OJT internships.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowMark(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
        >
          <Plus size={16} />
          Mark Attendance
        </button>
        <button
          onClick={() => setShowExport(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {showMark && <MarkAttendanceModal onClose={() => setShowMark(false)} />}
      {showExport && <ReportModal onClose={() => setShowExport(false)} />}
    </div>
  );
}