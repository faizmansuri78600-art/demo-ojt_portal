import { useState } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
import Myavtar from "../../assets/images/Myavtar.jpg";

import {
  ChevronRight,
  User,
  Lock,
  KeyRound,
  Bell,
  ShieldCheck,
  Palette,
  Shield,
  Smartphone,
  Camera,
  Pencil,
  Globe,
  Clock,
  Key,
  Download,
  UserX,
  LogOut,
  ShieldQuestion,
  Headset,
} from "lucide-react";

// ================= SETTINGS MENU =================

const menuItems = [
  { label: "Profile Settings", icon: User },
  { label: "Account Settings", icon: Lock },
  { label: "Password", icon: KeyRound },
  { label: "Notification Settings", icon: Bell },
  { label: "Privacy Settings", icon: ShieldCheck },
  { label: "Appearance", icon: Palette },
  { label: "Security", icon: Shield },
  { label: "Connected Devices", icon: Smartphone },
];

// ================= MENU ITEM =================

function SettingsMenuItem({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md
      text-sm font-medium text-left transition
      ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon
        size={17}
        className={active ? "text-blue-600" : "text-gray-400"}
      />
      {label}
    </button>
  );
}

// ================= TOGGLE =================

function ToggleSwitch({ checked, onToggle, label }) {
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      className={`w-10 h-5.5 rounded-full p-0.5 flex transition
      ${checked ? "bg-blue-600 justify-end" : "bg-gray-200 justify-start"}`}
    >
      <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </button>
  );
}

// ================= SETTING ROW =================

