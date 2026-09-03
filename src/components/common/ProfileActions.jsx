import { Save, X } from "lucide-react";

export default function ProfileActions({
  onCancel,
  onSave
}) {

  return (

    <div className="flex justify-end items-center gap-4">

      {/* ================= CANCEL ================= */}

      <button
        type="button"
        onClick={onCancel}
        className="
          w-[215px]
          h-[62px]
          bg-white
          border
          border-[#E5E7EB]
          rounded-[12px]
          text-[16px]
          font-medium
          text-[#111827]
          flex
          items-center
          justify-center
          gap-2
          hover:bg-[#F8FAFC]
          transition
        "
      >

        <X size={18} />

        Cancel

      </button>


      {/* ================= SAVE CHANGES ================= */}

      <button
        type="button"
        onClick={onSave}
        className="
          w-[290px]
          h-[62px]
          bg-[#1E5EFF]
          rounded-[12px]
          text-white
          text-[16px]
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          hover:bg-[#174dcc]
          active:scale-[0.98]
          transition
        "
      >

        <Save size={18} />

        Save Changes

      </button>

    </div>

  );
}