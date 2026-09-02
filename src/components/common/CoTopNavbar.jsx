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
    <header className="top-navbar">
      {/* LEFT SIDE */}
      <div className="top-navbar-left">
        {/* Mobile menu */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-main">
            AISC OJT PORTAL
          </span>

          <span className="breadcrumb-separator">
            /
          </span>

          <strong>
            Dashboard
          </strong>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="top-navbar-right">
        {/* Search */}
        <button
          type="button"
          className="search-box"
          aria-label="Search"
        >
          <span className="search-box-content">
            <Search size={18} />
            <span>Search</span>
          </span>

          <kbd>Ctrl K</kbd>
        </button>

        {/* Theme */}
        <button
          type="button"
          className="navbar-icon-button"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        {/* Notification */}
        <button
          type="button"
          className="navbar-icon-button"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="notification-dot" />
        </button>

        <div className="navbar-divider" />

        {/* Profile */}
        <button
          type="button"
          className="profile-button"
          aria-label="Profile"
        >
          <div className="profile-avatar">
            SB
          </div>

          <div className="profile-info">
            <strong>
              Safwan Baduda
            </strong>

            <span>
              OJT Coordinator
            </span>
          </div>

          <ChevronDown
            size={16}
            color="#94a3b8"
          />
        </button>
      </div>
    </header>
  );
}