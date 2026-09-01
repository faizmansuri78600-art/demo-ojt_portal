import { useState, useMemo } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
 
import {
  ChevronRight,
  Plus,
  MessageSquare,
  ThumbsUp,
  Meh,
  Frown,
  Search,
  Calendar,
  Building2,
  UserRound,
  Briefcase,
  School,
  AlertTriangle,
  Lightbulb,
  Star,
  Eye,
  Trash2,
  ChevronLeft,
  X,
} from "lucide-react";
 
// ===== Feedback type -> icon/color mapping =====
const typeMeta = {
  Company: { icon: Building2, bg: "bg-green-100", color: "text-green-600" },
  Mentor: { icon: UserRound, bg: "bg-purple-100", color: "text-purple-600" },
  "OJT Program": { icon: Briefcase, bg: "bg-orange-100", color: "text-orange-500" },
  "College Support": { icon: School, bg: "bg-blue-100", color: "text-blue-600" },
  "Issue / Problem": { icon: AlertTriangle, bg: "bg-red-100", color: "text-red-500" },
  Suggestion: { icon: Lightbulb, bg: "bg-green-100", color: "text-green-600" },
};
 
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          className={n <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}
 
export default function Feedback() {
  // ===== Summary cards =====
  const summary = [
    { label: "Total Feedback", value: "12", sub: "All feedback submitted", icon: MessageSquare, iconBg: "bg-blue-100", iconColor: "text-blue-600", cardBg: "bg-blue-50" },
    { label: "Positive", value: "7", sub: "58.33%", icon: ThumbsUp, iconBg: "bg-green-100", iconColor: "text-green-600", cardBg: "bg-green-50" },
    { label: "Neutral", value: "3", sub: "25.00%", icon: Meh, iconBg: "bg-yellow-100", iconColor: "text-yellow-500", cardBg: "bg-yellow-50" },
    { label: "Negative", value: "2", sub: "16.67%", icon: Frown, iconBg: "bg-red-100", iconColor: "text-red-500", cardBg: "bg-red-50" },
  ];
 
  // ===== Feedback table data =====
  const feedbackData = [
    { type: "Company", relatedTo: "Tech Solutions Pvt. Ltd.", subLine: "Web Development Intern", rating: 5.0, summary: "Great work environment and supportive team.", date: "15 May 2025", time: "10:30 AM" },
    { type: "Mentor", relatedTo: "Mr. Ahmed Khan", subLine: "Faculty Mentor", rating: 4.0, summary: "Mentor was very helpful and guided me throughout.", date: "14 May 2025", time: "04:20 PM" },
    { type: "OJT Program", relatedTo: "Web Development Intern", subLine: "OJT Program", rating: 4.0, summary: "The program is well structured and informative.", date: "10 May 2025", time: "11:45 AM" },
    { type: "College Support", relatedTo: "BCA Department", subLine: "Abeda Inamdar College", rating: 5.0, summary: "College support and coordination was excellent.", date: "08 May 2025", time: "02:15 PM" },
    { type: "Issue / Problem", relatedTo: "Tech Solutions Pvt. Ltd.", subLine: "Web Development Intern", rating: 3.0, summary: "Some communication delay in task updates.", date: "05 May 2025", time: "01:10 PM" },
    { type: "Suggestion", relatedTo: "Web Development Intern", subLine: "OJT Program", rating: 4.0, summary: "Please include more hands-on projects in the program.", date: "01 May 2025", time: "09:30 AM" },
  ];
 
  // ===== Filters (functional) =====
  const [search, setSearch] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [ojtProgram, setOjtProgram] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
 
  const feedbackTypeOptions = ["Company", "Mentor", "OJT Program", "College Support", "Issue / Problem", "Suggestion"];
  const ojtProgramOptions = ["Web Development Intern", "Data Analytics Intern", "Java Development Intern"];
 
  const filteredFeedback = useMemo(() => {
    return feedbackData.filter((f) => {
      const matchesSearch =
        search.trim() === "" ||
        f.summary.toLowerCase().includes(search.toLowerCase()) ||
        f.relatedTo.toLowerCase().includes(search.toLowerCase());
      const matchesType = feedbackType === "" || f.type === feedbackType;
      const matchesProgram = ojtProgram === "" || f.relatedTo === ojtProgram || f.subLine === ojtProgram;
 
      let matchesFrom = true;
      if (fromDate) matchesFrom = new Date(f.date) >= new Date(fromDate);
      let matchesTo = true;
      if (toDate) matchesTo = new Date(f.date) <= new Date(toDate);
 
      return matchesSearch && matchesType && matchesProgram && matchesFrom && matchesTo;
    });
  }, [search, feedbackType, ojtProgram, fromDate, toDate]);
 
  // ===== Right sidebar data =====
  const overview = { positive: 58.33, neutral: 25.0, negative: 16.67 };
  const donutBackground = `conic-gradient(#22c55e 0% ${overview.positive}%, #eab308 ${overview.positive}% ${overview.positive + overview.neutral}%, #ef4444 ${overview.positive + overview.neutral}% 100%)`;
 
  const recentFeedback = [
    { type: "Company Feedback", rating: 5.0, date: "15 May 2025", text: "Great work environment and supportive team.", icon: ThumbsUp, bg: "bg-green-100", color: "text-green-600" },
    { type: "Mentor Feedback", rating: 4.0, date: "14 May 2025", text: "Mentor was very helpful and guided me throughout.", icon: UserRound, bg: "bg-purple-100", color: "text-purple-600" },
  ];
 
  // ===== Submit feedback modal =====
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    type: "Company",
    relatedTo: "",
    rating: "5",
    summary: "",
  });
 
  const updateNewFeedback = (field, value) =>
    setNewFeedback((prev) => ({ ...prev, [field]: value }));
 
  const handleSubmitFeedback = () => {
    alert(`Feedback submitted:\n${JSON.stringify(newFeedback, null, 2)}`);
    setIsModalOpen(false);
    setNewFeedback({ type: "Company", relatedTo: "", rating: "5", summary: "" });
  };
 
  const handleView = (f) => alert(`Viewing feedback: ${f.summary}`);
  const handleDelete = (f) => alert(`Deleting feedback: ${f.summary}`);
 
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar activePage="Feedback" />
 
      {/* Offsets keep content clear of the fixed Header and Sidebar.
          overflow-x-hidden stops the page from ever scrolling horizontally;
          only the table scrolls internally on small screens. */}
      <main className="ml-64 pt-16 min-h-screen overflow-x-hidden">
        <div className="p-6 max-w-full">
          {/* ===== Page header ===== */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-800">Feedback</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Plus size={15} /> Submit New Feedback
            </button>
          </div>
          <div className="flex items-center gap-1 text-sm mb-5">
            <span className="text-blue-600 font-medium">Dashboard</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-500">Feedback</span>
          </div>
 
          {/* ===== Summary cards ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {summary.map(({ label, value, sub, icon: Icon, iconBg, iconColor, cardBg }) => (
              <div key={label} className={`border border-gray-200 rounded-lg p-4 flex items-center gap-3 ${cardBg}`}>
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{label}</p>
                  <p className="text-xl font-bold text-gray-800 leading-tight">{value}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
 
          {/* ===== Search & filter bar ===== */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search feedback..."
                className="w-full border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
 
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
            >
              <option value="">All Feedback Type</option>
              {feedbackTypeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
 
            <select
              value={ojtProgram}
              onChange={(e) => setOjtProgram(e.target.value)}
              className="border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
            >
              <option value="">All OJT Programs</option>
              {ojtProgramOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
 
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-200 rounded-md py-2 pl-3 pr-9 text-sm text-gray-600 w-[150px]"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
 
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-200 rounded-md py-2 pl-3 pr-9 text-sm text-gray-600 w-[150px]"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
 
            <button className="flex items-center gap-1.5 text-sm font-medium text-blue-600 border border-blue-300 px-4 py-2 rounded-md hover:bg-blue-50">
             {/* // <Funnel size={14} /> Filter */}
            </button>
          </div>
 
          {/* ===== Main grid: table + right sidebar ===== */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            {/* Table */}
            <div className="xl:col-span-3 min-w-0">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[900px]">
                    <thead>
                      <tr className="text-gray-500 text-left border-b border-gray-100 bg-gray-50">
                        <th className="py-3 px-4 font-semibold">#</th>
                        <th className="py-3 px-4 font-semibold">Feedback Type</th>
                        <th className="py-3 px-4 font-semibold">Related To</th>
                        <th className="py-3 px-4 font-semibold">Rating</th>
                        <th className="py-3 px-4 font-semibold">Feedback Summary</th>
                        <th className="py-3 px-4 font-semibold">Submitted On</th>
                        <th className="py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFeedback.map((f, i) => {
                        const meta = typeMeta[f.type];
                        const Icon = meta.icon;
                        return (
                          <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 align-top">
                            <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full ${meta.bg} flex items-center justify-center shrink-0`}>
                                  <Icon size={14} className={meta.color} />
                                </div>
                                <span className="font-medium text-gray-700 whitespace-nowrap">{f.type}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-gray-700 font-medium whitespace-nowrap">{f.relatedTo}</p>
                              <p className="text-xs text-gray-400 whitespace-nowrap">{f.subLine}</p>
                            </td>
                            <td className="py-3 px-4">
                              <StarRating rating={f.rating} />
                              <p className={`text-xs font-semibold mt-0.5 ${f.rating >= 4 ? "text-green-600" : "text-orange-500"}`}>
                                {f.rating.toFixed(1)}
                              </p>
                            </td>
                            <td className="py-3 px-4 text-gray-600 max-w-[220px]">{f.summary}</td>
                            <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                              <p>{f.date}</p>
                              <p className="text-xs text-gray-400">{f.time}</p>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleView(f)}
                                  aria-label="View feedback"
                                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-blue-600 hover:bg-blue-50"
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(f)}
                                  aria-label="Delete feedback"
                                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredFeedback.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-400">
                            No feedback matches your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
 
                {/* Footer / pagination */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Showing 1 to {filteredFeedback.length} of 12 feedback
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50" aria-label="Previous page">
                      <ChevronLeft size={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-md text-sm font-medium">1</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 text-sm font-medium">2</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50" aria-label="Next page">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Right sidebar */}
            <div className="xl:col-span-1 min-w-0 space-y-4">
              {/* Feedback Overview */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Feedback Overview</h3>
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="relative w-28 h-28 rounded-full flex items-center justify-center"
                    style={{ background: donutBackground }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white" />
                  </div>
                </div>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-600">Positive ({overview.positive}%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-gray-600">Neutral ({overview.neutral.toFixed(2)}%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-gray-600">Negative ({overview.negative}%)</span>
                  </li>
                </ul>
              </div>
 
              {/* Average Rating */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Average Rating</h3>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-800">
                    4.2<span className="text-base font-medium text-gray-400"> / 5</span>
                  </p>
                  <StarRating rating={4.2} />
                </div>
                <p className="text-xs text-gray-400 mt-1">Based on 12 feedback</p>
              </div>
 
              {/* Recent Feedback */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Feedback</h3>
                <ul className="space-y-3">
                  {recentFeedback.map(({ type, rating, date, text, icon: Icon, bg, color }, i) => (
                    <li key={i} className="flex gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                        <Icon size={14} className={color} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-gray-700">{type}</p>
                          <span className="text-[10px] text-gray-400 shrink-0">{date}</span>
                        </div>
                        <StarRating rating={rating} />
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="text-xs text-blue-600 font-medium mt-3">
                  View All Feedback &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
 
      {/* ===== Submit New Feedback modal ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-800">Submit Feedback</h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
 
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Feedback Type</label>
                <select
                  value={newFeedback.type}
                  onChange={(e) => updateNewFeedback("type", e.target.value)}
                  className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
                >
                  {feedbackTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Related To</label>
                <input
                  type="text"
                  value={newFeedback.relatedTo}
                  onChange={(e) => updateNewFeedback("relatedTo", e.target.value)}
                  placeholder="e.g. Tech Solutions Pvt. Ltd."
                  className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Rating</label>
                <select
                  value={newFeedback.rating}
                  onChange={(e) => updateNewFeedback("rating", e.target.value)}
                  className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-600"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n}.0</option>
                  ))}
                </select>
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Feedback Summary</label>
                <textarea
                  value={newFeedback.summary}
                  onChange={(e) => updateNewFeedback("summary", e.target.value)}
                  rows={3}
                  placeholder="Write your feedback..."
                  className="w-full border border-gray-200 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
            </div>
 
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 text-sm font-medium text-gray-600 border border-gray-200 rounded-md py-2 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 text-sm font-medium text-white bg-blue-600 rounded-md py-2 hover:bg-blue-700"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 