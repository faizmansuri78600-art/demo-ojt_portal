import { Briefcase, Users, UserCheck, Award } from 'lucide-react';

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";
import StatCard from "../../components/common/Statcard";
import ApplicationsChart from "../../components/charts/Applicationschart";
import DepartmentChart from "../../components/charts/DepartmentChart";
import RecentApplications from "../../components/common/Recentapplications";
import QuickAction from "../../components/common/Quickaction";
import NotificationCard from "../../components/common/NotificationCard";


const stats = [
  {
    icon: Briefcase,
    label: 'Total OJT Opportunities',
    value: 12,
    growth: '4 Active',
    bg: 'bg-blue-50',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    label: 'Applications Received',
    value: 48,
    growth: '+12 this month',
    bg: 'bg-green-50',
    color: 'text-green-600'
  },
  {
    icon: UserCheck,
    label: 'Students Selected',
    value: 16,
    growth: '+3 this month',
    bg: 'bg-purple-50',
    color: 'text-purple-600'
  },
  {
    icon: Award,
    label: 'Certificates Issued',
    value: 8,
    growth: '+2 this month',
    bg: 'bg-orange-50',
    color: 'text-orange-600'
  }
];


export default function CompanyDashboard() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">

      {/* SIDEBAR */}
      <CompanySidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 min-w-0 min-h-screen flex flex-col">

        {/* HEADER */}
        <CompanyHeader />

        {/* MAIN CONTENT */}
        <main className="flex-1 px-5 py-5">

          {/* WELCOME */}
          <div className="mb-5">
            <h2 className="text-xl text-slate-800">
              <span className="font-normal">Welcome back, </span>
              <span className="font-bold">ABC Technologies!</span>
              <span className="font-normal"> 👋</span>
            </h2>

            <p className="text-sm font-normal text-slate-500 mt-1">
              Here's what's happening with your OJT activities.
            </p>
          </div>


          {/* STAT CARDS */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                {...s}
              />
            ))}
          </div>


          {/* TOP + BOTTOM DASHBOARD AREA */}
         {/* TOP + BOTTOM DASHBOARD AREA */}
{/* TOP + BOTTOM DASHBOARD AREA */}
{/* TOP + BOTTOM DASHBOARD AREA */}
{/* TOP + BOTTOM DASHBOARD AREA */}
<div className="flex gap-4 items-stretch">

  <div className="flex-1 min-w-0 flex flex-col gap-4">

    {/* CHARTS ROW */}
    <div className="grid grid-cols-[7fr_3fr] gap-4 items-start">
      <ApplicationsChart />
      <DepartmentChart />
    </div>

    {/* TABLE + NOTIFICATIONS */}
    <div className="grid grid-cols-[5fr_3fr] gap-4">
      <RecentApplications />
      <NotificationCard />
    </div>

  </div>

  {/* QUICK ACTIONS */}
  <div className="w-[260px] shrink-0">
    <QuickAction />
  </div>

</div>
        </main>


        {/* FOOTER */}
        <CompanyFooter />

      </div>

    </div>
  );
}