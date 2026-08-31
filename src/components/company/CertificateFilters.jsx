import {
  Search,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

export default function CertificateFilters() {
  return (
    <div className="w-full">

      <div className="flex items-end gap-3 w-full">

        {/* SEARCH */}

        <div className="flex-1 min-w-0">

          <label className="block text-[10px] font-medium text-[#6B7280] mb-1.5">
            Search
          </label>

          <div
            className="
              h-[38px]
              w-full
              border
              border-[#E5E7EB]
              rounded-[8px]
              px-3
              flex
              items-center
              gap-2
              bg-white
            "
          >

            <Search
              size={14}
              strokeWidth={1.8}
              className="text-[#9CA3AF] shrink-0"
            />

            <input
              type="text"
              placeholder="Search by student name, email..."
              className="
                flex-1
                min-w-0
                outline-none
                text-[10px]
                text-[#111827]
                placeholder:text-[#9CA3AF]
                bg-transparent
              "
            />

          </div>

        </div>


        {/* INTERNSHIP / OPPORTUNITY */}

        <Filter
          label="Internship / Opportunity"
          value="All Opportunities"
          options={[
            "All Opportunities",
            "Web Development Intern",
            "Data Science Intern",
            "UI/UX Design Intern",
          ]}
          width="w-[145px]"
        />


        {/* DEPARTMENT */}

        <Filter
          label="Department"
          value="All Departments"
          options={[
            "All Departments",
            "Computer Science",
            "Data Science",
            "IT / Design",
            "Marketing",
          ]}
          width="w-[125px]"
        />


        {/* STATUS */}

        <Filter
          label="Status"
          value="All Status"
          options={[
            "All Status",
            "Issued",
            "Pending",
          ]}
          width="w-[105px]"
        />


        {/* RESET */}

        <button
          type="button"
          className="
            h-[38px]
            px-3
            rounded-[8px]
            border
            border-[#E5E7EB]
            bg-white
            text-[#374151]
            text-[10px]
            font-medium
            flex
            items-center
            justify-center
            gap-1.5
            shrink-0
            hover:bg-[#F8FAFC]
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


/* ================= FILTER ================= */

function Filter({
  label,
  value,
  options,
  width,
}) {
  return (
    <div className={`${width} shrink-0`}>

      <label className="block text-[10px] font-medium text-[#6B7280] mb-1.5">
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
            px-3
            pr-7
            text-[10px]
            text-[#111827]
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
          size={13}
          strokeWidth={2}
          className="
            absolute
            right-2.5
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