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

/* =========================================================
   MOCK ANNOUNCEMENT DATA
========================================================= */

const initialAnnouncements = [
  {
    id: 1,
    title: "OJT Orientation Program",
    description:
      "All selected students are required to attend the OJT orientation program.",
    audience: "All Students",
    date: "2026-09-05",
    status: "Published",
    priority: "High",
    createdBy: "College Coordinator",
  },
  {
    id: 2,
    title: "Company Registration Deadline",
    description:
      "Companies interested in offering OJT opportunities must complete registration before the deadline.",
    audience: "Companies",
    date: "2026-09-08",
    status: "Published",
    priority: "Medium",
    createdBy: "College Coordinator",
  },
  {
    id: 3,
    title: "Weekly Diary Submission",
    description:
      "Students must submit their weekly OJT diary before the end of every week.",
    audience: "Active OJT Students",
    date: "2026-09-10",
    status: "Published",
    priority: "Medium",
    createdBy: "College Coordinator",
  },
  {
    id: 4,
    title: "Mentor Meeting Schedule",
    description:
      "Mentors are requested to review their assigned students and schedule the first progress meeting.",
    audience: "Mentors",
    date: "2026-09-12",
    status: "Draft",
    priority: "Low",
    createdBy: "College Coordinator",
  },
  {
    id: 5,
    title: "OJT Report Submission",
    description:
      "Final OJT reports must be submitted according to the academic schedule.",
    audience: "Active OJT Students",
    date: "2026-09-20",
    status: "Published",
    priority: "High",
    createdBy: "College Coordinator",
  },
  {
    id: 6,
    title: "Placement Verification",
    description:
      "Students must verify their company and mentor details in the portal.",
    audience: "Selected Students",
    date: "2026-09-22",
    status: "Draft",
    priority: "Medium",
    createdBy: "College Coordinator",
  },
];

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const statusStyles = {
    Published: {
      background: "#ecfdf5",
      color: "#059669",
    },
    Draft: {
      background: "#f8fafc",
      color: "#64748b",
    },
  };

  const current =
    statusStyles[status] || statusStyles.Draft;

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

/* =========================================================
   PRIORITY BADGE
========================================================= */

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
      background: "#eff6ff",
      color: "#2563eb",
    },
  };

  const current =
    styles[priority] || styles.Low;

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
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {priority}
    </span>
  );
}

/* =========================================================
   FORM INPUT
========================================================= */

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

/* =========================================================
   FORM SELECT
========================================================= */

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
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
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          height: "40px",
          padding: "0 11px",
          border: "1px solid #dbe4ee",
          borderRadius: "8px",
          outline: "none",
          color: "#334155",
          backgroundColor: "#ffffff",
          fontSize: "11px",
          boxSizing: "border-box",
        }}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   ANNOUNCEMENT FORM
========================================================= */

