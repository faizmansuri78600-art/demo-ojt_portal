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

import Row from "./Row";
import Badge from "./Badge";

export default function Companyinformationcard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-800">
        Company Information
      </h3>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">
          IN
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-slate-800">
              Infosys Limited
            </p>
            <BadgeCheck className="h-4 w-4 text-blue-500" />
          </div>

          <p className="text-xs text-slate-500">
            Web Development Intern
          </p>
        </div>
      </div>

      <dl className="space-y-3">
        <Row
          icon={MapPin}
          label="Location"
          value="Bangalore, Karnataka"
        />

        <Row
          icon={Calendar}
          label="Joining Date"
          value="15 May 2025"
        />

        <Row
          icon={Calendar}
          label="Ending Date"
          value="15 Aug 2025"
        />

        <Row
          icon={Briefcase}
          label="Department"
          value="Information Technology"
        />

        <Row
          icon={User}
          label="Supervisor"
          value="Mr. Ramesh Kumar"
        />

        <Row
          icon={Briefcase}
          label="Work Mode"
          value={<Badge tone="emerald">Hybrid</Badge>}
        />

        <Row
          icon={Mail}
          label="Email"
          value="ramesh.kumar@infosys.com"
        />

        <Row
          icon={TrendingUp}
          label="Stipend"
          value="₹15,000 / Month"
        />

        <Row
          icon={Phone}
          label="Phone"
          value="+91 98765 43210"
        />
      </dl>
    </div>
  );
}