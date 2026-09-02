import { useMemo, useState } from "react";

import {
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  ChevronRight,
  Users,
  CheckCircle2,
  Clock3,
  AlertCircle,
  CalendarDays,
  Building2,
  UserCheck,
  MapPin,
  X,
  TrendingUp,
  ClipboardCheck,
  BriefcaseBusiness,
} from "lucide-react";

const initialTrackingData = [
  {
    id: 1,
    student: "Aman Verma",
    initials: "AV",
    company: "Tech Solutions Inc.",
    position: "Web Developer Intern",
    department: "Web Development",
    mentor: "Rajesh Kumar",
    startDate: "01 May 2026",
    endDate: "31 July 2026",
    progress: 78,
    attendance: 94,
    status: "In Progress",
    location: "Mumbai",
    totalDays: 92,
    completedDays: 72,
    lastUpdate: "Today",
  },
  {
    id: 2,
    student: "Riya Shah",
    initials: "RS",
    company: "DataMind Pvt. Ltd.",
    position: "Data Analyst Intern",
    department: "Data Analytics",
    mentor: "Priya Iyer",
    startDate: "05 May 2026",
    endDate: "05 August 2026",
    progress: 72,
    attendance: 91,
    status: "In Progress",
    location: "Pune",
    totalDays: 93,
    completedDays: 67,
    lastUpdate: "Today",
  },
  {
    id: 3,
    student: "Aditya Patel",
    initials: "AP",
    company: "Creative Media",
    position: "UI/UX Design Intern",
    department: "UI/UX Design",
    mentor: "Amit Verma",
    startDate: "10 April 2026",
    endDate: "10 July 2026",
    progress: 88,
    attendance: 97,
    status: "In Progress",
    location: "Ahmedabad",
    totalDays: 92,
    completedDays: 81,
    lastUpdate: "Yesterday",
  },
  {
    id: 4,
    student: "Sneha Joshi",
    initials: "SJ",
    company: "CloudTech Solutions",
    position: "Cloud Intern",
    department: "Cloud Computing",
    mentor: "Vivek Singh",
    startDate: "15 May 2026",
    endDate: "15 August 2026",
    progress: 65,
    attendance: 88,
    status: "In Progress",
    location: "Mumbai",
    totalDays: 92,
    completedDays: 60,
    lastUpdate: "Today",
  },
  {
    id: 5,
    student: "Rahul Mehta",
    initials: "RM",
    company: "Innovatech Labs",
    position: "Software Developer Intern",
    department: "Software Development",
    mentor: "Neha Kapoor",
    startDate: "01 June 2026",
    endDate: "31 August 2026",
    progress: 48,
    attendance: 82,
    status: "Needs Attention",
    location: "Pune",
    totalDays: 92,
    completedDays: 44,
    lastUpdate: "2 days ago",
  },
  {
    id: 6,
    student: "Neha Singh",
    initials: "NS",
    company: "SecureNet Pvt. Ltd.",
    position: "Cyber Security Intern",
    department: "Cyber Security",
    mentor: "Sanjay Shah",
    startDate: "01 May 2026",
    endDate: "31 July 2026",
    progress: 84,
    attendance: 96,
    status: "In Progress",
    location: "Navi Mumbai",
    totalDays: 92,
    completedDays: 77,
    lastUpdate: "Today",
  },
  {
    id: 7,
    student: "Karan Mehta",
    initials: "KM",
    company: "Deloitte",
    position: "Business Analyst Intern",
    department: "Business Analytics",
    mentor: "Anjali Desai",
    startDate: "10 May 2026",
    endDate: "10 August 2026",
    progress: 70,
    attendance: 90,
    status: "In Progress",
    location: "Mumbai",
    totalDays: 93,
    completedDays: 65,
    lastUpdate: "Yesterday",
  },
  {
    id: 8,
    student: "Ishita Shah",
    initials: "IS",
    company: "HCLTech",
    position: "Software Engineer Intern",
    department: "Software Development",
    mentor: "Rohan Kulkarni",
    startDate: "15 April 2026",
    endDate: "15 July 2026",
    progress: 91,
    attendance: 98,
    status: "Completing Soon",
    location: "Pune",
    totalDays: 92,
    completedDays: 84,
    lastUpdate: "Today",
  },
  {
    id: 9,
    student: "Mohit Verma",
    initials: "MV",
    company: "CloudTech Solutions",
    position: "Cloud Support Intern",
    department: "Cloud Computing",
    mentor: "Vivek Singh",
    startDate: "01 June 2026",
    endDate: "31 August 2026",
    progress: 42,
    attendance: 79,
    status: "Needs Attention",
    location: "Mumbai",
    totalDays: 92,
    completedDays: 39,
    lastUpdate: "3 days ago",
  },
  {
    id: 10,
    student: "Ayesha Khan",
    initials: "AK",
    company: "SecureNet Pvt. Ltd.",
    position: "Security Analyst Intern",
    department: "Cyber Security",
    mentor: "Sanjay Shah",
    startDate: "05 May 2026",
    endDate: "05 August 2026",
    progress: 76,
    attendance: 93,
    status: "In Progress",
    location: "Mumbai",
    totalDays: 93,
    completedDays: 71,
    lastUpdate: "Today",
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

const statuses = [
  "All Status",
  "In Progress",
  "Needs Attention",
  "Completing Soon",
  "Completed",
];

function StatusBadge({ status }) {
  const styles = {
    "In Progress": {
      background: "#eff6ff",
      color: "#2563eb",
    },
    "Needs Attention": {
      background: "#fef2f2",
      color: "#dc2626",
    },
    "Completing Soon": {
      background: "#ecfdf5",
      color: "#059669",
    },
    Completed: {
      background: "#f0fdf4",
      color: "#16a34a",
    },
  };

  const current =
    styles[status] || {
      background: "#f8fafc",
      color: "#64748b",
    };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor: current.background,
        color: current.color,
        fontSize: "9px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {status}
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
    <div
      style={{
        width: "100%",
        minWidth: "70px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
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

function AttendanceBadge({ value }) {
  const color =
    value >= 90
      ? "#059669"
      : value >= 80
      ? "#d97706"
      : "#dc2626";

  return (
    <span
      style={{
        color,
        fontSize: "10px",
        fontWeight: 700,
      }}
    >
      {value}%
    </span>
  );
}

function Modal({ children, onClose, width = "600px" }) {
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

function ModalHeader({
  title,
  subtitle,
  onClose,
}) {
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

export default function OJTTracking() {
  const [trackingData, setTrackingData] =
    useState(initialTrackingData);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCompany, setSelectedCompany] =
    useState("All Companies");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [actionStudentId, setActionStudentId] =
    useState(null);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const studentsPerPage = 6;

  const filteredStudents = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return trackingData.filter((student) => {
      const matchesSearch =
        !search ||
        student.student
          .toLowerCase()
          .includes(search) ||
        student.company
          .toLowerCase()
          .includes(search) ||
        student.position
          .toLowerCase()
          .includes(search) ||
        student.mentor
          .toLowerCase()
          .includes(search);

      const matchesCompany =
        selectedCompany ===
          "All Companies" ||
        student.company === selectedCompany;

      const matchesStatus =
        selectedStatus === "All Status" ||
        student.status === selectedStatus;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesStatus
      );
    });
  }, [
    trackingData,
    searchTerm,
    selectedCompany,
    selectedStatus,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        studentsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    studentsPerPage;

  const paginatedStudents =
    filteredStudents.slice(
      startIndex,
      startIndex + studentsPerPage
    );

  const totalStudents = trackingData.length;

  const activeStudents =
    trackingData.filter(
      (student) =>
        student.status === "In Progress"
    ).length;

  const attentionStudents =
    trackingData.filter(
      (student) =>
        student.status ===
        "Needs Attention"
    ).length;

  const completedSoonStudents =
    trackingData.filter(
      (student) =>
        student.status ===
        "Completing Soon"
    ).length;

  const averageProgress =
    totalStudents === 0
      ? 0
      : Math.round(
          trackingData.reduce(
            (total, student) =>
              total + student.progress,
            0
          ) / totalStudents
        );

  const averageAttendance =
    totalStudents === 0
      ? 0
      : Math.round(
          trackingData.reduce(
            (total, student) =>
              total + student.attendance,
            0
          ) / totalStudents
        );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCompany("All Companies");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const updateProgress = (
    studentId,
    newProgress
  ) => {
    const progress = Math.min(
      100,
      Math.max(0, Number(newProgress))
    );

    setTrackingData((current) =>
      current.map((student) => {
        if (student.id !== studentId) {
          return student;
        }

        let status = student.status;

        if (progress >= 100) {
          status = "Completed";
        } else if (progress >= 85) {
          status = "Completing Soon";
        } else if (progress < 50) {
          status = "Needs Attention";
        } else {
          status = "In Progress";
        }

        return {
          ...student,
          progress,
          status,
          lastUpdate: "Just now",
        };
      })
    );

    setSelectedStudent((current) => {
      if (
        !current ||
        current.id !== studentId
      ) {
        return current;
      }

      let status = current.status;

      if (progress >= 100) {
        status = "Completed";
      } else if (progress >= 85) {
        status = "Completing Soon";
      } else if (progress < 50) {
        status = "Needs Attention";
      } else {
        status = "In Progress";
      }

      return {
        ...current,
        progress,
        status,
        lastUpdate: "Just now",
      };
    });
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
          OJT Tracking
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
              fontSize:
                "clamp(26px, 3vw, 32px)",
              lineHeight: "1.1",
              fontWeight: 800,
              letterSpacing: "-0.8px",
            }}
          >
            OJT Tracking
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Monitor student internship progress,
            attendance and overall OJT status.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 13px",
            border:
              "1px solid #dbeafe",
            borderRadius: "10px",
            backgroundColor: "#eff6ff",
            color: "#2563eb",
          }}
        >
          <ClipboardCheck size={17} />

          <div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Tracking Status
            </div>

            <strong
              style={{
                display: "block",
                marginTop: "2px",
                fontSize: "11px",
              }}
            >
              Live Monitoring
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section
        className="ojt-stat-grid"
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
            subtitle:
              "Students under OJT",
            icon: Users,
            background: "#eff6ff",
            color: "#2563eb",
          },
          {
            title: "In Progress",
            value: activeStudents,
            subtitle:
              "Currently active OJT",
            icon: Clock3,
            background: "#ecfdf5",
            color: "#059669",
          },
          {
            title: "Needs Attention",
            value: attentionStudents,
            subtitle:
              "Require coordinator review",
            icon: AlertCircle,
            background: "#fef2f2",
            color: "#dc2626",
          },
          {
            title: "Average Progress",
            value: `${averageProgress}%`,
            subtitle: `${completedSoonStudents} completing soon`,
            icon: TrendingUp,
            background: "#f5f3ff",
            color: "#7c3aed",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
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
                    stat.background,
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

      {/* =====================================================
          SUMMARY STRIP
      ====================================================== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "1.5fr 1fr",
          gap: "12px",
          marginBottom: "18px",
        }}
        className="ojt-summary-grid"
      >
        <div
          style={{
            padding: "15px 17px",
            border:
              "1px solid #dbeafe",
            borderRadius: "12px",
            backgroundColor: "#eff6ff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
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
                Overall OJT Progress
              </strong>

              <div
                style={{
                  marginTop: "3px",
                  color: "#64748b",
                  fontSize: "10px",
                }}
              >
                Average progress across all
                active students
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
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "15px 17px",
            border:
              "1px solid #e2e8f0",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9px",
              backgroundColor: "#ecfdf5",
              color: "#059669",
            }}
          >
            <CalendarDays size={18} />
          </div>

          <div>
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
                marginTop: "3px",
                color: "#0f172a",
                fontSize: "20px",
              }}
            >
              {averageAttendance}%
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRACKING TABLE
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
                Student OJT Tracking
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                Monitor progress and attendance
                of every student
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
            className="ojt-filter-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(240px, 1fr) auto auto auto",
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
                  setSearchTerm(
                    event.target.value
                  );
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
                setSelectedCompany(
                  event.target.value
                );
                setCurrentPage(1);
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {companies.map(
                (company) => (
                  <option
                    key={company}
                    value={company}
                  >
                    {company}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(
                  event.target.value
                );
                setCurrentPage(1);
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {statuses.map(
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

            <button
              type="button"
              onClick={clearFilters}
              style={{
                height: "38px",
                padding: "0 12px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* RESULT COUNT */}
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "#f8fafc",
            borderBottom:
              "1px solid #eef2f7",
            color: "#64748b",
            fontSize: "10px",
          }}
        >
          Showing{" "}
          <strong
            style={{
              color: "#334155",
            }}
          >
            {filteredStudents.length === 0
              ? 0
              : startIndex + 1}
            -
            {Math.min(
              startIndex +
                studentsPerPage,
              filteredStudents.length
            )}
          </strong>{" "}
          of{" "}
          <strong
            style={{
              color: "#334155",
            }}
          >
            {filteredStudents.length}
          </strong>{" "}
          students
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
              minWidth: "1120px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {[
                  "Student",
                  "Company / Position",
                  "Mentor",
                  "Progress",
                  "Attendance",
                  "OJT Period",
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
              {paginatedStudents.length >
              0 ? (
                paginatedStudents.map(
                  (student) => (
                    <tr
                      key={student.id}
                    >
                      {/* STUDENT */}
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
                                "34px",
                              height:
                                "34px",
                              minWidth:
                                "34px",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              borderRadius:
                                "9px",
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
                            {
                              student.initials
                            }
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
                                student.student
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
                              Student
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* COMPANY */}
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
                            gap: "6px",
                          }}
                        >
                          <Building2
                            size={13}
                            color="#94a3b8"
                          />

                          <div>
                            <strong
                              style={{
                                display:
                                  "block",
                                color:
                                  "#475569",
                                fontSize:
                                  "10px",
                                fontWeight:
                                  650,
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              {
                                student.company
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
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              {
                                student.position
                              }
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* MENTOR */}
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
                            gap: "6px",
                            color:
                              "#64748b",
                            fontSize:
                              "10px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          <UserCheck
                            size={13}
                            color="#94a3b8"
                          />

                          {
                            student.mentor
                          }
                        </div>
                      </td>

                      {/* PROGRESS */}
                      <td
                        style={{
                          width:
                            "130px",
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <ProgressBar
                          value={
                            student.progress
                          }
                        />
                      </td>

                      {/* ATTENDANCE */}
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
                            gap: "5px",
                          }}
                        >
                          <CalendarDays
                            size={12}
                            color="#94a3b8"
                          />

                          <AttendanceBadge
                            value={
                              student.attendance
                            }
                          />
                        </div>
                      </td>

                      {/* PERIOD */}
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
                            color:
                              "#64748b",
                            fontSize:
                              "9px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {
                            student.startDate
                          }
                        </div>

                        <div
                          style={{
                            marginTop:
                              "3px",
                            color:
                              "#94a3b8",
                            fontSize:
                              "9px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          to{" "}
                          {
                            student.endDate
                          }
                        </div>
                      </td>

                      {/* STATUS */}
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

                      {/* ACTION */}
                      <td
                        style={{
                          position:
                            "relative",
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setActionStudentId(
                              actionStudentId ===
                                student.id
                                ? null
                                : student.id
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

                        {actionStudentId ===
                          student.id && (
                          <div
                            style={{
                              position:
                                "absolute",
                              right:
                                "13px",
                              top:
                                "45px",
                              zIndex:
                                20,
                              width:
                                "180px",
                              padding:
                                "5px",
                              border:
                                "1px solid #e2e8f0",
                              borderRadius:
                                "9px",
                              backgroundColor:
                                "#ffffff",
                              boxShadow:
                                "0 10px 25px rgba(15, 23, 42, 0.12)",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStudent(
                                  student
                                );
                                setActionStudentId(
                                  null
                                );
                              }}
                              className="ojt-action-button"
                            >
                              <Eye
                                size={
                                  14
                                }
                              />
                              View Tracking
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStudent(
                                  student
                                );
                                setActionStudentId(
                                  null
                                );
                              }}
                              className="ojt-action-button"
                            >
                              <TrendingUp
                                size={
                                  14
                                }
                              />
                              Update Progress
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
                    colSpan="8"
                    style={{
                      padding:
                        "55px 20px",
                      textAlign:
                        "center",
                      color:
                        "#94a3b8",
                      fontSize:
                        "11px",
                    }}
                  >
                    <ClipboardCheck
                      size={30}
                      color="#cbd5e1"
                      style={{
                        marginBottom:
                          "8px",
                      }}
                    />

                    <div>
                      No OJT records found
                    </div>

                    <div
                      style={{
                        marginTop:
                          "4px",
                        fontSize:
                          "10px",
                      }}
                    >
                      Try changing your
                      search or filters.
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
            justifyContent:
              "space-between",
            gap: "12px",
            padding:
              "10px 16px",
            borderTop:
              "1px solid #eef2f7",
          }}
        >
          <span
            style={{
              color:
                "#94a3b8",
              fontSize:
                "10px",
            }}
          >
            Page{" "}
            {safeCurrentPage}{" "}
            of {totalPages}
          </span>

          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: "5px",
            }}
          >
            <button
              type="button"
              disabled={
                safeCurrentPage ===
                1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
              className="ojt-page-button"
            >
              ‹
            </button>

            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, index) =>
                index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() =>
                  setCurrentPage(
                    page
                  )
                }
                className={`ojt-page-button ${
                  safeCurrentPage ===
                  page
                    ? "ojt-page-active"
                    : ""
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                safeCurrentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
              className="ojt-page-button"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRACKING DETAILS MODAL
      ====================================================== */}
      {selectedStudent && (
        <Modal
          onClose={() =>
            setSelectedStudent(null)
          }
          width="650px"
        >
          <ModalHeader
            title="OJT Tracking Details"
            subtitle="Student internship progress and monitoring"
            onClose={() =>
              setSelectedStudent(null)
            }
          />

          <div
            style={{
              padding: "20px",
            }}
          >
            {/* STUDENT HEADER */}
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
                {
                  selectedStudent.initials
                }
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#1e293b",
                    fontSize: "16px",
                    fontWeight: 750,
                  }}
                >
                  {
                    selectedStudent.student
                  }
                </h3>

                <div
                  style={{
                    marginTop: "5px",
                    color: "#64748b",
                    fontSize: "10px",
                  }}
                >
                  {
                    selectedStudent.position
                  }
                </div>
              </div>

              <StatusBadge
                status={
                  selectedStudent.status
                }
              />
            </div>

            {/* INFORMATION */}
            <div
              className="ojt-detail-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {[
                {
                  icon: Building2,
                  label: "Company",
                  value:
                    selectedStudent.company,
                },
                {
                  icon: UserCheck,
                  label: "Mentor",
                  value:
                    selectedStudent.mentor,
                },
                {
                  icon: BriefcaseBusiness,
                  label: "Position",
                  value:
                    selectedStudent.position,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value:
                    selectedStudent.location,
                },
                {
                  icon: CalendarDays,
                  label: "Start Date",
                  value:
                    selectedStudent.startDate,
                },
                {
                  icon: CalendarDays,
                  label: "End Date",
                  value:
                    selectedStudent.endDate,
                },
              ].map(
                ({
                  icon: Icon,
                  label,
                  value,
                }) => (
                  <div
                    key={label}
                    style={{
                      padding:
                        "12px",
                      border:
                        "1px solid #edf2f7",
                      borderRadius:
                        "10px",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: "7px",
                        color:
                          "#94a3b8",
                        fontSize:
                          "9px",
                        fontWeight:
                          700,
                        textTransform:
                          "uppercase",
                      }}
                    >
                      <Icon
                        size={13}
                      />

                      {label}
                    </div>

                    <div
                      style={{
                        marginTop:
                          "6px",
                        color:
                          "#334155",
                        fontSize:
                          "11px",
                        fontWeight:
                          650,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* PROGRESS + ATTENDANCE */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
                marginTop: "15px",
              }}
              className="ojt-progress-grid"
            >
              <div
                style={{
                  padding: "14px",
                  border:
                    "1px solid #dbeafe",
                  borderRadius: "10px",
                  backgroundColor: "#eff6ff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "8px",
                  }}
                >
                  <strong
                    style={{
                      color:
                        "#334155",
                      fontSize:
                        "11px",
                    }}
                  >
                    OJT Progress
                  </strong>

                  <strong
                    style={{
                      color:
                        "#2563eb",
                      fontSize:
                        "15px",
                    }}
                  >
                    {
                      selectedStudent.progress
                    }%
                  </strong>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    overflow:
                      "hidden",
                    borderRadius:
                      "999px",
                    backgroundColor:
                      "#dbeafe",
                  }}
                >
                  <div
                    style={{
                      width: `${selectedStudent.progress}%`,
                      height: "100%",
                      borderRadius:
                        "999px",
                      backgroundColor:
                        "#2563eb",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop:
                      "7px",
                    color:
                      "#64748b",
                    fontSize:
                      "9px",
                  }}
                >
                  {
                    selectedStudent.completedDays
                  }{" "}
                  of{" "}
                  {
                    selectedStudent.totalDays
                  }{" "}
                  days completed
                </div>
              </div>

              <div
                style={{
                  padding: "14px",
                  border:
                    "1px solid #d1fae5",
                  borderRadius: "10px",
                  backgroundColor:
                    "#ecfdf5",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "8px",
                  }}
                >
                  <strong
                    style={{
                      color:
                        "#334155",
                      fontSize:
                        "11px",
                    }}
                  >
                    Attendance
                  </strong>

                  <strong
                    style={{
                      color:
                        selectedStudent.attendance >=
                        90
                          ? "#059669"
                          : "#d97706",
                      fontSize:
                        "15px",
                    }}
                  >
                    {
                      selectedStudent.attendance
                    }%
                  </strong>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    overflow:
                      "hidden",
                    borderRadius:
                      "999px",
                    backgroundColor:
                      "#d1fae5",
                  }}
                >
                  <div
                    style={{
                      width: `${selectedStudent.attendance}%`,
                      height: "100%",
                      borderRadius:
                        "999px",
                      backgroundColor:
                        selectedStudent.attendance >=
                        90
                          ? "#059669"
                          : "#d97706",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop:
                      "7px",
                    color:
                      "#64748b",
                    fontSize:
                      "9px",
                  }}
                >
                  Overall attendance
                  percentage
                </div>
              </div>
            </div>

            {/* UPDATE PROGRESS */}
            <div
              style={{
                marginTop: "16px",
                padding: "14px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  marginBottom:
                    "9px",
                }}
              >
                <strong
                  style={{
                    color:
                      "#334155",
                    fontSize:
                      "11px",
                  }}
                >
                  Update Progress
                </strong>

                <span
                  style={{
                    color:
                      "#94a3b8",
                    fontSize:
                      "9px",
                  }}
                >
                  Frontend preview
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={
                  selectedStudent.progress
                }
                onChange={(event) =>
                  updateProgress(
                    selectedStudent.id,
                    event.target.value
                  )
                }
                style={{
                  width: "100%",
                  cursor:
                    "pointer",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginTop:
                    "4px",
                  color:
                    "#94a3b8",
                  fontSize:
                    "8px",
                }}
              >
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* FOOTER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: "10px",
                marginTop: "18px",
                paddingTop: "14px",
                borderTop:
                  "1px solid #eef2f7",
              }}
            >
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "9px",
                }}
              >
                Last update:{" "}
                {
                  selectedStudent.lastUpdate
                }
              </span>

              <button
                type="button"
                onClick={() =>
                  setSelectedStudent(
                    null
                  )
                }
                style={{
                  height: "36px",
                  padding: "0 15px",
                  border:
                    "1px solid #dbe4ee",
                  borderRadius: "8px",
                  backgroundColor:
                    "#ffffff",
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

      {/* =====================================================
          STYLES
      ====================================================== */}
      <style>
        {`
          .ojt-action-button {
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

          .ojt-action-button:hover {
            background: #f8fafc;
          }

          .ojt-page-button {
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

          .ojt-page-button:hover:not(:disabled) {
            border-color: #bfdbfe;
            background: #eff6ff;
            color: #2563eb;
          }

          .ojt-page-button:disabled {
            color: #cbd5e1;
            cursor: not-allowed;
            background: #f8fafc;
          }

          .ojt-page-active {
            border-color: #2563eb;
            background: #2563eb;
            color: #ffffff;
          }

          @media (max-width: 1050px) {
            .ojt-stat-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .ojt-summary-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-filter-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 700px) {
            .ojt-stat-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-filter-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-detail-grid,
            .ojt-progress-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}