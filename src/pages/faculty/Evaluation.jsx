import React from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import EvaluationStatCard from "../../components/faculty/EvaluationStatCard";
import EvaluationTable from "../../components/faculty/EvaluationTable";
import EvaluationSidePanel from "../../components/faculty/EvaluationSidePanel";
import { Icon } from "../../components/faculty/facultyIcons";
import {
  evaluationSummary,
  evaluationStudents,
  evaluationCriteria,
  gradingScale,
} from "../../data/facultyDummydata";

const safeSummary = Array.isArray(evaluationSummary) ? evaluationSummary : [];
const safeStudents = Array.isArray(evaluationStudents) ? evaluationStudents : [];
const safeCriteria = Array.isArray(evaluationCriteria) ? evaluationCriteria : [];
const safeGradingScale = Array.isArray(gradingScale) ? gradingScale : [];

const Evaluation = ({ onNavigate = () => {} }) => {
  const handleEvaluate = (student) => {
    // Hook this up to an Evaluate screen/modal later — no backend yet
    console.log("Evaluate clicked for:", student.name);
  };

  return (
    <FacultyLayout activeItem="evaluation" onNavigate={onNavigate}>
      {/* Heading + filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluation</h1>
          <p className="text-gray-500 text-sm mt-1">
            Evaluate and grade students based on their OJT performance and competencies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option>May 2025 Batch</option>
              <option>April 2025 Batch</option>
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
        {safeSummary.map((card) => (
          <EvaluationStatCard key={card.id} {...card} />
        ))}
      </div>

      {/* Table + side panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <EvaluationTable students={safeStudents} onEvaluate={handleEvaluate} />
        </div>
        <div>
          <EvaluationSidePanel criteria={safeCriteria} gradingScale={safeGradingScale} />
        </div>
      </div>
    </FacultyLayout>
  );
};
export default Evaluation;