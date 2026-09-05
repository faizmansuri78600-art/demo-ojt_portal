import React from "react";
import MyAvtar from "../../assets/images/Myavtar.jpg";
import {
  Menu,
  Search,
  Bell,
  Mail,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#172554] text-white flex items-center px-5 gap-5">
      {/* Logo + Menu */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center ring-2 ring-white/20">
            <GraduationCap
              size={20}
              className="text-[#0B1B4D]"
            />
          </div>

          <span className="text-white font-bold text-lg tracking-wide whitespace-nowrap">
            AISC OJT PORTAL
          </span>
        </div>

        <button className="text-white/80 hover:text-white">
          <Menu size={22} />
        </button>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search opportunities, companies..."
            className="w-full h-10 rounded-lg bg-white pl-4 pr-10 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6 ml-auto">
        <button className="relative text-white/90 hover:text-white">
          <Bell size={22} />

          <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold leading-none rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        <button className="relative text-white/90 hover:text-white">
          <Mail size={22} />

          <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold leading-none rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <img
            src={MyAvtar}
            alt="Ayesha Shaikh"
            className="w-9 h-9 rounded-full object-cover"
          />

          <div className="leading-tight">
            <p className="text-white text-sm font-semibold">
              Ayesha Shaikh
            </p>

            <p className="text-white/60 text-[11px]">
              TY BCA Student
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-white/70"
          />
        </div>
      </div>
    </header>
  );
}