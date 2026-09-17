import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FileBarChart2,
  FileText,
  GraduationCap,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";

import { ojtReportsService } from "../../services/ojtReportsService";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

/* ============================================================
   HELPERS
============================================================ */

function getInitials(name = "") {
  const initials = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "ST";
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatNumber(value) {
  const number = Number(value);

  if (Number.isNaN(number)) return "0";

  return number.toLocaleString("en-IN");
}

function normalizeReport(item = {}) {
  const student =
    item.student ||
    item.studentName ||
    item.name ||
    "Unknown Student";

  const company =
    item.company ||
    item.companyName ||
    "Company not available";

  const mentor =
    item.mentor ||
    item.mentorName ||
    item.supervisor ||
    "Mentor not assigned";

  const progress =
    item.progress ??
    item.ojtProgress ??
    item.completionPercentage ??
    0;

  const attendance =
    item.attendance ??
    item.attendancePercentage ??
    0;

  const weeklyReports =
    item.weeklyReports ??
    item.weeklyReportCount ??
    item.reports ??
    0;

  const totalMarks =
    item.totalMarks ??
    item.overallScore ??
    item.score ??
    null;

  const status =
    item.status ||
    item.ojtStatus ||
    item.assignmentStatus ||
    "Not available";

  return {
    ...item,

    id:
      item.id ||
      item._id ||
      item.assignmentId ||
      item.applicationId ||
      `${student}-${company}`,

    student,

    studentId:
      item.studentId ||
      item.student?._id ||
      "",

    initials:
      item.initials ||
      getInitials(student),

    rollNumber:
      item.rollNumber ||
      item.rollNo ||
      item.studentRollNumber ||
      "N/A",

    department:
      item.department ||
      item.studentDepartment ||
      "N/A",

    company,

    companyId:
      item.companyId ||
      "",

    position:
      item.position ||
      item.opportunityTitle ||
      item.role ||
      "OJT",

    mentor,

    mentorDepartment:
      item.mentorDepartment ||
      "",

    startDate:
      item.startDate ||
      "",

    endDate:
      item.endDate ||
      "",

    progress: Math.max(
      0,
      Math.min(100, Number(progress) || 0)
    ),

    attendance: Math.max(
      0,
      Math.min(100, Number(attendance) || 0)
    ),

    attendancePresent:
      Number(item.attendancePresent) || 0,

    attendanceAbsent:
      Number(item.attendanceAbsent) || 0,

    attendanceLeave:
      Number(item.attendanceLeave) || 0,

    weeklyReports:
      Number(weeklyReports) || 0,

    totalDays:
      Number(item.totalDays) || 0,

    completedDays:
      Number(item.completedDays) || 0,

    totalMarks:
      totalMarks === null ||
      totalMarks === undefined ||
      totalMarks === ""
        ? null
        : Number(totalMarks),

    status,

    assignmentStatus:
      item.assignmentStatus ||
      item.status ||
      "Assigned",

    location:
      item.location ||
      "Not specified",

    lastUpdate:
      item.lastUpdate ||
      item.updatedAt ||
      "",
  };
}

function extractReports(payload) {
  if (!payload) return [];

  if (Array.isArray(payload)) {
    return payload.map(normalizeReport);
  }

  if (Array.isArray(payload.reports)) {
    return payload.reports.map(normalizeReport);
  }

  if (Array.isArray(payload.reportData)) {
    return payload.reportData.map(normalizeReport);
  }

  if (Array.isArray(payload.reportsData)) {
    return payload.reportsData.map(normalizeReport);
  }

  if (Array.isArray(payload.data)) {
    return payload.data.map(normalizeReport);
  }

  if (Array.isArray(payload.trackingData)) {
    return payload.trackingData.map(normalizeReport);
  }

  if (Array.isArray(payload.assignedOjts)) {
    return payload.assignedOjts.map(normalizeReport);
  }

  return [];
}

/* ============================================================
   STATUS
============================================================ */

function getStatusStyle(status, colors) {
  const value = String(status || "").toLowerCase();

  if (
    value.includes("complete") ||
    value.includes("evaluated")
  ) {
    return {
      background: colors.successSoft,
      color: colors.success,
      icon: CheckCircle2,
    };
  }

  if (
    value.includes("attention") ||
    value.includes("reject")
  ) {
    return {
      background: colors.dangerSoft,
      color: colors.danger,
      icon: AlertCircle,
    };
  }

  if (
    value.includes("pending") ||
    value.includes("soon") ||
    value.includes("draft")
  ) {
    return {
      background: colors.warningSoft,
      color: colors.warning,
      icon: Clock3,
    };
  }

  return {
    background: colors.primarySoft,
    color: colors.primary,
    icon: BarChart3,
  };
}

function StatusBadge({ status, colors }) {
  const current = getStatusStyle(
    status,
    colors
  );

  const Icon = current.icon;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "6px 9px",
        borderRadius: "999px",
        background: current.background,
        color: current.color,
        fontSize: "12px",
        lineHeight: 1,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={12} />

      {status || "Not available"}
    </span>
  );
}

