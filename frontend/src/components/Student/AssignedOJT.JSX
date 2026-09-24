import {
  Building2,
  User,
  Clock,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

export default function AssignedOJT() {
  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <div>
        <p className="text-xs text-gray-400">
          Dashboard &nbsp;›&nbsp; Assigned OJT
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-800">
          Assigned OJT
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your assigned internship details and track your progress.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <InfoCard
          icon={Building2}
          title="Company"
          value="Infosys Limited"
          subtitle="Bengaluru, Karnataka"
          color="blue"
        />

        <InfoCard
          icon={User}
          title="Mentor"
          value="Mr. Ramesh Kumar"
          subtitle="Senior Developer"
          color="purple"
        />

        <InfoCard
          icon={Clock}
          title="Hours Completed"
          value="85 / 120 Hours"
          subtitle="70.8% Completed"
          color="green"
        />

        <InfoCard
          icon={BarChart3}
          title="Attendance"
          value="92%"
          subtitle="Excellent"
          color="orange"
        />

      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Company Information */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">

          <h2 className="mb-4 font-semibold text-gray-800">
            Company Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Detail label="Company" value="Infosys Limited" />
            <Detail label="Department" value="Information Technology" />
            <Detail label="Location" value="Bengaluru, Karnataka" />
            <Detail label="Email" value="infosys@example.com" />
            <Detail label="Phone" value="+91 98765 43210" />
            <Detail label="Joining Date" value="15 May 2025" />
            <Detail label="Ending Date" value="15 Aug 2025" />
            <Detail label="Stipend" value="₹15,000 / Month" />

          </div>

        </div>

        {/* OJT Progress */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <h2 className="mb-5 font-semibold text-gray-800">
            OJT Progress
          </h2>

          <div className="flex items-center justify-center">

            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[12px] border-indigo-100">

              <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-[#1a2a80] border-r-[#1a2a80] rotate-[-30deg]" />

              <div className="text-center">
                <p className="text-xl font-bold text-gray-800">
                  85 / 120
                </p>

                <p className="text-xs text-gray-400">
                  Hours
                </p>
              </div>

            </div>

          </div>

          <div className="mt-6">

            <div className="mb-2 flex justify-between text-xs">
              <span className="text-gray-500">
                Overall Progress
              </span>

              <span className="font-semibold text-[#1a2a80]">
                70.8%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#1a2a80]"
                style={{ width: "70.8%" }}
              />
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Tasks */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="font-semibold text-gray-800">
              Weekly Task Assignment
            </h2>

            <button className="text-xs font-medium text-[#1a2a80]">
              View All
            </button>

          </div>

          <div className="space-y-3">

            <Task
              title="Complete frontend development task"
              due="30 May 2025"
              completed
            />

            <Task
              title="API integration"
              due="08 Jun 2025"
            />

            <Task
              title="Testing & bug fixing"
              due="10 Jun 2025"
            />

            <Task
              title="Prepare final report"
              due="10 Jun 2025"
            />

          </div>

        </div>

        {/* Schedule */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="font-semibold text-gray-800">
              Weekly Schedule
            </h2>

            <CalendarDays className="h-5 w-5 text-[#1a2a80]" />

          </div>

          <div className="space-y-3">

            <Schedule day="Monday" time="09:30 AM - 06:00 PM" />
            <Schedule day="Tuesday" time="09:30 AM - 06:00 PM" />
            <Schedule day="Wednesday" time="09:30 AM - 06:00 PM" />
            <Schedule day="Thursday" time="09:30 AM - 06:00 PM" />
            <Schedule day="Friday" time="09:30 AM - 06:00 PM" />

            <div className="flex justify-between border-t pt-3 text-xs">
              <span className="font-medium text-gray-600">
                Saturday & Sunday
              </span>

              <span className="text-gray-400">
                Weekly Off
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${colors[color]}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">

        <p className="text-xs text-gray-400">
          {title}
        </p>

        <p className="truncate text-sm font-semibold text-gray-800">
          {value}
        </p>

        <p className="text-[11px] text-gray-400">
          {subtitle}
        </p>

      </div>

    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-700">
        {value}
      </p>
    </div>
  );
}

function Task({ title, due, completed = false }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">

      {completed ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
      ) : (
        <CircleAlert className="h-5 w-5 shrink-0 text-orange-400" />
      )}

      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Due: {due}
        </p>
      </div>

    </div>
  );
}

function Schedule({ day, time }) {
  return (
    <div className="flex justify-between border-b border-gray-50 pb-2 text-xs">

      <span className="font-medium text-gray-600">
        {day}
      </span>

      <span className="text-gray-400">
        {time}
      </span>

    </div>
  );
}
