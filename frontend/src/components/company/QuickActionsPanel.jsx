import { useState } from "react";
import { Users, FileBarChart2, FileSpreadsheet, Info } from "lucide-react";
import BulkMarkModal from "./BulkMarkModal";
import ReportModal from "./ReportModal";

export default function QuickActionsPanel() {
  const [showBulk, setShowBulk] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>

      <div className="mt-3 flex flex-col gap-1">
        <button
          onClick={() => setShowBulk(true)}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          <Users size={16} />
          Mark Bulk Attendance
        </button>
        <button
          onClick={() => setShowReport(true)}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          <FileBarChart2 size={16} />
          View Attendance Report
        </button>
        <button
          onClick={() => setShowReport(true)}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          <FileSpreadsheet size={16} />
          Export to Excel
        </button>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
        <Info size={14} className="mt-0.5 shrink-0" />
        You can mark attendance individually or in bulk for selected students and dates.
      </div>

      {showBulk && <BulkMarkModal onClose={() => setShowBulk(false)} />}
      {showReport && <ReportModal onClose={() => setShowReport(false)} />}
    </div>
  );
}