function SettingRow({ title, sub, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}

// ================= CARD HEADER =================

function CardHeader({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center">
        <Icon size={17} className="text-gray-600" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}

// ================= QUICK ACTION =================

function QuickAction({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3
      border-b border-gray-100 last:border-0
      hover:bg-gray-50 text-left transition"
    >
      <Icon
        size={16}
        className={danger ? "text-red-500" : "text-gray-500"}
      />

      <span
        className={`text-sm flex-1 ${
          danger ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </span>

      <ChevronRight size={15} className="text-gray-300" />
    </button>
  );
}

// ================= MAIN SETTINGS =================

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState("Profile Settings");

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    portal: true,
  });

  const [language, setLanguage] = useState("English");

  const [timezone, setTimezone] = useState(
    "(GMT+05:30) Asia/Kolkata"
  );

  const profile = {
  fullName: "Ayesha Shaikh",
  enrollment: "AISC/OJT/2024/1015",
  email: "ayesha.shaikh@example.com",
  department: "BCA Science",
  phone: "+91 98765 43210",
  role: "Student",
};

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleEditProfile = () => {
    alert("Edit Profile clicked");
  };

  const handleEnable2FA = () => {
    alert("Two-Factor Authentication");
  };

  const handleQuickAction = (label) => {
    alert(label);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* EXISTING COMMON COMPONENTS */}
      <Header />
      <Sidebar activePage="Settings" />

      {/* MAIN CONTENT */}
      <main className="ml-64 pt-16 min-h-screen">

        <div className="px-6 py-5">

          {/* PAGE HEADER */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900">
              Settings
            </h1>

            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-blue-600 font-medium">
                Dashboard
              </span>

              <ChevronRight
                size={14}
                className="text-gray-400"
              />

              <span className="text-gray-500">
                Settings
              </span>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">

            {/* ================= LEFT MENU ================= */}

            {/* ================= LEFT SETTINGS MENU ================= */}

<div className="xl:col-span-1">
  <div className="bg-white border border-gray-200 rounded-lg p-3 h-full min-h-[720px]">

    <p className="text-xs font-semibold text-gray-400 px-3 pt-1 pb-3">
      SETTINGS MENU
    </p>

    <div className="space-y-1">
      {menuItems.map(({ label, icon }) => (
        <SettingsMenuItem
          key={label}
          label={label}
          icon={icon}
          active={activeMenu === label}
          onClick={() => setActiveMenu(label)}
        />
      ))}
    </div>

  </div>
</div>

              
            

            {/* ================= CENTER ================= */}

            <div className="xl:col-span-2 space-y-4">

              {/* PROFILE SETTINGS */}

              <div className="bg-white border border-gray-200 rounded-lg p-4">

                <div className="flex items-start justify-between mb-4">

                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Profile Settings
                    </h3>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Manage your personal information and profile details.
                    </p>
                  </div>

                  <button
                    onClick={handleEditProfile}
                    className="flex items-center gap-1.5
                    text-xs font-medium text-blue-600
                    border border-blue-200 rounded-md
                    px-3 py-1.5 hover:bg-blue-50"
                  >
                    <Pencil size={12} />
                    Edit Profile
                  </button>

                </div>

                <div className="flex gap-6">

                  {/* PROFILE IMAGE */}

                  <div className="relative shrink-0">

                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
  <img
    src={Myavtar}
    alt="Ayesha Shaikh"
    className="w-full h-full object-cover"
  />
</div> 

                    <button
                      className="absolute bottom-0 right-0
                      w-6 h-6 rounded-full bg-blue-600
                      flex items-center justify-center
                      border-2 border-white"
                    >
                      <Camera
                        size={11}
                        className="text-white"
                      />
                    </button>

                  </div>

                  {/* PROFILE DETAILS */}

                  <div className="grid grid-cols-2 gap-x-10 gap-y-3 flex-1">

                    <div>
                      <p className="text-xs text-gray-400">
                        Full Name
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {profile.fullName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Enrollment Number
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {profile.enrollment}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Email Address
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {profile.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Department
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {profile.department}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Phone Number
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {profile.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Role
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {profile.role}
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* ACCOUNT SETTINGS */}

              <div className="bg-white border border-gray-200 rounded-lg p-4">

                <CardHeader
                  icon={Globe}
                  title="Account Settings"
                  sub="Manage your account preferences."
                />

                <SettingRow
                  title="Language"
                  sub="Choose your preferred language."
                >
                  <div className="relative">
                    <Globe
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                      value={language}
                      onChange={(e) =>
                        setLanguage(e.target.value)
                      }
                      className="border border-gray-200
                      rounded-md py-2 pl-8 pr-8
                      text-sm text-gray-600 w-44
                      outline-none"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                    </select>
                  </div>
                </SettingRow>

                <SettingRow
                  title="Timezone"
                  sub="Select your current timezone."
                >
                  <div className="relative">
                    <Clock
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                      value={timezone}
                      onChange={(e) =>
                        setTimezone(e.target.value)
                      }
                      className="border border-gray-200
                      rounded-md py-2 pl-8 pr-8
                      text-sm text-gray-600 w-56
                      outline-none"
                    >
                      <option>
                        (GMT+05:30) Asia/Kolkata
                      </option>
                      <option>
                        (GMT+00:00) UTC
                      </option>
                      <option>
                        (GMT-05:00) US Eastern
                      </option>
                    </select>
                  </div>
                </SettingRow>

              </div>

              {/* NOTIFICATION SETTINGS */}

              <div className="bg-white border border-gray-200 rounded-lg p-4">

                <CardHeader
                  icon={Bell}
                  title="Notification Settings"
                  sub="Manage how you receive notifications."
                />

                <SettingRow
                  title="Email Notifications"
                  sub="Receive important updates on your email."
                >
                  <ToggleSwitch
                    checked={notifications.email}
                    onToggle={() =>
                      toggleNotification("email")
                    }
                    label="Email notifications"
                  />
                </SettingRow>

                <SettingRow
                  title="SMS Notifications"
                  sub="Receive important updates on your mobile."
                >
                  <ToggleSwitch
                    checked={notifications.sms}
                    onToggle={() =>
                      toggleNotification("sms")
                    }
                    label="SMS notifications"
                  />
                </SettingRow>

                <SettingRow
                  title="Portal Notifications"
                  sub="Show notifications for updates and alerts."
                >
                  <ToggleSwitch
                    checked={notifications.portal}
                    onToggle={() =>
                      toggleNotification("portal")
                    }
                    label="Portal notifications"
                  />
                </SettingRow>

              </div>

              {/* SECURITY */}

              <div className="bg-white border border-gray-200 rounded-lg p-4">

                <CardHeader
                  icon={Shield}
                  title="Security"
                  sub="Manage your security preferences."
                />

                <div className="flex items-center justify-between gap-4 pt-3">

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Two-Factor Authentication (2FA)
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Add an extra layer of security to your account.
                    </p>
                  </div>

                  <button
                    onClick={handleEnable2FA}
                    className="flex items-center gap-1.5
                    text-xs font-medium text-blue-600
                    border border-blue-200 rounded-md
                    px-3 py-1.5 hover:bg-blue-50"
                  >
                    <Lock size={12} />
                    Enable 2FA
                  </button>

                </div>

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div className="xl:col-span-1 space-y-4">

              {/* QUICK ACTIONS */}

              <div className="bg-white border border-gray-200 rounded-lg p-4">

                <h3 className="text-sm font-semibold text-gray-800">
                  Quick Actions
                </h3>

                <div className="mt-2">

                  <QuickAction
                    icon={Key}
                    label="Change Password"
                    onClick={() =>
                      handleQuickAction("Change Password")
                    }
                  />

                  <QuickAction
                    icon={Download}
                    label="Download My Data"
                    onClick={() =>
                      handleQuickAction("Download My Data")
                    }
                  />

                  <QuickAction
                    icon={UserX}
                    label="Deactivate Account"
                    danger
                    onClick={() =>
                      handleQuickAction("Deactivate Account")
                    }
                  />

                  <QuickAction
                    icon={LogOut}
                    label="Log Out From All Devices"
                    onClick={() =>
                      handleQuickAction(
                        "Log Out From All Devices"
                      )
                    }
                  />

                </div>

              </div>

              {/* ACCOUNT STATUS */}

              <div className="bg-white border border-gray-200 rounded-lg p-4">

                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Account Status
                </h3>

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <ShieldCheck
                      size={18}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-green-600">
                      Account Active
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                      Your account is secure and all systems
                      are running fine.
                    </p>
                  </div>

                </div>

              </div>

              {/* NEED HELP */}

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">

                <div className="flex items-center gap-2 mb-2">

                  <ShieldQuestion
                    size={16}
                    className="text-blue-600"
                  />

                  <h3 className="text-sm font-semibold text-gray-800">
                    Need Help?
                  </h3>

                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  If you face any issue with your account
                  settings, please contact the support team.
                </p>

                <button
                  className="w-full flex items-center
                  justify-center gap-1.5
                  text-sm font-medium text-blue-600
                  bg-white border border-blue-200
                  rounded-md py-2 hover:bg-blue-50"
                >
                  <Headset size={14} />
                  Contact Support
                </button>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <footer className="border-t border-gray-200 mt-5 pt-4
          flex items-center justify-between
          text-xs text-gray-400">

            <span>
              © 2025 AISC OJT Portal. All rights reserved.
            </span>

            <span>Version 1.0.0</span>

          </footer>

        </div>
      </main>
    </div>
  );
}