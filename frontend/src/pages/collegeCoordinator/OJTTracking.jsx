import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  GraduationCap,
  MapPin,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { ojtTrackingService } from "../../services/ojtTrackingService";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

const PAGE_SIZE = 7;

const STATUS_OPTIONS = [
  "All Status",
  "Not Started",
  "In Progress",
  "Completing Soon",
  "Needs Attention",
  "Completed",
];

const safeNumber = (value, fallback = 0) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
};

const clampProgress = (value) => {
  return Math.min(
    Math.max(safeNumber(value, 0), 0),
    100
  );
};

const getInitials = (name = "") => {
  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "ST";

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatus = (
  assignmentStatus,
  progress,
  attendance
) => {
  const rawStatus = String(
    assignmentStatus || ""
  ).toLowerCase();

  if (
    rawStatus === "completed" ||
    rawStatus === "complete" ||
    progress >= 100
  ) {
    return "Completed";
  }

  if (
    rawStatus === "not started" ||
    rawStatus === "not_started"
  ) {
    return "Not Started";
  }

  if (progress >= 85) {
    return "Completing Soon";
  }

  if (
    progress < 50 ||
    attendance < 80
  ) {
    return "Needs Attention";
  }

  return "In Progress";
};

const getStatusIcon = (status) => {
  if (status === "Completed") {
    return <CheckCircle2 size={13} />;
  }

  if (status === "Needs Attention") {
    return <AlertCircle size={13} />;
  }

  if (status === "Completing Soon") {
    return <Target size={13} />;
  }

  if (status === "In Progress") {
    return <TrendingUp size={13} />;
  }

  return <Clock3 size={13} />;
};

const OJTTracking = () => {
  const { colors, darkMode } =
    useCoordinatorTheme();

  const [students, setStudents] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] =
    useState("");

  const [
    departmentFilter,
    setDepartmentFilter,
  ] = useState("All Departments");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  const [
    showDetailsModal,
    setShowDetailsModal,
  ] = useState(false);

  const [
    showProgressModal,
    setShowProgressModal,
  ] = useState(false);

  const [
    progressValue,
    setProgressValue,
  ] = useState(0);

  const [
    savingProgress,
    setSavingProgress,
  ] = useState(false);

  const loadTrackingData = async (
    showRefresh = false
  ) => {
    try {
      setError("");

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response =
        await ojtTrackingService.getTrackingStudents();

      if (
        response &&
        response.success === false
      ) {
        throw new Error(
          response.message ||
            "Failed to load OJT tracking data"
        );
      }

      let data = [];

      if (Array.isArray(response)) {
        data = response;
      } else if (
        Array.isArray(response?.trackingData)
      ) {
        data = response.trackingData;
      } else if (
        Array.isArray(response?.data)
      ) {
        data = response.data;
      } else if (
        Array.isArray(
          response?.data?.trackingData
        )
      ) {
        data =
          response.data.trackingData;
      }

      setStudents(data);
    } catch (err) {
      console.error(
        "OJT tracking error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load OJT tracking data"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTrackingData();
  }, []);

  const normalizedStudents =
    useMemo(() => {
      return students.map(
        (student, index) => {
          const progress =
            clampProgress(
              student.progress
            );

          const attendance =
            safeNumber(
              student.attendance
            );

          const status = getStatus(
            student.assignmentStatus ||
              student.status,
            progress,
            attendance
          );

          return {
            ...student,

            _rowId:
              student.id ||
              student.assignmentId ||
              `tracking-${index}`,

            assignmentId:
              student.assignmentId ||
              student.id ||
              "",

            applicationId:
              student.applicationId || "",

            studentId:
              student.studentId || "",

            studentName:
              student.student ||
              student.studentName ||
              "Unknown Student",

            initials:
              student.initials ||
              getInitials(
                student.student ||
                  student.studentName
              ),

            rollNumber:
              student.rollNumber || "N/A",

            department:
              student.department || "N/A",

            companyName:
              student.company ||
              student.companyName ||
              "Company not found",

            companyId:
              student.companyId || "",

            opportunityTitle:
              student.position ||
              student.opportunityTitle ||
              "Opportunity not found",

            mentorName:
              student.mentor ||
              student.mentorName ||
              "Unknown Mentor",

            mentorDepartment:
              student.mentorDepartment || "",

            startDate:
              student.startDate || "",

            endDate:
              student.endDate || "",

            progress,

            attendance,

            attendancePresent:
              safeNumber(
                student.attendancePresent
              ),

            attendanceAbsent:
              safeNumber(
                student.attendanceAbsent
              ),

            attendanceLeave:
              safeNumber(
                student.attendanceLeave
              ),

            status,

            assignmentStatus:
              student.assignmentStatus ||
              "Assigned",

            location:
              student.location ||
              "Not specified",

            totalDays:
              safeNumber(
                student.totalDays
              ),

            completedDays:
              safeNumber(
                student.completedDays
              ),

            weeklyReports:
              safeNumber(
                student.weeklyReports
              ),

            lastUpdate:
              student.lastUpdate ||
              "Not available",

            cgpa:
              student.cgpa ?? null,
          };
        }
      );
    }, [students]);

  const departments =
    useMemo(() => {
      const values =
        normalizedStudents
          .map(
            (student) =>
              student.department
          )
          .filter(Boolean);

      return [
        "All Departments",
        ...Array.from(
          new Set(values)
        ).sort(),
      ];
    }, [normalizedStudents]);

  const filteredStudents =
    useMemo(() => {
      const keyword =
        search.trim().toLowerCase();

      return normalizedStudents.filter(
        (student) => {
          const matchesSearch =
            !keyword ||
            String(
              student.studentName
            )
              .toLowerCase()
              .includes(keyword) ||
            String(
              student.rollNumber
            )
              .toLowerCase()
              .includes(keyword) ||
            String(
              student.department
            )
              .toLowerCase()
              .includes(keyword) ||
            String(
              student.companyName
            )
              .toLowerCase()
              .includes(keyword) ||
            String(
              student.mentorName
            )
              .toLowerCase()
              .includes(keyword) ||
            String(
              student.opportunityTitle
            )
              .toLowerCase()
              .includes(keyword);

          const matchesDepartment =
            departmentFilter ===
              "All Departments" ||
            student.department ===
              departmentFilter;

          const matchesStatus =
            statusFilter === "All Status" ||
            student.status === statusFilter;

          return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
          );
        }
      );
    }, [
      normalizedStudents,
      search,
      departmentFilter,
      statusFilter,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        PAGE_SIZE
    )
  );

  const paginatedStudents =
    useMemo(() => {
      const start =
        (currentPage - 1) *
        PAGE_SIZE;

      return filteredStudents.slice(
        start,
        start + PAGE_SIZE
      );
    }, [
      filteredStudents,
      currentPage,
    ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    departmentFilter,
    statusFilter,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  const stats = useMemo(() => {
    const total =
      normalizedStudents.length;

    const completed =
      normalizedStudents.filter(
        (student) =>
          student.status === "Completed"
      ).length;

    const inProgress =
      normalizedStudents.filter(
        (student) =>
          student.status === "In Progress"
      ).length;

    const completingSoon =
      normalizedStudents.filter(
        (student) =>
          student.status ===
          "Completing Soon"
      ).length;

    const attention =
      normalizedStudents.filter(
        (student) =>
          student.status ===
          "Needs Attention"
      ).length;

    const totalProgress =
      normalizedStudents.reduce(
        (sum, student) =>
          sum + student.progress,
        0
      );

    const averageProgress = total
      ? Math.round(
          totalProgress / total
        )
      : 0;

    const averageAttendance = total
      ? Math.round(
          normalizedStudents.reduce(
            (sum, student) =>
              sum + student.attendance,
            0
          ) / total
        )
      : 0;

    return {
      total,
      completed,
      inProgress,
      completingSoon,
      attention,
      averageProgress,
      averageAttendance,
    };
  }, [normalizedStudents]);

  const openDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const closeDetails = () => {
    setShowDetailsModal(false);
    setSelectedStudent(null);
  };

  const openProgress = (student) => {
    setSelectedStudent(student);

    setProgressValue(
      clampProgress(student.progress)
    );

    setShowDetailsModal(false);
    setShowProgressModal(true);
  };

  const closeProgress = () => {
    if (savingProgress) return;

    setShowProgressModal(false);
    setSelectedStudent(null);
    setProgressValue(0);
  };

  const handleProgressUpdate = async (
    event
  ) => {
    event.preventDefault();

    if (!selectedStudent) return;

    const id =
      selectedStudent.assignmentId ||
      selectedStudent.id;

    if (!id) {
      setError(
        "Unable to identify the OJT assignment."
      );
      return;
    }

    try {
      setSavingProgress(true);
      setError("");

      const response =
        await ojtTrackingService.updateTrackingProgress(
          id,
          {
            progress:
              Number(progressValue),
          }
        );

      if (
        response?.success === false
      ) {
        throw new Error(
          response.message ||
            "Failed to update progress"
        );
      }

      setShowProgressModal(false);
      setSelectedStudent(null);

      await loadTrackingData(true);
    } catch (err) {
      console.error(
        "Update OJT progress error:",
        err
      );

      setError(
        err?.message ||
          "Failed to update OJT progress"
      );
    } finally {
      setSavingProgress(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setDepartmentFilter(
      "All Departments"
    );
    setStatusFilter("All Status");
    setCurrentPage(1);
  };

  const getStatusStyles = (status) => {
    if (status === "Completed") {
      return {
        background: colors.successSoft,
        color: colors.success,
        border: `1px solid ${colors.success}35`,
      };
    }

    if (status === "Needs Attention") {
      return {
        background: colors.dangerSoft,
        color: colors.danger,
        border: `1px solid ${colors.danger}35`,
      };
    }

    if (status === "Completing Soon") {
      return {
        background: colors.warningSoft,
        color: colors.warning,
        border: `1px solid ${colors.warning}35`,
      };
    }

    if (status === "In Progress") {
      return {
        background: colors.primarySoft,
        color: colors.primary,
        border: `1px solid ${colors.primary}35`,
      };
    }

    return {
      background: colors.surfaceMuted,
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
    };
  };

  const statCards = [
    {
      label: "Total OJT Students",
      value: stats.total,
      icon: <Users size={21} />,
      background: colors.primarySoft,
      iconColor: colors.primary,
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: <CheckCircle2 size={21} />,
      background: colors.successSoft,
      iconColor: colors.success,
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: <TrendingUp size={21} />,
      background: colors.infoSoft,
      iconColor: colors.info,
    },
    {
      label: "Needs Attention",
      value: stats.attention,
      icon: <AlertCircle size={21} />,
      background: colors.dangerSoft,
      iconColor: colors.danger,
    },
  ];

  return (
    <div
      className="ojt-tracking-page"
      style={{
        "--workspace": colors.workspace,
        "--surface": colors.surface,
        "--surface-muted":
          colors.surfaceMuted,
        "--text": colors.text,
        "--text-secondary":
          colors.textSecondary,
        "--text-muted": colors.textMuted,
        "--border": colors.border,
        "--border-light":
          colors.borderLight,
        "--primary": colors.primary,
        "--primary-hover":
          colors.primaryHover,
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        .ojt-tracking-page {
          width: 100%;
          min-height: 100vh;
          padding: 30px 32px 42px;
          background: var(--workspace);
          color: var(--text);
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: -0.01em;
        }

        .tracking-container {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .breadcrumb-current {
          color: var(--text);
          font-weight: 600;
        }

        .page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .page-title {
          margin: 0;
          color: var(--text);
          font-size: 28px;
          line-height: 36px;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .page-description {
          margin: 6px 0 0;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 22px;
        }

        .refresh-button {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background .18s ease,
            border-color .18s ease;
        }

        .refresh-button:hover {
          background: var(--surface-muted);
          border-color: var(--text-muted);
        }

        .stats-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 22px;
        }

        .stat-card {
          min-height: 118px;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 19px 20px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface);
          box-shadow:
            0 1px 2px rgba(15, 23, 42, .04);
        }

        .stat-icon {
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .stat-label {
          margin: 0 0 4px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 19px;
          font-weight: 500;
        }

        .stat-value {
          margin: 0;
          color: var(--text);
          font-size: 26px;
          line-height: 32px;
          font-weight: 700;
        }

        .secondary-stats {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 22px;
        }

        .secondary-stat {
          padding: 16px 18px;
          border: 1px solid var(--border);
          border-radius: 11px;
          background: var(--surface);
        }

        .secondary-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .secondary-stat-label {
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
        }

        .secondary-stat-value {
          color: var(--text);
          font-size: 20px;
          font-weight: 700;
        }

        .error-banner {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
          padding: 12px 14px;
          border: 1px solid ${colors.danger}45;
          border-radius: 9px;
          background: ${colors.dangerSoft};
          color: ${colors.danger};
          font-size: 13px;
          line-height: 20px;
        }

        .error-close {
          margin-left: auto;
          padding: 0;
          border: none;
          background: transparent;
          color: ${colors.danger};
          cursor: pointer;
        }

        .directory-card {
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: var(--surface);
          box-shadow:
            0 1px 2px rgba(15, 23, 42, .04);
        }

        .directory-header {
          padding: 20px 21px;
          border-bottom: 1px solid var(--border);
        }

        .section-heading {
          margin: 0;
          color: var(--text);
          font-size: 17px;
          line-height: 24px;
          font-weight: 700;
        }

        .section-description {
          margin: 4px 0 17px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .filters {
          display: grid;
          grid-template-columns:
            minmax(250px, 1.6fr)
            minmax(170px, 1fr)
            minmax(150px, .9fr)
            auto;
          gap: 10px;
          align-items: center;
        }

        .search-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input,
        .filter-select {
          width: 100%;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 8px;
          outline: none;
          background: var(--surface);
          color: var(--text);
          font-family: inherit;
          font-size: 14px;
          transition:
            border-color .18s ease,
            box-shadow .18s ease;
        }

        .search-input {
          padding: 0 12px 0 37px;
        }

        .filter-select {
          padding: 0 34px 0 12px;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-input:focus,
        .filter-select:focus {
          border-color: var(--primary);
          box-shadow:
            0 0 0 3px ${colors.primary}18;
        }

        .clear-button {
          height: 40px;
          padding: 0 13px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .clear-button:hover {
          background: var(--surface-muted);
        }

        .table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .tracking-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1050px;
        }

        .tracking-table th {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          background: var(--surface-muted);
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 18px;
          font-weight: 700;
          text-align: left;
          white-space: nowrap;
        }

        .tracking-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-light);
          color: var(--text);
          font-size: 14px;
          line-height: 20px;
          vertical-align: middle;
        }

        .tracking-row {
          cursor: pointer;
          transition: background .15s ease;
        }

        .tracking-row:hover td {
          background: ${colors.primarySoft};
        }

        .student-cell {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 190px;
        }

        .student-avatar {
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: ${colors.primarySoft};
          color: ${colors.primary};
          font-size: 12px;
          font-weight: 700;
        }

        .student-name {
          color: var(--text);
          font-weight: 600;
        }

        .student-meta {
          margin-top: 2px;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .company-name {
          color: var(--text);
          font-weight: 600;
        }

        .position-text {
          max-width: 180px;
          color: var(--text-secondary);
          font-size: 13px;
        }

        .mentor-cell {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--text);
        }

        .progress-cell {
          min-width: 120px;
        }

        .progress-top {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 6px;
        }

        .progress-value {
          color: var(--text);
          font-weight: 700;
        }

        .progress-track {
          width: 100%;
          height: 6px;
          overflow: hidden;
          border-radius: 999px;
          background: var(--border);
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: ${colors.primary};
          transition: width .2s ease;
        }

        .progress-fill.completed {
          background: ${colors.success};
        }

        .progress-fill.low {
          background: ${colors.danger};
        }

        .attendance-text {
          color: var(--text);
          font-weight: 600;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          min-height: 27px;
          padding: 0 8px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .action-button {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
        }

        .action-button:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--surface-muted);
        }

        .table-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 14px 18px;
          border-top: 1px solid var(--border);
        }

        .result-count {
          color: var(--text-secondary);
          font-size: 12px;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .page-button {
          min-width: 32px;
          height: 32px;
          padding: 0 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .page-button:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
        }

        .page-button.active {
          border-color: var(--primary);
          background: var(--primary);
          color: white;
        }

        .page-button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .loading-state,
        .empty-state {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 30px;
          color: var(--text-secondary);
          text-align: center;
        }

        .loading-icon {
          animation: spin 1s linear infinite;
          color: var(--primary);
        }

        .empty-icon {
          color: var(--text-muted);
        }

        .empty-title {
          color: var(--text);
          font-size: 14px;
          font-weight: 700;
        }

        .empty-text {
          max-width: 430px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(2, 6, 23, .58);
        }

        .modal {
          width: min(720px, 100%);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface);
          color: var(--text);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, .25);
        }

        .modal.small {
          width: min(470px, 100%);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border);
        }

        .modal-title {
          margin: 0;
          color: var(--text);
          font-size: 17px;
          font-weight: 700;
        }

        .modal-close {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 7px;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .modal-close:hover {
          background: var(--surface-muted);
          color: var(--text);
        }

        .modal-body {
          padding: 20px;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .large-avatar {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: ${colors.primarySoft};
          color: ${colors.primary};
          font-size: 17px;
          font-weight: 700;
        }

        .profile-name {
          margin: 0;
          color: var(--text);
          font-size: 18px;
          font-weight: 700;
        }

        .profile-meta {
          margin-top: 4px;
          color: var(--text-secondary);
          font-size: 13px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .detail-item {
          padding: 13px 14px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface-muted);
        }

        .detail-label {
          margin-bottom: 4px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
        }

        .detail-value {
          color: var(--text);
          font-size: 14px;
          font-weight: 600;
          word-break: break-word;
        }

        .progress-summary {
          margin-top: 18px;
          padding: 16px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface-muted);
        }

        .progress-summary-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 9px;
        }

        .progress-summary-title {
          color: var(--text);
          font-size: 13px;
          font-weight: 700;
        }

        .progress-summary-value {
          color: var(--primary);
          font-size: 16px;
          font-weight: 700;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 20px;
        }

        .secondary-button,
        .primary-button {
          min-height: 40px;
          padding: 0 15px;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .secondary-button {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
        }

        .secondary-button:hover {
          background: var(--surface-muted);
        }

        .primary-button {
          border: 1px solid var(--primary);
          background: var(--primary);
          color: white;
        }

        .primary-button:hover {
          background: var(--primary-hover);
          border-color: var(--primary-hover);
        }

        .primary-button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .progress-form-label {
          display: block;
          margin-bottom: 9px;
          color: var(--text);
          font-size: 13px;
          font-weight: 600;
        }

        .progress-number {
          margin-bottom: 14px;
          color: var(--primary);
          font-size: 28px;
          font-weight: 700;
          text-align: center;
        }

        .progress-range {
          width: 100%;
          accent-color: ${colors.primary};
          cursor: pointer;
        }

        .range-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          color: var(--text-muted);
          font-size: 11px;
        }

        .modal-note {
          margin-top: 14px;
          padding: 11px 12px;
          border-radius: 8px;
          background: ${colors.infoSoft};
          color: ${colors.info};
          font-size: 12px;
          line-height: 19px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1100px) {
          .stats-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .filters {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .clear-button {
            width: 100%;
          }
        }

        @media (max-width: 760px) {
          .ojt-tracking-page {
            padding: 22px 16px 32px;
          }

          .page-header {
            flex-direction: column;
          }

          .refresh-button {
            width: 100%;
          }

          .stats-grid,
          .secondary-stats {
            grid-template-columns: 1fr;
          }

          .filters {
            grid-template-columns: 1fr;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .table-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .pagination {
            width: 100%;
            justify-content: flex-end;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 24px;
            line-height: 31px;
          }

          .directory-header {
            padding: 16px;
          }

          .modal-overlay {
            padding: 10px;
          }

          .modal-body {
            padding: 16px;
          }
        }
      `}</style>

      <div className="tracking-container">
        <div className="breadcrumb">
          <span>College Coordinator</span>
          <span>/</span>
          <span className="breadcrumb-current">
            OJT Tracking
          </span>
        </div>

        <div className="page-header">
          <div>
            <h1 className="page-title">
              OJT Tracking
            </h1>

            <p className="page-description">
              Monitor student OJT progress,
              attendance, mentors and
              completion status.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={() =>
              loadTrackingData(true)
            }
            disabled={refreshing}
          >
            <RefreshCw
              size={15}
              className={
                refreshing
                  ? "loading-icon"
                  : ""
              }
            />
            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={17} />

            <span>{error}</span>

            <button
              type="button"
              className="error-close"
              onClick={() => setError("")}
              aria-label="Close error"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="stats-grid">
          {statCards.map((stat) => (
            <div
              className="stat-card"
              key={stat.label}
            >
              <div
                className="stat-icon"
                style={{
                  background:
                    stat.background,
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </div>

              <div>
                <p className="stat-label">
                  {stat.label}
                </p>

                <p className="stat-value">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="secondary-stats">
          <div className="secondary-stat">
            <div className="secondary-stat-top">
              <span className="secondary-stat-label">
                Completing Soon
              </span>

              <span
                className="secondary-stat-value"
                style={{
                  color: colors.warning,
                }}
              >
                {stats.completingSoon}
              </span>
            </div>
          </div>

          <div className="secondary-stat">
            <div className="secondary-stat-top">
              <span className="secondary-stat-label">
                Average Progress
              </span>

              <span
                className="secondary-stat-value"
                style={{
                  color: colors.primary,
                }}
              >
                {stats.averageProgress}%
              </span>
            </div>
          </div>

          <div className="secondary-stat">
            <div className="secondary-stat-top">
              <span className="secondary-stat-label">
                Average Attendance
              </span>

              <span
                className="secondary-stat-value"
                style={{
                  color:
                    stats.averageAttendance >=
                    80
                      ? colors.success
                      : colors.warning,
                }}
              >
                {stats.averageAttendance}%
              </span>
            </div>
          </div>
        </div>

        <section className="directory-card">
          <div className="directory-header">
            <h2 className="section-heading">
              OJT STUDENT TRACKING
            </h2>

            <p className="section-description">
              Track assigned students,
              mentors, attendance and
              OJT progress.
            </p>

            <div className="filters">
              <div className="search-wrapper">
                <Search
                  size={16}
                  className="search-icon"
                />

                <input
                  type="text"
                  className="search-input"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search student, roll no., company, mentor..."
                />
              </div>

              <select
                className="filter-select"
                value={departmentFilter}
                onChange={(event) =>
                  setDepartmentFilter(
                    event.target.value
                  )
                }
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
                className="filter-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >
                {STATUS_OPTIONS.map(
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
                className="clear-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <RefreshCw
                size={26}
                className="loading-icon"
              />

              <div className="empty-title">
                Loading OJT tracking...
              </div>

              <div className="empty-text">
                Fetching current student
                progress from the database.
              </div>
            </div>
          ) : filteredStudents.length ===
            0 ? (
            <div className="empty-state">
              <Users
                size={34}
                className="empty-icon"
              />

              <div className="empty-title">
                No OJT students found
              </div>

              <div className="empty-text">
                No tracking records match
                your current search and
                filter criteria.
              </div>
            </div>
          ) : (
            <>
              <div className="table-wrap">
                <table className="tracking-table">
                  <thead>
                    <tr>
                      <th>STUDENT</th>
                      <th>COMPANY</th>
                      <th>POSITION</th>
                      <th>MENTOR</th>
                      <th>PROGRESS</th>
                      <th>ATTENDANCE</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedStudents.map(
                      (student) => {
                        const progressClass =
                          student.progress >=
                          100
                            ? "completed"
                            : student.progress <
                              30
                            ? "low"
                            : "";

                        return (
                          <tr
                            key={
                              student._rowId
                            }
                            className="tracking-row"
                            onClick={() =>
                              openDetails(
                                student
                              )
                            }
                          >
                            <td>
                              <div className="student-cell">
                                <div className="student-avatar">
                                  {
                                    student.initials
                                  }
                                </div>

                                <div>
                                  <div className="student-name">
                                    {
                                      student.studentName
                                    }
                                  </div>

                                  <div className="student-meta">
                                    {
                                      student.rollNumber
                                    }
                                    {" • "}
                                    {
                                      student.department
                                    }
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="company-name">
                                {
                                  student.companyName
                                }
                              </div>
                            </td>

                            <td>
                              <div className="position-text">
                                {
                                  student.opportunityTitle
                                }
                              </div>
                            </td>

                            <td>
                              <div className="mentor-cell">
                                <UserRound
                                  size={15}
                                  color={
                                    colors.textSecondary
                                  }
                                />

                                <span>
                                  {
                                    student.mentorName
                                  }
                                </span>
                              </div>
                            </td>

                            <td>
                              <div className="progress-cell">
                                <div className="progress-top">
                                  <span className="progress-value">
                                    {
                                      student.progress
                                    }
                                    %
                                  </span>
                                </div>

                                <div className="progress-track">
                                  <div
                                    className={`progress-fill ${progressClass}`}
                                    style={{
                                      width: `${student.progress}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="attendance-text">
                                {
                                  student.attendance
                                }
                                %
                              </span>
                            </td>

                            <td>
                              <span
                                className="status-badge"
                                style={getStatusStyles(
                                  student.status
                                )}
                              >
                                {getStatusIcon(
                                  student.status
                                )}

                                {
                                  student.status
                                }
                              </span>
                            </td>

                            <td
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                            >
                              <button
                                type="button"
                                className="action-button"
                                onClick={() =>
                                  openDetails(
                                    student
                                  )
                                }
                                title="View details"
                              >
                                <Eye
                                  size={16}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <div className="result-count">
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) *
                      PAGE_SIZE +
                      1,
                    filteredStudents.length
                  )}
                  {" - "}
                  {Math.min(
                    currentPage *
                      PAGE_SIZE,
                    filteredStudents.length
                  )}{" "}
                  of{" "}
                  {filteredStudents.length}{" "}
                  students
                </div>

                <div className="pagination">
                  <button
                    type="button"
                    className="page-button"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            page - 1,
                            1
                          )
                      )
                    }
                  >
                    <ChevronLeft
                      size={15}
                    />
                  </button>

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (
                    <button
                      type="button"
                      key={page}
                      className={`page-button ${
                        currentPage === page
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="page-button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            page + 1,
                            totalPages
                          )
                      )
                    }
                  >
                    <ChevronRight
                      size={15}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {showDetailsModal &&
        selectedStudent && (
          <div
            className="modal-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeDetails();
              }
            }}
          >
            <div className="modal">
              <div className="modal-header">
                <h2 className="modal-title">
                  OJT Student Details
                </h2>

                <button
                  type="button"
                  className="modal-close"
                  onClick={closeDetails}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body">
                <div className="profile-header">
                  <div className="large-avatar">
                    {
                      selectedStudent.initials
                    }
                  </div>

                  <div>
                    <h3 className="profile-name">
                      {
                        selectedStudent.studentName
                      }
                    </h3>

                    <div className="profile-meta">
                      {
                        selectedStudent.rollNumber
                      }
                      {" • "}
                      {
                        selectedStudent.department
                      }
                    </div>
                  </div>
                </div>

                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">
                      Student ID
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.studentId ||
                        "—"
                      }
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      CGPA
                    </div>

                    <div className="detail-value">
                      {selectedStudent.cgpa ??
                        "—"}
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Company
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.companyName
                      }
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Position
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.opportunityTitle
                      }
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Mentor
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.mentorName
                      }
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Location
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.location
                      }
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Start Date
                    </div>

                    <div className="detail-value">
                      {formatDate(
                        selectedStudent.startDate
                      )}
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      End Date
                    </div>

                    <div className="detail-value">
                      {formatDate(
                        selectedStudent.endDate
                      )}
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Attendance
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.attendance
                      }
                      %
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Weekly Reports
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.weeklyReports
                      }
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Completed Days
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.completedDays
                      }
                      {" / "}
                      {
                        selectedStudent.totalDays
                      }
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      Last Update
                    </div>

                    <div className="detail-value">
                      {
                        selectedStudent.lastUpdate
                      }
                    </div>
                  </div>
                </div>

                <div className="progress-summary">
                  <div className="progress-summary-head">
                    <span className="progress-summary-title">
                      OJT Progress
                    </span>

                    <span className="progress-summary-value">
                      {
                        selectedStudent.progress
                      }
                      %
                    </span>
                  </div>

                  <div className="progress-track">
                    <div
                      className={`progress-fill ${
                        selectedStudent.progress >=
                        100
                          ? "completed"
                          : selectedStudent
                              .progress < 30
                          ? "low"
                          : ""
                      }`}
                      style={{
                        width: `${selectedStudent.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={closeDetails}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                      openProgress(
                        selectedStudent
                      )
                    }
                  >
                    <TrendingUp
                      size={15}
                      style={{
                        marginRight: 6,
                        verticalAlign:
                          "middle",
                      }}
                    />
                    Update Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {showProgressModal &&
        selectedStudent && (
          <div
            className="modal-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget &&
                !savingProgress
              ) {
                closeProgress();
              }
            }}
          >
            <div className="modal small">
              <div className="modal-header">
                <h2 className="modal-title">
                  Update OJT Progress
                </h2>

                <button
                  type="button"
                  className="modal-close"
                  onClick={closeProgress}
                  disabled={savingProgress}
                >
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={
                  handleProgressUpdate
                }
              >
                <div className="modal-body">
                  <div className="profile-header">
                    <div className="large-avatar">
                      {
                        selectedStudent.initials
                      }
                    </div>

                    <div>
                      <h3 className="profile-name">
                        {
                          selectedStudent.studentName
                        }
                      </h3>

                      <div className="profile-meta">
                        {
                          selectedStudent.companyName
                        }
                      </div>
                    </div>
                  </div>

                  <label className="progress-form-label">
                    OJT Completion Percentage
                  </label>

                  <div className="progress-number">
                    {progressValue}%
                  </div>

                  <input
                    type="range"
                    className="progress-range"
                    min="0"
                    max="100"
                    step="1"
                    value={progressValue}
                    onChange={(event) =>
                      setProgressValue(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    disabled={
                      savingProgress
                    }
                  />

                  <div className="range-labels">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>

                  <div className="modal-note">
                    Updating this value will
                    save the OJT progress to
                    MongoDB and refresh the
                    tracking records.
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={
                        closeProgress
                      }
                      disabled={
                        savingProgress
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-button"
                      disabled={
                        savingProgress
                      }
                    >
                      {savingProgress ? (
                        <>
                          <RefreshCw
                            size={14}
                            className="loading-icon"
                            style={{
                              marginRight: 6,
                              verticalAlign:
                                "middle",
                            }}
                          />
                          Saving...
                        </>
                      ) : (
                        "Save Progress"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default OJTTracking;