import { useMemo, useState } from "react";

import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Megaphone,
  CalendarDays,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  X,
  Send,
  ChevronRight,
  FileText,
} from "lucide-react";

const initialAnnouncements = [
  {
    id: 1,
    title: "OJT Weekly Progress Report Submission",
    description:
      "All students are required to submit their weekly OJT progress report before the scheduled deadline.",
    category: "OJT",
    priority: "High",
    status: "Published",
    audience: "All Students",
    date: "14 August 2026",
    author: "College Coordinator",
  },
  {
    id: 2,
    title: "Mentor Review Meeting",
    description:
      "Mentors are requested to review the current progress of assigned students and provide feedback.",
    category: "Mentor",
    priority: "Medium",
    status: "Published",
    audience: "Mentors",
    date: "13 August 2026",
    author: "College Coordinator",
  },
  {
    id: 3,
    title: "OJT Attendance Reminder",
    description:
      "Students are reminded to maintain the required attendance percentage throughout their OJT period.",
    category: "Attendance",
    priority: "High",
    status: "Published",
    audience: "All Students",
    date: "11 August 2026",
    author: "College Coordinator",
  },
  {
    id: 4,
    title: "Company Visit Schedule",
    description:
      "The upcoming company visit schedule has been prepared. Selected students should remain available.",
    category: "Company",
    priority: "Medium",
    status: "Published",
    audience: "Selected Students",
    date: "09 August 2026",
    author: "College Coordinator",
  },
  {
    id: 5,
    title: "OJT Completion Documentation",
    description:
      "Students completing their OJT should prepare their completion certificate and required documentation.",
    category: "Documentation",
    priority: "Low",
    status: "Draft",
    audience: "All Students",
    date: "08 August 2026",
    author: "College Coordinator",
  },
  {
    id: 6,
    title: "Monthly OJT Review",
    description:
      "The monthly OJT review will cover student performance, attendance and mentor feedback.",
    category: "Review",
    priority: "Medium",
    status: "Published",
    audience: "Students & Mentors",
    date: "05 August 2026",
    author: "College Coordinator",
  },
];

const categories = [
  "All Categories",
  "OJT",
  "Mentor",
  "Attendance",
  "Company",
  "Documentation",
  "Review",
  "General",
];

const statuses = [
  "All Status",
  "Published",
  "Draft",
];

const priorities = [
  "All Priority",
  "High",
  "Medium",
  "Low",
];

const audiences = [
  "All Students",
  "Mentors",
  "Students & Mentors",
  "Selected Students",
];

function StatusBadge({ status }) {
  const styles = {
    Published: {
      background: "#ecfdf5",
      color: "#059669",
    },
    Draft: {
      background: "#f8fafc",
      color: "#64748b",
    },
  };

  const style =
    styles[status] || styles.Draft;

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
      {status === "Published" ? (
        <CheckCircle2 size={11} />
      ) : (
        <FileText size={11} />
      )}

      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    High: {
      background: "#fef2f2",
      color: "#dc2626",
    },
    Medium: {
      background: "#fff7ed",
      color: "#d97706",
    },
    Low: {
      background: "#f0fdf4",
      color: "#16a34a",
    },
  };

  const style =
    styles[priority] || styles.Low;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor: style.background,
        color: style.color,
        fontSize: "9px",
        fontWeight: 700,
      }}
    >
      {priority}
    </span>
  );
}

