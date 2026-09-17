import { useState } from "react";
import Modal from "./Modal";
import { useAttendance } from "./AttendanceContext";
import { daysInMonth } from "./AttendanceData";

export default function MarkAttendanceModal({ onClose }) {
  const { filteredStudents, markAttendance, monthKey, filters } = useAttendance();
  const [studentId, setStudentId] = useState(filteredStudents[0]?.id ?? "");
  const [day, setDay] = useState(1);
  const [status, setStatus] = useState("present");

  function handleSubmit() {
    if (!studentId) return;
    const student = filteredStudents.find((s) => s.id === Number(studentId));
    markAttendance(monthKey, day, Number(studentId), status);
    alert(`Saved: ${student?.name} marked "${status}" for day ${day} (${filters.month}).`);
    onClose();
  }

  return (
    <Modal title="Mark attendance" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
          >
            {filteredStudents.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Day ({filters.month})</label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
            >
              {Array.from({ length: daysInMonth(monthKey) }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm capitalize text-slate-700"
            >
              {["present", "late", "absent", "holiday"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}