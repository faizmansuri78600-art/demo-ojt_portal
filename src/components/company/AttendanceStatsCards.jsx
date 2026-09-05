import { Users, CheckCircle2, CalendarX, Clock } from "lucide-react";
import { useAttendance } from "./AttendanceContext";

export default function AttendanceStatsCards() {
  const { totals } = useAttendance();

  const cards = [
    { key: "total", label: "Total Students", value: totals.totalStudents, sub: "Interns", icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { key: "present", label: "Present", value: totals.present, sub: `${totals.presentPct.toFixed(2)}%`, subColor: "text-emerald-600", icon: CheckCircle2, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { key: "absent", label: "Absent", value: totals.absent, sub: `${totals.absentPct.toFixed(2)}%`, subColor: "text-orange-600", icon: CalendarX, iconBg: "bg-orange-50", iconColor: "text-orange-600" },
    { key: "late", label: "Late", value: totals.late, sub: `${totals.latePct.toFixed(2)}%`, subColor: "text-violet-600", icon: Clock, iconBg: "bg-violet-50", iconColor: "text-violet-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, value, sub, subColor, icon: Icon, iconBg, iconColor }) => (
        <div key={key} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
            <Icon size={20} className={iconColor} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="text-xl font-semibold text-slate-900">{value}</p>
            <p className={`text-xs font-medium ${subColor ?? "text-slate-400"}`}>{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
