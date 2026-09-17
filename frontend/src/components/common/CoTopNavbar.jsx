import { useEffect, useRef, useState } from "react";
import {
  Search,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  Menu,
  LayoutDashboard,
  Users,
  Building2,
  UserRoundCog,
  ClipboardCheck,
  Megaphone,
  FileText,
  UserCircle,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useCoordinatorTheme,
} from "../../context/CoordinatorThemeContext";

const pageTitles = {
  "/coordinator/dashboard": {
    title: "Dashboard",
    description:
      "Overview of your college OJT program",
  },

  "/coordinator/students": {
    title: "Student Management",
    description:
      "Manage, verify and maintain student records",
  },

  "/coordinator/companies": {
    title: "Company Management",
    description:
      "Manage companies and OJT opportunities",
  },

  "/coordinator/mentors": {
    title: "Mentor Assignment",
    description:
      "Assign and manage faculty OJT mentors",
  },

  "/coordinator/tracking": {
    title: "OJT Tracking",
    description:
      "Monitor student OJT progress and attendance",
  },

  "/coordinator/announcements": {
    title: "Announcements",
    description:
      "Manage OJT announcements and communication",
  },

  "/coordinator/reports": {
    title: "Generate Reports",
    description:
      "View and generate OJT program reports",
  },
};

const searchItems = [
  {
    label: "Dashboard",
    description: "View OJT program overview",
    path: "/coordinator/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Student Management",
    description: "Manage student records",
    path: "/coordinator/students",
    icon: Users,
  },
  {
    label: "Company Management",
    description: "Manage companies",
    path: "/coordinator/companies",
    icon: Building2,
  },
  {
    label: "Mentor Assignment",
    description: "Assign faculty mentors",
    path: "/coordinator/mentors",
    icon: UserRoundCog,
  },
  {
    label: "OJT Tracking",
    description: "Track student OJT progress",
    path: "/coordinator/tracking",
    icon: ClipboardCheck,
  },
  {
    label: "Announcements",
    description: "Manage announcements",
    path: "/coordinator/announcements",
    icon: Megaphone,
  },
  {
    label: "Generate Reports",
    description: "View OJT reports",
    path: "/coordinator/reports",
    icon: FileText,
  },
];

