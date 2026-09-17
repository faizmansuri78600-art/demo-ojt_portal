import React, { useEffect, useState } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import EvaluationStatCard from "../../components/faculty/EvaluationStatCard";
import EvaluationTable from "../../components/faculty/EvaluationTable";
import EvaluationSidePanel from "../../components/faculty/EvaluationSidePanel";
import EvaluationModal from "../../components/faculty/EvaluationModal";
import { Icon } from "../../components/faculty/facultyIcons";

import {
  evaluationSummary,
  evaluationCriteria,
  gradingScale,
} from "../../data/facultyDummydata";

const safeSummary = Array.isArray(evaluationSummary)
  ? evaluationSummary
  : [];

const safeCriteria = Array.isArray(evaluationCriteria)
  ? evaluationCriteria
  : [];

const safeGradingScale = Array.isArray(gradingScale)
  ? gradingScale
  : [];

const Evaluation = ({ onNavigate = () => {} }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Pending");

  const totalStudents = students.length;

  const evaluatedStudents = students.filter(
    (student) => student.status === "Evaluated"
  ).length;

  const pendingStudents = students.filter(
    (student) => student.status === "Pending"
  ).length;

const evaluatedPercentage =
  totalStudents > 0
    ? ((evaluatedStudents / totalStudents) * 100).toFixed(2)
    : "0.00";

const pendingPercentage =
  totalStudents > 0
    ? ((pendingStudents / totalStudents) * 100).toFixed(2)
    : "0.00";

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(
    `http://localhost:5000/api/evaluations/faculty/${user.facultyId}`
  )
      .then((response) => response.json())
      .then((data) => {
        console.log("Faculty Evaluation API:", data);

        if (data.success && Array.isArray(data.students)) {
          setStudents(data.students);
        }
      })
      .catch((error) => {
        console.error("Faculty Evaluation API Error:", error);
      });
  }, []);

  // Open Evaluation Modal
  const handleEvaluate = (student) => {
    setSelectedStudent(student);
  };

  // Refresh student data after evaluation is saved
  const handleEvaluationSaved = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(
    `http://localhost:5000/api/evaluations/faculty/${user.facultyId}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Evaluation Data Refreshed:", data);

      if (data.success && Array.isArray(data.students)) {
        setStudents(data.students);
      }
    })
    .catch((error) => {
      console.error("Evaluation Refresh Error:", error);
    });
};

  return (
    <FacultyLayout activeItem="evaluation" onNavigate={onNavigate}>
      
 {/* Heading + filters */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">

  <div>
    <h1 className="text-2xl font-bold text-gray-900">
      Evaluation
    </h1>

    <p className="text-gray-500 text-sm mt-1">
      Evaluate and grade students based on their OJT performance and competencies.
    </p>
  </div>

  <div className="flex items-center gap-3">

    {/* Batch Dropdown */}
    <div className="relative">
      <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
        <option>May 2025 Batch</option>
        <option>April 2025 Batch</option>
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
        <div className="absolute right-0 top-11 z-20 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2">

          <button
            onClick={() => {
              setSelectedFilter("All Students");
              setSelectedTab("all");
              setShowFilters(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            All Students
          </button>

          <button
            onClick={() => {
              setSelectedFilter("Evaluated");
              setSelectedTab("evaluated");
              setShowFilters(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Evaluated
          </button>

          <button
            onClick={() => {
              setSelectedFilter("Pending");
              setSelectedTab("pending");
              setShowFilters(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Pending
          </button>

        </div>
      )}

    </div>

  </div>
</div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
   {safeSummary.map((card) => {
  let dynamicCard = { ...card };

  if (card.id === 1) {
    dynamicCard.value = totalStudents;
  }

  if (card.id === 2) {
    dynamicCard.value = evaluatedStudents;
    dynamicCard.footer = `${evaluatedPercentage}%`;
  }

  if (card.id === 3) {
    dynamicCard.value = pendingStudents;
    dynamicCard.footer = `${pendingPercentage}%`;
  }
  if (card.id === 1) {
    dynamicCard.onLinkClick = () => setSelectedTab("all");
  }

  if (card.id === 2) {
    dynamicCard.onLinkClick = () => setSelectedTab("evaluated");
  }

  if (card.id === 3) {
    dynamicCard.onLinkClick = () => setSelectedTab("pending");
  }
  return (
    <EvaluationStatCard
      key={card.id}
      {...dynamicCard}
    />
  );
})}
      </div>

      {/* Table + side panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2">
          <EvaluationTable
            students={students}
            onEvaluate={handleEvaluate}
            selectedTab={selectedTab}
          />
        </div>

        <div>
          <EvaluationSidePanel
            criteria={safeCriteria}
            gradingScale={safeGradingScale}
          />
        </div>

      </div>

      {/* Evaluation Modal */}
      {selectedStudent && (
        <EvaluationModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSaved={handleEvaluationSaved}
        />
      )}

    </FacultyLayout>
  );
};

export default Evaluation;