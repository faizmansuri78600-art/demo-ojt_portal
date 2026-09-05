import React, { useState } from "react";

import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";

import tcsLogo from "../../assets/logos/tcslogo.png";
import infosysLogo from "../../assets/logos/Infosyslogo.png";
import wiproLogo from "../../assets/logos/WiproLogo.png";
import cognizantLogo from "../../assets/logos/cognizantlogo.png";

import {
  Search,
  MapPin,
  Clock,
  IndianRupee,
  Bookmark,
  BookmarkCheck,
  Eye,
  CheckCircle,
  X,
  Building2,
  Calendar,
  Briefcase,
} from "lucide-react";

// ===============================
// OJT OPPORTUNITIES DATA
// ===============================

const opportunities = [
  {
    id: 1,
    logo: tcsLogo,
    title: "Python Developer Intern",
    company: "Tata Consultancy Services",
    location: "Pune, Maharashtra",
    duration: "3 Months",
    stipend: "5,000",
    postedOn: "17 May 2025",
    category: "Development",
    skills: ["Python", "Django", "SQL", "REST API"],
    description:
      "Work on Python-based applications, REST APIs and backend development under experienced developers.",
    requirements: [
      "Basic knowledge of Python",
      "Understanding of SQL",
      "Knowledge of REST APIs",
      "Good problem-solving skills",
    ],
    isNew: true,
  },

  {
    id: 2,
    logo: infosysLogo,
    title: "Web Development Intern",
    company: "Infosys Limited",
    location: "Bangalore, Karnataka",
    duration: "4 Months",
    stipend: "12,000",
    postedOn: "16 May 2025",
    category: "Development",
    skills: ["HTML", "CSS", "JavaScript"],
    description:
      "Develop responsive web applications and work with modern frontend technologies.",
    requirements: [
      "HTML and CSS knowledge",
      "JavaScript basics",
      "Understanding of responsive design",
      "Good communication skills",
    ],
    isNew: true,
  },

  {
    id: 3,
    logo: wiproLogo,
    title: "Data Analytics Intern",
    company: "Wipro Technologies",
    location: "Hyderabad, Telangana",
    duration: "3 Months",
    stipend: "14,000",
    postedOn: "16 May 2025",
    category: "Data Analytics",
    skills: ["Python", "Excel", "Power BI"],
    description:
      "Analyze business data, prepare reports and create dashboards using data analytics tools.",
    requirements: [
      "Basic Python knowledge",
      "Excel knowledge",
      "Understanding of data analysis",
      "Basic Power BI knowledge",
    ],
    isNew: true,
  },

  {
    id: 4,
    logo: cognizantLogo,
    title: "Software Engineering Intern",
    company: "Cognizant Technology Solutions",
    location: "Chennai, Tamil Nadu",
    duration: "6 Months",
    stipend: "16,000",
    postedOn: "14 May 2025",
    category: "Development",
    skills: ["Java", "Spring Boot", "MySQL", "Git"],
    description:
      "Work with the software engineering team to develop and maintain enterprise applications.",
    requirements: [
      "Java programming knowledge",
      "Basic MySQL knowledge",
      "Understanding of Git",
      "Knowledge of OOP concepts",
    ],
    isNew: false,
  },
];

// ===============================
// MAIN PAGE
// ===============================

