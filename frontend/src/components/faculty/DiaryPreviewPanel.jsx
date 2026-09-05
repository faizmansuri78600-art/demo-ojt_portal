import React, { useState, useEffect } from "react";
import { Icon, CloseIcon, DownloadIcon, FileTypeIcon } from "./facultyIcons";

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2 text-sm">
    <Icon name={icon} className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
    <span className="text-gray-500 w-28 shrink-0">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

const DiaryPreviewPanel = ({ diary, onClose, onApprove, onRequestRevision }) => {
  const [feedback, setFeedback] = useState("");

  // Clear feedback text whenever a different diary is selected
  useEffect(() => {
    setFeedback("");
  }, [diary?.id]);

  if (!diary) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center text-gray-400 text-sm">
        Select a diary to preview.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-lg">Diary Preview</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
          <CloseIcon />
        </button>
      </div>

      {/* Student summary */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center shrink-0">
          {diary.initials}
        </div>
        <div>
          <p className="font-bold text-gray-900">{diary.name}</p>
          <p className="text-sm text-gray-500">{diary.company}</p>
          <p className="text-sm text-blue-600">{diary.role}</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2.5">
        <DetailRow icon="calendar" label="Week / Date" value={`${diary.week} (${diary.dateRange})`} />
        <DetailRow icon="clock" label="Submitted On" value={`${diary.submittedDate}, ${diary.submittedTime}`} />
        <DetailRow icon="clock" label="Total Hours" value={diary.totalHours} />
        <DetailRow icon="checkCircle" label="Mentor" value={diary.mentor} />
      </div>

      {/* Summary */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-2">Summary</h3>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
          {diary.summary}
        </div>
      </div>

      {/* Attachments */}
      {diary.attachments && diary.attachments.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-2">
            Attachments ({diary.attachments.length})
          </h3>
          <div className="flex flex-col gap-2">
            {diary.attachments.map((file) => (
              <div key={file.name} className="flex items-center justify-between border border-gray-100 rounded-lg p-2.5">
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

      {/* Mentor feedback */}
      <div>
        <label className="text-sm font-semibold text-gray-800 mb-2 block">
          Mentor Feedback (Optional)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
          placeholder="Write your feedback here..."
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={() => onApprove(diary.id, feedback)}
          className="flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-green-700"
        >
          <Icon name="checkCircle" className="w-4 h-4" />
          Approve
        </button>
        <button
          onClick={() => onRequestRevision(diary.id, feedback)}
          className="flex items-center justify-center gap-2 bg-orange-50 text-orange-600 text-sm font-medium px-3 py-2.5 rounded-lg border border-orange-200 hover:bg-orange-100"
        >
          <Icon name="undo" className="w-4 h-4" />
          Request Revision
        </button>
        <button
          onClick={onClose}
          className="flex items-center justify-center gap-2 border border-red-200 text-red-600 text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-red-50"
        >
          <CloseIcon className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DiaryPreviewPanel;