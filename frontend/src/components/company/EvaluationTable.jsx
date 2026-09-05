import React from "react";
import { Eye, Pencil } from "lucide-react";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

/**
 * EvaluationTable
 * Props:
 *  - students: array of student evaluation rows
 *  - activeTab: "list" | "criteria"
 *  - onTabChange: (tab) => void
 *  - selectedId: currently selected student id (row highlight)
 *  - onSelect: (student) => void
 *  - page, totalEntries, perPage, onPageChange, onPerPageChange
 */
const EvaluationTable = ({
  students = [],
  activeTab,
  onTabChange,
  selectedId,
  onSelect,
  page = 1,
  totalPages = 1,
  totalEntries = 0,
  perPage = 10,
  onPageChange,
  onPerPageChange,
}) => {
  const start = students.length ? (page - 1) * perPage + 1 : 0;
  const end = start + students.length - 1;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-100 px-4">
        <button
          onClick={() => onTabChange("list")}
          className={`py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === "list"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Evaluation List
        </button>
        <button
          onClick={() => onTabChange("criteria")}
          className={`py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === "criteria"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Evaluation Criteria
        </button>
      </div>

      {activeTab === "list" ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">Student Name</th>
                  <th className="px-4 py-3 font-medium">Internship / Opportunity</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Evaluated On</th>
                  <th className="px-4 py-3 font-medium">Overall Rating</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => onSelect(s)}
                    className={`border-t border-gray-50 cursor-pointer transition-colors ${
                      selectedId === s.id ? "bg-blue-50/60" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-500">{s.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{s.opportunity}</td>
                    <td className="px-4 py-3 text-gray-600">{s.department}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.evaluatedOn || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {s.overallRating ? (
                        <StarRating value={s.overallRating} showValue />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-gray-400">
                        <button
                          title="View"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(s);
                          }}
                          className="hover:text-blue-500"
                        >
                          <Eye size={15} />
                        </button>
                        <button title="Edit" className="hover:text-blue-500">
                          <Pencil size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-sm text-gray-400"
                    >
                      No students match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing {start} to {end < 0 ? 0 : end} of {totalEntries} entries
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-400 disabled:opacity-40"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`text-xs w-7 h-7 rounded ${
                    p === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-400 disabled:opacity-40"
              >
                &gt;
              </button>
            </div>
            <select
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-500"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n} per page
                </option>
              ))}
            </select>
          </div>

          <p className="px-4 pb-4 text-[11px] text-gray-400 italic">
            Evaluations are based on performance, skills, behavior and overall
            contribution during the internship.
          </p>
        </>
      ) : (
        <EvaluationCriteriaTab />
      )}
    </div>
  );
};

const CRITERIA_LIST = [
  { name: "Technical Skills", weight: "25%" },
  { name: "Communication", weight: "20%" },
  { name: "Teamwork", weight: "20%" },
  { name: "Punctuality", weight: "15%" },
  { name: "Problem Solving", weight: "20%" },
];

const EvaluationCriteriaTab = () => (
  <div className="p-4">
    <p className="text-sm text-gray-500 mb-4">
      Students are scored against the following criteria on a 5-star scale.
    </p>
    <div className="space-y-2">
      {CRITERIA_LIST.map((c) => (
        <div
          key={c.name}
          className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
        >
          <span className="text-sm font-medium text-gray-700">{c.name}</span>
          <span className="text-xs text-gray-400">Weight: {c.weight}</span>
        </div>
      ))}
    </div>
  </div>
);

export default EvaluationTable;
