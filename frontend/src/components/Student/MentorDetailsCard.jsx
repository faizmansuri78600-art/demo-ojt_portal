import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, MessageSquare } from "lucide-react";
import Badge from "./common/Badge";
import ContactMentorModal from "./ContactMentorModal";
// ⚠️ No useNavigate / react-router import here — this component never navigates.

export default function MentorDetailsCard() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Mentor Details</h3>

      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Ramesh Kumar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-slate-800 text-sm">Mr. Ramesh Kumar</p>
            <Badge tone="blue">Mentor</Badge>
          </div>
          <p className="text-xs text-slate-500">Senior Developer</p>
          <p className="text-xs text-slate-400">Infosys Limited</p>
        </div>
      </div>

      <dl className="space-y-2.5 text-xs mb-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          ramesh.kumar@infosys.com
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          +91 98765 43210
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          Mon - Fri: 10:00 AM - 06:00 PM
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          Bangalore, Karnataka
        </div>
      </dl>

      {/* Opens the chat modal only — does NOT navigate or change the URL */}
      <button
        type="button"
        onClick={() => setChatOpen(true)}
        className="mt-auto w-full flex items-center justify-center gap-2 border border-blue-200 text-blue-600 text-xs font-semibold rounded-lg py-2 hover:bg-blue-50 transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Contact Mentor
      </button>

      <ContactMentorModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}