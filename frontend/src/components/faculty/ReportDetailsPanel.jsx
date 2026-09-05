import React from "react";
import { Icon, CloseIcon, StarIcon, DownloadIcon, FileTypeIcon } from "./facultyIcons";

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2 text-sm">
    <Icon name={icon} className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
    <span className="text-gray-500 w-28 shrink-0">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

const ReportDetailsPanel = ({ report, onClose, onAddFeedback }) => {
  if (!report) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center text-gray-400 text-sm">
        Select a report to view details.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-lg">Report Details</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
          <CloseIcon />
        </button>
      </div>

      {/* Student summary */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center shrink-0">
          {report.initials}
        </div>
        <div>
          <p className="font-bold text-gray-900">{report.name}</p>
          <p className="text-sm text-gray-500">{report.company}</p>
          <p className="text-sm text-blue-600">{report.role}</p>
        </div>
      </div>

      {/* Report meta */}
      <div className="flex flex-col gap-2.5">
        <DetailRow icon="doc" label="Report Type" value={report.reportType} />
        <DetailRow
          icon="calendar"
          label="Week / Date"
          value={report.week ? `${report.week} (${report.dateRange})` : report.dateRange}
        />
        <DetailRow icon="clock" label="Submitted On" value={`${report.submittedDate}, ${report.submittedTime}`} />
        <div className="flex items-start gap-2 text-sm">
          <Icon name="checkCircle" className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
          <span className="text-gray-500 w-28 shrink-0">Status</span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              report.status === "Reviewed"
                ? "bg-green-50 text-green-700"
                : report.status === "Pending"
                ? "bg-orange-50 text-orange-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {report.status}
          </span>
        </div>
      </div>

      {/* Mentor feedback */}
      {report.feedback && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 text-sm">Mentor Feedback</h3>
            <span className="text-xs text-gray-400">{report.feedback.date}</span>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
            {report.feedback.text}
          </div>
        </div>
      )}

      {/* Rating */}
      {report.rating && (
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-2">Rating</h3>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <StarIcon
                key={n}
                filled={n <= report.rating}
                className={`w-5 h-5 ${n <= report.rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">{report.rating} / 5</span>
          </div>
        </div>
      )}

      {/* Attachments */}
      {report.attachments && report.attachments.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-2">
            Attachments ({report.attachments.length})
          </h3>
          <div className="flex flex-col gap-2">
            {report.attachments.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between border border-gray-100 rounded-lg p-2.5"
              >
                <div className="flex items-center gap-3">
                  <FileTypeIcon type={file.type} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-400">{file.size}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600" aria-label={`Download ${file.name}`}>
                  <DownloadIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onAddFeedback}
        className="mt-1 bg-blue-700 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-800"
      >
        Add Feedback
      </button>
    </div>
  );
};

export default ReportDetailsPanel;