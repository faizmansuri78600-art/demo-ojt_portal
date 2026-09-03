import React, { useState } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import ReportsSummaryCard from "../../components/faculty/ReportsSummaryCard";
import DiaryTable from "../../components/faculty/DiaryTable";
import DiaryPreviewPanel from "../../components/faculty/DiaryPreviewPanel";
import { Icon } from "../../components/faculty/facultyIcons";
import { diarySummary, diaryList } from "../../data/facultyDummydata";

const safeDiaryList = Array.isArray(diaryList) ? diaryList : [];
const safeDiarySummary = Array.isArray(diarySummary) ? diarySummary : [];

const ApproveDiary = ({ onNavigate = () => {} }) => {
  const [diaries, setDiaries] = useState(safeDiaryList);
  const [selectedDiary, setSelectedDiary] = useState(
    safeDiaryList.find((d) => d.id === 1) || null
  );

  const updateStatus = (id, status) => {
    setDiaries((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    setSelectedDiary((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  const handleApprove = (id) => updateStatus(id, "Approved");
  const handleRequestRevision = (id) => updateStatus(id, "Revision Requested");

  return (
    <FacultyLayout activeItem="approveDiary" onNavigate={onNavigate}>
      {/* Heading + filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approve Diary</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review student weekly diaries and approve or send back for revision.
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
        {safeDiarySummary.map((card) => (
          <ReportsSummaryCard key={card.id} {...card} />
        ))}
      </div>

      {/* Table + preview panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DiaryTable
            diaries={diaries}
            onView={setSelectedDiary}
            selectedDiaryId={selectedDiary?.id}
            onApprove={handleApprove}
            onRequestRevision={handleRequestRevision}
          />
        </div>
        <div>
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