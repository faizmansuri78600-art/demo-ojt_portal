import React from "react";
import { Icon } from "./facultyIcons";

const ReportsSummaryCard = ({ icon, iconBg, iconColor, value, label, footer }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
    <div className={`w-11 h-11 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
      <Icon name={icon} className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{footer}</p>
    </div>
  </div>
);

export default ReportsSummaryCard;