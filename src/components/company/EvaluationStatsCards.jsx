import React from "react";
import { Users, CheckCircle2, Clock, Star } from "lucide-react";

/**
 * EvaluationStatsCards
 * Props:
 *  - stats: { totalStudents, evaluated, pending, avgRating }
 */
const EvaluationStatsCards = ({ stats }) => {
  const {
    totalStudents = 0,
    evaluated = 0,
    pending = 0,
    avgRating = 0,
  } = stats || {};

  const evaluatedPct = totalStudents
    ? ((evaluated / totalStudents) * 100).toFixed(2)
    : "0.00";
  const pendingPct = totalStudents
    ? ((pending / totalStudents) * 100).toFixed(2)
    : "0.00";

  const cards = [
    {
      label: "Total Students",
      value: totalStudents,
      sub: "Total Interns",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "Evaluated",
      value: evaluated,
      sub: `${evaluatedPct}%`,
      icon: CheckCircle2,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      label: "Pending",
      value: pending,
      sub: `${pendingPct}%`,
      icon: Clock,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "Average Rating",
      value: `${avgRating} / 5`,
      sub: "This Month",
      icon: Star,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <p className="text-[11px] text-gray-400">{card.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EvaluationStatsCards;
