import { User, Star, Award, Send, FileClock } from "lucide-react";

const items = [
  { icon: User, bg: "bg-blue-50", color: "text-blue-600", text: "Rahul Sharma has been marked present for today.", time: "10 minutes ago" },
  { icon: Star, bg: "bg-orange-50", color: "text-orange-500", text: "New evaluation submitted by you for Priya Patel.", time: "1 hour ago" },
  { icon: Award, bg: "bg-purple-50", color: "text-purple-600", text: "Certificate generated for Aniket Singh.", time: "3 hours ago" },
  { icon: Send, bg: "bg-blue-50", color: "text-blue-600", text: "New application received for Data Science Intern.", time: "5 hours ago" },
  { icon: FileClock, bg: "bg-red-50", color: "text-red-500", text: "Monthly attendance report is ready to download.", time: "2 days ago" },
];

export default function RecentNotificationsCard() {
  return (
    <section className="bg-white rounded-[20px] p-5 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-semibold text-[#111827]">Recent Notifications</h2>
        <a href="#" className="text-[11px] font-semibold text-[#1E5EFF] hover:underline">View All</a>
      </div>

      <div className="flex flex-col">
        {items.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 py-3 ${i !== 0 ? "border-t border-[#F1F5F9]" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
              <n.icon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#374151] leading-snug">{n.text}</p>
              <p className="text-[10px] text-[#9CA3AF] mt-1">{n.time}</p>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E5EFF] mt-1.5 shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}