function ProgressBar({ value, colors }) {
  const progress = Math.max(
    0,
    Math.min(100, Number(value) || 0)
  );

  const progressColor =
    progress >= 100
      ? colors.success
      : progress < 50
      ? colors.danger
      : colors.primary;

  return (
    <div
      style={{
        width: "100%",
        minWidth: "95px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          marginBottom: "5px",
        }}
      >
        <span
          style={{
            color: colors.text,
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {progress}%
        </span>

        <span
          style={{
            color: colors.textMuted,
            fontSize: "11px",
          }}
        >
          Progress
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "6px",
          overflow: "hidden",
          borderRadius: "999px",
          background: colors.border,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: "999px",
            background: progressColor,
            transition: "width 200ms ease",
          }}
        />
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  colors,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "11px",
        padding: "13px",
        border: `1px solid ${colors.border}`,
        borderRadius: "10px",
        background: colors.surfaceMuted,
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
          background: colors.primarySoft,
          color: colors.primary,
        }}
      >
        <Icon size={16} />
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: colors.textMuted,
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.45px",
          }}
        >
          {label}
        </div>

        <div
          style={{
            marginTop: "4px",
            color: colors.text,
            fontSize: "14px",
            lineHeight: 1.4,
            fontWeight: 650,
            wordBreak: "break-word",
          }}
        >
          {value || "Not available"}
        </div>
      </div>
    </div>
  );
}

