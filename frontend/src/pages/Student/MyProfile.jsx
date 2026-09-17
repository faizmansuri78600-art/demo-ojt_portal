import { useState, useEffect } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
import MyAvtar from "../../assets/images/Myavtar.jpg";
import {
  getProfile,
  updateProfile,
  uploadResume,
} from "../../services/StudentServices";

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

const displayValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Not set";
  }

  return value;
};

export default function MyProfile() {
  // =========================================================
  // STUDENT DATA
  // =========================================================
const [documents, setDocuments] = useState({});
const [ojtInfo, setOjtInfo] = useState({});


  const [student, setStudent] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    studentId: "",
    rollNumber: "",
    department: "",
    semester: "",
    college: "",
    course: "",
    academicYear: "",
    admissionYear: "",
    universityRegNo: "",
    cgpa: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    bloodGroup: "",
    emergencyContact: "",
    mobile: "",
    skills: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    profilePhotoUrl: "",
    resumeUrl: "",
    resumeFileName: "",
    resumeUploadedOn: "",
    resumeSize: "",
  });

// resume uploads

const [resumeFile, setResumeFile] = useState(null);
const [uploadingResume, setUploadingResume] = useState(false);


  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [isSaving, setIsSaving] = useState(false);


  // =========================================================
  // LOAD PROFILE FROM BACKEND
  // =========================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError("");

        const response = await getProfile();
        const data = response.student;

        setDocuments(data.documents || {});
        setOjtInfo(data.ojt || {});

        setStudent({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          status: data.status || "",
          studentId: data.studentId || "",
          rollNumber: data.rollNumber || "",
          department: data.department || "",
          semester: data.semester || "",
          college: data.college || "",
          course: data.course || "",
          academicYear: data.academicYear || "",
          admissionYear: data.admissionYear || "",
          universityRegNo: data.universityRegNo || "",
          cgpa: data.cgpa ?? "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pinCode: data.pinCode || "",
          bloodGroup: data.bloodGroup || "",
          emergencyContact: data.emergencyContact || "",
          mobile: data.mobile || data.phone || "",
          skills: data.skills || "",
          linkedIn: data.linkedIn || "",
          github: data.github || "",
          portfolio: data.portfolio || "",
          profilePhotoUrl: data.profilePhotoUrl || "",
          resumeUrl: data.resumeUrl || "",
          resumeFileName: data.resumeFileName || "",
          resumeUploadedOn: data.resumeUploadedOn || "",
          resumeSize: data.resumeSize || "",
        });
      } catch (error) {
        console.error("Profile loading error:", error);
        setProfileError(
          error.message || "Could not load profile from server."
        );
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================================================
  // EDIT PROFILE
  // =========================================================

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editForm, setEditForm] = useState(student);

  const handleEditProfile = () => {
    setEditForm({ ...student });
    setIsEditOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SAVE PROFILE TO BACKEND
  // =========================================================

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const updates = {
        name: editForm.name,
        rollNumber: editForm.rollNumber,
        department: editForm.department,
        semester: editForm.semester,
        college: editForm.college,
        course: editForm.course,
        academicYear: editForm.academicYear,
        admissionYear: editForm.admissionYear,
        universityRegNo: editForm.universityRegNo,
        cgpa: editForm.cgpa === "" ? 0 : Number(editForm.cgpa),
        gender: editForm.gender,
        dateOfBirth: editForm.dateOfBirth,
        address: editForm.address,
        city: editForm.city,
        state: editForm.state,
        pinCode: editForm.pinCode,
        bloodGroup: editForm.bloodGroup,
        emergencyContact: editForm.emergencyContact,
        mobile: editForm.mobile,
        skills: editForm.skills,
        linkedIn: editForm.linkedIn,
        github: editForm.github,
        portfolio: editForm.portfolio,
      };

      const response = await updateProfile(updates);

      const updatedStudent = response.student || response;

      setStudent((prev) => ({
        ...prev,
        ...editForm,
        ...(updatedStudent || {}),
        mobile:
          updatedStudent?.mobile ||
          updatedStudent?.phone ||
          editForm.mobile ||
          "",
      }));

      setIsEditOpen(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert(
        error.message ||
          "Profile update failed. Please check the backend."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({ ...student });
    setIsEditOpen(false);
  };


  //resum upload

  const handleResumeUpload = async () => {
  if (!resumeFile) {
    alert("Please select a PDF resume first.");
    return;
  }

  try {
    setUploadingResume(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);

    const response = await uploadResume(formData);

    alert("Resume uploaded successfully!");

    if (response.resumeUrl) {
  setStudent((prev) => ({
    ...prev,
    resumeUrl: response.resumeUrl,
    resumeFileName: response.resumeUrl.split("/").pop(),
  }));
}
    setResumeFile(null);
  } catch (error) {
    console.error("Resume Upload Error:", error);
    alert(error.message || "Failed to upload resume");
  } finally {
    setUploadingResume(false);
  }
};

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Profile photo must be smaller than 2MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setSelectedPhoto(imageUrl);

    setStudent((prev) => ({
      ...prev,
      profilePhotoUrl: imageUrl,
    }));

    alert(
      "Photo selected. File upload to the server is not implemented yet."
    );
  };

  // =========================================================
  // SETTINGS
  // =========================================================

  const [settings, setSettings] = useState({
    twoFactor: true,
    emailNotifications: true,
    smsNotifications: true,
    privacySettings: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const completionFields = [
    student.name,
    student.email,
    student.rollNumber,
    student.department,
    student.semester,
    student.college,
    student.course,
    student.cgpa,
    student.mobile,
    student.address,
    student.skills,
    student.linkedIn,
    student.github,
    student.resumeFileName,
  ];

  const completedFields = completionFields.filter(
    (field) =>
      field !== null &&
      field !== undefined &&
      String(field).trim() !== "" &&
      String(field) !== "0"
  ).length;

  const profileCompletion = Math.round(
    (completedFields / completionFields.length) * 100
  );

  const completionChecklist = [
    {
      label: "Personal Info",
      done: Boolean(
        student.name &&
          student.email &&
          student.mobile &&
          student.address
      ),
    },
    {
      label: "Academic Info",
      done: Boolean(
        student.college &&
          student.course &&
          student.department &&
          student.rollNumber
      ),
    },
    {
      label: "Skills",
      done: Boolean(student.skills),
    },
    {
      label: "Documents",
      done: false,
    },
    {
      label: "Resume Upload",
      done: Boolean(student.resumeFileName),
    },
  ];

  // =========================================================
  // PERSONAL INFORMATION
  // =========================================================

  const personalInfo = [
    {
      label: "Full Name",
      value: displayValue(student.name),
    },
    {
      label: "Gender",
      value: displayValue(student.gender),
    },
    {
      label: "Date of Birth",
      value: displayValue(student.dateOfBirth),
    },
    {
      label: "Address",
      value: displayValue(student.address),
    },
    {
      label: "City",
      value: displayValue(student.city),
    },
    {
      label: "State",
      value: displayValue(student.state),
    },
    {
      label: "PIN Code",
      value: displayValue(student.pinCode),
    },
    {
      label: "Blood Group",
      value: displayValue(student.bloodGroup),
    },
    {
      label: "Emergency Contact",
      value: displayValue(student.emergencyContact),
    },
  ];

  // =========================================================
  // ACADEMIC INFORMATION
  // =========================================================

  const academicInfo = [
    {
      label: "College Name",
      value: displayValue(student.college),
    },
    {
      label: "Course",
      value: displayValue(student.course),
    },
    {
      label: "Department",
      value: displayValue(student.department),
    },
    {
      label: "Roll Number",
      value: displayValue(student.rollNumber),
    },
    {
      label: "University Reg. No.",
      value: displayValue(student.universityRegNo),
    },
    {
      label: "Academic Year",
      value: displayValue(student.academicYear),
    },
    {
      label: "Admission Year",
      value: displayValue(student.admissionYear),
    },
  ];

  const cgpa =
    student.cgpa !== "" &&
    student.cgpa !== null &&
    student.cgpa !== undefined &&
    Number(student.cgpa) > 0
      ? `${student.cgpa} / 10.00`
      : "Not set";

  // =========================================================
  // SKILLS
  // =========================================================

  const skills = student.skills
    ? student.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  // =========================================================
  // RESUME
  // =========================================================

  const resume = {
  fileName: student.resumeUrl
    ? student.resumeUrl.split("/").pop()
    : "No resume uploaded",

  uploadedOn: "Not available",

  size: "Not available",

  url: student.resumeUrl || "",
};
  // =========================================================
  // SOCIAL LINKS
  // =========================================================

  const socialLinks = [
    {
      label: "LinkedIn",
      value: displayValue(student.linkedIn),
      icon: FaLinkedin,
    },
    {
      label: "GitHub",
      value: displayValue(student.github),
      icon: FaGithub,
    },
    {
      label: "Portfolio",
      value: displayValue(student.portfolio),
      icon: Globe,
    },
    {
      label: "Email",
      value: displayValue(student.email),
      icon: Mail,
    },
  ];

  // =========================================================
  // OJT
  // =========================================================

  // These values are intentionally NOT hardcoded.
  // They will be connected to OJT/Attendance backend data later.

  
  const hoursPercent =
    ojtInfo.hoursTotal > 0
      ? Math.round(
          (ojtInfo.hoursCompleted / ojtInfo.hoursTotal) * 100
        )
      : 0;

  // =========================================================
  // CIRCLE PROGRESS
  // =========================================================

  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference -
    (profileCompletion / 100) * circumference;

  // =========================================================
  // RESUME DOWNLOAD
  // =========================================================

 // =========================================================
// RESUME DOWNLOAD
// =========================================================

const handleResumeDownload = () => {
  if (!student.resumeUrl) {
    alert("No resume is available in the database.");
    return;
  }

  const resumeUrl = student.resumeUrl.startsWith("http")
    ? student.resumeUrl
    : `http://localhost:5000${student.resumeUrl}`;

  window.open(resumeUrl, "_blank");
};

  return (
    <div className="h-screen flex flex-col bg-gray-50">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Header />

      <div className="flex flex-1 overflow-hidden pt-16">

        {/* ================================================= */}
        {/* EXISTING SIDEBAR */}
        {/* ================================================= */}

        <Sidebar activePage="My Profile" />

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <main className="flex-1 ml-64 overflow-y-auto p-6">

          {/* ================================================= */}
          {/* BREADCRUMB */}
          {/* ================================================= */}

          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
            <span>Dashboard</span>

            <ChevronRight size={12} />

            <span className="text-gray-600 font-medium">
              My Profile
            </span>
          </div>

          {/* ================================================= */}
          {/* PAGE TITLE */}
          {/* ================================================= */}

          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                My Profile
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage your personal, academic and professional
                information.
              </p>

              {profileLoading && (
                <p className="text-xs text-blue-500 mt-1">
                  Loading profile from database...
                </p>
              )}

              {profileError && (
                <p className="text-xs text-red-500 mt-1">
                  {profileError}
                </p>
              )}
            </div>

            <div className="flex gap-2">

              {/* EDIT */}

              <button
                onClick={handleEditProfile}
                disabled={profileLoading}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 border border-blue-200 bg-white px-4 py-2 rounded-md hover:bg-blue-50 disabled:opacity-50"
              >
                <Pencil size={14} />
                Edit Profile
              </button>

              {/* DOWNLOAD */}

              <button
                onClick={handleResumeDownload}
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

              {/* PROFILE PHOTO */}

              <div className="relative shrink-0">

                <img
                  src={
                    selectedPhoto ||
                    student.profilePhotoUrl ||
                    MyAvtar
                  }
                  alt={student.name || "Student"}
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
                    {profileLoading
                      ? "Loading..."
                      : displayValue(student.name)}
                  </h2>

                  {student.status && (
                    <span className="text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">
                      {student.status}
                    </span>
                  )}

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mt-3 text-xs text-gray-500">

                  <span className="flex items-center gap-1.5">
                    <User size={13} />
                    Roll No: {displayValue(student.rollNumber)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} />
                    Department: {displayValue(student.department)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <User size={13} />
                    Student ID: {displayValue(student.studentId)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FileText size={13} />
                    Semester: {displayValue(student.semester)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Mail size={13} />
                    Email: {displayValue(student.email)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone size={13} />
                    Mobile: {displayValue(student.mobile)}
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

                <button
                  onClick={handleEditProfile}
                  className="flex items-center gap-1 text-xs text-blue-600 font-medium"
                >
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
                    {profileLoading ? "..." : cgpa}
                  </p>

                </div>

              </div>
            </div>

            {/* SKILLS + RESUME */}

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

                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">
                    No skills added
                  </span>
                )}

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

                <button
                  onClick={() => {
                    if (student.resumeUrl) {
                      window.open(student.resumeUrl, "_blank");
                    } else {
                      alert("No resume uploaded.");
                    }
                  }}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Eye size={15} />
                </button>

                <button
                  onClick={handleResumeDownload}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Download size={15} />
                </button>

              </div>

              <div className="mt-3">
  <label
    htmlFor="resume-upload"
    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100"
  >
    ↻ Replace Resume
  </label>

  <input
    id="resume-upload"
    type="file"
    accept=".pdf,application/pdf"
    className="hidden"
    onChange={(e) => setResumeFile(e.target.files[0])}
  />

  {resumeFile && (
    <div className="mt-3">
      <p className="text-sm text-gray-600 mb-2">
        Selected: {resumeFile.name}
      </p>

      <button
        type="button"
        onClick={handleResumeUpload}
        disabled={uploadingResume}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {uploadingResume ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  )}
</div>

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

                <button
                  onClick={() =>
                    alert(
                      "Documents backend connection will be added later."
                    )
                  }
                  className="text-xs text-blue-600 font-medium"
                >
                  View All
                </button>

              </div>

             <div className="grid grid-cols-2 gap-4">

  {/* Aadhaar Card */}
  <div className="border rounded-lg p-4 text-center">
    <div className="text-gray-400 text-2xl mb-3">📄</div>
    <h3 className="font-medium text-gray-800">Aadhar Card</h3>

    <p className="text-sm text-gray-500 mt-1">
      {documents.aadhaarCard?.uploaded
        ? documents.aadhaarCard.fileName
        : "Not uploaded"}
    </p>

    <p className="text-sm text-gray-400 mt-2">
      ○ {documents.aadhaarCard?.uploaded
        ? "Available"
        : "Not available"}
    </p>
  </div>

  {/* College ID */}
  <div className="border rounded-lg p-4 text-center">
    <div className="text-gray-400 text-2xl mb-3">📄</div>
    <h3 className="font-medium text-gray-800">College ID Card</h3>

    <p className="text-sm text-gray-500 mt-1">
      {documents.collegeIdCard?.uploaded
        ? documents.collegeIdCard.fileName
        : "Not uploaded"}
    </p>

    <p className="text-sm text-gray-400 mt-2">
      ○ {documents.collegeIdCard?.uploaded
        ? "Available"
        : "Not available"}
    </p>
  </div>

  {/* Bonafide */}
  <div className="border rounded-lg p-4 text-center">
    <div className="text-gray-400 text-2xl mb-3">📄</div>
    <h3 className="font-medium text-gray-800">Bonafide Certificate</h3>

    <p className="text-sm text-gray-500 mt-1">
      {documents.bonafideCertificate?.uploaded
        ? documents.bonafideCertificate.fileName
        : "Not uploaded"}
    </p>

    <p className="text-sm text-gray-400 mt-2">
      ○ {documents.bonafideCertificate?.uploaded
        ? "Available"
        : "Not available"}
    </p>
  </div>

  {/* 10th Marksheet */}
  <div className="border rounded-lg p-4 text-center">
    <div className="text-gray-400 text-2xl mb-3">📄</div>
    <h3 className="font-medium text-gray-800">10th Marksheet</h3>

    <p className="text-sm text-gray-500 mt-1">
      {documents.tenthMarksheet?.uploaded
        ? documents.tenthMarksheet.fileName
        : "Not uploaded"}
    </p>

    <p className="text-sm text-gray-400 mt-2">
      ○ {documents.tenthMarksheet?.uploaded
        ? "Available"
        : "Not available"}
    </p>
  </div>

  {/* 12th Marksheet */}
  <div className="border rounded-lg p-4 text-center">
    <div className="text-gray-400 text-2xl mb-3">📄</div>
    <h3 className="font-medium text-gray-800">12th Marksheet</h3>

    <p className="text-sm text-gray-500 mt-1">
      {documents.twelfthMarksheet?.uploaded
        ? documents.twelfthMarksheet.fileName
        : "Not uploaded"}
    </p>

    <p className="text-sm text-gray-400 mt-2">
      ○ {documents.twelfthMarksheet?.uploaded
        ? "Available"
        : "Not available"}
    </p>
  </div>
</div>   {/* <-- ADD THIS LINE — closes the Documents card itself */}

</div>

            {/* OJT INFORMATION */}

            <div className="bg-white border border-gray-200 rounded-lg p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-800">
                  OJT Information
                </h3>

                <button
                  onClick={() =>
                    alert(
                      "OJT details will be connected to the OJT backend later."
                    )
                  }
                  className="text-xs text-blue-600 font-medium"
                >
                  View Details
                </button>

              </div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-10 h-10 rounded-md border border-gray-100 flex items-center justify-center shrink-0 bg-gray-50">

                  <Building2
                    size={18}
                    className="text-gray-400"
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
                    {ojtInfo.hoursTotal}
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
                    {ojtInfo.attendance > 0
                      ? `${ojtInfo.attendance}%`
                      : "Not set"}
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

                <button
                  onClick={handleEditProfile}
                  className="flex items-center gap-1 text-xs text-blue-600 font-medium"
                >
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

                      {value !== "Not set" && (
                        <ExternalLink
                          size={13}
                          className="text-gray-300 shrink-0"
                        />
                      )}

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

          <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

              <div>

                <h2 className="text-lg font-bold text-gray-800">
                  Edit Profile
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Update your information and save it to the database.
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
  src={selectedPhoto || student.profilePhotoUrl || MyAvtar}
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

                <FormInput
                  label="Full Name"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  icon={User}
                />

                {/* ROLL NUMBER */}

                <FormInput
                  label="Enrollment / Roll Number"
                  name="rollNumber"
                  value={editForm.rollNumber}
                  onChange={handleChange}
                />

                {/* EMAIL */}

                <FormInput
                  label="Email Address"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  icon={Mail}
                  disabled
                />

                {/* MOBILE */}

                <FormInput
                  label="Phone Number"
                  name="mobile"
                  value={editForm.mobile}
                  onChange={handleChange}
                  icon={Phone}
                />

                {/* DEPARTMENT */}

                <FormInput
                  label="Department"
                  name="department"
                  value={editForm.department}
                  onChange={handleChange}
                />

                {/* SEMESTER */}

                <FormInput
                  label="Semester"
                  name="semester"
                  value={editForm.semester}
                  onChange={handleChange}
                />

                {/* COLLEGE */}

                <FormInput
                  label="College"
                  name="college"
                  value={editForm.college}
                  onChange={handleChange}
                />

                {/* COURSE */}

                <FormInput
                  label="Course"
                  name="course"
                  value={editForm.course}
                  onChange={handleChange}
                />

                {/* ACADEMIC YEAR */}

                <FormInput
                  label="Academic Year"
                  name="academicYear"
                  value={editForm.academicYear}
                  onChange={handleChange}
                />

                {/* ADMISSION YEAR */}

                <FormInput
                  label="Admission Year"
                  name="admissionYear"
                  value={editForm.admissionYear}
                  onChange={handleChange}
                />

                {/* UNIVERSITY REGISTRATION */}

                <FormInput
                  label="University Registration No."
                  name="universityRegNo"
                  value={editForm.universityRegNo}
                  onChange={handleChange}
                />

                {/* CGPA */}

                <FormInput
                  label="CGPA"
                  name="cgpa"
                  type="number"
                  value={editForm.cgpa}
                  onChange={handleChange}
                />

                {/* GENDER */}

                <FormInput
                  label="Gender"
                  name="gender"
                  value={editForm.gender}
                  onChange={handleChange}
                />

                {/* DOB */}

                <FormInput
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={editForm.dateOfBirth}
                  onChange={handleChange}
                />

                {/* CITY */}

                <FormInput
                  label="City"
                  name="city"
                  value={editForm.city}
                  onChange={handleChange}
                />

                {/* STATE */}

                <FormInput
                  label="State"
                  name="state"
                  value={editForm.state}
                  onChange={handleChange}
                />

                {/* PIN */}

                <FormInput
                  label="PIN Code"
                  name="pinCode"
                  value={editForm.pinCode}
                  onChange={handleChange}
                />

                {/* BLOOD GROUP */}

                <FormInput
                  label="Blood Group"
                  name="bloodGroup"
                  value={editForm.bloodGroup}
                  onChange={handleChange}
                />

                {/* EMERGENCY */}

                <FormInput
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={editForm.emergencyContact}
                  onChange={handleChange}
                />

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
                    Example: JavaScript, Python, SQL, Java
                  </p>

                </div>

                {/* LINKEDIN */}

                <FormInput
                  label="LinkedIn"
                  name="linkedIn"
                  value={editForm.linkedIn}
                  onChange={handleChange}
                  icon={FaLinkedin}
                />

                {/* GITHUB */}

                <FormInput
                  label="GitHub"
                  name="github"
                  value={editForm.github}
                  onChange={handleChange}
                  icon={FaGithub}
                />

                {/* PORTFOLIO */}

                <FormInput
                  label="Portfolio"
                  name="portfolio"
                  value={editForm.portfolio}
                  onChange={handleChange}
                  icon={Globe}
                />

              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">

              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >

                <Save size={14} />

                {isSaving ? "Saving..." : "Save Changes"}

              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================
// FORM INPUT COMPONENT
// =========================================================

function FormInput({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  type = "text",
  disabled = false,
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}
      </label>

      <div className="relative">

        {Icon && (
          <Icon
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          className={`w-full border border-gray-200 rounded-md py-2.5 ${
            Icon ? "pl-9" : "px-3"
          } pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 ${
            disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
          }`}
        />

      </div>
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