import React from "react";


export default function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="flex items-center gap-1.5 text-slate-500 text-xs">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      <span className="text-slate-700 text-xs font-medium text-right">{value}</span>
    </div>
  );
}
