import React from "react";

const BellIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

/* College Building Icon */
const CollegeBuilding = () => (
  <svg
    width="82"
    height="52"
    viewBox="0 0 120 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    {/* Roof */}
    <path
      d="M10 28L60 5L110 28"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Main Building */}
    <path
      d="M22 27V55H98V27"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinejoin="round"
    />

    {/* Columns */}
    <path
      d="M34 30V55"
      stroke="currentColor"
      strokeWidth="5"
    />

    <path
      d="M48 30V55"
      stroke="currentColor"
      strokeWidth="5"
    />

    <path
      d="M72 30V55"
      stroke="currentColor"
      strokeWidth="5"
    />

    <path
      d="M86 30V55"
      stroke="currentColor"
      strokeWidth="5"
    />

    {/* Center Door */}
    <rect
      x="53"
      y="40"
      width="14"
      height="15"
      fill="currentColor"
    />

    {/* Bottom Line */}
    <path
      d="M16 58H104"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Small Top Flag */}
    <path
      d="M60 5V1"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const FacultyHeader = ({
  facultyName = "Prof. Ayesha Khan",
  notificationCount = 3,
}) => {
  return (
    <header className="w-full bg-[#0b1f4d] px-6 py-3 flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* College Logo */}
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center">
          <span className="text-lg">🎓</span>
        </div>

        {/* Portal Name */}
        <div>
          <h1 className="text-white font-bold text-lg leading-tight tracking-wide">
            AISC OJT PORTAL
          </h1>

          <p className="text-blue-300 text-xs font-semibold tracking-wide">
            FACULTY MENTOR
          </p>
        </div>

        {/* Vertical Line */}
        <div className="hidden md:block h-10 border-l border-blue-700 ml-3"></div>

        {/* Tagline */}
        <div className="hidden md:block max-w-xs">
          <p className="text-gray-300 text-xs leading-snug">
            A modern, clean and consistent design system for AISC OJT Portal
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* College Building */}
        <div className="flex items-center">
          <CollegeBuilding />
        </div>

        {/* Vertical Line after Building */}
        <div className="h-10 border-l border-blue-700"></div>

        {/* Notification */}
        <button
          className="relative"
          aria-label="Notifications"
        >
          <BellIcon />

          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Faculty Profile */}
        <div className="flex items-center gap-2">

          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0b1f4d] font-bold text-sm">
            FM
          </div>

          <div className="hidden sm:block leading-tight">
            <p className="text-white text-sm font-semibold">
              {facultyName}
            </p>

            <p className="text-gray-300 text-xs">
              Faculty Mentor
            </p>
          </div>

          <ChevronDownIcon />
        </div>

      </div>
    </header>
  );
};

export default FacultyHeader;