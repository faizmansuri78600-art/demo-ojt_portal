import React from "react";
import { Mail, Phone, MapPin, Pencil, Trash2 } from "lucide-react";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

/**
 * StudentEvaluationPanel
 * Props:
 *  - student: selected student evaluation object
 *  - onEdit: () => void
 *  - onDelete: () => void
 */
const StudentEvaluationPanel = ({ student, onEdit, onDelete }) => {
  if (!student) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-sm text-gray-400">
        Select a student from the list to view evaluation details.
      </div>
    );
  }

  const {
    name,
    role,
    email,
    phone,
    location,
    avatar,
    evaluatedOn,
    evaluatedBy,
    overallRating,
    status,
    criteria = [],
    comments,
  } = student;

  return (
    <div className="space-y-4">
      {/* Student Details */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Student Details
        </h3>
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border border-gray-100"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5 text-xs text-gray-500">
          <p className="flex items-center gap-2">
            <Mail size={13} className="text-gray-400" /> {email}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={13} className="text-gray-400" /> {phone}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={13} className="text-gray-400" /> {location}
          </p>
        </div>
      </div>

      {/* Evaluation Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Evaluation Summary
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Evaluated On</span>
            <span className="text-gray-700">{evaluatedOn}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Evaluated By</span>
            <span className="text-gray-700">{evaluatedBy}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Overall Rating</span>
            <StarRating value={overallRating} showValue />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status</span>
            <StatusBadge status={status} />
          </div>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Evaluation Criteria
        </h3>
        <div className="space-y-2">
          {criteria.map((c) => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{c.label}</span>
              <div className="flex items-center gap-2">
                <StarRating value={c.value} size={12} />
                <span className="text-xs text-gray-400 w-8 text-right">
                  {c.value.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
            <span className="text-xs font-medium text-gray-600">
              Average Rating
            </span>
            <StarRating value={overallRating} showValue />
          </div>
        </div>
      </div>

      {/* Evaluator Comments + Actions (same block) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Evaluator Comments
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          {comments}
        </p>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg py-2 transition-colors"
          >
            <Pencil size={13} /> Edit Evaluation
          </button>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg py-2 transition-colors"
          >
            <Trash2 size={13} /> Delete Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentEvaluationPanel;