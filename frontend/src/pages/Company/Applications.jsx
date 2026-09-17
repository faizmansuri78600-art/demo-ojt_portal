import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";

import ApplicationsStatsCards from "../../components/company/ApplicationsStatsCards";
import ApplicationsFiltersBar from "../../components/company/ApplicationsFiltersBar";
import ApplicationsTable from "../../components/company/ApplicationsTable";
import StudentApplicationPanel from "../../components/company/StudentApplicationPanel";

const PER_PAGE = 7;

const getToken = () => localStorage.getItem("token");

const API_BASE = "http://localhost:5000/api/companies/applications";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    opportunity: "All Opportunities",
    department: "All Departments",
    status: "All Status",
    appliedOn: "",
  });

  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const fetchApplications = async () => {
    const token = getToken();

    if (!token) {
      console.error(
        "No login token found in localStorage. Checked keys: ojtUser, user, authUser, currentUser, token. " +
        "Make sure you are actually logged in, and check Console > Object.keys(localStorage) to find the real key name."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data.applications || []);
      if (response.data.applications && response.data.applications[0]) {
        setSelectedId(response.data.applications[0].id);
      }
    } catch (error) {
      // Log the ACTUAL server message, not just the generic Axios error
      console.error(
        "Failed to load applications:",
        error.response?.status,
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const opportunityOptions = useMemo(
    () => ["All Opportunities", ...new Set(applications.map((a) => a.opportunity).filter(Boolean))],
    [applications]
  );
  const departmentOptions = useMemo(
    () => ["All Departments", ...new Set(applications.map((a) => a.department).filter(Boolean))],
    [applications]
  );
  const statusOptions = ["All Status", "Pending", "In Review", "Shortlisted", "Accepted", "Rejected"];

  const applicationsStats = useMemo(() => {
    return {
      total: applications.length,
      shortlisted: applications.filter((a) => a.status === "Shortlisted").length,
      accepted: applications.filter((a) => a.status === "Accepted").length,
      rejected: applications.filter((a) => a.status === "Rejected").length,
    };
  }, [applications]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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

  const filteredApplications = useMemo(() => {
    return applications.filter((a) => {
      const searchText = filters.search.toLowerCase();

      const matchesSearch =
        a.name?.toLowerCase().includes(searchText) ||
        a.college?.toLowerCase().includes(searchText) ||
        a.skills?.some((s) => s.toLowerCase().includes(searchText));

      const matchesOpportunity = filters.opportunity === "All Opportunities" || a.opportunity === filters.opportunity;
      const matchesDepartment = filters.department === "All Departments" || a.department === filters.department;
      const matchesStatus = filters.status === "All Status" || a.status === filters.status;
      const matchesDate = !filters.appliedOn;

      return matchesSearch && matchesOpportunity && matchesDepartment && matchesStatus && matchesDate;
    });
  }, [applications, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / PER_PAGE));
  const paginated = filteredApplications.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const selectedApplication = applications.find((a) => a.id === selectedId) || null;

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_BASE}/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchApplications();
    } catch (error) {
      console.error(
        "Failed to update status:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading applications...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <CompanyHeader />

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

        <CompanyFooter />
      </div>
    </div>
  );
};

export default Applications;