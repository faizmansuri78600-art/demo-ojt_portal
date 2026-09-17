import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LegendDot } from "./AttendanceStatusIcons";
import { useAttendance } from "./AttendanceContext";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const dotColor = {
  present: "#22c55e",
  absent: "#ef4444",
  late: "#f59e0b",
  holiday: "#a855f7",
};

function getCalendarData(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const mondayFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const leading = [];
  for (let i = mondayFirstDay - 1; i >= 0; i--) leading.push(previousMonthDays - i);

  const days = [];
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  const trailing = [];
  while ((leading.length + days.length + trailing.length) % 7 !== 0) trailing.push(trailing.length + 1);

  return { leading, days, trailing };
}

// For a company/faculty view (looking at everyone), pick whichever status is
// most common that day so the dot summarizes the group.
function dominantStatus(dayRecord) {
  if (!dayRecord) return undefined;
  const counts = {};
  Object.values(dayRecord).forEach((entry) => {
    const s = entry?.status;
    if (s) counts[s] = (counts[s] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
}

export default function AttendanceCalendarWidget() {
  const { records } = useAttendance();
  const [today, setToday] = useState(new Date());
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const viewingCurrentMonth = cursor.getMonth() === today.getMonth() && cursor.getFullYear() === today.getFullYear();
    if (viewingCurrentMonth) setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
  }, [today.getDate(), today.getMonth(), today.getFullYear()]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const { leading, days, trailing } = getCalendarData(year, month);

  const monthKeyForCursor = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthRecords = records[monthKeyForCursor] || {};

  const statusMap = useMemo(() => {
    const map = {};
    days.forEach((day) => {
      const dayRecord = monthRecords[day];
      if (!dayRecord) return;
      map[day] = dominantStatus(dayRecord);
    });
    return map;
  }, [monthRecords, days]);

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Attendance Calendar</h3>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
          aria-label="Previous month"
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium text-slate-700">{monthLabel}</span>
        <button
          onClick={() => setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
          aria-label="Next month"
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-2 text-center text-[11px] text-slate-400">
        {WEEKDAYS.map((d) => <span key={d}>{d}</span>)}

        {leading.map((d, index) => (
          <span key={`lead-${index}`} className="py-1 text-slate-300">{d}</span>
        ))}

        {days.map((d) => {
          const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const status = statusMap[d];
          return (
            <div key={d} className="flex items-center justify-center py-0.5">
              <span
                className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  isToday ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {d}
                {status && !isToday && (
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full" style={{ backgroundColor: dotColor[status] }} />
                )}
              </span>
            </div>
          );
        })}

        {trailing.map((d, index) => (
          <span key={`trail-${index}`} className="py-1 text-slate-300">{d}</span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-slate-100 pt-3">
        <LegendDot color="#22c55e" label="Present" />
        <LegendDot color="#ef4444" label="Absent" />
        <LegendDot color="#f59e0b" label="Late" />
        <LegendDot color="#a855f7" label="Holiday" />
      </div>
    </div>
  );
}