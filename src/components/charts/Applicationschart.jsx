import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '01 Jul', applications: 4 },
  { date: '05 Jul', applications: 9 },
  { date: '10 Jul', applications: 14 },
  { date: '15 Jul', applications: 28 },
  { date: '20 Jul', applications: 22 },
  { date: '25 Jul', applications: 34 },
  { date: '31 Jul', applications: 48 },
];

export default function ApplicationsChart() {
  return (
    // h-full + flex flex-col instead of a fixed h-[235px] — lets this card
    // stretch to match DepartmentChart's height (grid rows stretch by default)
    <div className="bg-white rounded-2xl p-5 shadow-sm h-full flex flex-col">

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-800">
          Applications Overview
        </h3>

        <select className="text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-2 py-1">
          <option>This Month</option>
        </select>
      </div>

      {/* flex-1 + min-h-0: this wrapper takes all remaining space in the card,
          and ResponsiveContainer height="100%" fills exactly that */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="applications"
              stroke="#1E5EFF"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#1E5EFF' }}
              activeDot={{ r: 5, fill: '#1E5EFF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}