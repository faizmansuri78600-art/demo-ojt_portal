// import { Link, NavLink } from "react-router-dom";
// import { UserRound, ChevronDown } from "lucide-react";
// import logo from "../assets/aisc-logo.png";

// function Navbar() {
//   return (
//     <nav className="bg-[#06245f] text-white">
//       <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-6 lg:px-10">

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src={logo}
//             alt="AISC OJT Portal"
//             className="h-12 w-12 object-contain"
//           />

//           <div>
//             <h1 className="text-lg font-bold leading-tight">
//               AISC OJT Portal
//             </h1>

//             <p className="text-[10px] text-blue-100">
//               On-the-Job Training Management System
//             </p>
//           </div>
//         </Link>

//         {/* Navigation */}
//         <div className="hidden items-center gap-8 md:flex">

//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `relative py-6 text-sm font-medium transition ${
//                 isActive
//                   ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
//                   : "text-blue-100 hover:text-white"
//               }`
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               `relative py-6 text-sm font-medium transition ${
//                 isActive
//                   ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
//                   : "text-blue-100 hover:text-white"
//               }`
//             }
//           >
//             About OJT
//           </NavLink>

//           <NavLink
//             to="/opportunities"
//             className="py-6 text-sm font-medium text-blue-100 hover:text-white"
//           >
//             Opportunities
//           </NavLink>

//           <div className="flex cursor-pointer items-center gap-1 py-6 text-sm font-medium text-blue-100 hover:text-white">
//             User Portal
//             <ChevronDown size={15} />
//           </div>

//           <NavLink
//             to="/announcements"
//             className="py-6 text-sm font-medium text-blue-100 hover:text-white"
//           >
//             Announcements
//           </NavLink>

//           <NavLink
//             to="/contact"
//             className={({ isActive }) =>
//               `relative py-6 text-sm font-medium transition ${
//                 isActive
//                   ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
//                   : "text-blue-100 hover:text-white"
//               }`
//             }
//           >
//             Contact Us
//           </NavLink>

//           <Link
//             to="/login"
//             className="flex items-center gap-2 rounded-md bg-[#1260dc] px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
//           >
//             <UserRound size={16} />
//             Login
//           </Link>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import { Link, NavLink } from "react-router-dom";
// import { UserRound, UserPlus, ChevronDown } from "lucide-react";
// import logo from "../assets/aisc-logo.png";

// function Navbar() {
//   return (
//     <nav className="bg-[#06245f] text-white">
//       <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-6 lg:px-10">

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src={logo}
//             alt="AISC OJT Portal"
//             className="h-12 w-12 object-contain"
//           />

//           <div>
//             <h1 className="text-lg font-bold leading-tight">
//               AISC OJT Portal
//             </h1>

//             <p className="text-[10px] text-blue-100">
//               On-the-Job Training Management System
//             </p>
//           </div>
//         </Link>

//         {/* Navigation */}
//         <div className="hidden items-center gap-8 md:flex">

//           {/* Home */}
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `relative py-6 text-sm font-medium transition ${
//                 isActive
//                   ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
//                   : "text-blue-100 hover:text-white"
//               }`
//             }
//           >
//             Home
//           </NavLink>

//           {/* About OJT */}
//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               `relative py-6 text-sm font-medium transition ${
//                 isActive
//                   ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
//                   : "text-blue-100 hover:text-white"
//               }`
//             }
//           >
//             About OJT
//           </NavLink>

//           {/* User Portal */}
//           <div className="flex cursor-pointer items-center gap-1 py-6 text-sm font-medium text-blue-100 hover:text-white">
//             User Portal
//             <ChevronDown size={15} />
//           </div>

//           {/* Contact Us */}
//           <NavLink
//             to="/contact"
//             className={({ isActive }) =>
//               `relative py-6 text-sm font-medium transition ${
//                 isActive
//                   ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
//                   : "text-blue-100 hover:text-white"
//               }`
//             }
//           >
//             Contact Us
//           </NavLink>

//           {/* Sign In */}
//           <Link
//             to="/login"
//             className="flex items-center gap-2 rounded-md bg-[#1260dc] px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
//           >
//             <UserRound size={16} />
//             Sign In
//           </Link>

//           {/* Sign Up */}
//           <Link
//             to="/register"
//             className="flex items-center gap-2 rounded-md bg-[#1260dc] px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
//           >
//             <UserPlus size={16} />
//             Sign Up
//           </Link>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  UserRound,
  ChevronDown,
  GraduationCap,
  School,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import logo from "../../assets/aisc-logo.png";

function Navbar() {
  const [portalOpen, setPortalOpen] = useState(false);

  const portalOptions = [
    {
      name: "Student",
      path: "/login?role=student",
      icon: GraduationCap,
      color: "text-blue-600",
    },
    {
      name: "Faculty",
      path: "/login?role=faculty",
      icon: School,
      color: "text-orange-500",
    },
    {
      name: "College Coordinator",
      path: "/login?role=college-coordinator",
      icon: Building2,
      color: "text-green-600",
    },
    {
      name: "Company Coordinator",
      path: "/login?role=company-coordinator",
      icon: BriefcaseBusiness,
      color: "text-purple-600",
    },
  ];

  return (
    <nav className="bg-[#06245f] text-white">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <img
            src={logo}
            alt="AISC OJT Portal"
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="text-lg font-bold leading-tight">
              AISC OJT Portal
            </h1>

            <p className="text-[10px] text-blue-100">
              On-the-Job Training Management System
            </p>
          </div>

        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-6 text-sm font-medium transition ${
                isActive
                  ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
                  : "text-blue-100 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-6 text-sm font-medium transition ${
                isActive
                  ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
                  : "text-blue-100 hover:text-white"
              }`
            }
          >
            About OJT
          </NavLink>

          {/* =====================================================
              USER PORTAL DROPDOWN
          ===================================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() => setPortalOpen(!portalOpen)}
              className="flex items-center gap-1 py-6 text-sm font-medium text-blue-100 transition hover:text-white"
            >
              User Portal

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  portalOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {portalOpen && (
              <div className="absolute right-0 top-[62px] z-50 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white py-2 shadow-xl">

                <div className="border-b border-gray-100 px-4 py-2">

                  <p className="text-xs font-semibold text-gray-800">
                    Select Your Portal
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Choose your account type to sign in
                  </p>

                </div>

                {portalOptions.map((portal) => {

                  const Icon = portal.icon;

                  return (
                    <Link
                      key={portal.name}
                      to={portal.path}
                      onClick={() => setPortalOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">

                        <Icon
                          size={18}
                          className={portal.color}
                        />

                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          {portal.name}
                        </p>

                        <p className="text-[9px] text-gray-500">
                          Sign in to portal
                        </p>
                      </div>

                    </Link>
                  );
                })}

              </div>
            )}

          </div>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative py-6 text-sm font-medium transition ${
                isActive
                  ? "text-white after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-white"
                  : "text-blue-100 hover:text-white"
              }`
            }
          >
            Contact Us
          </NavLink>

          {/* Sign In */}
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-md bg-[#1260dc] px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            <UserRound size={16} />
            Sign In
          </Link>

          {/* Sign Up */}
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-md bg-[#1260dc] px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;