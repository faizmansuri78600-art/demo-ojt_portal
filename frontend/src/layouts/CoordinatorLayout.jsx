import { useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import CoSidebar from "../components/common/CoSidebar";
import CoTopNavbar from "../components/common/CoTopNavbar";
import Footer from "../components/common/Footer";

import {
  CoordinatorThemeProvider,
  useCoordinatorTheme,
} from "../context/CoordinatorThemeContext";

function CoordinatorWorkspace() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    darkMode,
    toggleTheme,
    colors,
  } = useCoordinatorTheme();

  const sidebarWidth = sidebarCollapsed
    ? 76
    : 260;

  const handleNavigation = (path) => {
    navigate(path);
    setMobileSidebarOpen(false);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: colors.workspace,
        color: colors.text,
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        letterSpacing: "-0.01em",
        transition:
          "background-color 200ms ease, color 200ms ease",
      }}
    >
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <div className="hidden lg:block">
        <CoSidebar
          collapsed={sidebarCollapsed}
          activePath={location.pathname}
          onCollapse={() =>
            setSidebarCollapsed(
              (value) => !value
            )
          }
          onNavigate={handleNavigation}
        />
      </div>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            backgroundColor:
              "rgba(15, 23, 42, 0.45)",
          }}
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
        <CoSidebar
          collapsed={false}
          activePath={location.pathname}
          onCollapse={() =>
            setMobileSidebarOpen(false)
          }
          onNavigate={handleNavigation}
        />
      </div>

      {/* =====================================================
          MAIN APPLICATION AREA
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* =================================================
            TOP NAVBAR
        ================================================== */}
        <CoTopNavbar
          onMenuClick={() =>
            setMobileSidebarOpen(true)
          }
          darkMode={darkMode}
          onThemeToggle={toggleTheme}
        />

        {/* =================================================
            PAGE CONTENT
        ================================================== */}
        <main
          style={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            padding: "24px",
            boxSizing: "border-box",
            overflowX: "hidden",
            flex: 1,
            backgroundColor: colors.workspace,
            transition:
              "background-color 200ms ease",
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
            <Outlet />
          </div>
        </main>

        {/* =================================================
            FOOTER
        ================================================== */}
        <Footer />
      </div>
    </div>
  );
}

export default function CoordinatorLayout() {
  return (
    <CoordinatorThemeProvider>
      <CoordinatorWorkspace />
    </CoordinatorThemeProvider>
  );
}