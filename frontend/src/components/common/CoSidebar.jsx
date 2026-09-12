// import {
//   LayoutDashboard,
//   Users,
//   Building2,
//   UserRoundCog,
//   ClipboardCheck,
//   Megaphone,
//   FileText,
//   LogOut,
//   ChevronLeft,
// } from "lucide-react";

import {
  useCoordinatorTheme,
} from "../../context/CoordinatorThemeContext";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/coordinator/dashboard",
  },
  {
    label: "Students Management",
    icon: Users,
    path: "/coordinator/students",
  },
  {
    label: "Companies Management",
    icon: Building2,
    path: "/coordinator/companies",
  },
  {
    label: "Mentor Assignment",
    icon: UserRoundCog,
    path: "/coordinator/mentors",
  },
  {
    label: "OJT Tracking",
    icon: ClipboardCheck,
    path: "/coordinator/tracking",
  },
  {
    label: "Announcements",
    icon: Megaphone,
    path: "/coordinator/announcements",
  },
  {
    label: "Generate Reports",
    icon: FileText,
    path: "/coordinator/reports",
  },
];

export default function CoSidebar({
  activePath = "/coordinator/dashboard",
  collapsed = false,
  onCollapse,
  onNavigate,
}) {
  const {
    darkMode,
    colors,
  } = useCoordinatorTheme();

  const sidebarWidth = collapsed ? 76 : 260;

  /*
   * Common institutional blue.
   *
   * Light mode:
   * #1E4D7B
   *
   * Dark mode:
   * Theme context supplies the darker institutional shade.
   */
  const sidebarColor = colors.sidebar;

  const sidebarSecondary =
    darkMode
      ? "#C7D7E8"
      : "#D9E8F5";

  const activeBackground =
    darkMode
      ? "#3474A8"
      : "#3474A8";

  const hoverBackground =
    darkMode
      ? "#285F91"
      : "#285F91";

  return (
    <>
      <style>
        {`
          .co-sidebar-menu-button {
            position: relative;
          }

          .co-sidebar-menu-button:not(.co-sidebar-active):hover {
            background-color: ${hoverBackground} !important;
            color: #ffffff !important;
          }

          .co-sidebar-collapse:hover {
            background-color: rgba(255, 255, 255, 0.14) !important;
            border-color: rgba(255, 255, 255, 0.30) !important;
            color: #ffffff !important;
          }

          .co-sidebar-logout:hover {
            background-color: rgba(255, 255, 255, 0.10) !important;
            color: #ffffff !important;
          }

          .co-sidebar-scroll::-webkit-scrollbar {
            width: 5px;
          }

          .co-sidebar-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .co-sidebar-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.18);
            border-radius: 10px;
          }

          .co-sidebar-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.28);
          }
        `}
      </style>

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: `${sidebarWidth}px`,
          height: "100vh",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          backgroundColor: sidebarColor,
          color: "#FFFFFF",
          boxSizing: "border-box",
          overflow: "hidden",
          transition:
            "width 250ms ease, background-color 200ms ease",
          boxShadow: darkMode
            ? "4px 0 18px rgba(0, 0, 0, 0.18)"
            : "4px 0 18px rgba(15, 23, 42, 0.08)",
        }}
      >
        {/* =====================================================
            BRAND HEADER
        ====================================================== */}
        <div
          style={{
            height: "84px",
            minHeight: "84px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed
              ? "center"
              : "space-between",
            padding: collapsed
              ? "0 10px"
              : "0 16px",
            borderBottom:
              "1px solid rgba(255, 255, 255, 0.14)",
            boxSizing: "border-box",
          }}
        >
          {!collapsed && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "11px",
                minWidth: 0,
              }}
            >
              {/* AI Logo */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "11px",
                  backgroundColor: "#FFFFFF",
                  color: "#1E4D7B",
                  fontSize: "15px",
                  fontWeight: 800,
                  boxShadow:
                    "0 5px 12px rgba(0, 0, 0, 0.12)",
                }}
              >
                AI
              </div>

              <div
                style={{
                  minWidth: 0,
                }}
              >
                {/* KEEP THIS BRANDING EXACTLY */}
                <div
                  style={{
                    fontSize: "16px",
                    lineHeight: "18px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    whiteSpace: "nowrap",
                  }}
                >
                  AISC OJT
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "9px",
                    lineHeight: "11px",
                    letterSpacing: "1.25px",
                    fontWeight: 700,
                    color: sidebarSecondary,
                    whiteSpace: "nowrap",
                  }}
                >
                  MANAGEMENT PORTAL
                </div>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          <button
            type="button"
            onClick={onCollapse}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className="co-sidebar-collapse"
            style={{
              width: "34px",
              height: "34px",
              minWidth: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border:
                "1px solid rgba(255, 255, 255, 0.20)",
              borderRadius: "9px",
              backgroundColor:
                "rgba(255, 255, 255, 0.08)",
              color: "#FFFFFF",
              cursor: "pointer",
              boxSizing: "border-box",
              transition:
                "background-color 180ms ease, border-color 180ms ease",
            }}
          >
            <ChevronLeft
              size={17}
              strokeWidth={2}
              style={{
                transform: collapsed
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition:
                  "transform 200ms ease",
              }}
            />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav
          className="co-sidebar-scroll"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "24px 13px",
            boxSizing: "border-box",
          }}
        >
          {!collapsed && (
            <div
              style={{
                padding: "0 12px",
                marginBottom: "11px",
                fontSize: "10px",
                lineHeight: "14px",
                fontWeight: 800,
                letterSpacing: "1.25px",
                textTransform: "uppercase",
                color: sidebarSecondary,
              }}
            >
              OJT Management
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                activePath === item.path;

              return (
                <button
                  key={item.path}
                  type="button"
                  title={
                    collapsed
                      ? item.label
                      : undefined
                  }
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(item.path);
                    }
                  }}
                  className={`co-sidebar-menu-button ${
                    isActive
                      ? "co-sidebar-active"
                      : ""
                  }`}
                  style={{
                    width: "100%",
                    height: "46px",
                    minHeight: "46px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed
                      ? "center"
                      : "flex-start",
                    gap: "13px",
                    padding: collapsed
                      ? "0"
                      : "0 13px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: isActive
                      ? activeBackground
                      : "transparent",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: isActive
                      ? 700
                      : 600,
                    textAlign: "left",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    boxShadow: isActive
                      ? "0 5px 12px rgba(0, 0, 0, 0.12)"
                      : "none",
                    transition:
                      "background-color 180ms ease, color 180ms ease, box-shadow 180ms ease",
                  }}
                >
                  <Icon
                    size={19}
                    strokeWidth={
                      isActive ? 2.4 : 2
                    }
                    style={{
                      flexShrink: 0,
                    }}
                  />

                  {!collapsed && (
                    <span
                      style={{
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow:
                          "ellipsis",
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* =====================================================
            USER / LOGOUT SECTION
        ====================================================== */}
        <div
          style={{
            flexShrink: 0,
            padding: "12px 13px 14px",
            borderTop:
              "1px solid rgba(255, 255, 255, 0.14)",
            boxSizing: "border-box",
          }}
        >
          {!collapsed && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px",
                borderRadius: "11px",
                backgroundColor:
                  "rgba(255, 255, 255, 0.09)",
                boxSizing: "border-box",
              }}
            >
              {/* User Avatar */}
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
                    "rgba(255, 255, 255, 0.16)",
                  color: "#FFFFFF",
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
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow:
                      "ellipsis",
                  }}
                >
                  Safwan Baduda
                </div>

                <div
                  style={{
                    marginTop: "3px",
                    fontSize: "10px",
                    lineHeight: "14px",
                    color: sidebarSecondary,
                    whiteSpace: "nowrap",
                  }}
                >
                  College Coordinator
                </div>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            type="button"
            className="co-sidebar-logout"
            style={{
              width: "100%",
              height: "42px",
              marginTop: collapsed
                ? "0"
                : "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed
                ? "center"
                : "flex-start",
              gap: "11px",
              padding: collapsed
                ? "0"
                : "0 12px",
              border: "none",
              borderRadius: "9px",
              backgroundColor:
                "transparent",
              color: sidebarSecondary,
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              boxSizing: "border-box",
              transition:
                "background-color 180ms ease, color 180ms ease",
            }}
          >
            <LogOut
              size={18}
              strokeWidth={2}
            />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
