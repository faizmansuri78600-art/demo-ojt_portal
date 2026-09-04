import { useState, useMemo } from "react";
import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";
 
import {
  MessageSquare,
  ThumbsUp,
  Meh,
  Frown,
  Search,
  Calendar,
  Filter,
  Plus,
  Eye,
  Trash2,
  X,
  Star,
  Building2,
  User,
  Briefcase,
  GraduationCap,
  AlertTriangle,
  Send,
  Clock,
  CheckCircle,
} from "lucide-react";



const initialFeedback = [
  {
    id: 1,
    type: "Company",
    relatedTo: "Tech Solutions Pvt. Ltd.",
    subtitle: "Web Development Intern",
    rating: 5,
    summary: "Great work environment and supportive team.",
    date: "15 May 2025",
    time: "10:30 AM",
    program: "Web Development",
    category: "Company",
    comments:
      "The company provided a very good working environment. The team members were supportive and helped me whenever I faced any difficulty.",
    strengths:
      "Good communication, supportive team and practical learning opportunities.",
    improvement:
      "More regular technical discussions with interns would be helpful.",
    response:
      "Thank you for your valuable feedback. We are glad that you had a positive experience.",
  },
  {
    id: 2,
    type: "Mentor",
    relatedTo: "Mr. Ahmed Khan",
    subtitle: "Faculty Mentor",
    rating: 4,
    summary: "Mentor was very helpful and guided me throughout.",
    date: "14 May 2025",
    time: "04:20 PM",
    program: "Web Development",
    category: "Mentor",
    comments:
      "My mentor regularly guided me and helped me understand the tasks assigned during the OJT.",
    strengths:
      "Excellent guidance, communication and regular support.",
    improvement:
      "More frequent review meetings could make the mentoring experience even better.",
    response:
      "Thank you for your feedback. We appreciate your suggestions.",
  },
  {
    id: 3,
    type: "OJT Program",
    relatedTo: "Web Development Intern",
    subtitle: "OJT Program",
    rating: 4,
    summary: "The program is well structured and informative.",
    date: "10 May 2025",
    time: "11:45 AM",
    program: "Web Development",
    category: "OJT Program",
    comments:
      "The OJT program was properly structured and gave me an opportunity to work on practical tasks.",
    strengths:
      "Well-organized tasks, useful learning material and practical exposure.",
    improvement:
      "More project-based assignments can be added.",
    response:
      "We appreciate your feedback and will consider your suggestions.",
  },
  {
    id: 4,
    type: "College Support",
    relatedTo: "BCA Department",
    subtitle: "Abeda Inamdar College",
    rating: 5,
    summary: "College support and coordination was excellent.",
    date: "08 May 2025",
    time: "02:15 PM",
    program: "General",
    category: "College Support",
    comments:
      "The college department provided excellent support during the OJT process and helped with documentation and coordination.",
    strengths:
      "Excellent coordination and timely communication.",
    improvement:
      "The process can be made more digital and automated.",
    response:
      "Thank you for appreciating the department's support.",
  },
  {
    id: 5,
    type: "Issue / Problem",
    relatedTo: "Tech Solutions Pvt. Ltd.",
    subtitle: "Web Development Intern",
    rating: 3,
    summary: "Some communication issues were experienced.",
    date: "05 May 2025",
    time: "03:10 PM",
    program: "Web Development",
    category: "Issue / Problem",
    comments:
      "There were some communication gaps regarding task requirements and deadlines.",
    strengths:
      "The technical team was helpful whenever clarification was requested.",
    improvement:
      "Task requirements and deadlines should be communicated more clearly.",
    response:
      "Your concern has been noted and will be forwarded to the concerned team.",
  },
  {
    id: 6,
    type: "Company",
    relatedTo: "Innovate Systems",
    subtitle: "Software Intern",
    rating: 5,
    summary: "Excellent learning experience and friendly environment.",
    date: "03 May 2025",
    time: "12:20 PM",
    program: "Software Development",
    category: "Company",
    comments:
      "The internship provided excellent exposure to real-world software development.",
    strengths:
      "Friendly environment, good tasks and excellent learning opportunities.",
    improvement:
      "More technical workshops would be beneficial.",
    response:
      "Thank you for sharing your experience.",
  },
  {
    id: 7,
    type: "Mentor",
    relatedTo: "Ms. Priya Sharma",
    subtitle: "Faculty Mentor",
    rating: 4,
    summary: "Helpful mentor with good technical knowledge.",
    date: "01 May 2025",
    time: "05:00 PM",
    program: "Software Development",
    category: "Mentor",
    comments:
      "The mentor provided useful suggestions and helped me improve my technical understanding.",
    strengths:
      "Good technical knowledge and helpful guidance.",
    improvement:
      "More one-to-one discussions can be conducted.",
    response:
      "Thank you for your feedback.",
  },
  {
    id: 8,
    type: "OJT Program",
    relatedTo: "Software Development",
    subtitle: "OJT Program",
    rating: 5,
    summary: "Very useful program with practical exposure.",
    date: "29 Apr 2025",
    time: "01:30 PM",
    program: "Software Development",
    category: "OJT Program",
    comments:
      "The program helped me understand how software development works in a professional environment.",
    strengths:
      "Practical exposure, structured tasks and useful learning.",
    improvement:
      "More group activities could be included.",
    response:
      "We are happy that the program was useful for you.",
  },
];

