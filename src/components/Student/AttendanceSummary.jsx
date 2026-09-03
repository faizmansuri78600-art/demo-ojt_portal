const SUMMARY = [
  {
    label: "Present Days",
    value: 45,
    color: "#22c55e",
  },
  {
    label: "Absent Days",
    value: 3,
    color: "#ef4444",
  },
  {
    label: "Half Days",
    value: 2,
    color: "#f59e0b",
  },
  {
    label: "Total Days",
    value: 48,
    color: "#94a3b8",
    isTotal: true,
  },
];

const LAST_7_DAYS = [
  { day: "Mon", short: "19", hours: 8 },
  { day: "Tue", short: "20", hours: 4 },
  { day: "Wed", short: "21", hours: 8 },
  { day: "Thu", short: "22", hours: 8 },
  { day: "Fri", short: "23", hours: 8 },
  { day: "Sat", short: "24", hours: 8 },
  { day: "Sun", short: "25", hours: 0 },
];

function Donut({ percent = 93.8 }) {
  const radius = 39;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percent / 100) * circumference;

  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full -rotate-90"
      >
        {/* Background */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="9"
        />

        {/* Green progress */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#22c55e"
          strokeWidth="9"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center text */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[15px] font-bold leading-none text-slate-800">
          {percent}%
        </span>

        <span className="mt-1 text-[7px] leading-none text-slate-400">
          Present
        </span>
      </div>
    </div>
  );
}

export default function AttendanceSummary() {
  const maxHours = 8;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-700">
        Attendance Summary
      </h3>

      {/* Donut + Legend */}
      <div className="mb-5 flex items-center gap-4">
        <Donut percent={93.8} />

        <ul className="flex-1 space-y-1.5 text-xs">
          {SUMMARY.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="text-slate-500">
                {item.label}
              </span>

              <span className="ml-auto font-semibold text-slate-700">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Last 7 Days */}
      <h4 className="mb-2 text-xs font-semibold text-slate-500">
        Last 7 Days Attendance
      </h4>

      <div className="flex h-28 items-end justify-between gap-2">
        {LAST_7_DAYS.map(({ day, short, hours }) => (
          <div
            key={day}
            className="flex flex-1 flex-col items-center gap-1"
          >
            <div className="flex h-20 w-full items-end justify-center rounded-md bg-slate-50">
              <div
                className="w-4 rounded-t-sm bg-green-500"
                style={{
                  height: `${Math.max(
                    (hours / maxHours) * 100,
                    4
                  )}%`,
                }}
                title={`${hours}h`}
              />
            </div>

            <span className="text-[10px] text-slate-400">
              {day}
            </span>

            <span className="text-[10px] text-slate-300">
              {short}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
