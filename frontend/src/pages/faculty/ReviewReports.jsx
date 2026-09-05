import React, { useState } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import ReportsSummaryCard from "../../components/faculty/ReportsSummaryCard";
import ReportsTable from "../../components/faculty/ReportsTable";
import ReportDetailsPanel from "../../components/faculty/ReportDetailsPanel";
import FeedbackModal from "../../components/faculty/FeedbackModal";
import { Icon } from "../../components/faculty/facultyIcons";
import { reportsSummary, reportsList } from "../../data/facultyDummydata";

const ReviewReports = ({ onNavigate = () => {} }) => {
  const [selectedReport, setSelectedReport] = useState(
    reportsList.find((r) => r.id === 1) || null
  );
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleFeedbackSubmit = () => {
    setShowFeedbackModal(false); // static/dummy — no backend yet
  };

  return (
    <FacultyLayout activeItem="reports" onNavigate={onNavigate}>
      {/* Heading + filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Reports & Weekly Diary</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review and provide feedback on student OJT reports and weekly diaries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Semester</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
              <Icon name="chevronDown" className="w-4 h-4 text-gray-400" />
            </span>
          </div>
          <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
            <Icon name="filter" className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {reportsSummary.map((card) => (
          <ReportsSummaryCard key={card.id} {...card} />
        ))}
      </div>

      {/* Table + details panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ReportsTable
            reports={reportsList}
            onView={setSelectedReport}
            selectedReportId={selectedReport?.id}
            totalCount={18}
          />
        </div>
        <div>
          <ReportDetailsPanel
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
            onAddFeedback={() => setShowFeedbackModal(true)}
          />
        </div>
      </div>

      {showFeedbackModal && (
        <FeedbackModal
          report={selectedReport}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </FacultyLayout>
  );
};

export default ReviewReports;