import React from "react";

const STYLES = {
  New: "bg-blue-50 text-blue-500",
  Shortlisted: "bg-green-50 text-green-600",
  "In Review": "bg-orange-50 text-orange-500",
  Accepted: "bg-emerald-50 text-emerald-600",
  Rejected: "bg-red-50 text-red-500",
};

const FULL_LABELS = {
  New: "New Application",
};

const ApplicationStatusBadge = ({ status, full = false }) => {
  const style =
    STYLES[status] || "bg-gray-100 text-gray-500";

  const label =
    full ? FULL_LABELS[status] || status : status;

  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-1 rounded-md inline-block ${style}`}
    >
      {label}
    </span>
  );
};

export default ApplicationStatusBadge;