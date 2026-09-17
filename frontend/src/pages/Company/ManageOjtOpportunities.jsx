import { useEffect, useState } from "react";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";

import OpportunityFilters from "../../components/company/OpportunityFilters";
import OpportunityTable from "../../components/company/OpportunityTable";
import OpportunityForm from "../../components/company/OpportunityForm";

/*
  TEMPORARY COMPANY ID

  We are using C001 for now because your current logged-in user
  does not yet have a matching CompanyCoordinator record.

  Later this can be replaced with the actual logged-in company ID.
*/
const COMPANY_ID = "C001";


// =====================================================
// Convert MongoDB opportunity → UI opportunity
// =====================================================

const convertToUI = (item) => {
  return {
    id: item._id,

    title: item.title || "",

    description: item.description || "",

    department: item.department || "Computer Science",

    duration: item.duration || "2 Months",

    location: item.location || "Pune (Hybrid)",

    stipend:
      item.stipend !== undefined &&
      item.stipend !== null &&
      item.stipend !== 0
        ? `₹${Number(item.stipend).toLocaleString("en-IN")} / month`
        : "",

    vacancies:
      item.vacancies !== undefined &&
      item.vacancies !== null
        ? String(item.vacancies)
        : "",

    lastDate: item.lastDate || "",

    skills: item.skillsRequired
      ? item.skillsRequired
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : ["HTML", "CSS"],

    eligibility: item.eligibility || "",

    status: item.status || "Draft",

    posted: item.postedOn || "",

    companyId: item.companyId || COMPANY_ID,

    createdByCoordinatorId:
      item.createdByCoordinatorId || "",
  };
};


// =====================================================
// Convert UI opportunity → MongoDB opportunity
// =====================================================

const convertToMongo = (formData) => {
  let stipendValue = 0;

  if (formData.stipend) {
    const cleanedStipend = String(formData.stipend)
      .replace(/[₹,\s]/g, "")
      .replace("/month", "");

    stipendValue = Number(cleanedStipend) || 0;
  }

  const skillsValue = Array.isArray(formData.skills)
    ? formData.skills.join(", ")
    : formData.skills || "";

  return {
    companyId: COMPANY_ID,

    createdByCoordinatorId:
      formData.createdByCoordinatorId || "",

    title: formData.title || "",

    description: formData.description || "",

    department: formData.department || "",

    duration: formData.duration || "",

    location: formData.location || "",

    stipend: stipendValue,

    vacancies:
      formData.vacancies === "" ||
      formData.vacancies === null ||
      formData.vacancies === undefined
        ? 0
        : Number(formData.vacancies),

    lastDate: formData.lastDate || "",

    skillsRequired: skillsValue,

    eligibility: formData.eligibility || "",

    /*
      The form does not currently have an isPaid field.
      We derive it from whether a stipend is entered.
    */
    isPaid: stipendValue > 0,

    status: formData.status || "Draft",

    postedOn:
      formData.postedOn ||
      new Date().toISOString().split("T")[0],
  };
};


