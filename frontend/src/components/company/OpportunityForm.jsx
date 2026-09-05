import { useEffect, useState } from "react";

import {
  X,
  Calendar,
  ChevronDown,
  Save,
} from "lucide-react";


export default function OpportunityForm({
  opportunity,
  onSave,
  onCancel,
}) {

  /* ================= FORM STATE ================= */

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    department: "Computer Science",
    vacancies: "",
    duration: "2 Months",
    stipend: "",
    location: "Pune (Hybrid)",
    lastDate: "",
    skills: ["HTML", "CSS"],
    description: "",
    eligibility: "",
    status: "Active",
  });


  /* ================= LOAD OPPORTUNITY ================= */

  useEffect(() => {

    if (opportunity) {

      setFormData({
        id: opportunity.id || null,
        title: opportunity.title || "",
        department:
          opportunity.department ||
          "Computer Science",
        vacancies:
          opportunity.vacancies || "",
        duration:
          opportunity.duration ||
          "2 Months",
        stipend:
          opportunity.stipend
            ? opportunity.stipend
                .replace("₹", "")
                .replace("/ month", "")
                .trim()
            : "",
        location:
          opportunity.location ||
          "Pune (Hybrid)",
        lastDate:
          opportunity.lastDate || "",
        skills:
          opportunity.skills || ["HTML", "CSS"],
        description:
          opportunity.description || "",
        eligibility:
          opportunity.eligibility || "",
        status:
          opportunity.status || "Active",
      });

    }

  }, [opportunity]);


  /* ================= CHANGE VALUE ================= */

  const updateField = (field, value) => {

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

  };


  /* ================= SAVE ================= */

  const handleSave = () => {

    const finalData = {
      ...formData,

      stipend: formData.stipend
        ? `₹${formData.stipend} / month`
        : "",
    };

    onSave(finalData);

  };


  /* ================= CLEAR ================= */

  const handleClear = () => {

    setFormData({
      id: null,
      title: "",
      department: "Computer Science",
      vacancies: "",
      duration: "2 Months",
      stipend: "",
      location: "Pune (Hybrid)",
      lastDate: "",
      skills: ["HTML", "CSS"],
      description: "",
      eligibility: "",
      status: "Draft",
    });

  };


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

              {opportunity?.id
                ? "Edit Opportunity"
                : "Add / Edit Opportunity"}

            </h2>

            <p className="text-[10px] text-[#64748B] mt-1">
              Create a new opportunity or update existing one.
            </p>

          </div>


          <button
            type="button"
            onClick={onCancel}
            className="text-[#94A3B8] hover:text-[#475569]"
          >

            <X size={16} />

          </button>

        </div>

      </div>


      {/* ================= FORM ================= */}

      <div className="p-5 space-y-4">


        {/* TITLE */}

        <div>

          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
            Opportunity Title{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              updateField(
                "title",
                e.target.value
              )
            }
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
            value={formData.department}
            onChange={(value) =>
              updateField(
                "department",
                value
              )
            }
            options={[
              "Computer Science",
              "Data Science",
              "Marketing",
              "Management",
              "Information Tech.",
              "IT / Design",
            ]}
            required
          />


          <InputField
            label="Vacancies"
            value={formData.vacancies}
            onChange={(value) =>
              updateField(
                "vacancies",
                value
              )
            }
            required
          />

        </div>


        {/* DURATION + STIPEND */}

        <div className="grid grid-cols-[1.5fr_1fr] gap-3">

          <SelectField
            label="Duration"
            value={formData.duration}
            onChange={(value) =>
              updateField(
                "duration",
                value
              )
            }
            options={[
              "2 Months",
              "3 Months",
              "6 Months",
            ]}
            required
          />


          <InputField
            label="Stipend (per month)"
            value={formData.stipend}
            onChange={(value) =>
              updateField(
                "stipend",
                value
              )
            }
          />

        </div>


        {/* LOCATION + LAST DATE */}

        <div className="grid grid-cols-[1.5fr_1fr] gap-3">

          <SelectField
            label="Location"
            value={formData.location}
            onChange={(value) =>
              updateField(
                "location",
                value
              )
            }
            options={[
              "Pune (Hybrid)",
              "Pune (On-site)",
              "Remote",
            ]}
            required
          />


          <div>

            <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
              Last Date to Apply{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">

              <input
                type="text"
                value={formData.lastDate}
                onChange={(e) =>
                  updateField(
                    "lastDate",
                    e.target.value
                  )
                }
                placeholder="31/07/2025"
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
            Required Skills{" "}
            <span className="text-red-500">*</span>
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

            {formData.skills.map(
              (skill, index) => (

                <Skill
                  key={index}
                  text={skill}
                />

              )
            )}


            {/* SAME CHEVRON */}

            <ChevronDown
              size={13}
              className="ml-auto text-[#1E5EFF]"
            />

          </div>

        </div>


        {/* DESCRIPTION */}

        <div>

          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
            Description{" "}
            <span className="text-red-500">*</span>
          </label>

          <textarea
            value={formData.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value.slice(
                  0,
                  500
                )
              )
            }
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
              {formData.description.length}/500
            </span>

          </div>

        </div>


        {/* ELIGIBILITY */}

        <div>

          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">
            Eligibility Criteria
          </label>

          <textarea
            value={formData.eligibility}
            onChange={(e) =>
              updateField(
                "eligibility",
                e.target.value
              )
            }
            placeholder="e.g. BCA, MCA, B.Tech, Any Graduate"
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
          value={formData.status}
          onChange={(value) =>
            updateField(
              "status",
              value
            )
          }
          options={[
            "Active",
            "Draft",
            "Closed",
          ]}
          required
        />

      </div>


      {/* ================= BUTTONS ================= */}

      <div className="px-5 pb-5">

        <div className="flex gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1
              h-[40px]
              rounded-[8px]
              border
              border-[#E5E7EB]
              bg-white
              text-[#111827]
              text-[11px]
              font-medium
              hover:bg-[#F8FAFC]
            "
          >
            Cancel
          </button>


          <button
            type="button"
            onClick={handleSave}
            className="
              flex-1
              h-[40px]
              rounded-[8px]
              bg-[#1E5EFF]
              text-white
              text-[11px]
              font-medium
              flex
              items-center
              justify-center
              gap-2
              hover:bg-[#174dcc]
            "
          >

            <Save size={14} />

            Save Changes

          </button>

        </div>


        {/* CLEAR FORM */}

        <button
          type="button"
          onClick={handleClear}
          className="
            w-full
            mt-2
            text-[9px]
            text-[#64748B]
            hover:text-[#1E5EFF]
          "
        >
          Clear form
        </button>

      </div>

    </div>
  );
}


/* ================= INPUT FIELD ================= */

function InputField({
  label,
  value,
  onChange,
  required = false,
}) {

  return (

    <div>

      <label className="block text-[10px] font-medium text-[#111827] mb-1.5">

        {label}

        {required && (
          <span className="text-red-500">
            {" "}*
          </span>
        )}

      </label>


      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
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
  onChange,
  options,
  required = false,
}) {

  return (

    <div>

      <label className="block text-[10px] font-medium text-[#111827] mb-1.5">

        {label}

        {required && (
          <span className="text-red-500">
            {" "}*
          </span>
        )}

      </label>


      <div className="relative">

        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
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

          {options.map(
            (option) => (

              <option
                key={option}
                value={option}
              >
                {option}
              </option>

            )
          )}

        </select>


        {/* CHEVRON UNTOUCHED */}

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