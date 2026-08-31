import { useState } from "react";

import {
  Pencil,
  Building2,
  Upload,
  Trash2,
  FileText,
  Globe,
  User,
  MapPin,
  CheckCircle2
} from "lucide-react";

import {
  FaLinkedin,
  FaFacebook,
  FaTwitter
} from "react-icons/fa";

import abcLogo from "../../assets/abc.jpeg";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";
import ProfileActions from "../../components/common/ProfileActions";
import FormField from "../../components/common/FormField";


export default function CompanyProfile() {

  const [description, setDescription] = useState(
    "ABC Technologies Pvt. Ltd. is a leading IT solutions and services company delivering innovative digital solutions to clients worldwide. We specialize in web development, mobile applications, cloud solutions, and IT consulting. Our mission is to empower businesses through technology and innovation. We believe in building strong relationships with communities through internship and training opportunities."
  );


  /* ================= SOCIAL LINKS ================= */

  const socialLinks = [
    {
      icon: FaLinkedin,
      value: "https://www.linkedin.com/company/abc-technologies"
    },
    {
      icon: Globe,
      value: "https://www.abctechnologies.com"
    },
    {
      icon: FaFacebook,
      value: "https://www.facebook.com/abctechnologies"
    },
    {
      icon: FaTwitter,
      value: "https://twitter.com/abctechnologies"
    }
  ];


  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">

      {/* SIDEBAR */}
      <CompanySidebar />


      {/* RIGHT SIDE */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* HEADER */}
        <CompanyHeader />


        {/* MAIN */}
        <main className="flex-1 px-8 py-8">


          {/* ================= PAGE HEADER ================= */}

          <div className="flex items-center justify-between mb-6">

            <div>

              <h1 className="text-[32px] font-bold text-[#111827]">
                Company Profile
              </h1>

              <p className="text-[14px] text-[#6B7280] mt-1">

                <span className="font-semibold text-[#1E5EFF]">
                  Dashboard
                </span>

                <span className="mx-2 text-[#9CA3AF]">
                  ›
                </span>

                <span>
                  Company Profile
                </span>

              </p>

            </div>


            {/* EDIT PROFILE */}

            <button
              className="
                w-[140px]
                h-[48px]
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

              <Pencil
                size={17}
                strokeWidth={2}
              />

              Edit Profile

            </button>

          </div>


          {/* ================= TWO COLUMN LAYOUT ================= */}

          <div className="flex gap-6 items-start">


            {/* ================= LEFT COLUMN ================= */}

            <div className="w-[68%] flex flex-col gap-6">


              {/* ================= BASIC INFORMATION ================= */}

              <section
                className="
                  bg-white
                  rounded-[20px]
                  p-6
                  shadow-[0_4px_16px_rgba(15,23,42,0.10)]
                "
              >

                <div className="flex items-center gap-2 mb-5">

                  <Building2
                    size={20}
                    strokeWidth={2}
                    className="text-[#1E5EFF]"
                  />

                  <h2 className="text-[20px] font-bold text-[#0B3091]">
                    Basic Information
                  </h2>

                </div>


                <div className="grid grid-cols-2 gap-x-5 gap-y-5">

                  <FormField
                    label="Company Name"
                    value="ABC Technologies Pvt. Ltd."
                  />

                  <FormField
                    label="Year of Establishment"
                    value="2018"
                  />

                  <FormField
                    label="Registration Number"
                    value="ABC/Tech/2018/558"
                  />


                  {/* COMPANY SIZE + CHEVRON */}

                  <FormField
                    label="Company Size"
                    value="51 - 200 Employees"
                    options={[
                      "1 - 10 Employees",
                      "11 - 50 Employees",
                      "51 - 200 Employees",
                      "201 - 500 Employees",
                      "500+ Employees"
                    ]}
                  />


                  {/* INDUSTRY TYPE + CHEVRON */}

                  <FormField
                    label="Industry Type"
                    value="Information Technology"
                    options={[
                      "Information Technology",
                      "Software Development",
                      "Finance",
                      "Healthcare",
                      "Education"
                    ]}
                  />


                  <FormField
                    label="Head Office Location"
                    value="Pune, Maharashtra, India"
                  />

                  <FormField
                    label="Company Website"
                    value="www.abctechnologies.com"
                    full
                  />

                </div>

              </section>


              {/* ================= CONTACT INFORMATION ================= */}

              <section
                className="
                  bg-white
                  rounded-[20px]
                  p-6
                  shadow-[0_4px_16px_rgba(15,23,42,0.10)]
                "
              >

                <div className="flex items-center gap-2 mb-5">

                  <User
                    size={20}
                    strokeWidth={2}
                    className="text-[#1E5EFF]"
                  />

                  <h2 className="text-[20px] font-bold text-[#0B3091]">
                    Contact Information
                  </h2>

                </div>


                <div className="grid grid-cols-2 gap-x-5 gap-y-5">

                  <FormField
                    label="HR / Contact Person"
                    value="Rahul Sharma"
                  />

                  <FormField
                    label="Alternate Email (Optional)"
                    value="recruitment@abctechnologies.com"
                  />

                  <FormField
                    label="Email Address"
                    value="hr@abctechnologies.com"
                  />

                  <FormField
                    label="Mobile Number"
                    value="+91 87654 32109"
                  />

                  <FormField
                    label="Phone Number"
                    value="+91 98765 43210"
                    full
                  />

                </div>

              </section>


              {/* ================= ADDRESS INFORMATION ================= */}

              <section
                className="
                  bg-white
                  rounded-[20px]
                  p-6
                  min-h-[330px]
                  shadow-[0_4px_16px_rgba(15,23,42,0.10)]
                "
              >

                <div className="flex items-center gap-2 mb-5">

                  <MapPin
                    size={20}
                    strokeWidth={2}
                    className="text-[#1E5EFF]"
                  />

                  <h2 className="text-[20px] font-bold text-[#0B3091]">
                    Address Information
                  </h2>

                </div>


                <div className="grid grid-cols-3 gap-x-5 gap-y-5">

                  <FormField
                    label="Street Address"
                    value="ABC Tower, 2nd Floor, Baner Road"
                    full
                  />


                  {/* CITY + CHEVRON */}

                  <FormField
                    label="City"
                    value="Pune"
                    options={[
                      "Pune",
                      "Mumbai",
                      "Nashik",
                      "Nagpur",
                      "Aurangabad"
                    ]}
                  />


                  {/* STATE + CHEVRON */}

                  <FormField
                    label="State"
                    value="Maharashtra"
                    options={[
                      "Maharashtra",
                      "Gujarat",
                      "Karnataka",
                      "Delhi",
                      "Tamil Nadu"
                    ]}
                  />


                  <FormField
                    label="Pincode"
                    value="411045"
                  />


                  {/* COUNTRY + CHEVRON */}

                  <FormField
                    label="Country"
                    value="India"
                    options={[
                      "India",
                      "United States",
                      "United Kingdom",
                      "Canada",
                      "Australia"
                    ]}
                  />

                </div>

              </section>

            </div>


            {/* ================= RIGHT COLUMN ================= */}

            <div className="w-[32%] flex flex-col gap-6">


              {/* ================= COMPANY LOGO ================= */}

              <section
                className="
                  bg-white
                  rounded-[20px]
                  p-6
                  shadow-[0_4px_16px_rgba(15,23,42,0.10)]
                "
              >

                <div className="flex items-center gap-2 mb-5">

                  <Building2
                    size={20}
                    strokeWidth={2}
                    className="text-[#1E5EFF]"
                  />

                  <h2 className="text-[20px] font-bold text-[#0B3091]">
                    Company Logo
                  </h2>

                </div>


                <div className="flex items-center gap-5">

                  <div
                    className="
                      w-[125px]
                      h-[125px]
                      rounded-[16px]
                      border
                      border-[#E5E7EB]
                      bg-white
                      flex
                      items-center
                      justify-center
                      shrink-0
                      overflow-hidden
                    "
                  >

                    <img
                      src={abcLogo}
                      alt="ABC Technologies Logo"
                      className="
                        w-[105px]
                        h-[105px]
                        object-contain
                      "
                    />

                  </div>


                  <div className="flex flex-col gap-3 flex-1">

                    <button
                      className="
                        w-full
                        h-[42px]
                        rounded-[10px]
                        border
                        border-[#1E5EFF]
                        text-[#1E5EFF]
                        text-[13px]
                        font-medium
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-blue-50
                        transition
                      "
                    >

                      <Upload size={15} />

                      Change Logo

                    </button>


                    <button
                      className="
                        w-full
                        h-[42px]
                        rounded-[10px]
                        border
                        border-[#FCA5A5]
                        text-[#DC2626]
                        text-[13px]
                        font-medium
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-red-50
                        transition
                      "
                    >

                      <Trash2 size={15} />

                      Remove Logo

                    </button>

                  </div>

                </div>


                <p className="text-[11px] text-[#9CA3AF] mt-3">
                  Recommended size: 200 × 200 px
                </p>

              </section>


              {/* ================= COMPANY DESCRIPTION ================= */}

              <section
                className="
                  bg-white
                  rounded-[20px]
                  p-6
                  min-h-[320px]
                  shadow-[0_4px_16px_rgba(15,23,42,0.10)]
                "
              >

                <div className="flex items-center gap-2 mb-5">

                  <FileText
                    size={20}
                    strokeWidth={2}
                    className="text-[#1E5EFF]"
                  />

                  <h2 className="text-[20px] font-bold text-[#0B3091]">
                    Company Description
                  </h2>

                </div>


                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value.slice(0, 500)
                    )
                  }
                  className="
                    w-full
                    h-[210px]
                    border
                    border-[#E5E7EB]
                    rounded-[12px]
                    p-4
                    text-[13px]
                    leading-6
                    text-[#374151]
                    resize-none
                    focus:outline-none
                    focus:border-[#1E5EFF]
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />


                <div className="flex items-center justify-between mt-2">

                  <span className="text-[11px] text-[#9CA3AF]">
                    {description.length}/500 Characters
                  </span>

                  <span
                    className="
                      text-[11px]
                      text-[#16A34A]
                      font-medium
                      flex
                      items-center
                      gap-1
                    "
                  >

                    <CheckCircle2 size={13} />

                    Looks good!

                  </span>

                </div>

              </section>


              {/* ================= SOCIAL LINKS ================= */}

              <section
                className="
                  bg-white
                  rounded-[20px]
                  p-6
                  shadow-[0_4px_16px_rgba(15,23,42,0.10)]
                "
              >

                <div className="flex items-center gap-2 mb-5">

                  <Globe
                    size={20}
                    strokeWidth={2}
                    className="text-[#1E5EFF]"
                  />

                  <h2 className="text-[20px] font-bold text-[#0B3091]">
                    Social Links
                  </h2>

                </div>


                <div className="flex flex-col gap-3">

                  {socialLinks.map(
                    ({ icon: Icon, value }, index) => (

                      <div
                        key={index}
                        className="
                          h-[46px]
                          border
                          border-[#E5E7EB]
                          rounded-[10px]
                          px-3
                          flex
                          items-center
                          gap-3
                          text-[13px]
                          text-[#111827]
                          bg-white
                        "
                      >

                        <Icon
                          size={17}
                          className="text-[#6B7280] shrink-0"
                        />

                        <span className="truncate">
                          {value}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </section>

            </div>

          </div>


          {/* ================= BOTTOM ACTIONS ================= */}

          <div className="mt-6">

            <ProfileActions />

          </div>

        </main>


        {/* FOOTER */}
        <CompanyFooter />

      </div>

    </div>
  );
}