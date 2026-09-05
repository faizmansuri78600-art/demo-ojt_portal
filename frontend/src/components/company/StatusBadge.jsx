import React from "react";

const STYLES = {
  Evaluated: "bg-green-50 text-green-600",
  Pending: "bg-orange-50 text-orange-500",
};

const StatusBadge = ({ status }) => {
  const style = STYLES[status] || "bg-gray-100 text-gray-500";
  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-1 rounded-md inline-block ${style}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
