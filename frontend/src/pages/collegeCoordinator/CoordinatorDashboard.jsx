import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  Megaphone,
  RefreshCw,
  Users,
  X,
  AlertCircle,
  BriefcaseBusiness,
} from "lucide-react";

import { coordinatorDashboardService } from "../../services/coordinatorDashboardService";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

const formatNumber = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return "0";
  }

  return number.toLocaleString("en-IN");
};

const formatDate = (value) => {
  if (!value) {
    return "Not available";
  }

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

const getInitials = (name = "") => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("");

  return initials || "ST";
};

function CoordinatorDashboard() {
  const navigate = useNavigate();
  const { colors } = useCoordinatorTheme();

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] = useState(null);

  const loadDashboard = async (
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
        await coordinatorDashboardService.getDashboard();

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to load dashboard data."
        );
      }

      setDashboard(
        response.data || {}
      );
    } catch (err) {
      console.error(
        "Coordinator dashboard loading error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats =
    dashboard?.stats || {};

  const studentStats =
    dashboard?.studentStats || {};

  const companyStats =
    dashboard?.companyStats || {};

  const ojtStats =
    dashboard?.ojtStats || {};

  const announcements =
    dashboard?.recentAnnouncements || [];

  const assignments =
    dashboard?.recentAssignments || [];

  const departments =
    dashboard?.departmentBreakdown || [];

  const companyBreakdown =
    dashboard?.companyBreakdown || [];

  const totalDepartmentStudents =
    useMemo(() => {
      return departments.reduce(
        (total, item) =>
          total +
          Number(item?.count || 0),
        0
      );
    }, [departments]);

  const averageProgress =
    Math.max(
      0,
      Math.min(
        100,
        Number(
          ojtStats?.averageProgress || 0
        )
      )
    );

  const goToStudents = () => {
    navigate("/coordinator/students");
  };

  const goToCompanies = () => {
    navigate("/coordinator/companies");
  };

  const goToTracking = () => {
    navigate("/coordinator/tracking");
  };

  const goToReports = () => {
    navigate("/coordinator/reports");
  };

  const handleDepartmentClick = (
    department
  ) => {
    navigate(
      `/coordinator/students?department=${encodeURIComponent(
        department
      )}`
    );
  };

  const getStatusColors = (status) => {
    const value = String(
      status || ""
    ).toLowerCase();

    if (
      value === "completed" ||
      value === "approved"
    ) {
      return {
        background:
          colors.successSoft,
        color: colors.success,
        border:
          `${colors.success}45`,
      };
    }

    if (
      value === "pending"
    ) {
      return {
        background:
          colors.warningSoft,
        color: colors.warning,
        border:
          `${colors.warning}45`,
      };
    }

    if (
      value === "rejected"
    ) {
      return {
        background:
          colors.dangerSoft,
        color: colors.danger,
        border:
          `${colors.danger}45`,
      };
    }

    if (
      value === "needs attention"
    ) {
      return {
        background:
          colors.warningSoft,
        color: colors.warning,
        border:
          `${colors.warning}45`,
      };
    }

    return {
      background:
        colors.primarySoft,
      color: colors.primary,
      border:
        `${colors.primary}45`,
    };
  };

  const getPriorityColors = (
    priority
  ) => {
    const value = String(
      priority || ""
    ).toLowerCase();

    if (value === "high") {
      return {
        background:
          colors.dangerSoft,
        color: colors.danger,
        border:
          `${colors.danger}45`,
      };
    }

    if (value === "low") {
      return {
        background:
          colors.surfaceMuted,
        color:
          colors.textSecondary,
        border:
          colors.border,
      };
    }

    return {
      background:
        colors.primarySoft,
      color: colors.primary,
      border:
        `${colors.primary}45`,
    };
  };

  const statCards = [
    {
      title: "Total Students",
      value:
        stats.totalStudents,
      helper: `${formatNumber(
        studentStats.verified
      )} verified`,
      icon: Users,
      iconBackground:
        colors.primarySoft,
      iconColor:
        colors.primary,
      onClick:
        goToStudents,
    },
    {
      title: "Total Companies",
      value:
        stats.totalCompanies,
      helper: `${formatNumber(
        companyStats.approved
      )} approved`,
      icon: Building2,
      iconBackground:
        colors.successSoft,
      iconColor:
        colors.success,
      onClick:
        goToCompanies,
    },
    {
      title: "Active OJT",
      value: stats.activeOjt,
      helper: `${formatNumber(
        ojtStats.needsAttention
      )} need attention`,
      icon:
        BriefcaseBusiness,
      iconBackground:
        colors.primarySoft,
      iconColor:
        colors.primary,
      onClick:
        goToTracking,
    },
    {
      title: "Completed OJT",
      value:
        stats.completedOjt,
      helper: `${formatNumber(
        ojtStats.total
      )} total assignments`,
      icon:
        CheckCircle2,
      iconBackground:
        colors.successSoft,
      iconColor:
        colors.success,
      onClick:
        goToReports,
    },
  ];

  if (loading) {
    return (
      <div
        className="coordinator-dashboard"
        style={{
          "--workspace":
            colors.workspace,
          "--surface":
            colors.surface,
          "--surface-muted":
            colors.surfaceMuted,
          "--text":
            colors.text,
          "--text-secondary":
            colors.textSecondary,
          "--text-muted":
            colors.textMuted,
          "--border":
            colors.border,
          "--border-light":
            colors.borderLight,
          "--primary":
            colors.primary,
        }}
      >
        <DashboardStyles />

        <div className="dashboard-page">
          <DashboardHeader
            colors={colors}
            refreshing={false}
            onRefresh={() =>
              loadDashboard()
            }
          />

          <div className="dashboard-loading-card">
            <div className="dashboard-loading-icon">
              <RefreshCw
                size={22}
                className="dashboard-spin"
              />
            </div>

            <div>
              <div className="dashboard-loading-title">
                Loading dashboard
              </div>

              <div className="dashboard-loading-text">
                Fetching the latest
                information from MongoDB...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="coordinator-dashboard"
        style={{
          "--workspace":
            colors.workspace,
          "--surface":
            colors.surface,
          "--surface-muted":
            colors.surfaceMuted,
          "--text":
            colors.text,
          "--text-secondary":
            colors.textSecondary,
          "--text-muted":
            colors.textMuted,
          "--border":
            colors.border,
          "--border-light":
            colors.borderLight,
          "--primary":
            colors.primary,
        }}
      >
        <DashboardStyles />

        <div className="dashboard-page">
          <DashboardHeader
            colors={colors}
            refreshing={false}
            onRefresh={() =>
              loadDashboard()
            }
          />

          <div
            className="dashboard-error-card"
            style={{
              borderColor:
                `${colors.danger}45`,
              background:
                colors.dangerSoft,
            }}
          >
            <div
              className="dashboard-error-icon"
              style={{
                background:
                  colors.surface,
                color:
                  colors.danger,
              }}
            >
              <AlertCircle size={22} />
            </div>

            <div className="dashboard-error-content">
              <div className="dashboard-error-title">
                Unable to load dashboard
              </div>

              <div className="dashboard-error-text">
                {error}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                loadDashboard()
              }
              className="dashboard-retry-button"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="coordinator-dashboard"
      style={{
        "--workspace":
          colors.workspace,
        "--surface":
          colors.surface,
        "--surface-muted":
          colors.surfaceMuted,
        "--text":
          colors.text,
        "--text-secondary":
          colors.textSecondary,
        "--text-muted":
          colors.textMuted,
        "--border":
          colors.border,
        "--border-light":
          colors.borderLight,
        "--primary":
          colors.primary,
      }}
    >
      <DashboardStyles />

      <div className="dashboard-page">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <div className="dashboard-breadcrumb">
              <span>
                College Coordinator
              </span>

              <ChevronRight size={13} />

              <span>
                Dashboard
              </span>
            </div>

            <h1 className="dashboard-title">
              Welcome back, College
              Coordinator
            </h1>

            <p className="dashboard-description">
              Monitor students,
              companies and OJT
              activities from one
              place.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              loadDashboard(true)
            }
            className="dashboard-refresh-button"
            disabled={refreshing}
          >
            <RefreshCw
              size={15}
              className={
                refreshing
                  ? "dashboard-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>

        {/* KPI CARDS */}
        <div className="dashboard-stats-grid">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                onClick={card.onClick}
                className="dashboard-stat-card"
              >
                <div className="dashboard-stat-top">
                  <div
                    className="dashboard-stat-icon"
                    style={{
                      background:
                        card.iconBackground,
                      color:
                        card.iconColor,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <ArrowRight
                    size={17}
                    className="dashboard-muted-icon"
                  />
                </div>

                <div className="dashboard-stat-value">
                  {formatNumber(
                    card.value
                  )}
                </div>

                <div className="dashboard-stat-title">
                  {card.title}
                </div>

                <div className="dashboard-stat-helper">
                  {card.helper}
                </div>
              </button>
            );
          })}
        </div>

        {/* RECENT ANNOUNCEMENTS */}
        <section className="dashboard-section">
          <DashboardSectionHeader
            title="Recent Announcements"
            description="Latest notices published for the OJT community."
            actionLabel="View all"
            onAction={() =>
              navigate(
                "/coordinator/announcements"
              )
            }
          />

          <div className="dashboard-announcements-card">
            {announcements.length === 0 ? (
              <DashboardEmptyState
                icon={
                  <Megaphone size={25} />
                }
                title="No announcements found"
                text="Published announcements will appear here."
              />
            ) : (
              announcements.map(
                (announcement) => {
                  const priority =
                    getPriorityColors(
                      announcement.priority
                    );

                  return (
                    <button
                      key={
                        announcement.id
                      }
                      type="button"
                      className="dashboard-announcement-row"
                      onClick={() =>
                        setSelectedAnnouncement(
                          announcement
                        )
                      }
                    >
                      <div
                        className="dashboard-announcement-icon"
                        style={{
                          background:
                            colors.primarySoft,
                          color:
                            colors.primary,
                        }}
                      >
                        <Megaphone
                          size={18}
                        />
                      </div>

                      <div className="dashboard-announcement-content">
                        <div className="dashboard-announcement-title">
                          {announcement.title ||
                            "Untitled Announcement"}
                        </div>

                        <div className="dashboard-announcement-message">
                          {announcement.message ||
                            "No message available."}
                        </div>

                        <div className="dashboard-announcement-meta">
                          <span>
                            {announcement.audience ||
                              "All Students"}
                          </span>

                          <span>
                            •
                          </span>

                          <span>
                            {formatDate(
                              announcement.publishedOn
                            )}
                          </span>
                        </div>
                      </div>

                      <span
                        className="dashboard-badge"
                        style={{
                          background:
                            priority.background,
                          color:
                            priority.color,
                          borderColor:
                            priority.border,
                        }}
                      >
                        {announcement.priority ||
                          "Medium"}
                      </span>

                      <ChevronRight
                        size={17}
                        className="dashboard-muted-icon"
                      />
                    </button>
                  );
                }
              )
            )}
          </div>
        </section>

        {/* OJT OVERVIEW + DEPARTMENT */}
        <div className="dashboard-two-column">

          {/* OJT PROGRAM OVERVIEW */}
          <section className="dashboard-section-card">
            <DashboardSectionHeader
              title="OJT Program Overview"
              description="Current OJT progress across assigned students."
              actionIcon
              onAction={
                goToTracking
              }
            />

            <div className="dashboard-progress-area">
              <button
                type="button"
                onClick={
                  goToTracking
                }
                className="dashboard-progress-button"
                aria-label="Open OJT tracking"
              >
                <svg
                  width="156"
                  height="156"
                  viewBox="0 0 156 156"
                >
                  <circle
                    cx="78"
                    cy="78"
                    r="60"
                    fill="none"
                    stroke={
                      colors.border
                    }
                    strokeWidth="12"
                  />

                  <circle
                    cx="78"
                    cy="78"
                    r="60"
                    fill="none"
                    stroke={
                      colors.primary
                    }
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${
                      (averageProgress /
                        100) *
                      376.99
                    } 376.99`}
                    transform="rotate(-90 78 78)"
                  />
                </svg>

                <div className="dashboard-progress-center">
                  <div
                    className="dashboard-progress-value"
                    style={{
                      color:
                        colors.text,
                    }}
                  >
                    {averageProgress}%
                  </div>

                  <div className="dashboard-progress-label">
                    Average Progress
                  </div>
                </div>
              </button>
            </div>

            <div className="dashboard-overview-grid">
              <button
                type="button"
                onClick={
                  goToTracking
                }
                className="dashboard-overview-item"
              >
                <span>
                  Active OJT
                </span>

                <strong>
                  {formatNumber(
                    ojtStats.active
                  )}
                </strong>
              </button>

              <button
                type="button"
                onClick={
                  goToReports
                }
                className="dashboard-overview-item"
              >
                <span>
                  Completed
                </span>

                <strong
                  style={{
                    color:
                      colors.success,
                  }}
                >
                  {formatNumber(
                    ojtStats.completed
                  )}
                </strong>
              </button>

              <button
                type="button"
                onClick={
                  goToTracking
                }
                className="dashboard-overview-item"
              >
                <span>
                  Needs Attention
                </span>

                <strong
                  style={{
                    color:
                      Number(
                        ojtStats.needsAttention
                      ) > 0
                        ? colors.warning
                        : colors.text,
                  }}
                >
                  {formatNumber(
                    ojtStats.needsAttention
                  )}
                </strong>
              </button>

              <button
                type="button"
                onClick={
                  goToCompanies
                }
                className="dashboard-overview-item"
              >
                <span>
                  Pending Companies
                </span>

                <strong
                  style={{
                    color:
                      Number(
                        companyStats.pending
                      ) > 0
                        ? colors.warning
                        : colors.text,
                  }}
                >
                  {formatNumber(
                    companyStats.pending
                  )}
                </strong>
              </button>
            </div>
          </section>

          {/* STUDENTS BY DEPARTMENT */}
          <section className="dashboard-section-card">
            <DashboardSectionHeader
              title="Students by Department"
              description="Student distribution across departments."
              actionIcon
              onAction={
                goToStudents
              }
            />

            {departments.length ===
            0 ? (
              <DashboardEmptyState
                icon={
                  <GraduationCap
                    size={25}
                  />
                }
                title="No department data"
                text="Student department information will appear here."
              />
            ) : (
              <div className="dashboard-department-list">
                {departments
                  .slice(0, 6)
                  .map((item) => {
                    const count =
                      Number(
                        item.count
                      ) || 0;

                    const percentage =
                      totalDepartmentStudents >
                      0
                        ? Math.round(
                            (count /
                              totalDepartmentStudents) *
                              100
                          )
                        : 0;

                    return (
                      <button
                        key={
                          item.department
                        }
                        type="button"
                        onClick={() =>
                          handleDepartmentClick(
                            item.department
                          )
                        }
                        className="dashboard-department-row"
                      >
                        <div className="dashboard-department-main">
                          <div className="dashboard-department-name">
                            {
                              item.department
                            }
                          </div>

                          <div className="dashboard-department-track">
                            <div
                              className="dashboard-department-fill"
                              style={{
                                width: `${percentage}%`,
                                background:
                                  colors.primary,
                              }}
                            />
                          </div>
                        </div>

                        <div className="dashboard-department-count">
                          {count}
                        </div>

                        <ChevronRight
                          size={16}
                          className="dashboard-muted-icon"
                        />
                      </button>
                    );
                  })}
              </div>
            )}
          </section>
        </div>

        {/* RECENT OJT ACTIVITY */}
        <section className="dashboard-section">
          <DashboardSectionHeader
            title="Recent OJT Activity"
            description="Latest student assignments and progress."
            actionLabel="View tracking"
            onAction={
              goToTracking
            }
          />

          <div className="dashboard-table-card">
            {assignments.length ===
            0 ? (
              <DashboardEmptyState
                icon={
                  <Clock3 size={25} />
                }
                title="No OJT activity found"
                text="Recent OJT assignments will appear here when data is available."
              />
            ) : (
              <div className="dashboard-table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>
                        Student
                      </th>

                      <th>
                        Company
                      </th>

                      <th>
                        Position
                      </th>

                      <th>
                        Progress
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Updated
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {assignments.map(
                      (assignment) => {
                        const status =
                          getStatusColors(
                            assignment.status
                          );

                        const progress =
                          Math.max(
                            0,
                            Math.min(
                              100,
                              Number(
                                assignment.progress ||
                                  0
                              )
                            )
                          );

                        return (
                          <tr
                            key={
                              assignment.id ||
                              assignment.assignmentId
                            }
                            onClick={
                              goToTracking
                            }
                          >
                            <td>
                              <div className="dashboard-student-cell">
                                <div
                                  className="dashboard-avatar"
                                  style={{
                                    background:
                                      colors.primarySoft,
                                    color:
                                      colors.primary,
                                  }}
                                >
                                  {assignment.initials ||
                                    getInitials(
                                      assignment.student
                                    )}
                                </div>

                                <div>
                                  <div className="dashboard-student-name">
                                    {assignment.student ||
                                      "Unknown Student"}
                                  </div>

                                  <div className="dashboard-student-roll">
                                    {assignment.rollNumber ||
                                      "N/A"}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="dashboard-primary-cell">
                                {assignment.company ||
                                  "Company not found"}
                              </span>
                            </td>

                            <td>
                              <span className="dashboard-secondary-cell">
                                {assignment.position ||
                                  "OJT Position"}
                              </span>
                            </td>

                            <td>
                              <div className="dashboard-progress-cell">
                                <div className="dashboard-small-track">
                                  <div
                                    className="dashboard-small-fill"
                                    style={{
                                      width: `${progress}%`,
                                      background:
                                        colors.primary,
                                    }}
                                  />
                                </div>

                                <span>
                                  {progress}%
                                </span>
                              </div>
                            </td>

                            <td>
                              <span
                                className="dashboard-badge"
                                style={{
                                  background:
                                    status.background,
                                  color:
                                    status.color,
                                  borderColor:
                                    status.border,
                                }}
                              >
                                {assignment.status ||
                                  "In Progress"}
                              </span>
                            </td>

                            <td>
                              <span className="dashboard-secondary-cell">
                                {assignment.displayDate ||
                                  formatDate(
                                    assignment.updatedAt
                                  )}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* COMPANY STATUS */}
        <section className="dashboard-section">
          <DashboardSectionHeader
            title="Company Status"
            description="Current verification status of registered OJT companies."
            actionLabel="Manage companies"
            onAction={
              goToCompanies
            }
          />

          <div className="dashboard-company-grid">
            {companyBreakdown.map(
              (item) => {
                const status =
                  getStatusColors(
                    item.status
                  );

                return (
                  <button
                    key={
                      item.status
                    }
                    type="button"
                    onClick={
                      goToCompanies
                    }
                    className="dashboard-company-status-card"
                  >
                    <span
                      className="dashboard-status-dot"
                      style={{
                        background:
                          status.color,
                      }}
                    />

                    <div className="dashboard-company-status-content">
                      <div className="dashboard-company-status-title">
                        {
                          item.status
                        }
                      </div>

                      <div className="dashboard-company-status-text">
                        {item.status ===
                        "Approved"
                          ? "Companies ready for OJT"
                          : item.status ===
                            "Pending"
                          ? "Awaiting coordinator review"
                          : "Companies not approved"}
                      </div>
                    </div>

                    <strong className="dashboard-company-status-count">
                      {formatNumber(
                        item.count
                      )}
                    </strong>

                    <ChevronRight
                      size={17}
                      className="dashboard-muted-icon"
                    />
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* ANNOUNCEMENT MODAL */}
        {selectedAnnouncement && (
          <div
            className="dashboard-modal-overlay"
            onClick={() =>
              setSelectedAnnouncement(
                null
              )
            }
          >
            <div
              className="dashboard-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="dashboard-modal-header">
                <div>
                  <div
                    className="dashboard-modal-eyebrow"
                    style={{
                      color:
                        colors.primary,
                    }}
                  >
                    Announcement
                  </div>

                  <h3 className="dashboard-modal-title">
                    {
                      selectedAnnouncement.title
                    }
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedAnnouncement(
                      null
                    )
                  }
                  className="dashboard-close-button"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="dashboard-modal-body">
                <div className="dashboard-modal-badges">
                  {(() => {
                    const priority =
                      getPriorityColors(
                        selectedAnnouncement.priority
                      );

                    return (
                      <>
                        <span
                          className="dashboard-badge"
                          style={{
                            background:
                              priority.background,
                            color:
                              priority.color,
                            borderColor:
                              priority.border,
                          }}
                        >
                          {selectedAnnouncement.priority ||
                            "Medium"}
                        </span>

                        <span
                          className="dashboard-badge"
                          style={{
                            background:
                              colors.surfaceMuted,
                            color:
                              colors.textSecondary,
                            borderColor:
                              colors.border,
                          }}
                        >
                          {selectedAnnouncement.audience ||
                            "All Students"}
                        </span>
                      </>
                    );
                  })()}
                </div>

                <div className="dashboard-modal-message">
                  {selectedAnnouncement.message ||
                    "No message available."}
                </div>

                <div className="dashboard-modal-info-grid">
                  <div>
                    <div className="dashboard-modal-info-label">
                      Status
                    </div>

                    <div className="dashboard-modal-info-value">
                      {selectedAnnouncement.status ||
                        "Published"}
                    </div>
                  </div>

                  <div>
                    <div className="dashboard-modal-info-label">
                      Published On
                    </div>

                    <div className="dashboard-modal-info-value">
                      {formatDate(
                        selectedAnnouncement.publishedOn
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-modal-footer">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedAnnouncement(
                      null
                    )
                  }
                  className="dashboard-modal-close-button"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedAnnouncement(
                      null
                    );

                    navigate(
                      "/coordinator/announcements"
                    );
                  }}
                  className="dashboard-modal-primary-button"
                >
                  Open Announcements
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardHeader({
  colors,
  refreshing,
  onRefresh,
}) {
  return (
    <div className="dashboard-header">
      <div>
        <div className="dashboard-breadcrumb">
          <span>
            College Coordinator
          </span>

          <ChevronRight size={13} />

          <span>
            Dashboard
          </span>
        </div>

        <h1 className="dashboard-title">
          Welcome back, College
          Coordinator
        </h1>

        <p className="dashboard-description">
          Monitor students,
          companies and OJT
          activities from one
          place.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        className="dashboard-refresh-button"
        disabled={refreshing}
        style={{
          color:
            colors.textSecondary,
        }}
      >
        <RefreshCw
          size={15}
          className={
            refreshing
              ? "dashboard-spin"
              : ""
          }
        />

        Refresh
      </button>
    </div>
  );
}

function DashboardSectionHeader({
  title,
  description,
  actionLabel,
  actionIcon = false,
  onAction,
}) {
  return (
    <div className="dashboard-section-header">
      <div>
        <h2 className="dashboard-section-title">
          {title}
        </h2>

        <p className="dashboard-section-description">
          {description}
        </p>
      </div>

      {actionIcon ? (
        <button
          type="button"
          onClick={onAction}
          className="dashboard-icon-action"
          aria-label={`Open ${title}`}
        >
          <ArrowRight size={17} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onAction}
          className="dashboard-text-action"
        >
          {actionLabel}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}

function DashboardEmptyState({
  icon,
  title,
  text,
}) {
  return (
    <div className="dashboard-empty-state">
      <div className="dashboard-empty-icon">
        {icon}
      </div>

      <strong>
        {title}
      </strong>

      <span>
        {text}
      </span>
    </div>
  );
}

function DashboardStyles() {
  return (
    <style>{`
      .coordinator-dashboard {
        width: 100%;
        min-height: 100vh;
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

      .dashboard-page {
        width: 100%;
        max-width: 1500px;
        margin: 0 auto;
        padding: 28px 30px 42px;
      }

      .dashboard-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 24px;
      }

      .dashboard-breadcrumb {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 8px;
        color: var(--text-secondary);
        font-size: 13px;
        line-height: 20px;
        font-weight: 500;
      }

      .dashboard-breadcrumb span:last-child {
        color: var(--text);
        font-weight: 600;
      }

      .dashboard-title {
        margin: 0;
        color: var(--text);
        font-size: 28px;
        line-height: 36px;
        font-weight: 700;
        letter-spacing: -0.025em;
      }

      .dashboard-description {
        margin: 7px 0 0;
        color: var(--text-secondary);
        font-size: 14px;
        line-height: 22px;
      }

      .dashboard-refresh-button {
        min-height: 39px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 13px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text-secondary);
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: .18s ease;
      }

      .dashboard-refresh-button:hover {
        background: var(--surface-muted);
        color: var(--text);
        border-color: var(--primary);
      }

      .dashboard-refresh-button:disabled {
        opacity: .65;
        cursor: not-allowed;
      }

      .dashboard-stats-grid {
        display: grid;
        grid-template-columns:
          repeat(4, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .dashboard-stat-card {
        min-width: 0;
        padding: 18px;
        border: 1px solid var(--border);
        border-radius: 13px;
        background: var(--surface);
        color: var(--text);
        text-align: left;
        box-shadow:
          0 1px 3px rgba(15, 23, 42, .04);
        cursor: pointer;
        transition:
          transform .18s ease,
          box-shadow .18s ease,
          border-color .18s ease;
      }

      .dashboard-stat-card:hover {
        transform: translateY(-2px);
        border-color: var(--primary);
        box-shadow:
          0 8px 24px rgba(15, 23, 42, .09);
      }

      .dashboard-stat-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
      }

      .dashboard-stat-icon {
        width: 41px;
        height: 41px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }

      .dashboard-muted-icon {
        color: var(--text-muted);
      }

      .dashboard-stat-value {
        color: var(--text);
        font-size: 26px;
        line-height: 32px;
        font-weight: 700;
      }

      .dashboard-stat-title {
        margin-top: 4px;
        color: var(--text);
        font-size: 14px;
        line-height: 21px;
        font-weight: 600;
      }

      .dashboard-stat-helper {
        margin-top: 3px;
        color: var(--text-secondary);
        font-size: 12px;
        line-height: 18px;
      }

      .dashboard-section {
        margin-bottom: 24px;
      }

      .dashboard-section-card,
      .dashboard-announcements-card,
      .dashboard-table-card {
        border: 1px solid var(--border);
        border-radius: 13px;
        background: var(--surface);
        box-shadow:
          0 1px 3px rgba(15, 23, 42, .04);
      }

      .dashboard-section-card {
        padding: 20px;
      }

      .dashboard-section-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 15px;
      }

      .dashboard-section-title {
        margin: 0;
        color: var(--text);
        font-size: 17px;
        line-height: 24px;
        font-weight: 700;
      }

      .dashboard-section-description {
        margin: 4px 0 0;
        color: var(--text-secondary);
        font-size: 13px;
        line-height: 20px;
      }

      .dashboard-text-action {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 2px 0;
        border: none;
        background: transparent;
        color: var(--primary);
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
      }

      .dashboard-text-action:hover {
        opacity: .8;
      }

      .dashboard-icon-action {
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--primary);
        cursor: pointer;
      }

      .dashboard-icon-action:hover {
        background: var(--surface-muted);
        border-color: var(--primary);
      }

      .dashboard-announcements-card {
        overflow: hidden;
      }

      .dashboard-announcement-row {
        width: 100%;
        min-height: 91px;
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 13px 17px;
        border: none;
        border-bottom: 1px solid var(--border-light);
        background: var(--surface);
        color: var(--text);
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        transition: background .18s ease;
      }

      .dashboard-announcement-row:last-child {
        border-bottom: none;
      }

      .dashboard-announcement-row:hover {
        background: var(--surface-muted);
      }

      .dashboard-announcement-icon {
        width: 38px;
        height: 38px;
        flex: 0 0 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
      }

      .dashboard-announcement-content {
        min-width: 0;
        flex: 1;
      }

      .dashboard-announcement-title {
        overflow: hidden;
        color: var(--text);
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dashboard-announcement-message {
        overflow: hidden;
        margin-top: 2px;
        color: var(--text-secondary);
        font-size: 12px;
        line-height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dashboard-announcement-meta {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-top: 4px;
        color: var(--text-muted);
        font-size: 11px;
      }

      .dashboard-badge {
        min-height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 8px;
        border: 1px solid transparent;
        border-radius: 999px;
        font-size: 12px;
        line-height: 18px;
        font-weight: 600;
        white-space: nowrap;
      }

      .dashboard-two-column {
        display: grid;
        grid-template-columns:
          minmax(0, 1fr)
          minmax(0, 1fr);
        gap: 20px;
        margin-bottom: 24px;
      }

      .dashboard-progress-area {
        display: flex;
        justify-content: center;
        padding: 4px 0 15px;
      }

      .dashboard-progress-button {
        position: relative;
        width: 156px;
        height: 156px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
      }

      .dashboard-progress-button svg {
        display: block;
      }

      .dashboard-progress-center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .dashboard-progress-value {
        font-size: 25px;
        line-height: 31px;
        font-weight: 700;
      }

      .dashboard-progress-label {
        max-width: 90px;
        color: var(--text-secondary);
        font-size: 11px;
        line-height: 15px;
        text-align: center;
      }

      .dashboard-overview-grid {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .dashboard-overview-item {
        min-height: 76px;
        padding: 12px;
        border: 1px solid var(--border);
        border-radius: 9px;
        background: var(--surface);
        color: var(--text);
        text-align: left;
        cursor: pointer;
      }

      .dashboard-overview-item:hover {
        background: var(--surface-muted);
        border-color: var(--primary);
      }

      .dashboard-overview-item span {
        display: block;
        color: var(--text-secondary);
        font-size: 12px;
        line-height: 18px;
      }

      .dashboard-overview-item strong {
        display: block;
        margin-top: 4px;
        color: var(--text);
        font-size: 20px;
        line-height: 26px;
      }

      .dashboard-department-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .dashboard-department-row {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 55px;
        padding: 8px 10px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text);
        font-family: inherit;
        text-align: left;
        cursor: pointer;
      }

      .dashboard-department-row:hover {
        background: var(--surface-muted);
        border-color: var(--primary);
      }

      .dashboard-department-main {
        min-width: 0;
        flex: 1;
      }

      .dashboard-department-name {
        margin-bottom: 7px;
        overflow: hidden;
        color: var(--text);
        font-size: 13px;
        line-height: 18px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dashboard-department-track {
        width: 100%;
        height: 5px;
        overflow: hidden;
        border-radius: 999px;
        background: var(--border);
      }

      .dashboard-department-fill {
        height: 100%;
        border-radius: inherit;
      }

      .dashboard-department-count {
        min-width: 34px;
        color: var(--text);
        font-size: 14px;
        font-weight: 700;
        text-align: right;
      }

      .dashboard-table-card {
        overflow: hidden;
      }

      .dashboard-table-wrapper {
        width: 100%;
        overflow-x: auto;
      }

      .dashboard-table {
        width: 100%;
        min-width: 920px;
        border-collapse: collapse;
      }

      .dashboard-table th {
        padding: 12px 15px;
        border-bottom: 1px solid var(--border);
        background: var(--surface-muted);
        color: var(--text-secondary);
        font-size: 12px;
        line-height: 18px;
        font-weight: 700;
        text-align: left;
        white-space: nowrap;
      }

      .dashboard-table td {
        padding: 13px 15px;
        border-bottom: 1px solid var(--border-light);
        color: var(--text);
        font-size: 14px;
        vertical-align: middle;
      }

      .dashboard-table tbody tr {
        cursor: pointer;
      }

      .dashboard-table tbody tr:hover td {
        background: var(--surface-muted);
      }

      .dashboard-student-cell {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .dashboard-avatar {
        width: 34px;
        height: 34px;
        flex: 0 0 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 11px;
        font-weight: 700;
      }

      .dashboard-student-name {
        color: var(--text);
        font-size: 13px;
        line-height: 19px;
        font-weight: 600;
      }

      .dashboard-student-roll {
        margin-top: 1px;
        color: var(--text-muted);
        font-size: 11px;
        line-height: 16px;
      }

      .dashboard-primary-cell {
        color: var(--text);
        font-size: 13px;
        font-weight: 600;
      }

      .dashboard-secondary-cell {
        color: var(--text-secondary);
        font-size: 13px;
      }

      .dashboard-progress-cell {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 120px;
      }

      .dashboard-small-track {
        width: 72px;
        height: 6px;
        overflow: hidden;
        border-radius: 999px;
        background: var(--border);
      }

      .dashboard-small-fill {
        height: 100%;
        border-radius: inherit;
      }

      .dashboard-progress-cell span {
        color: var(--text-secondary);
        font-size: 12px;
        font-weight: 600;
      }

      .dashboard-company-grid {
        display: grid;
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .dashboard-company-status-card {
        min-height: 84px;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 13px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--surface);
        color: var(--text);
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        transition: .18s ease;
      }

      .dashboard-company-status-card:hover {
        transform: translateY(-2px);
        background: var(--surface-muted);
        border-color: var(--primary);
      }

      .dashboard-status-dot {
        width: 9px;
        height: 9px;
        flex: 0 0 9px;
        border-radius: 50%;
      }

      .dashboard-company-status-content {
        min-width: 0;
        flex: 1;
      }

      .dashboard-company-status-title {
        color: var(--text);
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
      }

      .dashboard-company-status-text {
        margin-top: 2px;
        color: var(--text-secondary);
        font-size: 11px;
        line-height: 17px;
      }

      .dashboard-company-status-count {
        color: var(--text);
        font-size: 20px;
        line-height: 25px;
      }

      .dashboard-empty-state {
        min-height: 190px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 25px;
        color: var(--text-secondary);
        text-align: center;
      }

      .dashboard-empty-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3px;
        border-radius: 50%;
        background: var(--surface-muted);
        color: var(--text-muted);
      }

      .dashboard-empty-state strong {
        color: var(--text);
        font-size: 14px;
      }

      .dashboard-empty-state span {
        max-width: 380px;
        color: var(--text-secondary);
        font-size: 12px;
        line-height: 19px;
      }

      .dashboard-loading-card {
        min-height: 150px;
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 22px;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--surface);
        box-shadow:
          0 1px 3px rgba(15, 23, 42, .04);
      }

      .dashboard-loading-icon {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
        background: var(--surface-muted);
        color: var(--primary);
      }

      .dashboard-loading-title {
        color: var(--text);
        font-size: 14px;
        font-weight: 700;
      }

      .dashboard-loading-text {
        margin-top: 4px;
        color: var(--text-secondary);
        font-size: 12px;
      }

      .dashboard-error-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border: 1px solid;
        border-radius: 11px;
      }

      .dashboard-error-icon {
        width: 42px;
        height: 42px;
        flex: 0 0 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
      }

      .dashboard-error-content {
        min-width: 0;
        flex: 1;
      }

      .dashboard-error-title {
        color: var(--text);
        font-size: 14px;
        font-weight: 700;
      }

      .dashboard-error-text {
        margin-top: 3px;
        color: var(--text-secondary);
        font-size: 12px;
        line-height: 18px;
      }

      .dashboard-retry-button {
        min-height: 37px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 0 12px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text);
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }

      .dashboard-retry-button:hover {
        border-color: var(--primary);
        color: var(--primary);
      }

      .dashboard-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: rgba(2, 6, 23, .58);
      }

      .dashboard-modal {
        width: 100%;
        max-width: 650px;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 13px;
        background: var(--surface);
        box-shadow:
          0 24px 70px rgba(0, 0, 0, .28);
      }

      .dashboard-modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 15px;
        padding: 19px 20px;
        border-bottom: 1px solid var(--border);
      }

      .dashboard-modal-eyebrow {
        margin-bottom: 4px;
        font-size: 11px;
        line-height: 17px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .07em;
      }

      .dashboard-modal-title {
        margin: 0;
        color: var(--text);
        font-size: 18px;
        line-height: 25px;
        font-weight: 700;
      }

      .dashboard-close-button {
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

      .dashboard-close-button:hover {
        background: var(--surface-muted);
        color: var(--text);
      }

      .dashboard-modal-body {
        padding: 20px;
      }

      .dashboard-modal-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-bottom: 14px;
      }

      .dashboard-modal-message {
        padding: 15px;
        border: 1px solid var(--border);
        border-radius: 9px;
        background: var(--surface-muted);
        color: var(--text-secondary);
        font-size: 14px;
        line-height: 23px;
        white-space: pre-wrap;
      }

      .dashboard-modal-info-grid {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-top: 13px;
      }

      .dashboard-modal-info-grid > div {
        padding: 12px;
        border: 1px solid var(--border);
        border-radius: 8px;
      }

      .dashboard-modal-info-label {
        color: var(--text-secondary);
        font-size: 11px;
        line-height: 17px;
      }

      .dashboard-modal-info-value {
        margin-top: 3px;
        color: var(--text);
        font-size: 13px;
        line-height: 19px;
        font-weight: 600;
      }

      .dashboard-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 9px;
        padding: 15px 20px;
        border-top: 1px solid var(--border);
      }

      .dashboard-modal-close-button,
      .dashboard-modal-primary-button {
        min-height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 13px;
        border-radius: 8px;
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }

      .dashboard-modal-close-button {
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text-secondary);
      }

      .dashboard-modal-close-button:hover {
        background: var(--surface-muted);
        color: var(--text);
      }

      .dashboard-modal-primary-button {
        border: 1px solid var(--primary);
        background: var(--primary);
        color: #fff;
      }

      .dashboard-modal-primary-button:hover {
        opacity: .9;
      }

      .dashboard-spin {
        animation: dashboardSpin 1s linear infinite;
      }

      @keyframes dashboardSpin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 1100px) {
        .dashboard-stats-grid {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        .dashboard-two-column {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 760px) {
        .dashboard-page {
          padding: 22px 16px 32px;
        }

        .dashboard-header {
          flex-direction: column;
        }

        .dashboard-refresh-button {
          width: 100%;
        }

        .dashboard-company-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 560px) {
        .dashboard-stats-grid {
          grid-template-columns: 1fr;
        }

        .dashboard-title {
          font-size: 24px;
          line-height: 31px;
        }

        .dashboard-overview-grid {
          grid-template-columns: 1fr;
        }

        .dashboard-announcement-row {
          align-items: flex-start;
        }

        .dashboard-announcement-row > .dashboard-badge,
        .dashboard-announcement-row > .dashboard-muted-icon {
          display: none;
        }

        .dashboard-error-card {
          flex-wrap: wrap;
        }

        .dashboard-retry-button {
          width: 100%;
          justify-content: center;
        }

        .dashboard-modal-overlay {
          padding: 10px;
        }

        .dashboard-modal-info-grid {
          grid-template-columns: 1fr;
        }

        .dashboard-modal-footer {
          flex-direction: column-reverse;
        }

        .dashboard-modal-close-button,
        .dashboard-modal-primary-button {
          width: 100%;
        }
      }
    `}</style>
  );
}

export default CoordinatorDashboard;