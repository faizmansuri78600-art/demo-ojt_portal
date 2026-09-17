import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Users,
  UserCheck,
  Clock3,
  ChevronRight,
  Check,
  X,
  RefreshCw,
  UserRoundCheck,
  Trash2,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

import mentorAssignmentService from "../../services/mentorAssignmentService";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

const MENTOR_CAPACITY = 8;
const MENTORS_PER_PAGE = 5;

const emptyForm = {
  applicationId: "",
  facultyId: "",
  startDate: "",
  endDate: "",
};

function getStatusColors(status, colors) {
  const map = {
    Assigned: {
      background: colors.successSoft,
      color: colors.success,
    },
    Unassigned: {
      background: colors.surfaceMuted,
      color: colors.textSecondary,
    },
    Full: {
      background: colors.warningSoft,
      color: colors.warning,
    },
    Ongoing: {
      background: colors.primarySoft,
      color: colors.primary,
    },
    Completed: {
      background: colors.surfaceMuted,
      color: colors.textSecondary,
    },
  };

  return map[status] || map.Unassigned;
}

function StatusBadge({ status, colors }) {
  const current = getStatusColors(status, colors);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor: current.background,
        color: current.color,
        fontSize: "12px",
        lineHeight: "18px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function Modal({
  children,
  onClose,
  width = "560px",
  colors,
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
        backgroundColor: "rgba(2, 6, 23, 0.68)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          backgroundColor: colors.surface,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.30)",
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
  colors,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "15px",
        padding: "18px 20px",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: colors.text,
            fontSize: "17px",
            lineHeight: "24px",
            fontWeight: 700,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            color: colors.textSecondary,
            fontSize: "13px",
            lineHeight: "19px",
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
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          backgroundColor: colors.surfaceMuted,
          color: colors.textSecondary,
          cursor: "pointer",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

function FieldLabel({ children, colors }) {
  return (
    <label
      style={{
        display: "block",
        marginBottom: "6px",
        color: colors.textSecondary,
        fontSize: "13px",
        lineHeight: "18px",
        fontWeight: 600,
      }}
    >
      {children}
    </label>
  );
}

function StudentIcon({ colors }) {
  return (
    <div
      style={{
        width: "38px",
        height: "38px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: colors.primarySoft,
        color: colors.primary,
      }}
    >
      <GraduationCap size={19} />
    </div>
  );
}

export default function MentorAssignment() {
  const { colors } = useCoordinatorTheme();

  const [mentors, setMentors] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const [viewMentor, setViewMentor] = useState(null);
  const [showAssignModal, setShowAssignModal] =
    useState(false);
  const [editingAssignment, setEditingAssignment] =
    useState(null);

  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await mentorAssignmentService.getData();

      setMentors(response?.mentors || []);
      setApplications(response?.applications || []);
    } catch (err) {
      console.error(
        "Mentor assignment load error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load mentor assignment data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const departments = useMemo(() => {
    return [
      "All Departments",
      ...Array.from(
        new Set(
          mentors
            .map((mentor) => mentor.department)
            .filter(Boolean)
        )
      ).sort(),
    ];
  }, [mentors]);

  const filteredMentors = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return mentors.filter((mentor) => {
      const name =
        String(mentor.name || "").toLowerCase();
      const department =
        String(
          mentor.department || ""
        ).toLowerCase();
      const designation =
        String(
          mentor.designation || ""
        ).toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        department.includes(search) ||
        designation.includes(search);

      const matchesDepartment =
        selectedDepartment ===
          "All Departments" ||
        mentor.department ===
          selectedDepartment;

      const matchesStatus =
        selectedStatus === "All Status" ||
        mentor.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    mentors,
    searchTerm,
    selectedDepartment,
    selectedStatus,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredMentors.length /
        MENTORS_PER_PAGE
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedMentors =
    filteredMentors.slice(
      (safePage - 1) *
        MENTORS_PER_PAGE,
      safePage *
        MENTORS_PER_PAGE
    );

  const stats = useMemo(() => {
    const totalCapacity =
      mentors.length * MENTOR_CAPACITY;

    const totalAssigned =
      mentors.reduce(
        (sum, mentor) =>
          sum +
          Number(mentor.assigned || 0),
        0
      );

    return {
      totalMentors: mentors.length,

      assignedMentors:
        mentors.filter(
          (mentor) =>
            Number(mentor.assigned || 0) > 0
        ).length,

      unassignedMentors:
        mentors.filter(
          (mentor) =>
            Number(mentor.assigned || 0) === 0
        ).length,

      totalAssigned,

      totalUnassigned: Math.max(
        totalCapacity - totalAssigned,
        0
      ),

      percentage: totalCapacity
        ? Math.round(
            (totalAssigned /
              totalCapacity) *
              100
          )
        : 0,
    };
  }, [mentors]);

  const availableApplications =
    useMemo(() => {
      return applications.filter(
        (application) =>
          !application.assigned ||
          application.applicationId ===
            editingAssignment?.applicationId
      );
    }, [
      applications,
      editingAssignment,
    ]);

  const openAssignModal = () => {
    setEditingAssignment(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowAssignModal(true);
  };

  const openEditModal = (student) => {
    setEditingAssignment(student);

    setForm({
      applicationId:
        student.applicationId || "",
      facultyId:
        student.facultyId || "",
      startDate:
        student.startDate || "",
      endDate:
        student.endDate || "",
    });

    setError("");
    setSuccess("");
    setShowAssignModal(true);
    setViewMentor(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.applicationId ||
      !form.facultyId ||
      !form.startDate ||
      !form.endDate
    ) {
      setError(
        "Please fill all assignment fields."
      );
      return;
    }

    if (form.endDate < form.startDate) {
      setError(
        "End date cannot be before start date."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingAssignment?.assignmentId) {
        await mentorAssignmentService.updateAssignment(
          editingAssignment.assignmentId,
          {
            facultyId: form.facultyId,
            startDate: form.startDate,
            endDate: form.endDate,
            status: "Assigned",
          }
        );

        setSuccess(
          "Mentor assignment updated successfully."
        );
      } else {
        await mentorAssignmentService.assignMentor({
          applicationId:
            form.applicationId,
          facultyId:
            form.facultyId,
          startDate:
            form.startDate,
          endDate:
            form.endDate,
          status: "Assigned",
        });

        setSuccess(
          "Mentor assigned successfully."
        );
      }

      setShowAssignModal(false);
      setForm(emptyForm);
      setEditingAssignment(null);

      await loadData();
    } catch (err) {
      console.error(
        "Mentor assignment save error:",
        err
      );

      setError(
        err?.message ||
          "Failed to save mentor assignment."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveAssignment = async (
    assignmentId
  ) => {
    if (
      !window.confirm(
        "Remove this mentor assignment?"
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await mentorAssignmentService.deleteAssignment(
        assignmentId
      );

      setSuccess(
        "Mentor assignment removed successfully."
      );

      setViewMentor(null);

      await loadData();
    } catch (err) {
      console.error(
        "Remove mentor assignment error:",
        err
      );

      setError(
        err?.message ||
          "Failed to remove assignment."
      );
    } finally {
      setSaving(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment(
      "All Departments"
    );
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const cardStyle = {
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    backgroundColor: colors.surface,
    boxShadow:
      "0 1px 2px rgba(15, 23, 42, 0.04)",
  };

  const inputStyle = {
    width: "100%",
    minHeight: "42px",
    boxSizing: "border-box",
    padding: "0 12px",
    border: `1px solid ${colors.border}`,
    borderRadius: "9px",
    outline: "none",
    color: colors.text,
    backgroundColor: colors.surface,
    fontFamily: "inherit",
    fontSize: "14px",
  };

  const secondaryButtonStyle = {
    minHeight: "40px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "0 13px",
    border: `1px solid ${colors.border}`,
    borderRadius: "9px",
    backgroundColor: colors.surface,
    color: colors.textSecondary,
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  };

  const primaryButtonStyle = {
    minHeight: "40px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "0 14px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: colors.primary,
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 700,
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        minWidth: 0,
        padding: "0",
        backgroundColor: colors.workspace,
        color: colors.text,
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "12px",
          fontSize: "13px",
        }}
      >
        <span
          style={{
            color: colors.primary,
            fontWeight: 600,
          }}
        >
          College Coordinator
        </span>

        <ChevronRight
          size={14}
          color={colors.textMuted}
        />

        <span
          style={{
            color: colors.textSecondary,
          }}
        >
          Mentor Assignment
        </span>
      </div>

      {/* Header */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: colors.text,
              fontSize:
                "clamp(26px, 3vw, 28px)",
              lineHeight: "1.2",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Mentor Assignment
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: colors.textSecondary,
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            Assign faculty mentors to selected OJT
            students and manage mentor workload.
          </p>
        </div>

        <button
          type="button"
          onClick={openAssignModal}
          style={primaryButtonStyle}
        >
          <UserCheck size={16} />
          Assign Mentor
        </button>
      </section>

      {/* Messages */}
      {success && (
        <div
          style={{
            marginBottom: "16px",
            padding: "11px 13px",
            borderRadius: "9px",
            backgroundColor:
              colors.successSoft,
            color: colors.success,
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {success}
        </div>
      )}

      {error && !showAssignModal && (
        <div
          style={{
            marginBottom: "16px",
            padding: "11px 13px",
            borderRadius: "9px",
            backgroundColor:
              colors.dangerSoft,
            color: colors.danger,
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      {/* Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "14px",
          marginBottom: "18px",
        }}
      >
        {[
          {
            label: "Total Mentors",
            value: stats.totalMentors,
            helper: "Faculty mentors",
            icon: Users,
            background:
              colors.primarySoft,
            color: colors.primary,
          },
          {
            label: "Assigned",
            value: stats.assignedMentors,
            helper: "Mentors with students",
            icon: UserCheck,
            background:
              colors.successSoft,
            color: colors.success,
          },
          {
            label: "Available",
            value: stats.unassignedMentors,
            helper: "Ready for assignment",
            icon: UserRoundCheck,
            background:
              colors.warningSoft,
            color: colors.warning,
          },
          {
            label: "Assignment Rate",
            value: `${stats.percentage}%`,
            helper: `${stats.totalAssigned} of ${
              mentors.length *
              MENTOR_CAPACITY
            } capacity`,
            icon: Clock3,
            background:
              colors.infoSoft,
            color: colors.info,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              style={{
                ...cardStyle,
                padding: "18px",
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
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    borderRadius: "11px",
                    backgroundColor:
                      stat.background,
                    color: stat.color,
                  }}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <div
                    style={{
                      color:
                        colors.textSecondary,
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </div>

                  <div
                    style={{
                      marginTop: "2px",
                      color: colors.text,
                      fontSize: "26px",
                      lineHeight: "31px",
                      fontWeight: 700,
                    }}
                  >
                    {stat.value}
                  </div>

                  <div
                    style={{
                      marginTop: "2px",
                      color:
                        colors.textMuted,
                      fontSize: "12px",
                    }}
                  >
                    {stat.helper}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Allocation */}
      <div
        style={{
          ...cardStyle,
          padding: "18px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "15px",
            marginBottom: "10px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: colors.text,
                fontSize: "17px",
                fontWeight: 700,
              }}
            >
              Overall Mentor Allocation
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                color:
                  colors.textSecondary,
                fontSize: "13px",
              }}
            >
              Current utilization of available
              faculty capacity
            </p>
          </div>

          <strong
            style={{
              color: colors.primary,
              fontSize: "26px",
            }}
          >
            {stats.percentage}%
          </strong>
        </div>

        <div
          style={{
            height: "9px",
            overflow: "hidden",
            borderRadius: "999px",
            backgroundColor:
              colors.surfaceMuted,
          }}
        >
          <div
            style={{
              width: `${Math.min(
                stats.percentage,
                100
              )}%`,
              height: "100%",
              borderRadius: "999px",
              backgroundColor:
                colors.primary,
              transition:
                "width .25s ease",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            gap: "10px",
            marginTop: "9px",
            color:
              colors.textSecondary,
            fontSize: "13px",
          }}
        >
          <span>
            {stats.totalAssigned} students
            assigned
          </span>

          <span>
            {stats.totalUnassigned} available
            slots
          </span>
        </div>
      </div>

      {/* Mentor Directory */}
      <div
        style={{
          ...cardStyle,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "15px",
              marginBottom: "14px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: colors.text,
                  fontSize: "17px",
                  fontWeight: 700,
                }}
              >
                Mentor Directory
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color:
                    colors.textSecondary,
                  fontSize: "13px",
                }}
              >
                Faculty mentor workload and OJT
                assignment status
              </p>
            </div>

            <span
              style={{
                color: colors.textSecondary,
                fontSize: "13px",
              }}
            >
              {filteredMentors.length} mentors
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(260px, 1fr) 190px 150px auto",
              gap: "10px",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <Search
                size={17}
                color={colors.textMuted}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />

              <input
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
                placeholder="Search mentor, department or student..."
                style={{
                  ...inputStyle,
                  paddingLeft: "38px",
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
              style={inputStyle}
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
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(
                  event.target.value
                );
                setCurrentPage(1);
              }}
              style={inputStyle}
            >
              {[
                "All Status",
                "Assigned",
                "Unassigned",
                "Full",
              ].map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              style={{
                ...secondaryButtonStyle,
                opacity: loading ? 0.6 : 1,
              }}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color:
                colors.textSecondary,
              fontSize: "14px",
            }}
          >
            Loading mentors...
          </div>
        ) : paginatedMentors.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color:
                colors.textSecondary,
              fontSize: "14px",
            }}
          >
            No faculty mentors found.
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "900px",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor:
                      colors.surfaceMuted,
                  }}
                >
                  {[
                    "Mentor",
                    "Department",
                    "Designation",
                    "Students",
                    "Capacity",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        padding:
                          "12px 14px",
                        textAlign: "left",
                        color:
                          colors.textSecondary,
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          ".03em",
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedMentors.map(
                  (mentor) => (
                    <tr
                      key={mentor.id}
                      style={{
                        backgroundColor:
                          colors.surface,
                      }}
                    >
                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "11px",
                          }}
                        >
                          <StudentIcon
                            colors={
                              colors
                            }
                          />

                          <div>
                            <div
                              style={{
                                color:
                                  colors.text,
                                fontSize:
                                  "14px",
                                fontWeight:
                                  700,
                              }}
                            >
                              {mentor.name}
                            </div>

                            <div
                              style={{
                                marginTop:
                                  "3px",
                                color:
                                  colors.textMuted,
                                fontSize:
                                  "12px",
                              }}
                            >
                              {mentor.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          color:
                            colors.textSecondary,
                          fontSize:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        {mentor.department ||
                          "—"}
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          color:
                            colors.textSecondary,
                          fontSize:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        {mentor.designation ||
                          "Faculty Mentor"}
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        <strong
                          style={{
                            color:
                              colors.text,
                            fontSize:
                              "14px",
                          }}
                        >
                          {mentor.assigned ||
                            0}
                        </strong>

                        <span
                          style={{
                            color:
                              colors.textMuted,
                            fontSize:
                              "12px",
                          }}
                        >
                          {" "}
                          students
                        </span>
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          color:
                            colors.textSecondary,
                          fontSize:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        {mentor.capacity ||
                          MENTOR_CAPACITY}
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        <StatusBadge
                          status={
                            mentor.status
                          }
                          colors={
                            colors
                          }
                        />
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            gap: "7px",
                          }}
                        >
                          <button
                            type="button"
                            title="View students"
                            onClick={() =>
                              setViewMentor(
                                mentor
                              )
                            }
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
                              backgroundColor:
                                colors.surface,
                              color:
                                colors.textSecondary,
                              cursor:
                                "pointer",
                            }}
                          >
                            <Eye
                              size={15}
                            />
                          </button>

                          <button
                            type="button"
                            title="Assign student"
                            disabled={
                              mentor.assigned >=
                                mentor.capacity ||
                              availableApplications.length ===
                                0
                            }
                            onClick={() => {
                              setForm({
                                ...emptyForm,
                                facultyId:
                                  mentor.id,
                              });
                              setEditingAssignment(
                                null
                              );
                              setError("");
                              setShowAssignModal(
                                true
                              );
                            }}
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
                              backgroundColor:
                                colors.surface,
                              color:
                                colors.primary,
                              cursor:
                                mentor.assigned >=
                                  mentor.capacity ||
                                availableApplications.length ===
                                  0
                                  ? "not-allowed"
                                  : "pointer",
                              opacity:
                                mentor.assigned >=
                                  mentor.capacity ||
                                availableApplications.length ===
                                  0
                                  ? 0.45
                                  : 1,
                            }}
                          >
                            <Plus
                              size={15}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading &&
          filteredMentors.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                gap: "12px",
                padding:
                  "13px 18px",
                borderTop: `1px solid ${colors.border}`,
                color:
                  colors.textSecondary,
                fontSize: "13px",
              }}
            >
              <span>
                Showing{" "}
                {(safePage - 1) *
                  MENTORS_PER_PAGE +
                  1}
                -
                {Math.min(
                  safePage *
                    MENTORS_PER_PAGE,
                  filteredMentors.length
                )}{" "}
                of{" "}
                {filteredMentors.length}
              </span>

              <div
                style={{
                  display:
                    "flex",
                  gap: "6px",
                }}
              >
                <button
                  type="button"
                  disabled={
                    safePage === 1
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
                  style={{
                    ...secondaryButtonStyle,
                    minHeight: "34px",
                    opacity:
                      safePage === 1
                        ? 0.45
                        : 1,
                  }}
                >
                  Previous
                </button>

                <span
                  style={{
                    minHeight: "34px",
                    display:
                      "inline-flex",
                    alignItems:
                      "center",
                    padding:
                      "0 11px",
                    borderRadius:
                      "8px",
                    backgroundColor:
                      colors.primarySoft,
                    color:
                      colors.primary,
                    fontWeight: 700,
                  }}
                >
                  {safePage} /{" "}
                  {totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    safePage ===
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
                  style={{
                    ...secondaryButtonStyle,
                    minHeight: "34px",
                    opacity:
                      safePage ===
                      totalPages
                        ? 0.45
                        : 1,
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
      </div>

      {/* View Mentor */}
      {viewMentor && (
        <Modal
          onClose={() =>
            setViewMentor(null)
          }
          width="680px"
          colors={colors}
        >
          <ModalHeader
            title={viewMentor.name}
            subtitle={`${viewMentor.department || "Department"} • ${
              viewMentor.designation ||
              "Faculty Mentor"
            }`}
            onClose={() =>
              setViewMentor(null)
            }
            colors={colors}
          />

          <div
            style={{
              padding: "20px",
            }}
          >
            {(viewMentor.students ||
              []).length === 0 ? (
              <div
                style={{
                  padding:
                    "35px 20px",
                  textAlign:
                    "center",
                  color:
                    colors.textSecondary,
                  fontSize:
                    "14px",
                }}
              >
                No students assigned to
                this mentor.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                }}
              >
                {(
                  viewMentor.students ||
                  []
                ).map((student) => (
                  <div
                    key={
                      student.assignmentId
                    }
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "space-between",
                      gap: "12px",
                      padding:
                        "13px",
                      border: `1px solid ${colors.border}`,
                      borderRadius:
                        "10px",
                      backgroundColor:
                        colors.surfaceMuted,
                    }}
                  >
                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          color:
                            colors.text,
                          fontSize:
                            "14px",
                          fontWeight:
                            700,
                        }}
                      >
                        {
                          student.studentName
                        }
                      </div>

                      <div
                        style={{
                          marginTop:
                            "4px",
                          color:
                            colors.textSecondary,
                          fontSize:
                            "12px",
                        }}
                      >
                        {student.rollNumber ||
                          student.studentId}{" "}
                        •{" "}
                        {
                          student.opportunityTitle
                        }
                      </div>

                      <div
                        style={{
                          marginTop:
                            "4px",
                          color:
                            colors.textMuted,
                          fontSize:
                            "12px",
                        }}
                      >
                        {
                          student.startDate
                        }{" "}
                        →{" "}
                        {
                          student.endDate
                        }
                      </div>
                    </div>

                    <div
                      style={{
                        display:
                          "flex",
                        gap: "7px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            student
                          )
                        }
                        style={{
                          ...secondaryButtonStyle,
                          minHeight:
                            "34px",
                          color:
                            colors.primary,
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveAssignment(
                            student.assignmentId
                          )
                        }
                        style={{
                          width:
                            "34px",
                          height:
                            "34px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          border: `1px solid ${colors.dangerSoft}`,
                          borderRadius:
                            "8px",
                          backgroundColor:
                            colors.dangerSoft,
                          color:
                            colors.danger,
                          cursor:
                            "pointer",
                        }}
                      >
                        <Trash2
                          size={14}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Assignment Modal */}
      {showAssignModal && (
        <Modal
          onClose={() =>
            !saving &&
            setShowAssignModal(
              false
            )
          }
          colors={colors}
        >
          <ModalHeader
            title={
              editingAssignment
                ? "Edit Mentor Assignment"
                : "Assign Mentor"
            }
            subtitle="Save the OJT mentor assignment to MongoDB."
            onClose={() =>
              !saving &&
              setShowAssignModal(
                false
              )
            }
            colors={colors}
          />

          <form
            onSubmit={handleSubmit}
            style={{
              padding: "20px",
            }}
          >
            {error && (
              <div
                style={{
                  marginBottom:
                    "14px",
                  padding:
                    "11px 12px",
                  borderRadius:
                    "9px",
                  backgroundColor:
                    colors.dangerSoft,
                  color:
                    colors.danger,
                  fontSize:
                    "13px",
                  fontWeight:
                    600,
                }}
              >
                {error}
              </div>
            )}

            <div
              style={{
                marginBottom:
                  "16px",
              }}
            >
              <FieldLabel
                colors={colors}
              >
                Selected Student /
                Application
              </FieldLabel>

              <select
                value={
                  form.applicationId
                }
                disabled={Boolean(
                  editingAssignment
                )}
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      applicationId:
                        event.target
                          .value,
                    })
                  )
                }
                style={{
                  ...inputStyle,
                  opacity:
                    editingAssignment
                      ? 0.7
                      : 1,
                }}
              >
                <option value="">
                  Select a selected student
                </option>

                {availableApplications.map(
                  (application) => (
                    <option
                      key={
                        application.applicationId
                      }
                      value={
                        application.applicationId
                      }
                    >
                      {
                        application.studentName
                      }{" "}
                      —{" "}
                      {
                        application.opportunityTitle
                      }
                    </option>
                  )
                )}
              </select>

              {availableApplications.length ===
                0 &&
                !editingAssignment && (
                  <div
                    style={{
                      marginTop:
                        "6px",
                      color:
                        colors.warning,
                      fontSize:
                        "12px",
                    }}
                  >
                    No selected and
                    unassigned applications
                    are available.
                  </div>
                )}
            </div>

            <div
              style={{
                marginBottom:
                  "16px",
              }}
            >
              <FieldLabel
                colors={colors}
              >
                Faculty Mentor
              </FieldLabel>

              <select
                value={
                  form.facultyId
                }
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      facultyId:
                        event.target
                          .value,
                    })
                  )
                }
                style={inputStyle}
              >
                <option value="">
                  Select faculty mentor
                </option>

                {mentors
                  .filter(
                    (mentor) =>
                      mentor.assigned <
                        mentor.capacity ||
                      mentor.id ===
                        form.facultyId
                  )
                  .map((mentor) => (
                    <option
                      key={mentor.id}
                      value={mentor.id}
                    >
                      {mentor.name} —{" "}
                      {
                        mentor.department
                      }{" "}
                      (
                      {mentor.assigned}/
                      {mentor.capacity}
                      )
                    </option>
                  ))}
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "12px",
                marginBottom:
                  "20px",
              }}
            >
              <div>
                <FieldLabel
                  colors={colors}
                >
                  Start Date
                </FieldLabel>

                <div
                  style={{
                    position:
                      "relative",
                  }}
                >
                  <input
                    type="date"
                    value={
                      form.startDate
                    }
                    onChange={(event) =>
                      setForm(
                        (current) => ({
                          ...current,
                          startDate:
                            event.target
                              .value,
                        })
                      )
                    }
                    style={inputStyle}
                  />

                  <CalendarDays
                    size={15}
                    color={
                      colors.textMuted
                    }
                    style={{
                      position:
                        "absolute",
                      right: "11px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      pointerEvents:
                        "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <FieldLabel
                  colors={colors}
                >
                  End Date
                </FieldLabel>

                <div
                  style={{
                    position:
                      "relative",
                  }}
                >
                  <input
                    type="date"
                    value={
                      form.endDate
                    }
                    onChange={(event) =>
                      setForm(
                        (current) => ({
                          ...current,
                          endDate:
                            event.target
                              .value,
                        })
                      )
                    }
                    style={inputStyle}
                  />

                  <CalendarDays
                    size={15}
                    color={
                      colors.textMuted
                    }
                    style={{
                      position:
                        "absolute",
                      right: "11px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      pointerEvents:
                        "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "8px",
              }}
            >
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  setShowAssignModal(
                    false
                  )
                }
                style={{
                  ...secondaryButtonStyle,
                  opacity:
                    saving ? 0.6 : 1,
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                style={{
                  ...primaryButtonStyle,
                  opacity:
                    saving ? 0.65 : 1,
                }}
              >
                <Check size={15} />

                {saving
                  ? "Saving..."
                  : editingAssignment
                  ? "Update Assignment"
                  : "Assign Mentor"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .mentor-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 850px) {
          .mentor-filter-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 650px) {
          .mentor-stats {
            grid-template-columns: 1fr !important;
          }

          .mentor-date-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}