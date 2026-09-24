import { useState } from "react";
import Modal from "./Modal";
import { useAttendance } from "./AttendanceContext";
import { daysInMonth, dayLabel } from "./AttendanceData";
import { DayStatusIcon } from "./AttendanceStatusIcons";

export default function StudentDetailModal({ student, mode, onClose }) {
  const { records, monthKey, markAttendance, verifyDay, filters } = useAttendance();
  const [editingDay, setEditingDay] = useState(null);
  const total = daysInMonth(monthKey);
  const monthRecords = records[monthKey] || {};

  const days = Array.from({ length: total }, (_, i) => i + 1);
  const editingEntry = editingDay ? monthRecords[editingDay]?.[student.id] : null;

  return (
    <Modal title={`${mode === "edit" ? "Edit" : "View"} attendance — ${student.name}`} onClose={onClose} width="max-w-lg">
      <p className="mb-3 text-xs text-slate-400">{filters.month} · {student.internship}</p>

      <div className="max-h-72 overflow-y-auto pr-1">
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day) => {
            const entry = monthRecords[day]?.[student.id];
            const pending = entry && !entry.verified;
            const { label } = dayLabel(monthKey, day);
            const isEditing = editingDay === day;
            return (
              <button
                key={day}
                disabled={mode !== "edit"}
                onClick={() => setEditingDay(isEditing ? null : day)}
                className={`relative flex flex-col items-center gap-0.5 rounded-lg border p-1.5 text-[10px] ${
                  mode === "edit" ? "cursor-pointer hover:border-blue-300" : "cursor-default"
                } ${isEditing ? "border-blue-500 bg-blue-50" : pending ? "border-amber-300" : "border-slate-100"}`}
                title={
                  !entry
                    ? label
                    : pending
                    ? `${label} — self-marked "${entry.status}", awaiting verification`
                    : `${label} — ${entry.status} (verified)`
                }
              >
                <span className="text-slate-400">{day}</span>
                <DayStatusIcon status={entry?.status} />
                {pending && <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {mode === "edit" && editingDay && (
        <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
          {editingEntry && !editingEntry.verified && (
            <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Self-marked as "{editingEntry.status}" — not yet verified.
              <button
                onClick={() => {
                  verifyDay(monthKey, editingDay, student.id);
                  alert(`Verified ${student.name}'s attendance for day ${editingDay} as "${editingEntry.status}".`);
                  setEditingDay(null);
                }}
                className="rounded-md bg-amber-600 px-2 py-1 font-medium text-white hover:bg-amber-700"
              >
                Verify as-is
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Or set day {editingDay} to:</span>
            {["present", "late", "absent", "holiday"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  markAttendance(monthKey, editingDay, student.id, opt);
                  alert(`Saved: ${student.name}'s attendance for day ${editingDay} set to "${opt}" (verified).`);
                  setEditingDay(null);
                }}
                className="rounded-md border border-slate-200 px-2 py-1 text-xs capitalize text-slate-600 hover:bg-slate-50"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50">
          Close
        </button>
      </div>
    </Modal>
  );
}