import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const companyId = 'C001';

export default function ApplicationsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApplicationTrend = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/companies/${companyId}/dashboard/application-trend`
        );

        const result = await response.json();

        if (result.success) {
          const formattedData = result.trend.map((item) => ({
            date: item.date,
            applications: item.applications
          }));

          setData(formattedData);
        }
      } catch (error) {
        console.error(
          'Failed to fetch application trend:',
          error
        );
      }
    };

    fetchApplicationTrend();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm h-full flex flex-col">

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-800">
          Applications Overview
        </h3>

        <select className="text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-2 py-1">
          <option>This Month</option>
        </select>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -10,
              bottom: 0
            }}
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
              domain={[0, 6]}
              ticks={[0, 1, 2, 3, 4, 5, 6]}
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
              dot={{
                r: 3.5,
                fill: '#1E5EFF'
              }}
              activeDot={{
                r: 5,
                fill: '#1E5EFF'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}