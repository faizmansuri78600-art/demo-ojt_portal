import React from "react";
import { FileText, UserPlus, ListChecks, CheckCircle2, XCircle } from "lucide-react";

/**
 * ApplicationsStatsCards
 * Props:
 *  - stats: { total, totalDelta, newApps, newAppsDelta, shortlisted, shortlistedDelta,
 *             selected, selectedDelta, rejected, rejectedDelta }
 */
const ApplicationsStatsCards = ({ stats }) => {
  const {
    total = 0,
    totalDelta = "",
    newApps = 0,
    newAppsDelta = "",
    shortlisted = 0,
    shortlistedDelta = "",
    selected = 0,
    selectedDelta = "",
    rejected = 0,
    rejectedDelta = "",
  } = stats || {};

  const cards = [
    {
      label: "Total Applications",
      value: total,
      delta: totalDelta,
      deltaColor: "text-blue-500",
      icon: FileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "New Applications",
      value: newApps,
      delta: newAppsDelta,
      deltaColor: "text-green-500",
      icon: UserPlus,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      delta: shortlistedDelta,
      deltaColor: "text-purple-500",
      icon: ListChecks,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      label: "Selected",
      value: selected,
      delta: selectedDelta,
      deltaColor: "text-emerald-500",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      label: "Rejected",
      value: rejected,
      delta: rejectedDelta,
      deltaColor: "text-red-500",
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
          >
            <div className={`${card.iconBg} ${card.iconColor} p-2.5 rounded-lg`}>
              <Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800 leading-tight">
                {card.value}
              </p>
              <p className="text-xs text-gray-500 leading-tight">{card.label}</p>
              {card.delta && (
                <p className={`text-[11px] ${card.deltaColor}`}>{card.delta}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationsStatsCards;
