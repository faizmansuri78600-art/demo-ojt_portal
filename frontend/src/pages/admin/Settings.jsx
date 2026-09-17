import React, { useEffect, useState } from "react";

import {
  FaCog,
  FaDesktop,
  FaEnvelope,
  FaShieldAlt,
  FaBell,
  FaCloud,
  FaHistory,
  FaUndo,
  FaSave,
  FaBuilding,
  FaTag,
  FaUniversity,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaCalendarAlt,
  FaClock,
  FaSyncAlt,
  FaSun,
  FaUpload,
  FaFileAlt,
  FaDatabase,
  FaServer,
  FaShieldVirus,
} from "react-icons/fa";

function Settings() {
  // =====================================================
  // API
  // =====================================================

  const API_URL = "http://localhost:5000";

  // =====================================================
  // DEFAULT SETTINGS
  // =====================================================

  const defaultSettings = {
    portalName: "AISC OJT Portal",
    tagline:
      "Connecting Students, Companies & Opportunities",
    organization:
      "Abeda Inamdar Senior College Of Arts, Science & Commerce",
    address:
      "2390-B, K.B. Hidayatullah Road, Azam Campus, Pune - 411001, Maharashtra, India",
    email: "ojtportal@aisc.edu.in",
    phone: "+91 20 2646 6121",
    timezone: "(GMT+05:30) Asia / Kolkata",
    dateFormat: "DD MMM YYYY (17 May 2025)",
    timeFormat: "12 Hour (02:30 PM)",
    maxFileSize: "10 MB",
    allowedFiles:
      "jpg, png, pdf, doc, docx, xls, xlsx",
    autoUpdate: true,
    daylightSaving: false,
  };

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] =
    useState(defaultSettings);

  // =====================================================
  // STATES
  // =====================================================

  const [activeTab, setActiveTab] =
    useState("General Settings");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [resetting, setResetting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH SETTINGS
  // =====================================================

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Admin token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/settings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch settings"
        );
      }

      if (data.settings) {
        setFormData({
          ...defaultSettings,
          ...data.settings,
        });
      }
    } catch (err) {
      console.error(
        "Fetch Settings Error:",
        err
      );

      setError(
        err.message ||
          "Failed to load settings"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET TO DEFAULT
  // =====================================================

  const handleReset = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all settings to default?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setResetting(true);
      setError("");
      setMessage("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Admin token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/settings/reset`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to reset settings"
        );
      }

      if (data.settings) {
        setFormData({
          ...defaultSettings,
          ...data.settings,
        });
      }

      setMessage(
        "Settings reset to default successfully!"
      );
    } catch (err) {
      console.error(
        "Reset Settings Error:",
        err
      );

      setError(
        err.message ||
          "Failed to reset settings"
      );
    } finally {
      setResetting(false);
    }
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Admin token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            portalName:
              formData.portalName,

            tagline:
              formData.tagline,

            organization:
              formData.organization,

            address:
              formData.address,

            email:
              formData.email,

            phone:
              formData.phone,

            timezone:
              formData.timezone,

            dateFormat:
              formData.dateFormat,

            timeFormat:
              formData.timeFormat,

            maxFileSize:
              formData.maxFileSize,

            allowedFiles:
              formData.allowedFiles,

            autoUpdate:
              formData.autoUpdate,

            daylightSaving:
              formData.daylightSaving,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save settings"
        );
      }

      if (data.settings) {
        setFormData({
          ...defaultSettings,
          ...data.settings,
        });
      }

      setMessage(
        "Settings saved successfully!"
      );
    } catch (err) {
      console.error(
        "Save Settings Error:",
        err
      );

      setError(
        err.message ||
          "Failed to save settings"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // TABS
  // =====================================================

  const tabs = [
    {
      name: "General Settings",
      icon: <FaCog />,
    },
    {
      name: "Portal Settings",
      icon: <FaDesktop />,
    },
    {
      name: "Email Settings",
      icon: <FaEnvelope />,
    },
    {
      name: "Security Settings",
      icon: <FaShieldAlt />,
    },
    {
      name: "Notification Settings",
      icon: <FaBell />,
    },
    {
      name: "Backup & Restore",
      icon: <FaCloud />,
    },
    {
      name: "Activity Logs",
      icon: <FaHistory />,
    },
  ];

  // =====================================================
  // CURRENT DATE
  // =====================================================

  const currentDate =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  // =====================================================
  // CURRENT TIME
  // =====================================================

  const currentTime =
    new Date().toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading system settings...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="p-6 lg:p-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              System Settings
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">

              <span>
                Dashboard
              </span>

              <span>
                ›
              </span>

              <span>
                System Settings
              </span>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-3">

            <button
              onClick={handleReset}
              disabled={resetting || saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >

              <FaUndo />

              {resetting
                ? "Resetting..."
                : "Reset to Default"}

            </button>

            <button
              onClick={handleSave}
              disabled={saving || resetting}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
            >

              <FaSave />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================================= */}

        {message && (

          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {message}
          </div>

        )}

        {/* ================================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================================= */}

        {error && (

          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>

        )}

        {/* ================================================= */}
        {/* TABS */}
        {/* ================================================= */}

        <div className="bg-white border-b border-gray-200 mb-5 overflow-x-auto">

          <div className="flex min-w-max">

            {tabs.map((tab) => (

              <button
                key={tab.name}
                onClick={() =>
                  setActiveTab(tab.name)
                }
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.name
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:text-blue-600"
                }`}
              >

                {tab.icon}

                {tab.name}

              </button>

            ))}

          </div>

        </div>

        {/* ================================================= */}
        {/* GENERAL SETTINGS */}
        {/* ================================================= */}

        {activeTab ===
          "General Settings" && (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* ================================================= */}
            {/* LEFT */}
            {/* ================================================= */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

              <div className="mb-5">

                <h2 className="text-lg font-bold text-slate-900">
                  General Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage basic information about the OJT Portal.
                </p>

              </div>

              {/* PORTAL NAME */}

              <SettingInput
                icon={<FaBuilding />}
                label="Portal Name"
                name="portalName"
                value={formData.portalName}
                onChange={handleChange}
              />

              {/* TAGLINE */}

              <SettingInput
                icon={<FaTag />}
                label="Portal Tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
              />

              {/* ORGANIZATION */}

              <SettingInput
                icon={<FaUniversity />}
                label="Organization Name"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />

              {/* ADDRESS */}

              <div className="flex gap-3 mb-4">

                <IconBox
                  icon={<FaMapMarkerAlt />}
                />

                <div className="flex-1">

                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <SettingInput
                icon={<FaEnvelope />}
                label="Contact Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              {/* PHONE */}

              <SettingInput
                icon={<FaPhone />}
                label="Contact Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {/* TIMEZONE */}

              <SettingSelect
                icon={<FaGlobe />}
                label="Default Timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                options={[
                  "(GMT+05:30) Asia / Kolkata",
                  "(GMT+00:00) Europe / London",
                  "(GMT-05:00) America / New York",
                  "(GMT+08:00) Asia / Singapore",
                ]}
              />

              {/* DATE FORMAT */}

              <SettingSelect
                icon={<FaCalendarAlt />}
                label="Date Format"
                name="dateFormat"
                value={formData.dateFormat}
                onChange={handleChange}
                options={[
                  "DD MMM YYYY (17 May 2025)",
                  "DD/MM/YYYY",
                  "MM/DD/YYYY",
                  "YYYY-MM-DD",
                ]}
              />

              {/* TIME FORMAT */}

              <SettingSelect
                icon={<FaClock />}
                label="Time Format"
                name="timeFormat"
                value={formData.timeFormat}
                onChange={handleChange}
                options={[
                  "12 Hour (02:30 PM)",
                  "24 Hour (14:30)",
                ]}
              />

            </div>

            {/* ================================================= */}
            {/* RIGHT */}
            {/* ================================================= */}

            <div className="space-y-5">

              {/* ================================================= */}
              {/* DATE & TIME */}
              {/* ================================================= */}

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                <h2 className="text-lg font-bold text-slate-900">
                  Date & Time Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Configure the system date and time preferences.
                </p>

                {/* DATE */}

                <SettingRow
                  icon={<FaCalendarAlt />}
                >

                  <div className="flex-1">

                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Current Date
                    </label>

                    <div className="relative">

                      <input
                        type="text"
                        value={currentDate}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm bg-gray-50"
                      />

                      <FaCalendarAlt className="absolute right-3 top-3 text-gray-500" />

                    </div>

                  </div>

                </SettingRow>

                {/* TIME */}

                <SettingRow
                  icon={<FaClock />}
                >

                  <div className="flex-1">

                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Current Time
                    </label>

                    <div className="relative">

                      <input
                        type="text"
                        value={currentTime}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm bg-gray-50"
                      />

                      <FaClock className="absolute right-3 top-3 text-gray-500" />

                    </div>

                  </div>

                </SettingRow>

                {/* AUTO UPDATE */}

                <SettingRow
                  icon={<FaSyncAlt />}
                >

                  <div className="flex items-center justify-between w-full">

                    <div>

                      <p className="text-sm font-medium text-slate-800">
                        Auto Update Time
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Automatically sync time with server
                      </p>

                    </div>

                    <Toggle
                      value={
                        formData.autoUpdate
                      }
                      onChange={() =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            autoUpdate:
                              !previous.autoUpdate,
                          })
                        )
                      }
                    />

                  </div>

                </SettingRow>

                {/* DAYLIGHT */}

                <SettingRow
                  icon={<FaSun />}
                >

                  <div className="flex items-center justify-between w-full">

                    <div>

                      <p className="text-sm font-medium text-slate-800">
                        Daylight Saving Time
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Enable daylight saving time
                      </p>

                    </div>

                    <Toggle
                      value={
                        formData.daylightSaving
                      }
                      onChange={() =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            daylightSaving:
                              !previous.daylightSaving,
                          })
                        )
                      }
                    />

                  </div>

                </SettingRow>

              </div>

              {/* ================================================= */}
              {/* FILE UPLOAD */}
              {/* ================================================= */}

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                <h2 className="text-lg font-bold text-slate-900">
                  File Upload Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Configure file upload preferences and restrictions.
                </p>

                {/* MAX SIZE */}

                <SettingSelect
                  icon={<FaUpload />}
                  label="Maximum File Size"
                  name="maxFileSize"
                  value={
                    formData.maxFileSize
                  }
                  onChange={handleChange}
                  options={[
                    "5 MB",
                    "10 MB",
                    "20 MB",
                    "50 MB",
                  ]}
                />

                {/* ALLOWED TYPES */}

                <SettingInput
                  icon={<FaFileAlt />}
                  label="Allowed File Types"
                  name="allowedFiles"
                  value={
                    formData.allowedFiles
                  }
                  onChange={handleChange}
                />

                {/* STORAGE */}

                <div className="flex gap-3 mt-5">

                  <IconBox
                    icon={<FaDatabase />}
                  />

                  <div className="flex-1">

                    <label className="block text-sm font-medium text-slate-800 mb-3">
                      Storage Usage
                    </label>

                    <div className="flex items-center gap-3">

                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: "24.5%",
                          }}
                        ></div>

                      </div>

                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        2.45 GB / 10 GB
                      </span>

                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      24.5% used
                    </p>

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* SYSTEM INFORMATION */}
              {/* ================================================= */}

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                <h2 className="text-lg font-bold text-slate-900">
                  System Information
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Important system information and status.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                  <InfoCard
                    icon={<FaServer />}
                    title="System Version"
                    value="v1.0.0"
                  />

                  <InfoCard
                    icon={<FaDatabase />}
                    title="Database Status"
                    value="Connected"
                    success
                  />

                  <InfoCard
                    icon={<FaServer />}
                    title="Server Status"
                    value="Online"
                    success
                  />

                  <InfoCard
                    icon={<FaShieldVirus />}
                    title="Last Backup"
                    value="Not Available"
                    smallValue="Backend not connected"
                  />

                </div>

              </div>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* OTHER TABS */}
        {/* ================================================= */}

        {activeTab !==
          "General Settings" && (

          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">

            <div className="text-5xl text-blue-500 mb-4 flex justify-center">

              {
                tabs.find(
                  (tab) =>
                    tab.name ===
                    activeTab
                )?.icon
              }

            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {activeTab}
            </h2>

            <p className="text-gray-500 mt-2">
              This section will be configured later.
            </p>

          </div>

        )}

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500 mt-6 pt-5 border-t border-gray-200">

          <p>
            © 2025 AISC OJT Portal &nbsp;|&nbsp; All rights reserved.
          </p>

          <p>
            Version 1.0.0
          </p>

        </div>

      </main>

    </div>
  );
}


/* ================================================= */
/* REUSABLE INPUT */
/* ================================================= */

function SettingInput({
  icon,
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div className="flex gap-3 mb-4">

      <IconBox icon={icon} />

      <div className="flex-1">

        <label className="block text-sm font-medium text-slate-800 mb-2">
          {label}
        </label>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

      </div>

    </div>
  );
}


/* ================================================= */
/* SELECT */
/* ================================================= */

function SettingSelect({
  icon,
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="flex gap-3 mb-4">

      <IconBox icon={icon} />

      <div className="flex-1">

        <label className="block text-sm font-medium text-slate-800 mb-2">
          {label}
        </label>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >

          {options.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}

        </select>

      </div>

    </div>
  );
}


/* ================================================= */
/* ICON BOX */
/* ================================================= */

function IconBox({ icon }) {
  return (
    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-6">
      {icon}
    </div>
  );
}


/* ================================================= */
/* SETTING ROW */
/* ================================================= */

function SettingRow({
  icon,
  children,
}) {
  return (
    <div className="flex gap-3 mb-4">

      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {children}

    </div>
  );
}


/* ================================================= */
/* TOGGLE */
/* ================================================= */

function Toggle({
  value,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition ${
        value
          ? "bg-blue-600"
          : "bg-gray-300"
      }`}
    >

      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${
          value
            ? "left-6"
            : "left-1"
        }`}
      ></span>

    </button>
  );
}


/* ================================================= */
/* INFORMATION CARD */
/* ================================================= */

function InfoCard({
  icon,
  title,
  value,
  smallValue,
  success,
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 text-center">

      <div className="w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>

      <p className="text-xs text-gray-500">
        {title}
      </p>

      <p
        className={`text-sm font-semibold mt-1 ${
          success
            ? "text-green-600"
            : "text-slate-800"
        }`}
      >
        {value}
      </p>

      {smallValue && (
        <p className="text-xs text-gray-500 mt-1">
          {smallValue}
        </p>
      )}

    </div>
  );
}


export default Settings;