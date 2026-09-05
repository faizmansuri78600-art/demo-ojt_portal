import React from "react";
import Sidebar from "../../components/common/SSidebar";
import Header from "../../components/common/SHeader";
import StatCardsRow from "../../components/Student/StatCardsRow";
import Companyinformationcard from "../../components/Student/common/Companyinformationcard";
import OJTProgressCard from "../../components/Student/OJTProgressCard";
import MentorDetailsCard from "../../components/Student/MentorDetailsCard";
import WeeklyTaskAssignmentCard from "../../components/Student/WeeklyTaskAssignmentCard";
import WorkScheduleCard from "../../components/Student/WorkScheduleCard";
import RecentUpdatesCard from "../../components/Student/RecentUpdatesCard";
import QuickActionsRow from "../../components/Student/QuickActionsRow";

export default function AssignedOJT() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar activePage="Assigned OJT" />

      {/* Main Content */}
      <div className="ml-64">

        {/* Topbar */}
        <Header />

        <main className="pt-24 p-6">
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Page Header */}
      <div>
        <p className="text-xs text-slate-400 mb-1">
          Dashboard &gt; Assigned OJT
        </p>

        <h1 className="text-xl font-bold text-slate-800">
          Assigned OJT
        </h1>

              <p className="text-xs text-slate-500">
          View your assigned internship details and track your progress
        </p>
      </div>

            {/* Statistics */}
            <StatCardsRow />

            {/* Company, Progress and Mentor */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Companyinformationcard />
              <OJTProgressCard />
              <MentorDetailsCard />
            </div>

            {/* Tasks, Schedule and Updates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <WeeklyTaskAssignmentCard />
              <WorkScheduleCard />
              <RecentUpdatesCard />
            </div>

            {/* Quick Actions */}
            <QuickActionsRow />

          </div>
        </main>

      </div>
    </div>
  );
}