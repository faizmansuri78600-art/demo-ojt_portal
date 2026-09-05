import React, { useState } from "react";

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

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    portalName: "AISC OJT Portal",
    tagline: "Connecting Students, Companies & Opportunities",
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
    allowedFiles: "jpg, png, pdf, doc, docx, xls, xlsx",
  });

  // =========================
  // TOGGLE STATES
  // =========================

  const [autoUpdate, setAutoUpdate] = useState(true);
  const [daylightSaving, setDaylightSaving] = useState(false);

  // =========================
  // ACTIVE TAB
  // =========================

  const [activeTab, setActiveTab] = useState("General Settings");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // RESET
  // =========================

  const handleReset = () => {
    setFormData({
      portalName: "AISC OJT Portal",
      tagline: "Connecting Students, Companies & Opportunities",
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
      allowedFiles: "jpg, png, pdf, doc, docx, xls, xlsx",
    });

    setAutoUpdate(true);
    setDaylightSaving(false);
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  // =========================
  // TABS
  // =========================

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

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="p-6 lg:p-8">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              System Settings
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <span>Dashboard</span>
              <span>›</span>
              <span>System Settings</span>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3">

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              <FaUndo />
              Reset to Default
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
            >
              <FaSave />
              Save Changes
            </button>

          </div>
        </div>


        {/* ================================================= */}
        {/* TABS */}
        {/* ================================================= */}

        <div className="bg-white border-b border-gray-200 mb-5 overflow-x-auto">

          <div className="flex min-w-max">

            {tabs.map((tab) => (

              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
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
        {/* GENERAL SETTINGS TAB */}
        {/* ================================================= */}

        {activeTab === "General Settings" && (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* ================================================= */}
            {/* LEFT - GENERAL SETTINGS */}
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

                <IconBox icon={<FaMapMarkerAlt />} />

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
            {/* RIGHT SIDE */}
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

                <SettingRow icon={<FaCalendarAlt />}>

                  <div className="flex-1">

                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Current Date
                    </label>

                    <div className="relative">

                      <input
                        type="text"
                        value="May 17, 2025"
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm"
                      />

                      <FaCalendarAlt className="absolute right-3 top-3 text-gray-500" />

                    </div>

                  </div>

                </SettingRow>


                {/* TIME */}

                <SettingRow icon={<FaClock />}>

                  <div className="flex-1">

                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Current Time
                    </label>

                    <div className="relative">

                      <input
                        type="text"
                        value="02:30:45 PM"
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm"
                      />

                      <FaClock className="absolute right-3 top-3 text-gray-500" />

                    </div>

                  </div>

                </SettingRow>


                {/* AUTO UPDATE */}

                <SettingRow icon={<FaSyncAlt />}>

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
                      value={autoUpdate}
                      onChange={() => setAutoUpdate(!autoUpdate)}
                    />

                  </div>

                </SettingRow>


                {/* DAYLIGHT */}

                <SettingRow icon={<FaSun />}>

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
                      value={daylightSaving}
                      onChange={() =>
                        setDaylightSaving(!daylightSaving)
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
                  value={formData.maxFileSize}
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
                  value={formData.allowedFiles}
                  onChange={handleChange}
                />


                {/* STORAGE */}

                <div className="flex gap-3 mt-5">

                  <IconBox icon={<FaDatabase />} />

                  <div className="flex-1">

                    <label className="block text-sm font-medium text-slate-800 mb-3">
                      Storage Usage
                    </label>

                    <div className="flex items-center gap-3">

                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: "24.5%" }}
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


                  {/* VERSION */}

                  <InfoCard
                    icon={<FaServer />}
                    title="System Version"
                    value="v1.0.0"
                  />


                  {/* DATABASE */}

                  <InfoCard
                    icon={<FaDatabase />}
                    title="Database Status"
                    value="Connected"
                    success
                  />


                  {/* SERVER */}

                  <InfoCard
                    icon={<FaServer />}
                    title="Server Status"
                    value="Online"
                    success
                  />


                  {/* BACKUP */}

                  <InfoCard
                    icon={<FaShieldVirus />}
                    title="Last Backup"
                    value="May 16, 2025"
                    smallValue="11:30 PM"
                  />

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ================================================= */}
        {/* OTHER TABS */}
        {/* ================================================= */}

        {activeTab !== "General Settings" && (

          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">

            <div className="text-5xl text-blue-500 mb-4">
              {tabs.find((tab) => tab.name === activeTab)?.icon}
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

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

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

function SettingRow({ icon, children }) {
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

function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition ${
        value ? "bg-blue-600" : "bg-gray-300"
      }`}
    >

      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${
          value ? "left-6" : "left-1"
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
          success ? "text-green-600" : "text-slate-800"
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