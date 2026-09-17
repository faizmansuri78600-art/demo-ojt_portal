import React, { useState , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import FacultyLayout from "../../components/faculty/FacultyLayout";
// ---- Student data ----



const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: "user",
  },
  {
    id: "reports",
    label: "Weekly Reports",
    icon: "file",
  },
  {
    id: "diary",
    label: "Diary",
    icon: "clipboard",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    icon: "check",
  },
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
const StudentDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
const [messageText, setMessageText] = useState("");

  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/faculty/student-details/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Student Details API:", data);

        if (data.success) {
          console.log("STUDENT DATA FROM API:", data.student);
          console.log("PROGRESS FROM API:", data.student.progress);
setStudentData({
  ...data.student,
  mentorNote: data.mentorNote,
});
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Student Details API Error:", error);
        setLoading(false);
      });
  }, [studentId]);
useEffect(() => {
  const fetchWeeklyReports = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/faculty/student-weekly-reports/${studentId}`
      );

      const data = await response.json();

      console.log("Weekly Reports API:", data);

      if (data.success) {
        setWeeklyReports(data.weeklyReports);
      }
    } catch (error) {
      console.error("Weekly Reports Error:", error);
    }
  };

  if (studentId) {
    fetchWeeklyReports();
  }
}, [studentId]);
useEffect(() => {
  const fetchEvaluation = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/faculty/student-evaluation/${studentId}`
      );

      const data = await response.json();

      console.log("Evaluation API:", data);

      if (data.success) {
        setEvaluation(
          data.evaluations.length > 0
            ? data.evaluations[0]
            : null
        );
      }
    } catch (error) {
      console.error("Evaluation Error:", error);
    }
  };

  if (studentId) {
    fetchEvaluation();
  }
}, [studentId]);
const sendMessage = async () => {
  if (!messageText.trim()) {
    alert("Please enter a message");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: `MSG-${Date.now()}`,
          userId: studentData.userId,
          message: messageText,
          isRead: false,
          sentOn: new Date().toISOString(),
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Message sent successfully");
      setMessageText("");
      setShowMessageModal(false);
    } else {
      alert(data.message || "Failed to send message");
    }
  } catch (error) {
    console.error("Send Message Error:", error);
    alert("Failed to send message");
  }
};
  const goBackToStudents = () => {
    navigate("/faculty/AssignedStudents");
  };
  if (loading) {
    return (
      <FacultyLayout activeItem="studentDetails">
        <div className="p-6 text-gray-500">
          Loading student details...
        </div>
      </FacultyLayout>
    );
  }

  if (!studentData) {
    return (
      <FacultyLayout activeItem="studentDetails">
        <div className="p-6 text-red-500">
          Student details not found.
        </div>
      </FacultyLayout>
    );
  }
const progress = Number(studentData.progress || 0);

const progressData = {
  overall: progress,
  segments: [
    {
      label: "Completed",
      percent: progress,
      color: "#22c55e",
    },
    {
      label: "Remaining",
      percent: 100 - progress,
      color: "#e5e7eb",
    },
  ],
};
console.log("FINAL PROGRESS:", progress);
console.log("PROGRESS DATA:", progressData);
  const personalInfo = [
  {
    icon: "phone",
    label: "Phone",
    value: studentData.phone || "Not Available",
  },
  {
    icon: "mail",
    label: "Email",
    value: studentData.email || "Not Available",
  },
  {
    icon: "id",
    label: "Student ID",
    value: studentData.studentId || "Not Available",
  },
  {
    icon: "id",
    label: "Roll Number",
    value: studentData.rollNumber || "Not Available",
  },
  {
    icon: "users",
    label: "Department",
    value: studentData.department || "Not Available",
  },
];

