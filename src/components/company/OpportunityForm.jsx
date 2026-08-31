import { X, Calendar, ChevronDown } from "lucide-react";

import ProfileActions from "../common/ProfileActions";


export default function OpportunityForm() {
  return (
    <div
      className="
        w-[380px]
        shrink-0
        bg-white
        rounded-[12px]
        border
        border-[#E5E7EB]
        shadow-[0_2px_8px_rgba(15,23,42,0.06)]
        overflow-hidden
      "
    >

      {/* ================= HEADER ================= */}

      <div className="px-5 py-4 border-b border-[#E5E7EB]">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-[15px] font-semibold text-[#0B3091]">
              Add / Edit Opportunity
            </h2>

            <p className="text-[10px] text-[#64748B] mt-1">
              Create a new opportunity or update existing one.
            </p>
          </div>

          <button className="text-[#94A3B8] hover:text-[#475569]">
            <X size={16} />
          </button>

        </div>

      </div>


      {/* ================= FORM ================= */}

      <div className="p-5 space-y-4">

        {/* OPPORTUNITY TITLE */}

        <div>
          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
            Opportunity Title <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            defaultValue="Web Development Intern"
            className="
              w-full
              h-[38px]
              border
              border-[#E5E7EB]
              rounded-[8px]
              px-3
              text-[11px]
              text-[#111827]
              outline-none
              focus:border-[#1E5EFF]
            "
          />
        </div>


        {/* DEPARTMENT + VACANCIES */}

        <div className="grid grid-cols-[1.5fr_1fr] gap-3">

          <SelectField
            label="Department"
            value="Computer Science"
            options={[
              "Computer Science",
              "Data Science",
              "Marketing",
              "Management",
              "Information Tech."
            ]}
            required
          />

          <InputField
            label="Vacancies"
            value="5"
            required
          />

        </div>


        {/* DURATION + STIPEND */}

        <div className="grid grid-cols-[1.5fr_1fr] gap-3">

          <SelectField
            label="Duration"
            value="2 Months"
            options={[
              "2 Months",
              "3 Months",
              "6 Months"
            ]}
            required
          />

          <InputField
            label="Stipend (per month)"
            value="8000"
          />

        </div>


        {/* LOCATION + LAST DATE */}

        <div className="grid grid-cols-[1.5fr_1fr] gap-3">

          <SelectField
            label="Location"
            value="Pune (Hybrid)"
            options={[
              "Pune (Hybrid)",
              "Pune (On-site)",
              "Remote"
            ]}
            required
          />

          <div>

            <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
              Last Date to Apply <span className="text-red-500">*</span>
            </label>

            <div className="relative">

              <input
                type="text"
                defaultValue="31/07/2025"
                className="
                  w-full
                  h-[38px]
                  border
                  border-[#E5E7EB]
                  rounded-[8px]
                  pl-8
                  pr-2
                  text-[10px]
                  text-[#111827]
                  outline-none
                  focus:border-[#1E5EFF]
                "
              />

              <Calendar
                size={13}
                className="
                  absolute
                  left-2.5
                  top-1/2
                  -translate-y-1/2
                  text-[#1E5EFF]
                "
              />

            </div>

          </div>

        </div>


        {/* REQUIRED SKILLS */}

        <div>

          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
            Required Skills <span className="text-red-500">*</span>
          </label>

          <div
            className="
              min-h-[38px]
              border
              border-[#E5E7EB]
              rounded-[8px]
              px-2
              py-1.5
              flex
              items-center
              gap-1.5
              flex-wrap
              bg-white
            "
          >

            <Skill text="HTML" />
            <Skill text="CSS" />
            <Skill text="JavaScript" />
            <Skill text="React.js" />

            <ChevronDown
              size={13}
              className="ml-auto text-[#1E5EFF]"
            />

          </div>

        </div>


        {/* DESCRIPTION */}

        <div>

          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            defaultValue="We are looking for a motivated web development intern to work on real-time projects. You will collaborate with our development team and gain hands-on experience."
            className="
              w-full
              h-[88px]
              border
              border-[#E5E7EB]
              rounded-[8px]
              p-3
              text-[10px]
              leading-4
              text-[#374151]
              resize-none
              outline-none
              focus:border-[#1E5EFF]
            "
          />

          <div className="flex justify-end mt-1">
            <span className="text-[9px] text-[#94A3B8]">
              142/500
            </span>
          </div>

        </div>


        {/* ELIGIBILITY CRITERIA */}

        <div>

          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
            Eligibility Criteria
          </label>

          <textarea
            defaultValue="e.g. BCA, MCA, B.Tech, Any Graduate"
            className="
              w-full
              h-[58px]
              border
              border-[#E5E7EB]
              rounded-[8px]
              p-3
              text-[10px]
              text-[#64748B]
              resize-none
              outline-none
              focus:border-[#1E5EFF]
            "
          />

        </div>


        {/* STATUS */}

        <SelectField
          label="Status"
          value="Active"
          options={[
            "Active",
            "Draft",
            "Closed"
          ]}
          required
        />

      </div>


      {/* ================= ACTION BUTTONS ================= */}

      <div className="px-5 pb-5">

        <ProfileActions />

      </div>

    </div>
  );
}


/* ================= INPUT FIELD ================= */

function InputField({
  label,
  value,
  required = false
}) {
  return (
    <div>

      <label className="block text-[10px] font-medium text-[#111827] mb-1.5">

        {label}

        {required && (
          <span className="text-red-500"> *</span>
        )}

      </label>

      <input
        type="text"
        defaultValue={value}
        className="
          w-full
          h-[38px]
          border
          border-[#E5E7EB]
          rounded-[8px]
          px-3
          text-[10px]
          text-[#111827]
          outline-none
          focus:border-[#1E5EFF]
        "
      />

    </div>
  );
}


/* ================= SELECT FIELD ================= */

function SelectField({
  label,
  value,
  options,
  required = false
}) {
  return (
    <div>

      <label className="block text-[10px] font-medium text-[#111827] mb-1.5">

        {label}

        {required && (
          <span className="text-red-500"> *</span>
        )}

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
            px-3
            pr-8
            bg-white
            text-[10px]
            text-[#111827]
            outline-none
            cursor-pointer
            focus:border-[#1E5EFF]
          "
        >

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

        </select>

        <ChevronDown
          size={13}
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


/* ================= SKILL ================= */

function Skill({ text }) {
  return (
    <span
      className="
        px-2
        py-1
        rounded-[5px]
        bg-[#EFF6FF]
        text-[#1E5EFF]
        text-[9px]
        font-medium
      "
    >
      {text}
    </span>
  );
}