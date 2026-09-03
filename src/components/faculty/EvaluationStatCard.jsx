import React from "react";
import { Icon } from "./facultyIcons";

const EvaluationStatCard = ({ icon, iconBg, iconColor, value, label, footer, linkText, onLinkClick = () => {} }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
        <p className="text-sm text-gray-500 leading-tight">{label}</p>
        {footer && <p className="text-xs text-gray-400 leading-tight mt-0.5">{footer}</p>}
      </div>
    </div>
    {linkText && (
      <>
        <div className="border-t border-gray-100 my-3" />
        <button
          onClick={onLinkClick}
          className="text-sm text-blue-600 font-medium hover:underline text-middle whitespace-nowrap"
        >
          {linkText} →
        </button>
      </>
    )}
  </div>
);
export default EvaluationStatCard;