import React from "react";
import {
  MapPin,
  Calendar,
  Mail,
  Phone,
  Briefcase,
  User,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { Row, Badge } from "./shared/Badge";

export default function CompanyInformationCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Company Information</h3>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
          IN
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-slate-800 text-sm">Infosys Limited</p>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xs text-slate-500">Web Development Intern</p>
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        <Row icon={MapPin} label="Location" value="Bangalore, Karnataka" />
        <Row icon={Calendar} label="Joining Date" value="15 May 2025" />
        <Row icon={Calendar} label="Ending Date" value="15 Aug 2025" />
        <Row icon={Briefcase} label="Department" value="Information Technology" />
        <Row icon={User} label="Supervisor" value="Mr. Ramesh Kumar" />
        <Row icon={Briefcase} label="Work Mode" value={<Badge tone="emerald">Hybrid</Badge>} />
        <Row icon={Mail} label="Email" value="ramesh.kumar@infosys.com" />
        <Row icon={TrendingUp} label="Stipend" value="₹15,000 / Month" />
        <Row icon={Phone} label="Phone" value="+91 98765 43210" />
      </dl>
    </div>
  );
}