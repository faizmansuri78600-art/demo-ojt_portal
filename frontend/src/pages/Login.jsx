import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  LockKeyhole,
  Mail,
  Settings2,
  School,
  ShieldCheck,
  UserRound,
  Users,
  ArrowRight,
} from "lucide-react";

import logo from "../assets/aisc-logo.png";
import heroIllustration from "../assets/aisc-building.png";

const roles = [
  {
    name: "Student",
    icon: GraduationCap,
    color: "text-blue-700",
  },
  {
    name: "Company",
    icon: Building2,
    color: "text-purple-700",
  },
  {
    name: "Coordinator",
    icon: Building2,
    color: "text-green-600",
  },
  {
  name: "Faculty",
  icon: School,
  color: "text-orange-500",
},
];

const roleFeatures = [
  {
    title: "Students",
    description: "Explore & Apply for Opportunities",
    icon: GraduationCap,
    color: "bg-blue-700",
  },
  {
    title: "Companies",
    description: "Post Opportunities & Find Talent",
    icon: Building2,
    color: "bg-purple-700",
  },
  {
    title: "Coordinator",
    description: "Monitor & Manage OJT Activities",
    icon: Building2,
    color: "bg-green-600",
  },
  {
  title: "Faculty",
  description: "Manage Users & System Settings",
  icon: Settings2,
  color: "bg-orange-500",
},
];

function Login() {
  const [selectedRole, setSelectedRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="min-h-screen bg-[#f2f7ff] p-3 sm:p-5 lg:p-6">

      <div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1500px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_5px_30px_rgba(0,35,100,0.08)]">

        <div className="grid min-h-[calc(100vh-2rem)] lg:grid-cols-2">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#f1f7ff] via-[#f7fbff] to-[#eaf3ff] px-8 py-9 sm:px-12 lg:px-16">

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">

              <img
                src={logo}
                alt="AISC Logo"
                className="h-12 w-12 object-contain"
              />

              <div>
                <h2 className="text-xl font-bold text-[#071d49]">
                  AISC OJT Portal
                </h2>

                <p className="text-xs text-gray-600">
                  On-the-Job Training Management System
                </p>
              </div>

            </div>

            {/* Text */}
            <div className="relative z-10 mt-16 max-w-[560px]">

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
                Welcome Back! 👋
              </span>

              <h1 className="mt-7 text-4xl font-extrabold leading-tight text-[#07132e] sm:text-5xl">

                Login to Your

                <span className="block">
                  <span className="text-blue-700">AISC OJT</span> Account
                </span>

              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-gray-600">
                Access your personalized dashboard, manage opportunities,
                track progress and stay updated with the OJT activities.
              </p>

            </div>

            {/* Illustration */}
            <div className="relative z-10 mt-8 flex justify-center lg:absolute lg:bottom-[180px] lg:left-8 lg:right-8 lg:mt-0">

              <img
                src={heroIllustration}
                alt="AISC campus"
                className="max-h-[310px] w-full object-contain"
              />

            </div>

            {/* Feature Roles */}
            <div className="relative z-20 mt-6 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-lg backdrop-blur-md lg:absolute lg:bottom-10 lg:left-8 lg:right-8 lg:mt-0">

              <div className="grid grid-cols-2 sm:grid-cols-4">

                {roleFeatures.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className={`px-3 py-3 text-center ${
                        index !== roleFeatures.length - 1
                          ? "border-r border-gray-200"
                          : ""
                      }`}
                    >

                      <div
                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${item.color} text-white`}
                      >
                        <Icon size={23} />
                      </div>

                      <h3 className="mt-2 text-xs font-bold text-gray-800">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[9px] leading-4 text-gray-600">
                        {item.description}
                      </p>

                    </div>
                  );
                })}

              </div>
            </div>

          </div>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}
          <div className="flex items-center justify-center bg-white px-7 py-10 sm:px-12 lg:px-14">

            <div className="w-full max-w-[620px]">

              <div className="text-center">

                <h1 className="text-4xl font-extrabold text-[#07132e]">
                  Login
                </h1>

                <p className="mt-3 text-sm text-gray-600">
                  Enter your credentials to access your account
                </p>

              </div>

              {/* Role Tabs */}
              <div className="mt-10 grid grid-cols-4 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">

                {roles.map((role) => {
                  const Icon = role.icon;
                  const selected = selectedRole === role.name;

                  return (
                    <button
                      key={role.name}
                      type="button"
                      onClick={() => setSelectedRole(role.name)}
                      className={`relative flex flex-col items-center justify-center gap-2 rounded-lg py-4 text-xs font-semibold transition ${
                        selected
                          ? `${role.color} bg-blue-50`
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >

                      <Icon size={24} />

                      <span>{role.name}</span>

                      {selected && (
                        <span className="absolute bottom-0 left-1/2 h-[3px] w-full -translate-x-1/2 rounded-full bg-blue-700" />
                      )}

                    </button>
                  );
                })}

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Email */}
                <div>

                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={22}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email address"
                      className="h-[66px] w-full rounded-xl border border-gray-200 bg-white pl-14 pr-5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      required
                    />

                  </div>
                </div>

                {/* Password */}
                <div>

                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={22}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-[66px] w-full rounded-xl border border-gray-200 bg-white pl-14 pr-14 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={21} />
                      ) : (
                        <Eye size={21} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm text-gray-600">

                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
                    />

                    Remember me

                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* Login */}
                <button
                  type="submit"
                  className="flex h-[58px] w-full items-center justify-center gap-2 rounded-lg bg-blue-700 text-base font-semibold text-white shadow-sm transition hover:bg-blue-800"
                >
                  Login to Account
                  <ArrowRight size={19} />
                </button>

              </form>

              {/* OR */}
              <div className="my-5 flex items-center gap-4">

                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-500">
                  or
                </span>

                <div className="h-px flex-1 bg-gray-200" />

              </div>

              {/* Google */}
              <button
                type="button"
                className="flex h-[56px] w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                <span className="text-lg font-bold text-blue-600">
                  G
                </span>
                Continue with Google
              </button>

              {/* Register */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-700 hover:text-blue-800"
                >
                  Register Now
                </Link>
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;