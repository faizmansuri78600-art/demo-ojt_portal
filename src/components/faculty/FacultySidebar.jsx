import React from "react";
import { NavLink } from "react-router-dom";

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h4v-6h6v6h4a1 1 0 001-1V10" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-4a4 4 0 100-8 4 4 0 000 8zm6 4a4 4 0 00-3-3.87" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h6M5 5h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
  </svg>
);

const DiaryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.5c-1.5-1-4-1.5-6-1.5v13c2 0 4.5.5 6 1.5m0-13c1.5-1 4-1.5 6-1.5v13c-2 0-4.5.5-6 1.5m0-13v13"
    />
  </svg>
);

const EvaluationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 9l2 2 4-4" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const navItems = [
  { path: "/faculty", label: "Dashboard", icon: HomeIcon },
  { path: "/faculty/AssignedStudents", label: "Assigned Students", icon: UsersIcon },
  { path: "/faculty/StudentDetails", label: "Student Detail", icon: EyeIcon },
  { path: "/faculty/ReviewReports", label: "Review Reports & Weekly Diary", icon: ReportIcon },
  { path: "/faculty/ApproveDiary", label: "Approve Diary", icon: DiaryIcon },
  { path: "/faculty/Evaluation", label: "Evaluation", icon: EvaluationIcon },
];

const FacultySidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between min-h-[calc(100vh-64px)]">
      <nav className="p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
           `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
            isActive ? "bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
          >
              <Icon />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </nav>

      <div className="p-4">
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-4 text-center">
          <p className="font-semibold text-gray-800 text-sm">AISC OJT Portal</p>
          <p className="text-xs text-gray-500 mt-1">
            Empowering OJT management with simplicity and efficiency.
          </p>
          <div className="mt-3 text-4xl">🧑‍💻🛡️👩‍💻</div>
        </div>
      </div>
    </aside>
  );
};
export default FacultySidebar;