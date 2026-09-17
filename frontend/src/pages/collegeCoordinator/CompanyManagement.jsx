import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  BriefcaseBusiness,
  Search,
  Plus,
  MoreHorizontal,
  ChevronRight,
  Eye,
  Pencil,
  Check,
  X,
  Download,
  MapPin,
  UserRound,
  Mail,
  Phone,
  Users,
  Loader2,
  RefreshCw,
  Code2,
  Briefcase,
  Landmark,
  HeartPulse,
  Factory,
  Building,
} from "lucide-react";

import { collegeCoordinatorService } from "../../services/collegeCoordinatorService";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

const industryOptions = [
  "All Industries",
  "Information Technology",
  "Consulting",
  "Consulting & Technology",
  "Conglomerate",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Other",
];

const statusOptions = [
  "All Status",
  "Approved",
  "Pending",
  "Rejected",
];

const emptyCompany = {
  companyName: "",
  industry: "Information Technology",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  website: "",
  description: "",
  contactPerson: "",
  email: "",
  phone: "",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStatus(company) {
  if (company.status) {
    return company.status;
  }

  return company.isVerified
    ? "Approved"
    : "Pending";
}

function normalizeCompany(company) {
  return {
    ...company,
    name:
      company.companyName ||
      company.name ||
      "Unnamed Company",

    industry:
      company.industry ||
      "Other",

    location:
      [company.city, company.state]
        .filter(Boolean)
        .join(", ") ||
      company.location ||
      "Not provided",

    contactPerson:
      company.contactPerson ||
      "Not provided",

    email:
      company.email ||
      "Not provided",

    phone:
      company.phone ||
      "Not provided",

    opportunities: Number(
      company.opportunities || 0
    ),

    students: Number(
      company.students || 0
    ),

    status: getStatus(company),
  };
}

function getIndustryIcon(industry) {
  const value = String(
    industry || ""
  ).toLowerCase();

  if (
    value.includes("information") ||
    value.includes("technology") ||
    value.includes("software") ||
    value.includes("it")
  ) {
    return Code2;
  }

  if (
    value.includes("consult")
  ) {
    return Briefcase;
  }

  if (
    value.includes("finance") ||
    value.includes("bank") ||
    value.includes("insurance")
  ) {
    return Landmark;
  }

  if (
    value.includes("health") ||
    value.includes("medical") ||
    value.includes("hospital") ||
    value.includes("pharma")
  ) {
    return HeartPulse;
  }

  if (
    value.includes("manufactur") ||
    value.includes("engineering") ||
    value.includes("automotive") ||
    value.includes("production")
  ) {
    return Factory;
  }

  if (
    value.includes("conglomerate") ||
    value.includes("corporate")
  ) {
    return Building;
  }

  return BriefcaseBusiness;
}

function getStatusColors(status, colors) {
  const map = {
    Approved: {
      background:
        colors.successSoft,
      color: colors.success,
    },

    Pending: {
      background:
        colors.warningSoft,
      color: colors.warning,
    },

    Rejected: {
      background:
        colors.dangerSoft,
      color: colors.danger,
    },
  };

  return (
    map[status] || {
      background:
        colors.surfaceMuted,
      color:
        colors.textSecondary,
    }
  );
}

function StatusBadge({ status, colors }) {
  const current =
    getStatusColors(
      status,
      colors
    );

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor:
          current.background,
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

function CompanyIcon({
  company,
  colors,
  large = false,
}) {
  const Icon = getIndustryIcon(
    company?.industry
  );

  return (
    <div
      style={{
        width: large ? "52px" : "42px",
        height: large ? "52px" : "42px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: large
          ? "13px"
          : "10px",
        backgroundColor:
          colors.primarySoft,
        color: colors.primary,
      }}
    >
      <Icon
        size={large ? 23 : 19}
      />
    </div>
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
        if (
          event.target ===
          event.currentTarget
        ) {
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
        backgroundColor:
          "rgba(2, 6, 23, 0.68)",
        backdropFilter:
          "blur(3px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          backgroundColor:
            colors.surface,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          boxShadow:
            "0 20px 50px rgba(0,0,0,.30)",
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
        justifyContent:
          "space-between",
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
            color:
              colors.textSecondary,
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
          justifyContent:
            "center",
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          backgroundColor:
            colors.surfaceMuted,
          color:
            colors.textSecondary,
          cursor: "pointer",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default function CompanyManagement() {
  const { colors } =
    useCoordinatorTheme();

  const [companies, setCompanies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedIndustry, setSelectedIndustry] =
    useState("All Industries");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [
    actionCompanyId,
    setActionCompanyId,
  ] = useState(null);

  const [
    viewCompany,
    setViewCompany,
  ] = useState(null);

  const [
    editingCompany,
    setEditingCompany,
  ] = useState(null);

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState(emptyCompany);

  const companiesPerPage = 5;

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await collegeCoordinatorService.getCompanies();

      const list =
        response?.companies || [];

      setCompanies(
        list.map(normalizeCompany)
      );
    } catch (err) {
      console.error(
        "Load Companies Error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load companies from the database."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const filteredCompanies =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return companies.filter(
        (company) => {
          const matchesSearch =
            !search ||
            company.name
              .toLowerCase()
              .includes(search) ||
            company.industry
              .toLowerCase()
              .includes(search) ||
            company.location
              .toLowerCase()
              .includes(search) ||
            company.contactPerson
              .toLowerCase()
              .includes(search) ||
            company.email
              .toLowerCase()
              .includes(search);

          const matchesIndustry =
            selectedIndustry ===
              "All Industries" ||
            company.industry ===
              selectedIndustry;

          const matchesStatus =
            selectedStatus ===
              "All Status" ||
            company.status ===
              selectedStatus;

          return (
            matchesSearch &&
            matchesIndustry &&
            matchesStatus
          );
        }
      );
    }, [
      companies,
      searchTerm,
      selectedIndustry,
      selectedStatus,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCompanies.length /
        companiesPerPage
    )
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const startIndex =
    (safeCurrentPage - 1) *
    companiesPerPage;

  const paginatedCompanies =
    filteredCompanies.slice(
      startIndex,
      startIndex +
        companiesPerPage
    );

  const approvedCompanies =
    companies.filter(
      (company) =>
        company.status ===
        "Approved"
    ).length;

  const pendingCompanies =
    companies.filter(
      (company) =>
        company.status ===
        "Pending"
    ).length;

  const totalOpportunities =
    companies.reduce(
      (total, company) =>
        total +
        Number(
          company.opportunities ||
            0
        ),
      0
    );

  const resetPage = () =>
    setCurrentPage(1);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedIndustry(
      "All Industries"
    );
    setSelectedStatus(
      "All Status"
    );
    resetPage();
  };

  const closeForm = () => {
    setShowAddModal(false);
    setEditingCompany(null);
    setFormData(emptyCompany);
  };

  const openAddModal = () => {
    setFormData(emptyCompany);
    setShowAddModal(true);
    setError("");
  };

  const openEditModal = (
    company
  ) => {
    setEditingCompany(company);

    setFormData({
      companyName:
        company.name || "",
      industry:
        company.industry ||
        "Other",
      street:
        company.street || "",
      city:
        company.city || "",
      state:
        company.state || "",
      zipCode:
        company.zipCode || "",
      website:
        company.website || "",
      description:
        company.description ||
        "",
      contactPerson:
        company.contactPerson ===
        "Not provided"
          ? ""
          : company.contactPerson,
      email:
        company.email ===
        "Not provided"
          ? ""
          : company.email,
      phone:
        company.phone ===
        "Not provided"
          ? ""
          : company.phone,
    });

    setActionCompanyId(null);
    setError("");
  };

  const handleFormChange = (
    field,
    value
  ) => {
    setFormData(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  };

  const handleAddCompany =
    async (event) => {
      event.preventDefault();

      try {
        setSaving(true);
        setError("");

        await collegeCoordinatorService.addCompany(
          formData
        );

        closeForm();
        await loadCompanies();
      } catch (err) {
        console.error(
          "Add Company Error:",
          err
        );

        setError(
          err?.message ||
            "Failed to add company."
        );
      } finally {
        setSaving(false);
      }
    };

  const handleEditCompany =
    async (event) => {
      event.preventDefault();

      if (
        !editingCompany?._id
      ) {
        return;
      }

      try {
        setSaving(true);
        setError("");

        await collegeCoordinatorService.updateCompany(
          editingCompany._id,
          formData
        );

        closeForm();
        await loadCompanies();
      } catch (err) {
        console.error(
          "Update Company Error:",
          err
        );

        setError(
          err?.message ||
            "Failed to update company."
        );
      } finally {
        setSaving(false);
      }
    };

  const handleApprove = async (
    companyId
  ) => {
    try {
      setSaving(true);
      setError("");

      await collegeCoordinatorService.approveCompany(
        companyId
      );

      setActionCompanyId(null);
      await loadCompanies();
    } catch (err) {
      console.error(
        "Approve Company Error:",
        err
      );

      setError(
        err?.message ||
          "Failed to approve company."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async (
    companyId
  ) => {
    try {
      setSaving(true);
      setError("");

      await collegeCoordinatorService.rejectCompany(
        companyId
      );

      setActionCompanyId(null);
      await loadCompanies();
    } catch (err) {
      console.error(
        "Reject Company Error:",
        err
      );

      setError(
        err?.message ||
          "Failed to reject company."
      );
    } finally {
      setSaving(false);
    }
  };

  const exportCompanies = () => {
    if (
      !filteredCompanies.length
    ) {
      return;
    }

    const headers = [
      "Company",
      "Industry",
      "Location",
      "Contact Person",
      "Email",
      "Phone",
      "OJT Opportunities",
      "Students",
      "Status",
    ];

    const escapeCsv = (
      value
    ) =>
      `"${String(
        value ?? ""
      ).replace(/"/g, '""')}"`;

    const rows =
      filteredCompanies.map(
        (company) =>
          [
            company.name,
            company.industry,
            company.location,
            company.contactPerson,
            company.email,
            company.phone,
            company.opportunities,
            company.students,
            company.status,
          ]
            .map(escapeCsv)
            .join(",")
      );

    const blob = new Blob(
      [
        [
          headers
            .map(escapeCsv)
            .join(","),
          ...rows,
        ].join("\n"),
      ],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;
    link.download = `companies-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(url);
  };

  const statistics = [
    {
      title: "Total Companies",
      value: companies.length,
      subtitle:
        "Registered companies",
      icon: Building2,
      background:
        colors.primarySoft,
      color: colors.primary,
    },
    {
      title: "Approved",
      value: approvedCompanies,
      subtitle:
        "Approved companies",
      icon: CheckCircle2,
      background:
        colors.successSoft,
      color: colors.success,
    },
    {
      title: "Pending Approval",
      value: pendingCompanies,
      subtitle:
        "Awaiting review",
      icon: Clock3,
      background:
        colors.warningSoft,
      color: colors.warning,
    },
    {
      title: "OJT Opportunities",
      value: totalOpportunities,
      subtitle:
        "Available opportunities",
      icon: BriefcaseBusiness,
      background:
        colors.infoSoft,
      color: colors.info,
    },
  ];

  const cardStyle = {
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    backgroundColor:
      colors.surface,
    boxShadow:
      "0 1px 2px rgba(15,23,42,.04)",
  };

  const inputStyle = {
    width: "100%",
    minHeight: "40px",
    boxSizing: "border-box",
    padding: "0 11px",
    border: `1px solid ${colors.border}`,
    borderRadius: "9px",
    outline: "none",
    backgroundColor:
      colors.surface,
    color: colors.text,
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
    backgroundColor:
      colors.surface,
    color:
      colors.textSecondary,
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
    backgroundColor:
      colors.primary,
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 700,
  };

  const renderCompanyForm = (
    submitHandler,
    submitLabel
  ) => (
    <form
      onSubmit={submitHandler}
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "14px",
        }}
        className="company-form-grid"
      >
        {[
          [
            "companyName",
            "Company Name",
            "Enter company name",
            "text",
          ],
          [
            "contactPerson",
            "Contact Person",
            "Contact person name",
            "text",
          ],
          [
            "email",
            "Email",
            "company@example.com",
            "email",
          ],
          [
            "phone",
            "Phone",
            "+91 XXXXX XXXXX",
            "text",
          ],
          [
            "street",
            "Street",
            "Street address",
            "text",
          ],
          [
            "city",
            "City",
            "Mumbai / Pune",
            "text",
          ],
          [
            "state",
            "State",
            "Maharashtra",
            "text",
          ],
          [
            "zipCode",
            "ZIP Code",
            "400001",
            "text",
          ],
          [
            "website",
            "Website",
            "https://example.com",
            "url",
          ],
        ].map(
          ([
            field,
            label,
            placeholder,
            type,
          ]) => (
            <div key={field}>
              <label
                style={{
                  display:
                    "block",
                  marginBottom:
                    "6px",
                  color:
                    colors.textSecondary,
                  fontSize:
                    "13px",
                  fontWeight:
                    600,
                }}
              >
                {label}
              </label>

              <input
                required={[
                  "companyName",
                  "city",
                ].includes(field)}
                type={type}
                value={
                  formData[field]
                }
                onChange={(
                  event
                ) =>
                  handleFormChange(
                    field,
                    event.target
                      .value
                  )
                }
                placeholder={
                  placeholder
                }
                style={
                  inputStyle
                }
              />
            </div>
          )
        )}

        <div>
          <label
            style={{
              display:
                "block",
              marginBottom:
                "6px",
              color:
                colors.textSecondary,
              fontSize:
                "13px",
              fontWeight:
                600,
            }}
          >
            Industry
          </label>

          <select
            value={
              formData.industry
            }
            onChange={(
              event
            ) =>
              handleFormChange(
                "industry",
                event.target
                  .value
              )
            }
            style={
              inputStyle
            }
          >
            {industryOptions
              .filter(
                (item) =>
                  item !==
                  "All Industries"
              )
              .map(
                (industry) => (
                  <option
                    key={
                      industry
                    }
                    value={
                      industry
                    }
                  >
                    {industry}
                  </option>
                )
              )}
          </select>
        </div>

        <div
          style={{
            gridColumn:
              "1 / -1",
          }}
        >
          <label
            style={{
              display:
                "block",
              marginBottom:
                "6px",
              color:
                colors.textSecondary,
              fontSize:
                "13px",
              fontWeight:
                600,
            }}
          >
            Description
          </label>

          <textarea
            value={
              formData.description
            }
            onChange={(
              event
            ) =>
              handleFormChange(
                "description",
                event.target
                  .value
              )
            }
            placeholder="Short company description"
            style={{
              ...inputStyle,
              minHeight:
                "90px",
              padding:
                "10px 11px",
              resize:
                "vertical",
            }}
          />
        </div>
      </div>

      {error && (
        <div
          style={{
            marginTop: "16px",
            padding:
              "10px 12px",
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
          display:
            "flex",
          justifyContent:
            "flex-end",
          gap: "8px",
          marginTop:
            "20px",
          paddingTop:
            "15px",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <button
          type="button"
          onClick={closeForm}
          disabled={saving}
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
          {saving && (
            <Loader2
              size={14}
              style={{
                animation:
                  "companySpin 1s linear infinite",
              }}
            />
          )}

          {saving
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        minWidth: 0,
        backgroundColor:
          colors.workspace,
        color: colors.text,
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: "7px",
          marginBottom:
            "12px",
          fontSize:
            "13px",
        }}
      >
        <span
          style={{
            color:
              colors.primary,
            fontWeight:
              600,
          }}
        >
          College Coordinator
        </span>

        <ChevronRight
          size={14}
          color={
            colors.textMuted
          }
        />

        <span
          style={{
            color:
              colors.textSecondary,
          }}
        >
          Company Management
        </span>
      </div>

      {/* Header */}
      <section
        style={{
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "space-between",
          gap: "20px",
          marginBottom:
            "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color:
                colors.text,
              fontSize:
                "clamp(26px, 3vw, 28px)",
              lineHeight:
                "1.2",
              fontWeight:
                700,
              letterSpacing:
                "-0.02em",
            }}
          >
            Company Management
          </h1>

          <p
            style={{
              margin:
                "7px 0 0",
              color:
                colors.textSecondary,
              fontSize:
                "14px",
            }}
          >
            Manage OJT companies and
            their verification status.
          </p>
        </div>

        <div
          style={{
            display:
              "flex",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={
              loadCompanies
            }
            disabled={
              loading ||
              saving
            }
            style={{
              ...secondaryButtonStyle,
              opacity:
                loading ||
                saving
                  ? 0.6
                  : 1,
            }}
          >
            <RefreshCw
              size={15}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={
              openAddModal
            }
            style={
              primaryButtonStyle
            }
          >
            <Plus
              size={16}
            />
            Add Company
          </button>
        </div>
      </section>

      {error &&
        !showAddModal &&
        !editingCompany && (
          <div
            style={{
              marginBottom:
                "16px",
              padding:
                "11px 13px",
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

      {/* Statistics */}
      <section
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(4,minmax(0,1fr))",
          gap: "14px",
          marginBottom:
            "18px",
        }}
        className="company-management-stats"
      >
        {statistics.map(
          (stat) => {
            const Icon =
              stat.icon;

            return (
              <div
                key={
                  stat.title
                }
                style={{
                  ...cardStyle,
                  padding:
                    "18px",
                }}
              >
                <div
                  style={{
                    width:
                      "42px",
                    height:
                      "42px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    borderRadius:
                      "11px",
                    backgroundColor:
                      stat.background,
                    color:
                      stat.color,
                  }}
                >
                  <Icon
                    size={20}
                  />
                </div>

                <div
                  style={{
                    marginTop:
                      "11px",
                    color:
                      colors.textSecondary,
                    fontSize:
                      "13px",
                    fontWeight:
                      600,
                  }}
                >
                  {
                    stat.title
                  }
                </div>

                <div
                  style={{
                    marginTop:
                      "3px",
                    color:
                      colors.text,
                    fontSize:
                      "26px",
                    lineHeight:
                      "31px",
                    fontWeight:
                      700,
                  }}
                >
                  {
                    stat.value
                  }
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
                  {
                    stat.subtitle
                  }
                </div>
              </div>
            );
          }
        )}
      </section>

      {/* Company Directory */}
      <section
        style={{
          ...cardStyle,
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            padding:
              "18px",
            borderBottom: `1px solid ${colors.border}`,
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
                    colors.text,
                  fontSize:
                    "17px",
                  fontWeight:
                    700,
                }}
              >
                Company Directory
              </h2>

              <p
                style={{
                  margin:
                    "4px 0 0",
                  color:
                    colors.textSecondary,
                  fontSize:
                    "13px",
                }}
              >
                View and manage
                registered OJT
                companies.
              </p>
            </div>

            <button
              type="button"
              onClick={
                exportCompanies
              }
              disabled={
                !filteredCompanies.length
              }
              style={{
                ...secondaryButtonStyle,
                opacity:
                  !filteredCompanies.length
                    ? 0.45
                    : 1,
              }}
            >
              <Download
                size={15}
              />
              Export
            </button>
          </div>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "minmax(260px,1fr) 190px 150px",
              gap: "10px",
              marginTop:
                "16px",
            }}
            className="company-management-filters"
          >
            <div
              style={{
                position:
                  "relative",
              }}
            >
              <Search
                size={17}
                color={
                  colors.textMuted
                }
                style={{
                  position:
                    "absolute",
                  left:
                    "12px",
                  top:
                    "50%",
                  transform:
                    "translateY(-50%)",
                  pointerEvents:
                    "none",
                }}
              />

              <input
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
                  resetPage();
                }}
                placeholder="Search company, industry, location or contact..."
                style={{
                  ...inputStyle,
                  paddingLeft:
                    "38px",
                }}
              />
            </div>

            <select
              value={
                selectedIndustry
              }
              onChange={(
                event
              ) => {
                setSelectedIndustry(
                  event
                    .target
                    .value
                );
                resetPage();
              }}
              style={
                inputStyle
              }
            >
              {industryOptions.map(
                (industry) => (
                  <option
                    key={
                      industry
                    }
                    value={
                      industry
                    }
                  >
                    {industry}
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
                resetPage();
              }}
              style={
                inputStyle
              }
            >
              {statusOptions.map(
                (status) => (
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
          </div>
        </div>

        <div
          style={{
            padding:
              "10px 18px",
            backgroundColor:
              colors.surfaceMuted,
            borderBottom: `1px solid ${colors.border}`,
            color:
              colors.textSecondary,
            fontSize:
              "12px",
          }}
        >
          Showing{" "}
          <strong
            style={{
              color:
                colors.text,
            }}
          >
            {filteredCompanies.length
              ? startIndex + 1
              : 0}
            -
            {Math.min(
              startIndex +
                companiesPerPage,
              filteredCompanies.length
            )}
          </strong>{" "}
          of{" "}
          <strong
            style={{
              color:
                colors.text,
            }}
          >
            {
              filteredCompanies.length
            }
          </strong>{" "}
          companies

          {(searchTerm ||
            selectedIndustry !==
              "All Industries" ||
            selectedStatus !==
              "All Status") && (
            <button
              type="button"
              onClick={
                clearFilters
              }
              style={{
                marginLeft:
                  "12px",
                border:
                  "none",
                background:
                  "transparent",
                color:
                  colors.primary,
                fontSize:
                  "12px",
                fontWeight:
                  700,
                cursor:
                  "pointer",
              }}
            >
              Clear filters
            </button>
          )}
        </div>

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
                "950px",
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
                  "Company",
                  "Industry",
                  "Location",
                  "Contact Person",
                  "Opportunities",
                  "Status",
                  "Action",
                ].map(
                  (heading) => (
                    <th
                      key={
                        heading
                      }
                      style={{
                        padding:
                          "12px 14px",
                        backgroundColor:
                          colors.surfaceMuted,
                        borderBottom: `1px solid ${colors.border}`,
                        color:
                          colors.textSecondary,
                        fontSize:
                          "12px",
                        fontWeight:
                          700,
                        textAlign:
                          "left",
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          ".03em",
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
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      padding:
                        "60px",
                      textAlign:
                        "center",
                      color:
                        colors.textSecondary,
                      fontSize:
                        "14px",
                    }}
                  >
                    <Loader2
                      size={24}
                      style={{
                        animation:
                          "companySpin 1s linear infinite",
                      }}
                    />

                    <div
                      style={{
                        marginTop:
                          "8px",
                      }}
                    >
                      Loading companies...
                    </div>
                  </td>
                </tr>
              ) : paginatedCompanies.length ? (
                paginatedCompanies.map(
                  (company) => (
                    <tr
                      key={
                        company._id
                      }
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
                          <CompanyIcon
                            company={
                              company
                            }
                            colors={
                              colors
                            }
                          />

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
                              }}
                            >
                              {
                                company.name
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
                              OJT Partner
                            </span>
                          </div>
                        </div>
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                          color:
                            colors.textSecondary,
                          fontSize:
                            "14px",
                        }}
                      >
                        {
                          company.industry
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                          color:
                            colors.textSecondary,
                          fontSize:
                            "14px",
                        }}
                      >
                        {
                          company.location
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                          color:
                            colors.textSecondary,
                          fontSize:
                            "14px",
                        }}
                      >
                        {
                          company.contactPerson
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                          color:
                            colors.text,
                          fontSize:
                            "14px",
                          fontWeight:
                            700,
                        }}
                      >
                        {
                          company.opportunities
                        }
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
                            company.status
                          }
                          colors={
                            colors
                          }
                        />
                      </td>

                      <td
                        style={{
                          position:
                            "relative",
                          padding:
                            "14px",
                          borderBottom: `1px solid ${colors.borderLight}`,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setActionCompanyId(
                              actionCompanyId ===
                                company._id
                                ? null
                                : company._id
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
                          <MoreHorizontal
                            size={
                              17
                            }
                          />
                        </button>

                        {actionCompanyId ===
                          company._id && (
                          <div
                            style={{
                              position:
                                "absolute",
                              right:
                                "13px",
                              top:
                                "53px",
                              zIndex:
                                30,
                              width:
                                "180px",
                              padding:
                                "6px",
                              border: `1px solid ${colors.border}`,
                              borderRadius:
                                "10px",
                              backgroundColor:
                                colors.surface,
                              boxShadow:
                                "0 14px 30px rgba(0,0,0,.25)",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setViewCompany(
                                  company
                                );
                                setActionCompanyId(
                                  null
                                );
                              }}
                              style={{
                                width:
                                  "100%",
                                height:
                                  "36px",
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
                                  "7px",
                                background:
                                  "transparent",
                                color:
                                  colors.textSecondary,
                                cursor:
                                  "pointer",
                                fontSize:
                                  "13px",
                                textAlign:
                                  "left",
                              }}
                            >
                              <Eye
                                size={
                                  14
                                }
                              />
                              View Company
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  company
                                )
                              }
                              style={{
                                width:
                                  "100%",
                                height:
                                  "36px",
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
                                  "7px",
                                background:
                                  "transparent",
                                color:
                                  colors.textSecondary,
                                cursor:
                                  "pointer",
                                fontSize:
                                  "13px",
                                textAlign:
                                  "left",
                              }}
                            >
                              <Pencil
                                size={
                                  14
                                }
                              />
                              Edit Company
                            </button>

                            {company.status !==
                              "Approved" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleApprove(
                                    company._id
                                  )
                                }
                                style={{
                                  width:
                                    "100%",
                                  height:
                                    "36px",
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
                                    "7px",
                                  background:
                                    "transparent",
                                  color:
                                    colors.success,
                                  cursor:
                                    "pointer",
                                  fontSize:
                                    "13px",
                                  textAlign:
                                    "left",
                                }}
                              >
                                <Check
                                  size={
                                    14
                                  }
                                />
                                Approve Company
                              </button>
                            )}

                            {company.status !==
                              "Rejected" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleReject(
                                    company._id
                                  )
                                }
                                style={{
                                  width:
                                    "100%",
                                  height:
                                    "36px",
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
                                    "7px",
                                  background:
                                    "transparent",
                                  color:
                                    colors.danger,
                                  cursor:
                                    "pointer",
                                  fontSize:
                                    "13px",
                                  textAlign:
                                    "left",
                                }}
                              >
                                <X
                                  size={
                                    14
                                  }
                                />
                                Reject Company
                              </button>
                            )}
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
                        "60px 20px",
                      textAlign:
                        "center",
                      color:
                        colors.textSecondary,
                      fontSize:
                        "14px",
                    }}
                  >
                    <Search
                      size={30}
                      color={
                        colors.textMuted
                      }
                    />

                    <div
                      style={{
                        marginTop:
                          "8px",
                      }}
                    >
                      No companies found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
            gap: "12px",
            padding:
              "10px 18px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <span
            style={{
              color:
                colors.textSecondary,
              fontSize:
                "13px",
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
                ...secondaryButtonStyle,
                minHeight:
                  "34px",
                width:
                  "34px",
                padding: 0,
                fontSize:
                  "18px",
                opacity:
                  safeCurrentPage ===
                  1
                    ? 0.45
                    : 1,
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
            ).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                  style={{
                    width:
                      "34px",
                    height:
                      "34px",
                    border: `1px solid ${
                      safeCurrentPage ===
                      page
                        ? colors.primary
                        : colors.border
                    }`,
                    borderRadius:
                      "8px",
                    backgroundColor:
                      safeCurrentPage ===
                      page
                        ? colors.primary
                        : colors.surface,
                    color:
                      safeCurrentPage ===
                      page
                        ? "#ffffff"
                        : colors.textSecondary,
                    cursor:
                      "pointer",
                    fontSize:
                      "13px",
                    fontWeight:
                      600,
                  }}
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
              style={{
                ...secondaryButtonStyle,
                minHeight:
                  "34px",
                width:
                  "34px",
                padding: 0,
                fontSize:
                  "18px",
                opacity:
                  safeCurrentPage ===
                  totalPages
                    ? 0.45
                    : 1,
              }}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Company Details */}
      {viewCompany && (
        <Modal
          onClose={() =>
            setViewCompany(
              null
            )
          }
          width="620px"
          colors={colors}
        >
          <ModalHeader
            title="Company Details"
            subtitle="Complete company information"
            onClose={() =>
              setViewCompany(
                null
              )
            }
            colors={colors}
          />

          <div
            style={{
              padding:
                "20px",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "13px",
                padding:
                  "14px",
                borderRadius:
                  "11px",
                backgroundColor:
                  colors.surfaceMuted,
                border: `1px solid ${colors.border}`,
              }}
            >
              <CompanyIcon
                company={
                  viewCompany
                }
                colors={
                  colors
                }
                large
              />

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color:
                      colors.text,
                    fontSize:
                      "17px",
                    fontWeight:
                      700,
                  }}
                >
                  {
                    viewCompany.name
                  }
                </h3>

                <div
                  style={{
                    marginTop:
                      "5px",
                    color:
                      colors.textSecondary,
                    fontSize:
                      "13px",
                  }}
                >
                  {
                    viewCompany.industry
                  }
                </div>
              </div>

              <StatusBadge
                status={
                  viewCompany.status
                }
                colors={
                  colors
                }
              />
            </div>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
                marginTop:
                  "15px",
              }}
              className="company-details-grid"
            >
              {[
                [
                  MapPin,
                  "Location",
                  viewCompany.location,
                ],
                [
                  UserRound,
                  "Contact Person",
                  viewCompany.contactPerson,
                ],
                [
                  Mail,
                  "Email",
                  viewCompany.email,
                ],
                [
                  Phone,
                  "Phone",
                  viewCompany.phone,
                ],
                [
                  BriefcaseBusiness,
                  "OJT Opportunities",
                  viewCompany.opportunities,
                ],
                [
                  Users,
                  "Students",
                  viewCompany.students,
                ],
              ].map(
                ([
                  Icon,
                  label,
                  value,
                ]) => (
                  <div
                    key={
                      label
                    }
                    style={{
                      padding:
                        "12px",
                      border: `1px solid ${colors.border}`,
                      borderRadius:
                        "10px",
                      backgroundColor:
                        colors.surface,
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
                          colors.textMuted,
                        fontSize:
                          "12px",
                        fontWeight:
                          600,
                      }}
                    >
                      <Icon
                        size={
                          14
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
                          colors.text,
                        fontSize:
                          "14px",
                        wordBreak:
                          "break-word",
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

            {viewCompany.description && (
              <div
                style={{
                  marginTop:
                    "10px",
                  padding:
                    "13px",
                  border: `1px solid ${colors.border}`,
                  borderRadius:
                    "10px",
                }}
              >
                <div
                  style={{
                    color:
                      colors.textMuted,
                    fontSize:
                      "12px",
                    fontWeight:
                      700,
                  }}
                >
                  DESCRIPTION
                </div>

                <div
                  style={{
                    marginTop:
                      "6px",
                    color:
                      colors.textSecondary,
                    fontSize:
                      "13px",
                    lineHeight:
                      1.6,
                  }}
                >
                  {
                    viewCompany.description
                  }
                </div>
              </div>
            )}

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap: "8px",
                marginTop:
                  "18px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setViewCompany(
                    null
                  );
                  openEditModal(
                    viewCompany
                  );
                }}
                style={{
                  ...secondaryButtonStyle,
                  color:
                    colors.primary,
                }}
              >
                <Pencil
                  size={14}
                />
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewCompany(
                    null
                  )
                }
                style={
                  primaryButtonStyle
                }
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Company */}
      {showAddModal && (
        <Modal
          onClose={
            closeForm
          }
          width="680px"
          colors={colors}
        >
          <ModalHeader
            title="Add Company"
            subtitle="Register a new OJT company"
            onClose={
              closeForm
            }
            colors={colors}
          />

          {renderCompanyForm(
            handleAddCompany,
            "Add Company"
          )}
        </Modal>
      )}

      {/* Edit Company */}
      {editingCompany && (
        <Modal
          onClose={
            closeForm
          }
          width="680px"
          colors={colors}
        >
          <ModalHeader
            title="Edit Company"
            subtitle="Update company information"
            onClose={
              closeForm
            }
            colors={colors}
          />

          {renderCompanyForm(
            handleEditCompany,
            "Save Changes"
          )}
        </Modal>
      )}

      <style>{`
        @keyframes companySpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1050px) {
          .company-management-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .company-management-filters {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .company-management-stats,
          .company-management-filters,
          .company-form-grid,
          .company-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}