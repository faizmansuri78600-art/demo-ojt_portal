import React from "react";
import { Building2, User, Clock, TrendingUp } from "lucide-react";

const statCards = [
  {
    icon: Building2,
    label: "Company",
    value: "Infosys Limited",
    sub: "Bangalore, Karnataka",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: User,
    label: "Mentor",
    value: "Mr. Ramesh Kumar",
    sub: "Senior Developer",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Clock,
    label: "Hours Completed",
    value: "85 / 120 Hours",
    sub: "70.8% Completed",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    label: "Attendance",
    value: "92%",
    sub: "Excellent",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

export default function StatCardsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3"
        >
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg}`}>
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500">{card.label}</p>
            <p className="text-sm font-semibold text-slate-800 truncate">{card.value}</p>
            <p className="text-xs text-slate-400 truncate">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
