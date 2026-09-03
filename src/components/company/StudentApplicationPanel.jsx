import React, { useState } from "react";
import {
  X,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  FileText,
  Eye,
  UserCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
} from "lucide-react";

import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ResumePreview from "./ResumePreview";

const TABS = ["Profile", "Education", "Skills", "Documents"];

const DEFAULT_RESUME = {
  name: "Sample_Resume.pdf",
  type: "PDF",
  size: "212 KB",
};

const StudentApplicationPanel = ({
  application,
  isLoading = false,
  error = null,
  onClose,
  onBack,
  onShortlist,
  onAccept,
  onInReview,
  onReject,
  onSaveNote,
}) => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [note, setNote] = useState("");

  // Resume page
  const [showResumePreview, setShowResumePreview] = useState(false);

  // Selected document (now includes docType, e.g. "Resume" / "Cover Letter")
  const [selectedFile, setSelectedFile] = useState(null);

  // Download confirmation dialog
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const BackLink = () =>
    onBack ? (
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 mb-4"
      >
        <ArrowLeft size={14} />
        Back to Applications
      </button>
    ) : null;

  /*
   * =========================
   * OPEN RESUME PAGE
   * =========================
   * Now accepts a docType label ("Resume" / "Cover Letter") so we know
   * which document was clicked, for use in the download alert later.
   */
  const handleViewFile = (file, docType = "Resume") => {
    setSelectedFile({ ...file, docType });
    setShowResumePreview(true);
  };

  /*
   * =========================
   * DOWNLOAD BUTTON CLICK
   * =========================
   */
  const handleDownloadClick = () => {
    console.log("Download button clicked");
    setShowDownloadDialog(true);
  };

  /*
   * =========================
   * CONFIRM DOWNLOAD
   * =========================
   */
  const handleConfirmDownload = () => {
    console.log("Download confirmed");

    // IMPORTANT:
    // Capture everything we need BEFORE closing/changing any state.
    const currentStudentName =
      application?.name || "Sample Student";

    const currentDocType = selectedFile?.docType || "Resume";

    // Human-friendly label used in both the saved file name and the alert
    // e.g. "Rahul Sharma - Resume"
    const displayLabel = `${currentStudentName} - ${currentDocType}`;

    // Safe filename for disk (no special characters, forced .txt extension
    // since the content we generate below is plain text)
    const safeFileName =
      displayLabel.replace(/[\\/:*?"<>|]/g, "").trim() + ".txt";

    // Close dialog
    setShowDownloadDialog(false);

    // Dummy resume content
    const resumeContent = `
========================================
              ${currentDocType.toUpperCase()}
========================================

Name:
${currentStudentName}

Email:
${application?.email || "student@example.com"}

Phone:
${application?.phone || "+91 98765 43210"}

Location:
${application?.location || "Pune, Maharashtra"}

----------------------------------------
PROFILE
----------------------------------------

Computer Applications student interested
in web development, software development,
database technologies and modern web
technologies.

----------------------------------------
EDUCATION
----------------------------------------

B.Sc. Computer Applications
Abeda Inamdar Senior College
2024 - 2027

----------------------------------------
SKILLS
----------------------------------------

React.js
JavaScript
HTML
CSS
Java
PHP
MySQL

----------------------------------------
PROJECTS
----------------------------------------

Student Management System

AI Resume Analyzer

----------------------------------------
LANGUAGES
----------------------------------------

English
Hindi
Marathi

========================================
`;

    /*
     * Create a file in browser memory
     */
    const blob = new Blob([resumeContent], {
      type: "text/plain",
    });

    /*
     * Create temporary URL
     */
    const downloadUrl = URL.createObjectURL(blob);

    /*
     * Create invisible download link
     */
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = safeFileName;

    document.body.appendChild(link);

    /*
     * START DOWNLOAD
     */
    link.click();

    document.body.removeChild(link);

    /*
     * Remove temporary URL
     */
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 1000);

    /*
     * SHOW ALERT
     *
     * Uses the same displayLabel that named the downloaded file,
     * so it always matches what was actually saved —
     * e.g. "Rahul Sharma - Resume downloaded successfully!"
     */
    setTimeout(() => {
      window.alert(`"${displayLabel}" downloaded successfully!`);
    }, 500);
  };

  /*
   * =========================
   * SAVE NOTE
   * =========================
   */
  const handleSaveNote = () => {
    if (!note.trim()) {
      window.alert("Please write a note before saving.");
      return;
    }

    if (onSaveNote) {
      onSaveNote(note);
    }

    window.alert("Note saved for " + application?.name + ".");

    setNote("");
  };

  /*
   * =========================
   * RESUME PAGE
   * =========================
   */
  if (showResumePreview) {
    return (
      <>
        <ResumePreview
          file={selectedFile}
          studentName={application?.name}
          application={application}
          onBack={() => setShowResumePreview(false)}
          onDownload={handleDownloadClick}
        />

        {/* DOWNLOAD DIALOG */}
        {showDownloadDialog && selectedFile && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">

            <div className="bg-white rounded-xl shadow-2xl w-[360px] p-6">

              {/* ICON + TITLE */}
              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Download
                    size={18}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Download {selectedFile.docType || "Resume"}
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {application?.name} — {selectedFile.name}
                  </p>
                </div>

              </div>

              {/* MESSAGE */}
              <p className="text-xs text-gray-500 mb-6">
                Do you want to download this {(selectedFile.docType || "resume").toLowerCase()}?
              </p>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2">

                <button
                  onClick={() => setShowDownloadDialog(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmDownload}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Download size={13} />
                  Download
                </button>

              </div>

            </div>

          </div>
        )}
      </>
    );
  }

  /*
   * =========================
   * LOADING
   * =========================
   */
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

        <BackLink />

        <div className="animate-pulse space-y-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-gray-100" />

            <div className="space-y-2 flex-1">
              <div className="h-3 w-32 bg-gray-100 rounded" />
              <div className="h-2.5 w-44 bg-gray-100 rounded" />
              <div className="h-2.5 w-28 bg-gray-100 rounded" />
            </div>

          </div>

          <div className="h-2.5 w-full bg-gray-100 rounded" />
          <div className="h-2.5 w-5/6 bg-gray-100 rounded" />
          <div className="h-24 w-full bg-gray-100 rounded-lg" />

        </div>
      </div>
    );
  }

  /*
   * =========================
   * ERROR
   * =========================
   */
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">

        <BackLink />

        <p className="text-sm text-red-500 font-medium mb-1">
          Couldn't load this application
        </p>

        <p className="text-xs text-gray-400">
          {typeof error === "string"
            ? error
            : "Something went wrong. Please try again."}
        </p>

      </div>
    );
  }

  /*
   * =========================
   * NO APPLICATION
   * =========================
   */
  if (!application) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-sm text-gray-400">

        <BackLink />

        Select an application from the list to view student details.

      </div>
    );
  }

  const {
    name,
    email,
    phone,
    location,
    avatar,
    isNew,
    opportunity,
    appliedOn,
    status,
    dob,
    gender,
    address,
    languages,
    about,
    education = [],
    skills = [],
    resume,
    coverLetter,
  } = application;

  const resumeFile = resume || DEFAULT_RESUME;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

      {/* BACK BUTTON */}
      {onBack && (
        <div className="px-5 pt-4">

          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft size={14} />
            Back to Applications
          </button>

        </div>
      )}

      {/* HEADER */}
      <div className="flex items-start justify-between p-5 pb-3">

        <div className="flex items-center gap-3">

          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border border-gray-100"
          />

          <div>

            <div className="flex items-center gap-2">

              <p className="text-sm font-semibold text-gray-800">
                {name}
              </p>

              {isNew && (
                <span className="text-[10px] bg-blue-50 text-blue-500 font-medium px-2 py-0.5 rounded-md">
                  New
                </span>
              )}

            </div>

            <div className="mt-1 space-y-0.5 text-xs text-gray-400">

              <p className="flex items-center gap-1.5">
                <Mail size={11} />
                {email}
              </p>

              <p className="flex items-center gap-1.5">
                <Phone size={11} />
                {phone}
              </p>

              <p className="flex items-center gap-1.5">
                <MapPin size={11} />
                {location}
              </p>

            </div>

          </div>

        </div>

        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-500"
        >
          <X size={16} />
        </button>

      </div>

      <div className="px-5">
        <hr className="border-gray-100" />
      </div>

      {/* APPLICATION SUMMARY */}
      <div className="px-5 py-4">

        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Application Summary
        </h3>

        <div className="space-y-2 text-xs">

          <p>
            <span className="text-gray-400">
              Opportunity:
            </span>{" "}
            <span className="text-gray-800 font-semibold">
              {opportunity}
            </span>
          </p>

          <p>
            <span className="text-gray-400">
              Applied On:
            </span>{" "}
            <span className="text-gray-700">
              {appliedOn}
            </span>
          </p>

          <p className="flex items-center gap-1">
            <span className="text-gray-400">
              Current Status:
            </span>

            <ApplicationStatusBadge
              status={status}
              full
            />
          </p>

        </div>

      </div>

      {/* TABS */}
      <div className="flex items-center gap-5 border-b border-gray-100 px-5">

        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={
              "py-2.5 text-xs font-medium border-b-2 -mb-px transition-colors " +
              (activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600")
            }
          >
            {tab}
          </button>
        ))}

      </div>

      {/* TAB CONTENT */}
      <div className="p-5 space-y-5">

        {/* PROFILE */}
        {activeTab === "Profile" && (
          <>
            <div className="grid grid-cols-2 gap-3 text-xs">

              <div>
                <p className="text-gray-400">
                  Date of Birth
                </p>
                <p className="text-gray-700 mt-0.5">
                  {dob}
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Gender
                </p>
                <p className="text-gray-700 mt-0.5">
                  {gender}
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Address
                </p>
                <p className="text-gray-700 mt-0.5">
                  {address}
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Languages
                </p>
                <p className="text-gray-700 mt-0.5">
                  {languages}
                </p>
              </div>

            </div>

            <div>

              <p className="text-xs text-gray-400 mb-1">
                About Me
              </p>

              <p className="text-xs text-gray-600 leading-relaxed">
                {about}
              </p>

            </div>
          </>
        )}

        {/* EDUCATION */}
        {activeTab === "Education" && (
          <div className="space-y-3">

            {education.length ? (
              education.map((ed, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-lg px-3 py-2.5"
                >

                  <p className="text-xs font-medium text-gray-700">
                    {ed.degree}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    {ed.institution} &middot; {ed.year}
                  </p>

                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">
                No education details provided.
              </p>
            )}

          </div>
        )}

        {/* SKILLS */}
        {activeTab === "Skills" && (
          <div className="flex flex-wrap gap-2">

            {skills.length ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-gray-400">
                No skills listed.
              </p>
            )}

          </div>
        )}

        {/* DOCUMENTS */}
        {activeTab === "Documents" && (
          <div className="space-y-3">

            <DocumentRow
              label="Resume / CV"
              docType="Resume"
              file={resumeFile}
              onView={handleViewFile}
            />

            <DocumentRow
              label="Cover Letter"
              docType="Cover Letter"
              file={coverLetter}
              onView={handleViewFile}
            />

          </div>
        )}

      </div>

      <div className="px-5">
        <hr className="border-gray-100" />
      </div>

      {/* DOCUMENTS */}
      {activeTab !== "Documents" && (
        <div className="px-5 py-4 space-y-3">

          <DocumentRow
            label="Resume / CV"
            docType="Resume"
            file={resumeFile}
            onView={handleViewFile}
          />

          <DocumentRow
            label="Cover Letter"
            docType="Cover Letter"
            file={coverLetter}
            onView={handleViewFile}
          />

        </div>
      )}

      {/* ACTIONS */}
      <div className="px-5 pb-2">

        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Actions
        </h3>

        <div className="grid grid-cols-2 gap-2">

          <ActionButton
            label="Shortlist"
            icon={UserCheck}
            colorClasses="border border-green-200 text-green-600 hover:bg-green-50"
            onClick={onShortlist}
          />

          <ActionButton
            label="Accept"
            icon={CheckCircle2}
            colorClasses="bg-blue-600 text-white hover:bg-blue-700"
            onClick={onAccept}
          />

          <ActionButton
            label="In Review"
            icon={Clock}
            colorClasses="border border-orange-200 text-orange-500 hover:bg-orange-50"
            onClick={onInReview}
          />

          <ActionButton
            label="Reject"
            icon={XCircle}
            colorClasses="border border-red-200 text-red-500 hover:bg-red-50"
            onClick={onReject}
          />

        </div>

      </div>

      {/* NOTES */}
      <div className="p-5 pt-3">

        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Add Notes
        </h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Add notes about this application..."
          className="w-full text-xs border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />

        <div className="flex justify-end mt-2">

          <button
            onClick={handleSaveNote}
            className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Save Note
          </button>

        </div>

      </div>

    </div>
  );
};


