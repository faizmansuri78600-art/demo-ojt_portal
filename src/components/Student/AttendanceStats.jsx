import { CalendarDays, CheckCircle2, XCircle, Clock } from "lucide-react";

const stats = [
  {
    label: "Total Working Days",
    value: "48",
    sub: "of 60 Days",
    icon: CalendarDays,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    label: "Present Days",
    value: "45",
    sub: "93.8%",
    icon: CheckCircle2,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    label: "Absent Days",
    value: "3",
    sub: "6.2%",
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    label: "Total Hours",
    value: "360 / 480",
    sub: "Hours Completed",
    icon: Clock,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export default function AttendanceStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-500">{label}</p>
            <p className="text-xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
