import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Demo attendance data
// Later this will come from your backend/database.
const STATUS_BY_DAY = {
  1: "present",
  2: "present",
  3: "present",
  4: "present",
  5: "present",
  6: "present",
  7: "present",
  8: "present",
  9: "present",
  10: "present",
  11: "present",
  12: "present",
  13: "present",
  14: "present",
  15: "present",
  16: "absent",
  17: "present",
  18: "present",
  19: "present",
  20: "halfday",
  21: "present",
  22: "present",
  23: "present",
  25: "present",
  26: "present",
  27: "present",
  28: "present",
  29: "present",
  30: "present",
  31: "present",
};

const STATUS_STYLES = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-600",
  halfday: "bg-amber-100 text-amber-700",
  today: "bg-blue-600 text-white",
  none: "text-slate-300",
};

function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];

  // Previous month's dates
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: prevMonthDays - i,
      currentMonth: false,
    });
  }

  // Current month's dates
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      currentMonth: true,
    });
  }

  // Next month's dates
  let nextMonthDay = 1;

  while (cells.length % 7 !== 0) {
    cells.push({
      day: nextMonthDay,
      currentMonth: false,
    });

    nextMonthDay++;
  }

  return cells;
}

export default function AttendanceCalendar() {

  // Store the current date in state
  const [currentDate, setCurrentDate] = useState(new Date());

  /*
    Update the date every 30 seconds.

    This is important because new Date() alone
    does NOT make React re-render at midnight.
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /*
    Calendar cursor.

    Initially opens on the current month.
  */
  const [cursor, setCursor] = useState(
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )
  );

  /*
    If the actual date changes to a new month while
    the user is viewing the current month, move the
    calendar to the new current month automatically.
  */
  useEffect(() => {
    setCursor((prev) => {
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Only automatically move if the user was already
      // viewing the previous current month.
      const wasCurrentMonth =
        prev.getMonth() === currentMonth &&
        prev.getFullYear() === currentYear;

      if (wasCurrentMonth) {
        return new Date(currentYear, currentMonth, 1);
      }

      return prev;
    });
  }, [
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear(),
  ]);

  const cells = useMemo(
    () =>
      getMonthGrid(
        cursor.getFullYear(),
        cursor.getMonth()
      ),
    [cursor]
  );

  const monthLabel = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (delta) => {
    setCursor(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + delta,
          1
        )
    );
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">

        <h3 className="text-sm font-semibold text-slate-700">
          {monthLabel}
        </h3>

        <div className="flex items-center gap-1">

          {/* Previous Month */}
          <button
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Next Month */}
          <button
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

        </div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-y-1 text-center">

        {/* Weekdays */}
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="text-[11px] font-medium text-slate-400"
          >
            {day}
          </span>
        ))}

        {/* Calendar Days */}
        {cells.map((cell, idx) => {

          // Dates belonging to previous/next month
          if (!cell.currentMonth) {
            return (
              <span
                key={idx}
                className="py-1.5 text-xs text-slate-300"
              >
                {cell.day}
              </span>
            );
          }

          /*
            Check if this is today's date.

            We compare:
            - day
            - month
            - year
          */
          const isToday =
            cell.day === currentDate.getDate() &&
            cursor.getMonth() === currentDate.getMonth() &&
            cursor.getFullYear() === currentDate.getFullYear();

          /*
            Today gets blue.

            Other dates use their attendance status.
          */
          const status = isToday
            ? "today"
            : STATUS_BY_DAY[cell.day] || "none";

          return (
            <div
              key={idx}
              className="flex items-center justify-center py-0.5"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  STATUS_STYLES[status]
                }`}
              >
                {cell.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">

        <Legend
          dotClass="bg-green-500"
          label="Present"
        />

        <Legend
          dotClass="bg-red-500"
          label="Absent"
        />

        <Legend
          dotClass="bg-amber-500"
          label="Half Day"
        />

        <Legend
          dotClass="bg-blue-600"
          label="Today"
        />

      </div>
    </div>
  );
}

function Legend({ dotClass, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`h-2 w-2 rounded-full ${dotClass}`}
      />
      {label}
    </span>
  );
}