const feedbackTypes = [
  "All Feedback Type",
  "Company",
  "Mentor",
  "OJT Program",
  "College Support",
  "Issue / Problem",
];

const programs = [
  "All OJT Programs",
  "Web Development",
  "Software Development",
  "General",
];

function RatingStars({ rating, size = 18, interactive = false, onChange }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <button
          key={starNumber}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && onChange(starNumber)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={size}
            className={
              starNumber <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

function FeedbackTypeIcon({ type }) {
  const iconMap = {
    Company: {
      icon: Building2,
      style: "bg-green-100 text-green-600",
    },
    Mentor: {
      icon: User,
      style: "bg-purple-100 text-purple-600",
    },
    "OJT Program": {
      icon: Briefcase,
      style: "bg-orange-100 text-orange-600",
    },
    "College Support": {
      icon: GraduationCap,
      style: "bg-blue-100 text-blue-600",
    },
    "Issue / Problem": {
      icon: AlertTriangle,
      style: "bg-red-100 text-red-500",
    },
  };

  const selected = iconMap[type] || {
    icon: MessageSquare,
    style: "bg-gray-100 text-gray-600",
  };

  const Icon = selected.icon;

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${selected.style}`}
    >
      <Icon size={19} />
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconStyle,
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 flex items-center gap-4">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center ${iconStyle}`}
      >
        <Icon size={25} />
      </div>

      <div>
        <p className="text-sm text-gray-600">{title}</p>

        <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
          {value}
        </h3>

        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState(initialFeedback);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Feedback Type");
  const [programFilter, setProgramFilter] = useState("All OJT Programs");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [newFeedback, setNewFeedback] = useState({
    type: "Company",
    relatedTo: "",
    program: "Web Development",
    rating: 0,
    comments: "",
  });

  const totalFeedback = feedbackList.length;

  const positiveFeedback = feedbackList.filter(
    (item) => item.rating >= 4
  ).length;

  const neutralFeedback = feedbackList.filter(
    (item) => item.rating === 3
  ).length;

  const negativeFeedback = feedbackList.filter(
    (item) => item.rating <= 2
  ).length;

  const averageRating =
    totalFeedback > 0
      ? (
          feedbackList.reduce((sum, item) => sum + item.rating, 0) /
          totalFeedback
        ).toFixed(1)
      : "0.0";

  const positivePercentage =
    totalFeedback > 0
      ? ((positiveFeedback / totalFeedback) * 100).toFixed(2)
      : "0.00";

  const neutralPercentage =
    totalFeedback > 0
      ? ((neutralFeedback / totalFeedback) * 100).toFixed(2)
      : "0.00";

  const negativePercentage =
    totalFeedback > 0
      ? ((negativeFeedback / totalFeedback) * 100).toFixed(2)
      : "0.00";

  const filteredFeedback = useMemo(() => {
    return feedbackList.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.type.toLowerCase().includes(searchText) ||
        item.relatedTo.toLowerCase().includes(searchText) ||
        item.summary.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All Feedback Type" ||
        item.type === typeFilter;

      const matchesProgram =
        programFilter === "All OJT Programs" ||
        item.program === programFilter;

      return matchesSearch && matchesType && matchesProgram;
    });
  }, [feedbackList, search, typeFilter, programFilter]);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All Feedback Type");
    setProgramFilter("All OJT Programs");
    setFromDate("");
    setToDate("");
  };

  const deleteFeedback = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) return;

    setFeedbackList((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (selectedFeedback?.id === id) {
      setSelectedFeedback(null);
    }
  };

  const submitFeedback = (e) => {
    e.preventDefault();

    if (
      !newFeedback.relatedTo ||
      !newFeedback.rating ||
      !newFeedback.comments.trim()
    ) {
      alert(
        "Please select a rating and fill all required fields."
      );
      return;
    }

    const now = new Date();

    const newItem = {
      id:
        feedbackList.length > 0
          ? Math.max(...feedbackList.map((item) => item.id)) + 1
          : 1,
      type: newFeedback.type,
      relatedTo: newFeedback.relatedTo,
      subtitle:
        newFeedback.type === "Mentor"
          ? "Faculty Mentor"
          : newFeedback.type === "Company"
          ? "OJT Company"
          : newFeedback.type,
      rating: newFeedback.rating,
      summary:
        newFeedback.comments.length > 65
          ? `${newFeedback.comments.substring(0, 65)}...`
          : newFeedback.comments,
      date: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      program: newFeedback.program,
      category: newFeedback.type,
      comments: newFeedback.comments,
      strengths: "Feedback submitted by student.",
      improvement: "No improvement suggestion provided.",
      response: "Your feedback has been submitted successfully.",
    };

    setFeedbackList((prev) => [newItem, ...prev]);

    setNewFeedback({
      type: "Company",
      relatedTo: "",
      program: "Web Development",
      rating: 0,
      comments: "",
    });

    setShowSubmitModal(false);

    alert("Feedback submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Sidebar activePage="Feedback" />

      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-7">
          {/* PAGE HEADER */}

          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Feedback
              </h1>

              <div className="flex items-center gap-2 mt-2 text-sm">
                <span className="text-blue-600 font-medium">
                  Dashboard
                </span>

                <span className="text-gray-400">›</span>

                <span className="text-gray-500">Feedback</span>
              </div>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium text-sm transition"
            >
              <Plus size={18} />
              Submit New Feedback
            </button>
          </div>

          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-4 gap-5 mb-6">
            <SummaryCard
              icon={MessageSquare}
              title="Total Feedback"
              value={totalFeedback}
              subtitle="All feedback submitted"
              iconStyle="bg-blue-100 text-blue-600"
            />

            <SummaryCard
              icon={ThumbsUp}
              title="Positive"
              value={positiveFeedback}
              subtitle={`${positivePercentage}%`}
              iconStyle="bg-green-100 text-green-600"
            />

            <SummaryCard
              icon={Meh}
              title="Neutral"
              value={neutralFeedback}
              subtitle={`${neutralPercentage}%`}
              iconStyle="bg-yellow-100 text-yellow-600"
            />

            <SummaryCard
              icon={Frown}
              title="Negative"
              value={negativeFeedback}
              subtitle={`${negativePercentage}%`}
              iconStyle="bg-red-100 text-red-500"
            />
          </div>

          {/* FILTER BAR */}

          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search feedback..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="w-52 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-500"
              >
                {feedbackTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              <select
                value={programFilter}
                onChange={(e) =>
                  setProgramFilter(e.target.value)
                }
                className="w-56 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-500"
              >
                {programs.map((program) => (
                  <option key={program}>{program}</option>
                ))}
              </select>

              <div className="relative">
                <Calendar
                  size={17}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-48 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-500 outline-none focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <Calendar
                  size={17}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-48 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-500 outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={clearFilters}
                className="flex items-center gap-2 border border-blue-400 text-blue-600 px-5 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
              >
                <Filter size={17} />
                Filter
              </button>
            </div>
          </div>

          {/* CONTENT GRID */}

          <div className="grid grid-cols-[minmax(0,1fr)_365px] gap-5">
            {/* FEEDBACK TABLE */}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-5 py-5 text-left text-sm font-semibold text-gray-600">
                        #
                      </th>

                      <th className="px-5 py-5 text-left text-sm font-semibold text-gray-600">
                        Feedback Type
                      </th>

                      <th className="px-5 py-5 text-left text-sm font-semibold text-gray-600">
                        Related To
                      </th>

                      <th className="px-5 py-5 text-left text-sm font-semibold text-gray-600">
                        Rating
                      </th>

                      <th className="px-5 py-5 text-left text-sm font-semibold text-gray-600">
                        Feedback Summary
                      </th>

                      <th className="px-5 py-5 text-left text-sm font-semibold text-gray-600">
                        Submitted On
                      </th>

                      <th className="px-5 py-5 text-left text-sm font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredFeedback.length > 0 ? (
                      filteredFeedback.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <td className="px-5 py-5 text-sm text-gray-500">
                            {index + 1}
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center gap-3">
                              <FeedbackTypeIcon
                                type={item.type}
                              />

                              <span className="text-sm font-semibold text-gray-800">
                                {item.type}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <p className="text-sm font-semibold text-gray-800">
                              {item.relatedTo}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {item.subtitle}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <RatingStars
                              rating={item.rating}
                              size={17}
                            />

                            <p className="text-sm font-semibold text-green-600 mt-1">
                              {item.rating}.0
                            </p>
                          </td>

                          <td className="px-5 py-5 max-w-[230px]">
                            <p className="text-sm text-gray-600 leading-6">
                              {item.summary}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <p className="text-sm text-gray-600">
                              {item.date}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {item.time}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setSelectedFeedback(item)
                                }
                                title="View Feedback"
                                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition"
                              >
                                <Eye size={18} />
                              </button>

                              <button
                                onClick={() =>
                                  deleteFeedback(item.id)
                                }
                                title="Delete Feedback"
                                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-14 text-center"
                        >
                          <MessageSquare
                            size={38}
                            className="mx-auto text-gray-300 mb-3"
                          />

                          <p className="font-medium text-gray-700">
                            No feedback found
                          </p>

                          <p className="text-sm text-gray-400 mt-1">
                            Try changing your search or filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* TABLE FOOTER */}

              <div className="px-5 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing {filteredFeedback.length} of{" "}
                  {feedbackList.length} feedback
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="space-y-5">
              {/* FEEDBACK OVERVIEW */}

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900">
                  Feedback Overview
                </h3>

                <div className="flex justify-center py-5">
                  <div
                    className="w-36 h-36 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(
                        #22c55e 0% ${positivePercentage}%,
                        #eab308 ${positivePercentage}% ${
                        Number(positivePercentage) +
                        Number(neutralPercentage)
                      }%,
                        #ef4444 ${
                          Number(positivePercentage) +
                          Number(neutralPercentage)
                        }% 100%
                      )`,
                    }}
                  >
                    <div className="w-20 h-20 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <span className="text-gray-600">
                      Positive ({positivePercentage}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="text-gray-600">
                      Neutral ({neutralPercentage}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="text-gray-600">
                      Negative ({negativePercentage}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* AVERAGE RATING */}

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900">
                  Average Rating
                </h3>

                <div className="flex items-center gap-3 mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {averageRating}
                  </span>

                  <div>
                    <div className="flex items-center gap-1">
                      <RatingStars
                        rating={Math.round(
                          Number(averageRating)
                        )}
                        size={18}
                      />
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      Based on {totalFeedback} feedback
                    </p>
                  </div>
                </div>
              </div>

              {/* RECENT FEEDBACK */}

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Recent Feedback
                  </h3>

                  <Clock
                    size={18}
                    className="text-gray-400"
                  />
                </div>

                <div className="space-y-4">
                  {feedbackList.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3"
                    >
                      <FeedbackTypeIcon type={item.type} />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800">
                          {item.type}
                        </p>

                        <div className="mt-1">
                          <RatingStars
                            rating={item.rating}
                            size={14}
                          />
                        </div>

                        <p className="text-xs text-gray-400 mt-1">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= VIEW FEEDBACK MODAL ================= */}

      {selectedFeedback && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden">
            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FeedbackTypeIcon
                  type={selectedFeedback.type}
                />

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedFeedback.type} Feedback
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {selectedFeedback.relatedTo}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFeedback(null)}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* BASIC INFO */}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-400">
                    Related To
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {selectedFeedback.relatedTo}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {selectedFeedback.subtitle}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-400">
                    OJT Program
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {selectedFeedback.program}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-400">
                    Submitted On
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {selectedFeedback.date}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {selectedFeedback.time}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-2">
                    Overall Rating
                  </p>

                  <div className="flex items-center gap-3">
                    <RatingStars
                      rating={selectedFeedback.rating}
                      size={19}
                    />

                    <span className="text-sm font-bold text-green-600">
                      {selectedFeedback.rating}.0 / 5
                    </span>
                  </div>
                </div>
              </div>

              {/* FEEDBACK */}

              <div className="mb-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Your Feedback
                </h3>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-6">
                    {selectedFeedback.comments}
                  </p>
                </div>
              </div>

              {/* STRENGTHS */}

              <div className="mb-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Positive Aspects
                </h3>

                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-600 mt-0.5"
                    />

                    <p className="text-sm text-gray-700 leading-6">
                      {selectedFeedback.strengths}
                    </p>
                  </div>
                </div>
              </div>

              {/* IMPROVEMENT */}

              <div className="mb-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Suggestions for Improvement
                </h3>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-6">
                    {selectedFeedback.improvement}
                  </p>
                </div>
              </div>

              {/* RESPONSE */}

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Coordinator Response
                </h3>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-6">
                    {selectedFeedback.response}
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBMIT FEEDBACK MODAL ================= */}

      {showSubmitModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">
            {/* HEADER */}

            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Submit New Feedback
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Share your OJT experience and feedback
                </p>
              </div>

              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={submitFeedback}
              className="p-6"
            >
              <div className="space-y-5">
                {/* FEEDBACK TYPE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Type *
                  </label>

                  <select
                    value={newFeedback.type}
                    onChange={(e) =>
                      setNewFeedback({
                        ...newFeedback,
                        type: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option>Company</option>
                    <option>Mentor</option>
                    <option>OJT Program</option>
                    <option>College Support</option>
                    <option>Issue / Problem</option>
                  </select>
                </div>

                {/* RELATED TO */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Related To *
                  </label>

                  <input
                    type="text"
                    value={newFeedback.relatedTo}
                    onChange={(e) =>
                      setNewFeedback({
                        ...newFeedback,
                        relatedTo: e.target.value,
                      })
                    }
                    placeholder={
                      newFeedback.type === "Mentor"
                        ? "Enter mentor name"
                        : newFeedback.type === "Company"
                        ? "Enter company name"
                        : "Enter related subject"
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* PROGRAM */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OJT Program
                  </label>

                  <select
                    value={newFeedback.program}
                    onChange={(e) =>
                      setNewFeedback({
                        ...newFeedback,
                        program: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option>Web Development</option>
                    <option>Software Development</option>
                    <option>General</option>
                  </select>
                </div>

                {/* RATING */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>

                  <div className="flex items-center gap-3">
                    <RatingStars
                      rating={newFeedback.rating}
                      size={30}
                      interactive={true}
                      onChange={(rating) =>
                        setNewFeedback({
                          ...newFeedback,
                          rating,
                        })
                      }
                    />

                    <span className="text-sm font-semibold text-gray-600">
                      {newFeedback.rating
                        ? `${newFeedback.rating} / 5`
                        : "Select rating"}
                    </span>
                  </div>
                </div>

                {/* COMMENTS */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback *
                  </label>

                  <textarea
                    rows="5"
                    value={newFeedback.comments}
                    onChange={(e) =>
                      setNewFeedback({
                        ...newFeedback,
                        comments: e.target.value,
                      })
                    }
                    placeholder="Write your feedback here..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                >
                  <Send size={17} />
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}