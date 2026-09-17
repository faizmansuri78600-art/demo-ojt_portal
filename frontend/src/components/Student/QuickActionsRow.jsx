import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, FileText, UploadCloud, Building2, ArrowRight } from "lucide-react";
import Modal from "./SharedModal";

const quickActions = [
  { key: "attendance", icon: ClipboardCheck, label: "Mark Attendance", desc: "Mark your daily attendance", color: "text-emerald-600", bg: "bg-emerald-100", mode: "navigate", path: "/Student/attendance" },
  { key: "diary", icon: FileText, label: "Submit Weekly Diary", desc: "Submit your weekly progress", color: "text-purple-600", bg: "bg-purple-100", mode: "modal" },
  { key: "report", icon: UploadCloud, label: "Upload Report", desc: "Upload your reports & documents", color: "text-amber-600", bg: "bg-amber-100", mode: "modal" },
  { key: "company", icon: Building2, label: "View Company Details", desc: "View complete company profile", color: "text-blue-600", bg: "bg-blue-100", mode: "modal" },
];

export default function QuickActionsRow() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [diaryText, setDiaryText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = (a) => {
    if (a.mode === "navigate") navigate(a.path);
    else setActiveModal(a.key);
  };

  const closeModal = () => {
    setActiveModal(null);
    setDiaryText("");
    setSelectedFile(null);
  };

  const handleDiarySubmit = () => {
    if (!diaryText.trim()) {
      alert("Please write something before submitting.");
      return;
    }
    // TODO: replace with real API call
    alert("Weekly diary submitted successfully!");
    closeModal();
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click(); // opens the OS file explorer
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) {
      alert("Please choose a file first.");
      return;
    }
    // TODO: replace with real upload API call
    alert(`"${selectedFile.name}" uploaded successfully!`);
    closeModal();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((a) => (
          <button
            key={a.label}
            onClick={() => handleClick(a)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3 text-left hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${a.bg}`}>
              <a.icon className={`w-5 h-5 ${a.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800">{a.label}</p>
              <p className="text-[10px] text-slate-400 truncate">{a.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
          </button>
        ))}
      </div>

      {/* Weekly Diary */}
      <Modal open={activeModal === "diary"} onClose={closeModal} title="Submit Weekly Diary" size="lg">
        <div className="p-5 text-xs text-slate-600">
          <textarea
            rows={6}
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
            placeholder="Write your weekly progress..."
            className="w-full border border-slate-200 rounded-lg p-3 text-xs outline-none focus:border-blue-300"
          />
          <button
            onClick={handleDiarySubmit}
            className="mt-3 bg-blue-600 text-white text-xs font-semibold rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </Modal>

      {/* Upload Report */}
      <Modal open={activeModal === "report"} onClose={closeModal} title="Upload Report" size="md">
        <div className="p-5 text-xs text-slate-600 space-y-3">
          {/* hidden native input — the button below triggers it */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            onClick={handleChooseFile}
            className="w-full border-2 border-dashed border-slate-300 rounded-lg py-6 flex flex-col items-center gap-2 text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <UploadCloud className="w-6 h-6" />
            {selectedFile ? (
              <span className="font-medium text-slate-700">{selectedFile.name}</span>
            ) : (
              <span>Click to choose a file</span>
            )}
          </button>

          <button
            onClick={handleUploadSubmit}
            className="bg-blue-600 text-white text-xs font-semibold rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </Modal>

      {/* Company Details */}
      <Modal open={activeModal === "company"} onClose={closeModal} title="Company Details" size="lg">
        <div className="p-5 text-xs text-slate-600">
          <p><span className="font-semibold">Company:</span> Infosys Limited</p>
          <p><span className="font-semibold">Location:</span> Bangalore, Karnataka</p>
        </div>
      </Modal>
    </>
  );
}