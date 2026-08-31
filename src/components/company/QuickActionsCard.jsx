import { Bell, Lock, Download, Users, ChevronRight } from "lucide-react";

const actions = [
  { icon: Bell, label: "Notification Preferences" },
  { icon: Lock, label: "Change Password" },
  { icon: Download, label: "Download Activity Log" },
  { icon: Users, label: "Manage Users" },
];

export default function QuickActionsCard() {
  return (
    <section className="bg-white rounded-[20px] p-5 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
      <h2 className="text-[14px] font-semibold text-[#111827] mb-3">Quick Actions</h2>

      <div className="flex flex-col">
        {actions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center justify-between py-3 border-t border-[#F1F5F9] first:border-t-0 hover:bg-slate-50 transition-colors -mx-1 px-1 rounded-lg"
          >
            <span className="flex items-center gap-3 text-[13px] font-medium text-[#374151]">
              <Icon size={16} className="text-[#6B7280]" /> {label}
            </span>
            <ChevronRight size={15} className="text-[#9CA3AF]" />
          </button>
        ))}
      </div>
    </section>
  );
}