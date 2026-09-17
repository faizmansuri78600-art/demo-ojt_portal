import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAttendance } from "./AttendanceContext";
import { LegendDot } from "./AttendanceStatusIcons";

const COLORS = { present: "#22c55e", absent: "#ef4444", late: "#f59e0b", holiday: "#a855f7" };

export default function AttendanceSummaryChart() {
  const { totals } = useAttendance();

  const data = [
    { name: "Present", value: totals.present, color: COLORS.present, pct: totals.presentPct },
    { name: "Absent", value: totals.absent, color: COLORS.absent, pct: totals.absentPct },
    { name: "Late", value: totals.late, color: COLORS.late, pct: totals.latePct },
    { name: "Holiday", value: totals.holiday, color: COLORS.holiday, pct: totals.holidayPct },
  ];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Attendance Summary</h3>

      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={42} outerRadius={58} paddingAngle={2} stroke="none">
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-slate-900">{totals.total}</span>
            <span className="text-[10px] text-slate-400">Total Days</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <LegendDot color={d.color} label={d.name} />
              <span className="font-medium text-slate-700">{d.pct.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
