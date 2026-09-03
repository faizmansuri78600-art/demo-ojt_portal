import React, { useState, useMemo } from "react";
import { Icon, EyeIcon, DotsIcon } from "./facultyIcons";
import StatusBadge from "./StatusBadge";

const tabs = [
  { id: "all", label: "All Reports" },
  { id: "diary", label: "Weekly Diaries" },
  { id: "returned", label: "Returned" },
  { id: "drafts", label: "Drafts" },
];

const ReportsTable = ({ reports, onView, selectedReportId, totalCount = 18 }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "diary"
          ? report.reportType === "Weekly Diary"
          : activeTab === "returned"
          ? report.status === "Returned"
          : false; // "drafts" — no dummy data for this tab yet
      return matchesSearch && matchesTab;
    });
  }, [reports, searchTerm, activeTab]);

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
              {tab.label}
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
              <th className="py-3 px-4 font-medium">Report Type</th>
              <th className="py-3 px-4 font-medium">Week / Date</th>
              <th className="py-3 px-4 font-medium">Submitted On</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr
                key={report.id}
                className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 ${
                  selectedReportId === report.id ? "bg-blue-50/50" : ""
                }`}
              >
                <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                      {report.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{report.name}</p>
                      <p className="text-xs text-gray-500">{report.company}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                    {report.reportType}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {report.week && <p className="font-medium text-gray-700">{report.week}</p>}
                  <p className="text-xs text-gray-500">{report.dateRange}</p>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  <p>{report.submittedDate}</p>
                  <p className="text-xs text-gray-400">{report.submittedTime}</p>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={report.status} />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(report)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      aria-label={`View report from ${report.name}`}
                    >
                      <EyeIcon />
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
          </tbody>
        </table>
      </div>

      {/* Showing count (pagination removed) */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing 1 to {filteredReports.length} of {totalCount} reports
        </p>
      </div>
    </div>
  );
};

export default ReportsTable;