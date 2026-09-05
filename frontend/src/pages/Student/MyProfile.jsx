import { useState } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
import tcsLogo from "../../assets/logos/tcslogo.png";
import MyAvtar from "../../assets/images/Myavtar.jpg";

import {
  ChevronRight,
  Pencil,
  Download,
  Camera,
  CheckCircle2,
  Circle,
  Mail,
  Phone,
  Building2,
  MapPin,
  User,
  FileText,
  Eye,
  RefreshCw,
  Globe,
  ExternalLink,
  Lock,
  ShieldCheck,
  Bell,
  MessageSquare,
  EyeOff,
  X,
  Save,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function MyProfile() {

  // ================= STUDENT DATA =================

  const [student, setStudent] = useState({
    name: "Ayesha Shaikh",
    status: "Active Student",
    rollNo: "BCA-2023-045",
    department: "Bachelor of Computer Application",
    semester: "Semester VI",
    studentId: "AISC2023045",
    email: "ayesha.shaikh@aisc.edu.in",
    mobile: "+91 98765 43210",
    address: "Pune, Maharashtra",
    role: "Student",
    skills:
      "Python, Flask, PostgreSQL, HTML, CSS, JavaScript, Git, Java, DBMS, OOPs",
  });

  // ================= EDIT PROFILE STATE =================

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editForm, setEditForm] = useState(student);

  // ================= SETTINGS =================

  const [settings, setSettings] = useState({
    twoFactor: true,
    emailNotifications: true,
    smsNotifications: true,
    privacySettings: false,
  });

  const toggleSetting = (key) =>
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  // ================= PROFILE COMPLETION =================

  const profileCompletion = 90;

  const completionChecklist = [
    { label: "Personal Info", done: true },
    { label: "Academic Info", done: true },
    { label: "Skills", done: true },
    { label: "Documents", done: true },
    { label: "Resume Upload", done: false },
  ];

  // ================= PERSONAL INFORMATION =================

  const personalInfo = [
    { label: "Full Name", value: student.name },
    { label: "Gender", value: "Female" },
    { label: "Date of Birth", value: "15 Jun 2004" },
    { label: "Address", value: student.address },
    { label: "City", value: "Pune" },
    { label: "State", value: "Maharashtra" },
    { label: "PIN Code", value: "411034" },
    { label: "Blood Group", value: "B+" },
    {
      label: "Emergency Contact",
      value: "+91 87654 32109 (Father)",
    },
  ];

  // ================= ACADEMIC INFORMATION =================

  const academicInfo = [
    {
      label: "College Name",
      value: "Abeda Inamdar Senior College",
    },
    {
      label: "Course",
      value: "Bachelor of Computer Application",
    },
    {
      label: "Department",
      value: "BCA",
    },
    {
      label: "Roll Number",
      value: student.rollNo,
    },
    {
      label: "University Reg. No.",
      value: "MU12345678910",
    },
    {
      label: "Academic Year",
      value: "2023 - 2026",
    },
    {
      label: "Admission Year",
      value: "2023",
    },
  ];

  const cgpa = "8.45 / 10.00";

  // ================= SKILLS =================

  const skills = [
    "Python",
    "Flask",
    "PostgreSQL",
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "Java",
    "Problem Solving",
    "DBMS",
    "OOPs",
    "Communication",
    "Teamwork",
    "Leadership",
  ];

  // ================= RESUME =================

  const resume = {
    fileName: "Ayesha_Shaikh_Resume.pdf",
    uploadedOn: "15 May 2025",
    size: "245 KB",
  };

  // ================= DOCUMENTS =================

  const documents = [
    {
      label: "Aadhar Card",
      sub: "aadhar.pdf",
    },
    {
      label: "College ID Card",
      sub: "idcard.pdf",
    },
    {
      label: "Bonafide Certificate",
      sub: "bonafide.pdf",
    },
    {
      label: "10th Marksheet",
      sub: "10th.pdf",
    },
    {
      label: "12th Marksheet",
      sub: "12th.pdf",
    },
  ];

  // ================= OJT INFORMATION =================

  const ojtInfo = {
    company: "Tata Consultancy Services",
    mentor: "Mr. Rahul Sharma",
    joiningDate: "01 Apr 2025",
    endDate: "30 Jun 2025",
    location: "Pune, Maharashtra",
    hoursCompleted: 85,
    hoursTotal: 120,
    attendance: 92,
  };

  // ================= SOCIAL LINKS =================

  const socialLinks = [
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ayesha-shaikh",
      icon: FaLinkedin,
    },
    {
      label: "GitHub",
      value: "github.com/ayesha-shaikh",
      icon: FaGithub,
    },
    {
      label: "Portfolio",
      value: "ayesha-shaikh.dev",
      icon: Globe,
    },
    {
      label: "Email",
      value: student.email,
      icon: Mail,
    },
  ];

  // ================= PROGRESS =================

  const radius = 42;

  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference -
    (profileCompletion / 100) * circumference;

  const hoursPercent = Math.round(
    (ojtInfo.hoursCompleted / ojtInfo.hoursTotal) * 100
  );

  // ================= OPEN EDIT PROFILE =================

  const handleEditProfile = () => {
    setEditForm(student);
    setIsEditOpen(true);
  };

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE PROFILE =================

  const handleSaveProfile = () => {
    setStudent(editForm);
    setIsEditOpen(false);

    alert("Profile updated successfully!");
  };

  // ================= CANCEL =================

  const handleCancelEdit = () => {
    setEditForm(student);
    setIsEditOpen(false);
  };

  // ================= IMAGE CHANGE =================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      alert("Profile photo selected: " + file.name);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* ================= HEADER ================= */}

      <Header />

      <div className="flex flex-1 overflow-hidden pt-16">

        {/* ================= EXISTING SIDEBAR ================= */}

        <Sidebar activePage="My Profile" />

        {/* ================= MAIN CONTENT ================= */}

        <main className="flex-1 ml-64 overflow-y-auto p-6">

          {/* ================= BREADCRUMB ================= */}

          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">

            <span>Dashboard</span>

            <ChevronRight size={12} />

            <span className="text-gray-600 font-medium">
              My Profile
            </span>

          </div>

          {/* ================= PAGE TITLE ================= */}

          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">

            <div>

              <h1 className="text-2xl font-bold text-gray-800">
                My Profile
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage your personal, academic and professional
                information.
              </p>

            </div>

            <div className="flex gap-2">

              {/* EDIT PROFILE BUTTON */}

              <button
                onClick={handleEditProfile}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 border border-blue-200 bg-white px-4 py-2 rounded-md hover:bg-blue-50"
              >

                <Pencil size={14} />

                Edit Profile

              </button>

              {/* DOWNLOAD RESUME */}
              

              <button
  onClick={() => alert("Resume download started! 📄")}
  className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
