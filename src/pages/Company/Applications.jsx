import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/common/CompanySidebar";
import Header from "../../components/common/CompanyHeader";
import Footer from "../../components/common/CompanyFooter";

import ApplicationsStatsCards from "../../components/company/ApplicationsStatsCards";
import ApplicationsFiltersBar from "../../components/company/ApplicationsFiltersBar";
import ApplicationsTable from "../../components/company/ApplicationsTable";
import StudentApplicationPanel from "../../components/company/StudentApplicationPanel";

import {
  applicationsStats,
  applications,
  opportunityOptions,
  departmentOptions,
  statusOptions,
} from "../../components/company/applicationsData";

const PER_PAGE = 7;

const STATUS_STORAGE_KEY = "company_application_statuses";

const Applications = () => {
  const [filters, setFilters] = useState({
    search: "",
    opportunity: "All Opportunities",
    department: "All Departments",
    status: "All Status",
    appliedOn: "",
  });

  const [page, setPage] = useState(1);

  const [selectedId, setSelectedId] = useState(
    applications[0] ? applications[0].id : null
  );

  const [appStatuses, setAppStatuses] = useState(() => {
    const defaultStatuses = Object.fromEntries(
      applications.map((a) => [a.id, a.status])
    );

    try {
      const savedStatuses = localStorage.getItem(
        STATUS_STORAGE_KEY
      );

      if (savedStatuses) {
        return {
          ...defaultStatuses,
          ...JSON.parse(savedStatuses),
        };
      }
    } catch (error) {
      console.error(
        "Error loading application statuses:",
        error
      );
    }

    return defaultStatuses;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STATUS_STORAGE_KEY,
        JSON.stringify(appStatuses)
      );
    } catch (error) {
      console.error(
        "Error saving application statuses:",
        error
      );
    }
  }, [appStatuses]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      opportunity: "All Opportunities",
      department: "All Departments",
      status: "All Status",
      appliedOn: "",
    });

    setPage(1);
  };

  const mergedApplications = useMemo(() => {
    return applications.map((a) => ({
      ...a,
      status: appStatuses[a.id] || a.status,
    }));
  }, [appStatuses]);

  const filteredApplications = useMemo(() => {
    return mergedApplications.filter((a) => {
      const searchText = filters.search.toLowerCase();

      const matchesSearch =
        a.name.toLowerCase().includes(searchText) ||
        a.college.toLowerCase().includes(searchText) ||
        a.skills.some((s) =>
          s.toLowerCase().includes(searchText)
        );

      const matchesOpportunity =
        filters.opportunity === "All Opportunities" ||
        a.opportunity === filters.opportunity;

      const matchesDepartment =
        filters.department === "All Departments" ||
        a.department === filters.department;

      const matchesStatus =
        filters.status === "All Status" ||
        a.status === filters.status;

      const matchesDate = !filters.appliedOn;

      return (
        matchesSearch &&
        matchesOpportunity &&
        matchesDepartment &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [mergedApplications, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PER_PAGE)
  );

  const paginated = filteredApplications.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const selectedApplication =
    mergedApplications.find(
      (a) => a.id === selectedId
    ) || null;

  const updateStatus = (id, status) => {
    setAppStatuses((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 md:p-6 space-y-5">

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Applications &amp; Student Details
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              <Link
                to="/company/dashboard"
                className="hover:text-blue-500"
              >
                Dashboard
              </Link>{" "}
              &gt; Applications &amp; Students
            </p>
          </div>

          <ApplicationsStatsCards
            stats={applicationsStats}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">

            <div className="xl:col-span-2 space-y-6">

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4">
                <ApplicationsFiltersBar
                  filters={filters}
                  onChange={handleFilterChange}
                  onReset={handleReset}
                  opportunities={opportunityOptions}
                  departments={departmentOptions}
                  statuses={statusOptions}
                />
              </div>

              <ApplicationsTable
                applications={paginated}
                selectedId={selectedId}
                onSelect={(a) => setSelectedId(a.id)}
                onQuickAccept={(a) =>
                  updateStatus(a.id, "Accepted")
                }
                onQuickReject={(a) =>
                  updateStatus(a.id, "Rejected")
                }
                page={page}
                totalPages={totalPages}
                totalEntries={filteredApplications.length}
                perPage={PER_PAGE}
                onPageChange={handlePageChange}
              />

            </div>

            <div className="xl:col-span-1">

              <StudentApplicationPanel
                application={selectedApplication}
                onClose={() => setSelectedId(null)}
                onShortlist={() => {
                  if (selectedApplication) {
                    updateStatus(
                      selectedApplication.id,
                      "Shortlisted"
                    );
                  }
                }}
                onAccept={() => {
                  if (selectedApplication) {
                    updateStatus(
                      selectedApplication.id,
                      "Accepted"
                    );
                  }
                }}
                onInReview={() => {
                  if (selectedApplication) {
                    updateStatus(
                      selectedApplication.id,
                      "In Review"
                    );
                  }
                }}
                onReject={() => {
                  if (selectedApplication) {
                    updateStatus(
                      selectedApplication.id,
                      "Rejected"
                    );
                  }
                }}
                onSaveNote={(note) =>
                  console.log(
                    "Save note for",
                    selectedApplication?.id,
                    note
                  )
                }
              />

            </div>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Applications;