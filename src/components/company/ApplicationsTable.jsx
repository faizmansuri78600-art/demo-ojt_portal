import React from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

/**
 * ApplicationsTable
 * Props:
 *  - applications: array of application rows
 *  - selectedId: currently selected application id (row highlight)
 *  - onSelect: (application) => void
 *  - onQuickAccept / onQuickReject: (application) => void
 *  - page, totalPages, totalEntries, perPage, onPageChange
 */
const ApplicationsTable = ({
  applications = [],
  selectedId,
  onSelect,
  onQuickAccept,
  onQuickReject,
  page = 1,
  totalPages = 1,
  totalEntries = 0,
  perPage = 10,
  onPageChange,
}) => {
  const start = applications.length ? (page - 1) * perPage + 1 : 0;
  const end = start + applications.length - 1;

  const pageNumbers = () => {
    const nums = [];
    for (let i = 1; i <= totalPages; i++) nums.push(i);
    return nums.slice(0, 5);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="px-4 pt-4 pb-1">
        <h3 className="text-sm font-semibold text-gray-700">
          Applications List{" "}
          <span className="text-gray-400 font-normal">({totalEntries})</span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Opportunity</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">College</th>
              <th className="px-4 py-3 font-medium">Applied On</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr
                key={a.id}
                onClick={() => onSelect(a)}
                className={`border-t border-gray-50 cursor-pointer transition-colors ${
                  selectedId === a.id ? "bg-blue-50/60" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 text-gray-500">{a.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-[11px] font-semibold flex items-center justify-center">
                      {a.initials}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{a.opportunity}</td>
                <td className="px-4 py-3 text-gray-600">{a.department}</td>
                <td className="px-4 py-3 text-gray-600">{a.college}</td>
                <td className="px-4 py-3 text-gray-600">{a.appliedOn}</td>
                <td className="px-4 py-3">
                  <ApplicationStatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <button
                      title="View"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(a);
                      }}
                      className="hover:text-blue-500"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      title="Accept"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAccept(a);
                      }}
                      className="hover:text-green-500"
                    >
                      <CheckCircle size={15} />
                    </button>
                    <button
                      title="Reject"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickReject(a);
                      }}
                      className="hover:text-red-500"
                    >
                      <XCircle size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  No applications match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
          {pageNumbers().map((p) => (
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
          {totalPages > 5 && <span className="text-gray-300 text-xs">...</span>}
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-400 disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTable;
