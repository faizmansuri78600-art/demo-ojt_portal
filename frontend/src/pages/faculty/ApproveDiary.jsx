import React, { useState, useEffect } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import ReportsSummaryCard from "../../components/faculty/ReportsSummaryCard";
import DiaryTable from "../../components/faculty/DiaryTable";
import DiaryPreviewPanel from "../../components/faculty/DiaryPreviewPanel";
import { Icon } from "../../components/faculty/facultyIcons";


const ApproveDiary = ({ onNavigate = () => {} }) => {
  const [diaries, setDiaries] = useState([]);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [diarySummary, setDiarySummary] = useState({
  total: 0,
  pending: 0,
  approved: 0,
  revision: 0,
});
const [showFilters, setShowFilters] = useState(false);
const [selectedFilter, setSelectedFilter] = useState("All Diaries");

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(
    `http://localhost:5000/api/weekly-reports/faculty/${user.facultyId}`
  )
      .then((response) => response.json())
      .then((data) => {
        console.log("Approve Diary API:", data);

        if (data.success) {
          setDiaries(data.reports);
          const reports = data.reports;

setDiarySummary({
  total: reports.length,
  pending: reports.filter(
    (report) => report.status === "Pending Review"
  ).length,
  approved: reports.filter(
    (report) => report.status === "Approved"
  ).length,
  revision: reports.filter(
    (report) => report.status === "Revision Requested"
  ).length,
});

          if (data.reports.length > 0) {
            setSelectedDiary(data.reports[0]);
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Approve Diary API Error:", error);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/weekly-reports/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      console.log("Update Diary Status:", data);

      if (data.success) {
        setDiaries((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status } : d))
        );

        setSelectedDiary((prev) =>
          prev && prev.id === id ? { ...prev, status } : prev
        );
      }
    } catch (error) {
      console.error("Update Diary Status Error:", error);
    }
  };

  const handleApprove = (id) => {
    updateStatus(id, "Approved");
  };

  const handleRequestRevision = (id) => {
    updateStatus(id, "Revision Requested");
  };

    return (
    <FacultyLayout activeItem="approveDiary" onNavigate={onNavigate}>

      {/* Heading + Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Approve Diary
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Review student weekly diaries and approve or send back for revision.
          </p>
        </div>

        {/* Right side */}
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
                    setSelectedFilter("All Diaries");
                    setShowFilters(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  All Diaries
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter("Pending Review");
                    setShowFilters(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Pending Review
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter("Approved");
                    setShowFilters(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Approved
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter("Revision Requested");
                    setShowFilters(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Revision Requested
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <ReportsSummaryCard
          icon="doc"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          value={diarySummary.total}
          label="Total Diaries"
          footer="This Month"
        />

        <ReportsSummaryCard
          icon="checkCircle"
          iconBg="bg-green-100"
          iconColor="text-green-600"
          value={diarySummary.approved}
          label="Approved"
          footer={
            diarySummary.total > 0
              ? `${((diarySummary.approved / diarySummary.total) * 100).toFixed(2)}%`
              : "0%"
          }
        />

        <ReportsSummaryCard
          icon="clock"
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
          value={diarySummary.pending}
          label="Pending Review"
          footer={
            diarySummary.total > 0
              ? `${((diarySummary.pending / diarySummary.total) * 100).toFixed(2)}%`
              : "0%"
          }
        />

        <ReportsSummaryCard
          icon="undo"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          value={diarySummary.revision}
          label="Revision Requested"
          footer={
            diarySummary.total > 0
              ? `${((diarySummary.revision / diarySummary.total) * 100).toFixed(2)}%`
              : "0%"
          }
        />

      </div>

      {/* Table + Preview Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 min-w-0">
          <DiaryTable
            diaries={diaries}
            onView={setSelectedDiary}
            selectedDiaryId={selectedDiary?.id}
            onApprove={handleApprove}
            onRequestRevision={handleRequestRevision}
            selectedFilter={selectedFilter}
          />
        </div>

        <div className="min-w-0">
          <DiaryPreviewPanel
            diary={selectedDiary}
            onClose={() => setSelectedDiary(null)}
            onApprove={handleApprove}
            onRequestRevision={handleRequestRevision}
          />
        </div>

      </div>

    </FacultyLayout>
  );
};

export default ApproveDiary;