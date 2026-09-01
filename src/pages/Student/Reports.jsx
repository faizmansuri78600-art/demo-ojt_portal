import { useState, useMemo } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";

import {
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Calendar,
  Plus,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
 
const statusStyles = {
  Approved: "text-green-600 bg-green-50",
  "Under Review": "text-orange-500 bg-orange-50",
  Rejected: "text-red-500 bg-red-50",
};
 
// Converts "01 May 2025" style strings into a real Date for comparisons.
function parseDMY(str) {
  return new Date(str);
}
 
export default function Reports() {
  // ===== Summary cards =====
  const summary = [
    { label: "Total Reports", value: "8", sub: "All submitted reports", icon: FileText, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Approved", value: "5", sub: "Reports approved", icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600" },
    { label: "Under Review", value: "2", sub: "Reports under review", icon: Clock, iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { label: "Rejected", value: "1", sub: "Reports rejected", icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500" },
  ];
 
  // ===== Report data =====
  const reports = [
    { title: "OJT Report - Week 1", type: "Weekly Report", fromDate: "01 May 2025", toDate: "07 May 2025", submittedOn: "08 May 2025", status: "Approved" },
    { title: "OJT Report - Week 2", type: "Weekly Report", fromDate: "08 May 2025", toDate: "14 May 2025", submittedOn: "15 May 2025", status: "Under Review" },
    { title: "OJT Report - Week 3", type: "Weekly Report", fromDate: "15 May 2025", toDate: "21 May 2025", submittedOn: "22 May 2025", status: "Approved" },
    { title: "OJT Report - Week 4", type: "Weekly Report", fromDate: "22 May 2025", toDate: "28 May 2025", submittedOn: "29 May 2025", status: "Approved" },
    { title: "OJT Report - Week 5", type: "Weekly Report", fromDate: "29 May 2025", toDate: "04 Jun 2025", submittedOn: "05 Jun 2025", status: "Under Review" },
    { title: "Mid Term Report", type: "Mid Term Report", fromDate: "01 May 2025", toDate: "31 May 2025", submittedOn: "01 Jun 2025", status: "Approved" },
    { title: "OJT Report - Week 6", type: "Weekly Report", fromDate: "05 Jun 2025", toDate: "11 Jun 2025", submittedOn: "12 Jun 2025", status: "Rejected" },
    { title: "Final Report", type: "Final Report", fromDate: "01 May 2025", toDate: "15 Jun 2025", submittedOn: "16 Jun 2025", status: "Approved" },
  ];
 
  // ===== Filters (functional, via React state) =====
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDateFilter, setFromDateFilter] = useState(""); // yyyy-mm-dd from <input type="date">
  const [toDateFilter, setToDateFilter] = useState("");
 
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesSearch =
        search.trim() === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase());
 
      const matchesStatus = status === "" || r.status === status;
 
      let matchesFrom = true;
      if (fromDateFilter) {
        matchesFrom = parseDMY(r.fromDate) >= new Date(fromDateFilter);
      }
 
      let matchesTo = true;
      if (toDateFilter) {
        matchesTo = parseDMY(r.toDate) <= new Date(toDateFilter);
      }
 
      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    });
  }, [search, status, fromDateFilter, toDateFilter]);
 
  // ===== Placeholder actions =====
  const handleView = (report) => alert(`Viewing: ${report.title}`);
  const handleDownload = (report) => alert(`Downloading: ${report.title}`);
  const handleUpload = () => alert("Open Upload New Report form");
 
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar activePage="Reports" />
 
      {/* Offsets keep content clear of the fixed Header and Sidebar.
          overflow-x-hidden stops the page itself from ever scrolling horizontally;
          only the table card scrolls internally if it needs to. */}
      <main className="ml-64 pt-16 min-h-screen overflow-x-hidden">
        <div className="p-6 max-w-full">
          {/* ===== Page header ===== */}
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <div className="flex items-center gap-1 text-sm mt-1 mb-5">
            <span className="text-blue-600 font-medium">Dashboard</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-500">Reports</span>
          </div>
 
          {/* ===== Summary cards ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {summary.map(({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-xl font-bold text-gray-800 leading-tight">{value}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
 
          {/* ===== Search & filter bar ===== */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
 
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
            >
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
 
            <div className="relative">
              <input
                type="date"
                value={fromDateFilter}
                onChange={(e) => setFromDateFilter(e.target.value)}
                className="border border-gray-200 rounded-md py-2 pl-3 pr-9 text-sm text-gray-600 w-[150px]"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
 
            <div className="relative">
              <input
                type="date"
                value={toDateFilter}
                onChange={(e) => setToDateFilter(e.target.value)}
                className="border border-gray-200 rounded-md py-2 pl-3 pr-9 text-sm text-gray-600 w-[150px]"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
 
            <button
              onClick={handleUpload}
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 ml-auto whitespace-nowrap"
            >
              <Plus size={15} /> Upload New Report
            </button>
          </div>
 
          {/* ===== Reports table ===== */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="text-gray-500 text-left border-b border-gray-100 bg-gray-50">
                    <th className="py-3 px-4 font-semibold">#</th>
                    <th className="py-3 px-4 font-semibold">Report Title</th>
                    <th className="py-3 px-4 font-semibold">Report Type</th>
                    <th className="py-3 px-4 font-semibold">From Date</th>
                    <th className="py-3 px-4 font-semibold">To Date</th>
                    <th className="py-3 px-4 font-semibold">Submitted On</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((r, i) => (
                    <tr key={r.title} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium whitespace-nowrap">{r.title}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{r.type}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{r.fromDate}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{r.toDate}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{r.submittedOn}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium rounded-full px-3 py-1 whitespace-nowrap ${statusStyles[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(r)}
                            aria-label={`View ${r.title}`}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-blue-600 hover:bg-blue-50"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleDownload(r)}
                            aria-label={`Download ${r.title}`}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-blue-600 hover:bg-blue-50"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-400">
                        No reports match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
 
            {/* ===== Footer / pagination ===== */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Showing 1 to {filteredReports.length} of {reports.length} reports
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={14} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-md text-sm font-medium">
                  1
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50"
                  aria-label="Next page"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
 