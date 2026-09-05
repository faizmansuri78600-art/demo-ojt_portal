import React from "react";

// Pure CSS donut chart using conic-gradient — no chart library needed
const ReportsChart = ({ data }) => {
  const { total, segments } = data;

  let cumulative = 0;
  const gradientParts = segments.map((seg) => {
    const start = cumulative;
    cumulative += seg.percent;
    return `${seg.color} ${start}% ${cumulative}%`;
  });
  const gradient = `conic-gradient(${gradientParts.join(", ")})`;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 text-lg mb-4">Reports Status</h2>
      <div className="flex items-center gap-6">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center shrink-0"
          style={{ background: gradient }}
        >
          <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-900">{total}</span>
            <span className="text-[10px] text-gray-500">Total Reports</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {segments.map((seg) => (
            <li key={seg.label} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-gray-700">
                {seg.label} {seg.value} ({seg.percent}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportsChart;