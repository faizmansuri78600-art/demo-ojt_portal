import React, { useState, useMemo } from "react";
import { Icon, EyeIcon, DotsIcon } from "./facultyIcons";
import DiaryStatusBadge from "./DiaryStatusBadge";

const DiaryTable = ({ diaries, onView, selectedDiaryId, onApprove, onRequestRevision }) => {
  const [activeTab, setActiveTab] = useState("Pending Review");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const counts = useMemo(
    () => ({
      "Pending Review": diaries.filter((d) => d.status === "Pending Review").length,
      Approved: diaries.filter((d) => d.status === "Approved").length,
      "Revision Requested": diaries.filter((d) => d.status === "Revision Requested").length,
    }),
    [diaries]
  );

  const tabs = [
    { id: "Pending Review", label: `Pending (${counts["Pending Review"]})` },
    { id: "Approved", label: `Approved (${counts["Approved"]})` },
    { id: "Revision Requested", label: `Revision Requested (${counts["Revision Requested"]})` },
  ];

  const filteredDiaries = useMemo(() => {
    return diaries.filter(
      (d) => d.status === activeTab && d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [diaries, activeTab, searchTerm]);

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
              <th className="py-3 px-4 font-medium">Week / Date</th>
              <th className="py-3 px-4 font-medium">Submitted On</th>
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDiaries.map((diary, index) => (
              <tr
                key={diary.id}
                className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 ${
                  selectedDiaryId === diary.id ? "bg-blue-50/50" : ""
                }`}
              >
                <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                      {diary.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{diary.name}</p>
                      <p className="text-xs text-gray-500">{diary.company}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  <p className="font-medium text-gray-700">{diary.week}</p>
                  <p className="text-xs text-gray-500">{diary.dateRange}</p>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  <p>{diary.submittedDate}</p>
                  <p className="text-xs text-gray-400">{diary.submittedTime}</p>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  <p className="font-medium text-gray-700">{diary.company}</p>
                  <p className="text-xs text-gray-500">{diary.location}</p>
                </td>
                <td className="py-3 px-4">
                  <DiaryStatusBadge status={diary.status} />
                </td>
                <td className="py-3 px-4 relative">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(diary)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      aria-label={`View diary from ${diary.name}`}
                    >
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === diary.id ? null : diary.id)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      aria-label="More actions"
                    >
                      <DotsIcon />
                    </button>
                  </div>

                  {openMenuId === diary.id && (
                    <div className="absolute right-4 top-11 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-44">
                      <button
                        onClick={() => {
                          onView(diary);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        View Diary
                      </button>
                      <button
                        onClick={() => {
                          onApprove(diary.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-gray-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          onRequestRevision(diary.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-gray-50"
                      >
                        Request Revision
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredDiaries.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                  No diaries in this tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing 1 to {filteredDiaries.length} of {filteredDiaries.length} diaries
        </p>
      </div>
    </div>
  );
};

export default DiaryTable;