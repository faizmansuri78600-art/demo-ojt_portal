import React from "react";

const StudentsTable = ({ students, onViewAll = () => {} }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-lg">Assigned Students Overview</h2>
        <button
          onClick={onViewAll}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50"
        >
          View All Students
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="py-2 pr-4 font-medium">Student Name</th>
              <th className="py-2 pr-4 font-medium">Company</th>
              <th className="py-2 pr-4 font-medium">OJT Role</th>
              <th className="py-2 pr-4 font-medium">Start Date</th>
              <th className="py-2 pr-4 font-medium">Progress</th>
              <th className="py-2 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center">
                      {student.initials}
                    </div>
                    <span className="font-medium text-gray-800">{student.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-600">{student.company}</td>
                <td className="py-3 pr-4 text-gray-600">{student.role}</td>
                <td className="py-3 pr-4 text-gray-600">{student.startDate}</td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2 w-40">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${student.progressColor}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8">{student.progress}%</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;