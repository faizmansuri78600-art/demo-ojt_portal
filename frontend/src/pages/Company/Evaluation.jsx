import React, { useMemo, useState } from "react";
import { Plus, FileDown } from "lucide-react";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";

import EvaluationStatsCards from "../../components/company/EvaluationStatsCards";
import EvaluationFiltersBar from "../../components/company/EvaluationFiltersBar";
import EvaluationTable from "../../components/company/EvaluationTable";
import StudentEvaluationPanel from "../../components/company/StudentEvaluationPanel";

import {
  evaluationStats,
  evaluationStudents,
  opportunityOptions,
  departmentOptions,
  statusOptions,
} from "../../components/company/evaluationData";

const PER_PAGE_DEFAULT = 10;

const Evaluation = () => {
  const [filters, setFilters] = useState({
    search: "",
    opportunity: "All Opportunities",
    department: "All Departments",
    status: "All Status",
  });
  const [activeTab, setActiveTab] = useState("list");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_DEFAULT);
  const [selectedId, setSelectedId] = useState(
    evaluationStudents[0] ? evaluationStudents[0].id : null
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      opportunity: "All Opportunities",
      department: "All Departments",
      status: "All Status",
    });
    setPage(1);
  };

  const filteredStudents = useMemo(() => {
    return evaluationStudents.filter((s) => {
      const matchesSearch = s.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesOpportunity =
        filters.opportunity === "All Opportunities" ||
        s.opportunity === filters.opportunity;
      const matchesDepartment =
        filters.department === "All Departments" ||
        s.department === filters.department;
      const matchesStatus =
        filters.status === "All Status" || s.status === filters.status;
      return (
        matchesSearch && matchesOpportunity && matchesDepartment && matchesStatus
      );
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / perPage));
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const selectedStudent =
    evaluationStudents.find((s) => s.id === selectedId) || null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <CompanyHeader />

        <main className="flex-1 p-4 md:p-6 space-y-5">
          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Evaluation</h1>
              <p className="text-sm text-gray-400">
                Evaluate students' performance during their OJT internship.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                <Plus size={15} /> New Evaluation
              </button>
              <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <FileDown size={15} /> Export Report
              </button>
            </div>
          </div>

          {/* Stats */}
          <EvaluationStatsCards stats={evaluationStats} />

          {/* Content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4">
                <EvaluationFiltersBar
                  filters={filters}
                  onChange={handleFilterChange}
                  onReset={handleReset}
                  opportunities={opportunityOptions}
                  departments={departmentOptions}
                  statuses={statusOptions}
                />
              </div>

              <EvaluationTable
                students={paginatedStudents}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                selectedId={selectedId}
                onSelect={(s) => setSelectedId(s.id)}
                page={page}
                totalPages={totalPages}
                totalEntries={filteredStudents.length}
                perPage={perPage}
                onPageChange={setPage}
                onPerPageChange={(n) => {
                  setPerPage(n);
                  setPage(1);
                }}
              />
            </div>

            <div className="xl:col-span-1">
              <StudentEvaluationPanel
                student={selectedStudent}
                onEdit={() => console.log("Edit evaluation", selectedStudent?.id)}
                onDelete={() =>
                  console.log("Delete evaluation", selectedStudent?.id)
                }
              />
            </div>
          </div>
        </main>

        <CompanyFooter />
      </div>
    </div>
  );
};

export default Evaluation;