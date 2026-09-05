import React, { useMemo, useState } from "react";
import { Plus, FileDown, X, Download } from "lucide-react";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";

import EvaluationStatsCards from "../../components/Company/EvaluationStatsCards";
import EvaluationFiltersBar from "../../components12/Company/EvaluationFiltersBar";
import EvaluationTable from "../../components12/Company/EvaluationTable";
import StudentEvaluationPanel from "../../components12/Company/StudentEvaluationPanel";

import {
  evaluationStats,
  evaluationStudents as initialStudents,
  opportunityOptions,
  departmentOptions,
  statusOptions,
} from "../../Components12/company2/evaluationData";

const PER_PAGE_DEFAULT = 10;
const STORAGE_KEY = "ojt_evaluation_students";

// ✅ Formats a Date as "09-sep-2026" (day-month-year, lowercase, hyphenated).
function formatDateShort(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// ✅ Load persisted students (if any) so added/edited/deleted rows
// survive a page refresh or component remount, instead of resetting
// back to the static seed data every time.
function loadPersistedStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Could not read persisted evaluation students:", e);
  }
  return initialStudents;
}

function NewEvaluationModal({ open, onClose, onCreate, opportunities, departments }) {
  const blankForm = {
    name: "",
    email: "",
    phone: "",
    gender: "Male", // ✅ new field, drives avatar selection
    opportunity: opportunities?.[1] || "",
    department: departments?.[1] || "",
    status: "Pending",
  };
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (open) {
      setForm(blankForm);
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("Student name is required.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }
    onCreate({
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      gender: form.gender, // ✅ passed through so avatar matches
      opportunity: form.opportunity,
      department: form.department,
      status: form.status,
      evaluatedOn:
        form.status === "Pending"
          ? "-"
          : formatDateShort(new Date()),
      overallRating: null,
      comments: "",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
          <h3 className="text-sm font-semibold text-gray-800">
            New Evaluation
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 min-h-0 p-5 space-y-4 text-xs">
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="student@email.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 00000 00000"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            />
          </div>

          {/* ✅ New: Gender field, used to pick a matching avatar */}
          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Internship / Opportunity
            </label>
            <select
              value={form.opportunity}
              onChange={(e) => update("opportunity", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            >
              {opportunities
                ?.filter((o) => o !== "All Opportunities")
                .map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Department
            </label>
            <select
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            >
              {departments
                ?.filter((d) => d !== "All Departments")
                .map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300"
            >
              <option>Pending</option>
              <option>Evaluated</option>
            </select>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}

function ExportPreviewModal({ open, onClose, onConfirm, students }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Export Preview
            </h3>
            <p className="text-xs text-gray-400">
              {students.length} record{students.length !== 1 ? "s" : ""} will
              be exported
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-auto flex-1 min-h-0 p-5">
          {students.length === 0 ? (
            <p className="text-xs text-gray-400">
              No records match the current filters.
            </p>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="py-2 pr-3 font-medium">Name</th>
                  <th className="py-2 pr-3 font-medium">Opportunity</th>
                  <th className="py-2 pr-3 font-medium">Department</th>
                  <th className="py-2 pr-3 font-medium">Evaluated On</th>
                  <th className="py-2 pr-3 font-medium">Rating</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50">
                    <td className="py-2 pr-3 text-gray-700">{s.name}</td>
                    <td className="py-2 pr-3 text-gray-500">
                      {typeof s.opportunity === "object"
                        ? s.opportunity?.label
                        : s.opportunity}
                    </td>
                    <td className="py-2 pr-3 text-gray-500">
                      {s.department}
                    </td>
                    <td className="py-2 pr-3 text-gray-500">
                      {s.evaluatedOn || "-"}
                    </td>
                    <td className="py-2 pr-3 text-gray-500">
                      {s.overallRating ?? "-"}
                    </td>
                    <td className="py-2 pr-3 text-gray-500">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={students.length === 0}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-3.5 h-3.5" />
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}

const Evaluation = () => {
  const [students, setStudents] = useState(loadPersistedStudents);

  // ✅ Persist to localStorage any time the list changes (add/edit/delete)
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.warn("Could not persist evaluation students:", e);
    }
  }, [students]);

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
    students[0] ? students[0].id : null
  );
  const [newEvalOpen, setNewEvalOpen] = useState(false);
  const [exportPreviewOpen, setExportPreviewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

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
    return students.filter((s) => {
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
        matchesSearch &&
        matchesOpportunity &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [students, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / perPage)
  );

  const paginatedStudents = filteredStudents.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const selectedStudent =
    students.find((s) => s.id === selectedId) || null;

  const handleEditEvaluation = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === updatedStudent.id ? { ...s, ...updatedStudent } : s
      )
    );
  };

  const handleDeleteEvaluation = (studentToDelete) => {
    setStudents((prev) =>
      prev.filter((s) => s.id !== studentToDelete.id)
    );
    setSelectedId((prev) =>
      prev === studentToDelete.id ? null : prev
    );
  };

  // ✅ New Evaluation: opens a form modal instead of a bare prompt
  const handleCreateEvaluation = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    setSelectedId(newStudent.id);
    setNewEvalOpen(false);
    alert("New evaluation created!");
  };

  // ✅ Export Report: opens a preview first; actual download happens on confirm
  const handleConfirmExport = () => {
    const header = [
      "Name",
      "Opportunity",
      "Department",
      "Evaluated On",
      "Rating",
      "Status",
    ];

    const rows = filteredStudents.map((s) => [
      s.name,
      typeof s.opportunity === "object"
        ? s.opportunity?.label
        : s.opportunity,
      s.department,
      s.evaluatedOn || "-",
      s.overallRating ?? "-",
      s.status,
    ]);

    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "evaluation-report.csv";
    a.style.display = "none";
    document.body.appendChild(a); // some browsers won't fire click() on a detached <a>
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    setExportPreviewOpen(false);

    alert("Report exported!");
  };

  // ✅ New: pencil icon in the table now opens the same edit modal as the side panel
  const handleTableEditClick = (student) => {
    setSelectedId(student.id);
    setEditOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompznySidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <CompanyHeader />

        <main className="flex-1 p-4 md:p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Evaluation
              </h1>

              <p className="text-sm text-gray-400">
                Evaluate students' performance during their OJT internship.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setNewEvalOpen(true)}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={15} /> New Evaluation
              </button>

              <button
                onClick={() => setExportPreviewOpen(true)}
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <FileDown size={15} /> Export Report
              </button>
            </div>
          </div>

          <EvaluationStatsCards stats={evaluationStats} />

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
                onEditClick={handleTableEditClick} // ✅ this was missing before
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
                onEdit={handleEditEvaluation}
                onDelete={handleDeleteEvaluation}
                editOpen={editOpen}
                onEditOpenChange={setEditOpen}
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <NewEvaluationModal
        open={newEvalOpen}
        onClose={() => setNewEvalOpen(false)}
        onCreate={handleCreateEvaluation}
        opportunities={opportunityOptions}
        departments={departmentOptions}
      />

      <ExportPreviewModal
        open={exportPreviewOpen}
        onClose={() => setExportPreviewOpen(false)}
        onConfirm={handleConfirmExport}
        students={filteredStudents}
      />
    </div>
  );
};

export default Evaluation;