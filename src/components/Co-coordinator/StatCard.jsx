import {
  Users,
  Building2,
  BriefcaseBusiness,
  Clock3,
  FileText,
} from "lucide-react";

const iconMap = {
  students: Users,
  companies: Building2,
  ojt: BriefcaseBusiness,
  approvals: Clock3,
  reports: FileText,
};

const toneMap = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    change: "text-emerald-600",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    change: "text-emerald-600",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-600",
    change: "text-emerald-600",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
    change: "text-orange-600",
  },
  purple: {
    icon: "bg-purple-50 text-purple-600",
    change: "text-emerald-600",
  },
};

export default function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  tone = "blue",
}) {
  const Icon = iconMap[icon] || FileText;
  const styles = toneMap[tone] || toneMap.blue;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <Icon size={22} strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
          {value}
        </p>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className={`font-semibold ${styles.change}`}>
            ↑ {change}
          </span>

          <span className="text-slate-400">
            {changeLabel}
          </span>
        </div>
      </div>
    </div>
  );
}