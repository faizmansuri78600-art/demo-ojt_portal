import React, { useEffect, useState } from "react";
import MyAvtar from "../../assets/images/Myavtar.jpg";

import {
  Menu,
  Search,
  Bell,
  Mail,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

import {
  getProfile,
  getStudentNotifications,
  getAllOpportunities,
} from "../../services/StudentServices";

export default function Header() {
  // ================= STUDENT DATA =================
  const [student, setStudent] = useState({
    name: "Ayesha Shaikh",
    role: "TY BCA Student",
    profilePhotoUrl: "",
  });

  // ================= NOTIFICATION COUNT =================
  const [notificationCount, setNotificationCount] = useState(0);

  // ================= OPPORTUNITIES =================
  const [opportunities, setOpportunities] = useState([]);

  // ================= SEARCH =================
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // ================= LOAD HEADER DATA =================
  useEffect(() => {
    const loadHeaderData = async () => {
      try {
        // ================= PROFILE =================
        const profileData = await getProfile();

        const studentData = profileData.student;

        setStudent((prev) => ({
          ...prev,
          name: studentData?.name || prev.name,

          role: studentData?.semester
            ? "TY BCA Student"
            : prev.role,

          profilePhotoUrl:
            studentData?.profilePhotoUrl || "",
        }));

        // ================= NOTIFICATIONS =================
        const notificationData =
          await getStudentNotifications();

        const notifications = Array.isArray(
          notificationData
        )
          ? notificationData
          : notificationData.notifications || [];

        const unreadCount = notifications.filter(
          (notification) =>
            notification.status === "Unread" ||
            notification.isRead === false
        ).length;

        setNotificationCount(unreadCount);

        // ================= OPPORTUNITIES =================
        const opportunityData =
          await getAllOpportunities();

        const opportunityList = Array.isArray(
          opportunityData
        )
          ? opportunityData
          : opportunityData.opportunities || [];

        setOpportunities(opportunityList);
      } catch (error) {
        console.error(
          "Header data loading error:",
          error
        );
      }
    };

    loadHeaderData();
  }, []);

  // ================= SEARCH OPPORTUNITIES =================
  const handleSearch = (value) => {
    setSearchText(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const searchValue = value.toLowerCase();

    const filteredResults = opportunities.filter(
      (opportunity) => {
        const title =
          opportunity.title?.toLowerCase() || "";

        const location =
          opportunity.location?.toLowerCase() || "";

        const status =
          opportunity.status?.toLowerCase() || "";

        const companyId =
          opportunity.companyId?.toLowerCase() || "";

        return (
          title.includes(searchValue) ||
          location.includes(searchValue) ||
          status.includes(searchValue) ||
          companyId.includes(searchValue)
        );
      }
    );

    setSearchResults(filteredResults.slice(0, 5));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#172554] text-white flex items-center px-5 gap-5">

      {/* ================= LOGO + MENU ================= */}
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

      {/* ================= SEARCH ================= */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">

          <input
            type="text"
            value={searchText}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
            placeholder="Search opportunities, companies..."
            className="w-full h-10 rounded-lg bg-white pl-4 pr-10 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">

              {searchResults.map((opportunity) => (
                <div
                  key={opportunity._id}
                  className="px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                >
                  <p className="text-sm font-semibold text-slate-800">
                    {opportunity.title}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {opportunity.location || "Location not available"}
                  </p>

                  <p className="text-xs text-blue-600 mt-1">
                    {opportunity.status}
                  </p>
                </div>
              ))}

            </div>
          )}

          {/* No Search Result */}
          {searchText.trim() &&
            searchResults.length === 0 &&
            opportunities.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                <p className="px-4 py-3 text-sm text-slate-500">
                  No opportunities found
                </p>
              </div>
            )}

        </div>
      </div>

      {/* ================= RIGHT ICONS ================= */}
      <div className="flex items-center gap-6 ml-auto">

        {/* Notification */}
        <button className="relative text-white/90 hover:text-white">

          <Bell size={22} />

          {notificationCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold leading-none rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
              {notificationCount}
            </span>
          )}

        </button>

        {/* Mail */}
        <button className="relative text-white/90 hover:text-white">

          <Mail size={22} />

          <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold leading-none rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>

        </button>

        {/* ================= PROFILE ================= */}
        <div className="flex items-center gap-2">

          <img
            src={
              student.profilePhotoUrl
                ? student.profilePhotoUrl
                : MyAvtar
            }
            alt={student.name}
            className="w-9 h-9 rounded-full object-cover"
          />

          <div className="leading-tight">

            <p className="text-white text-sm font-semibold">
              {student.name}
            </p>

            <p className="text-white/60 text-[11px]">
              {student.role}
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