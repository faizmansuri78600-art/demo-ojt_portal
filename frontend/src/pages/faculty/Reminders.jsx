import React, { useEffect, useState } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";

const Reminders = ({ onNavigate = () => {} }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const facultyId = user?.facultyId;

    if (!facultyId) {
      console.error("Faculty ID not found");
      setLoading(false);
      return;
    }

    Promise.all([
      fetch(
        `http://localhost:5000/api/weekly-reports/faculty/${facultyId}`
      ).then((response) => response.json()),

      fetch(
        `http://localhost:5000/api/evaluations/faculty/${facultyId}`
      ).then((response) => response.json()),
    ])
      .then(([reportsData, evaluationData]) => {
        console.log("Reminders Reports API:", reportsData);
        console.log("Reminders Evaluation API:", evaluationData);

        const pendingReports =
          reportsData.success
            ? reportsData.reports.filter(
                (report) => report.status === "Pending Review"
              ).length
            : 0;

        const pendingEvaluations =
          evaluationData.success
            ? evaluationData.students.filter(
                (student) => student.status === "Pending"
              ).length
            : 0;

        setReminders([
          {
            id: 1,
            text: `${pendingEvaluations} Internal Evaluations are pending.`,
          },
          {
            id: 2,
            text: `${pendingReports} Reports are waiting for your review.`,
          },
          {
            id: 3,
            text: "Weekly diary submissions due this week.",
          },
        ]);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Reminders API Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <FacultyLayout
      activeItem="dashboard"
      onNavigate={onNavigate}
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Reminders
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View your pending tasks and important reminders.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg">
              All Reminders
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-500">
              Loading reminders...
            </div>
          ) : reminders.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No reminders available.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="p-5 flex items-start gap-4"
                >
                  <span className="w-3 h-3 rounded-full mt-1.5 bg-blue-500" />

                  <p className="text-sm text-gray-800 font-medium">
                    {reminder.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </FacultyLayout>
  );
};

export default Reminders;