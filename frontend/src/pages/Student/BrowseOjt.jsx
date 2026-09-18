import React, { useEffect, useState } from "react";

import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";

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
  Calendar,
} from "lucide-react";


export default function BrowseOjt() {

  const [opportunities, setOpportunities] = useState([]);

  const [bookmarked, setBookmarked] = useState([]);

  const [applied, setApplied] = useState([]);

  const [selectedOJT, setSelectedOJT] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // =====================================================
  // FILTER STATES
  // =====================================================

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [location, setLocation] =
    useState("All Locations");

  const [duration, setDuration] =
    useState("All Durations");

  const [sort, setSort] =
    useState("Newest");


  // =====================================================
  // GET REAL OPPORTUNITIES
  // =====================================================

  useEffect(() => {

    const fetchOpportunities = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/opportunities"
        );


        const data =
          await response.json();


        if (data.success) {

          const formatted =
            (data.opportunities || []).map(
              (item) => ({

                id: item._id,

                logo:
                  item.logoUrl || "",

                title:
                  item.title || "",

                company:
                  item.companyName ||
                  item.company?.companyName ||
                  "Company",

                location:
                  item.location || "",

                duration:
                  item.duration || "",

                stipend:
                  item.stipend || 0,

                postedOn:
                  item.postedOn || "",

                category:
                  item.department || "Other",

                skills:
                  item.skillsRequired
                    ? item.skillsRequired
                        .split(",")
                        .map(
                          (skill) =>
                            skill.trim()
                        )
                    : [],

                description:
                  item.description || "",

                requirements:
                  item.eligibility
                    ? [item.eligibility]
                    : [],

                isNew: false,

              })
            );


          setOpportunities(formatted);

        }

      } catch (error) {

        console.error(
          "Error fetching opportunities:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchOpportunities();

  }, []);


  // =====================================================
  // BOOKMARK
  // =====================================================

  const toggleBookmark = (id) => {

    setBookmarked((prev) =>
      prev.includes(id)

        ? prev.filter(
            (item) => item !== id
          )

        : [...prev, id]
    );

  };


  // =====================================================
  // APPLY OJT
  // =====================================================

  const handleApply = async (
    opportunity
  ) => {

    if (
      applied.includes(
        opportunity.id
      )
    ) {

      alert(
        "You have already applied for this OJT."
      );

      return;
    }


    try {

      const token =
        localStorage.getItem("token");


      if (!token) {

        alert(
          "Please login before applying."
        );

        return;
      }


      const response =
        await fetch(
          "http://localhost:5000/api/applications",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              opportunityId:
                opportunity.id,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Failed to submit application."
        );

        return;
      }


      // Update button
      setApplied((prev) => [
        ...prev,
        opportunity.id,
      ]);


      alert(
        `Application submitted successfully!\n\nRole: ${opportunity.title}\nCompany: ${opportunity.company}`
      );


      setSelectedOJT(null);

    } catch (error) {

      console.error(
        "Apply error:",
        error
      );

      alert(
        "Unable to submit application."
      );

    }

  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredOpportunities =
    opportunities

      .filter((item) => {

        const searchText =
          search.toLowerCase();


        const matchesSearch =
          item.title
            .toLowerCase()
            .includes(searchText)

          ||

          item.company
            .toLowerCase()
            .includes(searchText)

          ||

          item.location
            .toLowerCase()
            .includes(searchText)

          ||

          item.skills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(searchText)
          );


        const matchesCategory =
          category ===
            "All Categories" ||

          item.category ===
            category;


        const matchesLocation =
          location ===
            "All Locations" ||

          item.location
            .toLowerCase()
            .includes(
              location.toLowerCase()
            );


        const matchesDuration =
          duration ===
            "All Durations" ||

          item.duration ===
            duration;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesLocation &&
          matchesDuration
        );

      })

      .sort((a, b) => {

        if (sort === "Oldest") {
          return (
            new Date(a.postedOn) -
            new Date(b.postedOn)
          );
        }

        return (
          new Date(b.postedOn) -
          new Date(a.postedOn)
        );

      });


  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {

    setSearch("");

    setCategory(
      "All Categories"
    );

    setLocation(
      "All Locations"
    );

    setDuration(
      "All Durations"
    );

    setSort("Newest");

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-50">

        <Header />

        <div className="flex pt-16">

          <Sidebar activePage="Browse OJT Opportunities" />

          <main className="ml-64 flex-1 p-6">

            <p className="text-sm text-gray-500">
              Loading opportunities...
            </p>

          </main>

        </div>

      </div>

    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-gray-50">

      <Header />


      <div className="flex pt-16">

        <Sidebar
          activePage="Browse OJT Opportunities"
        />


        <main className="ml-64 flex-1 p-6">

          {/* HEADER */}

          <div className="text-sm text-gray-500 mb-3">

            Dashboard

            <span className="mx-2">
              ›
            </span>

            <span className="text-gray-700">
              Browse OJT Opportunities
            </span>

          </div>


          <div className="mb-6">

            <h1 className="text-2xl font-bold text-gray-800">
              Browse OJT Opportunities
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Explore and apply for the best OJT
              opportunities that match your
              skills and interests.
            </p>

          </div>


          {/* SEARCH */}

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5">

            <div className="flex flex-wrap gap-3">

              <div className="flex-1 min-w-[220px] border border-gray-200 rounded-md flex items-center px-3">

                <Search
                  size={17}
                  className="text-gray-400 mr-2"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search by role, company, skills..."
                  className="w-full py-2 outline-none text-sm"
                />

              </div>


              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >

                <option>
                  All Categories
                </option>

                <option>
                  Development
                </option>

                <option>
                  Data Science
                </option>

                <option>
                  Data Analytics
                </option>

                <option>
                  Design
                </option>

              </select>


              <select
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >

                <option>
                  All Locations
                </option>

                <option>
                  Pune
                </option>

                <option>
                  Mumbai
                </option>

                <option>
                  Bangalore
                </option>

                <option>
                  Hyderabad
                </option>

                <option>
                  Chennai
                </option>

              </select>


              <select
                value={duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value
                  )
                }
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >

                <option>
                  All Durations
                </option>

                <option>
                  3 Months
                </option>

                <option>
                  4 Months
                </option>

                <option>
                  6 Months
                </option>

              </select>


              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value
                  )
                }
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >

                <option value="Newest">
                  Sort By: Newest
                </option>

                <option value="Oldest">
                  Oldest
                </option>

              </select>

            </div>


            <div className="mt-4 text-sm text-gray-500">

              Total{" "}

              <span className="font-semibold text-gray-700">
                {filteredOpportunities.length}
              </span>{" "}

              Opportunities Found

            </div>

          </div>


          {/* GRID */}

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">

            {/* OPPORTUNITIES */}

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

                filteredOpportunities.map(
                  (opportunity) => (

                    <div
                      key={opportunity.id}
                      className="bg-white border border-gray-200 rounded-lg p-5"
                    >

                      {/* CARD HEADER */}

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex items-start gap-4">

                          <div className="w-14 h-14 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">

                            {opportunity.logo ? (

                              <img
                                src={opportunity.logo}
                                alt={opportunity.company}
                                className="w-full h-full object-contain"
                              />

                            ) : (

                              <div className="text-gray-400 text-xs">
                                Company
                              </div>

                            )}

                          </div>


                          <div>

                            <div className="flex items-center gap-2 flex-wrap">

                              <h2 className="text-base font-semibold text-gray-800">
                                {opportunity.title}
                              </h2>


                              {applied.includes(
                                opportunity.id
                              ) && (

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


                        <button
                          onClick={() =>
                            toggleBookmark(
                              opportunity.id
                            )
                          }
                          className="text-gray-400 hover:text-blue-600"
                        >

                          {bookmarked.includes(
                            opportunity.id
                          ) ? (

                            <BookmarkCheck
                              size={20}
                              className="text-blue-600"
                            />

                          ) : (

                            <Bookmark size={20} />

                          )}

                        </button>

                      </div>


                      {/* DETAILS */}

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

                          ₹{opportunity.stipend}
                          {" / month"}

                        </span>


                        <span className="flex items-center gap-1.5">

                          <Calendar size={14} />

                          Posted{" "}
                          {opportunity.postedOn}

                        </span>

                      </div>


                      {/* SKILLS */}

                      <div className="flex flex-wrap gap-2 mt-4">

                        {opportunity.skills.map(
                          (skill) => (

                            <span
                              key={skill}
                              className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                            >
                              {skill}
                            </span>

                          )
                        )}

                      </div>


                      {/* BUTTONS */}

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                        <span className="text-xs text-gray-400">
                          {opportunity.category}
                        </span>


                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              setSelectedOJT(
                                opportunity
                              )
                            }
                            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-50"
                          >

                            <Eye size={14} />

                            View Details

                          </button>


                          <button
                            onClick={() =>
                              handleApply(
                                opportunity
                              )
                            }
                            disabled={applied.includes(
                              opportunity.id
                            )}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium ${
                              applied.includes(
                                opportunity.id
                              )
                                ? "bg-green-100 text-green-700 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >

                            {applied.includes(
                              opportunity.id
                            ) ? (

                              <>
                                <CheckCircle
                                  size={14}
                                />

                                Applied
                              </>

                            ) : (

                              "Apply Now"

                            )}

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )

              )}

            </div>


            {/* FILTER PANEL */}

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


              <label className="text-sm font-medium text-gray-700">
                Keyword
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search by role, skills..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4 outline-none focus:border-blue-400"
              />


              <label className="text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >

                <option>
                  All Categories
                </option>

                <option>
                  Development
                </option>

                <option>
                  Data Science
                </option>

                <option>
                  Data Analytics
                </option>

                <option>
                  Design
                </option>

              </select>


              <label className="text-sm font-medium text-gray-700">
                Location
              </label>

              <select
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >

                <option>
                  All Locations
                </option>

                <option>
                  Pune
                </option>

                <option>
                  Mumbai
                </option>

                <option>
                  Bangalore
                </option>

                <option>
                  Hyderabad
                </option>

                <option>
                  Chennai
                </option>

              </select>


              <label className="text-sm font-medium text-gray-700">
                Duration
              </label>

              <select
                value={duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >

                <option>
                  All Durations
                </option>

                <option>
                  3 Months
                </option>

                <option>
                  4 Months
                </option>

                <option>
                  6 Months
                </option>

              </select>


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

                <span>
                  ₹0
                </span>

                <span>
                  ₹30,000+
                </span>

              </div>


              <label className="text-sm font-medium text-gray-700">
                Skills
              </label>

              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >

                <option>
                  Select Skills
                </option>

                <option>
                  HTML
                </option>

                <option>
                  CSS
                </option>

                <option>
                  React.js
                </option>

                <option>
                  JavaScript
                </option>

                <option>
                  Python
                </option>

                <option>
                  Java
                </option>

              </select>


              <label className="text-sm font-medium text-gray-700">
                Posted Date
              </label>

              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm mt-2 mb-4"
              >

                <option>
                  Any Time
                </option>

                <option>
                  Today
                </option>

                <option>
                  This Week
                </option>

                <option>
                  This Month
                </option>

              </select>


              <button
                onClick={() =>
                  alert(
                    "Filters applied successfully!"
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium"
              >
                Apply Filters
              </button>

            </div>

          </div>


          {/* =================================================
              DETAILS MODAL
          ================================================= */}

          {selectedOJT && (

            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

              <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">


                <div className="flex items-start justify-between p-5 border-b border-gray-100">

                  <div>

                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedOJT.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {selectedOJT.company}
                    </p>

                  </div>


                  <button
                    onClick={() =>
                      setSelectedOJT(null)
                    }
                    className="text-gray-400 hover:text-gray-700"
                  >

                    <X size={20} />

                  </button>

                </div>


                <div className="p-5">

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


                  <div className="mb-5">

                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      About the Opportunity
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed">
                      {selectedOJT.description}
                    </p>

                  </div>


                  <div className="mb-5">

                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Required Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {selectedOJT.skills.map(
                        (skill) => (

                          <span
                            key={skill}
                            className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full"
                          >
                            {skill}
                          </span>

                        )
                      )}

                    </div>

                  </div>


                  <div>

                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Requirements
                    </h3>

                    <ul className="space-y-2">

                      {selectedOJT.requirements.map(
                        (requirement, index) => (

                          <li
                            key={index}
                            className="text-sm text-gray-500"
                          >
                            • {requirement}
                          </li>

                        )
                      )}

                    </ul>

                  </div>

                </div>


                <div className="flex justify-end gap-3 p-5 border-t border-gray-100">

                  <button
                    onClick={() =>
                      setSelectedOJT(null)
                    }
                    className="px-5 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Close
                  </button>


                  <button
                    onClick={() =>
                      handleApply(
                        selectedOJT
                      )
                    }
                    disabled={applied.includes(
                      selectedOJT.id
                    )}
                    className={`px-5 py-2.5 rounded-md text-sm font-medium ${
                      applied.includes(
                        selectedOJT.id
                      )
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >

                    {applied.includes(
                      selectedOJT.id
                    )
                      ? "Already Applied ✓"
                      : "Apply Now"}

                  </button>

                </div>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>

  );
}