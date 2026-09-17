export default function Statscard({ title, value, change, positive = true, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between border border-gray-100">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        <span
          className={`text-xs font-medium mt-2 inline-block ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {positive ? "▲" : "▼"} {change}
        </span>
      </div>
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 text-xl">
        {icon}
      </div>
    </div>
  );
}