export default function BrowseOjt() {
  const [bookmarked, setBookmarked] = useState([]);
  const [applied, setApplied] = useState([]);
  const [selectedOJT, setSelectedOJT] = useState(null);

  // Search and filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [duration, setDuration] = useState("All Durations");
  const [sort, setSort] = useState("Newest");

  // ===============================
  // BOOKMARK
  // ===============================

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ===============================
  // APPLY OJT
  // ===============================

  const handleApply = (opportunity) => {
    if (applied.includes(opportunity.id)) {
      alert("You have already applied for this OJT. ✅");
      return;
    }

    setApplied((prev) => [...prev, opportunity.id]);

    alert(
      `Application submitted successfully! 🎉\n\nRole: ${opportunity.title}\nCompany: ${opportunity.company}`
    );

    setSelectedOJT(null);
  };

  // ===============================
  // FILTER OJT
  // ===============================

  const filteredOpportunities = opportunities
    .filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.company.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText) ||
        item.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesCategory =
        category === "All Categories" ||
        item.category === category;

      const matchesLocation =
        location === "All Locations" ||
        item.location.toLowerCase().includes(location.toLowerCase());

      const matchesDuration =
        duration === "All Durations" ||
        item.duration === duration;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesDuration
      );
    })
    .sort((a, b) => {
      if (sort === "Oldest") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });

  // ===============================
  // RESET FILTERS
  // ===============================

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setLocation("All Locations");
    setDuration("All Durations");
    setSort("Newest");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex pt-16">
       <Sidebar activePage="Browse OJT Opportunities" />

        <main className="ml-64 flex-1 p-6">
          {/* ================= BREADCRUMB ================= */}

          <div className="text-sm text-gray-500 mb-3">
            Dashboard
            <span className="mx-2">›</span>
            <span className="text-gray-700">
              Browse OJT Opportunities
            </span>
          </div>

          {/* ================= PAGE HEADING ================= */}

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Browse OJT Opportunities
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Explore and apply for the best OJT opportunities
              that match your skills and interests.
            </p>
          </div>

          {/* ================= SEARCH BAR ================= */}

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5">
            <div className="flex flex-wrap gap-3">
              {/* Search */}

              <div className="flex-1 min-w-[220px] border border-gray-200 rounded-md flex items-center px-3">
                <Search
                  size={17}
                  className="text-gray-400 mr-2"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by role, company, skills..."
                  className="w-full py-2 outline-none text-sm"
                />
              </div>

              {/* Category */}

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >
                <option>All Categories</option>
                <option>Development</option>
                <option>Data Analytics</option>
                <option>Design</option>
              </select>

              {/* Location */}

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >
                <option>All Locations</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>

              {/* Duration */}

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >
                <option>All Durations</option>
                <option>3 Months</option>
                <option>4 Months</option>
                <option>6 Months</option>
              </select>

              {/* Sort */}

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >
                <option value="Newest">Sort By: Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>

            {/* Total */}

            <div className="mt-4 text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {filteredOpportunities.length}
              </span>{" "}
              Opportunities Found
            </div>
          </div>

          {/* ================= PAGE GRID ================= */}

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
            {/* ================= OPPORTUNITY LIST ================= */}

            <div className="space-y-4">
              {filteredOpportunities.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
                  <Search
                    size={35}
                    className="mx-auto text-gray-300 mb-3"
                  />

                  <h3 className="text-sm font-semibold text-gray-700">
                    No opportunities found
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    Try changing your search or filters.
                  </p>
                </div>
              ) : (
                filteredOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="bg-white border border-gray-200 rounded-lg p-5"
                  >
                    {/* Card Header */}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Logo */}

                        <div className="w-14 h-14 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={opportunity.logo}
                            alt={opportunity.company}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Title */}

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-base font-semibold text-gray-800">
                              {opportunity.title}
                            </h2>

                            {opportunity.isNew && (
                              <span className="text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">
                                New
                              </span>
                            )}

                            {applied.includes(opportunity.id) && (
                              <span className="text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">
                                Applied
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mt-1">
                            {opportunity.company}
                          </p>
                        </div>
                      </div>

                      {/* Bookmark */}

                      <button
                        onClick={() =>
                          toggleBookmark(opportunity.id)
                        }
                        className="text-gray-400 hover:text-blue-600"
                        title="Bookmark"
                      >
                        {bookmarked.includes(opportunity.id) ? (
                          <BookmarkCheck
                            size={20}
                            className="text-blue-600"
                          />
                        ) : (
                          <Bookmark size={20} />
                        )}
                      </button>
                    </div>

                    {/* Details */}

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {opportunity.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {opportunity.duration}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <IndianRupee size={14} />
                        ₹{opportunity.stipend} / month
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        Posted {opportunity.postedOn}
                      </span>
                    </div>

                    {/* Skills */}

                    <div className="flex flex-wrap gap-2 mt-4">
                      {opportunity.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        {opportunity.category}
                      </span>

                      <div className="flex gap-2">
                        {/* View Details */}

                        <button
                          onClick={() =>
                            setSelectedOJT(opportunity)
                          }
                          className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-50"
                        >
                          <Eye size={14} />
                          View Details
                        </button>

                        {/* Apply */}

                        <button
                          onClick={() =>
                            handleApply(opportunity)
                          }
                          disabled={applied.includes(
                            opportunity.id
                          )}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium ${
                            applied.includes(opportunity.id)
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {applied.includes(opportunity.id) ? (
                            <>
                              <CheckCircle size={14} />
                              Applied
                            </>
                          ) : (
                            "Apply Now"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Pagination */}

              <div className="flex justify-center items-center gap-2 pt-4">
                <button className="px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-400">
                  ‹
                </button>

                <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
                  1
                </button>

                <button className="px-3 py-2 border border-gray-200 rounded-md text-sm">
                  2
                </button>

                <button className="px-3 py-2 border border-gray-200 rounded-md text-sm">
                  3
                </button>

                <span className="px-2 text-gray-400">
                  ...
                </span>

                <button className="px-3 py-2 border border-gray-200 rounded-md text-sm">
                  6
                </button>

                <button className="px-3 py-2 border border-gray-200 rounded-md text-sm">
                  ›
                </button>
              </div>
            </div>

            {/* ================= FILTER PANEL ================= */}

            <div className="bg-white border border-gray-200 rounded-lg p-5 h-fit">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-semibold text-gray-800">
                  Filters
                </h2>

                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  ↻ Reset All
                </button>
              </div>

              {/* Keyword */}

              <label className="text-sm font-medium text-gray-700">
                Keyword
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by role, skills..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4 outline-none focus:border-blue-400"
              />

              {/* Category */}

              <label className="text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >
                <option>All Categories</option>
                <option>Development</option>
                <option>Data Analytics</option>
                <option>Design</option>
              </select>

              {/* Location */}

              <label className="text-sm font-medium text-gray-700">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >
                <option>All Locations</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>

              {/* Duration */}

              <label className="text-sm font-medium text-gray-700">
                Duration
              </label>

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >
                <option>All Durations</option>
                <option>3 Months</option>
                <option>4 Months</option>
                <option>6 Months</option>
              </select>

              {/* Stipend */}

              <label className="text-sm font-medium text-gray-700">
                Stipend Range
              </label>

              <input
                type="range"
                min="0"
                max="30000"
                className="w-full mt-3"
              />

              <div className="flex justify-between text-xs text-gray-500 mb-5">
                <span>₹0</span>
                <span>₹30,000+</span>
              </div>

              {/* Skills */}

              <label className="text-sm font-medium text-gray-700">
                Skills
              </label>

              <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4">
                <option>Select Skills</option>
                <option>HTML</option>
                <option>CSS</option>
                <option>React.js</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
              </select>

              {/* Posted Date */}

              <label className="text-sm font-medium text-gray-700">
                Posted Date
              </label>

              <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4">
                <option>Any Time</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>

              {/* Apply Filter */}

              <button
                onClick={() =>
                  alert("Filters applied successfully! 🔍")
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* ================= BOTTOM INFORMATION CARDS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-gray-800">
                Find the Best Opportunities
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Discover top OJT opportunities from leading
                companies.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-gray-800">
                Secure & Trusted
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                All companies are verified for safety and trust.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-gray-800">
                Easy Application
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Apply in a few simple steps and track your
                application.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-gray-800">
                Grow Your Career
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Gain real-world experience and enhance your
                skills.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          OJT DETAILS MODAL
      ===================================================== */}

      {selectedOJT && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}

            <div className="flex items-start justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedOJT.logo}
                    alt={selectedOJT.company}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedOJT.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {selectedOJT.company}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOJT(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="p-5">
              {/* Basic Details */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <MapPin
                    size={16}
                    className="text-blue-600 mb-2"
                  />

                  <p className="text-[10px] text-gray-400">
                    Location
                  </p>

                  <p className="text-xs font-medium text-gray-700 mt-1">
                    {selectedOJT.location}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <Clock
                    size={16}
                    className="text-blue-600 mb-2"
                  />

                  <p className="text-[10px] text-gray-400">
                    Duration
                  </p>

                  <p className="text-xs font-medium text-gray-700 mt-1">
                    {selectedOJT.duration}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <IndianRupee
                    size={16}
                    className="text-blue-600 mb-2"
                  />

                  <p className="text-[10px] text-gray-400">
                    Stipend
                  </p>

                  <p className="text-xs font-medium text-gray-700 mt-1">
                    ₹{selectedOJT.stipend}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <Calendar
                    size={16}
                    className="text-blue-600 mb-2"
                  />

                  <p className="text-[10px] text-gray-400">
                    Posted
                  </p>

                  <p className="text-xs font-medium text-gray-700 mt-1">
                    {selectedOJT.postedOn}
                  </p>
                </div>
              </div>

              {/* Description */}

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  About the Opportunity
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {selectedOJT.description}
                </p>
              </div>

              {/* Skills */}

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Required Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {selectedOJT.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Requirements
                </h3>

                <ul className="space-y-2">
                  {selectedOJT.requirements.map(
                    (requirement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-500"
                      >
                        <CheckCircle
                          size={15}
                          className="text-green-500 mt-0.5 shrink-0"
                        />

                        {requirement}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setSelectedOJT(null)}
                className="px-5 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                onClick={() => handleApply(selectedOJT)}
                disabled={applied.includes(selectedOJT.id)}
                className={`px-5 py-2.5 rounded-md text-sm font-medium ${
                  applied.includes(selectedOJT.id)
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {applied.includes(selectedOJT.id)
                  ? "Already Applied ✓"
                  : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}