// const menuItems = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/coordinator/dashboard",
//   },
//   {
//     label: "Students Management",
//     icon: Users,
//     path: "/coordinator/students",
//   },
//   {
//     label: "Companies Management",
//     icon: Building2,
//     path: "/coordinator/companies",
//   },
//   {
//     label: "Mentor Assignment",
//     icon: UserRoundCog,
//     path: "/coordinator/mentors",
//   },
//   {
//     label: "OJT Tracking",
//     icon: ClipboardCheck,
//     path: "/coordinator/tracking",
//   },
//   {
//     label: "Announcements",
//     icon: Megaphone,
//     path: "/coordinator/announcements",
//   },
//   {
//     label: "Generate Reports",
//     icon: FileText,
//     path: "/coordinator/reports",
//   },
// ];

// export default function CoSidebar({
//   activePath = "/coordinator/dashboard",
//   collapsed = false,
//   onCollapse,
//   onNavigate,
// }) {
//   const sidebarWidth = collapsed ? 76 : 260;

//   return (
//     <aside
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         bottom: 0,
//         width: `${sidebarWidth}px`,
//         height: "100vh",
//         zIndex: 9999,
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#ffffff",
//         borderRight: "1px solid #e2e8f0",
//         boxSizing: "border-box",
//         overflow: "hidden",
//         transition: "width 250ms ease",
//       }}
//     >
//       {/* =====================================================
//           BRAND HEADER
//       ====================================================== */}
//       <div
//         style={{
//           height: "84px",
//           minHeight: "84px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: collapsed
//             ? "center"
//             : "space-between",
//           padding: collapsed ? "0 10px" : "0 16px",
//           borderBottom: "1px solid #eef2f7",
//           boxSizing: "border-box",
//         }}
//       >
//         {!collapsed && (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "11px",
//               minWidth: 0,
//             }}
//           >
//             <div
//               style={{
//                 width: "44px",
//                 height: "44px",
//                 minWidth: "44px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: "11px",
//                 backgroundColor: "#2563eb",
//                 color: "#ffffff",
//                 fontSize: "15px",
//                 fontWeight: 800,
//                 boxShadow:
//                   "0 5px 12px rgba(37, 99, 235, 0.18)",
//               }}
//             >
//               AI
//             </div>

