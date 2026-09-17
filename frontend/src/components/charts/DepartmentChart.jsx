import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

const companyId = 'C001';

const COLORS = [
  '#1E5EFF',
  '#22C55E',
  '#F59E0B',
  '#A855F7',
  '#94A3B8'
];

export default function DepartmentChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDepartmentStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/companies/${companyId}/dashboard/department-stats`
        );

        const result = await response.json();

        if (result.success) {
          const formattedData = result.departments.map(
            (department, index) => ({
              name: department.name,
              value: department.value,
              color: COLORS[index % COLORS.length]
            })
          );

          setData(formattedData);
        }
      } catch (error) {
        console.error(
          'Failed to fetch department statistics:',
          error
        );
      }
    };

    fetchDepartmentStats();
  }, []);

  const total = data.reduce(
    (sum, department) => sum + department.value,
    0
  );

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

            {d.name} (
            {total > 0
              ? ((d.value / total) * 100).toFixed(1)
              : '0.0'}
            %)
          </li>
        ))}
      </ul>

    </div>
  );
}