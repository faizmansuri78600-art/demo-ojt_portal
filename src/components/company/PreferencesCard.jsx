import { useState } from "react";
import { Bell, MessageSquare } from "lucide-react";

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors shrink-0 ${
        on ? "bg-[#1E5EFF] justify-end" : "bg-[#D1D5DB] justify-start"
      }`}
    >
      <span className="w-4 h-4 rounded-full bg-white block" />
    </button>
  );
}

export default function PreferencesCard() {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <section className="bg-white rounded-[20px] p-6 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
      <h2 className="text-[16px] font-semibold text-[#111827] mb-5">Preferences</h2>

      <div className="grid grid-cols-2 gap-5">
        <div className="border border-[#E5E7EB] rounded-[12px] p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1E5EFF] flex items-center justify-center shrink-0">
            <Bell size={16} />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#111827]">Email Notifications</p>
            <p className="text-[11px] text-[#9CA3AF] mt-0.5">
              Receive email notifications for important updates and activities.
            </p>
          </div>
          <Toggle on={email} onChange={() => setEmail(!email)} />
        </div>

        <div className="border border-[#E5E7EB] rounded-[12px] p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <MessageSquare size={16} />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#111827]">SMS Notifications</p>
            <p className="text-[11px] text-[#9CA3AF] mt-0.5">
              Receive SMS alerts for important updates and reminders.
            </p>
          </div>
          <Toggle on={sms} onChange={() => setSms(!sms)} />
        </div>
      </div>
    </section>
  );
}