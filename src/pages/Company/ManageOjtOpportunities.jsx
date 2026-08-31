import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";

import OpportunityFilters from "../../components/company/OpportunityFilters";
import OpportunityTable from "../../components/company/OpportunityTable";
import OpportunityForm from "../../components/company/OpportunityForm";

export default function ManageOjtOpportunities() {
  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">

      {/* SIDEBAR */}
      <CompanySidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* HEADER */}
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


            {/* ADD NEW OPPORTUNITY */}

            <button
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


          {/* ================= MAIN TWO COLUMN AREA ================= */}

          <div className="flex gap-4 items-stretch">


            {/* ================= LEFT MAIN CARD ================= */}

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

              {/* CARD HEADING */}

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
                <OpportunityFilters />
              </div>


              {/* TABLE */}

              <OpportunityTable />

            </div>


            {/* ================= RIGHT FORM ================= */}

            <OpportunityForm />

          </div>

        </main>


        {/* FOOTER */}

        <CompanyFooter />

      </div>

    </div>
  );
}