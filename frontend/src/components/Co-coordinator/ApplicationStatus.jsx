import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { applicationStatus } from "../../mock/Co-coordinator";

const statusColors = {
  info: "#2563eb",
  warning: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
};

export default function ApplicationStatus() {
  const data = applicationStatus.map((item) => ({
    ...item,
    color:
      statusColors[item.status] || "#64748b",
  }));

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* =====================================================
          CHART + LEGEND
      ====================================================== */}
      <div
        style={{
          width: "100%",
          minWidth: 0,
          display: "grid",
          gridTemplateColumns:
            "minmax(180px, 1fr) minmax(145px, 0.85fr)",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* DONUT */}
        <div
          style={{
            width: "100%",
            minWidth: 0,
            height: "245px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="78%"
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {data.map((item) => (
                  <Cell
                    key={item.label}
                    fill={item.color}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  boxShadow:
                    "0 5px 18px rgba(15, 23, 42, 0.08)",
                  fontSize: "12px",
                }}
              />

              {/* CENTER TOTAL */}
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0f172a"
                fontSize="25"
                fontWeight="800"
              >
                {total}
              </text>

              <text
                x="50%"
                y="59%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94a3b8"
                fontSize="10"
              >
                Applications
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS LIST */}
        <div
          style={{
            width: "100%",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          {data.map((item) => (
            <div
              key={item.label}
              style={{
                width: "100%",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      minWidth: "9px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                    }}
                  />

                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "11px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                <strong
                  style={{
                    flexShrink: 0,
                    color: "#334155",
                    fontSize: "12px",
                    fontWeight: 750,
                  }}
                >
                  {item.value}
                </strong>
              </div>

              {/* Progress */}
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  marginTop: "7px",
                  overflow: "hidden",
                  borderRadius: "999px",
                  backgroundColor: "#f1f5f9",
                }}
              >
                <div
                  style={{
                    width: `${item.percentage}%`,
                    height: "100%",
                    borderRadius: "999px",
                    backgroundColor: item.color,
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "4px",
                  color: "#94a3b8",
                  fontSize: "9px",
                }}
              >
                {item.percentage}% of applications
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}