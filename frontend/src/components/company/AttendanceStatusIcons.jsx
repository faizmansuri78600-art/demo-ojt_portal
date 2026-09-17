import { CheckCircle2, XCircle, Clock, MinusCircle } from "lucide-react";

// Renders the small per-day glyph inside the attendance grid.
export function DayStatusIcon({ status }) {
  switch (status) {
    case "present":
      return <CheckCircle2 size={18} className="text-emerald-500" />;
    case "absent":
      return <XCircle size={18} className="text-red-500" />;
    case "late":
      return <Clock size={18} className="text-amber-500" />;
    case "holiday":
      return <MinusCircle size={18} className="text-slate-300" />;
    default:
      return <span className="text-slate-300">-</span>;
  }
}

const statusStyles = {
  Excellent: "bg-emerald-50 text-emerald-600",
  Good: "bg-emerald-50 text-emerald-600",
  Average: "bg-amber-50 text-amber-600",
  "Needs Improvement": "bg-orange-50 text-orange-600",
  Poor: "bg-red-50 text-red-600",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export function LegendDot({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