export default function ManageOjtOpportunities() {

  // =====================================================
  // STATES
  // =====================================================

  const [opportunities, setOpportunities] = useState([]);

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


  // =====================================================
  // LOAD OPPORTUNITIES FROM MONGODB
  // =====================================================

  useEffect(() => {

    const fetchOpportunities = async () => {

      try {

        const response = await fetch(
          `http://localhost:5000/api/opportunities/company/${COMPANY_ID}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch opportunities"
          );
        }

        const data = await response.json();

        if (data.success) {

          const uiOpportunities =
            data.opportunities.map(convertToUI);

          setOpportunities(uiOpportunities);

        }

      } catch (error) {

        console.error(
          "Failed to load opportunities:",
          error
        );

        window.alert(
          "Failed to load opportunities from database."
        );

      }

    };

    fetchOpportunities();

  }, []);


  // =====================================================
  // FILTER
  // =====================================================

  const filteredOpportunities =
    opportunities.filter((item) => {

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

    });


  // =====================================================
  // ADD
  // =====================================================

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

      posted: new Date()
        .toISOString()
        .split("T")[0],

    });

  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (opportunity) => {

    setSelectedOpportunity({
      ...opportunity,
    });

  };


  // =====================================================
  // VIEW
  // =====================================================

  const handleView = (opportunity) => {

    setViewOpportunity(opportunity);

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (opportunity) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${opportunity.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/opportunities/${opportunity.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "Failed to delete opportunity"
        );
      }

      setOpportunities((previous) =>
        previous.filter(
          (item) =>
            item.id !== opportunity.id
        )
      );

      window.alert(
        "Opportunity deleted successfully."
      );

      if (
        selectedOpportunity &&
        selectedOpportunity.id === opportunity.id
      ) {
        setSelectedOpportunity(null);
      }

    } catch (error) {

      console.error(
        "Delete Opportunity Error:",
        error
      );

      window.alert(
        "Failed to delete opportunity."
      );

    }

  };


  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async (formData) => {

    if (!formData.title.trim()) {

      window.alert(
        "Please enter opportunity title."
      );

      return;
    }

    if (!formData.description.trim()) {

      window.alert(
        "Please enter description."
      );

      return;
    }


    // ---------------------------------------------------
    // Convert UI data to MongoDB format
    // ---------------------------------------------------

    const mongoData =
      convertToMongo(formData);


    try {

      // =================================================
      // EDIT EXISTING
      // =================================================

      if (formData.id) {

        const response = await fetch(
          `http://localhost:5000/api/opportunities/${formData.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              mongoData
            ),
          }
        );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
            "Failed to update opportunity"
          );
        }


        // Convert saved MongoDB data
        // back to UI format

        const updatedOpportunity =
          convertToUI(
            data.opportunity
          );


        setOpportunities(
          (previous) =>
            previous.map((item) =>
              item.id === formData.id
                ? updatedOpportunity
                : item
            )
        );


        window.alert(
          "Opportunity updated successfully."
        );

      }


      // =================================================
      // ADD NEW
      // =================================================

      else {

        const response = await fetch(
          "http://localhost:5000/api/opportunities/",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              mongoData
            ),
          }
        );


        const data =
          await response.json();


        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
            "Failed to add opportunity"
          );
        }


        // Convert saved MongoDB data
        // back to UI format

        const newOpportunity =
          convertToUI(
            data.opportunity
          );


        setOpportunities(
          (previous) => [
            newOpportunity,
            ...previous,
          ]
        );


        window.alert(
          "Opportunity added successfully."
        );

      }


      setSelectedOpportunity(null);

    } catch (error) {

      console.error(
        "Save Opportunity Error:",
        error
      );

      window.alert(
        error.message ||
        "Failed to save opportunity."
      );

    }

  };


  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {

    setSelectedOpportunity(null);

  };


  // =====================================================
  // RESET FILTERS
  // =====================================================

  const handleReset = () => {

    setSearch("");

    setDepartment(
      "All Departments"
    );

    setStatus(
      "All Status"
    );

    setDuration(
      "All Duration"
    );

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="flex min-h-screen w-full bg-[#F8FAFC]">

      {/* SIDEBAR */}

      <CompanySidebar />


      {/* RIGHT SIDE */}

      <div className="flex-1 min-w-0 flex flex-col">

        <CompanyHeader />


        {/* MAIN */}

        <main className="flex-1 px-5 py-6">

          {/* PAGE HEADER */}

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


          {/* MAIN AREA */}

          <div className="flex gap-4 items-stretch">


            {/* LEFT */}

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
                opportunities={
                  filteredOpportunities
                }
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
              />

            </div>


            {/* RIGHT FORM */}

            <OpportunityForm
              opportunity={
                selectedOpportunity
              }
              onSave={handleSave}
              onCancel={handleCancel}
            />

          </div>

        </main>


        <CompanyFooter />

      </div>


      {/* VIEW POPUP */}

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
                onClick={() =>
                  setViewOpportunity(null)
                }
                className="text-[#64748B] text-xl"
              >
                ×
              </button>

            </div>


            <div className="space-y-3 text-[12px]">

              <Detail
                label="Opportunity Title"
                value={
                  viewOpportunity.title
                }
              />

              <Detail
                label="Department"
                value={
                  viewOpportunity.department
                }
              />

              <Detail
                label="Duration"
                value={
                  viewOpportunity.duration
                }
              />

              <Detail
                label="Location"
                value={
                  viewOpportunity.location
                }
              />

              <Detail
                label="Stipend"
                value={
                  viewOpportunity.stipend
                }
              />

              <Detail
                label="Vacancies"
                value={
                  viewOpportunity.vacancies
                }
              />

              <Detail
                label="Last Date to Apply"
                value={
                  viewOpportunity.lastDate
                }
              />

              <Detail
                label="Status"
                value={
                  viewOpportunity.status
                }
              />

              <Detail
                label="Description"
                value={
                  viewOpportunity.description
                }
              />

              <Detail
                label="Eligibility Criteria"
                value={
                  viewOpportunity.eligibility
                }
              />

              <Detail
                label="Required Skills"
                value={
                  viewOpportunity.skills.join(
                    ", "
                  )
                }
              />

            </div>


            <button
              type="button"
              onClick={() =>
                setViewOpportunity(null)
              }
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


// =====================================================
// DETAIL
// =====================================================

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