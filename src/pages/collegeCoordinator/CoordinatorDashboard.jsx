import {
  ArrowUpRight,
  CalendarDays,
  Users,
  Building2,
  BriefcaseBusiness,
  Clock3,
  FileText,
  Megaphone,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  ChevronRight,
} from "lucide-react";

import ApplicationStatus from "../../components/Co-coordinator/ApplicationStatus";
import ApplicationOverview from "../../components/Co-coordinator/ApplicationOverview";

import {
  dashboardStats,
  recentApplications,
  recentAnnouncements,
  ojtPrograms,
  reportsOverview,
  mentorAssignment,
} from "../../mock/Co-coordinator";

const statIcons = {
  students: Users,
  companies: Building2,
  ojt: BriefcaseBusiness,
  approvals: AlertCircle,
  reports: FileText,
};

const statTone = {
  blue: {
    background: "#eff6ff",
    color: "#2563eb",
  },
  indigo: {
    background: "#eef2ff",
    color: "#4f46e5",
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

function getInitials(name = "") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusBadge({ status, type }) {
  const styles = {
    info: {
      background: "#eff6ff",
      color: "#2563eb",
    },
    warning: {
      background: "#fff7ed",
      color: "#d97706",
    },
    success: {
      background: "#ecfdf5",
      color: "#059669",
    },
    danger: {
      background: "#fef2f2",
      color: "#dc2626",
    },
  };

  const current =
    styles[type] || styles.info;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor: current.background,
        color: current.color,
        fontSize: "11px",
        lineHeight: "1",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

export default function CoordinatorDashboard({
  onNavigate,
}) {
  const today = new Date();

  const formattedDate =
    today.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  return (
    <div
      className="coordinator-dashboard"
      style={{
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
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
          Overview
        </span>
      </div>

      {/* =====================================================
          WELCOME HEADER
      ====================================================== */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          marginBottom: "18px",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "7px",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            AISC OJT Portal
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize:
                "clamp(28px, 3vw, 40px)",
              lineHeight: "1.1",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            Welcome back, Safwan Baduda
          </h1>

          <p
            style={{
              margin: "9px 0 0",
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Here's what's happening with
            your OJT programs today.
          </p>
        </div>

        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "11px",
            padding: "11px 15px",
            border:
              "1px solid #e2e8f0",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9px",
              backgroundColor: "#eff6ff",
              color: "#2563eb",
            }}
          >
            <CalendarDays size={20} />
          </div>

          <div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: "10px",
                fontWeight: 700,
                textTransform:
                  "uppercase",
                letterSpacing: "0.7px",
              }}
            >
              Today
            </div>

            <strong
              style={{
                display: "block",
                marginTop: "3px",
                color: "#334155",
                fontSize: "13px",
              }}
            >
              {formattedDate}
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        {dashboardStats.map((stat) => {
          const Icon =
            statIcons[stat.icon] ||
            FileText;

          const tone =
            statTone[stat.tone] ||
            statTone.blue;

          const isStudents =
            stat.icon === "students";

          const isCompanies =
            stat.icon === "companies";

          const isClickable =
            isStudents ||
            isCompanies;

          return (
            <div
              key={stat.id}
              onClick={() => {
                if (
                  isStudents &&
                  onNavigate
                ) {
                  onNavigate(
                    "/coordinator/students"
                  );
                }

                if (
                  isCompanies &&
                  onNavigate
                ) {
                  onNavigate(
                    "/coordinator/companies"
                  );
                }
              }}
              style={{
                minWidth: 0,
                padding: "14px 15px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "12px",
                backgroundColor:
                  "#ffffff",
                boxShadow:
                  "0 2px 7px rgba(15, 23, 42, 0.035)",
                boxSizing: "border-box",
                cursor: isClickable
                  ? "pointer"
                  : "default",
                transition:
                  "transform 160ms ease, box-shadow 160ms ease",
              }}
              onMouseEnter={(event) => {
                if (!isClickable) {
                  return;
                }

                event.currentTarget.style.transform =
                  "translateY(-2px)";

                event.currentTarget.style.boxShadow =
                  "0 7px 16px rgba(15, 23, 42, 0.08)";
              }}
              onMouseLeave={(event) => {
                if (!isClickable) {
                  return;
                }

                event.currentTarget.style.transform =
                  "translateY(0)";

                event.currentTarget.style.boxShadow =
                  "0 2px 7px rgba(15, 23, 42, 0.035)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "center",
                    borderRadius: "9px",
                    backgroundColor:
                      tone.background,
                    color: tone.color,
                  }}
                >
                  <Icon size={18} />
                </div>

                <ArrowUpRight
                  size={15}
                  color={
                    isClickable
                      ? "#2563eb"
                      : "#cbd5e1"
                  }
                />
              </div>

              <div
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  fontSize: "11px",
                  fontWeight: 600,
                  whiteSpace:
                    "nowrap",
                  overflow: "hidden",
                  textOverflow:
                    "ellipsis",
                }}
              >
                {stat.title}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent:
                    "space-between",
                  gap: "6px",
                  marginTop: "5px",
                }}
              >
                <strong
                  style={{
                    color: "#0f172a",
                    fontSize: "23px",
                    lineHeight: "1",
                    fontWeight: 800,
                  }}
                >
                  {stat.value}
                </strong>

                <span
                  style={{
                    color:
                      stat.tone ===
                      "orange"
                        ? "#ea580c"
                        : "#059669",
                    fontSize: "10px",
                    fontWeight: 700,
                    whiteSpace:
                      "nowrap",
                  }}
                >
                  {stat.change}
                </span>
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: "#94a3b8",
                  fontSize: "9px",
                }}
              >
                {stat.changeLabel}
              </div>

              {isClickable && (
                <div
                  style={{
                    marginTop: "7px",
                    color: "#2563eb",
                    fontSize: "9px",
                    fontWeight: 700,
                  }}
                >
                  Click to view
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* =====================================================
          ANALYTICS
      ====================================================== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.6fr) minmax(0, 0.9fr)",
          gap: "18px",
          marginBottom: "18px",
          alignItems: "start",
        }}
      >
        {/* APPLICATION OVERVIEW */}
        <div
          style={{
            minWidth: 0,
            overflow: "hidden",
            border:
              "1px solid #e2e8f0",
            borderRadius: "14px",
            backgroundColor:
              "#ffffff",
            boxShadow:
              "0 2px 8px rgba(15, 23, 42, 0.035)",
          }}
        >
          <div
            style={{
              minHeight: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "15px",
              padding:
                "15px 18px",
              borderBottom:
                "1px solid #eef2f7",
              boxSizing:
                "border-box",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#1e293b",
                  fontSize: "16px",
                  fontWeight: 750,
                }}
              >
                Application Overview
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#94a3b8",
                  fontSize: "11px",
                }}
              >
                Application activity over
                time
              </p>
            </div>

            <select
              defaultValue="May 2025"
              style={{
                height: "34px",
                padding: "0 10px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                color: "#64748b",
                fontSize: "11px",
                fontWeight: 600,
                outline: "none",
              }}
            >
              <option>
                May 2025
              </option>
              <option>
                April 2025
              </option>
              <option>
                March 2025
              </option>
            </select>
          </div>

          <div
            style={{
              width: "100%",
              padding:
                "16px 18px 18px",
              boxSizing:
                "border-box",
            }}
          >
            <ApplicationOverview />
          </div>
        </div>

        {/* APPLICATION STATUS */}
        <div
          style={{
            minWidth: 0,
            overflow: "hidden",
            border:
              "1px solid #e2e8f0",
            borderRadius: "14px",
            backgroundColor:
              "#ffffff",
            boxShadow:
              "0 2px 8px rgba(15, 23, 42, 0.035)",
          }}
        >
          <div
            style={{
              minHeight: "70px",
              padding:
                "15px 18px",
              borderBottom:
                "1px solid #eef2f7",
              boxSizing:
                "border-box",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#1e293b",
                fontSize: "16px",
                fontWeight: 750,
              }}
            >
              Application Status
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#94a3b8",
                fontSize: "11px",
              }}
            >
              Current application
              distribution
            </p>
          </div>

          <div
            style={{
              padding: "18px",
              boxSizing:
                "border-box",
            }}
          >
            <ApplicationStatus />
          </div>
        </div>
      </section>

      {/* =====================================================
          RECENT APPLICATIONS + ANNOUNCEMENTS
      ====================================================== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.6fr) minmax(0, 0.85fr)",
          gap: "18px",
          marginBottom: "18px",
          alignItems: "start",
        }}
      >
        {/* RECENT APPLICATIONS */}
        <div
          style={{
            minWidth: 0,
            overflow: "hidden",
            border:
              "1px solid #e2e8f0",
            borderRadius: "14px",
            backgroundColor:
              "#ffffff",
            boxShadow:
              "0 2px 8px rgba(15, 23, 42, 0.035)",
          }}
        >
          <div
            style={{
              minHeight: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "12px",
              padding:
                "13px 17px",
              borderBottom:
                "1px solid #eef2f7",
              boxSizing:
                "border-box",
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
                Recent Applications
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                Latest student applications
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate &&
                onNavigate(
                  "/coordinator/students"
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                padding: "5px 7px",
                border: "none",
                borderRadius: "6px",
                backgroundColor:
                  "#eff6ff",
                color: "#2563eb",
                fontSize: "10px",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace:
                  "nowrap",
              }}
            >
              View all
              <ChevronRight
                size={13}
              />
            </button>
          </div>

          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "650px",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr>
                  {[
                    "Student",
                    "Company",
                    "Position",
                    "Status",
                    "Time",
                  ].map(
                    (heading) => (
                      <th
                        key={
                          heading
                        }
                        style={{
                          padding:
                            "9px 13px",
                          backgroundColor:
                            "#f8fafc",
                          borderBottom:
                            "1px solid #e2e8f0",
                          color:
                            "#94a3b8",
                          fontSize:
                            "9px",
                          fontWeight:
                            750,
                          textAlign:
                            "left",
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
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {recentApplications.map(
                  (application) => (
                    <tr
                      key={
                        application.id
                      }
                    >
                      <td
                        style={{
                          padding:
                            "10px 13px",
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
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width:
                                "29px",
                              height:
                                "29px",
                              minWidth:
                                "29px",
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
                                "8px",
                              fontWeight:
                                800,
                            }}
                          >
                            {getInitials(
                              application.student
                            )}
                          </div>

                          <strong
                            style={{
                              color:
                                "#334155",
                              fontSize:
                                "10px",
                              fontWeight:
                                700,
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {
                              application.student
                            }
                          </strong>
                        </div>
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
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
                          application.company
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
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
                          application.position
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <StatusBadge
                          status={
                            application.status
                          }
                          type={
                            application.statusType
                          }
                        />
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#94a3b8",
                          fontSize:
                            "10px",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          application.time
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        <div
          style={{
            minWidth: 0,
            overflow: "hidden",
            border:
              "1px solid #e2e8f0",
            borderRadius: "14px",
            backgroundColor:
              "#ffffff",
            boxShadow:
              "0 2px 8px rgba(15, 23, 42, 0.035)",
          }}
        >
          <div
            style={{
              minHeight: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "12px",
              padding:
                "13px 17px",
              borderBottom:
                "1px solid #eef2f7",
              boxSizing:
                "border-box",
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
                Announcements
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                Latest OJT updates
              </p>
            </div>

            <button
              type="button"
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                border: "none",
                borderRadius: "8px",
                backgroundColor:
                  "#eff6ff",
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              <Megaphone
                size={15}
              />
            </button>
          </div>

          <div>
            {recentAnnouncements.map(
              (
                announcement,
                index
              ) => (
                <div
                  key={
                    announcement.id
                  }
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                    padding:
                      "13px 15px",
                    borderBottom:
                      index ===
                      recentAnnouncements.length -
                        1
                        ? "none"
                        : "1px solid #f1f5f9",
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
                        "8px",
                      backgroundColor:
                        "#eff6ff",
                      color:
                        "#2563eb",
                    }}
                  >
                    <Megaphone
                      size={15}
                    />
                  </div>

                  <div
                    style={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <strong
                      style={{
                        display:
                          "block",
                        color:
                          "#334155",
                        fontSize:
                          "11px",
                        lineHeight:
                          "1.35",
                        fontWeight:
                          700,
                      }}
                    >
                      {
                        announcement.title
                      }
                    </strong>

                    <p
                      style={{
                        margin:
                          "4px 0 0",
                        color:
                          "#64748b",
                        fontSize:
                          "9px",
                        lineHeight:
                          "1.4",
                        display:
                          "-webkit-box",
                        WebkitLineClamp:
                          2,
                        WebkitBoxOrient:
                          "vertical",
                        overflow:
                          "hidden",
                      }}
                    >
                      {
                        announcement.description
                      }
                    </p>

                    <span
                      style={{
                        display:
                          "block",
                        marginTop:
                          "5px",
                        color:
                          "#94a3b8",
                        fontSize:
                          "8px",
                      }}
                    >
                      {
                        announcement.date
                      }
                    </span>
                  </div>

                  <ChevronRight
                    size={14}
                    color="#cbd5e1"
                    style={{
                      flexShrink: 0,
                      marginTop:
                        "2px",
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          OJT PROGRAMS + MENTOR ASSIGNMENT
      ====================================================== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.6fr) minmax(0, 0.85fr)",
          gap: "18px",
          marginBottom: "12px",
          alignItems: "start",
        }}
      >
        {/* OJT PROGRAMS */}
        <div
          style={{
            minWidth: 0,
            overflow: "hidden",
            border:
              "1px solid #e2e8f0",
            borderRadius: "14px",
            backgroundColor:
              "#ffffff",
            boxShadow:
              "0 2px 8px rgba(15, 23, 42, 0.035)",
          }}
        >
          <div
            style={{
              minHeight: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "12px",
              padding:
                "13px 17px",
              borderBottom:
                "1px solid #eef2f7",
              boxSizing:
                "border-box",
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
                Active OJT Programs
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                Current internship programs
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate &&
                onNavigate(
                  "/coordinator/companies"
                )
              }
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "3px",
                padding:
                  "5px 7px",
                border: "none",
                borderRadius: "6px",
                backgroundColor:
                  "#eff6ff",
                color:
                  "#2563eb",
                fontSize:
                  "10px",
                fontWeight:
                  700,
                cursor:
                  "pointer",
                whiteSpace:
                  "nowrap",
              }}
            >
              View all
              <ChevronRight
                size={13}
              />
            </button>
          </div>

          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "650px",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr>
                  {[
                    "Program",
                    "Company",
                    "Mentor",
                    "Students",
                    "Status",
                  ].map(
                    (heading) => (
                      <th
                        key={
                          heading
                        }
                        style={{
                          padding:
                            "9px 13px",
                          backgroundColor:
                            "#f8fafc",
                          borderBottom:
                            "1px solid #e2e8f0",
                          color:
                            "#94a3b8",
                          fontSize:
                            "9px",
                          fontWeight:
                            750,
                          textAlign:
                            "left",
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
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {ojtPrograms.map(
                  (program) => (
                    <tr
                      key={
                        program.id
                      }
                    >
                      <td
                        style={{
                          padding:
                            "10px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#334155",
                          fontSize:
                            "10px",
                          fontWeight:
                            700,
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          program.program
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
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
                          program.company
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
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
                          program.mentor
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#334155",
                          fontSize:
                            "10px",
                          fontWeight:
                            700,
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          program.students
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "10px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <span
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            padding:
                              "4px 8px",
                            borderRadius:
                              "999px",
                            backgroundColor:
                              program.status ===
                              "In Progress"
                                ? "#ecfdf5"
                                : "#fff7ed",
                            color:
                              program.status ===
                              "In Progress"
                                ? "#059669"
                                : "#ea580c",
                            fontSize:
                              "9px",
                            fontWeight:
                              700,
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {
                            program.status
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MENTOR ASSIGNMENT */}
        <div
          style={{
            minWidth: 0,
            overflow: "hidden",
            border:
              "1px solid #e2e8f0",
            borderRadius: "14px",
            backgroundColor:
              "#ffffff",
            boxShadow:
              "0 2px 8px rgba(15, 23, 42, 0.035)",
          }}
        >
          <div
            style={{
              minHeight: "70px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding:
                "15px 18px",
              borderBottom:
                "1px solid #eef2f7",
              boxSizing:
                "border-box",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                borderRadius:
                  "10px",
                backgroundColor:
                  "#eff6ff",
                color:
                  "#2563eb",
              }}
            >
              <UserCheck
                size={19}
              />
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  color:
                    "#1e293b",
                  fontSize:
                    "16px",
                  fontWeight:
                    750,
                }}
              >
                Mentor Assignment
              </h2>

              <p
                style={{
                  margin:
                    "4px 0 0",
                  color:
                    "#94a3b8",
                  fontSize:
                    "11px",
                }}
              >
                OJT mentor allocation
              </p>
            </div>
          </div>

          <div
            style={{
              padding:
                "12px 18px 14px",
              boxSizing:
                "border-box",
            }}
          >
            <div
              style={{
                width:
                  "115px",
                height:
                  "115px",
                position:
                  "relative",
                margin:
                  "0 auto 10px",
              }}
            >
              <svg
                width="115"
                height="115"
                viewBox="0 0 115 115"
                style={{
                  display:
                    "block",
                  transform:
                    "rotate(-90deg)",
                }}
              >
                <circle
                  cx="57.5"
                  cy="57.5"
                  r="43"
                  fill="none"
                  stroke="#eef2f7"
                  strokeWidth="13"
                />

                <circle
                  cx="57.5"
                  cy="57.5"
                  r="43"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${
                    2 *
                    Math.PI *
                    43
                  }`}
                  strokeDashoffset={`${
                    2 *
                    Math.PI *
                    43 *
                    (1 -
                      mentorAssignment.percentage /
                        100)
                  }`}
                />
              </svg>

              <div
                style={{
                  position:
                    "absolute",
                  inset: 0,
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                <strong
                  style={{
                    color:
                      "#0f172a",
                    fontSize:
                      "26px",
                    lineHeight:
                      "1",
                    fontWeight:
                      800,
                  }}
                >
                  {
                    mentorAssignment.percentage
                  }
                  %
                </strong>

                <span
                  style={{
                    marginTop:
                      "5px",
                    color:
                      "#94a3b8",
                    fontSize:
                      "10px",
                  }}
                >
                  Assigned
                </span>
              </div>
            </div>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
              }}
            >
              <div
                style={{
                  padding:
                    "11px 8px",
                  border:
                    "1px solid #dbeafe",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#eff6ff",
                  textAlign:
                    "center",
                }}
              >
                <span
                  style={{
                    display:
                      "block",
                    color:
                      "#64748b",
                    fontSize:
                      "10px",
                    fontWeight:
                      600,
                  }}
                >
                  Assigned
                </span>

                <strong
                  style={{
                    display:
                      "block",
                    marginTop:
                      "3px",
                    color:
                      "#2563eb",
                    fontSize:
                      "21px",
                    lineHeight:
                      "1",
                    fontWeight:
                      800,
                  }}
                >
                  {
                    mentorAssignment.assigned
                  }
                </strong>
              </div>

              <div
                style={{
                  padding:
                    "11px 8px",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#f8fafc",
                  textAlign:
                    "center",
                }}
              >
                <span
                  style={{
                    display:
                      "block",
                    color:
                      "#64748b",
                    fontSize:
                      "10px",
                    fontWeight:
                      600,
                  }}
                >
                  Unassigned
                </span>

                <strong
                  style={{
                    display:
                      "block",
                    marginTop:
                      "3px",
                    color:
                      "#334155",
                    fontSize:
                      "21px",
                    lineHeight:
                      "1",
                    fontWeight:
                      800,
                  }}
                >
                  {
                    mentorAssignment.unassigned
                  }
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          REPORTS OVERVIEW
      ====================================================== */}
      <section
        style={{
          width: "100%",
          overflow: "hidden",
          border:
            "1px solid #e2e8f0",
          borderRadius: "14px",
          backgroundColor:
            "#ffffff",
          boxShadow:
            "0 2px 8px rgba(15, 23, 42, 0.035)",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            minHeight: "68px",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            padding:
              "14px 18px",
            borderBottom:
              "1px solid #eef2f7",
            boxSizing:
              "border-box",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color:
                  "#1e293b",
                fontSize:
                  "16px",
                fontWeight:
                  750,
              }}
            >
              Reports Overview
            </h2>

            <p
              style={{
                margin:
                  "4px 0 0",
                color:
                  "#94a3b8",
                fontSize:
                  "11px",
              }}
            >
              OJT reporting summary
            </p>
          </div>

          <FileText
            size={19}
            color="#2563eb"
          />
        </div>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: "12px",
            padding: "14px",
            boxSizing:
              "border-box",
          }}
        >
          {reportsOverview.map(
            (report) => (
              <div
                key={report.id}
                style={{
                  minWidth: 0,
                  padding: "15px",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius:
                    "11px",
                  backgroundColor:
                    "#f8fafc",
                  cursor:
                    "pointer",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
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
                  }}
                >
                  <FileText
                    size={18}
                  />
                </div>

                <div
                  style={{
                    marginTop:
                      "10px",
                    color:
                      "#64748b",
                    fontSize:
                      "11px",
                    fontWeight:
                      600,
                  }}
                >
                  {report.title}
                </div>

                <strong
                  style={{
                    display:
                      "block",
                    marginTop:
                      "4px",
                    color:
                      "#0f172a",
                    fontSize:
                      "24px",
                    lineHeight:
                      "1",
                    fontWeight:
                      800,
                  }}
                >
                  {report.value}
                </strong>

                <button
                  type="button"
                  style={{
                    display:
                      "inline-flex",
                    alignItems:
                      "center",
                    gap: "3px",
                    marginTop:
                      "9px",
                    padding: 0,
                    border:
                      "none",
                    background:
                      "transparent",
                    color:
                      "#2563eb",
                    fontSize:
                      "10px",
                    fontWeight:
                      700,
                    cursor:
                      "pointer",
                  }}
                >
                  View reports
                  <ChevronRight
                    size={12}
                  />
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          RESPONSIVE
      ====================================================== */}
      <style>
        {`
          @media (max-width: 1250px) {
            .coordinator-dashboard section:nth-of-type(2) {
              grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.9fr) !important;
            }
          }

          @media (max-width: 1050px) {
            .coordinator-dashboard section {
              grid-template-columns: 1fr !important;
            }

            .coordinator-dashboard section:nth-of-type(1) {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 700px) {
            .coordinator-dashboard section:nth-of-type(1) {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .coordinator-dashboard > section:first-of-type {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
          }

          @media (max-width: 480px) {
            .coordinator-dashboard section:nth-of-type(1) {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}