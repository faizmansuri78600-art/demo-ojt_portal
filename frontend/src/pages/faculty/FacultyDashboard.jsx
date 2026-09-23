import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FacultyLayout from "../../components/faculty/FacultyLayout";
import StatCard from "../../components/faculty/StatCard";
import StudentsTable from "../../components/faculty/StudentsTable";
import RemindersList from "../../components/faculty/RemindersList";
import NotificationList from "../../components/faculty/NotificationList";
import ReportsChart from "../../components/faculty/ReportsChart";
import ProgressChart from "../../components/faculty/ProgressChart";

import {
  statCards,
  assignedStudents,
  reminders,
  reportsStatus,
  progressData,
} from "../../data/facultyDummydata";

const FacultyDashboard = ({ onNavigate = () => {} }) => {
  const navigate = useNavigate();

  const today = "18 May 2025, Sunday";

  // ============================================================
  // API DATA
  // ============================================================

  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardNotifications, setDashboardNotifications] = useState([]);
  const [dashboardReminders, setDashboardReminders] = useState([]);
  const [dashboardReportStatus, setDashboardReportStatus] = useState({
  total: 0,
  segments: [],
});
  const [dashboardReportCount, setDashboardReportCount] = useState(0);
  const [dashboardDiaryCount, setDashboardDiaryCount] = useState(0);
 const [dashboardEvaluationCount, setDashboardEvaluationCount] = useState(0);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const facultyId = user?.facultyId;

  if (!facultyId) {
    console.error("Faculty ID not found");
    return;
  }

  fetch(`http://localhost:5000/api/faculty/dashboard/${facultyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Faculty Dashboard Data:", data);

      if (data.success) {
        setDashboardData(data);
      }
    })
    .catch((error) => {
      console.error("Dashboard API Error:", error);
    });
}, []);
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (!userId) {
    console.error("User ID not found");
    return;
  }

  fetch(`http://localhost:5000/api/notifications/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Faculty Notifications API:", data);

      if (data.success) {
        setDashboardNotifications(
  data.notifications.map((note) => ({
    id: note._id,
    text: note.message,
    time: note.sentOn
      ? new Date(note.sentOn).toLocaleDateString()
      : "",
    color: note.isRead ? "bg-gray-300" : "bg-blue-500",
  }))
);
      }
    })
    .catch((error) => {
      console.error("Notifications API Error:", error);
    });
}, []);
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const facultyId = user?.facultyId;

  if (!facultyId) {
    console.error("Faculty ID not found");
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
      console.log("Faculty Reports Reminder API:", reportsData);
      console.log(
        "Faculty Evaluation Reminder API:",
        evaluationData
      );

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
          setDashboardReportCount(pendingReports);
setDashboardEvaluationCount(pendingEvaluations);
const totalReports = reportsData.success
  ? reportsData.reports.length
  : 0;
console.log("FACULTY REPORTS:", reportsData.reports);
console.log(
  "REPORT STATUSES:",
  reportsData.reports.map((report) => report.status)
);
const reviewedReports = reportsData.success
  ? reportsData.reports.filter(
      (report) => report.status === "Approved"
    ).length
  : 0;

const pendingReviewReports = reportsData.success
  ? reportsData.reports.filter(
      (report) => report.status === "Pending Review"
    ).length
  : 0;

let expectedReports = 0;

if (reportsData.success && dashboardData?.assignedStudents) {
  dashboardData.assignedStudents.forEach((student) => {
    const startDate = new Date(student.startDate);
    const endDate = new Date(student.endDate);
    const today = new Date();

    const effectiveEndDate =
      today < endDate ? today : endDate;

    if (effectiveEndDate >= startDate) {
      const daysPassed =
        Math.floor(
          (effectiveEndDate - startDate) /
            (1000 * 60 * 60 * 24)
        );

      expectedReports += Math.floor(daysPassed / 7) + 1;
    }
  });
}

const submittedReports = reportsData.success
  ? reportsData.reports.length
  : 0;

const yetToSubmitReports = Math.max(
  expectedReports - submittedReports,
  0
);

const reportSegments = [
  {
    label: "Reviewed",
    value: reviewedReports,
  },
  {
    label: "Pending Review",
    value: pendingReviewReports,
  },
  {
    label: "Yet to Submit",
    value: yetToSubmitReports,
  },
];

const segmentsWithPercent = reportSegments.map((segment) => ({
  ...segment,
  percent:
    totalReports > 0
      ? Math.round((segment.value / totalReports) * 100)
      : 0,
  color:
    segment.label === "Reviewed"
      ? "#22c55e"
      : segment.label === "Pending Review"
      ? "#f59e0b"
      : "#94a3b8",
}));

setDashboardReportStatus({
  total: totalReports,
  segments: segmentsWithPercent,
});

const weeklyDiaries =
  reportsData.success
    ? reportsData.reports.filter(
        (report) => report.reportType === "Weekly Diary"
      ).length
    : 0;

setDashboardDiaryCount(weeklyDiaries);

      setDashboardReminders([
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
    })
    .catch((error) => {
      console.error("Reminders API Error:", error);
    });
}, []);

  // ============================================================
  // STUDENTS
  // ============================================================

 const dashboardStudents = dashboardData?.assignedStudents || [];
 const totalAssignedStudents = dashboardStudents.length;

