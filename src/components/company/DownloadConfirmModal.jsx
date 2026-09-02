
import React from "react";
import { X, FileText } from "lucide-react";

const DownloadConfirmModal = ({
  file,
  onCancel,
  onOpen,
}) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-[380px] p-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText size={18} className="text-blue-500" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {file.name}
              </h3>

              <p className="text-xs text-gray-400 mt-0.5">
                {file.type} &middot; {file.size}
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="text-gray-300 hover:text-gray-500"
          >
            <X size={16} />
          </button>
        </div>

        {/* Message */}
        <p className="text-xs text-gray-500 mb-5">
          Would you like to open this document?
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-2">

          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onOpen}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Open
          </button>

        </div>
      </div>
    </div>
  );
};

export default DownloadConfirmModal;
