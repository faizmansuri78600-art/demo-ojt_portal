import {
  LayoutDashboard,
  User,
  Search,
  FileText,
  Briefcase,
  Clock,
  BookOpen,
  ClipboardList,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Headphones,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },

  // My Profile routing
  { label: "My Profile", icon: User, path: "/student/profile" },

  {
    label: "Browse OJT Opportunities",
    icon: Search,
    path: "/student/browse-ojt",
  },
  { label: "My Applications", icon: FileText, path: "/student/MyApplication" },
  
  { label: "Assigned OJT", icon: Briefcase, path: "/student/assigned-ojt" },
  { label: "Attendance", icon: Clock, path: "/student/attendance" },
  { label: "Weekly Diary", icon: BookOpen, path: "/student/weekly-diary" },
  { label: "Reports", icon: ClipboardList, path: "/student/reports" },
  { label: "Certificates", icon: Award, path: "/student/certificates" },
  { label: "Feedback", icon: MessageSquare, path: "/student/feedback" },
  { label: "Settings", icon: Settings, path: "/student/settings" },
];

// Pass activePage from the parent page
export default function Sidebar({
  activePage = "",
}) {
  const location = useLocation();

  return (
    <aside className="fixed top-16 left-0 bottom-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="py-4">
        <ul className="space-y-1">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive =
  location.pathname === path || label === activePage;

            return (
              <li key={label}>
                <Link
                  to={path}
                  className={`w-[calc(100%-16px)] flex items-center gap-3 mx-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-gray-200 mt-2 pt-2">
          <button className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 w-[calc(100%-16px)]">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* Need Help card */}
      <div className="m-3 mb-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center mb-2">
          <Headphones size={18} className="text-white" />
        </div>

        <p className="text-sm font-semibold text-gray-800">
          Need Help?
        </p>

        <p className="text-xs text-gray-500 mt-1 mb-3">
          If you face any issues, contact support team.
        </p>

        <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700">
          Contact Support
        </button>
      </div>
    </aside>
  );
}