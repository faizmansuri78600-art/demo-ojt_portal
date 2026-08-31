import { useState } from "react";
import { Eye, EyeOff, Lock, Info } from "lucide-react";

function PasswordField({ label, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#111827] mb-1.5">{label}</label>
      <div className="h-[44px] border border-[#E5E7EB] rounded-[10px] px-3 flex items-center justify-between">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="flex-1 text-[13px] outline-none placeholder:text-[#9CA3AF]"
        />
        {show ? (
          <EyeOff size={16} className="text-[#9CA3AF] cursor-pointer shrink-0" onClick={() => setShow(false)} />
        ) : (
          <Eye size={16} className="text-[#9CA3AF] cursor-pointer shrink-0" onClick={() => setShow(true)} />
        )}
      </div>
    </div>
  );
}

export default function SecuritySettingsCard() {
  return (
    <section className="bg-white rounded-[20px] p-6 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
      <h2 className="text-[16px] font-semibold text-[#111827] mb-5">Security Settings</h2>

      <div className="grid grid-cols-3 gap-5">
        <PasswordField label="Current Password" placeholder="Enter current password" />
        <PasswordField label="New Password" placeholder="Enter new password" />
        <PasswordField label="Confirm New Password" placeholder="Confirm new password" />
      </div>

      <div className="flex items-center gap-2 mt-4 bg-blue-50 rounded-[10px] px-4 py-3">
        <Info size={15} className="text-[#1E5EFF] shrink-0" />
        <p className="text-[12px] text-[#374151]">
          Password must be at least 8 characters long and include a combination of letters, numbers and symbols.
        </p>
      </div>

      <div className="flex justify-end mt-5">
        <button className="h-[42px] px-5 rounded-[10px] bg-[#1E5EFF] text-white text-[13px] font-medium flex items-center gap-2 hover:bg-[#174dcc]">
          <Lock size={14} /> Update Password
        </button>
      </div>
    </section>
  );
}