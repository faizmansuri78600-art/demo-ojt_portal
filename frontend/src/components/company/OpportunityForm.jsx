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

  /* ================= EDITING STATE ================= */

  const [isEditing, setIsEditing] = useState(false);

  /* ================= SKILLS DROPDOWN ================= */

  const [showSkills, setShowSkills] = useState(false);

  const availableSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Node.js",
    "Python",
    "Pandas",
    "NumPy",
    "Machine Learning",
    "Java",
    "PHP",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQL",
    "Git",
    "GitHub",
    "Figma",
    "Cybersecurity",
    "Data Analysis",
  ];

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

      setIsEditing(true);
      setShowSkills(false);
    } else {
      setIsEditing(false);
      setShowSkills(false);
    }
  }, [opportunity]);

  /* ================= CHANGE VALUE ================= */

  const updateField = (field, value) => {
    if (!isEditing) return;

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* ================= TOGGLE SKILL ================= */

  const toggleSkill = (skill) => {
    if (!isEditing) return;

    setFormData((previous) => {
      const alreadySelected =
        previous.skills.includes(skill);

      if (alreadySelected) {
        return {
          ...previous,
          skills: previous.skills.filter(
            (item) => item !== skill
          ),
        };
      }

      return {
        ...previous,
        skills: [...previous.skills, skill],
      };
    });
  };

  /* ================= REMOVE SKILL ================= */

  const removeSkill = (skill) => {
    if (!isEditing) return;

    setFormData((previous) => ({
      ...previous,
      skills: previous.skills.filter(
        (item) => item !== skill
      ),
    }));
  };

  /* ================= SAVE ================= */

  const handleSave = () => {
    if (!isEditing) return;

    const finalData = {
      ...formData,

      stipend: formData.stipend
        ? `₹${formData.stipend} / month`
        : "",
    };

    onSave(finalData);

    setIsEditing(false);
    setShowSkills(false);
  };

  /* ================= CLEAR ================= */

  const handleClear = () => {
    if (!isEditing) return;

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

    setShowSkills(false);
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
          />

          <div>

            <label className="block text-[10px] font-medium text-[#111827] mb-1.5">

              Last Date to Apply{" "}

              <span className="text-red-500">*</span>

            </label>

            <div className="relative">

              <input
                type="date"
                value={formData.lastDate}
                onChange={(e) =>
                  updateField(
                    "lastDate",
                    e.target.value
                  )
                }
                disabled={!isEditing}
                className="
                  w-full
                  h-[38px]
                  border
                  border-[#E5E7EB]
                  rounded-[8px]
                  pl-3
                  pr-8
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
                  right-2.5
                  top-1/2
                  -translate-y-1/2
                  text-[#1E5EFF]
                  pointer-events-none
                "
              />

            </div>

          </div>

        </div>


        {/* ================= REQUIRED SKILLS ================= */}

        <div className="relative">

          <label className="block text-[10px] font-medium text-[#111827] mb-1.5">

            Required Skills{" "}

            <span className="text-red-500">*</span>

          </label>

          {/* SKILL BOX */}

          <button
            type="button"
            disabled={!isEditing}
            onClick={() =>
              setShowSkills((previous) => !previous)
            }
            className={`
              w-full
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
              text-left
              ${isEditing
                ? "cursor-pointer hover:border-[#1E5EFF]"
                : "cursor-not-allowed"
              }
            `}
          >

            {formData.skills.length > 0 ? (

              formData.skills.map(
                (skill, index) => (

                  <span
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      px-2
                      py-1
                      rounded-[5px]
                      bg-[#EFF6FF]
                      text-[#1E5EFF]
                      text-[9px]
                      font-medium
                    "
                  >

                    {skill}

                    {isEditing && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSkill(skill);
                        }}
                        className="
                          flex
                          items-center
                          justify-center
                          text-[#1E5EFF]
                          hover:text-[#DC2626]
                          cursor-pointer
                        "
                      >
                        <X size={10} />
                      </span>
                    )}

                  </span>

                )
              )

            ) : (

              <span className="text-[9px] text-[#94A3B8]">
                Select required skills
              </span>

            )}

            <ChevronDown
              size={13}
              className={`
                ml-auto
                shrink-0
                text-[#1E5EFF]
                transition-transform
                ${showSkills ? "rotate-180" : ""}
              `}
            />

          </button>


          {/* ================= SKILLS DROPDOWN ================= */}

          {showSkills && isEditing && (

            <div
              className="
                absolute
                z-50
                left-0
                right-0
                mt-1
                bg-white
                border
                border-[#E5E7EB]
                rounded-[8px]
                shadow-[0_4px_12px_rgba(15,23,42,0.12)]
                max-h-[180px]
                overflow-y-auto
                p-1.5
              "
            >

              {availableSkills.map((skill) => {

                const selected =
                  formData.skills.includes(skill);

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      toggleSkill(skill)
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      justify-between
                      px-2.5
                      py-2
                      rounded-[6px]
                      text-left
                      text-[10px]
                      transition
                      ${
                        selected
                          ? "bg-[#EFF6FF] text-[#1E5EFF]"
                          : "text-[#475569] hover:bg-[#F8FAFC]"
                      }
                    `}
                  >

                    <span>
                      {skill}
                    </span>

                    {selected && (
                      <span
                        className="
                          text-[9px]
                          font-semibold
                          text-[#1E5EFF]
                        "
                      >
                        ✓
                      </span>
                    )}

                  </button>
                );
              })}

            </div>

          )}

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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
          disabled={!isEditing}
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
            disabled={!isEditing}
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
          disabled={!isEditing}
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


/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
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
        disabled={disabled}
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


/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
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
          disabled={disabled}
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