import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultyLayout from "../../components/faculty/FacultyLayout";
// ---- Student data ----
const student = {
  name: "Aman Khan",
  degree: "BS Software Engineering (7th Semester)",
  studentId: "2021-SE-45",
  email: "aman.khan@aisc.edu.pk",
  status: "On Going",
  photo : "/students/ahmed.jpg",
};

const progressData = {
  overall: 75,
  segments: [
    { label: "Completed", percent: 75, color: "#22c55e" },
    { label: "In Progress", percent: 15, color: "#3b82f6" },
    { label: "Yet to Start", percent: 10, color: "#f97316" },
  ],
};

const personalInfo = [
  { icon: "phone", label: "Phone", value: "8235679475" },
  { icon: "calendar", label: "Date of Birth", value: "12 March 2002" },
  { icon: "id", label: "CNIC", value: "61101-1234567-1" },
  {
    icon: "phone",
    label: "Emergency Contact",
    value: "9123456789 (Father)",
  },
  {
    icon: "pin",
    label: "Address",
    value: "House # 25, Street 12, F-10/3, Islamabad",
  },
  {
    icon: "mail",
    label: "Email",
    value: "aman.khan@aisc.edu.pk",
  },
];

const ojtInfo = [
  {
    icon: "briefcase",
    label: "Company",
    value: "SoftGrid Technologies",
  },
  { icon: "calendar", label: "End Date", value: "20 Apr 2025" },
  {
    icon: "user",
    label: "OJT Role",
    value: "QA Engineer",
  },
  { icon: "clock", label: "Total Duration", value: "6 Months" },
  { icon: "calendar", label: "Start Date", value: "	20 Apr 2025" },
  { icon: "settings", label: "Working Days", value: "4 Days / Week" },
];

const timeline = [
  {
    step: 1,
    label: "OJT Started",
    date: "21 Mar 2025",
    state: "done",
  },
  {
    step: 2,
    label: "Mid-Term Review",
    date: "21 Apr 2025",
    state: "done",
  },
  {
    step: 3,
    label: "Progress Review",
    date: "21 May 2025",
    state: "current",
  },
  {
    step: 4,
    label: "Final Evaluation",
    date: "21 Aug 2025",
    state: "upcoming",
  },
  {
    step: 5,
    label: "OJT Completion",
    date: "21 Nov 2025",
    state: "upcoming",
  },
];

const mentorNote = {
  text:
    "Student is showing good progress and professionalism. Communication and technical skills are improving consistently. Keep up the good work.",
  updated: "10 May 2024",
  author: "Prof. Ayesha Khan",
};

const tabs = [
  { id: "overview", label: "Overview", icon: "users" },
  { id: "diaries", label: "Weekly Diaries", icon: "clipboard" },
  { id: "reports", label: "Reports", icon: "file" },
  { id: "evaluations", label: "Evaluations", icon: "doc" },
  { id: "attendance", label: "Attendance", icon: "clock" },
  { id: "feedback", label: "Feedback", icon: "chat" },
  { id: "documents", label: "Documents", icon: "file2" },
];

// ---- Icons ----
const Icon = ({ name, className = "w-4 h-4" }) => {
  const paths = {
    phone:
      "M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z",
    calendar:
      "M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z",
    id:
      "M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM7 15h4M7 11h1",
    pin:
      "M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
    mail:
      "M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 6l9 7 9-7",
    briefcase:
      "M3 7h18v12a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2",
    user:
      "M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1M12 11a4 4 0 100-8 4 4 0 000 8z",
    clock:
      "M12 8v4l3 3M12 21a9 9 0 100-18 9 9 0 000 18z",
    settings:
      "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.33 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.33 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.33-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.33-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.33H9a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.33l.06-.06a2 2 0 112.83 2.83l.06.06a1.7 1.7 0 00-.33 1.87V9a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.55 1z",
    chat:
      "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z",
    file:
      "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h6M9 9h1",
    file2:
      "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6",
    doc:
      "M9 12h6m-6 4h6m-6-8h1M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z",
    clipboard:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 9l2 2 4-4",
    arrowLeft:
      "M19 12H5m0 0l7 7m-7-7l7-7",
    download:
      "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3",
    check:
      "M5 13l4 4L19 7",
    users:
      "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-4a4 4 0 100-8 4 4 0 000 8zm6 4a4 4 0 00-3-3.87",
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={paths[name]}
      />
    </svg>
  );
};