//             <div style={{ minWidth: 0 }}>
//               <div
//                 style={{
//                   fontSize: "16px",
//                   lineHeight: "18px",
//                   fontWeight: 800,
//                   color: "#0f172a",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 AISC OJT
//               </div>

//               <div
//                 style={{
//                   marginTop: "4px",
//                   fontSize: "9px",
//                   lineHeight: "11px",
//                   letterSpacing: "1.25px",
//                   fontWeight: 700,
//                   color: "#94a3b8",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 PORTAL
//               </div>
//             </div>
//           </div>
//         )}

//         <button
//           type="button"
//           onClick={onCollapse}
//           aria-label={
//             collapsed
//               ? "Expand sidebar"
//               : "Collapse sidebar"
//           }
//           style={{
//             width: "34px",
//             height: "34px",
//             minWidth: "34px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             border: "1px solid #e2e8f0",
//             borderRadius: "9px",
//             backgroundColor: "#ffffff",
//             color: "#64748b",
//             cursor: "pointer",
//             boxSizing: "border-box",
//           }}
//         >
//           <ChevronLeft
//             size={17}
//             strokeWidth={2}
//             style={{
//               transform: collapsed
//                 ? "rotate(180deg)"
//                 : "rotate(0deg)",
//               transition:
//                 "transform 200ms ease",
//             }}
//           />
//         </button>
//       </div>

//       {/* =====================================================
//           NAVIGATION
//       ====================================================== */}
//       <nav
//         style={{
//           flex: 1,
//           minHeight: 0,
//           overflowY: "auto",
//           overflowX: "hidden",
//           padding: "24px 13px",
//           boxSizing: "border-box",
//         }}
//       >
//         {!collapsed && (
//           <div
//             style={{
//               padding: "0 12px",
//               marginBottom: "11px",
//               fontSize: "10px",
//               lineHeight: "14px",
//               fontWeight: 800,
//               letterSpacing: "1.25px",
//               textTransform: "uppercase",
//               color: "#94a3b8",
//             }}
//           >
//             OJT Management
//           </div>
//         )}

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "5px",
//           }}
//         >
//           {menuItems.map((item) => {
//             const Icon = item.icon;

