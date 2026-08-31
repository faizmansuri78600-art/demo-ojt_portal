import { Search, RotateCcw, ChevronDown } from "lucide-react";

export default function OpportunityFilters() {
  return (
    <div
      className="
        w-full
        bg-white
        border
        border-[#E5E7EB]
        rounded-[10px]
        p-3
      "
    >
      <div className="flex items-end gap-3">

        {/* SEARCH */}

        <div className="flex-1 min-w-0">

          <label className="block text-[10px] font-medium text-[#475569] mb-1.5">
            Search
          </label>

          <div
            className="
              h-[38px]
              w-full
              border
              border-[#E5E7EB]
              rounded-[8px]
              flex
              items-center
              px-3
              bg-white
            "
          >

            <Search
              size={14}
              strokeWidth={1.8}
              className="text-[#94A3B8] mr-2 shrink-0"
            />

            <input
              type="text"
              placeholder="Search opportunities by title, skills..."
              className="
                w-full
                outline-none
                bg-transparent
                text-[11px]
                text-[#334155]
                placeholder:text-[#94A3B8]
              "
            />

          </div>

        </div>


        {/* DEPARTMENT */}

        <FilterSelect
          label="Department"
          value="All Departments"
          options={[
            "All Departments",
            "Computer Science",
            "Data Science",
            "Marketing",
            "Management",
            "Information Tech."
          ]}
        />


        {/* STATUS */}

        <FilterSelect
          label="Status"
          value="All Status"
          options={[
            "All Status",
            "Active",
            "Draft",
            "Closed"
          ]}
        />


        {/* DURATION */}

        <FilterSelect
          label="Duration"
          value="All Duration"
          options={[
            "All Duration",
            "2 Months",
            "3 Months",
            "6 Months"
          ]}
        />


        {/* RESET */}

        <button
          type="button"
          className="
            h-[38px]
            px-3
            border
            border-[#E5E7EB]
            rounded-[8px]
            bg-white
            flex
            items-center
            justify-center
            gap-1.5
            text-[10px]
            font-medium
            text-[#475569]
            hover:bg-[#F8FAFC]
            transition-colors
          "
        >

          <RotateCcw
            size={12}
            strokeWidth={1.8}
          />

          Reset

        </button>

      </div>
    </div>
  );
}


/* ================= FILTER SELECT ================= */

function FilterSelect({ label, value, options }) {

  return (
    <div className="w-[105px] shrink-0">

      <label className="block text-[10px] font-medium text-[#475569] mb-1.5">
        {label}
      </label>

      <div className="relative">

        <select
          defaultValue={value}
          className="
            appearance-none
            w-full
            h-[38px]
            border
            border-[#E5E7EB]
            rounded-[8px]
            bg-white
            px-2.5
            pr-7
            text-[10px]
            text-[#334155]
            outline-none
            cursor-pointer
            focus:border-[#1E5EFF]
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

        <ChevronDown
          size={12}
          strokeWidth={2}
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            text-[#1E5EFF]
            pointer-events-none
          "
        />

      </div>

    </div>
  );
}