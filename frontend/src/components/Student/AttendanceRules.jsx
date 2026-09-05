import { CheckCircle2, Info, Download } from "lucide-react";

const RULES = [
  "Minimum 75% attendance is required.",
  "Mark attendance daily (Check In & Check Out).",
  "Inform mentor for leaves.",
  "Half day will be counted as 0.5 day.",
];

export default function AttendanceRules({ onDownloadReport }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-700" />
          <h3 className="text-sm font-semibold text-slate-700">Attendance Rules</h3>
        </div>
        <ul className="space-y-2.5">
          {RULES.map((rule) => (
            <li key={rule} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <button
          onClick={onDownloadReport}
          className="flex w-full items-center gap-3 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <Download className="h-4 w-4 text-blue-700" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium text-slate-700">
              Download Attendance Report
            </span>
            <span className="block text-xs text-slate-400">Get your attendance report</span>
          </span>
        </button>
      </div>
    </div>
  );
}
