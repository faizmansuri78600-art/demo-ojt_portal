import {
  Search,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

export default function CoTopNavbar({
  onMenuClick,
  darkMode = false,
  onThemeToggle,
}) {
  return (
    <header
      className="w-full h-[80px] bg-white border-b border-slate-200 flex items-center justify-between px-6 relative z-30"
    >
      {/* =====================================================
          LEFT SIDE
      ====================================================== */}
      <div className="flex items-center gap-5 min-w-0">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition"
        >
          <Menu size={22} />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-sm font-medium text-slate-500">
            AISC OJT
          </span>

          <span className="text-slate-300 text-lg">
            /
          </span>

          <span className="text-sm font-semibold text-slate-900">
            Coordinator Dashboard
          </span>
        </div>
      </div>


      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}
      <div className="flex items-center gap-3">

        {/* =================================================
            SEARCH
        ================================================== */}
        <button
          type="button"
          aria-label="Search"
          className="hidden md:flex items-center justify-between w-[215px] h-[44px] px-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition"
        >
          <span className="flex items-center gap-2 text-slate-400">
            <Search size={18} />

            <span className="text-sm">
              Search
            </span>
          </span>

          <kbd className="text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-md px-2 py-1">
            Ctrl K
          </kbd>
        </button>


        {/* =================================================
            THEME BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>


        {/* =================================================
            NOTIFICATION
        ================================================== */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
        >
          <Bell size={20} />

          <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>


        {/* =================================================
            DIVIDER
        ================================================== */}
        <div className="hidden sm:block h-8 w-px bg-slate-200 mx-2" />


        {/* =================================================
            PROFILE
        ================================================== */}
        <button
          type="button"
          aria-label="Profile"
          className="flex items-center gap-3 h-12 px-2 rounded-xl hover:bg-slate-50 transition"
        >

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
            SB
          </div>


          {/* Profile Information */}
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold text-slate-900">
              Safwan Baduda
            </span>

            <span className="text-xs text-slate-500 mt-1">
              OJT Coordinator
            </span>
          </div>


          {/* Dropdown */}
          <ChevronDown
            size={16}
            className="text-slate-400"
          />

        </button>

      </div>
    </header>
  );
}