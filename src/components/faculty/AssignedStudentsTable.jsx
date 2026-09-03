import React from "react";

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DotsIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
);

const statusStyles = {
  "On Going": "bg-green-50 text-green-700",
  "Yet to Start": "bg-orange-50 text-orange-600",
  Completed: "bg-blue-50 text-blue-700",
};

const AssignedStudentsTable = ({ students, totalCount = 18, onView = () => {} }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100 bg-gray-50">
              <th className="py-3 px-4 font-medium">#</th>
              <th className="py-3 px-4 font-medium">Student</th>
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium">OJT Role</th>
              <th className="py-3 px-4 font-medium">Start Date</th>
              <th className="py-3 px-4 font-medium">End Date</th>
              <th className="py-3 px-4 font-medium">Progress</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="py-3 px-4 text-gray-500">{index + 1}</td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                      {student.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <p className="text-gray-800 font-medium">{student.company}</p>
                  <p className="text-xs text-gray-500">{student.location}</p>
                </td>

                <td className="py-3 px-4 text-gray-600">{student.role}</td>
                <td className="py-3 px-4 text-gray-600">{student.startDate}</td>
                <td className="py-3 px-4 text-gray-600">{student.endDate}</td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 w-32">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${student.progressColor}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8">{student.progress}%</span>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[student.status]}`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(student)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      aria-label={`View ${student.name}`}
                    >
                      <EyeIcon />
                    </button>
                    <button
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      aria-label={`More actions for ${student.name}`}
                    >
                      <DotsIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Showing count (pagination removed) */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing 1 to {students.length} of {totalCount} students
        </p>
      </div>
    </div>
  );
};
export default AssignedStudentsTable;