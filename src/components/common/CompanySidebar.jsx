import {
  House,
  Building2,
  Briefcase,
  Users,
  ClipboardCheck,
  // SquareStar,
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
  { icon: Settings, label: 'Notifications and Settings' },
];

export default function CompanySidebar() {
  const navigate = useNavigate();

  return (
    // CHANGE 1: "sticky top-0 h-screen" instead of "min-h-screen" — this keeps the
    // sidebar pinned to the viewport while scrolling, but (unlike position:fixed)
    // it still reserves its own width in the flex layout, so page content next to
    // it is never able to slide underneath it.
    <aside className="w-[250px] h-screen sticky top-0 bg-[#0B3091] flex flex-col px-4 py-5 text-white shrink-0">

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
              (label === "Dashboard" && currentPath === "/company/CompanyDashboard") ||
              (label === "Company Profile" && currentPath === "/company/company-profile") ||
              (label === "Manage OJT Opportunities" && currentPath === "/company/manage-ojt-opportunities") ||
              (label === "Certificate" && currentPath === "/company/certificate") ||
              (label === "Notifications and Settings" && currentPath === "/company/notifications-settings");

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

                  if (label === "Notifications and Settings") {
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


      {/* CHANGE 3: replaced the flex-1 growing spacer with "mt-auto" on the card
          itself — it still gets pushed to the bottom of the sidebar, but "mb-2"
          stops it from sitting flush against the very bottom edge, and the
          padding/icon size are bumped up so the card reads a bit bigger. */}

      {/* NEED HELP */}
      <div className="mt-auto mb-2 bg-[#1634AA] rounded-[18px] p-5">

        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">

          <Headphones
            size={22}
          />

        </div>

        <p className="text-[13px] leading-snug mb-4">
          Need Help? We're here to help you.
        </p>

        <button
          className="
            w-full
            bg-white
            text-[#0B3091]
            text-[13px]
            font-medium
            px-3
            py-3
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