function Modal({
  children,
  onClose,
  colors,
  darkMode,
  width = "820px",
}) {
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
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: darkMode
          ? "rgba(0, 0, 0, 0.68)"
          : "rgba(15, 23, 42, 0.48)",
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
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: darkMode
            ? "0 24px 60px rgba(0, 0, 0, 0.45)"
            : "0 24px 60px rgba(15, 23, 42, 0.20)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function OJTReports() {
  const { colors, darkMode } =
    useCoordinatorTheme();

  const [reports, setReports] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedDepartment,
    setSelectedDepartment,
  ] = useState("All Departments");

  const [
    selectedCompany,
    setSelectedCompany,
  ] = useState("All Companies");

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const PAGE_SIZE = 7;

  /* ==========================================================
     LOAD REPORTS
  ========================================================== */

  const loadReports = async (
    isRefresh = false
  ) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response =
        await ojtReportsService.getReports();

      const list = extractReports(response);

      setReports(list);
    } catch (err) {
      console.error(
        "Load OJT reports error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load OJT reports."
      );

      setReports([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  /* ==========================================================
     FILTER OPTIONS
  ========================================================== */

  const departments = useMemo(() => {
    const values = reports
      .map((item) => item.department)
      .filter(
        (value) =>
          value &&
          value !== "N/A"
      );

    return [
      "All Departments",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [reports]);

  const companies = useMemo(() => {
    const values = reports
      .map((item) => item.company)
      .filter(
        (value) =>
          value &&
          value !== "Company not available"
      );

    return [
      "All Companies",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [reports]);

  const statuses = useMemo(() => {
    const values = reports
      .map((item) => item.status)
      .filter(Boolean);

    return [
      "All Status",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [reports]);

  /* ==========================================================
     FILTERING
  ========================================================== */

  const filteredReports = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return reports.filter((report) => {
      const searchableText = [
        report.student,
        report.rollNumber,
        report.studentId,
        report.company,
        report.position,
        report.mentor,
        report.department,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search ||
        searchableText.includes(search);

      const matchesDepartment =
        selectedDepartment ===
          "All Departments" ||
        report.department ===
          selectedDepartment;

      const matchesCompany =
        selectedCompany ===
          "All Companies" ||
        report.company ===
          selectedCompany;

      const matchesStatus =
        selectedStatus === "All Status" ||
        report.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesCompany &&
        matchesStatus
      );
    });
  }, [
    reports,
    searchTerm,
    selectedDepartment,
    selectedCompany,
    selectedStatus,
  ]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredReports.length / PAGE_SIZE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    PAGE_SIZE;

  const paginatedReports =
    filteredReports.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );

  /* ==========================================================
     STATISTICS
  ========================================================== */

  const statistics = useMemo(() => {
    const total = reports.length;

    const completed = reports.filter(
      (item) => {
        const status =
          String(
            item.status || ""
          ).toLowerCase();

        return (
          status.includes("complete") ||
          item.progress >= 100
        );
      }
    ).length;

    const active = reports.filter(
      (item) => {
        const status =
          String(
            item.status || ""
          ).toLowerCase();

        return (
          !status.includes("complete") &&
          !status.includes("reject") &&
          status !== "cancelled" &&
          item.progress < 100
        );
      }
    ).length;

    const needsAttention =
      reports.filter((item) => {
        const status =
          String(
            item.status || ""
          ).toLowerCase();

        return (
          status.includes("attention") ||
          item.attendance < 80 ||
          item.progress < 50
        );
      }).length;

    const evaluated =
      reports.filter(
        (item) =>
          item.totalMarks !== null &&
          !Number.isNaN(
            item.totalMarks
          )
      );

    const averageMarks =
      evaluated.length > 0
        ? Math.round(
            evaluated.reduce(
              (sum, item) =>
                sum + item.totalMarks,
              0
            ) / evaluated.length
          )
        : 0;

    const averageProgress =
      total > 0
        ? Math.round(
            reports.reduce(
              (sum, item) =>
                sum + item.progress,
              0
            ) / total
          )
        : 0;

    return {
      total,
      active,
      completed,
      needsAttention,
      averageMarks,
      averageProgress,
    };
  }, [reports]);

  /* ==========================================================
     CLEAR FILTERS
  ========================================================== */

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment(
      "All Departments"
    );
    setSelectedCompany(
      "All Companies"
    );
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const hasFilters =
    Boolean(searchTerm) ||
    selectedDepartment !==
      "All Departments" ||
    selectedCompany !==
      "All Companies" ||
    selectedStatus !==
      "All Status";

  /* ==========================================================
     CSV EXPORT
  ========================================================== */

  const exportReports = () => {
    if (!filteredReports.length) return;

    const headers = [
      "Student",
      "Student ID",
      "Roll Number",
      "Department",
      "Company",
      "Position",
      "Mentor",
      "Start Date",
      "End Date",
      "Progress",
      "Attendance",
      "Weekly Reports",
      "Total Marks",
      "Status",
    ];

    const rows = filteredReports.map(
      (report) => [
        report.student,
        report.studentId,
        report.rollNumber,
        report.department,
        report.company,
        report.position,
        report.mentor,
        report.startDate,
        report.endDate,
        `${report.progress}%`,
        `${report.attendance}%`,
        report.weeklyReports,
        report.totalMarks ?? "",
        report.status,
      ]
    );

    const escapeCsv = (value) => {
      const text = String(
        value ?? ""
      );

      if (
        text.includes(",") ||
        text.includes('"') ||
        text.includes("\n")
      ) {
        return `"${text.replace(
          /"/g,
          '""'
        )}"`;
      }

      return text;
    };

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows.map((row) =>
        row.map(escapeCsv).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `ojt-reports-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  /* ==========================================================
     COMMON STYLES
  ========================================================== */

  const pageStyle = {
    width: "100%",
    minWidth: 0,
    color: colors.text,
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    letterSpacing: "-0.01em",
  };

  const cardStyle = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    boxShadow: darkMode
      ? "0 2px 8px rgba(0, 0, 0, 0.18)"
      : "0 2px 8px rgba(15, 23, 42, 0.035)",
  };

  const inputStyle = {
    height: "40px",
    border: `1px solid ${colors.border}`,
    borderRadius: "9px",
    background: colors.surface,
    color: colors.text,
    fontSize: "13px",
    fontWeight: 600,
    outline: "none",
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div style={pageStyle}>
      {/* ======================================================
          BREADCRUMB
      ======================================================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "13px",
          color: colors.textSecondary,
          fontSize: "13px",
        }}
      >
        <span
          style={{
            color: colors.primary,
            fontWeight: 700,
          }}
        >
          Dashboard
        </span>

        <ChevronRight
          size={14}
          color={colors.textMuted}
        />

        <span>
          Generate Reports
        </span>
      </div>

      {/* ======================================================
          HEADER
      ======================================================= */}

      <section
        className="ojt-report-header"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "22px",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "6px",
              color: colors.primary,
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.9px",
              textTransform: "uppercase",
            }}
          >
            OJT Administration
          </div>

          <h1
            style={{
              margin: 0,
              color: colors.text,
              fontSize: "28px",
              lineHeight: 1.2,
              fontWeight: 750,
              letterSpacing: "-0.55px",
            }}
          >
            Generate Reports
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: colors.textSecondary,
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            Generate and review consolidated OJT
            reports for students, companies and
            faculty mentors.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              loadReports(true)
            }
            disabled={refreshing}
            style={{
              height: "40px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              padding: "0 13px",
              border: `1px solid ${colors.border}`,
              borderRadius: "9px",
              background: colors.surface,
              color: colors.text,
              fontSize: "13px",
              fontWeight: 650,
              cursor: refreshing
                ? "not-allowed"
                : "pointer",
              opacity: refreshing ? 0.65 : 1,
            }}
          >
            <RefreshCw
              size={15}
              style={{
                animation: refreshing
                  ? "ojtReportsSpin 1s linear infinite"
                  : "none",
              }}
            />

            Refresh
          </button>

          <button
            type="button"
            onClick={exportReports}
            disabled={
              !filteredReports.length
            }
            style={{
              height: "40px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              padding: "0 14px",
              border: "none",
              borderRadius: "9px",
              background:
                filteredReports.length
                  ? colors.primary
                  : colors.textMuted,
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 700,
              cursor:
                filteredReports.length
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </section>

      {/* ======================================================
          STATISTICS
      ======================================================= */}

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
            title: "Total Reports",
            value: statistics.total,
            subtitle: "All OJT records",
            icon: FileBarChart2,
            background: colors.primarySoft,
            color: colors.primary,
          },
          {
            title: "Active OJT",
            value: statistics.active,
            subtitle: "Currently in progress",
            icon: Clock3,
            background: colors.warningSoft,
            color: colors.warning,
          },
          {
            title: "Completed OJT",
            value: statistics.completed,
            subtitle: "Training completed",
            icon: CheckCircle2,
            background: colors.successSoft,
            color: colors.success,
          },
          {
            title: "Needs Attention",
            value: statistics.needsAttention,
            subtitle: "Requires coordinator review",
            icon: AlertCircle,
            background: colors.dangerSoft,
            color: colors.danger,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              style={{
                ...cardStyle,
                padding: "17px",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  background: stat.background,
                  color: stat.color,
                }}
              >
                <Icon size={19} />
              </div>

              <div
                style={{
                  marginTop: "11px",
                  color: colors.textSecondary,
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {stat.title}
              </div>

              <div
                style={{
                  marginTop: "3px",
                  color: colors.text,
                  fontSize: "26px",
                  lineHeight: 1.1,
                  fontWeight: 750,
                }}
              >
                {formatNumber(stat.value)}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: colors.textMuted,
                  fontSize: "12px",
                }}
              >
                {stat.subtitle}
              </div>
            </div>
          );
        })}
      </section>

      {/* ======================================================
          SUMMARY
      ======================================================= */}

      <section
        className="ojt-report-summary-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            ...cardStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "17px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
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
                background:
                  colors.primarySoft,
                color: colors.primary,
              }}
            >
              <BarChart3 size={18} />
            </div>

            <div>
              <div
                style={{
                  color: colors.textSecondary,
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Average OJT Progress
              </div>

              <div
                style={{
                  marginTop: "2px",
                  color: colors.text,
                  fontSize: "21px",
                  fontWeight: 750,
                }}
              >
                {statistics.averageProgress}%
              </div>
            </div>
          </div>

          <div style={{ width: "150px" }}>
            <ProgressBar
              value={
                statistics.averageProgress
              }
              colors={colors}
            />
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "17px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
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
                background:
                  colors.primarySoft,
                color: colors.primary,
              }}
            >
              <GraduationCap size={18} />
            </div>

            <div>
              <div
                style={{
                  color: colors.textSecondary,
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Average Evaluated Marks
              </div>

              <div
                style={{
                  marginTop: "2px",
                  color: colors.text,
                  fontSize: "21px",
                  fontWeight: 750,
                }}
              >
                {statistics.averageMarks}

                <span
                  style={{
                    marginLeft: "3px",
                    color: colors.textMuted,
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  / 100
                </span>
              </div>
            </div>
          </div>

          <div style={{ width: "110px" }}>
            <ProgressBar
              value={
                statistics.averageMarks
              }
              colors={colors}
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          REPORT DIRECTORY
      ======================================================= */}

      <section
        style={{
          ...cardStyle,
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: `1px solid ${colors.border}`,
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
                  color: colors.text,
                  fontSize: "17px",
                  lineHeight: 1.3,
                  fontWeight: 750,
                }}
              >
                OJT Report Directory
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: colors.textSecondary,
                  fontSize: "13px",
                }}
              >
                Review consolidated student OJT
                records and performance details.
              </p>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: colors.textSecondary,
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              <FileText size={15} />

              {filteredReports.length} records
            </div>
          </div>

          {/* FILTERS */}

          <div
            className="ojt-report-filter-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(250px, 1fr) repeat(3, auto)",
              gap: "9px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 12px",
                border: `1px solid ${colors.border}`,
                borderRadius: "9px",
                background: colors.surface,
              }}
            >
              <Search
                size={16}
                color={colors.textMuted}
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
                placeholder="Search student, roll no., company or mentor..."
                style={{
                  width: "100%",
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: colors.text,
                  fontSize: "14px",
                }}
              />
            </div>

            <select
              value={selectedDepartment}
              onChange={(event) => {
                setSelectedDepartment(
                  event.target.value
                );
                setCurrentPage(1);
              }}
              style={{
                ...inputStyle,
                minWidth: "150px",
                padding: "0 11px",
                cursor: "pointer",
              }}
            >
              {departments.map(
                (department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedCompany}
              onChange={(event) => {
                setSelectedCompany(
                  event.target.value
                );
                setCurrentPage(1);
              }}
              style={{
                ...inputStyle,
                minWidth: "150px",
                maxWidth: "220px",
                padding: "0 11px",
                cursor: "pointer",
              }}
            >
              {companies.map((company) => (
                <option
                  key={company}
                  value={company}
                >
                  {company}
                </option>
              ))}
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
                ...inputStyle,
                minWidth: "145px",
                padding: "0 11px",
                cursor: "pointer",
              }}
            >
              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "11px",
              }}
            >
              <span
                style={{
                  color: colors.textSecondary,
                  fontSize: "12px",
                }}
              >
                Showing {filteredReports.length}{" "}
                filtered records.
              </span>

              <button
                type="button"
                onClick={clearFilters}
                style={{
                  border: "none",
                  background: "transparent",
                  color: colors.primary,
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: "3px",
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* ====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <div
            style={{
              minHeight: "360px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                border: `3px solid ${colors.primarySoft}`,
                borderTopColor:
                  colors.primary,
                borderRadius: "50%",
                animation:
                  "ojtReportsSpin 0.8s linear infinite",
              }}
            />

            <div
              style={{
                color: colors.textSecondary,
                fontSize: "14px",
                fontWeight: 650,
              }}
            >
              Loading OJT reports...
            </div>
          </div>
        ) : error ? (
          <div
            style={{
              minHeight: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                background:
                  colors.dangerSoft,
                color: colors.danger,
              }}
            >
              <AlertCircle size={23} />
            </div>

            <h3
              style={{
                margin: "13px 0 5px",
                color: colors.text,
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              Unable to load reports
            </h3>

            <p
              style={{
                maxWidth: "480px",
                margin: 0,
                color: colors.textSecondary,
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {error}
            </p>

            <button
              type="button"
              onClick={() => loadReports()}
              style={{
                marginTop: "16px",
                height: "38px",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "0 13px",
                border: "none",
                borderRadius: "8px",
                background:
                  colors.primary,
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        ) : filteredReports.length ===
          0 ? (
          <div
            style={{
              minHeight: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "13px",
                background:
                  colors.surfaceMuted,
                color: colors.textMuted,
              }}
            >
              <FileBarChart2 size={24} />
            </div>

            <h3
              style={{
                margin: "13px 0 5px",
                color: colors.text,
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              No reports found
            </h3>

            <p
              style={{
                maxWidth: "430px",
                margin: 0,
                color: colors.textSecondary,
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {hasFilters
                ? "No OJT records match the selected filters. Try clearing the filters."
                : "There are currently no OJT report records available."}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                style={{
                  marginTop: "15px",
                  height: "36px",
                  padding: "0 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  background:
                    colors.surface,
                  color: colors.primary,
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ==================================================
                TABLE
            =================================================== */}

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
                      "Company",
                      "Mentor",
                      "OJT Period",
                      "Progress",
                      "Attendance",
                      "Reports",
                      "Status",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        style={{
                          padding: "12px 14px",
                          background:
                            colors.surfaceMuted,
                          borderBottom: `1px solid ${colors.border}`,
                          color:
                            colors.textSecondary,
                          fontSize: "12px",
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
                  {paginatedReports.map(
                    (report) => (
                      <tr
                        key={String(
                          report.id
                        )}
                        onClick={() =>
                          setSelectedReport(
                            report
                          )
                        }
                        style={{
                          cursor: "pointer",
                          background:
                            colors.surface,
                        }}
                        onMouseEnter={(
                          event
                        ) => {
                          event.currentTarget.style.backgroundColor =
                            colors.surfaceMuted;
                        }}
                        onMouseLeave={(
                          event
                        ) => {
                          event.currentTarget.style.backgroundColor =
                            colors.surface;
                        }}
                      >
                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                minWidth:
                                  "36px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                borderRadius:
                                  "50%",
                                background:
                                  colors.primarySoft,
                                color:
                                  colors.primary,
                                fontSize:
                                  "12px",
                                fontWeight:
                                  800,
                              }}
                            >
                              {report.initials}
                            </div>

                            <div>
                              <strong
                                style={{
                                  display:
                                    "block",
                                  color:
                                    colors.text,
                                  fontSize:
                                    "14px",
                                  fontWeight:
                                    700,
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {
                                  report.student
                                }
                              </strong>

                              <span
                                style={{
                                  display:
                                    "block",
                                  marginTop:
                                    "3px",
                                  color:
                                    colors.textMuted,
                                  fontSize:
                                    "12px",
                                }}
                              >
                                {
                                  report.rollNumber
                                }
                              </span>
                            </div>
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                borderRadius:
                                  "8px",
                                background:
                                  colors.surfaceMuted,
                                color:
                                  colors.textSecondary,
                              }}
                            >
                              <Building2
                                size={15}
                              />
                            </div>

                            <div>
                              <div
                                style={{
                                  color:
                                    colors.text,
                                  fontSize:
                                    "14px",
                                  fontWeight:
                                    650,
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {
                                  report.company
                                }
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "2px",
                                  color:
                                    colors.textMuted,
                                  fontSize:
                                    "12px",
                                }}
                              >
                                {
                                  report.position
                                }
                              </div>
                            </div>
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                borderRadius:
                                  "50%",
                                background:
                                  darkMode
                                    ? "#2E2350"
                                    : "#f5f3ff",
                                color:
                                  darkMode
                                    ? "#C4B5FD"
                                    : "#7c3aed",
                                fontSize:
                                  "10px",
                                fontWeight:
                                  800,
                              }}
                            >
                              {getInitials(
                                report.mentor
                              )}
                            </div>

                            <div>
                              <div
                                style={{
                                  color:
                                    colors.text,
                                  fontSize:
                                    "14px",
                                  fontWeight:
                                    650,
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {
                                  report.mentor
                                }
                              </div>

                              {report.mentorDepartment && (
                                <div
                                  style={{
                                    marginTop:
                                      "2px",
                                    color:
                                      colors.textMuted,
                                    fontSize:
                                      "12px",
                                  }}
                                >
                                  {
                                    report.mentorDepartment
                                  }
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                            color:
                              colors.textSecondary,
                            fontSize: "13px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "6px",
                              marginBottom:
                                "4px",
                              color:
                                colors.text,
                              fontWeight:
                                650,
                            }}
                          >
                            <CalendarDays
                              size={14}
                              color={
                                colors.textMuted
                              }
                            />

                            {formatDate(
                              report.startDate
                            )}
                          </div>

                          <div
                            style={{
                              paddingLeft:
                                "20px",
                              color:
                                colors.textMuted,
                              fontSize:
                                "12px",
                            }}
                          >
                            to{" "}
                            {formatDate(
                              report.endDate
                            )}
                          </div>
                        </td>

                        <td
                          style={{
                            width: "140px",
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <ProgressBar
                            value={
                              report.progress
                            }
                            colors={colors}
                          />
                        </td>

                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <div
                            style={{
                              color:
                                report.attendance >=
                                80
                                  ? colors.success
                                  : colors.danger,
                              fontSize:
                                "14px",
                              fontWeight:
                                750,
                            }}
                          >
                            {
                              report.attendance
                            }%
                          </div>

                          <div
                            style={{
                              marginTop:
                                "3px",
                              color:
                                colors.textMuted,
                              fontSize:
                                "11px",
                            }}
                          >
                            {
                              report.attendancePresent
                            }{" "}
                            present
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <div
                            style={{
                              display:
                                "inline-flex",
                              alignItems:
                                "center",
                              gap: "6px",
                              color:
                                colors.text,
                              fontSize:
                                "14px",
                              fontWeight:
                                700,
                            }}
                          >
                            <FileText
                              size={14}
                              color={
                                colors.primary
                              }
                            />

                            {
                              report.weeklyReports
                            }
                          </div>

                          <div
                            style={{
                              marginTop:
                                "3px",
                              color:
                                colors.textMuted,
                              fontSize:
                                "11px",
                            }}
                          >
                            weekly
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <StatusBadge
                            status={
                              report.status
                            }
                            colors={
                              colors
                            }
                          />
                        </td>

                        <td
                          style={{
                            padding:
                              "13px 14px",
                            borderBottom: `1px solid ${colors.borderLight}`,
                          }}
                        >
                          <button
                            type="button"
                            onClick={(
                              event
                            ) => {
                              event.stopPropagation();

                              setSelectedReport(
                                report
                              );
                            }}
                            aria-label={`View report for ${report.student}`}
                            style={{
                              width: "34px",
                              height: "34px",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              border: `1px solid ${colors.border}`,
                              borderRadius:
                                "8px",
                              background:
                                colors.surface,
                              color:
                                colors.primary,
                              cursor:
                                "pointer",
                            }}
                          >
                            <Eye size={15} />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* ==================================================
                PAGINATION
            =================================================== */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: "15px",
                padding:
                  "13px 18px",
                borderTop: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  color:
                    colors.textSecondary,
                  fontSize: "12px",
                }}
              >
                Showing{" "}
                <strong
                  style={{
                    color: colors.text,
                  }}
                >
                  {filteredReports.length
                    ? startIndex + 1
                    : 0}
                </strong>{" "}
                to{" "}
                <strong
                  style={{
                    color: colors.text,
                  }}
                >
                  {Math.min(
                    startIndex +
                      PAGE_SIZE,
                    filteredReports.length
                  )}
                </strong>{" "}
                of{" "}
                <strong
                  style={{
                    color: colors.text,
                  }}
                >
                  {filteredReports.length}
                </strong>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          1,
                          page - 1
                        )
                    )
                  }
                  disabled={
                    safeCurrentPage === 1
                  }
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    border: `1px solid ${colors.border}`,
                    borderRadius:
                      "8px",
                    background:
                      colors.surface,
                    color:
                      safeCurrentPage ===
                      1
                        ? colors.textMuted
                        : colors.textSecondary,
                    cursor:
                      safeCurrentPage ===
                      1
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <ChevronLeft size={15} />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) =>
                    index + 1
                )
                  .filter(
                    (page) =>
                      totalPages <= 5 ||
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(
                        page -
                          safeCurrentPage
                      ) <= 1
                  )
                  .map(
                    (
                      page,
                      index,
                      pages
                    ) => {
                      const previous =
                        pages[index - 1];

                      const showEllipsis =
                        previous &&
                        page -
                          previous >
                          1;

                      return (
                        <span
                          key={page}
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            gap: "5px",
                          }}
                        >
                          {showEllipsis && (
                            <span
                              style={{
                                padding:
                                  "0 3px",
                                color:
                                  colors.textMuted,
                                fontSize:
                                  "12px",
                              }}
                            >
                              ...
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setCurrentPage(
                                page
                              )
                            }
                            style={{
                              width:
                                "32px",
                              height:
                                "32px",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              border:
                                page ===
                                safeCurrentPage
                                  ? `1px solid ${colors.primary}`
                                  : `1px solid ${colors.border}`,
                              borderRadius:
                                "8px",
                              background:
                                page ===
                                safeCurrentPage
                                  ? colors.primary
                                  : colors.surface,
                              color:
                                page ===
                                safeCurrentPage
                                  ? "#ffffff"
                                  : colors.textSecondary,
                              fontSize:
                                "12px",
                              fontWeight:
                                700,
                              cursor:
                                "pointer",
                            }}
                          >
                            {page}
                          </button>
                        </span>
                      );
                    }
                  )}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          totalPages,
                          page + 1
                        )
                    )
                  }
                  disabled={
                    safeCurrentPage ===
                    totalPages
                  }
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    border: `1px solid ${colors.border}`,
                    borderRadius:
                      "8px",
                    background:
                      colors.surface,
                    color:
                      safeCurrentPage ===
                      totalPages
                        ? colors.textMuted
                        : colors.textSecondary,
                    cursor:
                      safeCurrentPage ===
                      totalPages
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ======================================================
          DETAIL MODAL
      ======================================================= */}

      {selectedReport && (
        <Modal
          colors={colors}
          darkMode={darkMode}
          onClose={() =>
            setSelectedReport(null)
          }
        >
          {/* MODAL HEADER */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent:
                "space-between",
              gap: "16px",
              padding: "20px 22px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: colors.text,
                  fontSize: "18px",
                  lineHeight: 1.3,
                  fontWeight: 750,
                }}
              >
                OJT Report Details
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: colors.textSecondary,
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                Consolidated student training
                record
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedReport(null)
              }
              style={{
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: `1px solid ${colors.border}`,
                borderRadius: "9px",
                background:
                  colors.surfaceMuted,
                color:
                  colors.textSecondary,
                cursor: "pointer",
              }}
            >
              <X size={17} />
            </button>
          </div>

          <div
            style={{
              padding: "20px 22px 22px",
            }}
          >
            {/* STUDENT HEADER */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: "15px",
                padding: "16px",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                background:
                  colors.surfaceMuted,
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
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    borderRadius: "50%",
                    background:
                      colors.primarySoft,
                    color:
                      colors.primary,
                    fontSize: "14px",
                    fontWeight: 800,
                  }}
                >
                  {
                    selectedReport.initials
                  }
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: colors.text,
                      fontSize: "17px",
                      fontWeight: 750,
                    }}
                  >
                    {
                      selectedReport.student
                    }
                  </h3>

                  <p
                    style={{
                      margin:
                        "4px 0 0",
                      color:
                        colors.textSecondary,
                      fontSize: "13px",
                    }}
                  >
                    {
                      selectedReport.rollNumber
                    }{" "}
                    •{" "}
                    {
                      selectedReport.department
                    }
                  </p>
                </div>
              </div>

              <StatusBadge
                status={
                  selectedReport.status
                }
                colors={colors}
              />
            </div>

            {/* DETAILS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "10px",
                marginTop: "15px",
              }}
              className="ojt-report-detail-grid"
            >
              <DetailItem
                icon={Building2}
                label="Company"
                value={
                  selectedReport.company
                }
                colors={colors}
              />

              <DetailItem
                icon={GraduationCap}
                label="Position"
                value={
                  selectedReport.position
                }
                colors={colors}
              />

              <DetailItem
                icon={Users}
                label="Faculty Mentor"
                value={
                  selectedReport.mentor
                }
                colors={colors}
              />

              <DetailItem
                icon={CalendarDays}
                label="OJT Period"
                value={`${formatDate(
                  selectedReport.startDate
                )} — ${formatDate(
                  selectedReport.endDate
                )}`}
                colors={colors}
              />

              <DetailItem
                icon={FileText}
                label="Student ID"
                value={
                  selectedReport.studentId
                }
                colors={colors}
              />

              <DetailItem
                icon={Clock3}
                label="Location"
                value={
                  selectedReport.location
                }
                colors={colors}
              />
            </div>

            {/* METRICS */}

            <div
              className="ojt-report-detail-metrics"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "11px",
                  background:
                    colors.surface,
                }}
              >
                <div
                  style={{
                    color:
                      colors.textSecondary,
                    fontSize: "12px",
                    fontWeight: 650,
                  }}
                >
                  OJT Progress
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    color: colors.text,
                    fontSize: "22px",
                    fontWeight: 750,
                  }}
                >
                  {
                    selectedReport.progress
                  }
                  %
                </div>

                <div
                  style={{
                    marginTop: "9px",
                  }}
                >
                  <ProgressBar
                    value={
                      selectedReport.progress
                    }
                    colors={colors}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "15px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "11px",
                  background:
                    colors.surface,
                }}
              >
                <div
                  style={{
                    color:
                      colors.textSecondary,
                    fontSize: "12px",
                    fontWeight: 650,
                  }}
                >
                  Attendance
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    color:
                      selectedReport.attendance >=
                      80
                        ? colors.success
                        : colors.danger,
                    fontSize: "22px",
                    fontWeight: 750,
                  }}
                >
                  {
                    selectedReport.attendance
                  }%
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    color:
                      colors.textMuted,
                    fontSize: "12px",
                  }}
                >
                  {
                    selectedReport.attendancePresent
                  }{" "}
                  present •{" "}
                  {
                    selectedReport.attendanceAbsent
                  }{" "}
                  absent
                </div>
              </div>

              <div
                style={{
                  padding: "15px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "11px",
                  background:
                    colors.surface,
                }}
              >
                <div
                  style={{
                    color:
                      colors.textSecondary,
                    fontSize: "12px",
                    fontWeight: 650,
                  }}
                >
                  Evaluation
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    color: colors.text,
                    fontSize: "22px",
                    fontWeight: 750,
                  }}
                >
                  {selectedReport.totalMarks ??
                    "—"}

                  {selectedReport.totalMarks !==
                    null &&
                    selectedReport.totalMarks !==
                      undefined && (
                      <span
                        style={{
                          marginLeft:
                            "3px",
                          color:
                            colors.textMuted,
                          fontSize:
                            "13px",
                        }}
                      >
                        / 100
                      </span>
                    )}
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    color:
                      colors.textMuted,
                    fontSize: "12px",
                  }}
                >
                  {selectedReport.totalMarks !==
                  null
                    ? "Recorded evaluation"
                    : "Evaluation not available"}
                </div>
              </div>
            </div>

            {/* REPORT SUMMARY */}

            <div
              style={{
                marginTop: "15px",
                padding: "16px",
                border: `1px solid ${colors.border}`,
                borderRadius: "11px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: colors.text,
                  fontSize: "15px",
                  fontWeight: 750,
                }}
              >
                Report & Training Summary
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, minmax(0, 1fr))",
                  gap: "12px",
                  marginTop: "13px",
                }}
                className="ojt-report-summary-detail"
              >
                {[
                  [
                    "Weekly Reports",
                    selectedReport.weeklyReports,
                  ],
                  [
                    "Training Days",
                    `${selectedReport.completedDays} / ${selectedReport.totalDays}`,
                  ],
                  [
                    "Last Update",
                    selectedReport.lastUpdate
                      ? formatDate(
                          selectedReport.lastUpdate
                        )
                      : "Not available",
                  ],
                ].map(
                  ([label, value]) => (
                    <div key={label}>
                      <div
                        style={{
                          color:
                            colors.textMuted,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform:
                            "uppercase",
                        }}
                      >
                        {label}
                      </div>

                      <div
                        style={{
                          marginTop: "4px",
                          color:
                            colors.text,
                          fontSize:
                            "14px",
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
            </div>

            {/* EVALUATION STRUCTURE */}

            <div
              style={{
                marginTop: "15px",
                padding: "16px",
                border: `1px solid ${colors.border}`,
                borderRadius: "11px",
                background:
                  colors.surfaceMuted,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <GraduationCap
                  size={17}
                  color={
                    colors.primary
                  }
                />

                <h3
                  style={{
                    margin: 0,
                    color: colors.text,
                    fontSize: "15px",
                    fontWeight: 750,
                  }}
                >
                  Evaluation Structure
                </h3>
              </div>

              <p
                style={{
                  margin:
                    "7px 0 0",
                  color:
                    colors.textSecondary,
                  fontSize: "12px",
                  lineHeight: 1.5,
                }}
              >
                The portal's evaluation framework
                uses a 100-mark structure combining
                company and college assessment.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "10px",
                  marginTop: "12px",
                }}
                className="ojt-report-evaluation-grid"
              >
                <div
                  style={{
                    padding: "12px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "9px",
                    background:
                      colors.surface,
                  }}
                >
                  <div
                    style={{
                      color:
                        colors.primary,
                      fontSize: "12px",
                      fontWeight: 750,
                    }}
                  >
                    External — 50 Marks
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color:
                        colors.textSecondary,
                      fontSize: "12px",
                      lineHeight: 1.7,
                    }}
                  >
                    Hours Completed — 20
                    <br />
                    Performance — 20
                    <br />
                    Punctuality — 10
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "9px",
                    background:
                      colors.surface,
                  }}
                >
                  <div
                    style={{
                      color:
                        darkMode
                          ? "#C4B5FD"
                          : "#7c3aed",
                      fontSize: "12px",
                      fontWeight: 750,
                    }}
                  >
                    Internal — 50 Marks
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color:
                        colors.textSecondary,
                      fontSize: "12px",
                      lineHeight: 1.7,
                    }}
                  >
                    Weekly Reports — 15
                    <br />
                    Final Report — 20
                    <br />
                    Viva / Presentation — 15
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "18px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedReport(null)
                }
                style={{
                  height: "38px",
                  padding: "0 14px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  background:
                    colors.surface,
                  color: colors.text,
                  fontSize: "13px",
                  fontWeight: 650,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style>
        {`
          @keyframes ojtReportsSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 1100px) {
            .ojt-report-filter-grid {
              grid-template-columns:
                minmax(220px, 1fr)
                repeat(2, minmax(150px, auto)) !important;
            }

            .ojt-report-stat-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 800px) {
            .ojt-report-summary-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-filter-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-filter-grid select {
              width: 100%;
              max-width: none !important;
            }

            .ojt-report-detail-metrics {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-detail-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-summary-detail {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-evaluation-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 640px) {
            .ojt-report-stat-grid {
              grid-template-columns: 1fr !important;
            }

            .ojt-report-header {
              align-items: flex-start !important;
              flex-direction: column !important;
            }
          }
        `}
      </style>
    </div>
  );
}