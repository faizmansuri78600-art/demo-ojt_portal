const data = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 65 },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 60 },
  { label: "Sat", value: 90 },
  { label: "Sun", value: 45 },
];

export default function SalesChart() {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Weekly Overview</h3>
        <select className="text-sm border border-gray-200 rounded-md px-2 py-1 text-gray-600">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      <div className="flex items-end justify-between h-48 gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition-colors"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-2">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