//             const isActive =
//               activePath === item.path;

//             return (
//               <button
//                 key={item.path}
//                 type="button"
//                 title={
//                   collapsed
//                     ? item.label
//                     : undefined
//                 }
//                 onClick={() => {
//                   if (onNavigate) {
//                     onNavigate(item.path);
//                   }
//                 }}
//                 style={{
//                   width: "100%",
//                   height: "46px",
//                   minHeight: "46px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: collapsed
//                     ? "center"
//                     : "flex-start",
//                   gap: "13px",
//                   padding: collapsed
//                     ? "0"
//                     : "0 13px",
//                   border: "none",
//                   borderRadius: "10px",
//                   backgroundColor: isActive
//                     ? "#2563eb"
//                     : "transparent",
//                   color: isActive
//                     ? "#ffffff"
//                     : "#475569",
//                   fontSize: "13px",
//                   fontWeight: isActive
//                     ? 700
//                     : 600,
//                   textAlign: "left",
//                   cursor: "pointer",
//                   boxSizing: "border-box",
//                   boxShadow: isActive
//                     ? "0 5px 12px rgba(37, 99, 235, 0.18)"
//                     : "none",
//                   transition:
//                     "background-color 180ms ease, color 180ms ease",
//                 }}
//               >
//                 <Icon
//                   size={19}
//                   strokeWidth={
//                     isActive ? 2.4 : 2
//                   }
//                   style={{
//                     flexShrink: 0,
//                   }}
//                 />

//                 {!collapsed && (
//                   <span
//                     style={{
//                       minWidth: 0,
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     {item.label}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </nav>

//       {/* =====================================================
//           USER AREA
//       ====================================================== */}
//       <div
//         style={{
//           flexShrink: 0,
//           padding: "12px 13px 14px",
//           borderTop: "1px solid #eef2f7",
//           boxSizing: "border-box",
//         }}
//       >
//         {!collapsed && (
//           <div
//             style={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               padding: "11px",
//               borderRadius: "11px",
//               backgroundColor: "#f8fafc",
//               boxSizing: "border-box",
//             }}
//           >
//             <div
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 minWidth: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: "50%",
//                 backgroundColor: "#dbeafe",
//                 color: "#2563eb",
//                 fontSize: "12px",
//                 fontWeight: 800,
//               }}
//             >
//               SB
//             </div>

//             <div style={{ minWidth: 0 }}>
//               <div
//                 style={{
//                   fontSize: "12px",
//                   lineHeight: "16px",
//                   fontWeight: 700,
//                   color: "#0f172a",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 Safwan Baduda
//               </div>

//               <div
//                 style={{
//                   marginTop: "3px",
//                   fontSize: "10px",
//                   lineHeight: "14px",
//                   color: "#64748b",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 College Coordinator
//               </div>
//             </div>
//           </div>
//         )}

//         <button
//           type="button"
//           style={{
//             width: "100%",
//             height: "42px",
//             marginTop: collapsed
//               ? "0"
//               : "7px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: collapsed
//               ? "center"
//               : "flex-start",
//             gap: "11px",
//             padding: collapsed
//               ? "0"
//               : "0 12px",
//             border: "none",
//             borderRadius: "9px",
//             backgroundColor: "transparent",
//             color: "#64748b",
//             fontSize: "12px",
//             fontWeight: 600,
//             cursor: "pointer",
//             boxSizing: "border-box",
//           }}
//         >
//           <LogOut
//             size={18}
//             strokeWidth={2}
//           />

//           {!collapsed && (
//             <span>Logout</span>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }






import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  UserRoundCog, 
  ClipboardCheck, 
  Megaphone, 
  FileText, 
  LogOut, 
  ChevronLeft, 
} from "lucide-react"; 

import { useNavigate } from "react-router-dom";
 
