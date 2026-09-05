import { useState } from "react";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";

import OpportunityFilters from "../../components/company/OpportunityFilters";
import OpportunityTable from "../../components/company/OpportunityTable";
import OpportunityForm from "../../components/company/OpportunityForm";


/* ================= INITIAL OPPORTUNITIES ================= */

const initialOpportunities = [
  {
    id: 1,
    title: "Web Development Intern",
    description: "Build and maintain web apps",
    department: "Computer Science",
    duration: "2 Months",
    location: "Pune (Hybrid)",
    stipend: "₹9,000 / month",
    vacancies: "5",
    lastDate: "31/07/2025",
    skills: ["HTML", "CSS", "JavaScript", "React.js"],
    eligibility: "e.g. BCA, MCA, B.Tech, Any Graduate",
    status: "Active",
    posted: "15 Jul 2025",
  },

  {
    id: 2,
    title: "Data Science Intern",
    description: "Work on ML and data projects",
    department: "Data Science",
    duration: "3 Months",
    location: "Pune (On-site)",
    stipend: "₹10,000 / month",
    vacancies: "4",
    lastDate: "05/08/2025",
    skills: ["Python", "Pandas", "Machine Learning"],
    eligibility: "BCA, BSc, B.Tech, Any Graduate",
    status: "Active",
    posted: "12 Jul 2025",
  },

  {
    id: 3,
    title: "UI/UX Design Intern",
    description: "Design user interfaces",
    department: "IT / Design",
    duration: "2 Months",
    location: "Remote",
    stipend: "₹7,000 / month",
    vacancies: "3",
    lastDate: "10/08/2025",
    skills: ["Figma", "UI Design", "UX"],
    eligibility: "Any Design Graduate",
    status: "Active",
    posted: "10 Jul 2025",
  },

  {
    id: 4,
    title: "Android App Developer",
    description: "Develop Android applications",
    department: "Computer Science",
    duration: "3 Months",
    location: "Pune (Hybrid)",
    stipend: "₹9,000 / month",
    vacancies: "5",
    lastDate: "15/08/2025",
    skills: ["Java", "Android", "XML"],
    eligibility: "BCA, BSc CS, B.Tech",
    status: "Draft",
    posted: "08 Jul 2025",
  },

  {
    id: 5,
    title: "Digital Marketing Intern",
    description: "Social media & marketing tasks",
    department: "Marketing",
    duration: "2 Months",
    location: "Remote",
    stipend: "₹6,000 / month",
    vacancies: "2",
    lastDate: "20/08/2025",
    skills: ["SEO", "Social Media", "Content"],
    eligibility: "Any Graduate",
    status: "Closed",
    posted: "05 Jul 2025",
  },

  {
    id: 6,
    title: "Cybersecurity Intern",
    description: "Security analysis & testing",
    department: "Information Tech.",
    duration: "3 Months",
    location: "Pune (On-site)",
    stipend: "₹9,000 / month",
    vacancies: "4",
    lastDate: "25/08/2025",
    skills: ["Networking", "Security", "Linux"],
    eligibility: "BCA, BSc CS, B.Tech",
    status: "Active",
    posted: "01 Jul 2025",
  },

  {
    id: 7,
    title: "Frontend Developer Intern",
    description: "React, HTML, CSS, JS",
    department: "Computer Science",
    duration: "2 Months",
    location: "Remote",
    stipend: "₹7,500 / month",
    vacancies: "3",
    lastDate: "28/08/2025",
    skills: ["React.js", "HTML", "CSS", "JavaScript"],
    eligibility: "BCA, BSc CS, B.Tech",
    status: "Active",
    posted: "28 Jun 2025",
  },

  {
    id: 8,
    title: "Business Analyst Intern",
    description: "Work on business analysis",
    department: "Management",
    duration: "2 Months",
    location: "Pune (Hybrid)",
    stipend: "₹7,000 / month",
    vacancies: "2",
    lastDate: "30/08/2025",
    skills: ["Excel", "Analysis", "Documentation"],
    eligibility: "BBA, BCA, Any Graduate",
    status: "Closed",
    posted: "25 Jun 2025",
  },
];


