import {
  House,
  Building2,
  Briefcase,
  Users,
  ClipboardCheck,
  Settings,
  LogOut,
  Headphones,
} from 'lucide-react';

import logo from "../../assets/aisc-logo.png";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: House, label: 'Dashboard' },
  { icon: Building2, label: 'Company Profile' },
  { icon: Briefcase, label: 'Manage OJT Opportunities' },
  { icon: Users, label: 'Applications & Students' },
  { icon: ClipboardCheck, label: 'Attendance' },
 // { icon: SquareStar, label: 'Evaluation' },
  { icon: ClipboardCheck, label: 'Certificate' },
  { icon: Settings, label: 'Notifications & Settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-[250px] min-h-screen bg-[#0B3091] flex flex-col px-4 py-5 text-white shrink-0">

      {/* LOGO */}
      <div className="flex items-center gap-3 px-1 mb-8">

        <img
          src={logo}
          alt="AISC OJT Portal"
          className="w-11 h-11 object-contain"
        />

        <div>
          <h1 className="text-[15px] font-bold leading-tight">
            AISC OJT PORTAL
          </h1>

          <p className="text-[9px] uppercase tracking-wide opacity-70">
            Design System
          </p>
        </div>

      </div>


      {/* COMPANY MODULE */}
      <div>

        <p className="text-[10px] uppercase tracking-wider opacity-60 mb-4 px-1">
          Company Module
        </p>


        {/* MAIN MENU */}
        <nav className="flex flex-col gap-2">

          {menuItems.map(({ icon: Icon, label }) => {

            const currentPath = window.location.pathname;

            const isActive =
              (label === "ComapnyDashboard" && currentPath === "/company/CompanyDashboard") ||
              (label === "Company Profile" && currentPath === "/company-profile") ||
              (label === "Manage OJT Opportunities" && currentPath === "/manage-ojt-opportunities") ||
              (label === "Certificate" && currentPath === "/certificate") ||
              (label === "Notifications & Settings" && currentPath === "/notifications-settings");

            return (
              <div
                key={label}

                onClick={() => {

                  if (label === "Dashboard") {
                    navigate("/company/CompanyDashboard");
                  }

                  if (label === "Company Profile") {
                    navigate("/company/company-profile");
                  }

                  if (label === "Manage OJT Opportunities") {
                    navigate("/company/manage-ojt-opportunities");
                  }

                  if (label === "Certificate") {
                    navigate("/company/certificate");
                  }

                  if (label === "Notifications & Settings") {
                    navigate("/company/notifications-settings");
                  }

                }}

                className={`
                  flex
                  items-center
                  gap-4
                  min-h-[48px]
                  px-4
                  rounded-xl
                  cursor-pointer
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#1E5EFF] text-white"
                      : "text-white hover:bg-[#1634AA]"
                  }
                `}
              >

                <Icon
                  size={19}
                  strokeWidth={1.8}
                />

                <span>
                  {label}
                </span>

              </div>
            );
          })}

        </nav>


        {/* LOGOUT */}
        <div className="mt-4">

          <div
            className="
              flex
              items-center
              gap-4
              min-h-[48px]
              px-4
              rounded-xl
              cursor-pointer
              text-[13px]
              font-medium
              hover:bg-[#1634AA]
              transition-all
              duration-200
            "
          >

            <LogOut
              size={19}
              strokeWidth={1.8}
            />

            <span>
              Logout
            </span>

          </div>

        </div>

      </div>


      {/* SPACE BEFORE HELP */}
      <div className="flex-1 min-h-[35px]" />


      {/* NEED HELP */}
      <div className="bg-[#1634AA] rounded-[18px] p-4">

        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">

          <Headphones
            size={20}
          />

        </div>

        <p className="text-[12px] leading-snug mb-4">
          Need Help? We're here to help you.
        </p>

        <button
          className="
            w-full
            bg-white
            text-[#0B3091]
            text-[12px]
            font-medium
            px-3
            py-2.5
            rounded-lg
            hover:bg-slate-100
            transition-colors
          "
        >
          Contact Support →
        </button>

      </div>

    </aside>
  );
}