function AnnouncementForm({
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
            "repeat(2, minmax(0, 1fr))",
          gap: "14px",
        }}
      >
        <div
          style={{
            gridColumn: "1 / -1",
          }}
        >
          <FormInput
            label="Announcement Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter announcement title"
            required
          />
        </div>

        <FormSelect
          label="Audience"
          name="audience"
          value={formData.audience}
          onChange={onChange}
          options={[
            "All Students",
            "Selected Students",
            "Active OJT Students",
            "Companies",
            "Mentors",
          ]}
        />

        <FormInput
          label="Date"
          name="date"
          value={formData.date}
          onChange={onChange}
          type="date"
          required
        />

        <FormSelect
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={onChange}
          options={[
            "High",
            "Medium",
            "Low",
          ]}
        />

        <FormSelect
          label="Status"
          name="status"
          value={formData.status}
          onChange={onChange}
          options={[
            "Published",
            "Draft",
          ]}
        />

        <div
          style={{
            gridColumn: "1 / -1",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#475569",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Description *
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Write announcement details..."
            required
            rows={5}
            style={{
              width: "100%",
              padding: "11px",
              border: "1px solid #dbe4ee",
              borderRadius: "8px",
              outline: "none",
              resize: "vertical",
              color: "#334155",
              fontSize: "11px",
              lineHeight: "1.5",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "9px",
          marginTop: "20px",
          paddingTop: "15px",
          borderTop: "1px solid #eef2f7",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            height: "38px",
            padding: "0 14px",
            border: "1px solid #dbe4ee",
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
            justifyContent: "center",
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
          {formData.status === "Published" ? (
            <Send size={15} />
          ) : (
            <FileText size={15} />
          )}

          {submitText}
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Announcements() {
  const [announcementList, setAnnouncementList] =
    useState(initialAnnouncements);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedAudience, setSelectedAudience] =
    useState("All Audiences");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [selectedPriority, setSelectedPriority] =
    useState("All Priorities");

  const [currentPage, setCurrentPage] =
    useState(1);

  const announcementsPerPage = 5;

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const [editingAnnouncement, setEditingAnnouncement] =
    useState(null);

  const [actionAnnouncement, setActionAnnouncement] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audience: "All Students",
    date: "",
    status: "Published",
    priority: "Medium",
  });

  /* =======================================================
     FILTER
  ====================================================== */

  const filteredAnnouncements = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return announcementList.filter(
      (announcement) => {
        const matchesSearch =
          !search ||
          announcement.title
            .toLowerCase()
            .includes(search) ||
          announcement.description
            .toLowerCase()
            .includes(search) ||
          announcement.audience
            .toLowerCase()
            .includes(search);

        const matchesAudience =
          selectedAudience ===
            "All Audiences" ||
          announcement.audience ===
            selectedAudience;

        const matchesStatus =
          selectedStatus === "All Status" ||
          announcement.status ===
            selectedStatus;

        const matchesPriority =
          selectedPriority ===
            "All Priorities" ||
          announcement.priority ===
            selectedPriority;

        return (
          matchesSearch &&
          matchesAudience &&
          matchesStatus &&
          matchesPriority
        );
      }
    );
  }, [
    announcementList,
    searchTerm,
    selectedAudience,
    selectedStatus,
    selectedPriority,
  ]);

  /* =======================================================
     PAGINATION
  ====================================================== */

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
      startIndex + announcementsPerPage
    );

  /* =======================================================
     STATS
  ====================================================== */

  const totalAnnouncements =
    announcementList.length;

  const publishedAnnouncements =
    announcementList.filter(
      (item) =>
        item.status === "Published"
    ).length;

  const draftAnnouncements =
    announcementList.filter(
      (item) =>
        item.status === "Draft"
    ).length;

  const highPriorityAnnouncements =
    announcementList.filter(
      (item) =>
        item.priority === "High"
    ).length;

  /* =======================================================
     FORM
  ====================================================== */

  const handleFormChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      audience: "All Students",
      date: "",
      status: "Published",
      priority: "Medium",
    });
  };

  /* =======================================================
     ADD
  ====================================================== */

  const handleAddAnnouncement = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date
    ) {
      return;
    }

    const newAnnouncement = {
      id:
        announcementList.length > 0
          ? Math.max(
              ...announcementList.map(
                (item) => item.id
              )
            ) + 1
          : 1,

      title: formData.title.trim(),

      description:
        formData.description.trim(),

      audience: formData.audience,

      date: formData.date,

      status: formData.status,

      priority: formData.priority,

      createdBy:
        "College Coordinator",
    };

    setAnnouncementList(
      (current) => [
        newAnnouncement,
        ...current,
      ]
    );

    setCurrentPage(1);
    resetForm();
    setShowAddModal(false);
  };

  /* =======================================================
     EDIT
  ====================================================== */

  const openEditAnnouncement = (
    announcement
  ) => {
    setEditingAnnouncement(
      announcement
    );

    setFormData({
      title: announcement.title,
      description:
        announcement.description,
      audience: announcement.audience,
      date: announcement.date,
      status: announcement.status,
      priority: announcement.priority,
    });

    setActionAnnouncement(null);
  };

  const handleEditAnnouncement = (
    event
  ) => {
    event.preventDefault();

    if (
      !editingAnnouncement ||
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date
    ) {
      return;
    }

    setAnnouncementList(
      (current) =>
        current.map((item) =>
          item.id ===
          editingAnnouncement.id
            ? {
                ...item,
                title:
                  formData.title.trim(),
                description:
                  formData.description.trim(),
                audience:
                  formData.audience,
                date:
                  formData.date,
                status:
                  formData.status,
                priority:
                  formData.priority,
              }
            : item
        )
    );

    setEditingAnnouncement(null);
    resetForm();
  };

  /* =======================================================
     DELETE
  ====================================================== */

  const handleDeleteAnnouncement = (
    announcement
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${announcement.title}"?`
      );

    if (!confirmed) {
      return;
    }

    setAnnouncementList(
      (current) =>
        current.filter(
          (item) =>
            item.id !==
            announcement.id
        )
    );

    setSelectedAnnouncement(null);
    setActionAnnouncement(null);
  };

  /* =======================================================
     DATE FORMAT
  ====================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "Not Available";
    }

    const parsedDate =
      new Date(`${date}T00:00:00`);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =======================================================
     RETURN
  ====================================================== */

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
          PAGE HEADER
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
            OJT Management
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "32px",
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
              margin: "7px 0 0",
              color: "#64748b",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            Create and manage important
            OJT announcements for students,
            companies and mentors.
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
            whiteSpace:
              "nowrap",
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
        className="announcement-stats"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        {/* Total */}

        <div
          style={{
            padding: "16px",
            border:
              "1px solid #e2e8f0",
            borderRadius: "13px",
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
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              borderRadius: "10px",
              backgroundColor:
                "#eff6ff",
              color: "#2563eb",
            }}
          >
            <Megaphone size={19} />
          </div>

          <div
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            Total Announcements
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
            {totalAnnouncements}
          </div>

          <div
            style={{
              marginTop: "5px",
              color: "#94a3b8",
              fontSize: "9px",
            }}
          >
            All created announcements
          </div>
        </div>

        {/* Published */}

        <div
          style={{
            padding: "16px",
            border:
              "1px solid #e2e8f0",
            borderRadius: "13px",
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
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              borderRadius: "10px",
              backgroundColor:
                "#ecfdf5",
              color: "#059669",
            }}
          >
            <CheckCircle2
              size={19}
            />
          </div>

          <div
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            Published
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
            {publishedAnnouncements}
          </div>

          <div
            style={{
              marginTop: "5px",
              color: "#94a3b8",
              fontSize: "9px",
            }}
          >
            Currently visible
          </div>
        </div>

        {/* Draft */}

        <div
          style={{
            padding: "16px",
            border:
              "1px solid #e2e8f0",
            borderRadius: "13px",
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
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              borderRadius: "10px",
              backgroundColor:
                "#f8fafc",
              color: "#64748b",
            }}
          >
            <Clock3 size={19} />
          </div>

          <div
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            Drafts
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
            {draftAnnouncements}
          </div>

          <div
            style={{
              marginTop: "5px",
              color: "#94a3b8",
              fontSize: "9px",
            }}
          >
            Not published yet
          </div>
        </div>

        {/* High Priority */}

        <div
          style={{
            padding: "16px",
            border:
              "1px solid #e2e8f0",
            borderRadius: "13px",
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
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              borderRadius: "10px",
              backgroundColor:
                "#fef2f2",
              color: "#dc2626",
            }}
          >
            <AlertTriangle
              size={19}
            />
          </div>

          <div
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            High Priority
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
            {highPriorityAnnouncements}
          </div>

          <div
            style={{
              marginTop: "5px",
              color: "#94a3b8",
              fontSize: "9px",
            }}
          >
            Requires attention
          </div>
        </div>
      </section>

      {/* =====================================================
          ANNOUNCEMENT LIST
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
        {/* Filters */}

        <div
          style={{
            padding: "15px 18px",
            borderBottom:
              "1px solid #eef2f7",
          }}
        >
          <div
            className="announcement-filters"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(200px, 1.6fr) repeat(3, minmax(130px, 1fr))",
              gap: "10px",
            }}
          >
            {/* Search */}

            <div
              style={{
                position:
                  "relative",
              }}
            >
              <Search
                size={16}
                style={{
                  position:
                    "absolute",
                  left: "11px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  color:
                    "#94a3b8",
                }}
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
                placeholder="Search announcements..."
                style={{
                  width: "100%",
                  height: "38px",
                  padding:
                    "0 11px 0 34px",
                  border:
                    "1px solid #dbe4ee",
                  borderRadius: "8px",
                  outline: "none",
                  color: "#334155",
                  fontSize: "11px",
                  boxSizing:
                    "border-box",
                }}
              />
            </div>

            {/* Audience */}

            <select
              value={selectedAudience}
              onChange={(event) => {
                setSelectedAudience(
                  event.target.value
                );
                setCurrentPage(1);
              }}
              style={{
                height: "38px",
                padding: "0 10px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                outline: "none",
                color: "#475569",
                backgroundColor:
                  "#ffffff",
                fontSize: "11px",
              }}
            >
              <option>
                All Audiences
              </option>
              <option>
                All Students
              </option>
              <option>
                Selected Students
              </option>
              <option>
                Active OJT Students
              </option>
              <option>
                Companies
              </option>
              <option>
                Mentors
              </option>
            </select>

            {/* Status */}

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
                padding: "0 10px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                outline: "none",
                color: "#475569",
                backgroundColor:
                  "#ffffff",
                fontSize: "11px",
              }}
            >
              <option>
                All Status
              </option>
              <option>
                Published
              </option>
              <option>
                Draft
              </option>
            </select>

            {/* Priority */}

            <select
              value={selectedPriority}
              onChange={(event) => {
                setSelectedPriority(
                  event.target.value
                );
                setCurrentPage(1);
              }}
              style={{
                height: "38px",
                padding: "0 10px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                outline: "none",
                color: "#475569",
                backgroundColor:
                  "#ffffff",
                fontSize: "11px",
              }}
            >
              <option>
                All Priorities
              </option>
              <option>
                High
              </option>
              <option>
                Medium
              </option>
              <option>
                Low
              </option>
            </select>
          </div>
        </div>

        {/* Table Header */}

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
                  color: "#1e293b",
                  fontSize: "15px",
                  fontWeight: 750,
                }}
              >
                All Announcements
              </h2>

              <p
                style={{
                  margin:
                    "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                View and manage OJT
                announcements
              </p>
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "10px",
              }}
            >
              {filteredAnnouncements.length}{" "}
              result
              {filteredAnnouncements.length !==
              1
                ? "s"
                : ""}
            </div>
          </div>
        </div>

        {/* Table */}

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
                  "Announcement",
                  "Audience",
                  "Date",
                  "Priority",
                  "Status",
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
                      color:
                        "#94a3b8",
                      fontSize: "9px",
                      fontWeight: 750,
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
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedAnnouncements.length >
              0 ? (
                paginatedAnnouncements.map(
                  (announcement) => (
                    <tr
                      key={
                        announcement.id
                      }
                    >
                      {/* Announcement */}

                      <td
                        style={{
                          padding:
                            "13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "flex-start",
                            gap: "10px",
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
                            }}
                          >
                            <Megaphone
                              size={
                                16
                              }
                            />
                          </div>

                          <div
                            style={{
                              minWidth: 0,
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
                                lineHeight:
                                  "16px",
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
                                maxWidth:
                                  "430px",
                                color:
                                  "#94a3b8",
                                fontSize:
                                  "9px",
                                lineHeight:
                                  "14px",
                                overflow:
                                  "hidden",
                                textOverflow:
                                  "ellipsis",
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              {
                                announcement.description
                              }
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Audience */}

                      <td
                        style={{
                          padding:
                            "13px",
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
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "6px",
                          }}
                        >
                          <Users
                            size={
                              14
                            }
                            color="#94a3b8"
                          />

                          {
                            announcement.audience
                          }
                        </div>
                      </td>

                      {/* Date */}

                      <td
                        style={{
                          padding:
                            "13px",
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
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "6px",
                          }}
                        >
                          <CalendarDays
                            size={
                              14
                            }
                            color="#94a3b8"
                          />

                          {formatDate(
                            announcement.date
                          )}
                        </div>
                      </td>

                      {/* Priority */}

                      <td
                        style={{
                          padding:
                            "13px",
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

                      {/* Status */}

                      <td
                        style={{
                          padding:
                            "13px",
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

                      {/* Action */}

                      <td
                        style={{
                          padding:
                            "13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          position:
                            "relative",
                        }}
                      >
                        <button
                          type="button"
                          title="Announcement actions"
                          onClick={() =>
                            setActionAnnouncement(
                              (
                                current
                              ) =>
                                current?.id ===
                                announcement.id
                                  ? null
                                  : announcement
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

                        {actionAnnouncement?.id ===
                          announcement.id && (
                          <div
                            style={{
                              position:
                                "absolute",
                              right:
                                "13px",
                              top:
                                "45px",
                              zIndex:
                                50,
                              width:
                                "145px",
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
                                setSelectedAnnouncement(
                                  announcement
                                );
                                setActionAnnouncement(
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
                                  "8px",
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
                                  "10px",
                                cursor:
                                  "pointer",
                                textAlign:
                                  "left",
                              }}
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
                              onClick={() =>
                                openEditAnnouncement(
                                  announcement
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
                                  "8px",
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
                                  "10px",
                                cursor:
                                  "pointer",
                                textAlign:
                                  "left",
                              }}
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
                                handleDeleteAnnouncement(
                                  announcement
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
                                  "8px",
                                padding:
                                  "0 9px",
                                border:
                                  "none",
                                borderRadius:
                                  "6px",
                                backgroundColor:
                                  "transparent",
                                color:
                                  "#dc2626",
                                fontSize:
                                  "10px",
                                cursor:
                                  "pointer",
                                textAlign:
                                  "left",
                              }}
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
                    colSpan="6"
                    style={{
                      padding:
                        "45px 20px",
                      textAlign:
                        "center",
                    }}
                  >
                    <Megaphone
                      size={28}
                      color="#cbd5e1"
                    />

                    <div
                      style={{
                        marginTop:
                          "10px",
                        color:
                          "#64748b",
                        fontSize:
                          "12px",
                        fontWeight:
                          700,
                      }}
                    >
                      No announcements found
                    </div>

                    <div
                      style={{
                        marginTop:
                          "4px",
                        color:
                          "#94a3b8",
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

        {/* Pagination */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "10px",
            padding:
              "12px 18px",
            borderTop:
              "1px solid #eef2f7",
          }}
        >
          <span
            style={{
              color: "#94a3b8",
              fontSize: "10px",
            }}
          >
            Showing{" "}
            {filteredAnnouncements.length ===
            0
              ? 0
              : startIndex + 1}{" "}
            to{" "}
            {Math.min(
              startIndex +
                announcementsPerPage,
              filteredAnnouncements.length
            )}{" "}
            of{" "}
            {filteredAnnouncements.length}
          </span>

          <div
            style={{
              display: "flex",
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
              style={{
                width: "30px",
                height: "30px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "7px",
                backgroundColor:
                  "#ffffff",
                color:
                  safeCurrentPage ===
                  1
                    ? "#cbd5e1"
                    : "#64748b",
                fontSize: "13px",
                cursor:
                  safeCurrentPage ===
                  1
                    ? "not-allowed"
                    : "pointer",
              }}
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
                style={{
                  width: "30px",
                  height: "30px",
                  border:
                    safeCurrentPage ===
                    page
                      ? "none"
                      : "1px solid #e2e8f0",
                  borderRadius:
                    "7px",
                  backgroundColor:
                    safeCurrentPage ===
                    page
                      ? "#2563eb"
                      : "#ffffff",
                  color:
                    safeCurrentPage ===
                    page
                      ? "#ffffff"
                      : "#64748b",
                  fontSize: "10px",
                  fontWeight:
                    safeCurrentPage ===
                    page
                      ? 700
                      : 400,
                  cursor:
                    "pointer",
                }}
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
              style={{
                width: "30px",
                height: "30px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "7px",
                backgroundColor:
                  "#ffffff",
                color:
                  safeCurrentPage ===
                  totalPages
                    ? "#cbd5e1"
                    : "#64748b",
                fontSize: "13px",
                cursor:
                  safeCurrentPage ===
                  totalPages
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
          ADD ANNOUNCEMENT MODAL
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
            justifyContent:
              "center",
            padding: "20px",
            backgroundColor:
              "rgba(15, 23, 42, 0.45)",
            boxSizing:
              "border-box",
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius:
                "16px",
              backgroundColor:
                "#ffffff",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                padding:
                  "18px 20px",
                borderBottom:
                  "1px solid #eef2f7",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color:
                      "#1e293b",
                    fontSize:
                      "18px",
                    fontWeight:
                      800,
                  }}
                >
                  Create Announcement
                </h2>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color:
                      "#94a3b8",
                    fontSize:
                      "11px",
                  }}
                >
                  Create a new OJT
                  announcement.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(
                    false
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
                  border: "none",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    "#f8fafc",
                  color:
                    "#64748b",
                  cursor:
                    "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            <AnnouncementForm
              formData={formData}
              onChange={
                handleFormChange
              }
              onSubmit={
                handleAddAnnouncement
              }
              onCancel={() =>
                setShowAddModal(
                  false
                )
              }
              submitText="Create Announcement"
            />
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW ANNOUNCEMENT MODAL
      ====================================================== */}

      {selectedAnnouncement && (
        <div
          onClick={() =>
            setSelectedAnnouncement(
              null
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100001,
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding: "20px",
            backgroundColor:
              "rgba(15, 23, 42, 0.45)",
            boxSizing:
              "border-box",
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "570px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius:
                "16px",
              backgroundColor:
                "#ffffff",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                padding:
                  "18px 20px",
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
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    display:
                      "flex",
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
                  <Megaphone
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
                        "17px",
                      fontWeight:
                        800,
                    }}
                  >
                    Announcement Details
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
                    Announcement information
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(
                    null
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
                  border: "none",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    "#f8fafc",
                  color:
                    "#64748b",
                  cursor:
                    "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            <div
              style={{
                padding: "20px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color:
                    "#0f172a",
                  fontSize:
                    "20px",
                  lineHeight:
                    "1.3",
                  fontWeight:
                    800,
                }}
              >
                {
                  selectedAnnouncement.title
                }
              </h3>

              <div
                style={{
                  display:
                    "flex",
                  flexWrap:
                    "wrap",
                  alignItems:
                    "center",
                  gap: "7px",
                  marginTop:
                    "12px",
                }}
              >
                <StatusBadge
                  status={
                    selectedAnnouncement.status
                  }
                />

                <PriorityBadge
                  priority={
                    selectedAnnouncement.priority
                  }
                />
              </div>

              <div
                style={{
                  marginTop:
                    "20px",
                  padding:
                    "15px",
                  border:
                    "1px solid #eef2f7",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#f8fafc",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color:
                      "#475569",
                    fontSize:
                      "12px",
                    lineHeight:
                      "1.7",
                  }}
                >
                  {
                    selectedAnnouncement.description
                  }
                </p>
              </div>

              <div
                className="announcement-view-details"
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "10px",
                  marginTop:
                    "15px",
                }}
              >
                <div
                  style={{
                    padding:
                      "12px",
                    border:
                      "1px solid #eef2f7",
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
                    <Users
                      size={
                        14
                      }
                    />
                    Audience
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
                        700,
                    }}
                  >
                    {
                      selectedAnnouncement.audience
                    }
                  </div>
                </div>

                <div
                  style={{
                    padding:
                      "12px",
                    border:
                      "1px solid #eef2f7",
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
                    <CalendarDays
                      size={
                        14
                      }
                    />
                    Date
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
                        700,
                    }}
                  >
                    {formatDate(
                      selectedAnnouncement.date
                    )}
                  </div>
                </div>

                <div
                  style={{
                    padding:
                      "12px",
                    border:
                      "1px solid #eef2f7",
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
                    <Pencil
                      size={
                        14
                      }
                    />
                    Created By
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
                        700,
                    }}
                  >
                    {
                      selectedAnnouncement.createdBy
                    }
                  </div>
                </div>

                <div
                  style={{
                    padding:
                      "12px",
                    border:
                      "1px solid #eef2f7",
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
                    <Megaphone
                      size={
                        14
                      }
                    />
                    Status
                  </div>

                  <div
                    style={{
                      marginTop:
                        "6px",
                    }}
                  >
                    <StatusBadge
                      status={
                        selectedAnnouncement.status
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT ANNOUNCEMENT MODAL
      ====================================================== */}

      {editingAnnouncement && (
        <div
          onClick={() =>
            setEditingAnnouncement(
              null
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100002,
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding: "20px",
            backgroundColor:
              "rgba(15, 23, 42, 0.45)",
            boxSizing:
              "border-box",
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius:
                "16px",
              backgroundColor:
                "#ffffff",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                padding:
                  "18px 20px",
                borderBottom:
                  "1px solid #eef2f7",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color:
                      "#1e293b",
                    fontSize:
                      "18px",
                    fontWeight:
                      800,
                  }}
                >
                  Edit Announcement
                </h2>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color:
                      "#94a3b8",
                    fontSize:
                      "11px",
                  }}
                >
                  Update announcement
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingAnnouncement(
                    null
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
                  border: "none",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    "#f8fafc",
                  color:
                    "#64748b",
                  cursor:
                    "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            <AnnouncementForm
              formData={formData}
              onChange={
                handleFormChange
              }
              onSubmit={
                handleEditAnnouncement
              }
              onCancel={() =>
                setEditingAnnouncement(
                  null
                )
              }
              submitText="Save Changes"
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
            .announcement-stats {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .announcement-filters {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 650px) {
            .announcement-stats {
              grid-template-columns: 1fr !important;
            }

            .announcement-filters {
              grid-template-columns: 1fr !important;
            }

            .announcement-view-details {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}