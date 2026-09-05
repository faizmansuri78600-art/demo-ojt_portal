import { useState } from "react";

import {
  Users,
  UserCheck,
  UserPlus,
  GraduationCap,
  Search,
  Plus,
  Download,
  ChevronRight,
  MoreHorizontal,
  X,
  Mail,
  Phone,
  Building2,
  UserRound,
  Eye,
  Pencil,
} from "lucide-react";

import {
  students,
  studentStats,
  studentCourses,
  studentStatuses,
} from "../../mock/students";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusBadge({ status }) {
  const statusStyles = {
    "Active OJT": {
      background: "#ecfdf5",
      color: "#059669",
    },
    Selected: {
      background: "#eff6ff",
      color: "#2563eb",
    },
    "Under Review": {
      background: "#fff7ed",
      color: "#d97706",
    },
    Available: {
      background: "#f8fafc",
      color: "#64748b",
    },
    Completed: {
      background: "#f5f3ff",
      color: "#7c3aed",
    },
  };

  const current =
    statusStyles[status] || statusStyles.Available;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor: current.background,
        color: current.color,
        fontSize: "10px",
        lineHeight: "1",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "12px",
        border: "1px solid #eef2f7",
        borderRadius: "10px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          minWidth: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          backgroundColor: "#eff6ff",
          color: "#2563eb",
        }}
      >
        <Icon size={16} />
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: "#94a3b8",
            fontSize: "9px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </div>

        <div
          style={{
            marginTop: "4px",
            color: "#334155",
            fontSize: "11px",
            fontWeight: 650,
            wordBreak: "break-word",
          }}
        >
          {value || "Not Available"}
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          color: "#475569",
          fontSize: "11px",
          fontWeight: 700,
        }}
      >
        {label}
        {required ? " *" : ""}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          height: "40px",
          padding: "0 11px",
          border: "1px solid #dbe4ee",
          borderRadius: "8px",
          outline: "none",
          color: "#334155",
          fontSize: "11px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default function StudentManagement() {
  const [studentList, setStudentList] = useState(students);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  const [selectedCourse, setSelectedCourse] =
    useState("All Courses");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [actionStudent, setActionStudent] =
    useState(null);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    course: "BCA",
    year: "SY",
    email: "",
    phone: "",
    status: "Available",
    company: "Not Assigned",
    mentor: "Not Assigned",
  });

  const filteredStudents = studentList.filter(
    (student) => {
      const search =
        searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        student.name
          .toLowerCase()
          .includes(search) ||
        student.rollNo
          .toLowerCase()
          .includes(search) ||
        student.company
          .toLowerCase()
          .includes(search) ||
        student.mentor
          .toLowerCase()
          .includes(search);

      const matchesCourse =
        selectedCourse === "All Courses" ||
        student.course === selectedCourse;

      const matchesStatus =
        selectedStatus === "All Status" ||
        student.status === selectedStatus;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesStatus
      );
    }
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length / studentsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * studentsPerPage;
  (currentPage - 1) * studentsPerPage;

  const paginatedStudents =
    filteredStudents.slice(
      startIndex,
      startIndex + studentsPerPage
    );

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      rollNo: "",
      course: "BCA",
      year: "SY",
      email: "",
      phone: "",
      status: "Available",
      company: "Not Assigned",
      mentor: "Not Assigned",
    });
  };

  const handleAddStudent = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.rollNo.trim()
    ) {
      return;
    }

    const newStudent = {
      id:
        studentList.length > 0
          ? Math.max(
              ...studentList.map(
                (student) => student.id
              )
            ) + 1
          : 1,

      name: formData.name.trim(),
      rollNo: formData.rollNo.trim(),
      course: formData.course,
      year: formData.year,
      company:
        formData.company.trim() ||
        "Not Assigned",
      status: formData.status,
      mentor:
        formData.mentor.trim() ||
        "Not Assigned",
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    setStudentList((current) => [
      newStudent,
      ...current,
    ]);

    resetForm();
    setShowAddModal(false);
  };

  const handleExportStudents = () => {
    if (filteredStudents.length === 0) {
      return;
    }

    const headers = [
      "Name",
      "Roll No",
      "Course",
      "Year",
      "Email",
      "Phone",
      "Company",
      "Status",
      "Mentor",
    ];

    const escapeCsvValue = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredStudents.map((student) => [
      student.name,
      student.rollNo,
      student.course,
      student.year,
      student.email,
      student.phone,
      student.company,
      student.status,
      student.mentor,
    ]);

    const csvContent = [
      headers.map(escapeCsvValue).join(","),
      ...rows.map((row) =>
        row.map(escapeCsvValue).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `ojt-students-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openEditStudent = (student) => {
    setEditingStudent(student);

    setFormData({
      name: student.name || "",
      rollNo: student.rollNo || "",
      course: student.course || "BCA",
      year: student.year || "SY",
      email: student.email || "",
      phone: student.phone || "",
      status: student.status || "Available",
      company:
        student.company || "Not Assigned",
      mentor:
        student.mentor || "Not Assigned",
    });

    setActionStudent(null);
  };

  const handleEditStudent = (event) => {
    event.preventDefault();

    if (
      !editingStudent ||
      !formData.name.trim() ||
      !formData.rollNo.trim()
    ) {
      return;
    }

    const updatedStudent = {
      ...editingStudent,
      name: formData.name.trim(),
      rollNo: formData.rollNo.trim(),
      course: formData.course,
      year: formData.year,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      status: formData.status,
      company:
        formData.company.trim() ||
        "Not Assigned",
      mentor:
        formData.mentor.trim() ||
        "Not Assigned",
    };

    setStudentList((current) =>
      current.map((student) =>
        student.id === editingStudent.id
          ? updatedStudent
          : student
      )
    );

    setSelectedStudent((current) =>
      current?.id === editingStudent.id
        ? updatedStudent
        : current
    );

    setEditingStudent(null);
    resetForm();
  };

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        color: "#0f172a",
      }}
    >
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "12px",
          fontSize: "12px",
        }}
      >
        <span
          style={{
            color: "#2563eb",
            fontWeight: 700,
          }}
        >
          Dashboard
        </span>

        <ChevronRight
          size={14}
          color="#cbd5e1"
        />

        <span
          style={{
            color: "#64748b",
          }}
        >
          Student Management
        </span>
      </div>

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "6px",
              color: "#2563eb",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            OJT Management
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "32px",
              lineHeight: "1.1",
              fontWeight: 800,
              letterSpacing: "-0.8px",
            }}
          >
            Student Management
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#64748b",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            Manage students, OJT placement and
            mentor assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          style={{
            height: "42px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "0 15px",
            border: "none",
            borderRadius: "9px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow:
              "0 4px 10px rgba(37, 99, 235, 0.18)",
            whiteSpace: "nowrap",
          }}
        >
          <Plus size={17} />
          Add Student
        </button>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section
        className="student-management-stats"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        {studentStats.map((stat) => {
          const iconMap = {
            students: Users,
            active: UserCheck,
            available: UserPlus,
            completed: GraduationCap,
          };

          const toneMap = {
            blue: {
              background: "#eff6ff",
              color: "#2563eb",
            },
            green: {
              background: "#ecfdf5",
              color: "#059669",
            },
            orange: {
              background: "#fff7ed",
              color: "#ea580c",
            },
            purple: {
              background: "#f5f3ff",
              color: "#7c3aed",
            },
          };

          const Icon =
            iconMap[stat.icon] || Users;

          const tone =
            toneMap[stat.tone] ||
            toneMap.blue;

          return (
            <div
              key={stat.id}
              style={{
                minWidth: 0,
                padding: "16px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "13px",
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 2px 8px rgba(15, 23, 42, 0.035)",
              }}
            >
              <div
                style={{
                  width: "39px",
                  height: "39px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  backgroundColor:
                    tone.background,
                  color: tone.color,
                }}
              >
                <Icon size={19} />
              </div>

              <div
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {stat.title}
              </div>

              <div
                style={{
                  marginTop: "4px",
                  color: "#0f172a",
                  fontSize: "25px",
                  lineHeight: "1",
                  fontWeight: 800,
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: "#94a3b8",
                  fontSize: "9px",
                }}
              >
                {stat.subtitle}
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
          STUDENT LIST
      ====================================================== */}
      <section
        style={{
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          border:
            "1px solid #e2e8f0",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 2px 8px rgba(15, 23, 42, 0.035)",
        }}
      >
        <div
          style={{
            padding: "15px 18px",
            borderBottom:
              "1px solid #eef2f7",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "15px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#1e293b",
                  fontSize: "15px",
                  fontWeight: 750,
                }}
              >
                All Students
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                View and manage registered
                students
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportStudents}
              disabled={filteredStudents.length === 0}
              style={{
                height: "34px",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color:
                  filteredStudents.length === 0
                    ? "#cbd5e1"
                    : "#475569",
                fontSize: "10px",
                fontWeight: 650,
                cursor:
                  filteredStudents.length === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <Download size={14} />
              Export
            </button>
          </div>

          <div
            className="student-management-filters"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(240px, 1fr) auto auto",
              gap: "9px",
              marginTop: "14px",
            }}
          >
            <div
              style={{
                height: "38px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                boxSizing:
                  "border-box",
              }}
            >
              <Search
                size={16}
                color="#94a3b8"
              />

              <input
                type="text"
                placeholder="Search student name or roll number..."
                value={searchTerm}
               onChange={(event) => {
  setSearchTerm(event.target.value);
  setCurrentPage(1);
}}
                style={{
                  width: "100%",
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background:
                    "transparent",
                  color: "#334155",
                  fontSize: "11px",
                }}
              />
            </div>

            <select
              value={selectedCourse}
              onChange={(event) => {
  setSelectedCourse(event.target.value);
  setCurrentPage(1);
}}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {studentCourses.map(
                (course) => (
                  <option
                    key={course}
                    value={course}
                  >
                    {course}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedStatus}
              onChange={(event) => {
  setSelectedStatus(event.target.value);
  setCurrentPage(1);
}}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {studentStatuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div
          style={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "850px",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                {[
                  "Student",
                  "Roll No.",
                  "Course",
                  "Company",
                  "Status",
                  "Mentor",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding:
                        "10px 13px",
                      backgroundColor:
                        "#f8fafc",
                      borderBottom:
                        "1px solid #e2e8f0",
                      color: "#94a3b8",
                      fontSize: "9px",
                      fontWeight: 750,
                      textAlign: "left",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "0.45px",
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length >
              0 ? (
                paginatedStudents.map(
                  (student) => (
                    <tr key={student.id}>
                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "9px",
                          }}
                        >
                          <div
                            style={{
                              width:
                                "32px",
                              height:
                                "32px",
                              minWidth:
                                "32px",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              borderRadius:
                                "50%",
                              backgroundColor:
                                "#eff6ff",
                              color:
                                "#2563eb",
                              fontSize:
                                "9px",
                              fontWeight:
                                800,
                            }}
                          >
                            {getInitials(
                              student.name
                            )}
                          </div>

                          <div>
                            <strong
                              style={{
                                display:
                                  "block",
                                color:
                                  "#334155",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  700,
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              {
                                student.name
                              }
                            </strong>

                            <span
                              style={{
                                display:
                                  "block",
                                marginTop:
                                  "2px",
                                color:
                                  "#94a3b8",
                                fontSize:
                                  "9px",
                              }}
                            >
                              {
                                student.year
                              }
                            </span>
                          </div>
                        </div>
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#64748b",
                          fontSize:
                            "10px",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          student.rollNo
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#64748b",
                          fontSize:
                            "10px",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          student.course
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#64748b",
                          fontSize:
                            "10px",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          student.company
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <StatusBadge
                          status={
                            student.status
                          }
                        />
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            student.mentor ===
                            "Not Assigned"
                              ? "#94a3b8"
                              : "#64748b",
                          fontSize:
                            "10px",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          student.mentor
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          position:
                            "relative",
                        }}
                      >
                        <button
                          type="button"
                          title="Student actions"
                          onClick={() =>
                            setActionStudent(
                              (current) =>
                                current?.id ===
                                student.id
                                  ? null
                                  : student
                            )
                          }
                          style={{
                            width:
                              "30px",
                            height:
                              "30px",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            border:
                              "none",
                            borderRadius:
                              "7px",
                            backgroundColor:
                              "#f8fafc",
                            color:
                              "#64748b",
                            cursor:
                              "pointer",
                          }}
                        >
                          <MoreHorizontal
                            size={16}
                          />
                        </button>

                        {actionStudent?.id ===
                          student.id && (
                          <div
                            style={{
                              position:
                                "absolute",
                              right:
                                "13px",
                              top:
                                "46px",
                              zIndex:
                                20,
                              width:
                                "150px",
                              padding:
                                "5px",
                              border:
                                "1px solid #e2e8f0",
                              borderRadius:
                                "9px",
                              backgroundColor:
                                "#ffffff",
                              boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.12)",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStudent(
                                  student
                                );
                                setActionStudent(
                                  null
                                );
                              }}
                              style={{
                                width:
                                  "100%",
                                height:
                                  "34px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap:
                                  "9px",
                                padding:
                                  "0 9px",
                                border:
                                  "none",
                                borderRadius:
                                  "6px",
                                backgroundColor:
                                  "transparent",
                                color:
                                  "#475569",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  600,
                                cursor:
                                  "pointer",
                                textAlign:
                                  "left",
                              }}
                            >
                              <Eye size={14} />
                              View Student
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditStudent(
                                  student
                                )
                              }
                              style={{
                                width:
                                  "100%",
                                height:
                                  "34px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap:
                                  "9px",
                                padding:
                                  "0 9px",
                                border:
                                  "none",
                                borderRadius:
                                  "6px",
                                backgroundColor:
                                  "transparent",
                                color:
                                  "#475569",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  600,
                                cursor:
                                  "pointer",
                                textAlign:
                                  "left",
                              }}
                            >
                              <Pencil size={14} />
                              Edit Student
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      padding:
                        "45px 20px",
                      textAlign:
                        "center",
                      color:
                        "#94a3b8",
                      fontSize:
                        "11px",
                    }}
                  >
                    No students found
                    matching your
                    search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div
          style={{
            minHeight: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "10px 16px",
            borderTop: "1px solid #eef2f7",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              color: "#94a3b8",
              fontSize: "10px",
            }}
          >
            Showing {filteredStudents.length === 0 ? 0 : startIndex + 1}
            {filteredStudents.length > 0 &&
              `–${Math.min(
                startIndex + studentsPerPage,
                filteredStudents.length
              )}`}{" "}
            of {filteredStudents.length} students
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid #e2e8f0",
                borderRadius: "7px",
                backgroundColor: "#ffffff",
                color: currentPage === 1 ? "#cbd5e1" : "#64748b",
                fontSize: "13px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={{
                  width: "30px",
                  height: "30px",
                  border:
                    currentPage === page
                      ? "none"
                      : "1px solid #e2e8f0",
                  borderRadius: "7px",
                  backgroundColor:
                    currentPage === page ? "#2563eb" : "#ffffff",
                  color:
                    currentPage === page ? "#ffffff" : "#64748b",
                  fontSize: "10px",
                  fontWeight: currentPage === page ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid #e2e8f0",
                borderRadius: "7px",
                backgroundColor: "#ffffff",
                color:
                  currentPage === totalPages ? "#cbd5e1" : "#64748b",
                fontSize: "13px",
                cursor:
                  currentPage === totalPages
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          ADD STUDENT MODAL
      ====================================================== */}
      {showAddModal && (
        <div
          onClick={() =>
            setShowAddModal(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor:
              "rgba(15, 23, 42, 0.45)",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "620px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 20px",
                borderBottom:
                  "1px solid #eef2f7",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#1e293b",
                    fontSize: "18px",
                    fontWeight: 800,
                  }}
                >
                  Add New Student
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#94a3b8",
                    fontSize: "11px",
                  }}
                >
                  Enter student information
                  below.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(false)
                }
                style={{
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            <StudentForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleAddStudent}
              onCancel={() =>
                setShowAddModal(false)
              }
              submitText="Add Student"
            />
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW STUDENT MODAL
      ====================================================== */}
      {selectedStudent && (
        <div
          onClick={() =>
            setSelectedStudent(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor:
              "rgba(15, 23, 42, 0.45)",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "560px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 20px",
                borderBottom:
                  "1px solid #eef2f7",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    minWidth: "46px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    fontSize: "13px",
                    fontWeight: 800,
                  }}
                >
                  {getInitials(
                    selectedStudent.name
                  )}
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#1e293b",
                      fontSize: "18px",
                      fontWeight: 800,
                    }}
                  >
                    {selectedStudent.name}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      marginTop: "5px",
                    }}
                  >
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "10px",
                      }}
                    >
                      {selectedStudent.rollNo}
                    </span>

                    <span
                      style={{
                        color: "#cbd5e1",
                      }}
                    >
                      •
                    </span>

                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "10px",
                      }}
                    >
                      {selectedStudent.course}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedStudent(null)
                }
                style={{
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            <div
              style={{
                padding: "16px 20px",
                borderBottom:
                  "1px solid #eef2f7",
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "9px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: "7px",
                }}
              >
                OJT Status
              </div>

              <StatusBadge
                status={selectedStudent.status}
              />
            </div>

            <div
              style={{
                padding: "18px 20px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  color: "#334155",
                  fontSize: "13px",
                  fontWeight: 750,
                }}
              >
                Student Information
              </h3>

              <div
                className="student-view-details"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "10px",
                }}
              >
                <DetailItem
                  icon={Users}
                  label="Roll Number"
                  value={
                    selectedStudent.rollNo
                  }
                />

                <DetailItem
                  icon={GraduationCap}
                  label="Course"
                  value={`${selectedStudent.course} • ${selectedStudent.year}`}
                />

                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={
                    selectedStudent.email
                  }
                />

                <DetailItem
                  icon={Phone}
                  label="Phone"
                  value={
                    selectedStudent.phone
                  }
                />

                <DetailItem
                  icon={Building2}
                  label="Company"
                  value={
                    selectedStudent.company
                  }
                />

                <DetailItem
                  icon={UserRound}
                  label="Mentor"
                  value={
                    selectedStudent.mentor
                  }
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "14px 20px",
                borderTop:
                  "1px solid #eef2f7",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedStudent(null)
                }
                style={{
                  height: "38px",
                  padding: "0 16px",
                  border:
                    "1px solid #dbe4ee",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  color: "#475569",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT STUDENT MODAL
      ====================================================== */}
      {editingStudent && (
        <div
          onClick={() =>
            setEditingStudent(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100002,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor:
              "rgba(15, 23, 42, 0.45)",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "620px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 20px",
                borderBottom:
                  "1px solid #eef2f7",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#1e293b",
                    fontSize: "18px",
                    fontWeight: 800,
                  }}
                >
                  Edit Student
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#94a3b8",
                    fontSize: "11px",
                  }}
                >
                  Update student information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingStudent(null)
                }
                style={{
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            <StudentForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleEditStudent}
              onCancel={() =>
                setEditingStudent(null)
              }
              submitText="Save Changes"
              isEditing
            />
          </div>
        </div>
      )}

      {/* =====================================================
          RESPONSIVE
      ====================================================== */}
      <style>
        {`
          @media (max-width: 1100px) {
            .student-management-stats {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 700px) {
            .student-management-stats {
              grid-template-columns: 1fr !important;
            }

            .student-management-filters {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 520px) {
            .student-view-details {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

/* =========================================================
   REUSABLE STUDENT FORM
========================================================= */

function StudentForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitText,
}) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "15px",
        }}
      >
        <div
          style={{
            gridColumn: "1 / -1",
          }}
        >
          <FormInput
            label="Student Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <FormInput
          label="Roll Number"
          name="rollNo"
          value={formData.rollNo}
          onChange={onChange}
          placeholder="e.g. BCA011"
          required
        />

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#475569",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Course
          </label>

          <select
            name="course"
            value={formData.course}
            onChange={onChange}
            style={{
              width: "100%",
              height: "40px",
              padding: "0 11px",
              border:
                "1px solid #dbe4ee",
              borderRadius: "8px",
              outline: "none",
              backgroundColor: "#ffffff",
              color: "#334155",
              fontSize: "11px",
              boxSizing: "border-box",
            }}
          >
            {studentCourses
              .filter(
                (course) =>
                  course !== "All Courses"
              )
              .map((course) => (
                <option
                  key={course}
                  value={course}
                >
                  {course}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#475569",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Year
          </label>

          <select
            name="year"
            value={formData.year}
            onChange={onChange}
            style={{
              width: "100%",
              height: "40px",
              padding: "0 11px",
              border:
                "1px solid #dbe4ee",
              borderRadius: "8px",
              outline: "none",
              backgroundColor: "#ffffff",
              color: "#334155",
              fontSize: "11px",
              boxSizing: "border-box",
            }}
          >
            <option value="FY">
              FY
            </option>
            <option value="SY">
              SY
            </option>
            <option value="TY">
              TY
            </option>
          </select>
        </div>

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="student@example.com"
        />

        <FormInput
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="Enter phone number"
        />

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#475569",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            OJT Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            style={{
              width: "100%",
              height: "40px",
              padding: "0 11px",
              border:
                "1px solid #dbe4ee",
              borderRadius: "8px",
              outline: "none",
              backgroundColor: "#ffffff",
              color: "#334155",
              fontSize: "11px",
              boxSizing: "border-box",
            }}
          >
            {studentStatuses
              .filter(
                (status) =>
                  status !== "All Status"
              )
              .map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
          </select>
        </div>

        <FormInput
          label="Company"
          name="company"
          value={formData.company}
          onChange={onChange}
          placeholder="Company name"
        />

        <div
          style={{
            gridColumn: "1 / -1",
          }}
        >
          <FormInput
            label="Mentor"
            name="mentor"
            value={formData.mentor}
            onChange={onChange}
            placeholder="Mentor name"
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "9px",
          marginTop: "22px",
          paddingTop: "16px",
          borderTop:
            "1px solid #eef2f7",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            height: "38px",
            padding: "0 14px",
            border:
              "1px solid #dbe4ee",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            color: "#64748b",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          style={{
            height: "38px",
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "0 15px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Pencil size={14} />
          {submitText}
        </button>
      </div>
    </form>
  );
}
