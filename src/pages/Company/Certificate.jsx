import { Plus, Download } from "lucide-react";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";
import CertificateStats from "../../components/company/CertificateStats";
import CertificateFilters from "../../components/company/CertificateFilters";
import CertificateTable from "../../components/company/CertificateTable";
import CertificatePreview from "../../components/company/CertificatePreview";

export default function Certificate() {
  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">

      {/* SIDEBAR */}
      <CompanySidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* HEADER */}
        <CompanyHeader />

        {/* MAIN CONTENT */}
        <main className="flex-1 px-5 py-5">

          {/* PAGE HEADER */}

          <div className="flex items-start justify-between mb-5">

            <div>
              <h1 className="text-[25px] font-bold text-[#111827]">
                Certificate
              </h1>

              <p className="text-[11px] text-[#6B7280] mt-1">
                Generate and manage certificates for students who completed their OJT internship.
              </p>
            </div>


            {/* TOP BUTTONS */}

            <div className="flex items-center gap-3">

              <button
                className="
                  h-[38px]
                  px-4
                  rounded-[8px]
                  bg-[#1E5EFF]
                  text-white
                  text-[11px]
                  font-medium
                  flex
                  items-center
                  gap-2
                  hover:bg-[#174dcc]
                "
              >
                <Plus size={14} />
                Generate Certificate
              </button>

              <button
                className="
                  h-[38px]
                  px-4
                  rounded-[8px]
                  border
                  border-[#E5E7EB]
                  bg-white
                  text-[#374151]
                  text-[11px]
                  font-medium
                  flex
                  items-center
                  gap-2
                  hover:bg-[#F8FAFC]
                "
              >
                <Download size={14} />
                Export Report
              </button>

            </div>

          </div>


          {/* ================= MAIN LAYOUT ================= */}

          <div className="flex items-start gap-4 w-full">

            {/* ================= LEFT SIDE ================= */}

            <div className="flex-1 min-w-0">

              {/* STATS */}

              <CertificateStats />


              {/* SPACE */}

              <div className="mt-4">

                {/* FILTER CARD */}

                <div
                  className="
                    bg-white
                    border
                    border-[#E5E7EB]
                    rounded-[10px]
                    px-4
                    py-3
                  "
                >
                  <CertificateFilters />
                </div>

              </div>


              {/* TABLE */}

              <div className="mt-4">

                <CertificateTable />

              </div>

            </div>


            {/* ================= RIGHT SIDE ================= */}

            <div className="w-[285px] shrink-0">

              <CertificatePreview />

            </div>

          </div>

        </main>


        {/* FOOTER */}

        <CompanyFooter />

      </div>

    </div>
  );
}