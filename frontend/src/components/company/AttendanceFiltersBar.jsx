import { ChevronDown, Calendar, RotateCcw } from "lucide-react";
import { useAttendance } from "./AttendanceContext";
import { MONTH_OPTIONS } from "./AttendanceData";

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex min-w-[170px] flex-1 flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

const DEFAULT_FILTERS = {
  internship: "All",
  department: "All Departments",
  month: MONTH_OPTIONS[0],
};

export default function AttendanceFiltersBar() {
  const { filters, setFilters } = useAttendance();

  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <FilterSelect
        label="Internship / Opportunity"
        value={filters.internship}
        onChange={(v) => update("internship", v)}
        options={["All", "Web Development Intern", "Data Science Intern", "UI/UX Design Intern", "Cybersecurity Intern", "Android Developer Intern", "Data Analyst Intern", "Digital Marketing Intern"]}
      />
      <FilterSelect
        label="Department"
        value={filters.department}
        onChange={(v) => update("department", v)}
        options={["All Departments", "Computer Science", "Data Science", "Information Tech.", "Marketing"]}
      />
      <FilterSelect
        label="Month"
        value={filters.month}
        onChange={(v) => update("month", v)}
        options={MONTH_OPTIONS}
      />

      <div className="flex min-w-[210px] flex-1 flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-500">Date Range</label>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
          <Calendar size={15} className="text-slate-400" />
          Full month of {filters.month}
        </div>
      </div>

      <button
        onClick={() => setFilters(DEFAULT_FILTERS)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
      >
        <RotateCcw size={15} />
        Reset
      </button>
    </div>
  );
}