const ojtInfo = [
  {
    icon: "briefcase",
    label: "Company",
    value: studentData.companyName || "Not Available",
  },
  {
    icon: "user",
    label: "OJT Role",
    value: studentData.role || "Not Available",
  },
  {
    icon: "calendar",
    label: "Start Date",
    value: studentData.startDate || "Not Available",
  },
  {
    icon: "calendar",
    label: "End Date",
    value: studentData.endDate || "Not Available",
  },
  {
    icon: "clock",
    label: "OJT Status",
    value: studentData.ojtStatus || studentData.status || "Not Available",
  },
];
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

  {studentData.profilePhotoUrl ? (
  <img
    src={studentData.profilePhotoUrl}
    alt={studentData.name}
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
              {studentData.name}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
  {studentData.department}
</p>

<p className="text-sm text-gray-600">
  {studentData.studentId}
</p>

            <a
              href={`mailto:${studentData.email}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {studentData.email}
            </a>

            <div className="mt-2">
              <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {studentData.status}
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
      {activeTab === "reports" ? (
  <div className="space-y-4 mb-6">
    {weeklyReports.length === 0 ? (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
        No weekly reports available
      </div>
    ) : (
      weeklyReports.map((report) => (
        <div
          key={report._id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Week {report.weekNumber}
            </h3>

            <span className="text-sm text-gray-500">
              {report.submittedOn}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Task Assigned</p>
              <p className="text-gray-800 font-medium">
                {report.taskAssigned}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Work Completed</p>
              <p className="text-gray-800">
                {report.workCompleted}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Faculty Remarks</p>
              <p className="text-gray-800">
                {report.facultyRemarks || "No remarks"}
              </p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
) : activeTab === "evaluation" ? (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
    {evaluation ? (
      <>
        <h3 className="text-lg font-semibold text-gray-800 mb-5">
          Evaluation Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-500">Hours Marks</p>
            <p className="text-gray-800 font-medium">
              {evaluation.hoursMarks}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Performance Marks</p>
            <p className="text-gray-800 font-medium">
              {evaluation.performanceMarks}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Punctuality Marks</p>
            <p className="text-gray-800 font-medium">
              {evaluation.punctualityMarks}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Weekly Report Marks</p>
            <p className="text-gray-800 font-medium">
              {evaluation.weeklyReportMarks}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Final Report Marks</p>
            <p className="text-gray-800 font-medium">
              {evaluation.finalReportMarks}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Viva Marks</p>
            <p className="text-gray-800 font-medium">
              {evaluation.vivaMarks}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Marks</p>
            <p className="text-gray-800 font-medium">
              {evaluation.totalMarks}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Evaluation Date</p>
            <p className="text-gray-800 font-medium">
              {evaluation.evaluatedOn}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm text-gray-500">Remarks</p>
          <p className="text-gray-800">
            {evaluation.remarks || "No remarks"}
          </p>
        </div>
      </>
    ) : (
      <div className="p-6 text-center text-gray-400">
        No evaluation available
      </div>
    )}
  </div>
) : activeTab === "diary" ? (
  <div className="space-y-4 mb-6">
    {weeklyReports.length === 0 ? (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
        No diary entries available
      </div>
    ) : (
      weeklyReports.map((report) => (
        <div
          key={report._id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Week {report.weekNumber}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Submitted on: {report.submittedOn}
              </p>
            </div>

            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                report.status === "Approved"
                  ? "bg-green-50 text-green-700"
                  : report.status === "Revision Requested"
                  ? "bg-red-50 text-red-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
            >
              {report.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Task Assigned
              </p>

              <p className="text-sm text-gray-800 font-medium mt-1">
                {report.taskAssigned || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Work Completed
              </p>

              <p className="text-sm text-gray-800 mt-1">
                {report.workCompleted || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Faculty Remarks
              </p>

              <p className="text-sm text-gray-800 mt-1">
                {report.facultyRemarks || "No remarks"}
              </p>
            </div>
          </div>
        </div>
      ))
    )}
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
                {(studentData.timeline || []).map((step, i) => (
                  <TimelineStep
                    key={step.step}
                    step={step}
                    isLast={i === (studentData.timeline || []).length - 1}
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
                    {studentData.mentorNote?.text || "No mentor notes available."}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                  <span>
                    Last Updated: {studentData.mentorNote?.updated || "Not Available"}
                  </span>

                  <span className="font-medium text-gray-700">
                    {studentData.mentorNote?.author || "Faculty Mentor"}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Actions */}
<div className="flex flex-wrap items-center justify-end gap-3">

  <button
    onClick={() => setShowMessageModal(true)}
    className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50"
  >
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
{showMessageModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Message Student
        </h2>

        <button
          onClick={() => setShowMessageModal(false)}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        To: {studentData.name}
      </p>

      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Write your message..."
        rows="5"
        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => {
            setMessageText("");
            setShowMessageModal(false);
          }}
          className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={sendMessage}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
        >
          Send Message
        </button>
      </div>

    </div>
  </div>
)}

    </FacultyLayout>
  );
};
export default StudentDetails;
