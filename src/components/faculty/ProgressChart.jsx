import React from "react";

// Pure SVG line chart — no chart library needed
const ProgressChart = ({ data }) => {
  const width = 460;
  const height = 200;
  const padding = 30;

  const maxValue = 100;
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / maxValue) * (height - padding * 2);
    return { x, y, ...d };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 text-lg mb-4">OJT Progress Overview</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Horizontal grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = height - padding - (val / maxValue) * (height - padding * 2);
          return (
            <g key={val}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text x={0} y={y + 4} fontSize="10" fill="#9ca3af">
                {val}%
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <polygon
          points={`${padding},${height - padding} ${polylinePoints} ${width - padding},${height - padding}`}
          fill="#3b82f6"
          opacity="0.08"
        />

        {/* Line */}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />

        {/* Points + labels */}
        {points.map((p) => (
          <g key={p.month}>
            <circle cx={p.x} cy={p.y} r="4" fill="#3b82f6" />
            <text x={p.x} y={p.y - 10} fontSize="10" fill="#374151" textAnchor="middle">
              {p.value}%
            </text>
            <text x={p.x} y={height - 8} fontSize="10" fill="#9ca3af" textAnchor="middle">
              {p.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
export default ProgressChart;