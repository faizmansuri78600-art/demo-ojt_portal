import React from "react";

const iconMap = {
  students: "👥",
  report: "📋",
  diary: "📔",
  evaluation: "📝",
  ongoing: "✅",
  pending: "⏳",
  completed: "🚩",
};

const StatCard = ({ label, value, linkText, bg, iconColor, icon, onLinkClick = () => {} }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg ${bg} ${iconColor} flex items-center justify-center text-xl shrink-0`}>
          <span>{iconMap[icon]}</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
          <p className="text-sm text-gray-500 leading-tight">{label}</p>
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
};

export default StatCard;