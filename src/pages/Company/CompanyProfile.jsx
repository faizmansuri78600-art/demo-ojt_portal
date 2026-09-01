import { useState, useRef } from "react";

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

  /* ================= BASIC INFORMATION ================= */

  const [companyName, setCompanyName] = useState(
    "ABC Technologies Pvt. Ltd."
  );

  const [yearOfEstablishment, setYearOfEstablishment] = useState(
    "2018"
  );

  const [registrationNumber, setRegistrationNumber] = useState(
    "ABC/Tech/2018/558"
  );

  const [companySize, setCompanySize] = useState(
    "51 - 200 Employees"
  );

  const [industry, setIndustry] = useState(
    "Information Technology"
  );

  const [headOffice, setHeadOffice] = useState(
    "Pune, Maharashtra, India"
  );

  const [website, setWebsite] = useState(
    "www.abctechnologies.com"
  );


  /* ================= CONTACT INFORMATION ================= */

  const [contactPerson, setContactPerson] = useState(
    "Rahul Sharma"
  );

  const [alternateEmail, setAlternateEmail] = useState(
    "recruitment@abctechnologies.com"
  );

  const [email, setEmail] = useState(
    "hr@abctechnologies.com"
  );

  const [mobileNumber, setMobileNumber] = useState(
    "+91 87654 32109"
  );

  const [phoneNumber, setPhoneNumber] = useState(
    "+91 98765 43210"
  );


  /* ================= ADDRESS INFORMATION ================= */

  const [streetAddress, setStreetAddress] = useState(
    "ABC Tower, 2nd Floor, Baner Road"
  );

  const [city, setCity] = useState(
    "Pune"
  );

  const [state, setState] = useState(
    "Maharashtra"
  );

  const [pincode, setPincode] = useState(
    "411045"
  );

  const [country, setCountry] = useState(
    "India"
  );


  /* ================= DESCRIPTION ================= */

  const [description, setDescription] = useState(
    "ABC Technologies Pvt. Ltd. is a leading IT solutions and services company delivering innovative digital solutions to clients worldwide. We specialize in web development, mobile applications, cloud solutions, and IT consulting. Our mission is to empower businesses through technology and innovation. We believe in building strong relationships with communities through internship and training opportunities."
  );


  /* ================= LOGO ================= */

  const [companyLogo, setCompanyLogo] = useState(abcLogo);

  const fileInputRef = useRef(null);


  /* ================= POPUP ================= */

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success"
  });


  /* ================= SHOW POPUP ================= */

  const showPopup = (message, type = "success") => {

    setPopup({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      setPopup({
        show: false,
        message: "",
        type: "success"
      });
    }, 2500);

  };


  /* ================= CHANGE LOGO ================= */

  const handleChangeLogo = () => {

    fileInputRef.current?.click();

  };


  /* ================= SELECT NEW LOGO ================= */

  const handleLogoChange = (event) => {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {

      showPopup(
        "Please select a valid image file.",
        "error"
      );

      return;
    }

    const imageURL = URL.createObjectURL(file);

    setCompanyLogo(imageURL);

    showPopup(
      "Logo changed successfully!"
    );

  };


  /* ================= REMOVE LOGO ================= */

  const handleRemoveLogo = () => {

    setCompanyLogo(null);

    showPopup(
      "Company logo removed.",
      "success"
    );

  };


  /* ================= EDIT PROFILE ================= */

  const handleEditProfile = () => {

    showPopup(
      "You can now edit your company profile."
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* ================= SAVE CHANGES ================= */

  const handleSaveChanges = () => {

    console.log("Company Profile Saved:", {
      companyName,
      yearOfEstablishment,
      registrationNumber,
      companySize,
      industry,
      headOffice,
      website,
      contactPerson,
      alternateEmail,
      email,
      mobileNumber,
      phoneNumber,
      streetAddress,
      city,
      state,
      pincode,
      country,
      description,
      companyLogo
    });

    showPopup(
      "Company profile saved successfully!"
    );

  };


  /* ================= CANCEL CHANGES ================= */

  const handleCancelChanges = () => {

    setCompanyName("ABC Technologies Pvt. Ltd.");

    setYearOfEstablishment("2018");

    setRegistrationNumber("ABC/Tech/2018/558");

    setCompanySize("51 - 200 Employees");

    setIndustry("Information Technology");

    setHeadOffice("Pune, Maharashtra, India");

    setWebsite("www.abctechnologies.com");

    setContactPerson("Rahul Sharma");

    setAlternateEmail(
      "recruitment@abctechnologies.com"
    );

    setEmail(
      "hr@abctechnologies.com"
    );

    setMobileNumber(
      "+91 87654 32109"
    );

    setPhoneNumber(
      "+91 98765 43210"
    );

    setStreetAddress(
      "ABC Tower, 2nd Floor, Baner Road"
    );

    setCity("Pune");

    setState("Maharashtra");

    setPincode("411045");

    setCountry("India");

    setDescription(
      "ABC Technologies Pvt. Ltd. is a leading IT solutions and services company delivering innovative digital solutions to clients worldwide. We specialize in web development, mobile applications, cloud solutions, and IT consulting. Our mission is to empower businesses through technology and innovation. We believe in building strong relationships with communities through internship and training opportunities."
    );

    setCompanyLogo(abcLogo);

    showPopup(
      "Changes cancelled."
    );

  };


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


      {/* ================= POPUP ================= */}

      {popup.show && (

        <div
          className="
            fixed
            top-6
            right-6
            z-[9999]
            min-w-[320px]
            max-w-[420px]
            bg-white
            rounded-[12px]
            shadow-[0_8px_30px_rgba(15,23,42,0.18)]
            border
            border-[#E5E7EB]
            px-5
            py-4
            flex
            items-center
            gap-3
          "
        >

          <div
            className={`
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              shrink-0
              ${
                popup.type === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }
            `}
          >

            <CheckCircle2 size={20} />

          </div>


          <div>

            <p className="text-[13px] font-semibold text-[#111827]">
              {popup.type === "error"
                ? "Error"
                : "Success"}
            </p>

            <p className="text-[12px] text-[#6B7280] mt-0.5">
              {popup.message}
            </p>

          </div>

        </div>

      )}


      {/* ================= SIDEBAR ================= */}

      <CompanySidebar />


      {/* ================= RIGHT SIDE ================= */}

      <div className="flex-1 min-w-0 flex flex-col">


        {/* HEADER */}

        <CompanyHeader />


        {/* ================= MAIN ================= */}

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


            {/* ================= EDIT PROFILE ================= */}

            <button
              onClick={handleEditProfile}
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
                    value={companyName}
                    onChange={setCompanyName}
                  />


                  <FormField
                    label="Year of Establishment"
                    value={yearOfEstablishment}
                    onChange={setYearOfEstablishment}
                  />


                  <FormField
                    label="Registration Number"
                    value={registrationNumber}
                    onChange={setRegistrationNumber}
                  />


                  {/* DO NOT TOUCH THIS DROPDOWN */}

                  <FormField
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


                  {/* DO NOT TOUCH THIS DROPDOWN */}

                  <FormField
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


                  <FormField
                    label="Head Office Location"
                    value={headOffice}
                    onChange={setHeadOffice}
                  />


                  <FormField
                    label="Company Website"
                    value={website}
                    onChange={setWebsite}
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
                    value={contactPerson}
                    onChange={setContactPerson}
                  />

                  <FormField
                    label="Alternate Email (Optional)"
                    value={alternateEmail}
                    onChange={setAlternateEmail}
                  />

                  <FormField
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                    type="email"
                  />

                  <FormField
                    label="Mobile Number"
                    value={mobileNumber}
                    onChange={setMobileNumber}
                    type="tel"
                  />

                  <FormField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    type="tel"
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
                    value={streetAddress}
                    onChange={setStreetAddress}
                    full
                  />


                  {/* DO NOT TOUCH THIS DROPDOWN */}

                  <FormField
                    label="City"
                    value={city}
                    onChange={setCity}
                    options={[
                      "Pune",
                      "Mumbai",
                      "Nashik",
                      "Nagpur",
                      "Aurangabad"
                    ]}
                  />


                  {/* DO NOT TOUCH THIS DROPDOWN */}

                  <FormField
                    label="State"
                    value={state}
                    onChange={setState}
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
                    value={pincode}
                    onChange={setPincode}
                  />


                  {/* DO NOT TOUCH THIS DROPDOWN */}

                  <FormField
                    label="Country"
                    value={country}
                    onChange={setCountry}
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


                  {/* LOGO PREVIEW */}

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

                    {companyLogo ? (

                      <img
                        src={companyLogo}
                        alt="ABC Technologies Logo"
                        className="
                          w-[105px]
                          h-[105px]
                          object-contain
                        "
                      />

                    ) : (

                      <div className="text-center">

                        <Building2
                          size={35}
                          className="mx-auto text-[#CBD5E1]"
                        />

                        <p className="text-[11px] text-[#9CA3AF] mt-2">
                          No Logo
                        </p>

                      </div>

                    )}

                  </div>


                  {/* LOGO BUTTONS */}

                  <div className="flex flex-col gap-3 flex-1">


                    {/* HIDDEN FILE INPUT */}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />


                    {/* CHANGE LOGO */}

                    <button
                      onClick={handleChangeLogo}
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


                    {/* REMOVE LOGO */}

                    <button
                      onClick={handleRemoveLogo}
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

            <ProfileActions
              onCancel={handleCancelChanges}
              onSave={handleSaveChanges}
            />

          </div>

        </main>


        {/* ================= FOOTER ================= */}

        <CompanyFooter />

      </div>

    </div>
  );
}