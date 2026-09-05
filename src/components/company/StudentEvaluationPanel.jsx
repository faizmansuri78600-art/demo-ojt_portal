import React, { useEffect, useState } from "react";
import { Star, Pencil, Trash2, X, Mail, Phone, MapPin } from "lucide-react";

// ✅ Shared default criteria set, reused wherever a student is missing
// (or has an empty) criteria object.
const DEFAULT_CRITERIA = {
  "Technical Skills": 4.5,
  Communication: 4.0,
  Teamwork: 4.0,
  Punctuality: 4.0,
  "Problem Solving": 4.5,
};

// ✅ Treats an empty object ({}) the same as a missing one — previously
// `student.criteria ?? DEFAULT_CRITERIA` only caught null/undefined, so
// any candidate whose record had `criteria: {}` rendered a blank section
// instead of falling back to the defaults.
function hasCriteria(obj) {
  return !!obj && typeof obj === "object" && Object.keys(obj).length > 0;
}

function getCriterionValue(v) {
  if (v && typeof v === "object") {
    return v.value ?? v.label ?? 0;
  }
  return v ?? 0;
}

// ✅ Formats a Date as "09-sep-2026" (day-month-year, lowercase, hyphenated).
function formatDateShort(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// ✅ Deterministic gender-matched avatar photo.
// Same student always gets the same picture (hashed from name),
// and it picks from the men/ or women/ pool based on student.gender.
function hashToIndex(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
}

function getAvatarUrl(student) {
  if (!student) return "https://i.pravatar.cc/60?img=5";
  if (student.avatar) return student.avatar; // explicit override always wins

  const idx = hashToIndex(student.name || String(student.id), 99);

  if (student.gender === "Female") {
    return `https://randomuser.me/api/portraits/women/${idx}.jpg`;
  }
  if (student.gender === "Male") {
    return `https://randomuser.me/api/portraits/men/${idx}.jpg`;
  }
  // No gender on record (e.g. older seed data) — neutral fallback
  return "https://i.pravatar.cc/60?img=5";
}

function ConfirmDeleteModal({ open, onClose, onConfirm, studentName }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Delete Evaluation
          </h3>

          <p className="text-xs text-gray-500 mb-5">
            Are you sure you want to delete the evaluation for{" "}
            <span className="font-medium text-gray-700">
              {studentName}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditEvaluationModal({ open, onClose, student, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (open && student) {
      setForm({
        overallRating: student.overallRating ?? 4.2,
        status: student.status ?? "Evaluated",
        comments: student.comments ?? "",
        // ✅ was `student.criteria ? ... : DEFAULT_CRITERIA` — an empty
        // {} is truthy, so it produced an empty form instead of defaults.
        criteria: hasCriteria(student.criteria)
          ? Object.fromEntries(
              Object.entries(student.criteria).map(([k, v]) => [
                k,
                getCriterionValue(v),
              ])
            )
          : { ...DEFAULT_CRITERIA },
      });
    }
  }, [open, student]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !form || !student) return null;

  const updateCriterion = (key, value) => {
    setForm((prev) => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [key]: Number(value),
      },
    }));
  };

  const handleSave = () => {
    // Editing didn't previously touch evaluatedOn at all, so switching
    // a student's status from Pending -> Evaluated left the date blank.
    const evaluatedOn =
      form.status === "Pending"
        ? "-"
        : student.evaluatedOn && student.evaluatedOn !== "-"
        ? student.evaluatedOn // already evaluated before — keep original date
        : formatDateShort(new Date()); // newly evaluated — stamp today

    onSave({ ...student, ...form, evaluatedOn });
    alert("Evaluation updated successfully!");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
          <h3 className="text-sm font-semibold text-gray-800">
            Edit Evaluation — {student.name}
          </h3>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 min-h-0 p-5 space-y-4 text-xs">
          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  status: e.target.value,
                }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            >
              <option>Evaluated</option>
              <option>Pending</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-2">
              Evaluation Criteria
            </label>

            <div className="space-y-2">
              {Object.entries(form.criteria).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-gray-500">{key}</span>

                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={value}
                    onChange={(e) =>
                      updateCriterion(key, e.target.value)
                    }
                    className="w-16 border border-gray-200 rounded-md px-2 py-1 text-right outline-none focus:border-blue-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Overall Rating
            </label>

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.overallRating}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  overallRating: Number(e.target.value),
                }))
              }
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Evaluator Comments
            </label>

            <textarea
              rows={4}
              value={form.comments}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  comments: e.target.value,
                }))
              }
              className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-300"
            />
          </div>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudentEvaluationPanel({
  student,
  onEdit,
  onDelete,
  editOpen: editOpenProp, // optional controlled prop from parent (table pencil)
  onEditOpenChange, // optional controlled setter from parent
}) {
  const [internalEditOpen, setInternalEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Controlled if the parent supplied both editOpen and onEditOpenChange;
  // otherwise falls back to internal state so the panel still works standalone.
  const isControlled = editOpenProp !== undefined && !!onEditOpenChange;
  const editOpen = isControlled ? editOpenProp : internalEditOpen;
  const setEditOpen = isControlled ? onEditOpenChange : setInternalEditOpen;

  if (!student) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-xs text-gray-400">
        Select a student to view their evaluation.
      </div>
    );
  }

  // ✅ was `student.criteria ?? DEFAULT_CRITERIA` — same empty-object bug
  // as above, fixed the same way.
  const criteria = hasCriteria(student.criteria)
    ? student.criteria
    : DEFAULT_CRITERIA;

  const handleSave = (updatedStudent) => {
    onEdit?.(updatedStudent);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(student);
    alert("Evaluation deleted successfully!");
    setDeleteOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Student Details */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Student Details
        </h3>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={getAvatarUrl(student)}
            alt={student.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {student.name}
            </p>

            <p className="text-xs text-gray-400">
              {typeof student.opportunity === "object"
                ? student.opportunity?.label
                : student.opportunity}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            {student.email}
          </div>

          {student.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              {student.phone}
            </div>
          )}

          {student.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {student.location}
            </div>
          )}
        </div>
      </div>

      {/* Evaluation Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Evaluation Summary
        </h3>

        <dl className="space-y-2 text-xs">
          <div className="flex justify-between">
            <dt className="text-gray-400">Evaluated On</dt>
            <dd className="text-gray-700">
              {student.evaluatedOn || "-"}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-gray-400">Evaluated By</dt>
            <dd className="text-gray-700">
              {student.evaluatedBy || "-"}
            </dd>
          </div>

          <div className="flex justify-between items-center">
            <dt className="text-gray-400">Overall Rating</dt>

            <dd className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {student.overallRating ?? "-"}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-gray-400">Status</dt>

            <dd
              className={
                student.status === "Evaluated"
                  ? "text-emerald-600 font-medium"
                  : "text-amber-600 font-medium"
              }
            >
              {student.status}
            </dd>
          </div>
        </dl>
      </div>

      {/* Evaluation Criteria */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Evaluation Criteria
        </h3>

        <div className="space-y-2 text-xs">
          {Object.entries(criteria).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center"
            >
              <span className="text-gray-500">{key}</span>

              <span className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {getCriterionValue(value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluator Comments + Actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Evaluator Comments
        </h3>

        <p className="text-xs text-gray-500 mb-4">
          {student.comments || "No comments yet."}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setEditOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg py-2"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Evaluation
          </button>

          <button
            onClick={() => setDeleteOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg py-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Evaluation
          </button>
        </div>
      </div>

      <EditEvaluationModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        student={student}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        studentName={student.name}
      />
    </div>
  );
}