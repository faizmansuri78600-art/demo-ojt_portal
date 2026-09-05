import React from "react";

const toneStyles = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
};

export default function Badge({ children, tone = "slate" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
        toneStyles[tone] || toneStyles.slate
      }`}
    >
      {children}
    </span>
  );
}