/*
 * DOCUMENT ROW
 * Now accepts a docType label so onView() can tell the parent
 * whether "Resume" or "Cover Letter" was clicked.
 */
const DocumentRow = ({
  label,
  docType,
  file,
  onView,
}) => {

  if (!file) return null;

  return (
    <div>

      <p className="text-xs text-gray-400 mb-1">
        {label}
      </p>

      <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">

        <div className="flex items-center gap-2">

          <FileText
            size={14}
            className="text-blue-500"
          />

          <div>

            <p className="text-xs text-gray-700">
              {file.name}
            </p>

            <p className="text-[10px] text-gray-400">
              {file.type} &middot; {file.size}
            </p>

          </div>

        </div>

        {/* EYE ICON */}
        <button
          onClick={() => onView(file, docType)}
          className="text-gray-400 hover:text-blue-500 transition-colors"
          title={`View ${docType || "Document"}`}
        >
          <Eye size={16} />
        </button>

      </div>

    </div>
  );
};


/*
 * ACTION BUTTON
 */
const ActionButton = ({
  label,
  icon: Icon,
  colorClasses,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={
      "flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg py-2 transition-colors " +
      colorClasses
    }
  >
    <Icon size={13} />
    {label}
  </button>
);

export default StudentApplicationPanel;