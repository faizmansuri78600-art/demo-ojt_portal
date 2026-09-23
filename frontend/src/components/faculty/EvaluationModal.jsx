import React, { useEffect, useState } from "react";

const EvaluationModal = ({ student, onClose, onSaved }) => {
  const [marks, setMarks] = useState({
    hoursMarks: "",
    performanceMarks: "",
    punctualityMarks: "",
    weeklyReportMarks: "",
    finalReportMarks: "",
    vivaMarks: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalMarks = Object.values(marks).reduce(
    (total, mark) => total + (Number(mark) || 0),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const allFilled = Object.values(marks).every(
      (mark) => mark !== ""
    );

    if (!allFilled) {
      setError("Please enter marks for all evaluation criteria.");
      return;
    }

    try {
  setSubmitting(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const response = await fetch(
    "http://localhost:5000/api/evaluations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: `E${Date.now()}`,
        assignedOjtId: student.assignedOjtId,

        evaluatedByFacultyId: user.facultyId,

        hoursMarks: Number(marks.hoursMarks),
        performanceMarks: Number(marks.performanceMarks),
        punctualityMarks: Number(marks.punctualityMarks),
        weeklyReportMarks: Number(marks.weeklyReportMarks),
        finalReportMarks: Number(marks.finalReportMarks),
        vivaMarks: Number(marks.vivaMarks),

        totalMarks,
        evaluatedOn: new Date().toISOString().split("T")[0],
      }),
    }
  );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save evaluation");
      }

      alert("Evaluation submitted successfully!");

      if (onSaved) {
        onSaved();
      }

      onClose();
    } catch (err) {
      console.error("Evaluation Submit Error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!student) return null;

  const fields = [
    {
      name: "hoursMarks",
      label: "OJT Hours",
    },
    {
      name: "performanceMarks",
      label: "Performance",
    },
    {
      name: "punctualityMarks",
      label: "Punctuality",
    },
    {
      name: "weeklyReportMarks",
      label: "Weekly Reports",
    },
    {
      name: "finalReportMarks",
      label: "Final Report",
    },
    {
      name: "vivaMarks",
      label: "Viva",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Evaluate Student
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {student.name} • {student.studentId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 text-xl"
          >
            ×
          </button>
        </div>

        {/* Student info */}
        <div className="px-6 pt-5">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800">
              {student.name}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {student.company} • {student.role}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {field.label}
                </label>

                <input
                  type="number"
                  name={field.name}
                  value={marks[field.name]}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="Enter marks"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                />
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-5 bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              Total Marks
            </span>

            <span className="text-xl font-bold text-blue-700">
              {totalMarks}
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 mt-3">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Evaluation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvaluationModal;