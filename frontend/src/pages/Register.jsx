
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Building2,
  CalendarDays,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  User,
  UserPlus,
  BriefcaseBusiness,
  Hash,
  BookOpen,
} from "lucide-react";

import logo from "../assets/aisc-logo.png";
import heroIllustration from "../assets/aisc-building.png";


const roles = [
  {
    name: "Student",
    icon: GraduationCap,
    color: "text-blue-700",
  },
  {
    name: "Faculty",
    icon: School,
    color: "text-orange-500",
  },
  {
    name: "College Coordinator",
    icon: Building2,
    color: "text-green-600",
  },
  {
    name: "Company",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    name: "Company Coordinator",
    icon: BriefcaseBusiness,
    color: "text-purple-700",
  },
];
const benefits = [
  {
    title: "Find and apply for OJT opportunities",
    description: "Explore openings from top companies.",
    icon: ShieldCheck,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Track your applications",
    description: "Monitor your progress in real-time.",
    icon: UserPlus,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Stay informed",
    description: "Get important updates and announcements.",
    icon: BellIcon,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "Secure & Trusted Platform",
    description: "Your data is safe with us.",
    icon: ShieldCheck,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

function Register() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("Student");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);



  const [formData, setFormData] = useState({
  name: "",
  email: "",
  rollNumber: "",
  department: "",
  cgpa: "",
  mobile: "",
  password: "",
  confirmPassword: "",
 dob: "",
dateOfEstablishment: "",
  address: "",
  

  // Company fields
companyName: "",
industry: "",
website: "",
companyPhone: "",
});
  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  function handleChange(event) {
    const { id, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  
  async function handleSubmit(event) {
  event.preventDefault();

  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name:
          selectedRole === "Company"
            ? formData.companyName
            : formData.name,

        email: formData.email,

        password: formData.password,

        confirmPassword: formData.confirmPassword,

        role: selectedRole,

        phone: formData.mobile,

        rollNumber: formData.rollNumber,

        department: formData.department,

        cgpa: formData.cgpa,

        // Company information
        companyName: formData.companyName,
industry: formData.industry,
website: formData.website,
companyPhone: formData.companyPhone,

        address: formData.address,
        
      }
    );

    console.log(
      "Registration Response:",
      response.data
    );

    alert(
      "Registration successful! Please login."
    );

    navigate("/login");

  } catch (error) {
    console.error(
      "Registration Error:",
      error
    );

    if (error.response) {
      setError(
        error.response.data.message ||
          "Registration failed."
      );
    } else {
      setError(
        "Backend server se connect nahi ho pa raha."
      );
    }

  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-[#f2f7ff] p-3 sm:p-5 lg:p-6">

      <div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1500px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_5px_30px_rgba(0,35,100,0.08)]">

        <div className="grid min-h-[calc(100vh-2rem)] lg:grid-cols-[43%_57%]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="relative overflow-hidden bg-gradient-to-br from-[#f1f7ff] via-[#f7fbff] to-[#eaf3ff] px-8 py-9 sm:px-12 lg:px-14">

            {/* Logo */}

            <div className="relative z-10 flex items-center gap-3">

              <img
                src={logo}
                alt="AISC Logo"
                className="h-12 w-12 object-contain"
              />

              <div>

                <h2 className="text-xl font-bold text-[#071d49]">
                  AISC OJT Portal
                </h2>

                <p className="text-xs text-gray-600">
                  On-the-Job Training Management System
                </p>

              </div>

            </div>

            {/* Main Text */}

            <div className="relative z-10 mt-14 max-w-[560px]">

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
                Join Us Today! 🚀
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#07132e] sm:text-5xl">

                Create Your

                <span className="block">

                  <span className="text-blue-700">
                    AISC OJT
                  </span>{" "}
                  Account

                </span>

              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600">

                Register to access personalized features, manage OJT
                activities, track progress and stay connected with the
                AISC OJT Portal.

              </p>

            </div>

            {/* Benefits */}

            <div className="relative z-20 mt-8 space-y-4 lg:mt-7">

              {benefits.map((benefit) => {

                const Icon = benefit.icon;

                return (

                  <div
                    key={benefit.title}
                    className="flex items-center gap-4"
                  >

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${benefit.bg} ${benefit.color}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div>

                      <h3 className="text-xs font-bold text-gray-800">
                        {benefit.title}
                      </h3>

                      <p className="mt-1 text-[10px] text-gray-600">
                        {benefit.description}
                      </p>

                    </div>

                  </div>

                );
              })}

            </div>

            {/* Illustration */}

            <div className="relative z-10 mt-8 flex justify-center lg:absolute lg:bottom-0 lg:left-4 lg:right-4 lg:mt-0">

              <img
                src={heroIllustration}
                alt="AISC campus illustration"
                className="w-full max-w-[620px] object-contain"
              />

            </div>

          </div>


          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="flex items-center justify-center bg-white px-7 py-8 sm:px-10 lg:px-12">

            <div className="w-full max-w-[760px]">

              {/* Heading */}

              <div className="text-center">

                <h1 className="text-4xl font-extrabold text-[#07132e]">
                  Create an Account
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                  Fill in your details to get started
                </p>

              </div>


              {/* =================================================
                  ROLE SELECTION
              ================================================= */}

              <div className="mt-8 rounded-xl border border-gray-200 p-3">

                <p className="mb-3 text-xs font-semibold text-gray-800">
                  I am registering as
                </p>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">

                  {roles.map((role) => {

                    const Icon = role.icon;

                    const selected =
                      selectedRole === role.name;

                    return (

                      <button
                        key={role.name}
                        type="button"
                        onClick={() =>
                          setSelectedRole(role.name)
                        }
                        className={`relative flex min-h-[95px] flex-col items-center justify-center rounded-lg border px-2 py-3 transition ${
                          selected
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >

                        <Icon
                          size={28}
                          className={
                            selected
                              ? "text-blue-700"
                              : role.color
                          }
                        />

                        <span
                          className={`mt-2 text-xs font-semibold ${
                            selected
                              ? "text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {role.name}
                        </span>

                        {selected && (

                          <span className="absolute right-2 top-2 h-4 w-4 rounded-full border-2 border-blue-600 bg-white">

                            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600" />

                          </span>

                        )}

                      </button>

                    );
                  })}

                </div>

              </div>


              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2"
              >

                {selectedRole !== "Company" && (
                  <InputField
                    id="name"
                    label="Full Name"
                    icon={<User size={19} />}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}


                {/* EMAIL */}

                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  icon={<Mail size={19} />}
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />


                {/* =================================================
                    STUDENT FIELDS
                ================================================= */}

                {selectedRole === "Student" && (
                  <>

                    <InputField
                      id="rollNumber"
                      label="Roll Number"
                      icon={<Hash size={19} />}
                      placeholder="Enter your roll number"
                      value={formData.rollNumber}
                      onChange={handleChange}
                    />

                    <InputField
                      id="department"
                      label="Department"
                      icon={<School size={19} />}
                      placeholder="e.g. BCA Science"
                      value={formData.department}
                      onChange={handleChange}
                    />

                    <InputField
                      id="cgpa"
                      label="CGPA"
                      type="number"
                      icon={<BookOpen size={19} />}
                      placeholder="Enter your CGPA"
                      value={formData.cgpa}
                      onChange={handleChange}
                    />

                    <InputField
                      id="mobile"
                      label="Contact Number"
                      type="tel"
                      icon={<Phone size={19} />}
                      placeholder="Enter your contact number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />

                  </>
                )}


                {/* =================================================
                    FACULTY FIELDS
                ================================================= */}

                {selectedRole === "Faculty" && (
                  <>

                    <InputField
                      id="mobile"
                      label="Contact Number"
                      type="tel"
                      icon={<Phone size={19} />}
                      placeholder="Enter your contact number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />

                    <InputField
                      id="department"
                      label="Department"
                      icon={<School size={19} />}
                      placeholder="Enter department"
                      value={formData.department}
                      onChange={handleChange}
                    />

                  </>
                )}


                {/* =================================================
                    COLLEGE COORDINATOR
                ================================================= */}

                {selectedRole === "College Coordinator" && (
                  <>

                    <InputField
                      id="department"
                      label="Department"
                      icon={<School size={19} />}
                      placeholder="Enter department"
                      value={formData.department}
                      onChange={handleChange}
                    />

                    <InputField
                      id="mobile"
                      label="Contact Number"
                      type="tel"
                      icon={<Phone size={19} />}
                      placeholder="Enter contact number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />

                  </>
                )}

                  {/* =================================================
    COMPANY
================================================= */}

{selectedRole === "Company" && (
  <>
    <InputField
      id="companyName"
      label="Company Name"
      icon={<Building2 size={19} />}
      placeholder="Enter company name"
      value={formData.companyName}
      onChange={handleChange}
    />

    <InputField
      id="industry"
      label="Industry"
      icon={<BriefcaseBusiness size={19} />}
      placeholder="e.g. Information Technology"
      value={formData.industry}
      onChange={handleChange}
    />

    <InputField
      id="website"
      label="Company Website"
      type="url"
      icon={<Building2 size={19} />}
      placeholder="https://example.com"
      value={formData.website}
      onChange={handleChange}
    />

  </>
)}

<div>
  <label
    htmlFor="companyPhone"
    className="mb-2 block text-xs font-semibold text-gray-800"
  >
    Company Phone Number
  </label>

  <input
    id="companyPhone"
    type="tel"
    value={formData.companyPhone}
    onChange={handleChange}
    className="h-[52px] w-full rounded-lg border border-gray-200 bg-white px-4 text-xs text-gray-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
    placeholder="Enter company phone number"
    required
  />
</div>
                {/* =================================================
                    COMPANY COORDINATOR
                ================================================= */}

                {selectedRole === "Company Coordinator" && (
                  <>

                    <InputField
                      id="mobile"
                      label="Contact Number"
                      type="tel"
                      icon={<Phone size={19} />}
                      placeholder="Enter contact number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />

                  </>
                )}


                {/* =================================================
                    PASSWORD
                ================================================= */}

                <PasswordField
                  id="password"
                  label="Password"
                  valueType={showPassword}
                  setValueType={() =>
                    setShowPassword(!showPassword)
                  }
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />


                {/* CONFIRM PASSWORD */}

                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  valueType={showConfirm}
                  setValueType={() =>
                    setShowConfirm(!showConfirm)
                  }
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />


    

                {/* DATE OF BIRTH / DATE OF ESTABLISHMENT */}

<div>

  <label
    htmlFor={
      selectedRole === "Company"
        ? "dateOfEstablishment"
        : "dob"
    }
    className="mb-2 block text-xs font-semibold text-gray-800"
  >
    {selectedRole === "Company"
      ? "Date of Establishment"
      : "Date of Birth"}
  </label>

  <div className="relative">

    <CalendarDays
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
    />

    <input
      id={
        selectedRole === "Company"
          ? "dateOfEstablishment"
          : "dob"
      }
      type="date"
      value={
        selectedRole === "Company"
          ? formData.dateOfEstablishment
          : formData.dob
      }
      onChange={handleChange}
      className="h-[52px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-xs text-gray-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      required
    />

  </div>

</div>


                {/* ADDRESS */}

                <div className="sm:col-span-2">

                  <label
                    htmlFor="address"
                    className="mb-2 block text-xs font-semibold text-gray-800"
                  >
                    Address
                  </label>

                  <div className="relative">

                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      required
                    />

                  </div>

                </div>


                {/* ERROR */}

                {error && (

                  <div className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>

                )}


                {/* TERMS */}

                <div className="sm:col-span-2">

                  <label className="flex items-center gap-2 text-xs text-gray-600">

                    <input
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
                    />

                    <span>

                      I agree to the{" "}

                      <button
                        type="button"
                        className="font-semibold text-blue-700"
                      >
                        Terms & Conditions
                      </button>{" "}

                      and{" "}

                      <button
                        type="button"
                        className="font-semibold text-blue-700"
                      >
                        Privacy Policy
                      </button>

                    </span>

                  </label>

                </div>


                {/* CREATE ACCOUNT */}

                <div className="sm:col-span-2">

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-[53px] w-full items-center justify-center gap-2 rounded-lg bg-blue-700 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    <UserPlus size={19} />

                    {loading
                      ? "Creating Account..."
                      : "Create Account"}

                  </button>

                </div>

              </form>


              {/* OR */}

              <div className="my-4 flex items-center gap-4">

                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-500">
                  or
                </span>

                <div className="h-px flex-1 bg-gray-200" />

              </div>


              {/* GOOGLE */}

              <button
                type="button"
                className="flex h-[50px] w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >

                <span className="text-lg font-bold text-blue-600">
                  
                </span>

                Continue with Google

              </button>


              {/* LOGIN */}

              <p className="mt-4 text-center text-xs text-gray-600">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-blue-700 hover:text-blue-800"
                >
                  Sign In Here
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =============================================================
   INPUT FIELD
============================================================= */

function InputField({
  id,
  label,
  type = "text",
  icon,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-gray-800"
      >
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>

        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="h-[52px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

      </div>

    </div>
  );
}


/* =============================================================
   PASSWORD FIELD
============================================================= */

function PasswordField({
  id,
  label,
  valueType,
  setValueType,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-gray-800"
      >
        {label}
      </label>

      <div className="relative">

        <LockKeyhole
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          id={id}
          name={id}
          type={valueType ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="h-[52px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-11 text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={setValueType}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        >

          {valueType ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}

        </button>

      </div>

    </div>
  );
}


/* =============================================================
   BELL ICON
============================================================= */

function BellIcon(props) {
  return <span {...props}>🔔</span>;
}


export default Register;