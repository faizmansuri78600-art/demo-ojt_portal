export default function StatCard({
  icon: Icon,
  label,
  value,
  growth,
  bg,
  color
}) {
  return (
    <div className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">

      {/* ICON */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${bg} ${color}`}
      >
        <Icon size={21} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">

        {/* LABEL */}
        <p className="text-sm text-slate-500">
          {label}
        </p>

        {/* VALUE + MINI GRAPH */}
        <div className="flex items-end justify-between">

          <div>
            <p className="text-2xl font-bold my-1 text-slate-800">
              {value}
            </p>

            {/* Growth text */}
            {growth && growth !== "From database" && (
              <p className="text-xs font-medium text-green-600">
                {growth}
              </p>
            )}
          </div>

          {/* MINI AREA GRAPH */}
          <svg
            width="62"
            height="38"
            viewBox="0 0 62 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${color} shrink-0`}
          >

            {/* Filled area */}
            <path
              d="
                M1 31
                L8 27
                L15 29
                L22 22
                L29 24
                L36 17
                L43 20
                L50 11
                L56 14
                L61 4
                L61 38
                L1 38
                Z
              "
              fill="currentColor"
              fillOpacity="0.10"
            />

            {/* Graph line */}
            <path
              d="
                M1 31
                L8 27
                L15 29
                L22 22
                L29 24
                L36 17
                L43 20
                L50 11
                L56 14
                L61 4
              "
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

          </svg>

        </div>

      </div>
    </div>
  );
}