const ongoingStudents = dashboardStudents.filter(
  (student) => student.status === "Ongoing"
).length;

const yetToStartStudents = dashboardStudents.filter(
  (student) => student.status === "Yet to Start"
).length;

const completedStudents = dashboardStudents.filter(
  (student) => student.status === "Completed"
).length;

  // ============================================================
  // PROGRESS
  // ============================================================

  const dashboardProgress =
    dashboardData?.assignedStudents?.length > 0
      ? dashboardData.assignedStudents.map((student) => ({
          month: student.studentName,
          value: Number(student.progress) || 0,
        }))
      : progressData;

  // ============================================================
  // STAT CARD DATA
  // ============================================================

 const dashboardStats = statCards.map((card) => {
  if (card.id === 1) {
    return {
      ...card,
      value: totalAssignedStudents,
    };
  }

  if (card.id === 2) {
    return {
      ...card,
      value: ongoingStudents,
    };
  }

  if (card.id === 3) {
    return {
      ...card,
      value: yetToStartStudents,
    };
  }

  if (card.id === 4) {
    return {
      ...card,
      value: completedStudents,
    };
  }

  return card;
});

// ============================================================
// NAVIGATION
// ============================================================

const handleStatLinkClick = (linkText) => {
  if (linkText === "View all students") {
    navigate("/faculty/AssignedStudents");
  }

  if (linkText === "Review Now") {
    navigate("/faculty/ReviewReports");
  }

  if (linkText === "View Diaries") {
    navigate("/faculty/ApproveDiary");
  }

  if (linkText === "Evaluate Now") {
    navigate("/faculty/Evaluation");
  }
};

  // ============================================================
  // REMINDERS
  // ============================================================

  const handleViewAllReminders = () => {
    navigate("/faculty/Reminders");
  };

  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  const handleViewAllNotifications = () => {
    navigate("/faculty/Notifications");
  };

  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <FacultyLayout activeItem="dashboard" onNavigate={onNavigate}>

      {/* Welcome + date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {JSON.parse(localStorage.getItem("user"))?.email?.split("@")[0]}! 👋
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Here's an overview of your OJT mentoring activities.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm">
          📅 {today}
        </div>
      </div>

      {/* ========================================================
          STAT CARDS
      ======================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {dashboardStats.map((card) => (
          <StatCard
            key={card.id}
            {...card}
            onLinkClick={() => handleStatLinkClick(card.linkText)}
          />
        ))}
      </div>

      {/* ========================================================
          STUDENTS TABLE + REMINDERS + NOTIFICATIONS
      ======================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Students */}
        <div className="lg:col-span-2">
          <StudentsTable
            students={dashboardStudents}
            onViewAll={() => navigate("/faculty/AssignedStudents")}
          />
        </div>

        {/* Reminders + Notifications */}
        <div className="flex flex-col gap-6">

         <RemindersList
  reminders={dashboardReminders}
  onViewAll={handleViewAllReminders}
/>

         <NotificationList
  notifications={dashboardNotifications}
  onViewAll={handleViewAllNotifications}
/>

        </div>
      </div>

      {/* ========================================================
          CHARTS
      ======================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Reports Status */}
       <ReportsChart data={dashboardReportStatus} />

        {/* OJT Progress */}
        <ProgressChart data={dashboardProgress} />

      </div>

    </FacultyLayout>
  );
};

export default FacultyDashboard;