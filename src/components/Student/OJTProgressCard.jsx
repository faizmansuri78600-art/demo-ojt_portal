import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import Badge from "./common/Badge";
export default function OJTProgressCard() {
  const percent = 70.8;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">OJT Progress</h3>
        <span className="text-xs font-semibold text-emerald-600">Overall Progress</span>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
            <circle cx="50" cy="50" r={radius} stroke="#e2e8f0" strokeWidth="9" fill="none" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#2563eb"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-slate-800">85/120</span>
            <span className="text-[10px] text-slate-400">Hours</span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 mb-1">
        Expected Completion <span className="font-semibold text-slate-700">15 Aug 2025</span>
      </p>

      <div className="w-full h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percent}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <div>
            <p className="text-sm font-semibold text-slate-800">17</p>
            <p className="text-[10px] text-slate-500">Completed Tasks</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
          <Circle className="w-4 h-4 text-amber-500" />
          <div>
            <p className="text-sm font-semibold text-slate-800">6</p>
            <p className="text-[10px] text-slate-500">Pending Tasks</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-slate-400">Current Status</span>
        <Badge tone="emerald">Active</Badge>
      </div>
    </div>
  );
}
