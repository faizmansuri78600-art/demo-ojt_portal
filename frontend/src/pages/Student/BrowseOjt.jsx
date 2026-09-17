import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/common/SHeader";
import Sidebar from "../../components/common/SSidebar";

import {
  Search,
  MapPin,
  Clock,
  IndianRupee,
  Eye,
  CheckCircle,
  X,
  Calendar,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api";

// Your login flow stores the token and user separately:
//   localStorage: { token: "<jwt>", user: '{"id":"U...","email":"...","role":"Student"}' }
const getToken = () => localStorage.getItem("token");
const getStoredUser = () => JSON.parse(localStorage.getItem("user") || "null");
const getAuth = () => {
  const token = getToken();
  if (!token) return null;
  return { token, user: getStoredUser() };
};

// Decodes a JWT's payload without verifying the signature — just to pull
// an id out when the login response doesn't store a full student object
// under "ojtUser". Returns null if the token is missing/malformed.
const decodeToken = (token) => {
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    const json = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
};

// Your Student documents look like:
// { _id: "S2345", userId: "U2345", rollNumber, name, department, cgpa, ... }
// Application references Student via studentId (e.g. "S2345") — so this is
// the exact value we need. The auth token most likely encodes the User's id
// ("U2345"), NOT the Student's id, so a JWT decode alone usually can't give
// us studentId. This tries, in order:
//   1. A student object already stored under "ojtUser" (auth.student / auth.user)
//   2. The stored object itself, if it already looks like a Student record
//   3. Fetching the student's own profile from the backend using the token
// ASSUMPTION: step 3 calls GET /students/me. Change STUDENT_ME_ENDPOINT
// below if your backend exposes this under a different path.
const STUDENT_ME_ENDPOINT = `${API_BASE}/students/me`;

const fetchLoggedInStudent = async () => {
  const auth = getAuth();
  if (!auth) return null;

  if (auth.student?._id) return auth.student;
  if (auth.user?._id) return auth.user;
  if (auth._id) return auth;

  try {
    const res = await axios.get(STUDENT_ME_ENDPOINT, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    return res.data.student || res.data;
  } catch (error) {
    console.error("Failed to load student profile:", error);
  }

  // Last resort: decode the token in case it does carry a usable id.
  const payload = decodeToken(auth.token);
  const idFromToken =
    payload?.studentId || payload?._id || payload?.id || payload?.sub;

  return idFromToken ? { _id: idFromToken } : null;
};

// Normalizes a "skills" value into a clean array no matter what shape the
// backend sends it as: a real array, a comma-separated string, or nothing.
// Your Opportunity documents store this as skillsRequired, a comma-separated
// string (e.g. "Manual Testing, Selenium, SQL, HTML").
const toSkillsArray = (skills) => {
  if (Array.isArray(skills)) return skills.filter(Boolean);

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
};

// Normalizes the company display name. Your Opportunity documents store a
// direct "companyId" reference (e.g. "C001") to the Company collection.
// For the name to show up here, the backend's GET /opportunities/open route
// needs to .populate("companyId") so companyId arrives as a full object
// ({ _id, companyName, ... }) instead of a bare string. This also covers a
// few other shapes in case your backend sends the name differently.
const getCompanyName = (o) => {
  if (
    o.companyId &&
    typeof o.companyId === "object" &&
    o.companyId.companyName
  ) {
    return o.companyId.companyName;
  }

  if (typeof o.company === "string" && o.company.trim()) return o.company;

  if (o.company && typeof o.company === "object" && o.company.companyName) {
    return o.company.companyName;
  }

  if (o.companyName) return o.companyName;

  const nestedName = o.companyCoordinator?.company?.companyName;
  if (nestedName) return nestedName;

  return "Company name unavailable";
};

// ===============================
// MAIN PAGE
// ===============================

export default function BrowseOjt() {
  const [opportunities, setOpportunities] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOJT, setSelectedOJT] = useState(null);
  const [student, setStudent] = useState(null);

  // id of the opportunity currently being applied to (for button loading state)
  const [applyingId, setApplyingId] = useState(null);

  // Search and filter states
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All Companies");
  const [location, setLocation] = useState("All Locations");
  const [duration, setDuration] = useState("All Durations");
  const [sort, setSort] = useState("Newest");

  // ===============================
  // FETCH STUDENT PROFILE + OPEN OPPORTUNITIES + MY APPLICATIONS
  // ===============================

  const loadStudent = async () => {
    const s = await fetchLoggedInStudent();
    setStudent(s);
  };

  const fetchOpportunities = async () => {
    try {
      const res = await axios.get(`${API_BASE}/opportunities/open`);

      const normalized = (res.data.opportunities || []).map((o) => ({
        ...o,
        skills: toSkillsArray(
          o.skills || o.requiredSkills || o.skillsRequired
        ),
        company: getCompanyName(o),
      }));

      setOpportunities(normalized);
    } catch (error) {
      console.error("Failed to load opportunities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const res = await axios.get(`${API_BASE}/applications/mine`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      setMyApplications(
        (res.data.applications || []).map((a) => a.opportunityId)
      );
    } catch (error) {
      // if this fails (e.g. not logged in as a student)
      // we just show everything as "not applied"
      console.error("Failed to load your applications:", error);
    }
  };

  useEffect(() => {
    loadStudent();
    fetchOpportunities();
    fetchMyApplications();
  }, []);

  // ===============================
  // APPLY DIRECTLY (no confirmation form)
  // ===============================

  const handleApply = async (opportunity) => {
    const opportunityId = opportunity._id || opportunity.id;

    if (myApplications.includes(opportunityId)) {
      alert("You have already applied for this OJT. ✅");
      return;
    }

    if (!student?._id) {
      alert("Could not find your student profile. Please log in again.");
      return;
    }

    setApplyingId(opportunityId);

    try {
      await axios.post(
        `${API_BASE}/applications/apply`,
        {
          studentId: student._id,
          opportunityId,
          status: "Pending",
          appliedOn: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setMyApplications((prev) => [...prev, opportunityId]);

      alert(
        `Application submitted successfully! 🎉\n\nRole: ${opportunity.title}\nCompany: ${opportunity.company}`
      );

      setSelectedOJT(null);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to submit application";

      alert(message);
      console.error("Apply failed:", error);
    } finally {
      setApplyingId(null);
    }
  };

  // ===============================
  // FILTER OJT
  // ===============================

  const companyOptions = [
    "All Companies",
    ...new Set(opportunities.map((o) => o.company).filter(Boolean)),
  ];

  const filteredOpportunities = opportunities
    .filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (item.title || "").toLowerCase().includes(searchText) ||
        (item.company || "").toLowerCase().includes(searchText) ||
        toSkillsArray(item.skills).some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesCompany =
        company === "All Companies" || item.company === company;

      const matchesLocation =
        location === "All Locations" ||
        (item.location || "")
          .toLowerCase()
          .includes(location.toLowerCase());

      const matchesDuration =
        duration === "All Durations" || item.duration === duration;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesLocation &&
        matchesDuration
      );
    })
    .sort((a, b) => {
      if (sort === "Oldest") {
        return new Date(a.postedOn) - new Date(b.postedOn);
      }

      return new Date(b.postedOn) - new Date(a.postedOn);
    });

  const resetFilters = () => {
    setSearch("");
    setCompany("All Companies");
    setLocation("All Locations");
    setDuration("All Durations");
    setSort("Newest");
  };

  if (loading) {
    return (
      <p className="p-6 text-gray-500">
        Loading opportunities...
      </p>
    );
  }

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
              Explore and apply for the best OJT opportunities that
              match your skills and interests.
            </p>
          </div>

          {/* ================= SEARCH BAR ================= */}

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5">
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[220px] border border-gray-200 rounded-md flex items-center px-3">
                <Search size={17} className="text-gray-400 mr-2" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by role, company, skills..."
                  className="w-full py-2 outline-none text-sm"
                />
              </div>

              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >
                {companyOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

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

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >
                <option>All Durations</option>
                <option>3 months</option>
                <option>4 months</option>
                <option>6 months</option>
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-600"
              >
                <option value="Newest">Sort By: Newest</option>
                <option value="Oldest">Oldest</option>
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

          {/* ================= PAGE GRID ================= */}

          <div className="grid grid-cols-1 gap-5">
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
                filteredOpportunities.map((opportunity) => {
                  const opportunityId = opportunity._id || opportunity.id;
                  const applied = myApplications.includes(opportunityId);
                  const isApplying = applyingId === opportunityId;

                  const rowKey = opportunityId || opportunity.title;

                  const skills = toSkillsArray(opportunity.skills);

                  return (
                    <div
                      key={rowKey}
                      className="bg-white border border-gray-200 rounded-lg p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-base font-semibold text-gray-800">
                              {opportunity.title}
                            </h2>

                            {applied && (
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
                          {opportunity.isPaid ? "Paid" : "Unpaid"}
                        </span>

                        {opportunity.postedOn && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            Posted {opportunity.postedOn}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {skills.map((skill, i) => (
                          <span
                            key={`${rowKey}-skill-${i}-${skill}`}
                            className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-end mt-5 pt-4 border-t border-gray-100 gap-2">
                        <button
                          onClick={() =>
                            setSelectedOJT(opportunity)
                          }
                          className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-50"
                        >
                          <Eye size={14} />
                          View Details
                        </button>

                        <button
                          onClick={() => handleApply(opportunity)}
                          disabled={applied || isApplying}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium ${
                            applied
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                          }`}
                        >
                          {applied ? (
                            <>
                              <CheckCircle size={14} />
                              Applied
                            </>
                          ) : isApplying ? (
                            "Submitting..."
                          ) : (
                            "Apply Now"
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
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
                onClick={() => setSelectedOJT(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
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
                    {selectedOJT.isPaid ? "Paid" : "Unpaid"}
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

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Required Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const detailSkills = toSkillsArray(
                      selectedOJT.skills
                    );

                    if (detailSkills.length === 0) {
                      return (
                        <p className="text-xs text-gray-400">
                          No skills listed for this opportunity.
                        </p>
                      );
                    }

                    return detailSkills.map((skill, i) => (
                      <span
                        key={`${selectedOJT._id || selectedOJT.id}-detail-skill-${i}-${skill}`}
                        className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ));
                  })()}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setSelectedOJT(null)}
                className="px-5 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                onClick={() => handleApply(selectedOJT)}
                disabled={
                  myApplications.includes(selectedOJT._id || selectedOJT.id) ||
                  applyingId === (selectedOJT._id || selectedOJT.id)
                }
                className={`px-5 py-2.5 rounded-md text-sm font-medium ${
                  myApplications.includes(selectedOJT._id || selectedOJT.id)
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                }`}
              >
                {myApplications.includes(selectedOJT._id || selectedOJT.id)
                  ? "Already Applied ✓"
                  : applyingId === (selectedOJT._id || selectedOJT.id)
                  ? "Submitting..."
                  : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}