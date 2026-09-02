import { useMemo, useState } from "react";

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
} from "lucide-react";

const initialCompanies = [
  {
    id: 1,
    name: "TCS",
    industry: "Information Technology",
    location: "Mumbai",
    contactPerson: "Rahul Mehta",
    email: "rahul.mehta@tcs.com",
    phone: "+91 98765 43210",
    opportunities: 8,
    students: 18,
    status: "Approved",
  },
  {
    id: 2,
    name: "Infosys",
    industry: "Information Technology",
    location: "Pune",
    contactPerson: "Priya Shah",
    email: "priya.shah@infosys.com",
    phone: "+91 98765 43111",
    opportunities: 6,
    students: 14,
    status: "Approved",
  },
  {
    id: 3,
    name: "Wipro",
    industry: "Information Technology",
    location: "Pune",
    contactPerson: "Amit Joshi",
    email: "amit.joshi@wipro.com",
    phone: "+91 98765 43222",
    opportunities: 5,
    students: 10,
    status: "Pending",
  },
  {
    id: 4,
    name: "Accenture",
    industry: "Consulting & Technology",
    location: "Mumbai",
    contactPerson: "Neha Patel",
    email: "neha.patel@accenture.com",
    phone: "+91 98765 43333",
    opportunities: 7,
    students: 16,
    status: "Approved",
  },
  {
    id: 5,
    name: "Capgemini",
    industry: "Information Technology",
    location: "Pune",
    contactPerson: "Sahil Verma",
    email: "sahil.verma@capgemini.com",
    phone: "+91 98765 43444",
    opportunities: 4,
    students: 9,
    status: "Approved",
  },
  {
    id: 6,
    name: "Tech Mahindra",
    industry: "Information Technology",
    location: "Mumbai",
    contactPerson: "Karan Singh",
    email: "karan.singh@techmahindra.com",
    phone: "+91 98765 43555",
    opportunities: 3,
    students: 7,
    status: "Pending",
  },
  {
    id: 7,
    name: "Deloitte",
    industry: "Consulting",
    location: "Mumbai",
    contactPerson: "Anjali Desai",
    email: "anjali.desai@deloitte.com",
    phone: "+91 98765 43666",
    opportunities: 5,
    students: 12,
    status: "Approved",
  },
  {
    id: 8,
    name: "Reliance Industries",
    industry: "Conglomerate",
    location: "Mumbai",
    contactPerson: "Vivek Kapoor",
    email: "vivek.kapoor@ril.com",
    phone: "+91 98765 43777",
    opportunities: 4,
    students: 11,
    status: "Approved",
  },
  {
    id: 9,
    name: "HCLTech",
    industry: "Information Technology",
    location: "Pune",
    contactPerson: "Rohan Kulkarni",
    email: "rohan.kulkarni@hcltech.com",
    phone: "+91 98765 43888",
    opportunities: 6,
    students: 13,
    status: "Approved",
  },
  {
    id: 10,
    name: "IBM",
    industry: "Information Technology",
    location: "Mumbai",
    contactPerson: "Sneha Rao",
    email: "sneha.rao@ibm.com",
    phone: "+91 98765 43999",
    opportunities: 5,
    students: 10,
    status: "Pending",
  },
  {
    id: 11,
    name: "KPMG",
    industry: "Consulting",
    location: "Mumbai",
    contactPerson: "Aditya Shah",
    email: "aditya.shah@kpmg.com",
    phone: "+91 98765 43001",
    opportunities: 3,
    students: 6,
    status: "Approved",
  },
  {
    id: 12,
    name: "Cognizant",
    industry: "Information Technology",
    location: "Pune",
    contactPerson: "Meera Nair",
    email: "meera.nair@cognizant.com",
    phone: "+91 98765 43002",
    opportunities: 7,
    students: 15,
    status: "Approved",
  },
];

const industryOptions = [
  "All Industries",
  "Information Technology",
  "Consulting",
  "Consulting & Technology",
  "Conglomerate",
];

const statusOptions = [
  "All Status",
  "Approved",
  "Pending",
  "Rejected",
];

