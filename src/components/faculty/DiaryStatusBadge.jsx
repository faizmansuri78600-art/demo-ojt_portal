import React from "react";
import { Icon } from "./facultyIcons";

const styles = {
  "Pending Review": { bg: "bg-orange-50", text: "text-orange-600", icon: "clock" },
  Approved: { bg: "bg-green-50", text: "text-green-700", icon: "checkCircle" },
  "Revision Requested": { bg: "bg-purple-50", text: "text-purple-600", icon: "undo" },
};

const DiaryStatusBadge = ({ status }) => {
  const style = styles[status] || styles["Pending Review"];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${style.bg} ${style.text}`}>
      <Icon name={style.icon} className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

export default DiaryStatusBadge;