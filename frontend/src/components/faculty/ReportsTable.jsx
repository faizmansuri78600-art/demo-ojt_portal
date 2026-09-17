import React, { useState, useMemo, useEffect } from "react";
import { Icon, EyeIcon, DotsIcon } from "./facultyIcons";
import StatusBadge from "./StatusBadge";

const tabs = [
  { id: "all", label: "All Reports" },
  { id: "diary", label: "Weekly Diaries" },
  { id: "returned", label: "Returned" },
  { id: "drafts", label: "Drafts" },
];

const ReportsTable = ({
  reports,
  onView,
  onReview,
  selectedReportId,
  totalCount,
  selectedFilter,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const filterToTab = {
      "All Reports": "all",
      "Weekly Diaries": "diary",
      "Returned": "returned",
      "Drafts": "drafts",
    };

    if (selectedFilter && filterToTab[selectedFilter]) {
      setActiveTab(filterToTab[selectedFilter]);
    }
  }, [selectedFilter]);

  const filteredReports = useMemo(() => {
  return (reports || []).filter((report) => {
    const matchesSearch = (report.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesTab = true;

    if (activeTab === "all") {
      matchesTab = true;
    }

    if (activeTab === "diary") {
      matchesTab = report.reportType === "Weekly Diary";
    }

    if (activeTab === "returned") {
      matchesTab =
        report.status === "Returned" ||
        report.status === "Revision Requested";
    }

    if (activeTab === "drafts") {
      matchesTab = report.status === "Draft";
    }

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
  type="button"
  onClick={() => {
    console.log("VIEW CLICKED:", report);
    onView(report);
  }}
  className="relative z-50 w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
  aria-label={`View report from ${report.name}`}
>
  <EyeIcon className="w-4 h-4 pointer-events-none" />
</button>
                    <div className="relative">
  <button
    type="button"
    onClick={() =>
      setOpenMenuId(
        openMenuId === report.id ? null : report.id
      )
    }
    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
    aria-label="More actions"
  >
    <DotsIcon />
  </button>

  {openMenuId === report.id && (
    <div className="absolute right-0 top-9 z-50 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
      <button
        type="button"
        onClick={() => {
          onView(report);
          setOpenMenuId(null);
        }}
        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        View Report
      </button>

      <button
  type="button"
  onClick={() => {
    onReview(report);
    setOpenMenuId(null);
  }}
  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
>
  Review Report
</button>
    </div>
  )}
</div>
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