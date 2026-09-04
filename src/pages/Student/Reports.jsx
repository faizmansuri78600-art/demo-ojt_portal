import { useState, useMemo } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";

import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Calendar,
  Upload,
  Eye,
  Download,
  X,
  Printer,
  Building2,
  User,
  BookOpen,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


const initialReports = [
  {
    id: 1,
    title: "OJT Report - Week 1",
    type: "Weekly Report",
    fromDate: "01 May 2025",
    toDate: "07 May 2025",
    submittedOn: "08 May 2025",
    status: "Approved",
    attendance: "95%",
    diaryCompletion: "100%",
    performance: "Excellent",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Worked on frontend development and learned the basic structure of the assigned project.",
    learnings:
      "Learned React components, Tailwind CSS and basic project structure.",
    remarks: "Good progress. Keep improving your practical skills.",
  },
  {
    id: 2,
    title: "OJT Report - Week 2",
    type: "Weekly Report",
    fromDate: "08 May 2025",
    toDate: "14 May 2025",
    submittedOn: "15 May 2025",
    status: "Under Review",
    attendance: "92%",
    diaryCompletion: "100%",
    performance: "Very Good",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Implemented responsive UI screens and worked on reusable React components.",
    learnings:
      "Learned responsive design, reusable components and Tailwind utility classes.",
    remarks: "Report is currently being reviewed by the coordinator.",
  },
  {
    id: 3,
    title: "OJT Report - Week 3",
    type: "Weekly Report",
    fromDate: "15 May 2025",
    toDate: "21 May 2025",
    submittedOn: "22 May 2025",
    status: "Approved",
    attendance: "96%",
    diaryCompletion: "100%",
    performance: "Excellent",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Worked on API integration and improved the functionality of the dashboard.",
    learnings:
      "Learned API integration, handling JSON data and frontend-backend communication.",
    remarks: "Excellent implementation and consistent progress.",
  },
  {
    id: 4,
    title: "OJT Report - Week 4",
    type: "Weekly Report",
    fromDate: "22 May 2025",
    toDate: "28 May 2025",
    submittedOn: "29 May 2025",
    status: "Approved",
    attendance: "94%",
    diaryCompletion: "100%",
    performance: "Excellent",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Developed additional dashboard features and fixed UI issues.",
    learnings:
      "Improved debugging skills and learned better component organization.",
    remarks: "Very good work. UI implementation is satisfactory.",
  },
  {
    id: 5,
    title: "OJT Report - Week 5",
    type: "Weekly Report",
    fromDate: "29 May 2025",
    toDate: "04 Jun 2025",
    submittedOn: "05 Jun 2025",
    status: "Under Review",
    attendance: "90%",
    diaryCompletion: "95%",
    performance: "Very Good",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Worked on form validation and improved the user experience of the portal.",
    learnings:
      "Learned form validation, error handling and user-friendly interface design.",
    remarks: "Waiting for coordinator review.",
  },
  {
    id: 6,
    title: "Mid Term Report",
    type: "Mid Term Report",
    fromDate: "01 May 2025",
    toDate: "31 May 2025",
    submittedOn: "01 Jun 2025",
    status: "Approved",
    attendance: "94%",
    diaryCompletion: "100%",
    performance: "Excellent",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Completed the first phase of the OJT and successfully delivered assigned tasks.",
    learnings:
      "Gained practical knowledge of frontend development and teamwork.",
    remarks: "Good performance during the first phase of OJT.",
  },
  {
    id: 7,
    title: "OJT Report - Week 6",
    type: "Weekly Report",
    fromDate: "05 Jun 2025",
    toDate: "11 Jun 2025",
    submittedOn: "12 Jun 2025",
    status: "Rejected",
    attendance: "88%",
    diaryCompletion: "90%",
    performance: "Needs Improvement",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Worked on final UI changes and submitted the weekly progress report.",
    learnings:
      "Learned the importance of testing and reviewing work before submission.",
    remarks:
      "Please update the report with more detailed work description and resubmit.",
  },
  {
    id: 8,
    title: "Final Report",
    type: "Final Report",
    fromDate: "01 May 2025",
    toDate: "15 Jun 2025",
    submittedOn: "16 Jun 2025",
    status: "Approved",
    attendance: "93%",
    diaryCompletion: "100%",
    performance: "Excellent",
    company: "TCS",
    mentor: "Rahul Sharma",
    workSummary:
      "Successfully completed the OJT and delivered all assigned tasks.",
    learnings:
      "Gained practical experience in React, Tailwind CSS, teamwork and project development.",
    remarks:
      "Excellent overall performance. OJT requirements successfully completed.",
  },
];
function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-green-50 text-green-600",
    "Under Review": "bg-orange-50 text-orange-500",
    Rejected: "bg-red-50 text-red-500",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
