import { useMemo, useState } from "react";

import {
  Search,
  Filter,
  Eye,
  Download,
  MoreHorizontal,
  FileText,
  Users,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertCircle,
  TrendingUp,
  UserCheck,
  X,
  ChevronRight,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const reportData = [
  {
    id: 1,
    student: "Aman Verma",
    initials: "AV",
    company: "Tech Solutions Inc.",
    position: "Web Developer Intern",
    mentor: "Rajesh Kumar",
    startDate: "01 May 2026",
    endDate: "31 July 2026",
    progress: 78,
    attendance: 94,
    mentorFeedback: "Submitted",
    completion: "In Progress",
    department: "Web Development",
  },
  {
    id: 2,
    student: "Riya Shah",
    initials: "RS",
    company: "DataMind Pvt. Ltd.",
    position: "Data Analyst Intern",
    mentor: "Priya Iyer",
    startDate: "05 May 2026",
    endDate: "05 August 2026",
    progress: 72,
    attendance: 91,
    mentorFeedback: "Submitted",
    completion: "In Progress",
    department: "Data Analytics",
  },
  {
    id: 3,
    student: "Aditya Patel",
    initials: "AP",
    company: "Creative Media",
    position: "UI/UX Design Intern",
    mentor: "Amit Verma",
    startDate: "10 April 2026",
    endDate: "10 July 2026",
    progress: 100,
    attendance: 97,
    mentorFeedback: "Submitted",
    completion: "Completed",
    department: "UI/UX Design",
  },
  {
    id: 4,
    student: "Sneha Joshi",
    initials: "SJ",
    company: "CloudTech Solutions",
    position: "Cloud Intern",
    mentor: "Vivek Singh",
    startDate: "15 May 2026",
    endDate: "15 August 2026",
    progress: 65,
    attendance: 88,
    mentorFeedback: "Pending",
    completion: "In Progress",
    department: "Cloud Computing",
  },
  {
    id: 5,
    student: "Rahul Mehta",
    initials: "RM",
    company: "Innovatech Labs",
    position: "Software Developer Intern",
    mentor: "Neha Kapoor",
    startDate: "01 June 2026",
    endDate: "31 August 2026",
    progress: 48,
    attendance: 82,
    mentorFeedback: "Pending",
    completion: "Needs Attention",
    department: "Software Development",
  },
  {
    id: 6,
    student: "Neha Singh",
    initials: "NS",
    company: "SecureNet Pvt. Ltd.",
    position: "Cyber Security Intern",
    mentor: "Sanjay Shah",
    startDate: "01 May 2026",
    endDate: "31 July 2026",
    progress: 100,
    attendance: 96,
    mentorFeedback: "Submitted",
    completion: "Completed",
    department: "Cyber Security",
  },
  {
    id: 7,
    student: "Karan Mehta",
    initials: "KM",
    company: "Deloitte",
    position: "Business Analyst Intern",
    mentor: "Anjali Desai",
    startDate: "10 May 2026",
    endDate: "10 August 2026",
    progress: 70,
    attendance: 90,
    mentorFeedback: "Submitted",
    completion: "In Progress",
    department: "Business Analytics",
  },
  {
    id: 8,
    student: "Ishita Shah",
    initials: "IS",
    company: "HCLTech",
    position: "Software Engineer Intern",
    mentor: "Rohan Kulkarni",
    startDate: "15 April 2026",
    endDate: "15 July 2026",
    progress: 100,
    attendance: 98,
    mentorFeedback: "Submitted",
    completion: "Completed",
    department: "Software Development",
  },
];

const companies = [
  "All Companies",
  "Tech Solutions Inc.",
  "DataMind Pvt. Ltd.",
  "Creative Media",
  "CloudTech Solutions",
  "Innovatech Labs",
  "SecureNet Pvt. Ltd.",
  "Deloitte",
  "HCLTech",
];

const reportTypes = [
  "All Reports",
  "Student Report",
  "Company Report",
  "Attendance Report",
  "Progress Report",
];

const completionStatuses = [
  "All Status",
  "In Progress",
  "Completed",
  "Needs Attention",
];

function CompletionBadge({ status }) {
  const styles = {
    Completed: {
      background: "#ecfdf5",
      color: "#059669",
    },
    "In Progress": {
      background: "#eff6ff",
      color: "#2563eb",
    },
    "Needs Attention": {
      background: "#fef2f2",
      color: "#dc2626",
    },
  };

  const style =
    styles[status] || {
      background: "#f8fafc",
      color: "#64748b",
    };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor: style.background,
        color: style.color,
        fontSize: "9px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {status === "Completed" ? (
        <CheckCircle2 size={11} />
      ) : status === "Needs Attention" ? (
        <AlertCircle size={11} />
      ) : (
        <Clock3 size={11} />
      )}

      {status}
    </span>
  );
}

