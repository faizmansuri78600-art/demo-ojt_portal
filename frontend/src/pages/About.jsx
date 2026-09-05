import React from "react";
import { Link } from "react-router-dom";

const Icon = ({ children, className = "w-7 h-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const TargetIcon = () => (
  <Icon className="w-9 h-9">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
    <path d="M16 8l4-4" />
    <path d="M17 4h3v3" />
  </Icon>
);

const EyeIcon = () => (
  <Icon className="w-9 h-9">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const UsersIcon = () => (
  <Icon className="w-9 h-9">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const ShieldIcon = () => (
  <Icon className="w-9 h-9">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const CheckIcon = () => (
  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="h-3 w-3"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  </div>
);

const GraduationIcon = () => (
  <Icon className="h-12 w-12">
    <path d="M2 10 12 5l10 5-10 5L2 10Z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5" />
    <path d="M22 10v6" />
  </Icon>
);

const About = () => {
  const featuresLeft = [
    "Centralized & Secure Platform",
    "Role-based Access Control",
    "Real-time Notifications",
    "Digital Documents & Reports",
  ];

  const featuresRight = [
    "End-to-End OJT Management",
    "Transparency & Accountability",
    "Easy Communication",
    "Data-driven Insights",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10">

          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm text-slate-700">
            <Link
              to="/"
              className="flex items-center gap-2 font-medium text-blue-700 hover:text-blue-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 3 3 10h2v9h5v-6h4v6h5v-9h2l-9-7Z" />
              </svg>
              Home
            </Link>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>

            <span>About Us</span>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.35fr]">

            {/* Left */}
            <div className="pb-6">

              <div className="mb-3 h-1 w-16 bg-blue-700"></div>

              <h1 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
                ABOUT US
              </h1>

              <div className="mt-8 max-w-xl space-y-5 text-base leading-7 text-slate-800 sm:text-lg">

                <p>
                  <span className="font-bold text-blue-700">
                    AISC OJT Portal
                  </span>{" "}
                  is a centralized digital platform designed to simplify and
                  automate the entire On-the-Job Training (OJT) process for
                  Abeda Inamdar Senior College.
                </p>

                <p>
                  Our portal connects students, companies, faculty mentors,
                  college coordinators and administrators on a single platform
                  to ensure transparency, efficiency and better outcomes.
                </p>

              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/src/assets/hero-image.png"
                alt="AISC OJT Portal Dashboard"
                className="w-full max-w-3xl object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= MISSION VISION VALUES ================= */}
      <section className="px-5 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1400px]">

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <h2 className="pt-5 text-center text-2xl font-bold text-blue-950 sm:text-3xl">
              OUR MISSION, VISION & VALUES
            </h2>

            <div className="mx-auto mt-2 h-1 w-16 bg-blue-700"></div>

            <div className="grid divide-y divide-slate-200 p-5 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">

              {/* Mission */}
              <div className="flex gap-5 p-5 lg:px-7">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <TargetIcon />
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-bold text-blue-700">
                    OUR MISSION
                  </h3>

                  <p className="text-sm leading-6 text-slate-700">
                    To provide a digital platform that enhances the
                    efficiency, transparency and quality of the OJT process.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex gap-5 p-5 lg:px-7">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-700">
                  <EyeIcon />
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-bold text-purple-700">
                    OUR VISION
                  </h3>

                  <p className="text-sm leading-6 text-slate-700">
                    To become a leading digital solution that empowers
                    students, companies and educators for a better future.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="flex gap-5 p-5 lg:px-7">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                  <UsersIcon />
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-bold text-green-700">
                    OUR VALUES
                  </h3>

                  <p className="text-sm leading-6 text-slate-700">
                    We value transparency, integrity, commitment, innovation
                    and continuous improvement in everything we do.
                  </p>
                </div>
              </div>

              {/* Commitment */}
              <div className="flex gap-5 p-5 lg:px-7">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <ShieldIcon />
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-bold text-orange-600">
                    OUR COMMITMENT
                  </h3>

                  <p className="text-sm leading-6 text-slate-700">
                    We are committed to providing a secure, reliable and
                    user-friendly experience for all our users and
                    stakeholders.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= ABOUT PORTAL ================= */}
      <section className="px-5 pb-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-7 rounded-xl border border-blue-100 bg-blue-50 p-6 shadow-sm lg:grid-cols-2 lg:p-7">

            {/* Description */}
            <div className="lg:border-r lg:border-blue-200 lg:pr-8">

              <h2 className="mb-4 text-2xl font-bold text-blue-950">
                ABOUT THE PORTAL
              </h2>

              <p className="text-sm leading-7 text-slate-800 sm:text-base">
                The AISC OJT Portal helps students discover and apply for OJT
                opportunities, allows companies to post opportunities and
                manage applications, enables faculty mentors to monitor and
                evaluate students, helps coordinators to track and manage the
                complete OJT workflow, and supports administrators in managing
                users, system settings and generating reports.
              </p>

            </div>

            {/* Features */}
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">

              <div className="space-y-4">
                {featuresLeft.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm font-medium text-slate-800"
                  >
                    <CheckIcon />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {featuresRight.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm font-medium text-slate-800"
                  >
                    <CheckIcon />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1400px]">

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-7 py-6 text-white shadow-md sm:px-10">

            <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10">
                <GraduationIcon />
              </div>

              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  AISC OJT Portal – Connecting Talent, Opportunities & Growth.
                </h2>

                <p className="mt-1 text-sm text-blue-100 sm:text-base">
                  Empowering students today for a successful tomorrow.
                </p>
              </div>

            </div>

            <div className="pointer-events-none absolute -right-4 -bottom-12 opacity-10">
              <UsersIcon />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;