function SummaryCard({ icon: Icon, title, value, subtitle, iconStyle }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center ${iconStyle}`}
      >
        <Icon size={25} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{value}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    type: "Weekly Report",
    fromDate: "",
    toDate: "",
    description: "",
    file: null,
  });
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(search.toLowerCase()) ||
        report.type.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" || report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);
  const totalReports = reports.length;
  const approvedReports = reports.filter(
    (report) => report.status === "Approved"
  ).length;
  const underReviewReports = reports.filter(
    (report) => report.status === "Under Review"
  ).length;
  const rejectedReports = reports.filter(
    (report) => report.status === "Rejected"
  ).length;

  const handleDownload = (report) => {
    const reportText = `
OJT REPORT
================================
Report Title: ${report.title}
Report Type: ${report.type}

From Date: ${report.fromDate}
To Date: ${report.toDate}
Submitted On: ${report.submittedOn}

Status: ${report.status}

Company: ${report.company}
Faculty Mentor: ${report.mentor}

Attendance: ${report.attendance}
Diary Completion: ${report.diaryCompletion}
Performance: ${report.performance}

WORK SUMMARY
--------------------------------
${report.workSummary}

KEY LEARNINGS
--------------------------------
${report.learnings}

REMARKS
--------------------------------
${report.remarks}
`;

    const blob = new Blob([reportText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.title.replaceAll(" ", "_")}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handlePrint = (report) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print the report.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>${report.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #222;
            }
            h1 {
              margin-bottom: 5px;
            }
            h2 {
              margin-top: 30px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 8px;
            }
            .info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-top: 20px;
            }
            .box {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <h1>${report.title}</h1>
          <p>${report.type}</p>
          <div class="info">
            <div class="box">
              <strong>From Date</strong><br/>
              ${report.fromDate}
            </div>
            <div class="box">
              <strong>To Date</strong><br/>
              ${report.toDate}
            </div>
            <div class="box">
              <strong>Submitted On</strong><br/>
              ${report.submittedOn}
            </div>
            <div class="box">
              <strong>Status</strong><br/>
              ${report.status}
            </div>
            <div class="box">
              <strong>Attendance</strong><br/>
              ${report.attendance}
            </div>
            <div class="box">
              <strong>Performance</strong><br/>
              ${report.performance}
            </div>
          </div>
          <h2>Work Summary</h2>
          <p>${report.workSummary}</p>
          <h2>Key Learnings</h2>
          <p>${report.learnings}</p>
          <h2>Remarks</h2>
          <p>${report.remarks}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (
      !uploadForm.title ||
      !uploadForm.fromDate ||
      !uploadForm.toDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newReport = {
      id: reports.length + 1,
      title: uploadForm.title,
      type: uploadForm.type,
      fromDate: uploadForm.fromDate,
      toDate: uploadForm.toDate,
      submittedOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Under Review",
      attendance: "—",
      diaryCompletion: "—",
      performance: "Pending",
      company: "TCS",
      mentor: "Rahul Sharma",
      workSummary:
        uploadForm.description || "Report submitted for coordinator review.",
      learnings: "Pending review.",
      remarks: "Report is waiting for coordinator review.",
    };

    setReports((prev) => [...prev, newReport]);

    setUploadForm({
      title: "",
      type: "Weekly Report",
      fromDate: "",
      toDate: "",
      description: "",
      file: null,
    });

    setShowUploadModal(false);

    alert("Report uploaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Sidebar activePage="Reports" />

      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {/* PAGE HEADER */}

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Reports
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage and track your OJT reports
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              <Upload size={18} />
              Upload New Report
            </button>
          </div>

          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-4 gap-5 mb-6">
            <SummaryCard
              icon={FileText}
              title="Total Reports"
              value={totalReports}
              subtitle="All submitted reports"
              iconStyle="bg-blue-50 text-blue-600"
            />

            <SummaryCard
              icon={CheckCircle}
              title="Approved"
              value={approvedReports}
              subtitle="Reports approved"
              iconStyle="bg-green-50 text-green-600"
            />

            <SummaryCard
              icon={Clock}
              title="Under Review"
              value={underReviewReports}
              subtitle="Reports under review"
              iconStyle="bg-yellow-50 text-yellow-600"
            />

            <SummaryCard
              icon={XCircle}
              title="Rejected"
              value={rejectedReports}
              subtitle="Reports rejected"
              iconStyle="bg-red-50 text-red-500"
            />
          </div>

          {/* FILTER BAR */}

          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search reports..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-40 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Approved</option>
                <option>Under Review</option>
                <option>Rejected</option>
              </select>

              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-44 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 outline-none focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-44 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All Status");
                  setFromDate("");
                  setToDate("");
                }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          {/* REPORT TABLE */}

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      #
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Report Title
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Report Type
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      From Date
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      To Date
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Submitted On
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report, index) => (
                      <tr
                        key={report.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-5 py-5 text-sm text-gray-500">
                          {index + 1}
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm font-semibold text-gray-900">
                            {report.title}
                          </p>
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {report.type}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {report.fromDate}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {report.toDate}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {report.submittedOn}
                        </td>

                        <td className="px-5 py-5">
                          <StatusBadge status={report.status} />
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedReport(report)}
                              title="View Report"
                              className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              onClick={() => handleDownload(report)}
                              title="Download Report"
                              className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition"
                            >
                              <Download size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-5 py-12 text-center text-gray-500"
                      >
                        <FileText
                          size={35}
                          className="mx-auto mb-3 text-gray-300"
                        />

                        <p className="font-medium">
                          No reports found
                        </p>

                        <p className="text-sm mt-1">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER */}

            <div className="px-5 py-4 flex items-center justify-between border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {filteredReports.length} of {reports.length} reports
              </p>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <ChevronLeft size={18} />
                </button>

                <button className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-medium">
                  1
                </button>

                <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= VIEW REPORT MODAL ================= */}

      {selectedReport && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden">
            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedReport.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedReport.type}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={selectedReport.status} />

                <button
                  onClick={() => setSelectedReport(null)}
                  className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* MODAL BODY */}

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* BASIC INFORMATION */}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={19} className="text-blue-600" />

                    <div>
                      <p className="text-xs text-gray-400">
                        Duration
                      </p>

                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        {selectedReport.fromDate} -{" "}
                        {selectedReport.toDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Building2
                      size={19}
                      className="text-blue-600"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Company
                      </p>

                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        {selectedReport.company}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <User size={19} className="text-blue-600" />

                    <div>
                      <p className="text-xs text-gray-400">
                        Faculty Mentor
                      </p>

                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        {selectedReport.mentor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <FileText
                      size={19}
                      className="text-blue-600"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Submitted On
                      </p>

                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        {selectedReport.submittedOn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROGRESS */}

              <h3 className="text-base font-bold text-gray-900 mb-3">
                Progress Summary
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Attendance
                      </p>

                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {selectedReport.attendance}
                      </p>
                    </div>

                    <Clock className="text-blue-600" size={24} />
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Diary Completion
                      </p>

                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {selectedReport.diaryCompletion}
                      </p>
                    </div>

                    <BookOpen
                      className="text-green-600"
                      size={24}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Performance
                      </p>

                      <p className="text-lg font-bold text-purple-600 mt-2">
                        {selectedReport.performance}
                      </p>
                    </div>

                    <TrendingUp
                      className="text-purple-600"
                      size={24}
                    />
                  </div>
                </div>
              </div>

              {/* WORK SUMMARY */}

              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText size={18} className="text-blue-600" />
                  Work Summary
                </h3>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-6">
                    {selectedReport.workSummary}
                  </p>
                </div>
              </div>

              {/* LEARNINGS */}

              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award size={18} className="text-blue-600" />
                  Key Learnings
                </h3>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-6">
                    {selectedReport.learnings}
                  </p>
                </div>
              </div>

              {/* REMARKS */}

              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Faculty / Coordinator Remarks
                </h3>

                <div
                  className={`rounded-xl p-4 border ${
                    selectedReport.status === "Rejected"
                      ? "bg-red-50 border-red-100"
                      : selectedReport.status === "Under Review"
                      ? "bg-orange-50 border-orange-100"
                      : "bg-green-50 border-green-100"
                  }`}
                >
                  <p className="text-sm text-gray-700 leading-6">
                    {selectedReport.remarks}
                  </p>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => handlePrint(selectedReport)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Printer size={17} />
                Print
              </button>

              <button
                onClick={() => handleDownload(selectedReport)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
              >
                <Download size={17} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= UPLOAD REPORT MODAL ================= */}

      {showUploadModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl">
            {/* HEADER */}

            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Upload New Report
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Submit your OJT report for review
                </p>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleUpload} className="p-6">
              <div className="space-y-4">
                {/* TITLE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Report Title *
                  </label>

                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        title: e.target.value,
                      })
                    }
                    placeholder="Example: OJT Report - Week 7"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* TYPE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Report Type
                  </label>

                  <select
                    value={uploadForm.type}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        type: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option>Weekly Report</option>
                    <option>Mid Term Report</option>
                    <option>Final Report</option>
                  </select>
                </div>

                {/* DATES */}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      From Date *
                    </label>

                    <input
                      type="date"
                      value={uploadForm.fromDate}
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          fromDate: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      To Date *
                    </label>

                    <input
                      type="date"
                      value={uploadForm.toDate}
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          toDate: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
              </div>
                {/* DESCRIPTION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Work Description
                  </label>

                  <textarea
                    rows="4"
                    value={uploadForm.description}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the work completed during this period..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-none focus:border-blue-500"
                  />
                </div>
                {/* FILE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Report File
                  </label>
                  <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                    <Upload
                      size={28}
                      className="text-blue-600 mb-2"
                    />
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload report
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, DOC or DOCX
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          file: e.target.files[0],
                        })
                      }
                    />
                    {uploadForm.file && (
                      <p className="text-xs text-blue-600 mt-2">
                        {uploadForm.file.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>
              {/* FORM BUTTONS */}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Upload size={17} />
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}