export default function CoTopNavbar({
  onMenuClick,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    darkMode,
    toggleTheme,
    colors,
  } = useCoordinatorTheme();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [quickActionOpen, setQuickActionOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const quickActionRef = useRef(null);
  const profileRef = useRef(null);

  const currentPage =
    pageTitles[location.pathname] || {
      title: "College Coordinator",
      description:
        "Manage and monitor the OJT program",
    };

  const filteredSearchItems =
    searchItems.filter((item) => {
      const query =
        searchValue.trim().toLowerCase();

      if (!query) {
        return true;
      }

      return (
        item.label
          .toLowerCase()
          .includes(query) ||
        item.description
          .toLowerCase()
          .includes(query)
      );
    });

  /* =========================================================
     OUTSIDE CLICK
  ========================================================== */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target
        )
      ) {
        setSearchOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setNotificationOpen(false);
      }

      if (
        quickActionRef.current &&
        !quickActionRef.current.contains(
          event.target
        )
      ) {
        setQuickActionOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     KEYBOARD SHORTCUTS
  ========================================================== */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationOpen(false);
        setQuickActionOpen(false);
        setProfileOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setSearchOpen(true);

        setTimeout(() => {
          const input =
            searchRef.current?.querySelector(
              "input"
            );

          input?.focus();
        }, 50);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* =========================================================
     NAVIGATION
  ========================================================== */
  const handleNavigation = (path) => {
    navigate(path);

    setSearchOpen(false);
    setSearchValue("");
    setNotificationOpen(false);
    setQuickActionOpen(false);
    setProfileOpen(false);
  };

  /* =========================================================
     QUICK ACTIONS
  ========================================================== */
  const quickActions = [
    {
      label: "Add Student",
      description:
        "Create a new student record",
      icon: Users,
      path: "/coordinator/students",
    },
    {
      label: "Add Company",
      description:
        "Register a new company",
      icon: Building2,
      path: "/coordinator/companies",
    },
    {
      label: "Assign Mentor",
      description:
        "Assign faculty to a student",
      icon: UserRoundCog,
      path: "/coordinator/mentors",
    },
    {
      label: "Create Announcement",
      description:
        "Publish a new announcement",
      icon: Megaphone,
      path: "/coordinator/announcements",
    },
  ];

  /* =========================================================
     TOPBAR COLORS
  ========================================================== */
  const navigationBlue =
    colors.sidebar;

  const navigationText =
    "#FFFFFF";

  const navigationSecondary =
    darkMode
      ? "rgba(255,255,255,0.68)"
      : "rgba(255,255,255,0.72)";

  const navigationBorder =
    "rgba(255,255,255,0.16)";

  const navigationHover =
    "rgba(255,255,255,0.10)";

  /* =========================================================
     SHARED BUTTON STYLE
  ========================================================== */
  const iconButtonStyle = {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border:
      `1px solid ${navigationBorder}`,
    borderRadius: "10px",
    backgroundColor:
      "rgba(255,255,255,0.07)",
    color: navigationText,
    cursor: "pointer",
    transition:
      "background-color 180ms ease, border-color 180ms ease",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    zIndex: 10000,
    width: "330px",
    backgroundColor: colors.surface,
    border:
      `1px solid ${colors.border}`,
    borderRadius: "14px",
    boxShadow: darkMode
      ? "0 18px 45px rgba(0,0,0,0.35)"
      : "0 18px 45px rgba(15,23,42,0.16)",
    overflow: "hidden",
  };

  return (
    <>
      <style>
        {`
          .co-topbar-icon-button:hover {
            background-color: ${navigationHover};
            border-color: rgba(255,255,255,0.28);
          }

          .co-topbar-mobile-menu:hover {
            background-color: ${navigationHover};
          }

          .co-topbar-search-item:hover {
            background-color: ${colors.surfaceMuted};
          }

          .co-topbar-dropdown-item:hover {
            background-color: ${colors.surfaceMuted};
          }

          .co-topbar-quick-item:hover {
            background-color: ${colors.primarySoft};
          }

          .co-topbar-profile-item:hover {
            background-color: ${colors.surfaceMuted};
          }

          .co-topbar-search-input::placeholder {
            color: rgba(255,255,255,0.62);
          }

          @media (max-width: 1023px) {
            .co-topbar-page-info {
              display: none;
            }

            .co-topbar-mobile-menu {
              display: flex;
            }
          }

          @media (max-width: 767px) {
            .co-topbar-search-wrapper {
              display: none;
            }

            .co-topbar-actions {
              gap: 6px;
            }

            .co-topbar-quick-action {
              display: none;
            }

            .co-topbar-profile-details {
              display: none;
            }

            .co-topbar-profile-button {
              padding: 0;
              width: 40px;
              justify-content: center;
            }

            .co-topbar-profile-chevron {
              display: none;
            }

            .co-topbar-dropdown {
              width: calc(100vw - 32px);
              max-width: 340px;
              right: -5px;
            }
          }
        `}
      </style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          height: "72px",
          minHeight: "72px",
          display: "flex",
          alignItems: "center",
          backgroundColor:
            navigationBlue,
          color: "#ffffff",
          borderBottom:
            `1px solid ${navigationBorder}`,
          boxSizing: "border-box",
          transition:
            "background-color 200ms ease",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "18px",
            padding:
              "0 clamp(16px, 2.2vw, 32px)",
            boxSizing: "border-box",
          }}
        >
          {/* =================================================
              LEFT
          ================================================== */}
          <div
            style={{
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: "13px",
            }}
          >
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open navigation menu"
              className="co-topbar-mobile-menu"
              style={{
                ...iconButtonStyle,
                display: "none",
              }}
            >
              <Menu
                size={20}
                strokeWidth={2}
              />
            </button>

            {/* Page Information */}
            <div
              className="co-topbar-page-info"
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color:
                      navigationSecondary,
                    whiteSpace: "nowrap",
                  }}
                >
                  College Coordinator
                </span>

                <span
                  style={{
                    color:
                      "rgba(255,255,255,0.35)",
                    fontSize: "13px",
                  }}
                >
                  /
                </span>

                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color:
                      navigationSecondary,
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentPage.title}
                </span>
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "17px",
                  lineHeight: "22px",
                  fontWeight: 700,
                  color:
                    navigationText,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentPage.title}
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT
          ================================================== */}
          <div
            className="co-topbar-actions"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* =================================================
                SEARCH
            ================================================== */}
            <div
              ref={searchRef}
              className="co-topbar-search-wrapper"
              style={{
                position: "relative",
                width: "250px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "0 12px",
                  border:
                    `1px solid ${
                      searchOpen
                        ? "rgba(255,255,255,0.55)"
                        : navigationBorder
                    }`,
                  borderRadius: "10px",
                  backgroundColor:
                    "rgba(255,255,255,0.08)",
                  boxSizing: "border-box",
                  transition:
                    "border-color 180ms ease, background-color 180ms ease",
                }}
              >
                <Search
                  size={17}
                  strokeWidth={2}
                  color={
                    "rgba(255,255,255,0.72)"
                  }
                  style={{
                    flexShrink: 0,
                  }}
                />

                <input
                  className="co-topbar-search-input"
                  type="text"
                  value={searchValue}
                  onFocus={() =>
                    setSearchOpen(true)
                  }
                  onChange={(event) => {
                    setSearchValue(
                      event.target.value
                    );
                    setSearchOpen(true);
                  }}
                  placeholder="Search..."
                  aria-label="Search"
                  style={{
                    width: "100%",
                    minWidth: 0,
                    border: "none",
                    outline: "none",
                    backgroundColor:
                      "transparent",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontFamily: "inherit",
                  }}
                />

                <span
                  style={{
                    flexShrink: 0,
                    padding: "3px 6px",
                    border:
                      "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "5px",
                    color:
                      "rgba(255,255,255,0.60)",
                    fontSize: "10px",
                    fontWeight: 600,
                    lineHeight: "12px",
                    backgroundColor:
                      "rgba(255,255,255,0.05)",
                  }}
                >
                  Ctrl K
                </span>
              </div>

              {searchOpen && (
                <div
                  className="co-topbar-dropdown"
                  style={{
                    ...dropdownStyle,
                    left: 0,
                    right: "auto",
                    width: "350px",
                  }}
                >
                  <div
                    style={{
                      padding:
                        "13px 15px 10px",
                      borderBottom:
                        `1px solid ${colors.border}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          "0.08em",
                        color:
                          colors.textMuted,
                      }}
                    >
                      Navigation
                    </div>
                  </div>

                  <div
                    style={{
                      maxHeight: "390px",
                      overflowY: "auto",
                      padding: "7px",
                    }}
                  >
                    {filteredSearchItems.length >
                    0 ? (
                      filteredSearchItems.map(
                        (item) => {
                          const Icon =
                            item.icon;

                          return (
                            <button
                              key={item.path}
                              type="button"
                              className="co-topbar-search-item"
                              onClick={() =>
                                handleNavigation(
                                  item.path
                                )
                              }
                              style={{
                                width: "100%",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: "11px",
                                padding:
                                  "10px",
                                border: "none",
                                borderRadius:
                                  "9px",
                                backgroundColor:
                                  "transparent",
                                color:
                                  colors.text,
                                textAlign:
                                  "left",
                                cursor:
                                  "pointer",
                                boxSizing:
                                  "border-box",
                              }}
                            >
                              <div
                                style={{
                                  width:
                                    "34px",
                                  height:
                                    "34px",
                                  minWidth:
                                    "34px",
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "center",
                                  borderRadius:
                                    "8px",
                                  backgroundColor:
                                    colors.primarySoft,
                                  color:
                                    colors.primary,
                                }}
                              >
                                <Icon
                                  size={17}
                                  strokeWidth={2}
                                />
                              </div>

                              <div
                                style={{
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    fontSize:
                                      "13px",
                                    fontWeight:
                                      600,
                                    color:
                                      colors.text,
                                  }}
                                >
                                  {item.label}
                                </div>

                                <div
                                  style={{
                                    marginTop:
                                      "2px",
                                    fontSize:
                                      "11px",
                                    color:
                                      colors.textSecondary,
                                  }}
                                >
                                  {
                                    item.description
                                  }
                                </div>
                              </div>
                            </button>
                          );
                        }
                      )
                    ) : (
                      <div
                        style={{
                          padding:
                            "25px 15px",
                          textAlign:
                            "center",
                          color:
                            colors.textSecondary,
                          fontSize:
                            "13px",
                        }}
                      >
                        No pages found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                QUICK ACTION
            ================================================== */}
            <div
              ref={quickActionRef}
              className="co-topbar-quick-action"
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setQuickActionOpen(
                    (value) => !value
                  );
                  setNotificationOpen(false);
                  setProfileOpen(false);
                }}
                className="co-topbar-icon-button"
                style={iconButtonStyle}
                aria-label="Quick actions"
                title="Quick actions"
              >
                <Plus
                  size={19}
                  strokeWidth={2.2}
                />
              </button>

              {quickActionOpen && (
                <div
                  className="co-topbar-dropdown"
                  style={dropdownStyle}
                >
                  <div
                    style={{
                      padding:
                        "14px 16px 12px",
                      borderBottom:
                        `1px solid ${colors.border}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color:
                          colors.text,
                      }}
                    >
                      Quick Actions
                    </div>

                    <div
                      style={{
                        marginTop: "3px",
                        fontSize: "11px",
                        color:
                          colors.textSecondary,
                      }}
                    >
                      Common coordinator tasks
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "7px",
                    }}
                  >
                    {quickActions.map(
                      (action) => {
                        const Icon =
                          action.icon;

                        return (
                          <button
                            key={action.label}
                            type="button"
                            className="co-topbar-quick-item"
                            onClick={() =>
                              handleNavigation(
                                action.path
                              )
                            }
                            style={{
                              width: "100%",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "11px",
                              padding:
                                "10px",
                              border: "none",
                              borderRadius:
                                "9px",
                              backgroundColor:
                                "transparent",
                              color:
                                colors.text,
                              cursor:
                                "pointer",
                              textAlign:
                                "left",
                            }}
                          >
                            <div
                              style={{
                                width:
                                  "34px",
                                height:
                                  "34px",
                                minWidth:
                                  "34px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                borderRadius:
                                  "8px",
                                backgroundColor:
                                  colors.primarySoft,
                                color:
                                  colors.primary,
                              }}
                            >
                              <Icon
                                size={17}
                                strokeWidth={2}
                              />
                            </div>

                            <div
                              style={{
                                minWidth: 0,
                              }}
                            >
                              <div
                                style={{
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    600,
                                  color:
                                    colors.text,
                                }}
                              >
                                {
                                  action.label
                                }
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "2px",
                                  fontSize:
                                    "10px",
                                  color:
                                    colors.textSecondary,
                                }}
                              >
                                {
                                  action.description
                                }
                              </div>
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                THEME TOGGLE
            ================================================== */}
            <button
              type="button"
              onClick={toggleTheme}
              className="co-topbar-icon-button"
              style={iconButtonStyle}
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun
                  size={18}
                  strokeWidth={2}
                />
              ) : (
                <Moon
                  size={18}
                  strokeWidth={2}
                />
              )}
            </button>

            {/* =================================================
                NOTIFICATIONS
            ================================================== */}
            <div
              ref={notificationRef}
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setNotificationOpen(
                    (value) => !value
                  );
                  setQuickActionOpen(false);
                  setProfileOpen(false);
                }}
                className="co-topbar-icon-button"
                style={{
                  ...iconButtonStyle,
                  position: "relative",
                }}
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell
                  size={18}
                  strokeWidth={2}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "7px",
                    right: "7px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor:
                      "#F87171",
                    border:
                      "2px solid #1E4D7B",
                    boxSizing:
                      "content-box",
                  }}
                />
              </button>

              {notificationOpen && (
                <div
                  className="co-topbar-dropdown"
                  style={dropdownStyle}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "space-between",
                      padding:
                        "14px 16px 12px",
                      borderBottom:
                        `1px solid ${colors.border}`,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize:
                            "14px",
                          fontWeight: 700,
                          color:
                            colors.text,
                        }}
                      >
                        Notifications
                      </div>

                      <div
                        style={{
                          marginTop:
                            "3px",
                          fontSize:
                            "11px",
                          color:
                            colors.textSecondary,
                        }}
                      >
                        Recent coordinator updates
                      </div>
                    </div>

                    <span
                      style={{
                        padding:
                          "3px 7px",
                        borderRadius:
                          "999px",
                        backgroundColor:
                          colors.primarySoft,
                        color:
                          colors.primary,
                        fontSize:
                          "10px",
                        fontWeight: 700,
                      }}
                    >
                      3 New
                    </span>
                  </div>

                  <NotificationItem
                    icon={
                      <Building2 size={16} />
                    }
                    title="Company approval pending"
                    description="A company registration requires review."
                    background={
                      colors.warningSoft
                    }
                    iconColor={
                      colors.warning
                    }
                    colors={colors}
                  />

                  <NotificationItem
                    icon={
                      <Users size={16} />
                    }
                    title="Student records updated"
                    description="New student records are available."
                    background={
                      colors.infoSoft
                    }
                    iconColor={
                      colors.info
                    }
                    colors={colors}
                  />

                  <NotificationItem
                    icon={
                      <ClipboardCheck size={16} />
                    }
                    title="OJT progress updated"
                    description="Student OJT tracking has new activity."
                    background={
                      colors.successSoft
                    }
                    iconColor={
                      colors.success
                    }
                    colors={colors}
                    last
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(
                        false
                      )
                    }
                    style={{
                      width: "100%",
                      height: "38px",
                      border: "none",
                      borderTop:
                        `1px solid ${colors.border}`,
                      backgroundColor:
                        colors.surfaceMuted,
                      color:
                        colors.primary,
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor:
                        "pointer",
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </div>

            {/* =================================================
                PROFILE
            ================================================== */}
            <div
              ref={profileRef}
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(
                    (value) => !value
                  );
                  setNotificationOpen(false);
                  setQuickActionOpen(false);
                }}
                className="co-topbar-profile-button"
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "0 8px 0 5px",
                  border:
                    `1px solid ${navigationBorder}`,
                  borderRadius: "10px",
                  backgroundColor:
                    "rgba(255,255,255,0.07)",
                  color: "#ffffff",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "31px",
                    height: "31px",
                    minWidth: "31px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor:
                      "rgba(255,255,255,0.16)",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: 800,
                  }}
                >
                  SB
                </div>

                <div
                  className="co-topbar-profile-details"
                  style={{
                    textAlign: "left",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      lineHeight: "14px",
                      fontWeight: 700,
                      color: "#ffffff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Safwan Baduda
                  </div>

                  <div
                    style={{
                      marginTop: "1px",
                      fontSize: "9px",
                      lineHeight: "12px",
                      color:
                        navigationSecondary,
                      whiteSpace: "nowrap",
                    }}
                  >
                    College Coordinator
                  </div>
                </div>

                <ChevronDown
                  className="co-topbar-profile-chevron"
                  size={15}
                  strokeWidth={2}
                  color={
                    "rgba(255,255,255,0.70)"
                  }
                  style={{
                    transform: profileOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition:
                      "transform 180ms ease",
                  }}
                />
              </button>

              {profileOpen && (
                <div
                  className="co-topbar-dropdown"
                  style={dropdownStyle}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "11px",
                      padding:
                        "14px 15px",
                      borderBottom:
                        `1px solid ${colors.border}`,
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        minWidth: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor:
                          colors.primarySoft,
                        color:
                          colors.primary,
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      SB
                    </div>

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color:
                            colors.text,
                        }}
                      >
                        Safwan Baduda
                      </div>

                      <div
                        style={{
                          marginTop: "2px",
                          fontSize: "10px",
                          color:
                            colors.textSecondary,
                        }}
                      >
                        College Coordinator
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "7px",
                    }}
                  >
                    <ProfileButton
                      icon={
                        <UserCircle
                          size={17}
                        />
                      }
                      label="My Profile"
                      colors={colors}
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    />

                    <ProfileButton
                      icon={
                        <Settings size={17} />
                      }
                      label="Settings"
                      colors={colors}
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    />

                    <ProfileButton
                      icon={
                        <HelpCircle
                          size={17}
                        />
                      }
                      label="Help & Support"
                      colors={colors}
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    />
                  </div>

                  <div
                    style={{
                      padding: "7px",
                      borderTop:
                        `1px solid ${colors.border}`,
                    }}
                  >
                    <ProfileButton
                      icon={
                        <LogOut size={17} />
                      }
                      label="Logout"
                      colors={colors}
                      danger
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/* =========================================================
   NOTIFICATION ITEM
========================================================= */

function NotificationItem({
  icon,
  title,
  description,
  background,
  iconColor,
  colors,
  last = false,
}) {
  return (
    <div
      className="co-topbar-dropdown-item"
      style={{
        display: "flex",
        gap: "10px",
        padding: "12px 15px",
        borderBottom: last
          ? "none"
          : `1px solid ${colors.borderLight}`,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          minWidth: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          backgroundColor: background,
          color: iconColor,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: colors.text,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "3px",
            fontSize: "10px",
            lineHeight: "15px",
            color:
              colors.textSecondary,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE BUTTON
========================================================= */

function ProfileButton({
  icon,
  label,
  colors,
  danger = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className="co-topbar-profile-item"
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        backgroundColor:
          "transparent",
        color: danger
          ? colors.danger
          : colors.text,
        fontSize: "12px",
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {icon}
      {label}
    </button>
  );
}