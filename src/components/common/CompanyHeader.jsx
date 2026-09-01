import {
  Menu,
  Bell,
  Calendar,
  ChevronDown
} from 'lucide-react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import companyLogo from "../../assets/logohe.jpeg";

export default function CompanyHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="
        w-full
        h-[64px]
        shrink-0
        bg-white
        border-b
        border-slate-200
        shadow-[0_1px_5px_rgba(15,23,42,0.04)]
        flex
        items-center
        justify-between
        px-6
        sticky
        top-0
        z-20
      "
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        <Menu
          size={21}
          strokeWidth={1.8}
          className="text-slate-500"
        />

        <p className="text-sm font-semibold text-slate-700">
          A modern, clean and consistent design system for AISC OJT Portal
        </p>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATIONS */}
        <div
          className="flex items-center gap-2 text-slate-700 cursor-pointer"
          onClick={() => navigate("/notifications-settings")}
        >

          <div className="relative w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center">

            <Bell
              size={17}
              strokeWidth={1.8}
            />

            <span
              className="
                absolute
                top-1
                right-1
                w-2
                h-2
                bg-red-500
                rounded-full
                border-2
                border-white
              "
            />

          </div>

          <span className="text-sm font-semibold">
            Notifications
          </span>

        </div>


        {/* DIVIDER */}
        <div className="w-px h-7 bg-slate-200" />


        {/* DATE */}
        <div className="flex items-center gap-2">

          <Calendar
            size={17}
            strokeWidth={1.8}
            className="text-slate-500"
          />

          <div className="leading-tight">

            <p className="text-sm font-bold text-slate-800">
              16 July 2025
            </p>

            <p className="text-xs text-slate-400">
              Wednesday
            </p>

          </div>

        </div>


        {/* DIVIDER */}
        <div className="w-px h-7 bg-slate-200" />


        {/* COMPANY + DROPDOWN */}
        <div className="relative">

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 cursor-pointer"
          >

            {/* COMPANY LOGO */}
            <div
              className="
                w-9
                h-9
                rounded-full
                bg-blue-50
                flex
                items-center
                justify-center
                shrink-0
                overflow-hidden
              "
            >

              <img
                src={companyLogo}
                alt="ABC Technologies"
                className="w-8 h-8 object-contain"
              />

            </div>


            {/* COMPANY NAME */}
            <div className="leading-tight text-left">

              <p className="text-sm font-bold text-slate-800">
                ABC Technologies
              </p>

              <p className="text-xs text-slate-400">
                Company
              </p>

            </div>


            {/* CHEVRON */}
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${
                showMenu ? 'rotate-180' : ''
              }`}
            />

          </button>


          {/* DROPDOWN BOX */}
          {showMenu && (
            <div
              className="
                absolute
                right-0
                top-12
                w-48
                bg-white
                rounded-xl
                border
                border-slate-200
                shadow-lg
                py-2
                z-50
              "
            >

              <div className="px-4 py-2 border-b border-slate-100">

                <p className="text-sm font-semibold text-slate-800">
                  ABC Technologies
                </p>

                <p className="text-xs text-slate-400">
                  Company Account
                </p>

              </div>


              {/* PROFILE */}
              <button
                onClick={() => {
                  navigate("/company-profile");
                  setShowMenu(false);
                }}
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  text-sm
                  text-slate-700
                  hover:bg-slate-50
                  transition-colors
                "
              >
                Profile
              </button>


              {/* SETTINGS */}
              <button
                onClick={() => {
                  navigate("/notifications-settings");
                  setShowMenu(false);
                }}
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  text-sm
                  text-slate-700
                  hover:bg-slate-50
                  transition-colors
                "
              >
                Settings
              </button>


              {/* LOGOUT */}
              <button
                onClick={() => {
                  setShowMenu(false);
                }}
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  text-sm
                  text-red-600
                  hover:bg-red-50
                  transition-colors
                "
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}