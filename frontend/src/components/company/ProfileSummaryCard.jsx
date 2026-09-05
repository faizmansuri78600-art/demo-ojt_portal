import { Mail, Phone, MapPin, BadgeCheck } from "lucide-react";
import logo from "../../assets/logohe.jpeg";

export default function ProfileSummaryCard() {
  return (
    <section className="bg-white rounded-[20px] p-5 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
      <h2 className="text-[14px] font-semibold text-[#111827] mb-4">Profile Summary</h2>

      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="Company logo" className="w-16 h-16 rounded-full object-cover border border-[#E5E7EB]" />
        <p className="text-[14px] font-semibold text-[#111827] mt-2">ABC Technologies</p>
        <span className="mt-1 flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
          <BadgeCheck size={11} /> Verified Company
        </span>
      </div>

      <div className="flex flex-col gap-2.5 mt-4">
        <div className="flex items-center gap-2 text-[12px] text-[#374151]">
          <Mail size={13} className="text-[#9CA3AF] shrink-0" /> hr@abctechnologies.com
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#374151]">
          <Phone size={13} className="text-[#9CA3AF] shrink-0" /> +91 98765 43210
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#374151]">
          <MapPin size={13} className="text-[#9CA3AF] shrink-0" /> Pune, Maharashtra
        </div>
      </div>
    </section>
  );
}