function Modal({
  children,
  onClose,
  width = "620px",
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
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor:
          "rgba(15, 23, 42, 0.45)",
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
        borderBottom:
          "1px solid #eef2f7",
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

export default function Announcements() {
  const [announcements, setAnnouncements] =
    useState(initialAnnouncements);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [selectedPriority, setSelectedPriority] =
    useState("All Priority");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [actionId, setActionId] =
    useState(null);

  const [viewAnnouncement, setViewAnnouncement] =
    useState(null);

  const [editingAnnouncement, setEditingAnnouncement] =
    useState(null);

  const [showCreate, setShowCreate] =
    useState(false);

  const announcementsPerPage = 5;

  const filteredAnnouncements = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return announcements.filter(
      (announcement) => {
        const matchesSearch =
          !search ||
          announcement.title
            .toLowerCase()
            .includes(search) ||
          announcement.description
            .toLowerCase()
            .includes(search) ||
          announcement.category
            .toLowerCase()
            .includes(search) ||
          announcement.audience
            .toLowerCase()
            .includes(search);

        const matchesCategory =
          selectedCategory ===
            "All Categories" ||
          announcement.category ===
            selectedCategory;

        const matchesStatus =
          selectedStatus ===
            "All Status" ||
          announcement.status ===
            selectedStatus;

        const matchesPriority =
          selectedPriority ===
            "All Priority" ||
          announcement.priority ===
            selectedPriority;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus &&
          matchesPriority
        );
      }
    );
  }, [
    announcements,
    searchTerm,
    selectedCategory,
    selectedStatus,
    selectedPriority,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAnnouncements.length /
        announcementsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    announcementsPerPage;

  const paginatedAnnouncements =
    filteredAnnouncements.slice(
      startIndex,
      startIndex +
        announcementsPerPage
    );

  const totalAnnouncements =
    announcements.length;

  const publishedCount =
    announcements.filter(
      (item) =>
        item.status === "Published"
    ).length;

  const draftCount =
    announcements.filter(
      (item) =>
        item.status === "Draft"
    ).length;

  const highPriorityCount =
    announcements.filter(
      (item) =>
        item.priority === "High"
    ).length;

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(
      "All Categories"
    );
    setSelectedStatus("All Status");
    setSelectedPriority(
      "All Priority"
    );
    setCurrentPage(1);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    setActionId(null);
    setViewAnnouncement(null);
  };

  const saveAnnouncement = (data) => {
    if (editingAnnouncement) {
      setAnnouncements((current) =>
        current.map((item) =>
          item.id ===
          editingAnnouncement.id
            ? {
                ...item,
                ...data,
              }
            : item
        )
      );

      setEditingAnnouncement(null);
      return;
    }

    setAnnouncements((current) => [
      {
        id:
          Math.max(
            0,
            ...current.map(
              (item) => item.id
            )
          ) + 1,
        ...data,
        author: "College Coordinator",
        date: "15 August 2026",
      },
      ...current,
    ]);

    setShowCreate(false);
    setCurrentPage(1);
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
          Announcements
        </span>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
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
              textTransform:
                "uppercase",
            }}
          >
            Communication
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize:
                "clamp(26px, 3vw, 32px)",
              lineHeight: "1.1",
              fontWeight: 800,
              letterSpacing:
                "-0.8px",
            }}
          >
            Announcements
          </h1>

          <p
            style={{
              margin:
                "7px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Create and manage important
            OJT announcements for students
            and mentors.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowCreate(true)
          }
          style={{
            height: "42px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent:
              "center",
            gap: "8px",
            padding: "0 15px",
            border: "none",
            borderRadius: "9px",
            backgroundColor:
              "#2563eb",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow:
              "0 4px 10px rgba(37, 99, 235, 0.18)",
          }}
        >
          <Plus size={17} />
          Create Announcement
        </button>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section
        className="announcement-stat-grid"
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
            title:
              "Total Announcements",
            value:
              totalAnnouncements,
            subtitle:
              "All announcements",
            icon: Megaphone,
            background:
              "#eff6ff",
            color: "#2563eb",
          },
          {
            title: "Published",
            value:
              publishedCount,
            subtitle:
              "Currently visible",
            icon: CheckCircle2,
            background:
              "#ecfdf5",
            color: "#059669",
          },
          {
            title: "Drafts",
            value:
              draftCount,
            subtitle:
              "Not published yet",
            icon: FileText,
            background:
              "#f8fafc",
            color: "#64748b",
          },
          {
            title:
              "High Priority",
            value:
              highPriorityCount,
            subtitle:
              "Requires attention",
            icon: AlertTriangle,
            background:
              "#fef2f2",
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
                border:
                  "1px solid #e2e8f0",
                borderRadius:
                  "13px",
                backgroundColor:
                  "#ffffff",
                boxShadow:
                  "0 2px 8px rgba(15, 23, 42, 0.035)",
              }}
            >
              <div
                style={{
                  width: "39px",
                  height: "39px",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    stat.background,
                  color:
                    stat.color,
                }}
              >
                <Icon size={19} />
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
                {stat.title}
              </div>

              <div
                style={{
                  marginTop:
                    "4px",
                  color:
                    "#0f172a",
                  fontSize:
                    "25px",
                  lineHeight:
                    "1",
                  fontWeight:
                    800,
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  marginTop:
                    "5px",
                  color:
                    "#94a3b8",
                  fontSize:
                    "9px",
                }}
              >
                {stat.subtitle}
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
          TABLE
      ====================================================== */}
      <section
        style={{
          width: "100%",
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
            padding:
              "15px 18px",
            borderBottom:
              "1px solid #eef2f7",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              gap: "15px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color:
                    "#1e293b",
                  fontSize:
                    "15px",
                  fontWeight:
                    750,
                }}
              >
                Announcement List
              </h2>

              <p
                style={{
                  margin:
                    "4px 0 0",
                  color:
                    "#94a3b8",
                  fontSize:
                    "10px",
                }}
              >
                Manage announcements
                and their publication
                status.
              </p>
            </div>

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "5px",
                color:
                  "#64748b",
                fontSize:
                  "10px",
              }}
            >
              <Clock3
                size={13}
              />
              Communication
            </div>
          </div>

          {/* FILTERS */}
          <div
            className="announcement-filter-grid"
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "minmax(230px, 1fr) auto auto auto auto",
              gap: "9px",
              marginTop:
                "14px",
            }}
          >
            <div
              style={{
                height: "38px",
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "8px",
                padding:
                  "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius:
                  "8px",
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
                value={
                  searchTerm
                }
                onChange={(
                  event
                ) => {
                  setSearchTerm(
                    event
                      .target
                      .value
                  );
                  setCurrentPage(
                    1
                  );
                }}
                placeholder="Search announcements..."
                style={{
                  width:
                    "100%",
                  minWidth: 0,
                  border:
                    "none",
                  outline:
                    "none",
                  background:
                    "transparent",
                  color:
                    "#334155",
                  fontSize:
                    "11px",
                }}
              />
            </div>

            <select
              value={
                selectedCategory
              }
              onChange={(
                event
              ) => {
                setSelectedCategory(
                  event
                    .target
                    .value
                );
                setCurrentPage(
                  1
                );
              }}
              style={{
                height:
                  "38px",
                padding:
                  "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius:
                  "8px",
                backgroundColor:
                  "#ffffff",
                color:
                  "#64748b",
                fontSize:
                  "10px",
                fontWeight:
                  600,
                cursor:
                  "pointer",
                outline:
                  "none",
              }}
            >
              {categories.map(
                (
                  category
                ) => (
                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >
                    {category}
                  </option>
                )
              )}
            </select>

            <select
              value={
                selectedStatus
              }
              onChange={(
                event
              ) => {
                setSelectedStatus(
                  event
                    .target
                    .value
                );
                setCurrentPage(
                  1
                );
              }}
              style={{
                height:
                  "38px",
                padding:
                  "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius:
                  "8px",
                backgroundColor:
                  "#ffffff",
                color:
                  "#64748b",
                fontSize:
                  "10px",
                fontWeight:
                  600,
                cursor:
                  "pointer",
                outline:
                  "none",
              }}
            >
              {statuses.map(
                (
                  status
                ) => (
                  <option
                    key={
                      status
                    }
                    value={
                      status
                    }
                  >
                    {status}
                  </option>
                )
              )}
            </select>

            <select
              value={
                selectedPriority
              }
              onChange={(
                event
              ) => {
                setSelectedPriority(
                  event
                    .target
                    .value
                );
                setCurrentPage(
                  1
                );
              }}
              style={{
                height:
                  "38px",
                padding:
                  "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius:
                  "8px",
                backgroundColor:
                  "#ffffff",
                color:
                  "#64748b",
                fontSize:
                  "10px",
                fontWeight:
                  600,
                cursor:
                  "pointer",
                outline:
                  "none",
              }}
            >
              {priorities.map(
                (
                  priority
                ) => (
                  <option
                    key={
                      priority
                    }
                    value={
                      priority
                    }
                  >
                    {priority}
                  </option>
                )
              )}
            </select>

            <button
              type="button"
              onClick={
                clearFilters
              }
              style={{
                height:
                  "38px",
                padding:
                  "0 12px",
                border:
                  "1px solid #dbe4ee",
                borderRadius:
                  "8px",
                backgroundColor:
                  "#ffffff",
                color:
                  "#64748b",
                fontSize:
                  "10px",
                fontWeight:
                  700,
                cursor:
                  "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* COUNT */}
        <div
          style={{
            padding:
              "10px 16px",
            backgroundColor:
              "#f8fafc",
            borderBottom:
              "1px solid #eef2f7",
            color:
              "#64748b",
            fontSize:
              "10px",
          }}
        >
          Showing{" "}
          <strong
            style={{
              color:
                "#334155",
            }}
          >
            {filteredAnnouncements.length ===
            0
              ? 0
              : startIndex +
                1}
            -
            {Math.min(
              startIndex +
                announcementsPerPage,
              filteredAnnouncements.length
            )}
          </strong>{" "}
          of{" "}
          <strong
            style={{
              color:
                "#334155",
            }}
          >
            {
              filteredAnnouncements.length
            }
          </strong>{" "}
          announcements
        </div>

        {/* TABLE */}
        <div
          style={{
            width:
              "100%",
            overflowX:
              "auto",
          }}
        >
          <table
            style={{
              width:
                "100%",
              minWidth:
                "1050px",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                {[
                  "Announcement",
                  "Category",
                  "Audience",
                  "Priority",
                  "Status",
                  "Published",
                  "Action",
                ].map(
                  (
                    heading
                  ) => (
                    <th
                      key={
                        heading
                      }
                      style={{
                        padding:
                          "10px 13px",
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
                      {
                        heading
                      }
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedAnnouncements.length >
              0 ? (
                paginatedAnnouncements.map(
                  (
                    announcement
                  ) => (
                    <tr
                      key={
                        announcement.id
                      }
                    >
                      {/* TITLE */}
                      <td
                        style={{
                          padding:
                            "12px 13px",
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
                            gap:
                              "9px",
                          }}
                        >
                          <div
                            style={{
                              width:
                                "35px",
                              height:
                                "35px",
                              minWidth:
                                "35px",
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
                            <Megaphone
                              size={
                                17
                              }
                            />
                          </div>

                          <div
                            style={{
                              maxWidth:
                                "310px",
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
                                fontWeight:
                                  700,
                                whiteSpace:
                                  "nowrap",
                                overflow:
                                  "hidden",
                                textOverflow:
                                  "ellipsis",
                              }}
                            >
                              {
                                announcement.title
                              }
                            </strong>

                            <span
                              style={{
                                display:
                                  "block",
                                marginTop:
                                  "3px",
                                color:
                                  "#94a3b8",
                                fontSize:
                                  "9px",
                                whiteSpace:
                                  "nowrap",
                                overflow:
                                  "hidden",
                                textOverflow:
                                  "ellipsis",
                              }}
                            >
                              {
                                announcement.description
                              }
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td
                        style={{
                          padding:
                            "12px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#64748b",
                          fontSize:
                            "10px",
                        }}
                      >
                        {
                          announcement.category
                        }
                      </td>

                      {/* AUDIENCE */}
                      <td
                        style={{
                          padding:
                            "12px 13px",
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
                            gap:
                              "6px",
                            color:
                              "#64748b",
                            fontSize:
                              "10px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          <Users
                            size={
                              13
                            }
                            color="#94a3b8"
                          />

                          {
                            announcement.audience
                          }
                        </div>
                      </td>

                      {/* PRIORITY */}
                      <td
                        style={{
                          padding:
                            "12px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <PriorityBadge
                          priority={
                            announcement.priority
                          }
                        />
                      </td>

                      {/* STATUS */}
                      <td
                        style={{
                          padding:
                            "12px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <StatusBadge
                          status={
                            announcement.status
                          }
                        />
                      </td>

                      {/* DATE */}
                      <td
                        style={{
                          padding:
                            "12px 13px",
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
                            gap:
                              "5px",
                            color:
                              "#64748b",
                            fontSize:
                              "9px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          <CalendarDays
                            size={
                              12
                            }
                            color="#94a3b8"
                          />

                          {
                            announcement.date
                          }
                        </div>
                      </td>

                      {/* ACTION */}
                      <td
                        style={{
                          position:
                            "relative",
                          padding:
                            "12px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setActionId(
                              actionId ===
                                announcement.id
                                ? null
                                : announcement.id
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
                            size={
                              16
                            }
                          />
                        </button>

                        {actionId ===
                          announcement.id && (
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
                                "170px",
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
                                setViewAnnouncement(
                                  announcement
                                );
                                setActionId(
                                  null
                                );
                              }}
                              className="announcement-action-button"
                            >
                              <Eye
                                size={
                                  14
                                }
                              />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingAnnouncement(
                                  announcement
                                );
                                setActionId(
                                  null
                                );
                              }}
                              className="announcement-action-button"
                            >
                              <Pencil
                                size={
                                  14
                                }
                              />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteAnnouncement(
                                  announcement.id
                                )
                              }
                              className="announcement-action-button announcement-delete"
                            >
                              <Trash2
                                size={
                                  14
                                }
                              />
                              Delete
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
                        "55px 20px",
                      textAlign:
                        "center",
                      color:
                        "#94a3b8",
                      fontSize:
                        "11px",
                    }}
                  >
                    <Megaphone
                      size={30}
                      color="#cbd5e1"
                      style={{
                        marginBottom:
                          "8px",
                      }}
                    />

                    <div>
                      No announcements
                      found
                    </div>

                    <div
                      style={{
                        marginTop:
                          "4px",
                        fontSize:
                          "10px",
                      }}
                    >
                      Try changing
                      your search
                      or filters.
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
            minHeight:
              "58px",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            gap:
              "12px",
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
            of{" "}
            {totalPages}
          </span>

          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap:
                "5px",
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
              className="announcement-page-button"
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
            ).map(
              (page) => (
                <button
                  key={
                    page
                  }
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                  className={`announcement-page-button ${
                    safeCurrentPage ===
                    page
                      ? "announcement-page-active"
                      : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}

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
              className="announcement-page-button"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          CREATE / EDIT MODAL
      ====================================================== */}
      {(showCreate ||
        editingAnnouncement) && (
        <AnnouncementForm
          announcement={
            editingAnnouncement
          }
          onClose={() => {
            setShowCreate(false);
            setEditingAnnouncement(
              null
            );
          }}
          onSave={
            saveAnnouncement
          }
        />
      )}

      {/* =====================================================
          VIEW MODAL
      ====================================================== */}
      {viewAnnouncement && (
        <Modal
          onClose={() =>
            setViewAnnouncement(
              null
            )
          }
          width="600px"
        >
          <ModalHeader
            title="Announcement Preview"
            subtitle="Preview how the announcement will appear"
            onClose={() =>
              setViewAnnouncement(
                null
              )
            }
          />

          <div
            style={{
              padding:
                "20px",
            }}
          >
            <div
              style={{
                padding:
                  "17px",
                border:
                  "1px solid #dbeafe",
                borderRadius:
                  "12px",
                backgroundColor:
                  "#eff6ff",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "space-between",
                  gap:
                    "10px",
                  marginBottom:
                    "12px",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "8px",
                  }}
                >
                  <div
                    style={{
                      width:
                        "38px",
                      height:
                        "38px",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      borderRadius:
                        "10px",
                      backgroundColor:
                        "#ffffff",
                      color:
                        "#2563eb",
                    }}
                  >
                    <Megaphone
                      size={
                        18
                      }
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        color:
                          "#1e3a8a",
                        fontSize:
                          "9px",
                        fontWeight:
                          700,
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          "0.6px",
                      }}
                    >
                      OJT
                      Announcement
                    </div>

                    <div
                      style={{
                        marginTop:
                          "2px",
                        color:
                          "#64748b",
                        fontSize:
                          "9px",
                      }}
                    >
                      {
                        viewAnnouncement.date
                      }
                    </div>
                  </div>
                </div>

                <PriorityBadge
                  priority={
                    viewAnnouncement.priority
                  }
                />
              </div>

              <h2
                style={{
                  margin:
                    "0 0 9px",
                  color:
                    "#1e293b",
                  fontSize:
                    "18px",
                  lineHeight:
                    "1.3",
                  fontWeight:
                    750,
                }}
              >
                {
                  viewAnnouncement.title
                }
              </h2>

              <p
                style={{
                  margin:
                    0,
                  color:
                    "#64748b",
                  fontSize:
                    "11px",
                  lineHeight:
                    "1.7",
                }}
              >
                {
                  viewAnnouncement.description
                }
              </p>
            </div>

            <div
              className="announcement-preview-grid"
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap:
                  "10px",
                marginTop:
                  "15px",
              }}
            >
              {[
                {
                  icon:
                    Users,
                  label:
                    "Audience",
                  value:
                    viewAnnouncement.audience,
                },
                {
                  icon:
                    FileText,
                  label:
                    "Category",
                  value:
                    viewAnnouncement.category,
                },
                {
                  icon:
                    CheckCircle2,
                  label:
                    "Status",
                  value:
                    viewAnnouncement.status,
                },
                {
                  icon:
                    CalendarDays,
                  label:
                    "Published",
                  value:
                    viewAnnouncement.date,
                },
              ].map(
                ({
                  icon: Icon,
                  label,
                  value,
                }) => (
                  <div
                    key={
                      label
                    }
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
                        gap:
                          "7px",
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
                        size={
                          13
                        }
                      />
                      {
                        label
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "6px",
                        color:
                          "#334155",
                        fontSize:
                          "10px",
                        fontWeight:
                          650,
                      }}
                    >
                      {
                        value
                      }
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                marginTop:
                  "18px",
                paddingTop:
                  "14px",
                borderTop:
                  "1px solid #eef2f7",
              }}
            >
              <span
                style={{
                  color:
                    "#94a3b8",
                  fontSize:
                    "9px",
                }}
              >
                Created by{" "}
                {
                  viewAnnouncement.author
                }
              </span>

              <button
                type="button"
                onClick={() =>
                  setViewAnnouncement(
                    null
                  )
                }
                style={{
                  height:
                    "36px",
                  padding:
                    "0 15px",
                  border:
                    "1px solid #dbe4ee",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    "#ffffff",
                  color:
                    "#475569",
                  fontSize:
                    "10px",
                  fontWeight:
                    700,
                  cursor:
                    "pointer",
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
          .announcement-action-button {
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

          .announcement-action-button:hover {
            background: #f8fafc;
          }

          .announcement-delete {
            color: #dc2626;
          }

          .announcement-delete:hover {
            background: #fef2f2;
          }

          .announcement-page-button {
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

          .announcement-page-button:hover:not(:disabled) {
            border-color: #bfdbfe;
            background: #eff6ff;
            color: #2563eb;
          }

          .announcement-page-button:disabled {
            color: #cbd5e1;
            cursor: not-allowed;
            background: #f8fafc;
          }

          .announcement-page-active {
            border-color: #2563eb;
            background: #2563eb;
            color: #ffffff;
          }

          @media (max-width: 1100px) {
            .announcement-stat-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .announcement-filter-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 700px) {
            .announcement-stat-grid {
              grid-template-columns: 1fr !important;
            }

            .announcement-filter-grid {
              grid-template-columns: 1fr !important;
            }

            .announcement-preview-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

function AnnouncementForm({
  announcement,
  onClose,
  onSave,
}) {
  const [title, setTitle] =
    useState(
      announcement?.title || ""
    );

  const [description, setDescription] =
    useState(
      announcement?.description ||
        ""
    );

  const [category, setCategory] =
    useState(
      announcement?.category ||
        "OJT"
    );

  const [priority, setPriority] =
    useState(
      announcement?.priority ||
        "Medium"
    );

  const [audience, setAudience] =
    useState(
      announcement?.audience ||
        "All Students"
    );

  const [status, setStatus] =
    useState(
      announcement?.status ||
        "Draft"
    );

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    onSave({
      title:
        title.trim(),
      description:
        description.trim(),
      category,
      priority,
      audience,
      status,
    });
  };

  return (
    <Modal
      onClose={onClose}
      width="600px"
    >
      <ModalHeader
        title={
          announcement
            ? "Edit Announcement"
            : "Create Announcement"
        }
        subtitle={
          announcement
            ? "Update announcement details"
            : "Publish an announcement for OJT users"
        }
        onClose={onClose}
      />

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          padding:
            "20px",
        }}
      >
        <div
          style={{
            display:
              "flex",
            flexDirection:
              "column",
            gap:
              "14px",
          }}
        >
          <div>
            <label className="announcement-form-label">
              Announcement Title
            </label>

            <input
              required
              value={title}
              onChange={(
                event
              ) =>
                setTitle(
                  event
                    .target
                    .value
                )
              }
              placeholder="Enter announcement title"
              className="announcement-form-input"
            />
          </div>

          <div>
            <label className="announcement-form-label">
              Description
            </label>

            <textarea
              required
              value={
                description
              }
              onChange={(
                event
              ) =>
                setDescription(
                  event
                    .target
                    .value
                )
              }
              placeholder="Write announcement details..."
              rows="5"
              className="announcement-form-input announcement-textarea"
            />
          </div>

          <div
            className="announcement-form-grid"
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap:
                "11px",
            }}
          >
            <div>
              <label className="announcement-form-label">
                Category
              </label>

              <select
                value={
                  category
                }
                onChange={(
                  event
                ) =>
                  setCategory(
                    event
                      .target
                      .value
                  )
                }
                className="announcement-form-input"
              >
                {categories
                  .filter(
                    (
                      item
                    ) =>
                      item !==
                      "All Categories"
                  )
                  .map(
                    (
                      item
                    ) => (
                      <option
                        key={
                          item
                        }
                        value={
                          item
                        }
                      >
                        {
                          item
                        }
                      </option>
                    )
                  )}
              </select>
            </div>

            <div>
              <label className="announcement-form-label">
                Priority
              </label>

              <select
                value={
                  priority
                }
                onChange={(
                  event
                ) =>
                  setPriority(
                    event
                      .target
                      .value
                  )
                }
                className="announcement-form-input"
              >
                {priorities
                  .filter(
                    (
                      item
                    ) =>
                      item !==
                      "All Priority"
                  )
                  .map(
                    (
                      item
                    ) => (
                      <option
                        key={
                          item
                        }
                        value={
                          item
                        }
                      >
                        {
                          item
                        }
                      </option>
                    )
                  )}
              </select>
            </div>

            <div>
              <label className="announcement-form-label">
                Target Audience
              </label>

              <select
                value={
                  audience
                }
                onChange={(
                  event
                ) =>
                  setAudience(
                    event
                      .target
                      .value
                  )
                }
                className="announcement-form-input"
              >
                {audiences.map(
                  (
                    item
                  ) => (
                    <option
                      key={
                        item
                      }
                      value={
                        item
                      }
                    >
                      {
                        item
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="announcement-form-label">
                Status
              </label>

              <select
                value={
                  status
                }
                onChange={(
                  event
                ) =>
                  setStatus(
                    event
                      .target
                      .value
                  )
                }
                className="announcement-form-input"
              >
                <option value="Draft">
                  Draft
                </option>

                <option value="Published">
                  Published
                </option>
              </select>
            </div>
          </div>
        </div>

        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "flex-end",
            gap:
              "8px",
            marginTop:
              "20px",
            paddingTop:
              "15px",
            borderTop:
              "1px solid #eef2f7",
          }}
        >
          <button
            type="button"
            onClick={
              onClose
            }
            style={{
              height:
                "37px",
              padding:
                "0 14px",
              border:
                "1px solid #dbe4ee",
              borderRadius:
                "8px",
              backgroundColor:
                "#ffffff",
              color:
                "#64748b",
              fontSize:
                "10px",
              fontWeight:
                700,
              cursor:
                "pointer",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              height:
                "37px",
              display:
                "inline-flex",
              alignItems:
                "center",
              gap:
                "6px",
              padding:
                "0 15px",
              border:
                "none",
              borderRadius:
                "8px",
              backgroundColor:
                "#2563eb",
              color:
                "#ffffff",
              fontSize:
                "10px",
              fontWeight:
                700,
              cursor:
                "pointer",
            }}
          >
            {status ===
            "Published" ? (
              <Send
                size={
                  13
                }
              />
            ) : (
              <FileText
                size={
                  13
                }
              />
            )}

            {announcement
              ? "Save Changes"
              : status ===
                "Published"
              ? "Publish Announcement"
              : "Save Draft"}
          </button>
        </div>
      </form>

      <style>
        {`
          .announcement-form-label {
            display: block;
            margin-bottom: 6px;
            color: #475569;
            font-size: 10px;
            font-weight: 700;
          }

          .announcement-form-input {
            width: 100%;
            height: 40px;
            padding: 0 11px;
            border: 1px solid #dbe4ee;
            border-radius: 8px;
            background: #ffffff;
            color: #334155;
            font-size: 11px;
            outline: none;
            box-sizing: border-box;
          }

          .announcement-form-input:focus {
            border-color: #93c5fd;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.07);
          }

          .announcement-textarea {
            height: auto;
            min-height: 110px;
            padding: 10px 11px;
            resize: vertical;
            line-height: 1.6;
          }

          @media (max-width: 600px) {
            .announcement-form-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </Modal>
  );
}