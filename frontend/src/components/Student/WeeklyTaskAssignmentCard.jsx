import React, { useState } from "react";
import { ClipboardCheck, Calendar, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import Modal from "./SharedModal";

const weeklyTasks = [
  { task: "Company Requirement Analysis", desc: "Analyze and understand the project requirements", priority: "High", due: "20 May 2025", done: true },
  { task: "UI Design Implementation", desc: "Implement the front-end design", priority: "Medium", due: "27 May 2025", done: true },
  { task: "API Integration", desc: "Integrate frontend with backend APIs", priority: "High", due: "03 Jun 2025", done: false },
  { task: "Testing & Bug Fixing", desc: "Test the module and fix reported issues", priority: "Medium", due: "10 Jun 2025", done: false },
];

// Full task list shown inside the "View All Tasks" modal
const allTasks = [
  ...weeklyTasks,
  { task: "Database Schema Design", desc: "Design tables and relationships", priority: "High", due: "13 May 2025", done: true },
  { task: "Auth Module Setup", desc: "Implement login/signup flow", priority: "Medium", due: "06 May 2025", done: true },
  { task: "Deployment Setup", desc: "Configure CI/CD and hosting", priority: "Low", due: "17 Jun 2025", done: false },
  { task: "Client Demo Prep", desc: "Prepare walkthrough for stakeholders", priority: "Medium", due: "24 Jun 2025", done: false },
];

const priorityTone = {
  High: "bg-rose-100 text-rose-600",
  Medium: "bg-amber-100 text-amber-600",
  Low: "bg-emerald-100 text-emerald-600",
};

function TaskRow({ t }) {
  return (
    <div className="grid grid-cols-12 items-center px-1 py-2 border-t border-slate-100 text-xs">
      <div className="col-span-6 pr-2">
        <p className="font-medium text-slate-700">{t.task}</p>
        <p className="text-[10px] text-slate-400">{t.desc}</p>
      </div>
      <span className={`col-span-2 w-fit px-2 py-0.5 rounded-full text-[10px] font-semibold ${priorityTone[t.priority]}`}>
        {t.priority}
      </span>
      <span className="col-span-3 text-slate-500 flex items-center gap-1">
        <Calendar className="w-3 h-3 text-slate-400" />
        {t.due}
      </span>
      <span className="col-span-1">
        {t.done ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <Circle className="w-4 h-4 text-slate-300" />
        )}
      </span>
    </div>
  );
}

export default function WeeklyTaskAssignmentCard() {
  const [allTasksOpen, setAllTasksOpen] = useState(false);

  const completedCount = allTasks.filter((t) => t.done).length;
  const pendingCount = allTasks.length - completedCount;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Weekly Task Assignment</h3>
        <ClipboardCheck className="w-4 h-4 text-slate-400" />
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-12 text-[11px] text-slate-400 font-medium px-1 pb-2">
          <span className="col-span-6">Task</span>
          <span className="col-span-2">Priority</span>
          <span className="col-span-3">Due Date</span>
          <span className="col-span-1">Status</span>
        </div>

        {weeklyTasks.map((t) => (
          <TaskRow key={t.task} t={t} />
        ))}
      </div>

      {/* No navigation — opens a modal on the same page */}
      <button
        type="button"
        onClick={() => setAllTasksOpen(true)}
        className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        View All Tasks <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <Modal open={allTasksOpen} onClose={() => setAllTasksOpen(false)} title="All Tasks" size="xl">
        <div className="p-5">
          <div className="flex items-center gap-4 mb-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> {completedCount} Completed
            </span>
            <span className="flex items-center gap-1 text-slate-500 font-semibold">
              <Circle className="w-3.5 h-3.5" /> {pendingCount} Assigned
            </span>
          </div>

          <div className="grid grid-cols-12 text-[11px] text-slate-400 font-medium px-1 pb-2">
            <span className="col-span-6">Task</span>
            <span className="col-span-2">Priority</span>
            <span className="col-span-3">Due Date</span>
            <span className="col-span-1">Status</span>
          </div>

          {allTasks.map((t) => (
            <TaskRow key={t.task} t={t} />
          ))}
        </div>
      </Modal>
    </div>
  );
}