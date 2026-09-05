import React from "react";
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
  notifications,
  reportsStatus,
  progressData,
} from "../../data/facultyDummydata";

// change the component signature:
const FacultyDashboard = ({ onNavigate = () => {} }) => {
  const today = "18 May 2025, Sunday"; // static/dummy date to match reference

  return (
    <FacultyLayout activeItem="dashboard" onNavigate={onNavigate}>
      {/* Welcome + date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, Prof. Ayesha Khan! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's an overview of your OJT mentoring activities.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm">
          📅 {today}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      {/* Students table + Reminders/Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <StudentsTable students={assignedStudents} />
        </div>
        <div className="flex flex-col gap-6">
          <RemindersList reminders={reminders} />
          <NotificationList notifications={notifications} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportsChart data={reportsStatus} />
        <ProgressChart data={progressData} />
      </div>
    </FacultyLayout>
  );
};
export default FacultyDashboard;