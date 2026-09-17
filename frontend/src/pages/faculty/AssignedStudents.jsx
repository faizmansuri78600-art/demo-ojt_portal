import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FacultyLayout from "../../components/faculty/FacultyLayout";
import StatCard from "../../components/faculty/StatCard";
import AssignedStudentsTable from "../../components/faculty/AssignedStudentsTable";
import { assignedStudentsStats } from "../../data/facultyDummydata";

const SearchIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const FilterIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M7 12h10M10 18h4"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
    />
  </svg>
);

const Select = ({ value, onChange, options, placeholder }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-600 w-full focus:outline-none focus:ring-2 focus:ring-blue-100"
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
      <ChevronDownIcon />
    </span>
  </div>
);

const AssignedStudents = ({ onNavigate = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const facultyId = user?.facultyId;

  if (!facultyId) {
    console.error("Faculty ID not found");
    return;
  }

  fetch(`http://localhost:5000/api/faculty/assigned-students/${facultyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Assigned Students Data:", data);
if (data.success) {
  setStudents(data.assignedStudents);
  setTotalCount(data.count);
}
    })
    .catch((error) => {
      console.error("Assigned Students API Error:", error);
    });
}, []);

  // Dynamic Company options
  const companyOptions = [
    ...new Set(
      students
        .map((student) => student.companyName || student.company)
        .filter(Boolean)
    ),
  ];

  // Dynamic Role options
  const roleOptions = [
    ...new Set(
      students
        .map((student) => student.role)
        .filter(Boolean)
    ),
  ];

  // Dynamic Status options
  const statusOptions = [
    ...new Set(
      students
        .map((student) => student.status)
        .filter(Boolean)
    ),
  ];

  // Search + Company + Role + Status filters
  const filteredStudents = students.filter((student) => {
    const studentName = student.studentName || student.name || "";
    const companyName = student.companyName || student.company || "";

    const matchesSearch = studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCompany =
      selectedCompany === "" || companyName === selectedCompany;

    const matchesRole =
      selectedRole === "" || student.role === selectedRole;

    const matchesStatus =
      selectedStatus === "" || student.status === selectedStatus;

    return (
      matchesSearch &&
      matchesCompany &&
      matchesRole &&
      matchesStatus
    );
  });

  // Export current filtered list as CSV
  const handleExport = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to export.");
      return;
    }

    const headers = [
      "Student Name",
      "Company",
      "OJT Role",
      "Start Date",
      "End Date",
      "Progress",
      "Status",
    ];

    const rows = filteredStudents.map((student) => {
      const studentName = student.studentName || student.name || "N/A";
      const companyName =
        student.companyName || student.company || "N/A";

      const progress =
        student.progress !== undefined ? student.progress : 0;

      return [
        studentName,
        companyName,
        student.role || "N/A",
        student.startDate || "N/A",
        student.endDate || "N/A",
        `${progress}%`,
        student.status || "N/A",
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "assigned_students.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCompany("");
    setSelectedRole("");
    setSelectedStatus("");
  };

  return (
    <FacultyLayout activeItem="students" onNavigate={onNavigate}>
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Assigned Students
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            View and manage all students assigned to you for OJT mentoring.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-800"
        >
          <DownloadIcon />
          Export List
        </button>
      </div>

      {/* Stat Cards */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  {assignedStudentsStats.map((card) => {
    let dynamicValue = 0;

    if (card.id === 1) {
      dynamicValue = students.length;
    }

    if (card.id === 2) {
      dynamicValue = students.filter(
        (student) => student.status === "Ongoing"
      ).length;
    }

    if (card.id === 3) {
      dynamicValue = students.filter(
        (student) => student.status === "Yet to Start"
      ).length;
    }

    if (card.id === 4) {
      dynamicValue = students.filter(
        (student) => student.status === "Completed"
      ).length;
    }

    return (
      <StatCard
        key={card.id}
        {...card}
        value={dynamicValue}
      />
    );
  })}
</div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">

          {/* Search */}
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

          {/* Company */}
          <div className="w-full lg:w-48">
            <Select
              value={selectedCompany}
              onChange={setSelectedCompany}
              options={companyOptions}
              placeholder="All Companies"
            />
          </div>

          {/* Role */}
          <div className="w-full lg:w-44">
            <Select
              value={selectedRole}
              onChange={setSelectedRole}
              options={roleOptions}
              placeholder="All OJT Roles"
            />
          </div>

          {/* Status */}
          <div className="w-full lg:w-40">
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statusOptions}
              placeholder="All Status"
            />
          </div>

          {/* Filters button */}
          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 whitespace-nowrap"
          >
            <FilterIcon />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <AssignedStudentsTable
        students={filteredStudents}
        totalCount={totalCount}
        onView={(student) =>
          navigate(`/faculty/StudentDetails/${student.studentId}`)
        }
      />
    </FacultyLayout>
  );
};

export default AssignedStudents;