import { useState } from "react";
import { Bell, Settings as SettingsIcon } from "lucide-react";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";
import ProfileSettingsCard from "../../components/company/ProfileSettingsCard";
import SecuritySettingsCard from "../../components/company/SecuritySettingsCard";
import PreferencesCard from "../../components/company/PreferencesCard";
import ProfileSummaryCard from "../../components/company/ProfileSummaryCard";
import RecentNotificationsCard from "../../components/company/RecentNotificationsCard";
import QuickActionsCard from "../../components/company/QuickActionsCard";

export default function NotificationsSettings() {
  const [tab, setTab] = useState("settings");

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">

      {/* SIDEBAR */}
      <CompanySidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* HEADER */}
        <CompanyHeader />

        {/* MIDDLE PART */}
        <main className="flex-1 px-8 py-6">

          {/* PAGE HEADER */}
          <div className="mb-4">
            <h1 className="text-[26px] font-bold text-[#111827]">Notifications & Settings</h1>
            <p className="text-[13px] text-[#6B7280] mt-1">
              <span className="font-semibold text-[#1E5EFF]">Dashboard</span>
              <span className="mx-2 text-[#9CA3AF]">›</span>
              <span>Notifications & Settings</span>
            </p>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-6 border-b border-[#E5E7EB] mb-6">
            <button
              onClick={() => setTab("notifications")}
              className={`flex items-center gap-2 text-[13px] font-semibold pb-3 border-b-2 transition-colors ${
                tab === "notifications"
                  ? "text-[#1E5EFF] border-[#1E5EFF]"
                  : "text-[#6B7280] border-transparent hover:text-[#374151]"
              }`}
            >
              <Bell size={15} /> Notifications
            </button>
            <button
              onClick={() => setTab("settings")}
              className={`flex items-center gap-2 text-[13px] font-semibold pb-3 border-b-2 transition-colors ${
                tab === "settings"
                  ? "text-[#1E5EFF] border-[#1E5EFF]"
                  : "text-[#6B7280] border-transparent hover:text-[#374151]"
              }`}
            >
              <SettingsIcon size={15} /> Settings
            </button>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="flex gap-6 items-start">

            {/* LEFT COLUMN (65%) */}
            <div className="w-[65%] flex flex-col gap-5">
              {tab === "settings" ? (
                <>
                  <ProfileSettingsCard />
                  <SecuritySettingsCard />
                  <PreferencesCard />
                </>
              ) : (
                <RecentNotificationsCard />
              )}
            </div>

            {/* RIGHT COLUMN (35%) */}
            <div className="w-[35%] flex flex-col gap-5">
              <ProfileSummaryCard />
              <RecentNotificationsCard />
              <QuickActionsCard />
            </div>

          </div>

        </main>

        {/* FOOTER */}
        <CompanyFooter />

      </div>

    </div>
  );
}