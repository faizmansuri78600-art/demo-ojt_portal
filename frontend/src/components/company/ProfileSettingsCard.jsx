import { useState } from "react";
import { Camera, Save, ChevronDown } from "lucide-react";
import logo from "../../assets/logohe.jpeg";


/* ================= INPUT FIELD ================= */

function Field({
  label,
  value,
  onChange,
  full = false,
  type = "text"
}) {
  return (
    <div className={full ? "col-span-2" : ""}>

      <label className="block text-[13px] font-medium text-[#111827] mb-1.5">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          h-[44px]
          border
          border-[#E5E7EB]
          rounded-[10px]
          px-3
          text-[13px]
          text-[#111827]
          bg-white
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

    </div>
  );
}


/* ================= SELECT FIELD ================= */

function SelectField({
  label,
  value,
  onChange,
  options
}) {
  return (
    <div>

      <label className="block text-[13px] font-medium text-[#111827] mb-1.5">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            h-[44px]
            appearance-none
            border
            border-[#E5E7EB]
            rounded-[10px]
            px-3
            pr-10
            text-[13px]
            text-[#111827]
            bg-white
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

        <ChevronDown
          size={16}
          strokeWidth={1.8}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-[#6B7280]
            pointer-events-none
          "
        />

      </div>

    </div>
  );
}


/* ================= MAIN COMPONENT ================= */

export default function ProfileSettingsCard() {

  /* ================= STATE ================= */

  const [companyName, setCompanyName] = useState(
    "ABC Technologies"
  );

  const [email, setEmail] = useState(
    "hr@abctechnologies.com"
  );

  const [phone, setPhone] = useState(
    "+91 98765 43210"
  );

  const [website, setWebsite] = useState(
    "www.abctechnologies.com"
  );

  const [industry, setIndustry] = useState(
    "Information Technology"
  );

  const [companySize, setCompanySize] = useState(
    "51 - 200 Employees"
  );

  const [companyAddress, setCompanyAddress] = useState(
    "123, Tech Park, Hinjawadi Phase 2, Pune, Maharashtra - 411057"
  );


  /* ================= SAVE ================= */

  const handleSave = () => {

    console.log("Company Profile Saved:", {
      companyName,
      email,
      phone,
      website,
      industry,
      companySize,
      companyAddress
    });

  };


  return (

    <section
      className="
        bg-white
        rounded-[20px]
        p-6
        shadow-[0_4px_16px_rgba(15,23,42,0.08)]
      "
    >

      {/* ================= TITLE ================= */}

      <h2 className="text-[16px] font-semibold text-[#111827] mb-5">
        Profile Settings
      </h2>


      <div className="flex gap-6">


        {/* ================= LOGO ================= */}

        <div className="flex flex-col items-center shrink-0 w-[140px]">

          <div
            className="
              relative
              w-[90px]
              h-[90px]
              rounded-full
              overflow-hidden
              border
              border-[#E5E7EB]
              bg-white
            "
          >

            <img
              src={logo}
              alt="Company logo"
              className="
                w-full
                h-full
                object-contain
              "
            />


            {/* CAMERA ICON */}

            <div
              className="
                absolute
                bottom-0
                right-0
                w-7
                h-7
                bg-white
                border
                border-[#E5E7EB]
                rounded-full
                flex
                items-center
                justify-center
              "
            >

              <Camera
                size={13}
                className="text-[#6B7280]"
              />

            </div>

          </div>


          <p
            className="
              text-[13px]
              font-semibold
              text-[#111827]
              mt-2
              text-center
            "
          >
            ABC Technologies
          </p>


          <p className="text-[11px] text-[#9CA3AF]">
            Company
          </p>


          <button
            className="
              mt-3
              h-[34px]
              px-4
              rounded-[10px]
              border
              border-[#E5E7EB]
              text-[12px]
              font-medium
              text-[#374151]
              hover:bg-slate-50
              hover:border-[#CBD5E1]
              transition-all
            "
          >
            Change Logo
          </button>

        </div>


        {/* ================= FIELDS ================= */}

        <div
          className="
            flex-1
            grid
            grid-cols-2
            gap-x-5
            gap-y-4
          "
        >

          {/* COMPANY NAME */}

          <Field
            label="Company Name"
            value={companyName}
            onChange={setCompanyName}
          />


          {/* EMAIL */}

          <Field
            label="Email Address"
            value={email}
            onChange={setEmail}
            type="email"
          />


          {/* PHONE */}

          <Field
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            type="tel"
          />


          {/* WEBSITE */}

          <Field
            label="Website"
            value={website}
            onChange={setWebsite}
          />


          {/* INDUSTRY TYPE */}

          <SelectField
            label="Industry Type"
            value={industry}
            onChange={setIndustry}
            options={[
              "Information Technology",
              "Software Development",
              "Finance",
              "Healthcare",
              "Education"
            ]}
          />


          {/* COMPANY SIZE */}

          <SelectField
            label="Company Size"
            value={companySize}
            onChange={setCompanySize}
            options={[
              "1 - 10 Employees",
              "11 - 50 Employees",
              "51 - 200 Employees",
              "201 - 500 Employees",
              "500+ Employees"
            ]}
          />


          {/* COMPANY ADDRESS */}

          <Field
            label="Company Address"
            value={companyAddress}
            onChange={setCompanyAddress}
            full
          />

        </div>

      </div>


      {/* ================= SAVE BUTTON ================= */}

      <div className="flex justify-end mt-5">

        <button
          onClick={handleSave}
          className="
            h-[42px]
            px-5
            rounded-[10px]
            bg-[#1E5EFF]
            text-white
            text-[13px]
            font-medium
            flex
            items-center
            gap-2
            hover:bg-[#174dcc]
            active:scale-[0.98]
            transition-all
          "
        >

          <Save size={14} />

          Save Changes

        </button>

      </div>

    </section>

  );
}