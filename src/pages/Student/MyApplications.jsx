
import { useState, useMemo } from "react";

import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";

import tcsLogo from "../../assets/logos/tcslogo.png";
import infosysLogo from "../../assets/logos/InfosysLogo.png";
import wiproLogo from "../../assets/logos/WiproLogo.png";
import cognizantLogo from "../../assets/logos/cognizantLogo.png";
import Capgemini from "../../assets/logos/Capgemini.png";
import AccentureLogo from "../../assets/logos/AccentureLogo.png";
import TechM from "../../assets/logos/TechM.png";
import HCLTechLogo from "../../assets/logos/HCLTechLogo.png";

import {
  ChevronRight,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Send,
  Lightbulb,
  FileEdit,
  CalendarClock,
  BookOpen,
  FileCheck2,
  Library,
} from "lucide-react";

// ======================================================
// COMPANY LOGOS
// ======================================================

const companyLogos = {
  "Tata Consultancy Services": tcsLogo,
  "Infosys Limited": infosysLogo,
  "Wipro Technologies": wiproLogo,
  "Cognizant": cognizantLogo,
  "Capgemini": Capgemini,
  "Accenture": AccentureLogo,
  "Tech Mahindra": TechM,
  "HCL Technologies": HCLTechLogo,
};

// ======================================================
// STATUS STYLES
// ======================================================

const statusStyles = {
  Applied: "text-blue-600 bg-blue-50 border-blue-200",
  "Under Review": "text-orange-500 bg-orange-50 border-orange-200",
  Selected: "text-green-600 bg-green-50 border-green-200",
  Rejected: "text-red-500 bg-red-50 border-red-200",
  Withdrawn: "text-gray-500 bg-gray-100 border-gray-200",
};

// ======================================================
// COMPANY LOGO COMPONENT
// ======================================================