function FeedbackBadge({ value }) {
  const submitted = value === "Submitted";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        color: submitted ? "#059669" : "#d97706",
        fontSize: "9px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {submitted ? (
        <CheckCircle2 size={12} />
      ) : (
        <Clock3 size={12} />
      )}

      {value}
    </span>
  );
}

function ProgressBar({ value }) {
  const progressColor =
    value >= 85
      ? "#059669"
      : value < 50
      ? "#dc2626"
      : "#2563eb";

  return (
    <div style={{ width: "100%", minWidth: "75px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <span
          style={{
            color: "#334155",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          {value}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "5px",
          overflow: "hidden",
          borderRadius: "999px",
          backgroundColor: "#e2e8f0",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: "999px",
            backgroundColor: progressColor,
          }}
        />
      </div>
    </div>
  );
}

function Modal({ children, onClose, width = "650px" }) {
  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 20px 50px rgba(15, 23, 42, 0.18)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "15px",
        padding: "18px 20px",
        borderBottom: "1px solid #eef2f7",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#1e293b",
            fontSize: "17px",
            fontWeight: 750,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            color: "#94a3b8",
            fontSize: "11px",
          }}
        >
          {subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{
          width: "32px",
          height: "32px",
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
        <X size={16} />
      </button>
    </div>
  );
}

export default function OJTReports() {
  const [reports, setReports] = useState(reportData);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCompany, setSelectedCompany] =
    useState("All Companies");

  const [selectedReportType, setSelectedReportType] =
    useState("All Reports");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const [actionId, setActionId] = useState(null);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const reportsPerPage = 5;

  const filteredReports = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !search ||
        report.student.toLowerCase().includes(search) ||
        report.company.toLowerCase().includes(search) ||
        report.mentor.toLowerCase().includes(search) ||
        report.position.toLowerCase().includes(search);

      const matchesCompany =
        selectedCompany === "All Companies" ||
        report.company === selectedCompany;

      const matchesStatus =
        selectedStatus === "All Status" ||
        report.completion === selectedStatus;

      let matchesType = true;

      if (selectedReportType === "Student Report") {
        matchesType = true;
      }

      if (selectedReportType === "Company Report") {
        matchesType = true;
      }

      if (selectedReportType === "Attendance Report") {
        matchesType = report.attendance < 95;
      }

      if (selectedReportType === "Progress Report") {
        matchesType = report.progress < 100;
      }

      return (
        matchesSearch &&
        matchesCompany &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    reports,
    searchTerm,
    selectedCompany,
    selectedReportType,
    selectedStatus,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredReports.length / reportsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * reportsPerPage;

  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + reportsPerPage
  );

  const totalStudents = reports.length;

  const completedStudents = reports.filter(
    (report) => report.completion === "Completed"
  ).length;

  const attentionStudents = reports.filter(
    (report) =>
      report.completion === "Needs Attention"
  ).length;

  const feedbackPending = reports.filter(
    (report) => report.mentorFeedback === "Pending"
  ).length;

  const averageProgress =
    totalStudents === 0
      ? 0
      : Math.round(
          reports.reduce(
            (sum, report) => sum + report.progress,
            0
          ) / totalStudents
        );

  const averageAttendance =
    totalStudents === 0
      ? 0
      : Math.round(
          reports.reduce(
            (sum, report) => sum + report.attendance,
            0
          ) / totalStudents
        );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCompany("All Companies");
    setSelectedReportType("All Reports");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const generateReport = (report) => {
    setSelectedReport(report);
    setActionId(null);
  };

  const handleDownload = (report) => {
    setActionId(null);

    const reportText = `
AISC OJT PORTAL
OJT STUDENT REPORT

Student: ${report.student}
Company: ${report.company}
Position: ${report.position}
Mentor: ${report.mentor}
Department: ${report.department}

OJT Period:
${report.startDate} - ${report.endDate}

Progress: ${report.progress}%
Attendance: ${report.attendance}%
Mentor Feedback: ${report.mentorFeedback}
Completion Status: ${report.completion}
`;

    const blob = new Blob([reportText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.student.replace(
      /\s+/g,
      "_"
    )}_OJT_Report.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        color: "#0f172a",
      }}
    >
      {/* BREADCRUMB */}
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

        <span style={{ color: "#64748b" }}>
          OJT Reports
        </span>
      </div>

      {/* PAGE HEADER */}
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
            Reports & Analytics
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "clamp(26px, 3vw, 32px)",
              lineHeight: "1.1",
              fontWeight: 800,
              letterSpacing: "-0.8px",
            }}
          >
            OJT Reports
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            View, analyze and generate reports for
            student OJT performance.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 13px",
            border: "1px solid #dbeafe",
            borderRadius: "10px",
            backgroundColor: "#eff6ff",
            color: "#2563eb",
          }}
        >
          <BarChart3 size={17} />

          <div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Report Status
            </div>

            <strong
              style={{
                display: "block",
                marginTop: "2px",
                fontSize: "11px",
              }}
            >
              Updated
            </strong>
          </div>
        </div>
      </section>

      {/* STAT CARDS */}
      <section
        className="ojt-report-stat-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        {[
          {
            title: "Total Students",
            value: totalStudents,
            subtitle: "Students in OJT",
            icon: Users,
            background: "#eff6ff",
            color: "#2563eb",
          },
          {
            title: "Completed",
            value: completedStudents,
            subtitle: "OJT completed",
            icon: CheckCircle2,
            background: "#ecfdf5",
            color: "#059669",
          },
          {
            title: "Average Progress",
            value: `${averageProgress}%`,
            subtitle: "Overall OJT progress",
            icon: TrendingUp,
            background: "#f5f3ff",
            color: "#7c3aed",
          },
          {
            title: "Feedback Pending",
            value: feedbackPending,
            subtitle: `${attentionStudents} need attention`,
            icon: AlertCircle,
            background: "#fef2f2",
            color: "#dc2626",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              style={{
                minWidth: 0,
                padding: "16px",
                border: "1px solid #e2e8f0",
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
                  backgroundColor: stat.background,
                  color: stat.color,
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

      {/* SUMMARY */}
      <section
        className="ojt-report-summary-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            padding: "15px 17px",
            border: "1px solid #dbeafe",
            borderRadius: "12px",
            backgroundColor: "#eff6ff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              marginBottom: "9px",
            }}
          >
            <div>
              <strong
                style={{
                  color: "#1e3a8a",
                  fontSize: "12px",
                }}
              >
                Overall Progress
              </strong>

              <div
                style={{
                  marginTop: "3px",
                  color: "#64748b",
                  fontSize: "10px",
                }}
              >
                Average student progress
              </div>
            </div>

            <strong
              style={{
                color: "#2563eb",
                fontSize: "16px",
              }}
            >
              {averageProgress}%
            </strong>
          </div>

          <div
            style={{
              width: "100%",
              height: "8px",
              overflow: "hidden",
              borderRadius: "999px",
              backgroundColor: "#dbeafe",
            }}
          >
            <div
              style={{
                width: `${averageProgress}%`,
                height: "100%",
                borderRadius: "999px",
                backgroundColor: "#2563eb",
              }}
            />
          </div>
        </div>

        <div
          style={{
            padding: "15px 17px",
            border: "1px solid #d1fae5",
            borderRadius: "12px",
            backgroundColor: "#ecfdf5",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            Average Attendance
          </div>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "#059669",
              fontSize: "22px",
            }}
          >
            {averageAttendance}%
          </strong>

          <div
            style={{
              marginTop: "4px",
              color: "#64748b",
              fontSize: "9px",
            }}
          >
            Across all students
          </div>
        </div>

        <div
          style={{
            padding: "15px 17px",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            Completion Rate
          </div>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "#2563eb",
              fontSize: "22px",
            }}
          >
            {totalStudents === 0
              ? 0
              : Math.round(
                  (completedStudents /
                    totalStudents) *
                    100
                )}
            %
          </strong>

          <div
            style={{
              marginTop: "4px",
              color: "#64748b",
              fontSize: "9px",
            }}
          >
            Students who completed OJT
          </div>
        </div>
      </section>

      {/* REPORT TABLE */}
      <section
        style={{
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 2px 8px rgba(15, 23, 42, 0.035)",
        }}
      >
        <div
          style={{
            padding: "15px 18px",
            borderBottom: "1px solid #eef2f7",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                OJT Report Records
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                Student-wise OJT performance and
                completion information.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#64748b",
                fontSize: "10px",
              }}
            >
              <Filter size={13} />
              Filters
            </div>
          </div>

          {/* FILTERS */}
          <div
            className="ojt-report-filter-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(230px, 1fr) auto auto auto",
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
                border: "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
              }}
            >
              <Search
                size={16}
                color="#94a3b8"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search student, company, mentor..."
                style={{
                  width: "100%",
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#334155",
                  fontSize: "11px",
                }}
              />
            </div>

            <select
              value={selectedCompany}
              onChange={(event) => {
                setSelectedCompany(event.target.value);
                setCurrentPage(1);
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border: "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <select
              value={selectedReportType}
              onChange={(event) => {
                setSelectedReportType(event.target.value);
                setCurrentPage(1);
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border: "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
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
                border: "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {completionStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            style={{
              marginTop: "9px",
              height: "32px",
              padding: "0 11px",
              border: "1px solid #dbe4ee",
              borderRadius: "7px",
              backgroundColor: "#ffffff",
              color: "#64748b",
              fontSize: "9px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>

        {/* RESULT COUNT */}
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #eef2f7",
            color: "#64748b",
            fontSize: "10px",
          }}
        >
          Showing{" "}
          <strong style={{ color: "#334155" }}>
            {filteredReports.length === 0
              ? 0
              : startIndex + 1}
            -
            {Math.min(
              startIndex + reportsPerPage,
              filteredReports.length
            )}
          </strong>{" "}
          of{" "}
          <strong style={{ color: "#334155" }}>
            {filteredReports.length}
          </strong>{" "}
          reports
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
              minWidth: "1180px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {[
                  "Student",
                  "Company",
                  "Mentor",
                  "Progress",
                  "Attendance",
                  "Feedback",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "10px 13px",
                      backgroundColor: "#f8fafc",
                      borderBottom:
                        "1px solid #e2e8f0",
                      color: "#94a3b8",
                      fontSize: "9px",
                      fontWeight: 750,
                      textAlign: "left",
                      textTransform: "uppercase",
                      letterSpacing: "0.45px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedReports.length > 0 ? (
                paginatedReports.map((report) => (
                  <tr key={report.id}>
                    {/* STUDENT */}
                    <td
                      style={{
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "9px",
                        }}
                      >
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            minWidth: "34px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "9px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            fontSize: "9px",
                            fontWeight: 800,
                          }}
                        >
                          {report.initials}
                        </div>

                        <div>
                          <strong
                            style={{
                              display: "block",
                              color: "#334155",
                              fontSize: "11px",
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {report.student}
                          </strong>

                          <span
                            style={{
                              display: "block",
                              marginTop: "2px",
                              color: "#94a3b8",
                              fontSize: "9px",
                            }}
                          >
                            {report.position}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* COMPANY */}
                    <td
                      style={{
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Building2
                          size={13}
                          color="#94a3b8"
                        />

                        <span
                          style={{
                            color: "#475569",
                            fontSize: "10px",
                            fontWeight: 650,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {report.company}
                        </span>
                      </div>
                    </td>

                    {/* MENTOR */}
                    <td
                      style={{
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#64748b",
                          fontSize: "10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <UserCheck
                          size={13}
                          color="#94a3b8"
                        />

                        {report.mentor}
                      </div>
                    </td>

                    {/* PROGRESS */}
                    <td
                      style={{
                        width: "130px",
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <ProgressBar value={report.progress} />
                    </td>

                    {/* ATTENDANCE */}
                    <td
                      style={{
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <span
                        style={{
                          color:
                            report.attendance >= 90
                              ? "#059669"
                              : "#d97706",
                          fontSize: "10px",
                          fontWeight: 700,
                        }}
                      >
                        {report.attendance}%
                      </span>
                    </td>

                    {/* FEEDBACK */}
                    <td
                      style={{
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <FeedbackBadge
                        value={report.mentorFeedback}
                      />
                    </td>

                    {/* STATUS */}
                    <td
                      style={{
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <CompletionBadge
                        status={report.completion}
                      />
                    </td>

                    {/* ACTION */}
                    <td
                      style={{
                        position: "relative",
                        padding: "11px 13px",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActionId(
                            actionId === report.id
                              ? null
                              : report.id
                          )
                        }
                        style={{
                          width: "30px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "none",
                          borderRadius: "7px",
                          backgroundColor: "#f8fafc",
                          color: "#64748b",
                          cursor: "pointer",
                        }}
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {actionId === report.id && (
                        <div
                          style={{
                            position: "absolute",
                            right: "13px",
                            top: "45px",
                            zIndex: 20,
                            width: "180px",
                            padding: "5px",
                            border:
                              "1px solid #e2e8f0",
                            borderRadius: "9px",
                            backgroundColor: "#ffffff",
                            boxShadow:
                              "0 10px 25px rgba(15, 23, 42, 0.12)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              generateReport(report)
                            }
                            className="ojt-report-action-button"
                          >
                            <Eye size={14} />
                            View Report
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDownload(report)
                            }
                            className="ojt-report-action-button"
                          >
                            <Download size={14} />
                            Download Report
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      padding: "55px 20px",
                      textAlign: "center",
                      color: "#94a3b8",
                      fontSize: "11px",
                    }}
                  >
                    <FileText
                      size={30}
                      color="#cbd5e1"
                      style={{
                        marginBottom: "8px",
                      }}
                    />

                    <div>
                      No reports found
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        fontSize: "10px",
                      }}
                    >
                      Try changing your search or
                      filters.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div
          style={{
            minHeight: "58px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "10px 16px",
            borderTop: "1px solid #eef2f7",
          }}
        >
          <span
            style={{
              color: "#94a3b8",
              fontSize: "10px",
            }}
          >
            Page {safeCurrentPage} of {totalPages}
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
              disabled={safeCurrentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
              className="ojt-report-page-button"
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
                className={`ojt-report-page-button ${
                  safeCurrentPage === page
                    ? "ojt-report-page-active"
                    : ""
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              className="ojt-report-page-button"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* REPORT VIEW MODAL */}
      {selectedReport && (
        <Modal
          onClose={() => setSelectedReport(null)}
          width="650px"
        >
          <ModalHeader
            title="OJT Student Report"
            subtitle="Detailed student OJT performance report"
            onClose={() => setSelectedReport(null)}
          />

          <div style={{ padding: "20px" }}>
            {/* STUDENT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                padding: "14px",
                borderRadius: "11px",
                backgroundColor: "#f8fafc",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {selectedReport.initials}
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    color: "#1e293b",
                    fontSize: "16px",
                    fontWeight: 750,
                  }}
                >
                  {selectedReport.student}
                </h3>

                <div
                  style={{
                    marginTop: "5px",
                    color: "#64748b",
                    fontSize: "10px",
                  }}
                >
                  {selectedReport.position}
                </div>
              </div>

              <CompletionBadge
                status={selectedReport.completion}
              />
            </div>

            {/* INFORMATION */}
            <div
              className="ojt-report-detail-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {[
                {
                  icon: Building2,
                  label: "Company",
                  value: selectedReport.company,
                },
                {
                  icon: UserCheck,
                  label: "Mentor",
                  value: selectedReport.mentor,
                },
                {
                  icon: ClipboardList,
                  label: "Department",
                  value: selectedReport.department,
                },
                {
                  icon: CalendarDays,
                  label: "OJT Period",
                  value: `${selectedReport.startDate} - ${selectedReport.endDate}`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  style={{
                    padding: "12px",
                    border: "1px solid #edf2f7",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      color: "#94a3b8",
                      fontSize: "9px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    <Icon size={13} />
                    {label}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color: "#334155",
                      fontSize: "10px",
                      fontWeight: 650,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* PERFORMANCE */}
            <div
              style={{
                marginTop: "15px",
                padding: "14px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "12px",
                }}
              >
                <BarChart3
                  size={15}
                  color="#2563eb"
                />

                <strong
                  style={{
                    color: "#334155",
                    fontSize: "11px",
                  }}
                >
                  Performance Summary
                </strong>
              </div>

              <div
                className="ojt-report-performance-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "9px",
                      }}
                    >
                      OJT Progress
                    </span>

                    <strong
                      style={{
                        color: "#2563eb",
                        fontSize: "10px",
                      }}
                    >
                      {selectedReport.progress}%
                    </strong>
                  </div>

                  <ProgressBar
                    value={selectedReport.progress}
                  />
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "9px",
                      }}
                    >
                      Attendance
                    </span>

                    <strong
                      style={{
                        color:
                          selectedReport.attendance >= 90
                            ? "#059669"
                            : "#d97706",
                        fontSize: "10px",
                      }}
                    >
                      {selectedReport.attendance}%
                    </strong>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "5px",
                      overflow: "hidden",
                      borderRadius: "999px",
                      backgroundColor: "#e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        width: `${selectedReport.attendance}%`,
                        height: "100%",
                        borderRadius: "999px",
                        backgroundColor:
                          selectedReport.attendance >= 90
                            ? "#059669"
                            : "#d97706",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* REPORT STATUS */}
            <div
              className="ojt-report-status-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  border: "1px solid #edf2f7",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "9px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Mentor Feedback
                </div>

                <div style={{ marginTop: "6px" }}>
                  <FeedbackBadge
                    value={
                      selectedReport.mentorFeedback
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "12px",
                  border: "1px solid #edf2f7",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "9px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Report Status
                </div>

                <div
                  style={{
                    marginTop: "6px",
                  }}
                >
                  <CompletionBadge
                    status={
                      selectedReport.completion
                    }
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "18px",
                paddingTop: "14px",
                borderTop: "1px solid #eef2f7",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  handleDownload(selectedReport)
                }
                style={{
                  height: "36px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0 14px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  fontSize: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Download size={13} />
                Download
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedReport(null)
                }
                style={{
                  height: "36px",
                  padding: "0 14px",
                  border:
                    "1px solid #dbe4ee",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  color: "#475569",
                  fontSize: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* STYLES */}
      <style>
        {`
          .ojt-report-action-button {
            width: 100%;
            height: 32px;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 9px;
            border: none;
            border-radius: 6px;
            background: transparent;
            color: #475569;
            font-size: 10px;
            font-weight: 600;
            text-align: left;
            cursor: pointer;
          }

          .ojt-report-action-button:hover {
            background: #f8fafc;
          }

          .ojt-report-page-button {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e2e8f0;
            border-radius: 7px;
            background: #ffffff;
            color: #64748b;
            font-size: 10px;
            font-weight: 600;
            cursor: pointer;
          }

          .ojt-report-page-button:hover:not(:disabled) {
            border-color: #bfdbfe;
            background: #eff6ff;
            color: #2563eb;
          }

          .ojt-report-page-button:disabled {
            color: #cbd5e1;
            cursor: not-allowed;
            background: #f8fafc;
          }

          .ojt-report-page-active {
            border-color: #2563eb;
            background: #2563eb;
            color: #ffffff;
          }

          @media (max-width: 1100px) {
            .ojt-report-stat-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .ojt-report-summary-grid {
              grid-template-columns: 1fr 1fr !important;
            }

            .ojt-report-filter-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 700px) {
            .ojt-report-stat-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-summary-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-filter-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-detail-grid,
            .ojt-report-performance-grid,
            .ojt-report-status-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}