import React from "react";

const schedule = [
  { day: "Monday", hours: "09:30 AM - 06:00 PM" },
  { day: "Tuesday", hours: "09:30 AM - 06:00 PM" },
  { day: "Wednesday", hours: "09:30 AM - 06:00 PM" },
  { day: "Thursday", hours: "09:30 AM - 06:00 PM" },
  { day: "Friday", hours: "09:30 AM - 06:00 PM" },
  { day: "Saturday & Sunday", hours: "Weekly Off" },
];

export default function WorkScheduleCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Work Schedule</h3>
      <div className="space-y-1">
        <div className="grid grid-cols-2 text-[11px] text-slate-400 font-medium px-1 pb-2">
          <span>Day</span>
          <span>Working Hours</span>
        </div>
        {schedule.map((s) => (
          <div
            key={s.day}
            className="grid grid-cols-2 items-center px-1 py-2 border-t border-slate-100 text-xs"
          >
            <span className="text-slate-700 font-medium">{s.day}</span>
            <span className={s.hours === "Weekly Off" ? "text-rose-500 font-semibold" : "text-slate-500"}>
              {s.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
