import {
  useEffect,
  useMemo,
  useState,
} from "react";

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
  RefreshCw,
  Filter,
  CircleAlert,
  Bell,
  UserRound,
  Building2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import announcementService from "../../services/announcementService";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

const PAGE_SIZE = 6;

const EMPTY_FORM = {
  title: "",
  description: "",
  audience: "All Students",
  date: "",
  status: "Published",
  priority: "Medium",
};

const AUDIENCES = [
  "All Students",
  "Selected Students",
  "Active OJT Students",
  "Companies",
  "Mentors",
];

const PRIORITIES = [
  "High",
  "Medium",
  "Low",
];

const STATUSES = [
  "Published",
  "Draft",
];

function normalizeAnnouncement(item) {
  return {
    ...item,
    id: item?._id || item?.id,
    title:
      item?.title ||
      "Untitled Announcement",
    description:
      item?.message ||
      item?.description ||
      "",
    audience:
      item?.audience ||
      "All Students",
    date:
      item?.publishedOn ||
      item?.date ||
      "",
    status:
      item?.status ||
      "Published",
    priority:
      item?.priority ||
      "Medium",
    createdBy:
      item?.createdBy ||
      item?.publishedByCoordinatorId ||
      "College Coordinator",
  };
}

function getAudienceIcon(audience) {
  switch (audience) {
    case "Companies":
      return <Building2 size={15} />;

    case "Mentors":
      return <UserRound size={15} />;

    case "Active OJT Students":
      return <ShieldCheck size={15} />;

    case "Selected Students":
      return <GraduationCap size={15} />;

    default:
      return <Users size={15} />;
  }
}

function getPriorityIcon(priority) {
  if (priority === "High") {
    return <CircleAlert size={13} />;
  }

  if (priority === "Low") {
    return <Bell size={13} />;
  }

  return <AlertTriangle size={13} />;
}

