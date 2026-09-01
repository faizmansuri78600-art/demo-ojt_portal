import { useState } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
 
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  ClipboardList,
  CheckCircle2,
  Hourglass,
  CalendarDays,
  Paperclip,
  Eye,
  Pencil,
  Lightbulb,
  FileText,
} from "lucide-react";
 
export default function WeeklyDiary() {
  // ===== Summary cards data =====
  const summary = [
    {
      label: "Total Weeks",
      value: "8",
      sub: "Weeks Completed",
      icon: ClipboardList,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Submitted",
      value: "6",
      sub: "Weeks",
      icon: CheckCircle2,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Pending",
      value: "2",
      sub: "Weeks",
      icon: Hourglass,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "Total Entries",
      value: "48",
      sub: "Diary Entries",
      icon: CalendarDays,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];
 
  const overallProgress = 75;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (overallProgress / 100) * circumference;
 
  // ===== Current week diary entry (controlled textareas) =====
  const [entry, setEntry] = useState({
    workDone:
      "This week I worked on the user authentication module. Implemented login, registration and password reset functionality. Also integrated the module with the database and tested different scenarios.",
    learnings:
      "Learned about session management in Flask, password hashing using Werkzeug, and secure form validation.",
    challenges:
      "Faced issues with session timeout and redirect URLs. Also spent time understanding Flask blueprints.",
    nextWeekPlan:
      "Plan to work on dashboard module and role-based access control. Also start frontend integration for the authentication module.",
  });
 
  const updateEntry = (field, value) =>
    setEntry((prev) => ({ ...prev, [field]: value }));
 
  const fields = [
    { key: "workDone", label: "1. Work Performed / Tasks Completed", max: 1000 },
    { key: "learnings", label: "2. What Did You Learn?", max: 1000 },
    { key: "challenges", label: "3. Challenges Faced", max: 1000 },
    { key: "nextWeekPlan", label: "4. Plan for Next Week", max: 1000 },
  ];
 
  // ===== Diary history table =====
  const diaryHistory = [
    { week: "Week 8", range: "05 May 2025 - 11 May 2025", status: "Submitted", submittedOn: "12 May 2025" },
    { week: "Week 7", range: "28 Apr 2025 - 04 May 2025", status: "Submitted", submittedOn: "05 May 2025" },
    { week: "Week 6", range: "21 Apr 2025 - 27 Apr 2025", status: "Submitted", submittedOn: "28 Apr 2025" },
    { week: "Week 5", range: "14 Apr 2025 - 20 Apr 2025", status: "Submitted", submittedOn: "21 Apr 2025" },
    { week: "Week 4", range: "07 Apr 2025 - 13 Apr 2025", status: "Submitted", submittedOn: "14 Apr 2025" },
    { week: "Week 3", range: "31 Mar 2025 - 06 Apr 2025", status: "Submitted", submittedOn: "07 Apr 2025" },
    { week: "Week 2", range: "24 Mar 2025 - 30 Mar 2025", status: "Pending", submittedOn: "-" },
    { week: "Week 1", range: "17 Mar 2025 - 23 Mar 2025", status: "Pending", submittedOn: "-" },
  ];
 
  // ===== Diary calendar (May 2025, hardcoded to match screenshot) =====
  const calendarWeeks = [
    [
      { day: 28, muted: true }, { day: 29, muted: true }, { day: 30, muted: true },
      { day: 1, dot: "green" }, { day: 2, dot: "green" }, { day: 3 }, { day: 4 },
    ],
    [
      { day: 5, dot: "green" }, { day: 6, dot: "green" }, { day: 7, dot: "green" }, { day: 8, dot: "green" },
      { day: 9, dot: "green" }, { day: 10 }, { day: 11 },
    ],
    [
      { day: 12, dot: "green" }, { day: 13, dot: "green" }, { day: 14, dot: "green" }, { day: 15, dot: "green" },
      { day: 16, selected: true }, { day: 17 }, { day: 18 },
    ],
    [
      { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 },
    ],
    [
      { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
      { day: 1, muted: true },
    ],
  ];
  const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
 
  const dotColor = {
    green: "bg-green-500",
    orange: "bg-orange-400",
  };
 
  // ===== Quick tips =====
  const quickTips = [
    "Submit your diary every week before the deadline.",
    "Be specific about your tasks and learnings.",
    "Attach relevant files and screenshots.",
    "Regular diary updates help in better evaluation.",
  ];
 
  // ===== Recent diary entries timeline =====
  const recentEntries = [
    { week: "Week 8", status: "Submitted", date: "12 May 2025 - 10:30 AM", desc: "User authentication module completed.", color: "green" },
    { week: "Week 7", status: "Submitted", date: "05 May 2025 - 09:15 AM", desc: "Database integration and testing done.", color: "green" },
    { week: "Week 6", status: "Submitted", date: "28 Apr 2025 - 11:20 AM", desc: "UI design and validation completed.", color: "green" },
    { week: "Week 5", status: "Submitted", date: "21 Apr 2025 - 02:45 PM", desc: "Requirement analysis and planning.", color: "green" },
    { week: "Week 2", status: "Pending", date: "-", desc: "Dashboard module development in progress.", color: "orange" },
  ];
 
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar activePage="Weekly Diary" />
 
      {/* Offsets keep content clear of the fixed Header (h-16) and Sidebar (w-64) */}
      <main className="ml-64 pt-16 min-h-screen flex flex-col">
        <div className="p-6 flex-1">
          {/* ===== Breadcrumb ===== */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
            <span>Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-gray-600 font-medium">Weekly Diary</span>
          </div>
 
          {/* ===== Title + action ===== */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Weekly Diary</h1>
              <p className="text-sm text-gray-500 mt-1">
                Maintain your weekly work diary and track your learning progress.
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
              <Plus size={15} /> New Diary Entry
            </button>
          </div>
 
          {/* ===== Summary cards ===== */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
            {summary.map(({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-md ${iconBg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={iconColor} />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400">{label}</p>
                  <p className="text-lg font-bold text-gray-800 leading-tight">{value}</p>
                  <p className="text-[11px] text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
 
            {/* Overall progress */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
                  <circle
                    cx="36" cy="36" r={radius}
                    fill="none" stroke="#22c55e" strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">{overallProgress}%</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Overall Progress</p>
                <p className="text-sm font-semibold text-green-600 leading-tight">Great job!</p>
              </div>
            </div>
          </div>
 
          {/* ===== Main grid: Current entry / History / Calendar ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mb-5">
            {/* Current Week Diary Entry */}
            <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Current Week Diary Entry</h3>
                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">
                  In Progress
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">Week 9: 12 May 2025 - 18 May 2025</p>
 
              <div className="space-y-4">
                {fields.map(({ key, label, max }) => (
                  <div key={key}>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
                    <textarea
                      value={entry[key]}
                      onChange={(e) => updateEntry(key, e.target.value)}
                      maxLength={max}
                      rows={3}
                      className="w-full text-xs border border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                    <p className="text-[10px] text-gray-400 text-right mt-0.5">
                      {entry[key].length} / {max}
                    </p>
                  </div>
                ))}
              </div>
 
              <button className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 hover:text-blue-600">
                <Paperclip size={13} /> Attach Files (Reports, Screenshots, Documents)
              </button>
 
              <div className="flex gap-2 mt-4">
                <button className="flex-1 text-sm font-medium text-gray-600 border border-gray-200 rounded-md py-2 hover:bg-gray-50">
                  Save as Draft
                </button>
                <button className="flex-1 text-sm font-medium text-white bg-blue-600 rounded-md py-2 hover:bg-blue-700">
                  Submit Diary
                </button>
              </div>
            </div>
 
            {/* Diary History */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Diary History</h3>
                <button className="text-xs text-blue-600 font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 text-left border-b border-gray-100">
                      <th className="py-1.5 font-medium">Week</th>
                      <th className="py-1.5 font-medium">Status</th>
                      <th className="py-1.5 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diaryHistory.map(({ week, range, status, submittedOn }) => (
                      <tr key={week} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 align-top">
                          <p className="font-medium text-gray-700">{week}</p>
                          <p className="text-[10px] text-gray-400">{range}</p>
                          {submittedOn !== "-" && (
                            <p className="text-[10px] text-gray-400">Submitted: {submittedOn}</p>
                          )}
                        </td>
                        <td className="py-2 align-top">
                          <span
                            className={`text-[10px] font-medium rounded px-1.5 py-0.5 border ${
                              status === "Submitted"
                                ? "text-green-600 bg-green-50 border-green-200"
                                : "text-orange-500 bg-orange-50 border-orange-200"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="py-2 align-top text-right">
                          {status === "Submitted" ? (
                            <button className="text-gray-400 hover:text-blue-600" aria-label="View entry">
                              <Eye size={13} />
                            </button>
                          ) : (
                            <button className="text-gray-400 hover:text-blue-600" aria-label="Edit entry">
                              <Pencil size={13} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
 
            {/* Diary Calendar + Quick Tips */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">Diary Calendar</h3>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <button className="text-gray-400 hover:text-gray-600" aria-label="Previous month">
                    <ChevronLeft size={14} />
                  </button>
                  <p className="text-xs font-medium text-gray-700">May 2025</p>
                  <button className="text-gray-400 hover:text-gray-600" aria-label="Next month">
                    <ChevronRight size={14} />
                  </button>
                </div>
 
                <div className="grid grid-cols-7 text-center text-[10px] text-gray-400 mb-1">
                  {weekDayLabels.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
 
                <div className="space-y-1">
                  {calendarWeeks.map((week, i) => (
                    <div key={i} className="grid grid-cols-7 text-center">
                      {week.map(({ day, muted, dot, selected }, j) => (
                        <div key={j} className="flex flex-col items-center py-0.5">
                          <span
                            className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${
                              selected
                                ? "bg-blue-600 text-white font-semibold"
                                : muted
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            {day}
                          </span>
                          <span
                            className={`w-1 h-1 rounded-full mt-0.5 ${
                              dot ? dotColor[dot] : "bg-transparent"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
 
                <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Submitted
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Pending
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Not Started
                  </span>
                </div>
              </div>
 
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Lightbulb size={14} className="text-orange-400" />
                  <h3 className="text-sm font-semibold text-gray-800">Quick Tips</h3>
                </div>
                <ul className="space-y-2">
                  {quickTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
 
          {/* ===== Recent Diary Entries timeline ===== */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Recent Diary Entries</h3>
            <div className="flex flex-wrap lg:flex-nowrap items-start gap-2">
              {recentEntries.map(({ week, status, date, desc, color }, i) => (
                <div key={week} className="flex items-start flex-1 min-w-[150px]">
                  <div className="flex flex-col items-start">
                    <div
                      className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                        color === "green" ? "bg-green-50" : "bg-orange-50"
                      }`}
                    >
                      <FileText size={16} className={color === "green" ? "text-green-600" : "text-orange-500"} />
                    </div>
                    <p className="text-xs font-medium text-gray-700 mt-2">
                      {week}{" "}
                      <span className={color === "green" ? "text-green-600" : "text-orange-500"}>
                        {status}
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{date}</p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug max-w-[150px]">{desc}</p>
                  </div>
                  {i < recentEntries.length - 1 && (
                    <div className="hidden lg:block h-px bg-gray-200 flex-1 mt-4 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* ===== Footer ===== */}
        <footer className="border-t border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2025 AISC OJT Portal. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Use</a>
            <a href="#" className="hover:text-blue-600">Contact Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
 