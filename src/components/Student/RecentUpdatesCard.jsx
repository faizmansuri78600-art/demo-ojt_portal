import React from "react";
import { Link } from "react-router-dom";

const updates = [
  { title: "OJT Started", desc: "Your OJT program has been started", time: "15 May 2025 - 09:30 AM" },
  { title: "First Task Assigned", desc: "Company Requirement Analysis task assigned", time: "16 May 2025 - 11:15 AM" },
  { title: "Weekly Diary Submitted", desc: "Week 1 diary has been submitted", time: "20 May 2025 - 05:45 PM" },
  { title: "Report Uploaded", desc: "Initial project report uploaded", time: "24 May 2025 - 03:20 PM" },
];

export default function RecentUpdatesCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Recent Updates</h3>
        <Link to="/updates" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
          View All
        </Link>
      </div>

      <ol className="relative border-l border-slate-200 ml-2 space-y-5">
        {updates.map((u, i) => (
          <li key={u.title} className="ml-4">
            <span
              className={`absolute -left-[7px] w-3 h-3 rounded-full ring-4 ring-white ${
                i === 0 ? "bg-emerald-500" : "bg-blue-500"
              }`}
            />
            <p className="text-xs font-semibold text-slate-800">{u.title}</p>
            <p className="text-[11px] text-slate-500">{u.desc}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{u.time}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
