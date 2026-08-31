import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Computer Science', value: 18, color: '#1E5EFF' },
  { name: 'Information Technology', value: 12, color: '#22C55E' },
  { name: 'Electronics', value: 8, color: '#F59E0B' },
  { name: 'Mechanical', value: 6, color: '#A855F7' },
  { name: 'Other', value: 4, color: '#94A3B8' },
];

export default function DepartmentChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">

      <h3 className="text-sm font-bold text-slate-800 mb-2">
        Applications by Department
      </h3>

      <div className="relative flex justify-center">

        <PieChart width={190} height={190}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={82}
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-xl font-bold text-slate-800">
            {total}
          </p>

          <p className="text-xs text-slate-400">
            Total
          </p>
        </div>

      </div>

      <ul className="mt-1 text-[10px]">
        {data.map((d) => (
          <li
            key={d.name}
            className="flex items-center gap-2 mb-1 text-slate-600"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: d.color }}
            />

            {d.name} ({((d.value / total) * 100).toFixed(1)}%)
          </li>
        ))}
      </ul>

    </div>
  );
}