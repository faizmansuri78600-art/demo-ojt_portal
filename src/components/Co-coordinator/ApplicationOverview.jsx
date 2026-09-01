import { applicationOverview } from "../../mock/Co-coordinator";

export default function ApplicationOverview() {
  const maxValue = Math.max(
    ...applicationOverview.map((item) => item.applications)
  );

  const latest =
    applicationOverview[applicationOverview.length - 1];

  const previous =
    applicationOverview[applicationOverview.length - 2];

  const increase =
    latest.applications - previous.applications;

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      {/* HEADER SUMMARY */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
          gap: "15px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "7px",
            }}
          >
            <strong
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              {latest.applications}
            </strong>

            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              applications
            </span>
          </div>

          <div
            style={{
              marginTop: "4px",
              fontSize: "10px",
              color: "#10b981",
              fontWeight: 700,
            }}
          >
            ↑ {increase} from previous period
          </div>
        </div>

        <div
          style={{
            padding: "7px 11px",
            borderRadius: "8px",
            backgroundColor: "#eff6ff",
            color: "#2563eb",
            fontSize: "10px",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          May 2025
        </div>
      </div>

      {/* CHART */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "155px",
          boxSizing: "border-box",
          paddingLeft: "34px",
        }}
      >
        {/* GRID LINES */}
        {[0, 20, 40, 60, 80].map((value) => {
          const position = `${100 - (value / 80) * 100}%`;

          return (
            <div
              key={value}
              style={{
                position: "absolute",
                left: "34px",
                right: "0",
                top: position,
                borderTop: "1px dashed #e2e8f0",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "-28px",
                  top: "-6px",
                  fontSize: "8px",
                  color: "#94a3b8",
                }}
              >
                {value}
              </span>
            </div>
          );
        })}

        {/* BARS */}
        <div
          style={{
            position: "absolute",
            left: "42px",
            right: "5px",
            top: "0",
            bottom: "24px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {applicationOverview.map((item, index) => {
            const height =
              (item.applications / 80) * 100;

            const isLatest =
              index === applicationOverview.length - 1;

            return (
              <div
                key={item.month}
                style={{
                  height: "100%",
                  flex: "1 1 0",
                  minWidth: "0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {/* VALUE */}
                <span
                  style={{
                    marginBottom: "5px",
                    fontSize: "8px",
                    fontWeight: 700,
                    color: isLatest
                      ? "#1d4ed8"
                      : "#94a3b8",
                  }}
                >
                  {item.applications}
                </span>

                {/* BAR */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: "30px",
                    height: `${height}%`,
                    minHeight: "8px",
                    borderRadius: "6px 6px 3px 3px",
                    backgroundColor: isLatest
                      ? "#2563eb"
                      : "#93c5fd",
                    transition:
                      "height 0.3s ease",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* X AXIS LABELS */}
        <div
          style={{
            position: "absolute",
            left: "42px",
            right: "5px",
            bottom: "0",
            height: "18px",
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {applicationOverview.map((item) => (
            <span
              key={item.month}
              style={{
                flex: "1 1 0",
                textAlign: "center",
                fontSize: "8px",
                color: "#94a3b8",
                whiteSpace: "nowrap",
              }}
            >
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}