export default function ManageOjtOpportunities() {

  /* ================= STATES ================= */

  const [opportunities, setOpportunities] = useState(
    initialOpportunities
  );

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState(
    "All Departments"
  );

  const [status, setStatus] = useState(
    "All Status"
  );

  const [duration, setDuration] = useState(
    "All Duration"
  );

  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);

  const [viewOpportunity, setViewOpportunity] =
    useState(null);


  /* ================= FILTER ================= */

  const filteredOpportunities = opportunities.filter(
    (item) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.skills.join(" ").toLowerCase().includes(searchText);

      const matchesDepartment =
        department === "All Departments" ||
        item.department === department;

      const matchesStatus =
        status === "All Status" ||
        item.status === status;

      const matchesDuration =
        duration === "All Duration" ||
        item.duration === duration;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesDuration
      );
    }
  );


  /* ================= ADD ================= */

  const handleAdd = () => {

    setSelectedOpportunity({
      id: null,
      title: "",
      description: "",
      department: "Computer Science",
      duration: "2 Months",
      location: "Pune (Hybrid)",
      stipend: "",
      vacancies: "",
      lastDate: "",
      skills: ["HTML", "CSS"],
      eligibility: "",
      status: "Draft",
      posted: "15 Aug 2026",
    });

  };


  /* ================= EDIT ================= */

  const handleEdit = (opportunity) => {

    setSelectedOpportunity({
      ...opportunity
    });

  };


  /* ================= VIEW ================= */

  const handleView = (opportunity) => {

    setViewOpportunity(opportunity);

  };


  /* ================= DELETE ================= */

  const handleDelete = (opportunity) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${opportunity.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setOpportunities((previous) =>
      previous.filter(
        (item) => item.id !== opportunity.id
      )
    );

    window.alert("Opportunity deleted successfully.");

    if (
      selectedOpportunity &&
      selectedOpportunity.id === opportunity.id
    ) {
      setSelectedOpportunity(null);
    }

  };


  /* ================= SAVE ================= */

  const handleSave = (formData) => {

    if (!formData.title.trim()) {
      window.alert("Please enter opportunity title.");
      return;
    }

    if (!formData.description.trim()) {
      window.alert("Please enter description.");
      return;
    }

    /* EDIT EXISTING */

    if (formData.id) {

      setOpportunities((previous) =>
        previous.map((item) =>
          item.id === formData.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

      window.alert(
        "Opportunity updated successfully."
      );

    }

    /* ADD NEW */

    else {

      const newOpportunity = {
        ...formData,
        id: Date.now(),
        posted: "15 Aug 2026",
      };

      setOpportunities((previous) => [
        newOpportunity,
        ...previous,
      ]);

      window.alert(
        "Opportunity added successfully."
      );

    }

    setSelectedOpportunity(null);

  };


  /* ================= CANCEL ================= */

  const handleCancel = () => {

    setSelectedOpportunity(null);

  };


  /* ================= RESET FILTERS ================= */

  const handleReset = () => {

    setSearch("");
    setDepartment("All Departments");
    setStatus("All Status");
    setDuration("All Duration");

  };


  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">

      {/* SIDEBAR */}

      <CompanySidebar />


      {/* RIGHT SIDE */}

      <div className="flex-1 min-w-0 flex flex-col">

        <CompanyHeader />


        {/* MAIN */}

        <main className="flex-1 px-5 py-6">

          {/* ================= PAGE HEADER ================= */}

          <div className="flex items-center justify-between mb-5">

            <div>

              <h1 className="text-[26px] font-bold text-[#111827]">
                Manage OJT Opportunities
              </h1>

              <p className="text-[12px] text-[#6B7280] mt-1">

                <span className="font-semibold text-[#1E5EFF]">
                  Dashboard
                </span>

                <span className="mx-2 text-[#9CA3AF]">
                  ›
                </span>

                <span>
                  Manage OJT Opportunities
                </span>

              </p>

            </div>


            {/* ADD BUTTON */}

            <button
              type="button"
              onClick={handleAdd}
              className="
                h-[38px]
                px-4
                rounded-[9px]
                bg-[#1E5EFF]
                text-white
                text-[11px]
                font-medium
                hover:bg-[#174dcc]
                transition-colors
              "
            >
              + Add New Opportunity
            </button>

          </div>


          {/* ================= MAIN AREA ================= */}

          <div className="flex gap-4 items-stretch">


            {/* ================= LEFT ================= */}

            <div
              className="
                flex-1
                min-w-0
                bg-white
                rounded-[14px]
                border
                border-[#E5E7EB]
                p-4
              "
            >

              <div className="mb-4">

                <h2 className="text-[16px] font-semibold text-[#0B3091]">
                  OJT Opportunities
                </h2>

                <p className="text-[10px] text-[#64748B] mt-1">
                  Add, edit, update or delete OJT opportunities posted by your company.
                </p>

              </div>


              {/* FILTERS */}

              <div className="mb-4">

                <OpportunityFilters
                  search={search}
                  setSearch={setSearch}
                  department={department}
                  setDepartment={setDepartment}
                  status={status}
                  setStatus={setStatus}
                  duration={duration}
                  setDuration={setDuration}
                  onReset={handleReset}
                />

              </div>


              {/* TABLE */}

              <OpportunityTable
                opportunities={filteredOpportunities}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
              />

            </div>


            {/* ================= RIGHT FORM ================= */}

            <OpportunityForm
              opportunity={selectedOpportunity}
              onSave={handleSave}
              onCancel={handleCancel}
            />

          </div>

        </main>


        <CompanyFooter />

      </div>


      {/* ================= VIEW POPUP ================= */}

      {viewOpportunity && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
            p-5
          "
        >

          <div
            className="
              bg-white
              w-[500px]
              max-h-[80vh]
              overflow-y-auto
              rounded-[16px]
              shadow-xl
              p-6
            "
          >

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-[20px] font-bold text-[#0B3091]">
                Opportunity Details
              </h2>

              <button
                type="button"
                onClick={() => setViewOpportunity(null)}
                className="text-[#64748B] text-xl"
              >
                ×
              </button>

            </div>


            <div className="space-y-3 text-[12px]">

              <Detail
                label="Opportunity Title"
                value={viewOpportunity.title}
              />

              <Detail
                label="Department"
                value={viewOpportunity.department}
              />

              <Detail
                label="Duration"
                value={viewOpportunity.duration}
              />

              <Detail
                label="Location"
                value={viewOpportunity.location}
              />

              <Detail
                label="Stipend"
                value={viewOpportunity.stipend}
              />

              <Detail
                label="Vacancies"
                value={viewOpportunity.vacancies}
              />

              <Detail
                label="Last Date to Apply"
                value={viewOpportunity.lastDate}
              />

              <Detail
                label="Status"
                value={viewOpportunity.status}
              />

              <Detail
                label="Description"
                value={viewOpportunity.description}
              />

              <Detail
                label="Eligibility Criteria"
                value={viewOpportunity.eligibility}
              />

              <Detail
                label="Required Skills"
                value={viewOpportunity.skills.join(", ")}
              />

            </div>


            <button
              type="button"
              onClick={() => setViewOpportunity(null)}
              className="
                mt-5
                w-full
                h-[40px]
                rounded-[8px]
                bg-[#1E5EFF]
                text-white
                text-[12px]
                font-medium
              "
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================= DETAIL ================= */

function Detail({ label, value }) {

  return (
    <div>

      <p className="font-semibold text-[#111827]">
        {label}
      </p>

      <p className="text-[#64748B] mt-1">
        {value || "-"}
      </p>

    </div>
  );
}