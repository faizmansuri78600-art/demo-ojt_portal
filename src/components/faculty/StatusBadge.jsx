import React from "react";
import { Icon } from "./facultyIcons";

const styles = {
  Reviewed: { bg: "bg-green-50", text: "text-green-700", icon: "checkCircle" },
  Pending: { bg: "bg-orange-50", text: "text-orange-600", icon: "clock" },
  Returned: { bg: "bg-red-50", text: "text-red-600", icon: "undo" },
};

const StatusBadge = ({ status }) => {
  const style = styles[status] || styles.Pending;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
      <Icon name={style.icon} className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

export default StatusBadge;