function formatDate(date) {
  if (!date) {
    return "Not Available";
  }

  const parsedDate = new Date(
    `${String(date).slice(0, 10)}T00:00:00`
  );

  if (Number.isNaN(parsedDate.getTime())) {
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
}

function StatusBadge({ status }) {
  const isPublished =
    status === "Published";

  return (
    <span
      className={`announcement-status-badge ${
        isPublished
          ? "published"
          : "draft"
      }`}
    >
      {isPublished ? (
        <CheckCircle2 size={12} />
      ) : (
        <Clock3 size={12} />
      )}

      {status || "Draft"}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const normalized =
    priority || "Medium";

  return (
    <span
      className={`announcement-priority-badge ${normalized.toLowerCase()}`}
    >
      {getPriorityIcon(normalized)}
      {normalized}
    </span>
  );
}

function AudienceBadge({ audience }) {
  return (
    <span className="announcement-audience-badge">
      {getAudienceIcon(audience)}
      {audience}
    </span>
  );
}

function StatCard({
  icon,
  label,
  value,
  helper,
  variant,
}) {
  return (
    <div className="announcement-stat-card">
      <div
        className={`announcement-stat-icon ${variant}`}
      >
        {icon}
      </div>

      <div className="announcement-stat-content">
        <div className="announcement-stat-label">
          {label}
        </div>

        <div className="announcement-stat-value">
          {value}
        </div>

        <div className="announcement-stat-helper">
          {helper}
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
    <div className="announcement-form-field">
      <label className="announcement-form-label">
        {label}

        {required && (
          <span className="required-mark">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="announcement-form-input"
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="announcement-form-field">
      <label className="announcement-form-label">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="announcement-form-input"
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

function Modal({
  children,
  onClose,
  maxWidth = "680px",
}) {
  return (
    <div
      className="announcement-modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="announcement-modal"
        style={{ maxWidth }}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  description,
  onClose,
  icon,
}) {
  return (
    <div className="announcement-modal-header">
      <div className="announcement-modal-heading">
        {icon && (
          <div className="announcement-modal-icon">
            {icon}
          </div>
        )}

        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="announcement-modal-close"
      >
        <X size={17} />
      </button>
    </div>
  );
}

function AnnouncementForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitText,
  saving,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="announcement-form"
    >
      <div className="announcement-form-grid">
        <div className="announcement-form-full">
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
          options={AUDIENCES}
        />

        <FormInput
          label="Published Date"
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
          options={PRIORITIES}
        />

        <FormSelect
          label="Status"
          name="status"
          value={formData.status}
          onChange={onChange}
          options={STATUSES}
        />

        <div className="announcement-form-full">
          <div className="announcement-form-field">
            <label className="announcement-form-label">
              Announcement Message
              <span className="required-mark">
                *
              </span>
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Write the announcement details..."
              required
              rows={6}
              className="announcement-form-textarea"
            />

            <div className="announcement-form-helper">
              Keep the message clear and
              relevant to the selected
              audience.
            </div>
          </div>
        </div>
      </div>

      <div className="announcement-form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="announcement-secondary-button"
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="announcement-primary-button"
          disabled={saving}
        >
          {saving ? (
            <RefreshCw
              size={15}
              className="announcement-spin"
            />
          ) : formData.status ===
            "Published" ? (
            <Send size={15} />
          ) : (
            <FileText size={15} />
          )}

          {saving
            ? "Saving..."
            : submitText}
        </button>
      </div>
    </form>
  );
}

function DetailItem({
  icon,
  label,
  children,
}) {
  return (
    <div className="announcement-detail-item">
      <div className="announcement-detail-label">
        {icon}
        <span>{label}</span>
      </div>

      <div className="announcement-detail-value">
        {children || "Not Available"}
      </div>
    </div>
  );
}

export default function Announcements() {
  const { colors } =
    useCoordinatorTheme();

  const [
    announcementList,
    setAnnouncementList,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    selectedAudience,
    setSelectedAudience,
  ] = useState("All Audiences");

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState("All Status");

  const [
    selectedPriority,
    setSelectedPriority,
  ] = useState("All Priorities");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);

  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] = useState(null);

  const [
    editingAnnouncement,
    setEditingAnnouncement,
  ] = useState(null);

  const [
    deletingAnnouncement,
    setDeletingAnnouncement,
  ] = useState(null);

  const [
    actionAnnouncement,
    setActionAnnouncement,
  ] = useState(null);

  const [formData, setFormData] =
    useState({
      ...EMPTY_FORM,
    });

  const loadAnnouncements = async (
    showRefresh = false
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response =
        await announcementService.getAnnouncements();

      const data =
        response?.announcements || [];

      setAnnouncementList(
        Array.isArray(data)
          ? data.map(
              normalizeAnnouncement
            )
          : []
      );
    } catch (err) {
      console.error(
        "Load announcements error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load announcements."
      );

      setAnnouncementList([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const filteredAnnouncements =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return announcementList.filter(
        (announcement) => {
          const matchesSearch =
            !search ||
            String(
              announcement.title || ""
            )
              .toLowerCase()
              .includes(search) ||
            String(
              announcement.description ||
                ""
            )
              .toLowerCase()
              .includes(search) ||
            String(
              announcement.audience ||
                ""
            )
              .toLowerCase()
              .includes(search) ||
            String(
              announcement.createdBy ||
                ""
            )
              .toLowerCase()
              .includes(search);

          const matchesAudience =
            selectedAudience ===
              "All Audiences" ||
            announcement.audience ===
              selectedAudience;

          const matchesStatus =
            selectedStatus ===
              "All Status" ||
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

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAnnouncements.length /
        PAGE_SIZE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    PAGE_SIZE;

  const paginatedAnnouncements =
    filteredAnnouncements.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedAudience,
    selectedStatus,
    selectedPriority,
  ]);

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

  const handleFormChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      ...EMPTY_FORM,
    });
  };

  const openCreateModal = () => {
    resetForm();
    setEditingAnnouncement(null);
    setShowAddModal(true);
  };

  const closeCreateModal = () => {
    if (saving) return;

    setShowAddModal(false);
    resetForm();
  };

  const handleAddAnnouncement =
    async (event) => {
      event.preventDefault();

      if (
        !formData.title.trim() ||
        !formData.description.trim() ||
        !formData.date
      ) {
        return;
      }

      try {
        setSaving(true);
        setError("");

        const response =
          await announcementService.addAnnouncement(
            {
              title:
                formData.title.trim(),
              message:
                formData.description.trim(),
              publishedOn:
                formData.date,
              audience:
                formData.audience,
              status:
                formData.status,
              priority:
                formData.priority,
            }
          );

        if (
          response?.announcement
        ) {
          setAnnouncementList(
            (current) => [
              normalizeAnnouncement(
                response.announcement
              ),
              ...current,
            ]
          );
        } else {
          await loadAnnouncements(
            true
          );
        }

        setCurrentPage(1);
        setShowAddModal(false);
        resetForm();
      } catch (err) {
        console.error(
          "Add announcement error:",
          err
        );

        setError(
          err?.message ||
            "Failed to create announcement."
        );
      } finally {
        setSaving(false);
      }
    };

  const openEditAnnouncement = (
    announcement
  ) => {
    setEditingAnnouncement(
      announcement
    );

    setFormData({
      title:
        announcement.title || "",
      description:
        announcement.description ||
        "",
      audience:
        announcement.audience ||
        "All Students",
      date:
        announcement.date || "",
      status:
        announcement.status ||
        "Published",
      priority:
        announcement.priority ||
        "Medium",
    });

    setActionAnnouncement(null);
  };

  const closeEditModal = () => {
    if (saving) return;

    setEditingAnnouncement(null);
    resetForm();
  };

  const handleEditAnnouncement =
    async (event) => {
      event.preventDefault();

      if (
        !editingAnnouncement ||
        !formData.title.trim() ||
        !formData.description.trim() ||
        !formData.date
      ) {
        return;
      }

      try {
        setSaving(true);
        setError("");

        const response =
          await announcementService.updateAnnouncement(
            editingAnnouncement.id,
            {
              title:
                formData.title.trim(),
              message:
                formData.description.trim(),
              publishedOn:
                formData.date,
              audience:
                formData.audience,
              status:
                formData.status,
              priority:
                formData.priority,
            }
          );

        if (
          response?.announcement
        ) {
          setAnnouncementList(
            (current) =>
              current.map(
                (item) =>
                  item.id ===
                  editingAnnouncement.id
                    ? normalizeAnnouncement(
                        response.announcement
                      )
                    : item
              )
          );
        } else {
          await loadAnnouncements(
            true
          );
        }

        setEditingAnnouncement(
          null
        );

        resetForm();
      } catch (err) {
        console.error(
          "Edit announcement error:",
          err
        );

        setError(
          err?.message ||
            "Failed to update announcement."
        );
      } finally {
        setSaving(false);
      }
    };

  const handleDeleteAnnouncement =
    async () => {
      if (!deletingAnnouncement) {
        return;
      }

      try {
        setDeleting(true);
        setError("");

        await announcementService.deleteAnnouncement(
          deletingAnnouncement.id
        );

        setAnnouncementList(
          (current) =>
            current.filter(
              (item) =>
                item.id !==
                deletingAnnouncement.id
            )
        );

        setSelectedAnnouncement(null);
        setActionAnnouncement(null);
        setDeletingAnnouncement(null);
      } catch (err) {
        console.error(
          "Delete announcement error:",
          err
        );

        setError(
          err?.message ||
            "Failed to delete announcement."
        );
      } finally {
        setDeleting(false);
      }
    };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAudience(
      "All Audiences"
    );
    setSelectedStatus(
      "All Status"
    );
    setSelectedPriority(
      "All Priorities"
    );
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm.trim() ||
    selectedAudience !==
      "All Audiences" ||
    selectedStatus !==
      "All Status" ||
    selectedPriority !==
      "All Priorities";

  const getPriorityStyles = (
    priority
  ) => {
    if (priority === "High") {
      return {
        background:
          colors.dangerSoft,
        color: colors.danger,
        border:
          `1px solid ${colors.danger}35`,
      };
    }

    if (priority === "Low") {
      return {
        background:
          colors.successSoft,
        color: colors.success,
        border:
          `1px solid ${colors.success}35`,
      };
    }

    return {
      background:
        colors.warningSoft,
      color: colors.warning,
      border:
        `1px solid ${colors.warning}35`,
    };
  };

  const getStatusStyles = (
    status
  ) => {
    if (status === "Published") {
      return {
        background:
          colors.successSoft,
        color: colors.success,
        border:
          `1px solid ${colors.success}35`,
      };
    }

    return {
      background:
        colors.surfaceMuted,
      color: colors.textSecondary,
      border:
        `1px solid ${colors.border}`,
    };
  };

  return (
    <div
      className="announcements-page"
      style={{
        "--workspace":
          colors.workspace,
        "--surface":
          colors.surface,
        "--surface-muted":
          colors.surfaceMuted,
        "--text": colors.text,
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
        "--primary-hover":
          colors.primaryHover,
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        .announcements-page {
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

        .announcement-container {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }

        .announcement-breadcrumb {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .announcement-breadcrumb .current {
          color: var(--text);
          font-weight: 600;
        }

        .announcement-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .announcement-eyebrow {
          margin-bottom: 4px;
          color: var(--primary);
          font-size: 11px;
          line-height: 17px;
          font-weight: 700;
          letter-spacing: .08em;
        }

        .announcement-page-header h1 {
          margin: 0;
          color: var(--text);
          font-size: 28px;
          line-height: 36px;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .announcement-page-header p {
          margin: 6px 0 0;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 22px;
        }

        .announcement-create-button {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 15px;
          border: 1px solid var(--primary);
          border-radius: 8px;
          background: var(--primary);
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .announcement-create-button:hover {
          background: var(--primary-hover);
          border-color: var(--primary-hover);
        }

        .announcement-error {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-bottom: 18px;
          padding: 12px 14px;
          border: 1px solid ${colors.danger}40;
          border-radius: 9px;
          background: ${colors.dangerSoft};
          color: ${colors.danger};
          font-size: 13px;
          line-height: 20px;
        }

        .announcement-error-close {
          margin-left: auto;
          padding: 0;
          border: none;
          background: transparent;
          color: ${colors.danger};
          cursor: pointer;
        }

        .announcement-stats {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 22px;
        }

        .announcement-stat-card {
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

        .announcement-stat-icon {
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .announcement-stat-icon.blue {
          background: ${colors.primarySoft};
          color: ${colors.primary};
        }

        .announcement-stat-icon.green {
          background: ${colors.successSoft};
          color: ${colors.success};
        }

        .announcement-stat-icon.slate {
          background: var(--surface-muted);
          color: var(--text-secondary);
        }

        .announcement-stat-icon.red {
          background: ${colors.dangerSoft};
          color: ${colors.danger};
        }

        .announcement-stat-label {
          margin-bottom: 3px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 19px;
          font-weight: 500;
        }

        .announcement-stat-value {
          color: var(--text);
          font-size: 26px;
          line-height: 32px;
          font-weight: 700;
        }

        .announcement-stat-helper {
          margin-top: 2px;
          color: var(--text-muted);
          font-size: 12px;
          line-height: 17px;
        }

        .announcement-main-card {
          overflow: visible;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: var(--surface);
          box-shadow:
            0 1px 2px rgba(15, 23, 42, .04);
        }

        .announcement-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 19px 21px;
          border-bottom: 1px solid var(--border);
        }

        .announcement-toolbar-heading h2 {
          margin: 0;
          color: var(--text);
          font-size: 17px;
          line-height: 24px;
          font-weight: 700;
        }

        .announcement-toolbar-heading p {
          margin: 3px 0 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .announcement-refresh-button {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
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
        }

        .announcement-refresh-button:hover {
          background: var(--surface-muted);
          color: var(--text);
        }

        .announcement-filter-area {
          display: grid;
          grid-template-columns:
            minmax(250px, 1.7fr)
            minmax(160px, 1fr)
            minmax(140px, .9fr)
            minmax(150px, .9fr)
            auto;
          gap: 10px;
          padding: 17px 21px;
          border-bottom: 1px solid var(--border);
        }

        .announcement-search {
          position: relative;
        }

        .announcement-search > svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .announcement-search input,
        .announcement-filter-select {
          width: 100%;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 8px;
          outline: none;
          background: var(--surface);
          color: var(--text);
          font-family: inherit;
          font-size: 14px;
        }

        .announcement-search input {
          padding: 0 12px 0 36px;
        }

        .announcement-search input::placeholder {
          color: var(--text-muted);
        }

        .announcement-filter-select {
          padding: 0 32px 0 11px;
        }

        .announcement-search input:focus,
        .announcement-filter-select:focus,
        .announcement-form-input:focus,
        .announcement-form-textarea:focus {
          border-color: var(--primary);
          box-shadow:
            0 0 0 3px ${colors.primary}18;
        }

        .announcement-clear-filter {
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 0 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .announcement-clear-filter:hover {
          background: var(--surface-muted);
        }

        .announcement-list-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 21px;
          border-bottom: 1px solid var(--border);
        }

        .announcement-list-title {
          color: var(--text);
          font-size: 14px;
          font-weight: 700;
        }

        .announcement-list-subtitle {
          margin-left: 9px;
          color: var(--text-muted);
          font-size: 12px;
        }

        .announcement-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .announcement-table {
          width: 100%;
          min-width: 1000px;
          border-collapse: collapse;
        }

        .announcement-table th {
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

        .announcement-table td {
          position: relative;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-light);
          color: var(--text);
          font-size: 14px;
          vertical-align: middle;
        }

        .announcement-table-row {
          cursor: pointer;
        }

        .announcement-table-row:hover td {
          background: ${colors.primarySoft};
        }

        .announcement-title-cell {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 300px;
          max-width: 430px;
        }

        .announcement-row-icon {
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
        }

        .announcement-row-icon.high {
          background: ${colors.dangerSoft};
          color: ${colors.danger};
        }

        .announcement-row-icon.medium {
          background: ${colors.warningSoft};
          color: ${colors.warning};
        }

        .announcement-row-icon.low {
          background: ${colors.successSoft};
          color: ${colors.success};
        }

        .announcement-title-content {
          min-width: 0;
        }

        .announcement-title-content strong {
          display: block;
          overflow: hidden;
          color: var(--text);
          font-size: 14px;
          line-height: 20px;
          font-weight: 700;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .announcement-title-content span {
          display: block;
          overflow: hidden;
          margin-top: 2px;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 18px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .announcement-audience-badge,
        .announcement-status-badge,
        .announcement-priority-badge {
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

        .announcement-audience-badge {
          border: 1px solid var(--border);
          background: var(--surface-muted);
          color: var(--text-secondary);
        }

        .announcement-status-badge.published {
          background: ${colors.successSoft};
          color: ${colors.success};
          border: 1px solid ${colors.success}35;
        }

        .announcement-status-badge.draft {
          background: var(--surface-muted);
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }

        .announcement-priority-badge.high {
          background: ${colors.dangerSoft};
          color: ${colors.danger};
          border: 1px solid ${colors.danger}35;
        }

        .announcement-priority-badge.medium {
          background: ${colors.warningSoft};
          color: ${colors.warning};
          border: 1px solid ${colors.warning}35;
        }

        .announcement-priority-badge.low {
          background: ${colors.successSoft};
          color: ${colors.success};
          border: 1px solid ${colors.success}35;
        }

        .announcement-date-cell {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .announcement-action-cell {
          width: 60px;
          text-align: center;
        }

        .announcement-more-button {
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

        .announcement-more-button:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .announcement-action-menu {
          position: absolute;
          right: 12px;
          top: 52px;
          z-index: 20;
          width: 155px;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, .18);
        }

        .announcement-action-menu button {
          width: 100%;
          height: 38px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 11px;
          border: none;
          background: transparent;
          color: var(--text);
          font-family: inherit;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
        }

        .announcement-action-menu button:hover {
          background: var(--surface-muted);
        }

        .announcement-action-menu button.danger {
          color: ${colors.danger};
        }

        .announcement-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 14px 20px;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .announcement-pagination-controls {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .announcement-pagination-controls button {
          min-width: 32px;
          height: 32px;
          padding: 0 8px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .announcement-pagination-controls button:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
        }

        .announcement-pagination-controls button.active {
          border-color: var(--primary);
          background: var(--primary);
          color: #fff;
        }

        .announcement-pagination-controls button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .announcement-state {
          min-height: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 30px;
          color: var(--text-secondary);
          text-align: center;
        }

        .announcement-state strong {
          color: var(--text);
          font-size: 14px;
        }

        .announcement-state span {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .announcement-empty-icon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
          border-radius: 50%;
          background: ${colors.primarySoft};
          color: ${colors.primary};
        }

        .announcement-empty-action {
          min-height: 36px;
          margin-top: 5px;
          padding: 0 13px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .announcement-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(2, 6, 23, .58);
        }

        .announcement-modal {
          width: 100%;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface);
          color: var(--text);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, .28);
        }

        .announcement-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          padding: 19px 20px;
          border-bottom: 1px solid var(--border);
        }

        .announcement-modal-heading {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .announcement-modal-icon {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: ${colors.primarySoft};
          color: ${colors.primary};
        }

        .announcement-modal-header h2 {
          margin: 0;
          color: var(--text);
          font-size: 17px;
          line-height: 24px;
          font-weight: 700;
        }

        .announcement-modal-header p {
          margin: 3px 0 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .announcement-modal-close {
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

        .announcement-modal-close:hover {
          background: var(--surface-muted);
          color: var(--text);
        }

        .announcement-form {
          padding: 20px;
        }

        .announcement-form-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .announcement-form-full {
          grid-column: 1 / -1;
        }

        .announcement-form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .announcement-form-label {
          color: var(--text);
          font-size: 13px;
          line-height: 19px;
          font-weight: 600;
        }

        .required-mark {
          margin-left: 3px;
          color: ${colors.danger};
        }

        .announcement-form-input,
        .announcement-form-textarea {
          width: 100%;
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

        .announcement-form-input {
          height: 40px;
          padding: 0 11px;
        }

        .announcement-form-textarea {
          min-height: 130px;
          padding: 11px;
          resize: vertical;
          line-height: 21px;
        }

        .announcement-form-input::placeholder,
        .announcement-form-textarea::placeholder {
          color: var(--text-muted);
        }

        .announcement-form-helper {
          color: var(--text-muted);
          font-size: 12px;
          line-height: 18px;
        }

        .announcement-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 20px;
          padding-top: 17px;
          border-top: 1px solid var(--border);
        }

        .announcement-secondary-button,
        .announcement-primary-button {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 15px;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .announcement-secondary-button {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
        }

        .announcement-secondary-button:hover {
          background: var(--surface-muted);
          color: var(--text);
        }

        .announcement-primary-button {
          border: 1px solid var(--primary);
          background: var(--primary);
          color: #fff;
        }

        .announcement-primary-button:hover {
          background: var(--primary-hover);
          border-color: var(--primary-hover);
        }

        .announcement-primary-button:disabled,
        .announcement-secondary-button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .announcement-detail-body {
          padding: 20px;
        }

        .announcement-detail-title {
          margin: 0 0 8px;
          color: var(--text);
          font-size: 21px;
          line-height: 28px;
          font-weight: 700;
        }

        .announcement-detail-message {
          margin: 0 0 20px;
          padding: 15px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface-muted);
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 23px;
          white-space: pre-wrap;
        }

        .announcement-detail-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 11px;
        }

        .announcement-detail-item {
          padding: 12px 13px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
        }

        .announcement-detail-label {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 5px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
        }

        .announcement-detail-label svg {
          color: var(--primary);
        }

        .announcement-detail-value {
          color: var(--text);
          font-size: 14px;
          font-weight: 600;
          word-break: break-word;
        }

        .announcement-detail-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 20px;
        }

        .announcement-delete-body {
          padding: 24px 20px;
          text-align: center;
        }

        .announcement-delete-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 13px;
          border-radius: 50%;
          background: ${colors.dangerSoft};
          color: ${colors.danger};
        }

        .announcement-delete-body h3 {
          margin: 0;
          color: var(--text);
          font-size: 17px;
          line-height: 24px;
        }

        .announcement-delete-body p {
          margin: 7px auto 0;
          max-width: 430px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 20px;
        }

        .announcement-delete-name {
          margin-top: 12px;
          padding: 10px;
          border-radius: 8px;
          background: var(--surface-muted);
          color: var(--text);
          font-size: 13px;
          font-weight: 700;
        }

        .announcement-delete-actions {
          display: flex;
          justify-content: center;
          gap: 9px;
          margin-top: 20px;
        }

        .announcement-danger-button {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 15px;
          border: 1px solid ${colors.danger};
          border-radius: 8px;
          background: ${colors.danger};
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .announcement-danger-button:hover {
          opacity: .9;
        }

        .announcement-danger-button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .announcement-spin {
          animation: announcementSpin 1s linear infinite;
        }

        @keyframes announcementSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1150px) {
          .announcement-stats {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .announcement-filter-area {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .announcement-clear-filter {
            width: 100%;
          }
        }

        @media (max-width: 760px) {
          .announcements-page {
            padding: 22px 16px 32px;
          }

          .announcement-page-header {
            flex-direction: column;
          }

          .announcement-create-button {
            width: 100%;
          }

          .announcement-stats {
            grid-template-columns: 1fr;
          }

          .announcement-filter-area {
            grid-template-columns: 1fr;
            padding: 15px;
          }

          .announcement-toolbar {
            align-items: flex-start;
          }

          .announcement-pagination {
            flex-direction: column;
            align-items: flex-start;
          }

          .announcement-pagination-controls {
            width: 100%;
            justify-content: flex-end;
          }

          .announcement-form-grid,
          .announcement-detail-grid {
            grid-template-columns: 1fr;
          }

          .announcement-form-full {
            grid-column: auto;
          }
        }

        @media (max-width: 480px) {
          .announcement-page-header h1 {
            font-size: 24px;
            line-height: 31px;
          }

          .announcement-toolbar {
            flex-direction: column;
          }

          .announcement-refresh-button {
            width: 100%;
          }

          .announcement-modal-overlay {
            padding: 10px;
          }

          .announcement-form,
          .announcement-detail-body {
            padding: 16px;
          }
        }
      `}</style>

      <div className="announcement-container">
        <div className="announcement-breadcrumb">
          <span className="current">
            Dashboard
          </span>

          <ChevronRight size={14} />

          <span>
            Announcements
          </span>
        </div>

        <section className="announcement-page-header">
          <div>
            <div className="announcement-eyebrow">
              OJT MANAGEMENT
            </div>

            <h1>
              Announcements
            </h1>

            <p>
              Publish important OJT
              updates and communications
              for students, companies and
              mentors.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="announcement-create-button"
          >
            <Plus size={17} />
            Create Announcement
          </button>
        </section>

        {error && (
          <div className="announcement-error">
            <AlertTriangle size={17} />

            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="announcement-error-close"
            >
              <X size={15} />
            </button>
          </div>
        )}

        <section className="announcement-stats">
          <StatCard
            icon={
              <Megaphone size={20} />
            }
            label="Total Announcements"
            value={totalAnnouncements}
            helper="All created announcements"
            variant="blue"
          />

          <StatCard
            icon={
              <CheckCircle2 size={20} />
            }
            label="Published"
            value={publishedAnnouncements}
            helper="Currently visible"
            variant="green"
          />

          <StatCard
            icon={<Clock3 size={20} />}
            label="Drafts"
            value={draftAnnouncements}
            helper="Not published yet"
            variant="slate"
          />

          <StatCard
            icon={
              <AlertTriangle size={20} />
            }
            label="High Priority"
            value={
              highPriorityAnnouncements
            }
            helper="Requires attention"
            variant="red"
          />
        </section>

        <section className="announcement-main-card">
          <div className="announcement-toolbar">
            <div className="announcement-toolbar-heading">
              <div>
                <h2>
                  Announcement Directory
                </h2>

                <p>
                  View, publish and manage
                  OJT communications.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                loadAnnouncements(true)
              }
              disabled={refreshing}
              className="announcement-refresh-button"
            >
              <RefreshCw
                size={14}
                className={
                  refreshing
                    ? "announcement-spin"
                    : ""
                }
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>
          </div>

          <div className="announcement-filter-area">
            <div className="announcement-search">
              <Search size={16} />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search by title, message, audience..."
              />
            </div>

            <select
              value={selectedAudience}
              onChange={(event) =>
                setSelectedAudience(
                  event.target.value
                )
              }
              className="announcement-filter-select"
            >
              <option>
                All Audiences
              </option>

              {AUDIENCES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(
                  event.target.value
                )
              }
              className="announcement-filter-select"
            >
              <option>
                All Status
              </option>

              {STATUSES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(event) =>
                setSelectedPriority(
                  event.target.value
                )
              }
              className="announcement-filter-select"
            >
              <option>
                All Priorities
              </option>

              {PRIORITIES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="announcement-clear-filter"
              >
                <Filter size={14} />
                Clear
              </button>
            )}
          </div>

          <div className="announcement-list-heading">
            <div>
              <span className="announcement-list-title">
                All Announcements
              </span>

              <span className="announcement-list-subtitle">
                {
                  filteredAnnouncements.length
                }{" "}
                result
                {filteredAnnouncements.length !==
                1
                  ? "s"
                  : ""}
              </span>
            </div>
          </div>

          <div className="announcement-table-wrapper">
            {loading ? (
              <div className="announcement-state">
                <RefreshCw
                  size={28}
                  className="announcement-spin"
                  color={colors.primary}
                />

                <strong>
                  Loading announcements
                </strong>

                <span>
                  Fetching the latest
                  records from the server.
                </span>
              </div>
            ) : paginatedAnnouncements.length >
              0 ? (
              <table className="announcement-table">
                <thead>
                  <tr>
                    <th>
                      Announcement
                    </th>

                    <th>
                      Audience
                    </th>

                    <th>
                      Published Date
                    </th>

                    <th>
                      Priority
                    </th>

                    <th>
                      Status
                    </th>

                    <th className="action-column">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedAnnouncements.map(
                    (announcement) => (
                      <tr
                        key={
                          announcement.id
                        }
                        className="announcement-table-row"
                        onClick={() =>
                          setSelectedAnnouncement(
                            announcement
                          )
                        }
                      >
                        <td>
                          <div className="announcement-title-cell">
                            <div
                              className={`announcement-row-icon ${
                                announcement.priority.toLowerCase()
                              }`}
                            >
                              <Megaphone
                                size={17}
                              />
                            </div>

                            <div className="announcement-title-content">
                              <strong>
                                {
                                  announcement.title
                                }
                              </strong>

                              <span>
                                {announcement.description ||
                                  "No message available."}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <AudienceBadge
                            audience={
                              announcement.audience
                            }
                          />
                        </td>

                        <td>
                          <div className="announcement-date-cell">
                            <CalendarDays
                              size={15}
                            />

                            <span>
                              {formatDate(
                                announcement.date
                              )}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span
                            className="announcement-priority-badge"
                            style={getPriorityStyles(
                              announcement.priority
                            )}
                          >
                            {getPriorityIcon(
                              announcement.priority
                            )}

                            {
                              announcement.priority
                            }
                          </span>
                        </td>

                        <td>
                          <span
                            className="announcement-status-badge"
                            style={getStatusStyles(
                              announcement.status
                            )}
                          >
                            {announcement.status ===
                            "Published" ? (
                              <CheckCircle2
                                size={12}
                              />
                            ) : (
                              <Clock3
                                size={12}
                              />
                            )}

                            {
                              announcement.status
                            }
                          </span>
                        </td>

                        <td
                          className="announcement-action-cell"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <button
                            type="button"
                            className="announcement-more-button"
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
                            title="Actions"
                          >
                            <MoreHorizontal
                              size={17}
                            />
                          </button>

                          {actionAnnouncement?.id ===
                            announcement.id && (
                            <div className="announcement-action-menu">
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
                              >
                                <Eye
                                  size={14}
                                />
                                View Details
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openEditAnnouncement(
                                    announcement
                                  )
                                }
                              >
                                <Pencil
                                  size={14}
                                />
                                Edit
                              </button>

                              <button
                                type="button"
                                className="danger"
                                onClick={() => {
                                  setDeletingAnnouncement(
                                    announcement
                                  );
                                  setActionAnnouncement(
                                    null
                                  );
                                }}
                              >
                                <Trash2
                                  size={14}
                                />
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <div className="announcement-state empty">
                <div className="announcement-empty-icon">
                  <Megaphone size={27} />
                </div>

                <strong>
                  No announcements found
                </strong>

                <span>
                  {announcementList.length ===
                  0
                    ? "Create your first announcement to get started."
                    : "Try changing your search or filter criteria."}
                </span>

                {hasActiveFilters &&
                  announcementList.length >
                    0 && (
                    <button
                      type="button"
                      onClick={
                        clearFilters
                      }
                      className="announcement-empty-action"
                    >
                      Clear Filters
                    </button>
                  )}
              </div>
            )}
          </div>

          <div className="announcement-pagination">
            <span>
              Showing{" "}
              {filteredAnnouncements.length ===
              0
                ? 0
                : startIndex + 1}{" "}
              to{" "}
              {Math.min(
                startIndex + PAGE_SIZE,
                filteredAnnouncements.length
              )}{" "}
              of{" "}
              {
                filteredAnnouncements.length
              }
            </span>

            <div className="announcement-pagination-controls">
              <button
                type="button"
                disabled={
                  safeCurrentPage === 1
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
              >
                ‹
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    safeCurrentPage ===
                    page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
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
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>

      {showAddModal && (
        <Modal
          onClose={closeCreateModal}
        >
          <ModalHeader
            title="Create Announcement"
            description="Publish an important OJT communication."
            onClose={
              closeCreateModal
            }
            icon={
              <Megaphone size={19} />
            }
          />

          <AnnouncementForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={
              handleAddAnnouncement
            }
            onCancel={
              closeCreateModal
            }
            submitText="Create Announcement"
            saving={saving}
          />
        </Modal>
      )}

      {editingAnnouncement && (
        <Modal
          onClose={closeEditModal}
        >
          <ModalHeader
            title="Edit Announcement"
            description="Update the announcement details and publication settings."
            onClose={
              closeEditModal
            }
            icon={
              <Pencil size={18} />
            }
          />

          <AnnouncementForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={
              handleEditAnnouncement
            }
            onCancel={
              closeEditModal
            }
            submitText="Save Changes"
            saving={saving}
          />
        </Modal>
      )}

      {selectedAnnouncement && (
        <Modal
          onClose={() =>
            setSelectedAnnouncement(
              null
            )
          }
          maxWidth="700px"
        >
          <ModalHeader
            title="Announcement Details"
            description="Review the complete announcement information."
            onClose={() =>
              setSelectedAnnouncement(
                null
              )
            }
            icon={
              <Eye size={19} />
            }
          />

          <div className="announcement-detail-body">
            <h3 className="announcement-detail-title">
              {
                selectedAnnouncement.title
              }
            </h3>

            <div className="announcement-detail-message">
              {
                selectedAnnouncement.description ||
                "No message available."
              }
            </div>

            <div className="announcement-detail-grid">
              <DetailItem
                icon={
                  <Users size={14} />
                }
                label="Audience"
              >
                {
                  selectedAnnouncement.audience
                }
              </DetailItem>

              <DetailItem
                icon={
                  <CalendarDays
                    size={14}
                  />
                }
                label="Published Date"
              >
                {formatDate(
                  selectedAnnouncement.date
                )}
              </DetailItem>

              <DetailItem
                icon={
                  <AlertTriangle
                    size={14}
                  />
                }
                label="Priority"
              >
                {
                  selectedAnnouncement.priority
                }
              </DetailItem>

              <DetailItem
                icon={
                  <CheckCircle2
                    size={14}
                  />
                }
                label="Status"
              >
                {
                  selectedAnnouncement.status
                }
              </DetailItem>

              <DetailItem
                icon={
                  <UserRound size={14} />
                }
                label="Published By"
              >
                {
                  selectedAnnouncement.createdBy
                }
              </DetailItem>

              <DetailItem
                icon={
                  <FileText size={14} />
                }
                label="Announcement ID"
              >
                {
                  selectedAnnouncement.id
                }
              </DetailItem>
            </div>

            <div className="announcement-detail-actions">
              <button
                type="button"
                className="announcement-secondary-button"
                onClick={() =>
                  setSelectedAnnouncement(
                    null
                  )
                }
              >
                Close
              </button>

              <button
                type="button"
                className="announcement-primary-button"
                onClick={() => {
                  openEditAnnouncement(
                    selectedAnnouncement
                  );
                  setSelectedAnnouncement(
                    null
                  );
                }}
              >
                <Pencil size={14} />
                Edit Announcement
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deletingAnnouncement && (
        <Modal
          onClose={() => {
            if (!deleting) {
              setDeletingAnnouncement(
                null
              );
            }
          }}
          maxWidth="470px"
        >
          <div className="announcement-delete-body">
            <div className="announcement-delete-icon">
              <Trash2 size={22} />
            </div>

            <h3>
              Delete Announcement?
            </h3>

            <p>
              This action will permanently
              remove the announcement from
              the database. This cannot be
              undone.
            </p>

            <div className="announcement-delete-name">
              {
                deletingAnnouncement.title
              }
            </div>

            <div className="announcement-delete-actions">
              <button
                type="button"
                className="announcement-secondary-button"
                onClick={() =>
                  setDeletingAnnouncement(
                    null
                  )
                }
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="announcement-danger-button"
                onClick={
                  handleDeleteAnnouncement
                }
                disabled={deleting}
              >
                {deleting ? (
                  <RefreshCw
                    size={14}
                    className="announcement-spin"
                  />
                ) : (
                  <Trash2 size={14} />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete Announcement"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}