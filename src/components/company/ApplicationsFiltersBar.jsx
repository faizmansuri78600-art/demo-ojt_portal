import React from "react";
import { Search, Calendar, RotateCcw } from "lucide-react";

/**
 * ApplicationsFiltersBar
 * Props:
 *  - filters: { search, opportunity, department, status, appliedOn }
 *  - onChange: (key, value) => void
 *  - onReset: () => void
 *  - opportunities: string[]
 *  - departments: string[]
 *  - statuses: string[]
 */
const ApplicationsFiltersBar = ({
  filters,
  onChange,
  onReset,
  opportunities = [],
  departments = [],
  statuses = [],
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 py-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          placeholder="Search by student name, skills, college..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />
      </div>

      <select
        value={filters.opportunity}
        onChange={(e) => onChange("opportunity", e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option>All Opportunities</option>
        {opportunities.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>

      <select
        value={filters.department}
        onChange={(e) => onChange("department", e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option>All Departments</option>
        {departments.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option>All Status</option>
        {statuses.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <div className="relative">
        <Calendar
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="date"
          value={filters.appliedOn}
          onChange={(e) => onChange("appliedOn", e.target.value)}
          className="text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-2 whitespace-nowrap"
      >
        <RotateCcw size={14} />
        Reset
      </button>
    </div>
  );
};

export default ApplicationsFiltersBar;