const menuItems = [ 
  { 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    path: "/coordinator/dashboard", 
  }, 
  { 
    label: "Students Management", 
    icon: Users, 
    path: "/coordinator/students", 
  }, 
  { 
    label: "Companies Management", 
    icon: Building2, 
    path: "/coordinator/companies", 
  }, 
  { 
    label: "Mentor Assignment", 
    icon: UserRoundCog, 
    path: "/coordinator/mentors", 
  }, 
  { 
    label: "OJT Tracking", 
    icon: ClipboardCheck, 
    path: "/coordinator/tracking", 
  }, 
  { 
    label: "Announcements", 
    icon: Megaphone, 
    path: "/coordinator/announcements", 
  }, 
  { 
    label: "Generate Reports", 
    icon: FileText, 
    path: "/coordinator/reports", 
  }, 
]; 
 
export default function CoSidebar({ 
  activePath = "/coordinator/dashboard", 
  collapsed = false, 
  onCollapse, 
  onNavigate, 
}) { 
  const sidebarWidth = collapsed ? 76 : 260; 

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/login");
  }
 
  return ( 
    <aside 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        bottom: 0, 
        width: `${sidebarWidth}px`, 
        height: "100vh", 
        zIndex: 9999, 
        display: "flex", 
        flexDirection: "column", 
        backgroundColor: "#ffffff", 
        borderRight: "1px solid #e2e8f0", 
        boxSizing: "border-box", 
        overflow: "hidden", 
        transition: "width 250ms ease", 
      }} 
    > 
      {/* BRAND HEADER */} 
      <div 
        style={{ 
          height: "84px", 
          minHeight: "84px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: collapsed 
            ? "center" 
            : "space-between", 
          padding: collapsed ? "0 10px" : "0 16px", 
          borderBottom: "1px solid #eef2f7", 
          boxSizing: "border-box", 
        }} 
      > 
        {!collapsed && ( 
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "11px", 
              minWidth: 0, 
            }} 
          > 
            <div 
              style={{ 
                width: "44px", 
                height: "44px", 
                minWidth: "44px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                borderRadius: "11px", 
                backgroundColor: "#2563eb", 
                color: "#ffffff", 
                fontSize: "15px", 
                fontWeight: 800, 
                boxShadow: 
                  "0 5px 12px rgba(37, 99, 235, 0.18)", 
              }} 
            > 
              AI 
            </div> 
 
            <div style={{ minWidth: 0 }}> 
              <div 
                style={{ 
                  fontSize: "16px", 
                  lineHeight: "18px", 
                  fontWeight: 800, 
                  color: "#0f172a", 
                  whiteSpace: "nowrap", 
                }} 
              > 
                AISC OJT 
              </div> 
 
              <div 
                style={{ 
                  marginTop: "4px", 
                  fontSize: "9px", 
                  lineHeight: "11px", 
                  letterSpacing: "1.25px", 
                  fontWeight: 700, 
                  color: "#94a3b8", 
                  whiteSpace: "nowrap", 
                }} 
              > 
                PORTAL 
              </div> 
            </div> 
          </div> 
        )} 
 
        <button 
          type="button" 
          onClick={onCollapse} 
          aria-label={ 
            collapsed 
              ? "Expand sidebar" 
              : "Collapse sidebar" 
          } 
          style={{ 
            width: "34px", 
            height: "34px", 
            minWidth: "34px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            border: "1px solid #e2e8f0", 
            borderRadius: "9px", 
            backgroundColor: "#ffffff", 
            color: "#64748b", 
            cursor: "pointer", 
            boxSizing: "border-box", 
          }} 
        > 
          <ChevronLeft 
            size={17} 
            strokeWidth={2} 
            style={{ 
              transform: collapsed 
                ? "rotate(180deg)" 
                : "rotate(0deg)", 
              transition: 
                "transform 200ms ease", 
            }} 
          /> 
        </button> 
      </div> 
 
      {/* NAVIGATION */} 
      <nav 
        style={{ 
          flex: 1, 
          minHeight: 0, 
          overflowY: "auto", 
          overflowX: "hidden", 
          padding: "24px 13px", 
          boxSizing: "border-box", 
        }} 
      > 
        {!collapsed && ( 
          <div 
            style={{ 
              padding: "0 12px", 
              marginBottom: "11px", 
              fontSize: "10px", 
              lineHeight: "14px", 
              fontWeight: 800, 
              letterSpacing: "1.25px", 
              textTransform: "uppercase", 
              color: "#94a3b8", 
            }} 
          > 
            OJT Management 
          </div> 
        )} 
 
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "5px", 
          }} 
        > 
          {menuItems.map((item) => { 
            const Icon = item.icon; 
 
            const isActive = 
              activePath === item.path; 
 
            return ( 
              <button 
                key={item.path} 
                type="button" 
                title={ 
                  collapsed 
                    ? item.label 
                    : undefined 
                } 
                onClick={() => { 
                  if (onNavigate) { 
                    onNavigate(item.path); 
                  } 
                }} 
                style={{ 
                  width: "100%", 
                  height: "46px", 
                  minHeight: "46px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: collapsed 
                    ? "center" 
                    : "flex-start", 
                  gap: "13px", 
                  padding: collapsed 
                    ? "0" 
                    : "0 13px", 
                  border: "none", 
                  borderRadius: "10px", 
                  backgroundColor: isActive 
                    ? "#2563eb" 
                    : "transparent", 
                  color: isActive 
                    ? "#ffffff" 
                    : "#475569", 
                  fontSize: "13px", 
                  fontWeight: isActive 
                    ? 700 
                    : 600, 
                  textAlign: "left", 
                  cursor: "pointer", 
                  boxSizing: "border-box", 
                  boxShadow: isActive 
                    ? "0 5px 12px rgba(37, 99, 235, 0.18)" 
                    : "none", 
                  transition: 
                    "background-color 180ms ease, color 180ms ease", 
                }} 
              > 
                <Icon 
                  size={19} 
                  strokeWidth={ 
                    isActive ? 2.4 : 2 
                  } 
                  style={{ 
                    flexShrink: 0, 
                  }} 
                /> 
 
                {!collapsed && ( 
                  <span 
                    style={{ 
                      minWidth: 0, 
                      overflow: "hidden", 
                      textOverflow: "ellipsis", 
                      whiteSpace: "nowrap", 
                    }} 
                  > 
                    {item.label} 
                  </span> 
                )} 
              </button> 
            ); 
          })} 
        </div> 
      </nav> 
 
      {/* USER AREA */} 
      <div 
        style={{ 
          flexShrink: 0, 
          padding: "12px 13px 14px", 
          borderTop: "1px solid #eef2f7", 
          boxSizing: "border-box", 
        }} 
      > 
        {!collapsed && ( 
          <div 
            style={{ 
              width: "100%", 
              display: "flex", 
              alignItems: "center", 
              gap: "10px", 
              padding: "11px", 
              borderRadius: "11px", 
              backgroundColor: "#f8fafc", 
              boxSizing: "border-box", 
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
                backgroundColor: "#dbeafe", 
                color: "#2563eb", 
                fontSize: "12px", 
                fontWeight: 800, 
              }} 
            > 
              SB 
            </div> 
 
            <div style={{ minWidth: 0 }}> 
              <div 
                style={{ 
                  fontSize: "12px", 
                  lineHeight: "16px", 
                  fontWeight: 700, 
                  color: "#0f172a", 
                  whiteSpace: "nowrap", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                }} 
              > 
                Safwan Baduda 
              </div> 
 
              <div 
                style={{ 
                  marginTop: "3px", 
                  fontSize: "10px", 
                  lineHeight: "14px", 
                  color: "#64748b", 
                  whiteSpace: "nowrap", 
                }} 
              > 
                College Coordinator 
              </div> 
            </div> 
          </div> 
        )} 
 
        <button 
          type="button" 
          onClick={handleLogout}
          style={{ 
            width: "100%", 
            height: "42px", 
            marginTop: collapsed 
              ? "0" 
              : "7px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: collapsed 
              ? "center" 
              : "flex-start", 
            gap: "11px", 
            padding: collapsed 
              ? "0" 
              : "0 12px", 
            border: "none", 
            borderRadius: "9px", 
            backgroundColor: "transparent", 
            color: "#64748b", 
            fontSize: "12px", 
            fontWeight: 600, 
            cursor: "pointer", 
            boxSizing: "border-box", 
          }} 
        > 
          <LogOut 
            size={18} 
            strokeWidth={2} 
          /> 
 
          {!collapsed && ( 
            <span>Logout</span> 
          )} 
        </button> 
      </div> 
    </aside> 
  ); 
}