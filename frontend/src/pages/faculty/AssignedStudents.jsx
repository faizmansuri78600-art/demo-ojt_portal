import React, { useState } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import StatCard from "../../components/faculty/StatCard";
import AssignedStudentsTable from "../../components/faculty/AssignedStudentsTable";
import {
  assignedStudentsStats,
  fullAssignedStudents,
  companyOptions,
  roleOptions,
  statusOptions,
} from "../../data/facultyDummydata";

const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const Select = ({ options }) => (
  <div className="relative">
    <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-600 w-full focus:outline-none focus:ring-2 focus:ring-blue-100">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
      <ChevronDownIcon />
    </span>
  </div>
);

const AssignedStudents = ({ onNavigate = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = searchTerm.trim() === ""
    ? fullAssignedStudents
    : fullAssignedStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <FacultyLayout activeItem="students" onNavigate={onNavigate}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Students</h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage all students assigned to you for OJT mentoring.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-800">
          <DownloadIcon />
          Export List
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {assignedStudentsStats.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="w-full lg:w-48">
            <Select options={companyOptions} />
          </div>
          <div className="w-full lg:w-44">
            <Select options={roleOptions} />
          </div>
          <div className="w-full lg:w-40">
            <Select options={statusOptions} />
          </div>

          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 whitespace-nowrap">
            <FilterIcon />
            Filters
          </button>
        </div>
      </div>

      <AssignedStudentsTable students={filteredStudents} totalCount={18} />
    </FacultyLayout>
  );
};

export default AssignedStudents;