const emptyCompany = {
  name: "",
  industry: "Information Technology",
  location: "",
  contactPerson: "",
  email: "",
  phone: "",
  opportunities: 1,
  students: 0,
  status: "Pending",
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

function StatusBadge({ status }) {
  const styles = {
    Approved: {
      background: "#ecfdf5",
      color: "#059669",
    },
    Pending: {
      background: "#fff7ed",
      color: "#d97706",
    },
    Rejected: {
      background: "#fef2f2",
      color: "#dc2626",
    },
  };

  const current = styles[status] || styles.Pending;

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

function Modal({ children, onClose, width = "520px" }) {
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

function ModalHeader({ title, subtitle, onClose }) {
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

        {subtitle && (
          <p
            style={{
              margin: "5px 0 0",
              color: "#94a3b8",
              fontSize: "11px",
              lineHeight: "1.5",
            }}
          >
            {subtitle}
          </p>
        )}
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

export default function CompanyManagement() {
  const [companies, setCompanies] =
    useState(initialCompanies);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedIndustry, setSelectedIndustry] =
    useState("All Industries");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [actionCompanyId, setActionCompanyId] =
    useState(null);

  const [viewCompany, setViewCompany] =
    useState(null);

  const [editingCompany, setEditingCompany] =
    useState(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [formData, setFormData] =
    useState(emptyCompany);

  const companiesPerPage = 5;

  const filteredCompanies = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return companies.filter((company) => {
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
        selectedIndustry === "All Industries" ||
        company.industry === selectedIndustry;

      const matchesStatus =
        selectedStatus === "All Status" ||
        company.status === selectedStatus;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesStatus
      );
    });
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

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    companiesPerPage;

  const paginatedCompanies =
    filteredCompanies.slice(
      startIndex,
      startIndex + companiesPerPage
    );

  const approvedCompanies =
    companies.filter(
      (company) =>
        company.status === "Approved"
    ).length;

  const pendingCompanies =
    companies.filter(
      (company) =>
        company.status === "Pending"
    ).length;

  const totalOpportunities =
    companies.reduce(
      (total, company) =>
        total + Number(company.opportunities || 0),
      0
    );

  const statistics = [
    {
      id: 1,
      title: "Total Companies",
      value: companies.length,
      subtitle: "Registered companies",
      icon: Building2,
      tone: "blue",
    },
    {
      id: 2,
      title: "Approved",
      value: approvedCompanies,
      subtitle: "Approved companies",
      icon: CheckCircle2,
      tone: "green",
    },
    {
      id: 3,
      title: "Pending Approval",
      value: pendingCompanies,
      subtitle: "Awaiting review",
      icon: Clock3,
      tone: "orange",
    },
    {
      id: 4,
      title: "OJT Opportunities",
      value: totalOpportunities,
      subtitle: "Available opportunities",
      icon: BriefcaseBusiness,
      tone: "purple",
    },
  ];

  const resetPage = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedIndustry("All Industries");
    setSelectedStatus("All Status");
    resetPage();
  };

  const handleApprove = (companyId) => {
    setCompanies((current) =>
      current.map((company) =>
        company.id === companyId
          ? {
              ...company,
              status: "Approved",
            }
          : company
      )
    );

    setActionCompanyId(null);
  };

  const handleReject = (companyId) => {
    setCompanies((current) =>
      current.map((company) =>
        company.id === companyId
          ? {
              ...company,
              status: "Rejected",
            }
          : company
      )
    );

    setActionCompanyId(null);
  };

  const openAddModal = () => {
    setFormData(emptyCompany);
    setShowAddModal(true);
  };

  const openEditModal = (company) => {
    setEditingCompany(company);
    setFormData({
      ...company,
    });
    setActionCompanyId(null);
  };

  const handleFormChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleAddCompany = (event) => {
    event.preventDefault();

    const newCompany = {
      ...formData,
      id: Date.now(),
      opportunities: Number(
        formData.opportunities || 0
      ),
      students: Number(
        formData.students || 0
      ),
    };

    setCompanies((current) => [
      newCompany,
      ...current,
    ]);

    setShowAddModal(false);
    setFormData(emptyCompany);
    resetPage();
  };

  const handleEditCompany = (event) => {
    event.preventDefault();

    setCompanies((current) =>
      current.map((company) =>
        company.id === editingCompany.id
          ? {
              ...formData,
              id: editingCompany.id,
              opportunities: Number(
                formData.opportunities || 0
              ),
              students: Number(
                formData.students || 0
              ),
            }
          : company
      )
    );

    setEditingCompany(null);
    setFormData(emptyCompany);
  };

  const exportCompanies = () => {
    if (!filteredCompanies.length) {
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

    const escapeCsv = (value) => {
      const text = String(value ?? "");

      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredCompanies.map(
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

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows,
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = `companies-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
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
        className="company-form-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "13px",
        }}
      >
        <div>
          <label className="company-form-label">
            Company Name
          </label>

          <input
            required
            value={formData.name}
            onChange={(event) =>
              handleFormChange(
                "name",
                event.target.value
              )
            }
            className="company-form-input"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="company-form-label">
            Industry
          </label>

          <select
            value={formData.industry}
            onChange={(event) =>
              handleFormChange(
                "industry",
                event.target.value
              )
            }
            className="company-form-input"
          >
            {industryOptions
              .filter(
                (item) =>
                  item !==
                  "All Industries"
              )
              .map((industry) => (
                <option
                  key={industry}
                  value={industry}
                >
                  {industry}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="company-form-label">
            Location
          </label>

          <input
            required
            value={formData.location}
            onChange={(event) =>
              handleFormChange(
                "location",
                event.target.value
              )
            }
            className="company-form-input"
            placeholder="Mumbai / Pune"
          />
        </div>

        <div>
          <label className="company-form-label">
            Contact Person
          </label>

          <input
            required
            value={formData.contactPerson}
            onChange={(event) =>
              handleFormChange(
                "contactPerson",
                event.target.value
              )
            }
            className="company-form-input"
            placeholder="Contact person name"
          />
        </div>

        <div>
          <label className="company-form-label">
            Email
          </label>

          <input
            required
            type="email"
            value={formData.email}
            onChange={(event) =>
              handleFormChange(
                "email",
                event.target.value
              )
            }
            className="company-form-input"
            placeholder="company@example.com"
          />
        </div>

        <div>
          <label className="company-form-label">
            Phone
          </label>

          <input
            required
            value={formData.phone}
            onChange={(event) =>
              handleFormChange(
                "phone",
                event.target.value
              )
            }
            className="company-form-input"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div>
          <label className="company-form-label">
            OJT Opportunities
          </label>

          <input
            type="number"
            min="0"
            value={formData.opportunities}
            onChange={(event) =>
              handleFormChange(
                "opportunities",
                event.target.value
              )
            }
            className="company-form-input"
          />
        </div>

        <div>
          <label className="company-form-label">
            Students
          </label>

          <input
            type="number"
            min="0"
            value={formData.students}
            onChange={(event) =>
              handleFormChange(
                "students",
                event.target.value
              )
            }
            className="company-form-input"
          />
        </div>

        <div>
          <label className="company-form-label">
            Status
          </label>

          <select
            value={formData.status}
            onChange={(event) =>
              handleFormChange(
                "status",
                event.target.value
              )
            }
            className="company-form-input"
          >
            <option value="Pending">
              Pending
            </option>
            <option value="Approved">
              Approved
            </option>
            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "20px",
          paddingTop: "15px",
          borderTop:
            "1px solid #eef2f7",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setShowAddModal(false);
            setEditingCompany(null);
            setFormData(emptyCompany);
          }}
          style={{
            height: "38px",
            padding: "0 14px",
            border:
              "1px solid #dbe4ee",
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
          {submitLabel}
        </button>
      </div>
    </form>
  );

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
          Company Management
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
            Company Management
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#64748b",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            Manage OJT companies and
            their internship opportunities.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          style={{
            height: "42px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "0 15px",
            border: "none",
            borderRadius: "9px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow:
              "0 4px 10px rgba(37, 99, 235, 0.18)",
            whiteSpace: "nowrap",
          }}
        >
          <Plus size={17} />
          Add Company
        </button>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section
        className="company-management-stats"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        {statistics.map((stat) => {
          const toneMap = {
            blue: {
              background: "#eff6ff",
              color: "#2563eb",
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

          const tone =
            toneMap[stat.tone];

          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
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
                    tone.background,
                  color: tone.color,
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
          COMPANY LIST
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
        {/* HEADER */}
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
                All Companies
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                View and manage registered
                OJT companies
              </p>
            </div>

            <button
              type="button"
              onClick={exportCompanies}
              disabled={
                filteredCompanies.length === 0
              }
              style={{
                height: "34px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  filteredCompanies.length
                    ? "#ffffff"
                    : "#f8fafc",
                color:
                  filteredCompanies.length
                    ? "#475569"
                    : "#cbd5e1",
                fontSize: "10px",
                fontWeight: 700,
                cursor:
                  filteredCompanies.length
                    ? "pointer"
                    : "not-allowed",
              }}
            >
              <Download size={14} />
              Export
            </button>
          </div>

          {/* SEARCH + FILTERS */}
          <div
            className="company-management-filters"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(240px, 1fr) auto auto",
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
                placeholder="Search company, industry, location or contact..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(
                    event.target.value
                  );
                  resetPage();
                }}
                style={{
                  width: "100%",
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background:
                    "transparent",
                  color: "#334155",
                  fontSize: "11px",
                }}
              />
            </div>

            <select
              value={selectedIndustry}
              onChange={(event) => {
                setSelectedIndustry(
                  event.target.value
                );
                resetPage();
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {industryOptions.map(
                (industry) => (
                  <option
                    key={industry}
                    value={industry}
                  >
                    {industry}
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
                resetPage();
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {statusOptions.map(
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
          </div>
        </div>

        {/* RESULT BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "10px",
            padding:
              "10px 16px",
            backgroundColor:
              "#f8fafc",
            borderBottom:
              "1px solid #eef2f7",
          }}
        >
          <span
            style={{
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
              {filteredCompanies.length === 0
                ? 0
                : startIndex + 1}
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
                color: "#334155",
              }}
            >
              {filteredCompanies.length}
            </strong>{" "}
            companies
          </span>

          {(searchTerm ||
            selectedIndustry !==
              "All Industries" ||
            selectedStatus !==
              "All Status") && (
            <button
              type="button"
              onClick={clearFilters}
              style={{
                border: "none",
                background:
                  "transparent",
                color: "#2563eb",
                fontSize: "10px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Clear filters
            </button>
          )}
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
              minWidth: "950px",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                {[
                  "Company",
                  "Industry",
                  "Location",
                  "Contact Person",
                  "Opportunities",
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
              {paginatedCompanies.length >
              0 ? (
                paginatedCompanies.map(
                  (company) => (
                    <tr
                      key={company.id}
                      style={{
                        backgroundColor:
                          "#ffffff",
                      }}
                    >
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
                            {getInitials(
                              company.name
                            )}
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
                                company.name
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
                              OJT Partner
                            </span>
                          </div>
                        </div>
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
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
                          company.industry
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
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
                        {company.location}
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
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
                        {company.contactPerson}
                      </td>

                      <td
                        style={{
                          padding:
                            "11px 13px",
                          borderBottom:
                            "1px solid #f1f5f9",
                          color:
                            "#334155",
                          fontSize:
                            "11px",
                          fontWeight:
                            700,
                        }}
                      >
                        {company.opportunities}
                      </td>

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
                            company.status
                          }
                        />
                      </td>

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
                            setActionCompanyId(
                              actionCompanyId ===
                                company.id
                                ? null
                                : company.id
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

                        {actionCompanyId ===
                          company.id && (
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
                                "155px",
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
                                setViewCompany(
                                  company
                                );
                                setActionCompanyId(
                                  null
                                );
                              }}
                              className="company-action-button"
                            >
                              <Eye size={14} />
                              View Company
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  company
                                )
                              }
                              className="company-action-button"
                            >
                              <Pencil
                                size={14}
                              />
                              Edit Company
                            </button>

                            {company.status !==
                              "Approved" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleApprove(
                                    company.id
                                  )
                                }
                                className="company-action-button company-action-success"
                              >
                                <Check
                                  size={14}
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
                                    company.id
                                  )
                                }
                                className="company-action-button company-action-danger"
                              >
                                <X size={14} />
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
                        "50px 20px",
                      textAlign:
                        "center",
                      color:
                        "#94a3b8",
                      fontSize:
                        "11px",
                    }}
                  >
                    <Search
                      size={28}
                      color="#cbd5e1"
                      style={{
                        marginBottom:
                          "8px",
                      }}
                    />

                    <div>
                      No companies found
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
            Page {safeCurrentPage} of{" "}
            {totalPages}
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
              className="company-page-button"
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
                onClick={() =>
                  setCurrentPage(
                    page
                  )
                }
                className={`company-page-button ${
                  safeCurrentPage ===
                  page
                    ? "company-page-active"
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
              className="company-page-button"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          VIEW COMPANY MODAL
      ====================================================== */}
      {viewCompany && (
        <Modal
          onClose={() =>
            setViewCompany(null)
          }
          width="540px"
        >
          <ModalHeader
            title="Company Details"
            subtitle="Complete company information"
            onClose={() =>
              setViewCompany(null)
            }
          />

          <div
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                padding:
                  "14px",
                borderRadius:
                  "11px",
                backgroundColor:
                  "#f8fafc",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  borderRadius: "12px",
                  backgroundColor:
                    "#eff6ff",
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {getInitials(
                  viewCompany.name
                )}
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3
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
                  {viewCompany.name}
                </h3>

                <div
                  style={{
                    marginTop:
                      "5px",
                    color:
                      "#64748b",
                    fontSize:
                      "10px",
                  }}
                >
                  {viewCompany.industry}
                </div>
              </div>

              <StatusBadge
                status={
                  viewCompany.status
                }
              />
            </div>

            <div
              className="company-details-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
                marginTop:
                  "15px",
              }}
            >
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value:
                    viewCompany.location,
                },
                {
                  icon: UserRound,
                  label: "Contact Person",
                  value:
                    viewCompany.contactPerson,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value:
                    viewCompany.email,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value:
                    viewCompany.phone,
                },
                {
                  icon: BriefcaseBusiness,
                  label:
                    "OJT Opportunities",
                  value:
                    viewCompany.opportunities,
                },
                {
                  icon: Users,
                  label:
                    "Students",
                  value:
                    viewCompany.students,
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
                        wordBreak:
                          "break-word",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                display: "flex",
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
                  setViewCompany(null);
                  openEditModal(
                    viewCompany
                  );
                }}
                style={{
                  height: "36px",
                  display:
                    "inline-flex",
                  alignItems:
                    "center",
                  gap: "6px",
                  padding:
                    "0 13px",
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
                <Pencil
                  size={13}
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
                style={{
                  height: "36px",
                  padding:
                    "0 15px",
                  border: "none",
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
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ADD COMPANY MODAL
      ====================================================== */}
      {showAddModal && (
        <Modal
          onClose={() => {
            setShowAddModal(false);
            setFormData(
              emptyCompany
            );
          }}
          width="620px"
        >
          <ModalHeader
            title="Add Company"
            subtitle="Register a new OJT company"
            onClose={() => {
              setShowAddModal(false);
              setFormData(
                emptyCompany
              );
            }}
          />

          {renderCompanyForm(
            handleAddCompany,
            "Add Company"
          )}
        </Modal>
      )}

      {/* =====================================================
          EDIT COMPANY MODAL
      ====================================================== */}
      {editingCompany && (
        <Modal
          onClose={() => {
            setEditingCompany(null);
            setFormData(
              emptyCompany
            );
          }}
          width="620px"
        >
          <ModalHeader
            title="Edit Company"
            subtitle="Update company information"
            onClose={() => {
              setEditingCompany(null);
              setFormData(
                emptyCompany
              );
            }}
          />

          {renderCompanyForm(
            handleEditCompany,
            "Save Changes"
          )}
        </Modal>
      )}

      {/* =====================================================
          STYLES
      ====================================================== */}
      <style>
        {`
          .company-action-button {
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

          .company-action-button:hover {
            background: #f8fafc;
          }

          .company-action-success {
            color: #059669;
          }

          .company-action-success:hover {
            background: #ecfdf5;
          }

          .company-action-danger {
            color: #dc2626;
          }

          .company-action-danger:hover {
            background: #fef2f2;
          }

          .company-page-button {
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

          .company-page-button:hover:not(:disabled) {
            border-color: #bfdbfe;
            background: #eff6ff;
            color: #2563eb;
          }

          .company-page-button:disabled {
            color: #cbd5e1;
            cursor: not-allowed;
            background: #f8fafc;
          }

          .company-page-active {
            border-color: #2563eb;
            background: #2563eb;
            color: #ffffff;
          }

          .company-page-active:hover:not(:disabled) {
            border-color: #2563eb;
            background: #2563eb;
            color: #ffffff;
          }

          .company-form-label {
            display: block;
            margin-bottom: 6px;
            color: #475569;
            font-size: 10px;
            font-weight: 700;
          }

          .company-form-input {
            width: 100%;
            height: 38px;
            padding: 0 10px;
            box-sizing: border-box;
            border: 1px solid #dbe4ee;
            border-radius: 8px;
            outline: none;
            background: #ffffff;
            color: #334155;
            font-size: 11px;
          }

          .company-form-input:focus {
            border-color: #93c5fd;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
          }

          @media (max-width: 1000px) {
            .company-management-stats {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 700px) {
            .company-management-stats {
              grid-template-columns: 1fr !important;
            }

            .company-management-filters {
              grid-template-columns: 1fr !important;
            }

            .company-form-grid {
              grid-template-columns: 1fr !important;
            }

            .company-details-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}