// ---- Progress Donut ----
const ProgressDonut = ({ overall, segments }) => {
  let cumulative = 0;

  const parts = segments.map((seg) => {
    const start = cumulative;
    cumulative += seg.percent;
    return `${seg.color} ${start}% ${cumulative}%`;
  });

  const gradient = `conic-gradient(${parts.join(", ")})`;

  return (
    <div className="flex items-center gap-8 flex-wrap">
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center shrink-0"
        style={{ background: gradient }}
      >
        <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {overall}%
          </span>

          <span className="text-[10px] text-gray-500 text-center leading-tight">
            Overall
            <br />
            Progress
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {segments.map((seg) => (
          <li
            key={seg.label}
            className="flex items-center gap-2 text-sm"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: seg.color }}
            />

            <span className="text-gray-700 w-24">
              {seg.label}
            </span>

            <span className="text-gray-900 font-medium">
              {seg.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ---- Information Row ----
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
      <Icon name={icon} />
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-800">
        {label}
      </p>

      <p className="text-sm text-gray-500">
        {value}
      </p>
    </div>
  </div>
);

// ---- Timeline Step ----
const TimelineStep = ({ step, isLast }) => {
  const circleClasses =
    step.state === "done"
      ? "bg-green-500 border-green-500 text-white"
      : step.state === "current"
      ? "bg-white border-blue-600 text-blue-600"
      : "bg-white border-gray-300 text-gray-400";

  return (
    <div className="flex items-center flex-1">
      <div className="flex flex-col items-center text-center w-28 shrink-0">
        <div
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${circleClasses}`}
        >
          {step.state === "done" ? (
            <Icon name="check" className="w-4 h-4" />
          ) : (
            step.step
          )}
        </div>

        <p className="text-xs font-semibold text-gray-800 mt-2">
          {step.label}
        </p>

        <p className="text-xs text-gray-500">
          {step.date}
        </p>
      </div>

      {!isLast && (
        <div
          className={`flex-1 h-0.5 mb-8 border-t-2 border-dashed ${
            step.state === "done"
              ? "border-green-400"
              : "border-gray-300"
          }`}
        />
      )}
    </div>
  );
};

// ---- Main Page ----
const StudentDetails =() => {
  const [activeTab, setActiveTab] = useState("overview");
const navigate = useNavigate();

const goBackToStudents = () => {
  navigate("/students");
};
  return (
    <FacultyLayout
      activeItem="studentDetails"
    >
      {/* Back link */}
      <button
        onClick={goBackToStudents}
        className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-4 hover:underline"
      >
        <Icon name="arrowLeft" />
        Back to Assigned Students
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-5">
        Student Details
      </h1>

      {/* Profile + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-4">
          {/* Student Image */}
<div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center text-gray-400">

  {student.photo ? (
    <img
      src={student.photo}
      alt={student.name}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  ) : (
    <Icon name="user" className="w-9 h-9" />
  )}

</div>

          {/* Student Information */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {student.name}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              {student.degree}
            </p>

            <p className="text-sm text-gray-600">
              {student.studentId}
            </p>

            <a
              href={`mailto:${student.email}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {student.email}
            </a>

            <div className="mt-2">
              <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {student.status}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 text-lg mb-4">
            Progress Overview
          </h2>

          <ProgressDonut
            overall={progressData.overall}
            segments={progressData.segments}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 mb-6 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon name={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab !== "overview" ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400 mb-6">
          Coming Soon
        </div>
      ) : (
        <>
          {/* Personal Information + OJT Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 text-lg mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {personalInfo.map((item) => (
                  <InfoRow
                    key={item.label}
                    {...item}
                  />
                ))}
              </div>
            </div>

            {/* OJT Information */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 text-lg mb-4">
                OJT Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ojtInfo.map((item) => (
                  <InfoRow
                    key={item.label}
                    {...item}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Timeline + Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 text-lg mb-6">
                OJT Timeline
              </h2>

              <div className="flex overflow-x-auto pb-2">
                {timeline.map((step, i) => (
                  <TimelineStep
                    key={step.step}
                    step={step}
                    isLast={i === timeline.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Mentor Notes */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 text-lg mb-4">
                Faculty Mentor Notes
              </h2>

              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">

                <div className="flex gap-3">
                  <Icon
                    name="doc"
                    className="w-5 h-5 text-orange-500 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {mentorNote.text}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                  <span>
                    Last Updated: {mentorNote.updated}
                  </span>

                  <span className="font-medium text-gray-700">
                    {mentorNote.author}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3">

        <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50">
          <Icon name="chat" />
          Message Student
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50"
        >
          <Icon name="download" />
          Download Profile
        </button>

        <button
          onClick={goBackToStudents}
          className="flex items-center gap-2 bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-800"
        >
          <Icon name="arrowLeft" />
          Back to List
        </button>

      </div>

    </FacultyLayout>
  );
};
export default StudentDetails;
