import Modal from "./Modal";
import { useAttendance } from "./AttendanceContext";

function toCSV(students, studentStats, month) {
  const header = ["Student", "Internship", "Present", "Late", "Absent", "Holiday", "Present %"];
  const rows = students.map((s) => {
    const st = studentStats[s.id] || {};
    return [s.name, s.internship, st.present || 0, st.late || 0, st.absent || 0, st.holiday || 0, `${(st.pct || 0).toFixed(2)}%`];
  });
  const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `attendance-${month.replace(" ", "-")}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ReportModal({ onClose }) {
  const { filteredStudents, studentStats, filters } = useAttendance();

  return (
    <Modal title={`Attendance report — ${filters.month}`} onClose={onClose} width="max-w-lg">
      <div className="max-h-72 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400">
              <th className="py-1.5">Student</th>
              <th className="py-1.5 text-center">P</th>
              <th className="py-1.5 text-center">L</th>
              <th className="py-1.5 text-center">A</th>
              <th className="py-1.5 text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => {
              const st = studentStats[s.id] || {};
              return (
                <tr key={s.id} className="border-b border-slate-50">
                  <td className="py-1.5 text-slate-700">{s.name}</td>
                  <td className="py-1.5 text-center text-emerald-600">{st.present || 0}</td>
                  <td className="py-1.5 text-center text-amber-600">{st.late || 0}</td>
                  <td className="py-1.5 text-center text-red-600">{st.absent || 0}</td>
                  <td className="py-1.5 text-right font-medium text-slate-800">{(st.pct || 0).toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50">
          Close
        </button>
        <button
          onClick={() => toCSV(filteredStudents, studentStats, filters.month)}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Download CSV
        </button>
      </div>
    </Modal>
  );
}
