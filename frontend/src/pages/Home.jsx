import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  CircleUserRound,
  GraduationCap,
  Handshake,
  Megaphone,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import heroIllustration from "../assets/hero-image.png";

function StatCard({ icon, number, label, color }) {
  return (
    <div className="flex items-center gap-3 border-r border-gray-200 px-5 py-2 last:border-r-0">

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-2xl font-bold leading-none text-blue-900">
          {number}
        </p>

        <p className="mt-1 text-[10px] font-medium text-gray-600">
          {label}
        </p>
      </div>

    </div>
  );
}

function PortalCard({
  icon,
  title,
  description,
  button,
  color,
  bg,
}) {
  return (
    <div
      className={`rounded-xl border border-gray-100 ${bg} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-start gap-3">

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color} text-white`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-[15px] font-bold text-gray-800">
            {title}
          </h3>

          <p className="mt-3 text-[10px] leading-5 text-gray-600">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2.5 text-[10px] font-semibold text-white transition ${color} hover:opacity-90`}
      >
        {button}
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

function WhyItem({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3 px-5">

      <div className="shrink-0 text-blue-700">
        {icon}
      </div>

      <div>
        <h3 className="text-[10px] font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-1 text-[9px] leading-4 text-gray-500">
          {text}
        </p>
      </div>

    </div>
  );
}

function Home() {
  return (
    <div className="overflow-hidden">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#f5f9ff] via-white to-[#f4f8ff]">

        <div className="mx-auto grid min-h-[360px] max-w-[1400px] items-center gap-4 px-6 py-10 sm:px-10 lg:grid-cols-[43%_57%] lg:px-12 lg:py-7">

          {/* Hero Text */}
          <div className="relative z-10">

            <p className="text-[14px] font-bold tracking-wide text-blue-700">
              WELCOME TO
            </p>

            <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-[#071d49] sm:text-5xl">
              AISC OJT Portal
            </h1>

            <h2 className="mt-3 max-w-xl text-xl font-bold leading-tight text-[#101f3d] sm:text-2xl">
              Connecting Students, College and Companies
              <span className="block text-blue-700">
                Through One Smart OJT Platform
              </span>
            </h2>

            <p className="mt-5 max-w-[530px] text-[13px] leading-6 text-gray-600">
              AISC OJT Portal digitizes the complete On-the-Job Training
              process from student verification and application to selection,
              monitoring, evaluation and report generation.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                <Users size={16} />
                Explore Opportunities
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-md border border-blue-300 bg-white px-5 py-3 text-[12px] font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <BriefcaseBusiness size={16} />
                Learn More
              </button>

            </div>
          </div>

          {/* Hero Illustration */}
          <div className="flex h-full items-center justify-center lg:justify-end">

            <img
              src={heroIllustration}
              alt="AISC OJT Portal dashboard illustration"
              className="w-full max-w-[720px] object-contain"
            />

          </div>

        </div>
      </section>

      {/* =========================================================
          STATISTICS
      ========================================================= */}
      <section className="relative z-10 -mt-1 px-5 sm:px-8">

        <div className="mx-auto max-w-[1350px] rounded-xl border border-gray-100 bg-white px-3 py-5 shadow-[0_4px_18px_rgba(0,0,0,0.06)]">

          <div className="grid grid-cols-2 lg:grid-cols-5">

            <StatCard
              icon={<Users size={25} className="text-blue-700" />}
              number="750+"
              label="Registered Students"
              color="bg-blue-50"
            />

            <StatCard
              icon={<Building2 size={25} className="text-purple-700" />}
              number="85+"
              label="Partner Companies"
              color="bg-purple-50"
            />

            <StatCard
              icon={<BriefcaseBusiness size={25} className="text-green-600" />}
              number="210+"
              label="Active OJT Opportunities"
              color="bg-green-50"
            />

            <StatCard
              icon={<BarChart3 size={25} className="text-orange-500" />}
              number="340+"
              label="Reports Generated"
              color="bg-orange-50"
            />

            <StatCard
              icon={<ShieldCheck size={25} className="text-green-600" />}
              number="95%"
              label="Successful Placements"
              color="bg-green-50"
            />

          </div>

        </div>
      </section>

      {/* =========================================================
          PORTALS
      ========================================================= */}
      {/* =========================================================
    PORTALS
========================================================= */}
<section className="bg-white px-5 py-10 sm:px-8">

  <div className="mx-auto max-w-[1100px]">

    <div className="text-center">
      <h2 className="text-xl font-bold text-[#071d49] sm:text-2xl">
        Choose Your Portal
      </h2>

      <div className="mx-auto mt-3 h-[3px] w-9 rounded-full bg-blue-700" />
    </div>

    <div className="mt-5 grid gap-4 sm:grid-cols-3">

      {/* Student Portal */}
      <PortalCard
        icon={<GraduationCap size={25} />}
        title="Student Portal"
        description="Register, explore opportunities, apply for OJT and track your progress."
        button="Enter Student Portal"
        color="bg-blue-700"
        bg="bg-[#f6f9ff]"
      />

      {/* Company Portal */}
      <PortalCard
        icon={<Building2 size={25} />}
        title="Company Portal"
        description="Post OJT opportunities, review applications, select students and evaluate performance."
        button="Enter Company Portal"
        color="bg-purple-700"
        bg="bg-[#faf7ff]"
      />

      {/* College Coordinator Portal */}
      <PortalCard
        icon={<Building2 size={25} />}
        title="College Coordinator"
        description="Verify students, allocate faculty mentors, monitor OJT activities and generate reports."
        button="Enter Coordinator Portal"
        color="bg-green-600"
        bg="bg-[#f6fff9]"
      />

    </div>
  </div>
</section>

      {/* =========================================================
          WHY OJT
      ========================================================= */}
      <section className="bg-white px-5 pb-9 sm:px-8">

        <div className="mx-auto max-w-[1250px]">

          <div>
            <h2 className="text-xl font-bold text-[#071d49]">
              Why OJT?
            </h2>

            <div className="mt-2 h-[3px] w-9 rounded-full bg-blue-700" />
          </div>

          <div className="mt-5 grid grid-cols-1 divide-y divide-gray-100 border-t border-gray-100 pt-4 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">

            <WhyItem
              icon={<BookOpenIcon />}
              title="Gain real-world"
              text="industry experience"
            />

            <WhyItem
              icon={<BarChart3 size={27} />}
              title="Improve technical"
              text="and soft skills"
            />

            <WhyItem
              icon={<Users size={27} />}
              title="Build professional"
              text="network"
            />

            <WhyItem
              icon={<Target size={27} />}
              title="Increase"
              text="employability"
            />

            <WhyItem
              icon={<Handshake size={27} />}
              title="Bridge the gap"
              text="between learning and working"
            />

          </div>
        </div>
      </section>

      {/* =========================================================
          LOWER INFORMATION CARDS
      ========================================================= */}
      <section className="bg-gradient-to-br from-white to-blue-50/40 px-5 pb-8 sm:px-8">

        <div className="mx-auto grid max-w-[1250px] gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">

          {/* Announcements */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#071d49]">
                Latest Announcements
              </h2>

              <button
                type="button"
                className="text-[10px] font-semibold text-blue-700 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-4">

              <Announcement
                icon={<Megaphone size={16} />}
                bg="bg-green-50"
                color="text-green-600"
                text="New OJT opportunities from leading companies are now available!"
                date="12 May 2025"
              />

              <Announcement
                icon={<BriefcaseBusiness size={16} />}
                bg="bg-purple-50"
                color="text-purple-600"
                text="Last date to apply for OJT is 31 May 2025."
                date="10 May 2025"
              />

              <Announcement
                icon={<CircleUserRound size={16} />}
                bg="bg-orange-50"
                color="text-orange-500"
                text="Mandatory orientation for selected students on 18 May 2025."
                date="08 May 2025"
              />

            </div>
          </div>

          {/* About */}
          <div className="rounded-xl border border-gray-100 bg-[#f5f8ff] p-5 shadow-sm">

            <h2 className="text-sm font-bold text-[#071d49]">
              About AISC OJT Portal
            </h2>

            <p className="mt-4 text-[11px] leading-5 text-gray-600">
              AISC OJT Portal is a centralized platform to streamline the
              entire On-the-Job Training lifecycle for students, companies
              and college administrators with transparency, efficiency
              and accountability.
            </p>

            <button
              type="button"
              className="mt-4 flex items-center gap-2 rounded-md border border-blue-300 bg-white px-4 py-2.5 text-[10px] font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Learn More About OJT
              <ArrowRight size={13} />
            </button>

          </div>

          {/* Contact */}
          <div className="rounded-xl border border-gray-100 bg-[#f7faff] p-5 shadow-sm">

            <h2 className="text-sm font-bold text-[#071d49]">
              Contact Us
            </h2>

            <div className="mt-4 space-y-3">

              <ContactRow
                icon={<Building2 size={17} />}
                text={
                  <>
                    Abeda Inamdar Senior College
                    <br />
                    2390 KB Hidayatullah Road, Pune - 411001
                  </>
                }
              />

              <ContactRow
                icon={<span className="text-sm">@</span>}
                text="ojt@abedainamdarcollege.ac.in"
              />

              <ContactRow
                icon={<span className="text-sm">☎</span>}
                text="+91 20 2644 6312"
              />

              <ContactRow
                icon={<span className="text-sm">◉</span>}
                text="www.abedainamdarcollege.ac.in"
              />

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

function Announcement({
  icon,
  bg,
  color,
  text,
  date,
}) {
  return (
    <div className="flex items-start gap-3">

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${bg} ${color}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] leading-4 text-gray-700">
            {text}
          </p>

          <span className="shrink-0 text-[8px] text-gray-500">
            {date}
          </span>
        </div>

      </div>
    </div>
  );
}

function ContactRow({ icon, text }) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center text-blue-700">
        {icon}
      </div>

      <p className="text-[10px] leading-4 text-gray-600">
        {text}
      </p>

    </div>
  );
}

function BookOpenIcon() {
  return <span className="text-[25px]">📖</span>;
}

export default Home;