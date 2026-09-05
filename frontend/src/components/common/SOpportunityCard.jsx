import React, { useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  Bookmark,
  X,
  CheckCircle,
} from "lucide-react";

export default function OpportunityCard({
  opportunity,
  isBookmarked,
  onToggleBookmark,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [applied, setApplied] = useState(false);

  const {
    id,
    logo,
    title,
    company,
    location,
    duration,
    stipend,
    postedOn,
    skills,
    isNew,
  } = opportunity;

  // Apply OJT
  const handleApply = () => {
    if (applied) {
      alert("You have already applied for this OJT opportunity.");
      return;
    }

    setApplied(true);

    alert(
      `Application submitted successfully!\n\nStudent: Ayesha Shaikh\nOJT: ${title}\nCompany: ${company}`
    );
  };

  return (
    <>
      {/* ================= OPPORTUNITY CARD ================= */}

      <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:shadow-sm transition-shadow">

        {/* Company Logo */}
        <div className="w-14 h-14 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 bg-gray-50">
          <img
            src={logo}
            alt={company}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Title */}
          <div className="flex items-center gap-2">

            <h3 className="text-sm font-semibold text-gray-800">
              {title}
            </h3>

            {isNew && (
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">
                New
              </span>
            )}

          </div>

          {/* Company */}
          <p className="text-sm text-gray-500 mt-0.5">
            {company}
          </p>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2">

            <span className="flex items-center gap-1">
              <MapPin size={13} />
              {location}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={13} />
              {duration}
            </span>

            <span className="flex items-center gap-1">
              <IndianRupee size={13} />
              {stipend}/Month
            </span>

          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-3">

            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex flex-col items-end justify-between h-full shrink-0 gap-3">

          {/* Bookmark */}
          <button
            aria-label={
              isBookmarked
                ? "Remove bookmark"
                : "Save opportunity"
            }
            onClick={() => onToggleBookmark(id)}
            className={
              isBookmarked
                ? "text-blue-600"
                : "text-gray-400 hover:text-blue-600"
            }
          >
            <Bookmark
              size={18}
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </button>

          {/* Posted Date */}
          <p className="text-xs text-gray-400 whitespace-nowrap">
            Posted on {postedOn}
          </p>

          {/* View Details */}
          <button
            onClick={() => setShowDetails(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md whitespace-nowrap"
          >
            View Details
          </button>

        </div>

      </div>


      {/* ===================================================== */}
      {/*                    DETAILS MODAL                      */}
      {/* ===================================================== */}

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-md border border-gray-100 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img
                    src={logo}
                    alt={company}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {company}
                  </p>
                </div>

              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={22} />
              </button>

            </div>


            {/* Modal Body */}
            <div className="p-5">

              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <MapPin size={14} />
                    Location
                  </div>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {location}
                  </p>
                </div>


                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock size={14} />
                    Duration
                  </div>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {duration}
                  </p>
                </div>


                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <IndianRupee size={14} />
                    Stipend
                  </div>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    ₹{stipend} / Month
                  </p>
                </div>

              </div>


              {/* About Opportunity */}
              <div className="mb-5">

                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  About This Opportunity
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  This OJT opportunity is suitable for students who
                  want to gain practical industry experience and
                  develop their technical and professional skills.
                  You will work with the team at {company} and gain
                  real-world experience related to {title}.
                </p>

              </div>


              {/* Skills Required */}
              <div className="mb-5">

                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Skills Required
                </h3>

                <div className="flex flex-wrap gap-2">

                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>


              {/* OJT Details */}
              <div className="mb-5">

                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  OJT Details
                </h3>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">
                      Company
                    </span>

                    <span className="font-medium text-gray-800">
                      {company}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">
                      Role
                    </span>

                    <span className="font-medium text-gray-800">
                      {title}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">
                      Location
                    </span>

                    <span className="font-medium text-gray-800">
                      {location}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">
                      Duration
                    </span>

                    <span className="font-medium text-gray-800">
                      {duration}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Stipend
                    </span>

                    <span className="font-medium text-gray-800">
                      ₹{stipend}/Month
                    </span>
                  </div>

                </div>

              </div>


              {/* Application Information */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">

                <h3 className="text-sm font-semibold text-blue-700 mb-1">
                  Application Information
                </h3>

                <p className="text-xs text-blue-600">
                  You are applying as <strong>Ayesha Shaikh</strong>.
                  Make sure your profile and resume are updated
                  before applying.
                </p>

              </div>


              {/* Buttons */}
              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>

                <button
                  onClick={handleApply}
                  disabled={applied}
                  className={`px-5 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                    applied
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >

                  {applied ? (
                    <>
                      <CheckCircle size={15} />
                      Applied
                    </>
                  ) : (
                    "Apply Now"
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </>
  );
}