>
  <Download size={14} />
  Download Resume
</button>

            </div>

          </div>

          {/* ================================================= */}
          {/* PROFILE HEADER CARD */}
          {/* ================================================= */}

          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 flex flex-wrap items-center justify-between gap-6">

            <div className="flex items-center gap-5">

              {/* PROFILE IMAGE */}

              <div className="relative shrink-0">

                <img
                  src={MyAvtar}
                  alt={student.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                />

                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white cursor-pointer"
                >

                  <Camera
                    size={11}
                    className="text-white"
                  />

                </label>

                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </div>

              {/* STUDENT DETAILS */}

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-lg font-bold text-gray-800">
                    {student.name}
                  </h2>

                  <span className="text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">
                    {student.status}
                  </span>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mt-3 text-xs text-gray-500">

                  <span className="flex items-center gap-1.5">
                    <User size={13} />
                    Roll No: {student.rollNo}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} />
                    Department: {student.department}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <User size={13} />
                    Student ID: {student.studentId}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FileText size={13} />
                    Semester: {student.semester}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Mail size={13} />
                    Email: {student.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone size={13} />
                    Mobile: {student.mobile}
                  </span>

                </div>

              </div>

            </div>

            {/* PROFILE COMPLETION */}

            <div className="flex items-center gap-5 shrink-0">

              <div className="relative w-24 h-24">

                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 96 96"
                >

                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />

                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                  <span className="text-lg font-bold text-gray-800">
                    {profileCompletion}%
                  </span>

                  <span className="text-[9px] text-gray-400">
                    Completed
                  </span>

                </div>

              </div>

              <ul className="space-y-1.5 text-xs">

                {completionChecklist.map(
                  ({ label, done }) => (

                    <li
                      key={label}
                      className="flex items-center gap-1.5"
                    >

                      {done ? (
                        <CheckCircle2
                          size={13}
                          className="text-green-500"
                        />
                      ) : (
                        <Circle
                          size={13}
                          className="text-gray-300"
                        />
                      )}

                      <span
                        className={
                          done
                            ? "text-gray-600"
                            : "text-gray-400"
                        }
                      >
                        {label}
                      </span>

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

          {/* ================================================= */}
          {/* ROW 1 */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            {/* PERSONAL INFORMATION */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  Personal Information
                </h3>

                <button
                  onClick={handleEditProfile}
                  className="flex items-center gap-1 text-xs text-blue-600 font-medium"
                >

                  <Pencil size={12} />

                  Edit

                </button>

              </div>

              <ul className="space-y-2 text-xs">

                {personalInfo.map(
                  ({ label, value }) => (

                    <li
                      key={label}
                      className="flex justify-between gap-3"
                    >

                      <span className="text-gray-400">
                        {label}
                      </span>

                      <span className="text-gray-700 font-medium text-right">
                        {value}
                      </span>

                    </li>

                  )
                )}

              </ul>

            </div>

            {/* ACADEMIC INFORMATION */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  Academic Information
                </h3>

                <button className="flex items-center gap-1 text-xs text-blue-600 font-medium">

                  <Pencil size={12} />

                  Edit

                </button>

              </div>

              <ul className="space-y-2 text-xs mb-3">

                {academicInfo.map(
                  ({ label, value }) => (

                    <li
                      key={label}
                      className="flex justify-between gap-3"
                    >

                      <span className="text-gray-400">
                        {label}
                      </span>

                      <span className="text-gray-700 font-medium text-right">
                        {value}
                      </span>

                    </li>

                  )
                )}

              </ul>

              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-md px-3 py-2">

                <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0">

                  <FileText
                    size={13}
                    className="text-white"
                  />

                </div>

                <div>

                  <p className="text-[10px] text-blue-500">
                    CGPA
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    {cgpa}
                  </p>

                </div>

              </div>

            </div>

            {/* SKILLS */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  Skills
                </h3>

                <button
                  onClick={handleEditProfile}
                  className="flex items-center gap-1 text-xs text-blue-600 font-medium"
                >

                  <Pencil size={12} />

                  Edit Skills

                </button>

              </div>

              <div className="flex flex-wrap gap-2 mb-4">

                {skills.map((skill) => (

                  <span
                    key={skill}
                    className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>

                ))}

              </div>

              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Resume
              </h4>

              <div className="flex items-center gap-3 border border-gray-100 rounded-md p-2.5">

                <div className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center shrink-0">

                  <FileText
                    size={14}
                    className="text-red-500"
                  />

                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-xs font-medium text-gray-700 truncate">
                    {resume.fileName}
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Uploaded on {resume.uploadedOn} ·{" "}
                    {resume.size}
                  </p>

                </div>

                <button className="text-gray-400 hover:text-blue-600">

                  <Eye size={15} />

                </button>

                <button className="text-gray-400 hover:text-blue-600">

                  <Download size={15} />

                </button>

              </div>

              <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-blue-600 border border-blue-100 bg-blue-50 py-2 rounded-md mt-2 hover:bg-blue-100">

                <RefreshCw size={12} />

                Replace

              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* ROW 2 */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            {/* DOCUMENTS */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  Documents
                </h3>

                <button className="text-xs text-blue-600 font-medium">
                  View All
                </button>

              </div>

              <div className="grid grid-cols-2 gap-3">

                {documents.map(
                  ({ label, sub }) => (

                    <div
                      key={label}
                      className="border border-gray-100 rounded-md p-2.5 flex flex-col items-center text-center"
                    >

                      <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center mb-2">

                        <FileText
                          size={16}
                          className="text-blue-600"
                        />

                      </div>

                      <p className="text-xs font-medium text-gray-700 leading-tight">
                        {label}
                      </p>

                      <p className="text-[10px] text-gray-400 truncate w-full">
                        {sub}
                      </p>

                      <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium mt-1">

                        <CheckCircle2 size={11} />

                        Verified

                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* OJT INFORMATION */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  OJT Information
                </h3>

                <button className="text-xs text-blue-600 font-medium">
                  View Details
                </button>

              </div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-10 h-10 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">

                  <img
                    src={tcsLogo}
                    alt="Company"
                    className="w-full h-full object-contain"
                  />

                </div>

                <p className="text-sm font-semibold text-gray-800">
                  {ojtInfo.company}
                </p>

              </div>

              <ul className="space-y-2 text-xs mb-4">

                <li className="flex items-center gap-2 text-gray-500">

                  <User size={13} />

                  Mentor:

                  <span className="text-gray-700 font-medium ml-auto">
                    {ojtInfo.mentor}
                  </span>

                </li>

                <li className="flex items-center gap-2 text-gray-500">

                  <FileText size={13} />

                  Joining Date:

                  <span className="text-gray-700 font-medium ml-auto">
                    {ojtInfo.joiningDate}
                  </span>

                </li>

                <li className="flex items-center gap-2 text-gray-500">

                  <FileText size={13} />

                  Expected End Date:

                  <span className="text-gray-700 font-medium ml-auto">
                    {ojtInfo.endDate}
                  </span>

                </li>

                <li className="flex items-center gap-2 text-gray-500">

                  <MapPin size={13} />

                  Location:

                  <span className="text-gray-700 font-medium ml-auto">
                    {ojtInfo.location}
                  </span>

                </li>

              </ul>

              <div className="mb-2">

                <div className="flex justify-between text-xs mb-1">

                  <span className="text-gray-500">
                    Hours Completed
                  </span>

                  <span className="font-medium text-gray-700">
                    {ojtInfo.hoursCompleted} /{" "}
                    {ojtInfo.hoursTotal} ({hoursPercent}%)
                  </span>

                </div>

                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${hoursPercent}%`,
                    }}
                  />

                </div>

              </div>

              <div>

                <div className="flex justify-between text-xs mb-1">

                  <span className="text-gray-500">
                    Attendance
                  </span>

                  <span className="font-medium text-gray-700">
                    {ojtInfo.attendance}%
                  </span>

                </div>

                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${ojtInfo.attendance}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* SOCIAL LINKS */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  Social &amp; Professional Links
                </h3>

                <button className="flex items-center gap-1 text-xs text-blue-600 font-medium">

                  <Pencil size={12} />

                  Edit

                </button>

              </div>

              <ul className="space-y-3">

                {socialLinks.map(
                  ({ label, value, icon: Icon }) => (

                    <li
                      key={label}
                      className="flex items-center gap-3"
                    >

                      <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">

                        <Icon
                          size={14}
                          className="text-gray-600"
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="text-[10px] text-gray-400">
                          {label}
                        </p>

                        <p className="text-xs font-medium text-gray-700 truncate">
                          {value}
                        </p>

                      </div>

                      <ExternalLink
                        size={13}
                        className="text-gray-300 shrink-0"
                      />

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

          {/* ================================================= */}
          {/* ACCOUNT SETTINGS */}
          {/* ================================================= */}

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">

            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Account Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">

              {/* CHANGE PASSWORD */}

              <button className="flex items-center gap-3 py-3 lg:pr-4 text-left hover:bg-gray-50 rounded-md">

                <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0">

                  <Lock
                    size={14}
                    className="text-blue-600"
                  />

                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-xs font-medium text-gray-700">
                    Change Password
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Update your password regularly
                  </p>

                </div>

                <ChevronRight
                  size={14}
                  className="text-gray-300 shrink-0"
                />

              </button>

              {/* 2FA */}

              <SettingToggle
                icon={ShieldCheck}
                title="Two-Factor Authentication"
                sub="Add an extra layer of security"
                checked={settings.twoFactor}
                onToggle={() =>
                  toggleSetting("twoFactor")
                }
              />

              {/* EMAIL */}

              <SettingToggle
                icon={Bell}
                title="Email Notifications"
                sub="Receive email alerts and updates"
                checked={settings.emailNotifications}
                onToggle={() =>
                  toggleSetting("emailNotifications")
                }
              />

              {/* SMS */}

              <SettingToggle
                icon={MessageSquare}
                title="SMS Notifications"
                sub="Receive SMS alerts and updates"
                checked={settings.smsNotifications}
                onToggle={() =>
                  toggleSetting("smsNotifications")
                }
              />

            </div>

            {/* PRIVACY */}

            <button className="flex items-center gap-3 pt-3 mt-1 border-t border-gray-100 w-full text-left hover:bg-gray-50 rounded-md">

              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">

                <EyeOff
                  size={14}
                  className="text-gray-500"
                />

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-xs font-medium text-gray-700">
                  Privacy Settings
                </p>

                <p className="text-[10px] text-gray-400">
                  Manage your privacy preferences
                </p>

              </div>

              <ChevronRight
                size={14}
                className="text-gray-300 shrink-0"
              />

            </button>

          </div>

        </main>

      </div>

      {/* ===================================================== */}
      {/* EDIT PROFILE MODAL */}
      {/* ===================================================== */}

      {isEditOpen && (

        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

              <div>

                <h2 className="text-lg font-bold text-gray-800">
                  Edit Profile
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Update your personal and professional information.
                </p>

              </div>

              <button
                onClick={handleCancelEdit}
                className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100"
              >

                <X size={18} />

              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-6">

              {/* PROFILE PHOTO */}

              <div className="flex items-center gap-4 mb-6">

                <div className="relative">

                  <img
                    src={MyAvtar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                  />

                  <label
                    htmlFor="editPhoto"
                    className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer border-2 border-white"
                  >

                    <Camera
                      size={13}
                      className="text-white"
                    />

                  </label>

                  <input
                    id="editPhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </div>

                <div>

                  <p className="text-sm font-semibold text-gray-700">
                    Profile Photo
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    JPG or PNG. Maximum size 2MB.
                  </p>

                </div>

              </div>

              {/* FORM */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* FULL NAME */}

                <div>

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    />

                  </div>

                </div>

                {/* ENROLLMENT / ROLL NUMBER */}

                <div>

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Enrollment / Roll Number
                  </label>

                  <input
                    type="text"
                    name="rollNo"
                    value={editForm.rollNo}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    />

                  </div>

                </div>

                {/* PHONE */}

                <div>

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="mobile"
                      value={editForm.mobile}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    />

                  </div>

                </div>

                {/* DEPARTMENT */}

                <div>

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={editForm.department}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                  />

                </div>

                {/* ROLE */}

                <div>

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Role
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={editForm.role}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                  />

                </div>

                {/* ADDRESS */}

                <div className="md:col-span-2">

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Address
                  </label>

                  <div className="relative">

                    <MapPin
                      size={15}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-200 rounded-md py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />

                  </div>

                </div>

                {/* SKILLS */}

                <div className="md:col-span-2">

                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Skills
                  </label>

                  <textarea
                    name="skills"
                    value={editForm.skills}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter skills separated by commas"
                    className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />

                  <p className="text-[10px] text-gray-400 mt-1">
                    Example: JavaScript, React, Python, SQL
                  </p>

                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">

              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >

                <Save size={14} />

                Save Changes

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


// =========================================================
// SMALL TOGGLE COMPONENT
// =========================================================

function SettingToggle({
  icon: Icon,
  title,
  sub,
  checked,
  onToggle,
}) {

  return (

    <div className="flex items-center gap-3 py-3 lg:px-4">

      <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0">

        <Icon
          size={14}
          className="text-blue-600"
        />

      </div>

      <div className="flex-1 min-w-0">

        <p className="text-xs font-medium text-gray-700">
          {title}
        </p>

        <p className="text-[10px] text-gray-400">
          {sub}
        </p>

      </div>

      <button
        onClick={onToggle}
        aria-pressed={checked}
        aria-label={`Toggle ${title}`}
        className={`w-9 h-5 rounded-full flex items-center px-0.5 shrink-0 transition-colors ${
          checked
            ? "bg-blue-600 justify-end"
            : "bg-gray-200 justify-start"
        }`}
      >

        <span className="w-4 h-4 rounded-full bg-white block" />

      </button>

    </div>

  );
}