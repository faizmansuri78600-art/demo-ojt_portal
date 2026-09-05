import React, { useState, useMemo } from "react";
import { Icon, DotsIcon } from "./facultyIcons";

const tabs = [
  { id: "pending", label: "Pending Evaluation" },
  { id: "evaluated", label: "Evaluated" },
  { id: "all", label: "All Students" },
];

const EvaluationTable = ({ students, onEvaluate }) => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");

  const counts = useMemo(
    () => ({
      pending: students.filter((s) => s.status === "Pending").length,
      evaluated: students.filter((s) => s.status === "Evaluated").length,
      all: students.length,
    }),
    [students]
  );

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === "all" ? true : activeTab === "pending" ? s.status === "Pending" : s.status === "Evaluated";
      return matchesSearch && matchesTab;
    });
  }, [students, activeTab, searchTerm]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Tabs + search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 border-b border-gray-100">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "text-blue-700 border-blue-700"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab.label} ({counts[tab.id]})
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="search" className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name..."
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100 bg-gray-50">
              <th className="py-3 px-4 font-medium">#</th>
              <th className="py-3 px-4 font-medium">Student</th>
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium">OJT Role</th>
              <th className="py-3 px-4 font-medium">Evaluation Progress</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, index) => (
              <tr key={student.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                      {student.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-800 font-medium">{student.company}</p>
                  <p className="text-xs text-gray-500">{student.location}</p>
                </td>
                <td className="py-3 px-4 text-gray-600">{student.role}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 w-32">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${student.progressColor}`} style={{ width: `${student.progress}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-8">{student.progress}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      student.status === "Pending" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEvaluate(student)}
                      className="border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-100 whitespace-nowrap"
                    >
                      Evaluate
                    </button>
                    <button
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      aria-label="More actions"
                    >
                      <DotsIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                  No students in this tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing 1 to {filtered.length} of {filtered.length} {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}
        </p>
      </div>
    </div>
  );
};
export default EvaluationTable;