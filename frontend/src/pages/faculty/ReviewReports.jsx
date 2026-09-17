import React, { useState, useEffect } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import ReportsSummaryCard from "../../components/faculty/ReportsSummaryCard";
import ReportsTable from "../../components/faculty/ReportsTable";
import ReportDetailsPanel from "../../components/faculty/ReportDetailsPanel";
import FeedbackModal from "../../components/faculty/FeedbackModal";
import { Icon } from "../../components/faculty/facultyIcons";

const ReviewReports = ({ onNavigate = () => {} }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
const [selectedFilter, setSelectedFilter] = useState("All Reports");
  const [reportSummary, setReportSummary] = useState({
  total: 0,
  reviewed: 0,
  pending: 0,
  returned: 0,
});

  // API call
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(
    `http://localhost:5000/api/weekly-reports/faculty/${user.facultyId}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Faculty Reports API:", data);

     if (data.success) {
  setReports(data.reports);

  const total = data.reports.length;

  const reviewed = data.reports.filter(
    (report) => report.status === "Approved"
  ).length;

  const pending = data.reports.filter(
    (report) => report.status === "Pending Review"
  ).length;

  const returned = data.reports.filter(
    (report) =>
      report.status === "Revision Requested" ||
      report.status === "Returned"
  ).length;

  setReportSummary({
    total,
    reviewed,
    pending,
    returned,
  });

  if (data.reports.length > 0) {
    setSelectedReport(data.reports[0]);
  }
}

      setLoading(false);
    })
    .catch((error) => {
      console.error("Faculty Reports API Error:", error);
      setLoading(false);
    });
}, []);
 const handleFeedbackSubmit = async (feedbackData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/weekly-reports/${selectedReport.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      }
    );

    const data = await response.json();

    console.log("Feedback Update API:", data);

    if (data.success) {
      alert("Feedback submitted successfully");

      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === selectedReport.id
            ? {
                ...report,
                status: "Approved",
              }
            : report
        )
      );

      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              status: "Approved",
              facultyRemarks: feedbackData.facultyRemarks,
            }
          : prev
      );

      setShowFeedbackModal(false);
    } else {
      alert(data.message || "Failed to submit feedback");
    }
  } catch (error) {
    console.error("Feedback API Error:", error);
    alert("Failed to submit feedback");
  }
};

  return (
    <FacultyLayout activeItem="reports" onNavigate={onNavigate}>
      {/* Heading + filters */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">

  <div>
    <h1 className="text-2xl font-bold text-gray-900">
      Review Reports & Weekly Diary
    </h1>

    <p className="text-gray-500 text-sm mt-1">
      Review and provide feedback on student OJT reports and weekly diaries.
    </p>
  </div>

  <div className="flex items-center gap-3">

    {/* This Month */}
    <div className="relative">
      <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
        <option>This Month</option>
        <option>Last Month</option>
        <option>This Semester</option>
      </select>

      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
        <Icon
          name="chevronDown"
          className="w-4 h-4 text-gray-400"
        />
      </span>
    </div>

    {/* Filters */}
    <div className="relative">

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
      >
        <Icon name="filter" className="w-4 h-4" />
        Filters
      </button>

      {showFilters && (
        <div className="absolute right-0 top-11 z-20 w-52 bg-white border border-gray-200 rounded-lg shadow-lg p-2">

          <button
            onClick={() => {
              setSelectedFilter("All Reports");
              setShowFilters(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            All Reports
          </button>

          <button
            onClick={() => {
              setSelectedFilter("Weekly Diaries");
              setShowFilters(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Weekly Diaries
          </button>

          <button
            onClick={() => {
              setSelectedFilter("Returned");
              setShowFilters(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Returned
          </button>

          <button
            onClick={() => {
              setSelectedFilter("Drafts");
              setShowFilters(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Drafts
          </button>

        </div>
      )}

    </div>

  </div>
</div>

      {/* Summary cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

  <ReportsSummaryCard
    icon="doc"
    iconBg="bg-blue-100"
    iconColor="text-blue-600"
    value={reportSummary.total}
    label="Reports Submitted"
    footer="This Month"
  />

  <ReportsSummaryCard
    icon="checkCircle"
    iconBg="bg-green-100"
    iconColor="text-green-600"
    value={reportSummary.reviewed}
    label="Reviewed"
    footer={
      reportSummary.total > 0
        ? `${((reportSummary.reviewed / reportSummary.total) * 100).toFixed(2)}%`
        : "0%"
    }
  />

  <ReportsSummaryCard
    icon="clock"
    iconBg="bg-orange-100"
    iconColor="text-orange-500"
    value={reportSummary.pending}
    label="Pending Review"
    footer={
      reportSummary.total > 0
        ? `${((reportSummary.pending / reportSummary.total) * 100).toFixed(2)}%`
        : "0%"
    }
  />

  <ReportsSummaryCard
    icon="undo"
    iconBg="bg-purple-100"
    iconColor="text-purple-600"
    value={reportSummary.returned}
    label="Returned"
    footer={
      reportSummary.total > 0
        ? `${((reportSummary.returned / reportSummary.total) * 100).toFixed(2)}%`
        : "0%"
    }
  />

</div>

      {/* Table + details panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
     <ReportsTable
  reports={reports}
  onView={setSelectedReport}
  onReview={(report) => {
    setSelectedReport(report);
    setShowFeedbackModal(true);
  }}
  selectedReportId={selectedReport?.id}
  totalCount={reports.length}
  selectedFilter={selectedFilter}
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