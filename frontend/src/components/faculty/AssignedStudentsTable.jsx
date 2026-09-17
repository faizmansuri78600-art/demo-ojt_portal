import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EyeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
  Ongoing: "bg-green-50 text-green-700",
  "Yet to Start": "bg-orange-50 text-orange-600",
  Completed: "bg-blue-50 text-blue-700",
};

const AssignedStudentsTable = ({
  students,
  totalCount = 18,
  onView = () => {},
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="overflow-x-auto overflow-y-visible">
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
            {students.map((student, index) => {
              // Backend field names
              const studentName =
                student.studentName || student.name || "N/A";

              const companyName =
                student.companyName || student.company || "N/A";

              const initials =
                student.initials ||
                studentName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase();

              const progress =
                student.progress !== undefined
                  ? student.progress
                  : student.status === "Completed"
                  ? 100
                  : 0;

              const progressColor =
                student.progressColor ||
                (student.status === "Completed"
                  ? "bg-blue-500"
                  : "bg-green-500");

              const studentKey =
                student.studentId || student.assignmentId || student.id || index;

              return (
                <tr
                  key={student.assignmentId || student.id || index}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                >
                  <td className="py-3 px-4 text-gray-500">
                    {index + 1}
                  </td>

                  {/* Student */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                        {initials}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {studentName}
                        </p>

                        <p className="text-xs text-gray-500">
                          {student.email || ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="py-3 px-4">
                    <p className="text-gray-800 font-medium">
                      {companyName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {student.location || ""}
                    </p>
                  </td>

                  {/* Role */}
                  <td className="py-3 px-4 text-gray-600">
                    {student.role || "N/A"}
                  </td>

                  {/* Start Date */}
                  <td className="py-3 px-4 text-gray-600">
                    {student.startDate || "N/A"}
                  </td>

                  {/* End Date */}
                  <td className="py-3 px-4 text-gray-600">
                    {student.endDate || "N/A"}
                  </td>

                  {/* Progress */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${progressColor}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <span className="text-xs text-gray-500 w-8">
                        {progress}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        statusStyles[student.status] ||
                        "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {student.status || "N/A"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">

                      {/* Eye Button */}
                      <button
  onClick={() => {
    console.log("CLICKED STUDENT:", student);
    console.log("STUDENT ID:", student.studentId);

    if (!student.studentId) {
      alert("Student ID not found");
      return;
    }

    navigate(`/faculty/StudentDetails/${student.studentId}`);
  }}
  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
  aria-label={`View ${studentName}`}
>
  <EyeIcon />
</button>

                     {/* 3 Dot Menu */}
<div className="relative z-50">
  <button
  onClick={() => {
  const newValue =
    openMenu === studentKey ? null : studentKey;

  console.log("OPEN MENU VALUE:", newValue);

  setOpenMenu(newValue);
}}
    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
    aria-label={`More actions for ${studentName}`}
  >
    <DotsIcon />
  </button>

  {openMenu === studentKey && (
    <div className="absolute right-0 top-10 z-[9999] w-44 bg-white border-2 border-red-500 rounded-lg shadow-lg py-1">
  
      {/* View Details */}
      <button
        onClick={() => {
          setOpenMenu(null);

          if (!student.studentId) {
            alert("Student ID not found");
            return;
          }

          navigate(`/faculty/StudentDetails/${student.studentId}`);
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        View Details
      </button>

      {/* View Reports */}
      <button
        onClick={() => {
          setOpenMenu(null);
          navigate("/faculty/ReviewReports");
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        View Reports
      </button>

      {/* View Evaluation */}
      <button
        onClick={() => {
          setOpenMenu(null);
          navigate("/faculty/Evaluation");
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        View Evaluation
      </button>

    </div>
  )}
  </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Showing count */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing 1 to {students.length} of {totalCount} students
        </p>
      </div>
    </div>
  );
};

export default AssignedStudentsTable;