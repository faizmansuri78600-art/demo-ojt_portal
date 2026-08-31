import { LockKeyhole } from "lucide-react";

export default function ProfileActions() {
  return (
    <div className="flex justify-end gap-4 mt-6">

      {/* CANCEL */}
      <button
        type="button"
        className="
          w-[180px]
          h-[52px]
          rounded-[12px]
          border
          border-[#E5E7EB]
          bg-white
          text-[#111827]
          text-[16px]
          font-medium
          hover:bg-slate-50
          transition-colors
        "
      >
        Cancel
      </button>

      {/* SAVE CHANGES */}
      <button
        type="button"
        className="
          w-[240px]
          h-[52px]
          rounded-[12px]
          bg-[#1E5EFF]
          text-white
          text-[16px]
          font-medium
          flex
          items-center
          justify-center
          gap-2
          hover:bg-[#174dcc]
          transition-colors
        "
      >
        <LockKeyhole
          size={17}
          strokeWidth={2}
        />

        Save Changes
      </button>

    </div>
  );
}