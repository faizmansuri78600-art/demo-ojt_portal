import { useState } from "react";
import {
  Bell,
  Settings as SettingsIcon,
  X,
  Lock,
  Download,
  Users,
} from "lucide-react";

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
  const [popup, setPopup] = useState(null);

  const handleQuickAction = (action) => {
    setPopup(action);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">

      <CompanySidebar />

      <div className="flex-1 min-w-0 flex flex-col">

        <CompanyHeader />

        <main className="flex-1 px-8 py-6">

          <div className="mb-4">
            <h1 className="text-[26px] font-bold text-[#111827]">
              Notifications & Settings
            </h1>

            <p className="text-[13px] text-[#6B7280] mt-1">
              <span className="font-semibold text-[#1E5EFF]">
                Dashboard
              </span>

              <span className="mx-2 text-[#9CA3AF]">›</span>

              <span>Notifications & Settings</span>
            </p>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-6 border-b border-[#E5E7EB] mb-6">

            <button
              type="button"
              onClick={() => setTab("notifications")}
              className={`flex items-center gap-2 text-[13px] font-semibold pb-3 border-b-2 ${
                tab === "notifications"
                  ? "text-[#1E5EFF] border-[#1E5EFF]"
                  : "text-[#6B7280] border-transparent"
              }`}
            >
              <Bell size={15} />
              Notifications
            </button>

            <button
              type="button"
              onClick={() => setTab("settings")}
              className={`flex items-center gap-2 text-[13px] font-semibold pb-3 border-b-2 ${
                tab === "settings"
                  ? "text-[#1E5EFF] border-[#1E5EFF]"
                  : "text-[#6B7280] border-transparent"
              }`}
            >
              <SettingsIcon size={15} />
              Settings
            </button>

          </div>

          {/* CONTENT */}
          <div className="flex gap-6 items-start">

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

            <div className="w-[35%] flex flex-col gap-5">

              <ProfileSummaryCard />

              <RecentNotificationsCard />

              <QuickActionsCard
                onAction={handleQuickAction}
              />

            </div>

          </div>

        </main>

        <CompanyFooter />

      </div>

      {/* ================= POPUPS ================= */}

      {popup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">

          <div className="bg-white w-[420px] rounded-[16px] shadow-2xl p-6 relative">

            <button
              type="button"
              onClick={() => setPopup(null)}
              className="absolute right-4 top-4 text-[#64748B]"
            >
              <X size={18} />
            </button>

            {/* CHANGE PASSWORD */}
            {popup === "Change Password" && (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <Lock size={20} className="text-[#1E5EFF]" />

                  <div>
                    <h2 className="text-[16px] font-semibold">
                      Change Password
                    </h2>

                    <p className="text-[10px] text-[#64748B]">
                      Update your account password.
                    </p>
                  </div>
                </div>

                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full h-[40px] border rounded-[8px] px-3 text-[11px] mb-3 outline-none"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full h-[40px] border rounded-[8px] px-3 text-[11px] mb-3 outline-none"
                />

                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full h-[40px] border rounded-[8px] px-3 text-[11px] mb-5 outline-none"
                />

                <button
                  type="button"
                  onClick={() => {
                    alert("Password updated successfully.");
                    setPopup(null);
                  }}
                  className="w-full h-[40px] bg-[#1E5EFF] text-white rounded-[8px] text-[11px] font-medium"
                >
                  Update Password
                </button>
              </>
            )}

            {/* NOTIFICATION PREFERENCES */}
            {popup === "Notification Preferences" && (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <Bell size={20} className="text-[#1E5EFF]" />

                  <div>
                    <h2 className="text-[16px] font-semibold">
                      Notification Preferences
                    </h2>

                    <p className="text-[10px] text-[#64748B]">
                      Choose which notifications you receive.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">

                  <label className="flex items-center justify-between text-[12px]">
                    Email Notifications
                    <input type="checkbox" defaultChecked />
                  </label>

                  <label className="flex items-center justify-between text-[12px]">
                    New Applications
                    <input type="checkbox" defaultChecked />
                  </label>

                  <label className="flex items-center justify-between text-[12px]">
                    Internship Updates
                    <input type="checkbox" defaultChecked />
                  </label>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert("Notification preferences saved.");
                    setPopup(null);
                  }}
                  className="w-full h-[40px] bg-[#1E5EFF] text-white rounded-[8px] text-[11px] font-medium mt-5"
                >
                  Save Preferences
                </button>
              </>
            )}

            {/* DOWNLOAD ACTIVITY LOG */}
            {popup === "Download Activity Log" && (
              <>
                <Download
                  size={22}
                  className="text-[#1E5EFF] mb-3"
                />

                <h2 className="text-[16px] font-semibold">
                  Download Activity Log
                </h2>

                <p className="text-[11px] text-[#64748B] mt-2">
                  Download your recent account activity log.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    const data =
                      "Activity Log\n\nLogin - Successful\nProfile Updated\nSettings Updated";

                    const blob = new Blob([data], {
                      type: "text/plain",
                    });

                    const url =
                      URL.createObjectURL(blob);

                    const link =
                      document.createElement("a");

                    link.href = url;
                    link.download = "activity-log.txt";

                    link.click();

                    URL.revokeObjectURL(url);

                    alert("Activity log downloaded.");
                    setPopup(null);
                  }}
                  className="w-full h-[40px] bg-[#1E5EFF] text-white rounded-[8px] text-[11px] font-medium mt-5"
                >
                  Download Log
                </button>
              </>
            )}

            {/* MANAGE USERS */}
            {popup === "Manage Users" && (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <Users size={21} className="text-[#1E5EFF]" />

                  <div>
                    <h2 className="text-[16px] font-semibold">
                      Manage Users
                    </h2>

                    <p className="text-[10px] text-[#64748B]">
                      Manage company users and access.
                    </p>
                  </div>
                </div>

                <div className="border rounded-[10px] p-3 mb-3">
                  <p className="text-[12px] font-semibold">
                    Admin User
                  </p>

                  <p className="text-[10px] text-[#64748B]">
                    admin@abc.com
                  </p>
                </div>

                <div className="border rounded-[10px] p-3">
                  <p className="text-[12px] font-semibold">
                    HR Manager
                  </p>

                  <p className="text-[10px] text-[#64748B]">
                    hr@abc.com
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert("User management opened.");
                    setPopup(null);
                  }}
                  className="w-full h-[40px] bg-[#1E5EFF] text-white rounded-[8px] text-[11px] font-medium mt-5"
                >
                  Done
                </button>
              </>
            )}

          </div>

        </div>
      )}

    </div>
  );
}