function CompanyLogo({ name }) {
  const logo = companyLogos[name];

  if (!logo) {
    return (
      <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-gray-500">
          {name?.substring(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-md border border-gray-100 bg-white flex items-center justify-center overflow-hidden shrink-0">
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-full h-full object-contain p-1"
      />
    </div>
  );
}

// ======================================================
// DATE FUNCTIONS
// ======================================================

function parseAppliedDate(str) {
  return new Date(str);
}

const TODAY = new Date("2025-05-20");

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function MyApplication() {
  // ====================================================
  // SUMMARY CARDS
  // ====================================================

  const summary = [
    {
      label: "Total Applications",
      value: "12",
      sub: "All time",
      icon: Briefcase,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Under Review",
      value: "4",
      sub: "In progress",
      icon: Clock,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "Selected",
      value: "3",
      sub: "Shortlisted",
      icon: CheckCircle2,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Rejected",
      value: "2",
      sub: "Not selected",
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  // ====================================================
  // FILTER STATES
  // ====================================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const companyOptions = Object.keys(companyLogos);

  const statusOptions = [
    "Applied",
    "Under Review",
    "Selected",
    "Rejected",
    "Withdrawn",
  ];

  // ====================================================
  // APPLICATION DATA
  // ====================================================

  const applications = [
    {
      company: "Tata Consultancy Services",
      role: "Python Developer Intern",
      location: "Pune, Maharashtra",
      appliedDate: "17 May 2025",
      interviewDate: "24 May 2025, 10:00 AM",
      status: "Under Review",
    },
    {
      company: "Infosys Limited",
      role: "Web Development Intern",
      location: "Bangalore, Karnataka",
      appliedDate: "16 May 2025",
      interviewDate: "23 May 2025, 02:00 PM",
      status: "Applied",
    },
    {
      company: "Wipro Technologies",
      role: "Data Analytics Intern",
      location: "Hyderabad, Telangana",
      appliedDate: "15 May 2025",
      interviewDate: "22 May 2025, 11:00 AM",
      status: "Selected",
    },
    {
      company: "Cognizant",
      role: "Software Engineering Intern",
      location: "Chennai, Tamil Nadu",
      appliedDate: "14 May 2025",
      interviewDate: "21 May 2025, 03:30 PM",
      status: "Rejected",
    },
    {
      company: "Capgemini",
      role: "Java Developer Intern",
      location: "Mumbai, Maharashtra",
      appliedDate: "12 May 2025",
      interviewDate: "-",
      status: "Applied",
    },
    {
      company: "Accenture",
      role: "Cloud Computing Intern",
      location: "Pune, Maharashtra",
      appliedDate: "10 May 2025",
      interviewDate: "-",
      status: "Rejected",
    },
    {
      company: "Tech Mahindra",
      role: "QA Testing Intern",
      location: "Noida, Uttar Pradesh",
      appliedDate: "08 May 2025",
      interviewDate: "-",
      status: "Applied",
    },
    {
      company: "HCL Technologies",
      role: "DevOps Intern",
      location: "Noida, Uttar Pradesh",
      appliedDate: "04 May 2025",
      interviewDate: "18 May 2025, 01:00 PM",
      status: "Under Review",
    },
  ];

  // ====================================================
  // FILTER + SORT
  // ====================================================

  const filteredApplications = useMemo(() => {
    let result = applications.filter((a) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        searchText === "" ||
        a.company.toLowerCase().includes(searchText) ||
        a.role.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "" || a.status === status;

      const matchesCompany =
        company === "" || a.company === company;

      let matchesDate = true;

      if (dateFilter) {
        const applied = parseAppliedDate(a.appliedDate);

        const diffDays =
          (TODAY - applied) / (1000 * 60 * 60 * 24);

        if (dateFilter === "7d") {
          matchesDate = diffDays <= 7;
        }

        if (dateFilter === "30d") {
          matchesDate = diffDays <= 30;
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompany &&
        matchesDate
      );
    });

    result = [...result].sort((a, b) => {
      const dateA = parseAppliedDate(a.appliedDate);
      const dateB = parseAppliedDate(b.appliedDate);

      return sortBy === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [search, status, company, dateFilter, sortBy]);

  // ====================================================
  // APPLICATION TIMELINE
  // ====================================================

  const timeline = [
    {
      title: "Under Review",
      company: "Tata Consultancy Services",
      role: "Python Developer Intern",
      date: "17 May 2025, 09:30 AM",
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Selected for Interview",
      company: "Wipro Technologies",
      role: "Data Analytics Intern",
      date: "15 May 2025, 11:15 AM",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Application Rejected",
      company: "Cognizant",
      role: "Software Engineering Intern",
      date: "14 May 2025, 02:40 PM",
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Application Submitted",
      company: "Infosys Limited",
      role: "Web Development Intern",
      date: "16 May 2025, 04:20 PM",
      icon: Send,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  // ====================================================
  // TOP APPLIED COMPANIES
  // ====================================================

  const topAppliedCompanies = [
    {
      name: "Tata Consultancy Services",
      count: 5,
    },
    {
      name: "Infosys Limited",
      count: 4,
    },
    {
      name: "Wipro Technologies",
      count: 2,
    },
    {
      name: "Others",
      count: 3,
    },
  ];

  const maxCount = Math.max(
    ...topAppliedCompanies.map((c) => c.count)
  );

  // ====================================================
  // RETURN
  // ====================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Sidebar activePage="My Applications" />

      <main className="ml-64 pt-16 min-h-screen overflow-x-hidden">
        <div className="p-6 max-w-full">

          {/* BREADCRUMB */}

          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
            <span>Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-gray-600 font-medium">
              My Applications
            </span>
          </div>

          {/* TITLE */}

          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">
              My Applications
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Track the status of all your OJT applications.
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {summary.map(
              ({
                label,
                value,
                sub,
                icon: Icon,
                iconBg,
                iconColor,
              }) => (
                <div
                  key={label}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3"
                >
                  <div
                    className={`w-10 h-10 rounded-md ${iconBg} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={18} className={iconColor} />
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      {label}
                    </p>

                    <p className="text-lg font-bold text-gray-800 leading-tight">
                      {value}
                    </p>

                    <p className="text-[11px] text-gray-400">
                      {sub}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* TABLE + TIMELINE */}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-5">

            {/* LEFT SIDE */}

            <div className="xl:col-span-3 min-w-0 space-y-4">

              {/* FILTERS */}

              <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap items-center gap-3">

                <div className="relative flex-1 min-w-[180px]">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search by company or role"
                    className="w-full border border-gray-200 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <Search
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
                >
                  <option value="">All Status</option>

                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <select
                  value={company}
                  onChange={(e) =>
                    setCompany(e.target.value)
                  }
                  className="border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
                >
                  <option value="">All Companies</option>

                  {companyOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(e.target.value)
                  }
                  className="border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
                >
                  <option value="">All Time</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600 ml-auto"
                >
                  <option value="newest">
                    Sort By: Newest First
                  </option>

                  <option value="oldest">
                    Sort By: Oldest First
                  </option>
                </select>

              </div>

              {/* APPLICATION TABLE */}

              <div className="bg-white border border-gray-200 rounded-lg w-full overflow-hidden">

                <table className="w-full text-[11px] table-fixed">

                  <colgroup>
                    <col className="w-[19%]" />
                    <col className="w-[16%]" />
                    <col className="w-[13%]" />
                    <col className="w-[11%]" />
                    <col className="w-[15%]" />
                    <col className="w-[11%]" />
                    <col className="w-[15%]" />
                  </colgroup>

                  <thead>
                    <tr className="text-gray-400 text-left border-b border-gray-100">

                      <th className="py-2.5 px-3 font-medium">
                        Company
                      </th>

                      <th className="py-2.5 px-3 font-medium">
                        Job Role
                      </th>

                      <th className="py-2.5 px-3 font-medium">
                        Location
                      </th>

                      <th className="py-2.5 px-3 font-medium">
                        Applied
                      </th>

                      <th className="py-2.5 px-3 font-medium">
                        Interview
                      </th>

                      <th className="py-2.5 px-3 font-medium">
                        Status
                      </th>

                      <th className="py-2.5 px-3 font-medium text-right">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {filteredApplications.map(
                      (app, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                        >

                          <td className="py-3 px-3">

                            <div className="flex items-center gap-2 min-w-0">

                              <CompanyLogo
                                name={app.company}
                              />

                              <span
                                className="font-medium text-gray-700 truncate"
                                title={app.company}
                              >
                                {app.company}
                              </span>

                            </div>

                          </td>

                          <td
                            className="py-2.5 px-3 text-gray-600 truncate"
                            title={app.role}
                          >
                            {app.role}
                          </td>

                          <td
                            className="py-2.5 px-3 text-gray-500 truncate"
                            title={app.location}
                          >
                            {app.location}
                          </td>

                          <td className="py-2.5 px-3 text-gray-500 leading-tight">
                            {app.appliedDate}
                          </td>

                          <td className="py-2.5 px-3 text-gray-500 leading-tight">
                            {app.interviewDate}
                          </td>

                          <td className="py-2.5 px-3">

                            <span
                              className={`inline-block text-[9px] font-medium rounded px-1.5 py-1 border leading-tight ${
                                statusStyles[app.status]
                              }`}
                            >
                              {app.status}
                            </span>

                          </td>

                          <td className="py-2.5 px-3 text-right">

                            <button className="text-[10px] font-medium text-blue-600 border border-blue-200 rounded-md px-2 py-1 hover:bg-blue-50 whitespace-nowrap">
                              View Details
                            </button>

                          </td>

                        </tr>
                      )
                    )}

                    {filteredApplications.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-8 text-center text-gray-400"
                        >
                          No applications match your filters.
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>

            </div>

            {/* APPLICATION TIMELINE */}

            <div className="xl:col-span-1 min-w-0">

              <div className="bg-white border border-gray-200 rounded-lg p-4 h-fit">

                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                  Application Timeline
                </h3>

                <ul className="relative space-y-5">

                  {timeline.map(
                    (
                      {
                        title,
                        company,
                        role,
                        date,
                        icon: Icon,
                        color,
                        bg,
                      },
                      i
                    ) => (
                      <li
                        key={i}
                        className="flex gap-3"
                      >

                        <div className="flex flex-col items-center">

                          <div
                            className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center shrink-0`}
                          >
                            <Icon
                              size={13}
                              className={color}
                            />
                          </div>

                          {i < timeline.length - 1 && (
                            <div className="w-px flex-1 bg-gray-100 mt-1" />
                          )}

                        </div>

                        <div className="pb-1 min-w-0">

                          <p
                            className={`text-xs font-medium ${color}`}
                          >
                            {title}
                          </p>

                          <p className="text-xs text-gray-700 mt-0.5 truncate">
                            {company}
                          </p>

                          <p className="text-[11px] text-gray-400 truncate">
                            {role}
                          </p>

                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {date}
                          </p>

                        </div>

                      </li>
                    )
                  )}

                </ul>

              </div>
            </div>

          </div>

          {/* ==================================================
              BOTTOM CARDS
          ================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">

            {/* 1. TOP APPLIED COMPANIES */}

            <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-0">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  Top Applied Companies
                </h3>

                <button className="text-xs text-blue-600 font-medium">
                  View All
                </button>

              </div>

              <div className="space-y-3">

                {topAppliedCompanies.map(
                  ({ name, count }) => (
                    <div
                      key={name}
                      className="min-w-0"
                    >

                      <div className="flex justify-between text-xs mb-1 gap-2">

                        <span className="text-gray-600 truncate">
                          {name}
                        </span>

                        <span className="text-gray-400 shrink-0">
                          {count}
                        </span>

                      </div>

                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${
                              (count / maxCount) * 100
                            }%`,
                          }}
                        />

                      </div>

                    </div>
                  )
                )}

              </div>
            </div>

            {/* 2. APPLICATION TIPS */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center mb-3">
                <Lightbulb
                  size={17}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-800">
                Application Tips
              </h3>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Make your profile complete and keep your resume updated to increase your selection chances.
              </p>

              <button className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-3">
                <FileEdit size={12} />
                Improve Resume
              </button>

            </div>

            {/* 3. RESUME STRENGTH */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="w-9 h-9 rounded-md bg-green-50 flex items-center justify-center mb-3">

                <FileCheck2
                  size={17}
                  className="text-green-600"
                />

              </div>

              <div className="flex items-center justify-between">

                <h3 className="text-sm font-semibold text-gray-800">
                  Resume Strength
                </h3>

                <span className="text-lg font-bold text-green-600">
                  85%
                </span>

              </div>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Your resume is strong and ready for applications.
              </p>

              <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "85%" }}
                />

              </div>

              <button className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-3">
                <FileEdit size={12} />
                Improve Resume
              </button>

            </div>

            {/* 4. UPCOMING INTERVIEWS */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="w-9 h-9 rounded-md bg-purple-50 flex items-center justify-center mb-3">

                <CalendarClock
                  size={17}
                  className="text-purple-600"
                />

              </div>

              <div className="flex items-center justify-between">

                <h3 className="text-sm font-semibold text-gray-800">
                  Upcoming Interviews
                </h3>

                <span className="text-lg font-bold text-purple-600">
                  2
                </span>

              </div>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                You have 2 interviews scheduled this week.
              </p>

              <button className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-3">

                <BookOpen size={12} />

                View Schedule

              </button>

            </div>

            {/* 5. CAREER RESOURCES */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="w-9 h-9 rounded-md bg-orange-50 flex items-center justify-center mb-3">

                <Library
                  size={17}
                  className="text-orange-500"
                />

              </div>

              <h3 className="text-sm font-semibold text-gray-800">
                Career Resources
              </h3>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Access useful resources to help you prepare for your OJT and career.
              </p>

              <button className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-3">

                <BookOpen size={12} />

                Explore Resources →

              </button>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

