import { ChevronDown } from "lucide-react";

export default function FormField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  full = false,
  options = [],
}) {
  return (
    <div className={full ? "col-span-2" : ""}>

      {/* LABEL */}
      <label className="block text-[13px] font-semibold text-[#111827] mb-2">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {/* DROPDOWN */}
      {options.length > 0 ? (

        <div className="relative w-full">

          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="
              w-full
              h-[48px]
              appearance-none
              bg-white
              border
              border-[#E5E7EB]
              rounded-[10px]
              px-4
              pr-11
              text-[14px]
              text-[#111827]
              outline-none
              cursor-pointer
              transition-all
              duration-200
              hover:border-[#CBD5E1]
              focus:border-[#1E5EFF]
              focus:ring-2
              focus:ring-[#1E5EFF]/10
            "
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

          {/* CHEVRON */}
          <div
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              pointer-events-none
              flex
              items-center
              justify-center
            "
          >
            <ChevronDown
              size={17}
              strokeWidth={1.8}
              className="text-[#6B7280]"
            />
          </div>

        </div>

      ) : (

        /* NORMAL INPUT */
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            h-[48px]
            bg-white
            border
            border-[#E5E7EB]
            rounded-[10px]
            px-4
            text-[14px]
            text-[#111827]
            outline-none
            cursor-text
            transition-all
            duration-200
            hover:border-[#CBD5E1]
            focus:border-[#1E5EFF]
            focus:ring-2
            focus:ring-[#1E5EFF]/10
          "
        />

      )}

    </div>
  );
}