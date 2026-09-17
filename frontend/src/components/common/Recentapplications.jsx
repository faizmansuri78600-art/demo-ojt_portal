import { useEffect, useState } from "react";
import { X } from "lucide-react";

const companyId = "C001";

export default function RecentApplications() {
  const [applications, setApplications] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/companies/${companyId}/dashboard/applications`
        );

        const data = await response.json();

        if (data.success) {
          setApplications(data.applications);
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const getInitials = (name) => {
    if (!name) return "US";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const getInitialBg = (index) => {
    const colors = [
      "bg-purple-100 text-purple-600",
      "bg-pink-100 text-pink-600",
      "bg-blue-100 text-blue-600",
      "bg-orange-100 text-orange-600",
      "bg-green-100 text-green-600",
      "bg-yellow-100 text-yellow-600",
    ];

    return colors[index % colors.length];
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "selected":
        return "bg-green-50 text-green-600";

      case "pending":
        return "bg-red-50 text-red-600";

      case "applied":
        return "bg-blue-50 text-blue-600";

      case "shortlisted":
        return "bg-purple-50 text-purple-600";

      case "in review":
        return "bg-orange-50 text-orange-600";

      case "rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const recentApplications = [];

const usedStudentIds = new Set();
const usedOpportunityIds = new Set();

for (const application of applications) {
  if (usedStudentIds.has(application.studentId)) {
    continue;
  }

  if (usedOpportunityIds.has(application.opportunityId)) {
    continue;
  }

  usedStudentIds.add(application.studentId);
  usedOpportunityIds.add(application.opportunityId);

  recentApplications.push(application);

  if (recentApplications.length === 5) {
    break;
  }
}
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">
            Recent Applications
          </h3>

          <button
            onClick={() => setShowAll(true)}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.7fr] gap-4 text-xs text-slate-400 pb-3 border-b border-slate-100">
          <span>Student</span>
          <span>Opportunity</span>
          <span>Applied On</span>
          <span>Status</span>
        </div>

        {/* Applications */}
        <div>
          {recentApplications.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">
              No applications found.
            </p>
          ) : (
            recentApplications.map((application, index) => (
              <div
                key={application.applicationId}
                className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.7fr] gap-4 items-center py-3 border-b border-slate-100 last:border-b-0"
              >
                {/* Student */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getInitialBg(
                      index
                    )}`}
                  >
                    {getInitials(application.studentName)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {application.studentName}
                    </p>

                    <p className="text-xs text-slate-400">
                      {application.studentId}
                    </p>
                  </div>
                </div>

                {/* Opportunity */}
                <div className="min-w-0">
                  <p className="text-sm text-slate-700 truncate">
                    {application.opportunityTitle}
                  </p>

                  <p className="text-xs text-slate-400">
                    {application.opportunityId}
                  </p>
                </div>

                {/* Applied On */}
                <p className="text-sm text-slate-600">
                  {application.appliedOn}
                </p>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View All Popup */}
      {showAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-xl overflow-hidden">
            {/* Popup Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-slate-800">
                All Applications
              </h2>

              <button
                onClick={() => setShowAll(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Popup Content */}
            <div className="overflow-y-auto max-h-[65vh] px-6">
              {applications.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-10">
                  No applications found.
                </p>
              ) : (
                applications.map((application, index) => (
                  <div
                    key={application.applicationId}
                    className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.7fr] gap-4 items-center py-4 border-b border-slate-100"
                  >
                    {/* Student */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getInitialBg(
                          index
                        )}`}
                      >
                        {getInitials(application.studentName)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {application.studentName}
                        </p>

                        <p className="text-xs text-slate-400">
                          {application.studentId}
                        </p>
                      </div>
                    </div>

                    {/* Opportunity */}
                    <div className="min-w-0">
                      <p className="text-sm text-slate-700 truncate">
                        {application.opportunityTitle}
                      </p>

                      <p className="text-xs text-slate-400">
                        {application.opportunityId}
                      </p>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-slate-600">
                      {application.appliedOn}
                    </p>

                    {/* Status */}
                    <div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}