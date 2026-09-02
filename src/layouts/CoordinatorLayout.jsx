import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CoSidebar from "../components/common/CoSidebar";
import CoTopNavbar from "../components/common/CoTopNavbar";

export default function CoordinatorLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const sidebarWidth = sidebarCollapsed ? 76 : 260;

  const handleNavigation = (path) => {
    navigate(path);
    setMobileSidebarOpen(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          backgroundColor: "#f8fafc",
          color: "#0f172a",
        }}
      >
        {/* =====================================================
            DESKTOP SIDEBAR
        ====================================================== */}
        <div className="hidden lg:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            activePath={location.pathname}
            onCollapse={() =>
              setSidebarCollapsed((value) => !value)
            }
            onNavigate={handleNavigation}
          />
        </div>

        {/* =====================================================
            MOBILE OVERLAY
        ====================================================== */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
          />
        )}

        {/* =====================================================
            MOBILE SIDEBAR
        ====================================================== */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <Sidebar
            collapsed={false}
            activePath={location.pathname}
            onCollapse={() =>
              setMobileSidebarOpen(false)
            }
            onNavigate={handleNavigation}
          />
        </div>

        {/* =====================================================
            MAIN APPLICATION
        ====================================================== */}
        <div
          style={{
            width: `calc(100% - ${sidebarWidth}px)`,
            minHeight: "100vh",
            marginLeft: `${sidebarWidth}px`,
            transition:
              "margin-left 250ms ease, width 250ms ease",
            boxSizing: "border-box",
            overflowX: "hidden",
          }}
        >
          <TopNavbar
            onMenuClick={() =>
              setMobileSidebarOpen(true)
            }
            darkMode={darkMode}
            onThemeToggle={() =>
              setDarkMode((value) => !value)
            }
          />

          {/* =================================================
              CONTENT
          ================================================== */}
          <main
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
              padding: "24px",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1600px",
                minWidth: 0,
                margin: "0 auto",
                boxSizing: "border-box",
              }}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}