import { useState } from "react";
import { Plus, Download } from "lucide-react";

import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";
import CertificateStats from "../../components/company/CertificateStats";
import CertificateFilters from "../../components/company/CertificateFilters";
import CertificateTable from "../../components/company/CertificateTable";
import CertificatePreview from "../../components/company/CertificatePreview";

export default function Certificate() {

  const [selectedStudent, setSelectedStudent] = useState({
    initials: "RS",
    color: "bg-pink-100 text-pink-700",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "Web Development Intern",
    dept: "Computer Science",
    date: "15 Jul 2025",
    id: "CERT-2025-0001",
    status: "Issued",
  });

  const [showGeneratePopup, setShowGeneratePopup] = useState(false);

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
                type="button"
                onClick={() => setShowGeneratePopup(true)}
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
                type="button"
                onClick={() => {
                  alert("Certificate report exported successfully.");
                }}
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


              {/* FILTER CARD */}

              <div className="mt-4">

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

                <CertificateTable
                  onSelectStudent={setSelectedStudent}
                />

              </div>

            </div>


            {/* ================= RIGHT SIDE ================= */}

            <div className="w-[285px] shrink-0">

              <CertificatePreview
                student={selectedStudent}
              />

            </div>

          </div>

        </main>


        {/* FOOTER */}

        <CompanyFooter />

      </div>


      {/* ================= GENERATE POPUP ================= */}

      {showGeneratePopup && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
          "
        >

          <div
            className="
              bg-white
              w-[400px]
              rounded-[12px]
              shadow-xl
              p-6
            "
          >

            <h2 className="text-[17px] font-semibold text-[#111827]">
              Generate Certificate
            </h2>

            <p className="text-[11px] text-[#64748B] mt-1 mb-5">
              Select a student to generate a certificate.
            </p>


            <label className="block text-[10px] font-medium text-[#374151] mb-1.5">
              Student
            </label>

            <select
              className="
                w-full
                h-[38px]
                border
                border-[#E5E7EB]
                rounded-[8px]
                px-3
                text-[11px]
                outline-none
                focus:border-[#1E5EFF]
              "
            >
              <option>Rahul Sharma</option>
              <option>Priya Patel</option>
              <option>Aniket Singh</option>
              <option>Sneha Verma</option>
            </select>


            <div className="flex justify-end gap-2 mt-6">

              <button
                type="button"
                onClick={() => setShowGeneratePopup(false)}
                className="
                  h-[36px]
                  px-4
                  border
                  border-[#E5E7EB]
                  rounded-[8px]
                  text-[10px]
                  font-medium
                  text-[#374151]
                "
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={() => {
                  alert("Certificate generated successfully.");
                  setShowGeneratePopup(false);
                }}
                className="
                  h-[36px]
                  px-4
                  rounded-[8px]
                  bg-[#1E5EFF]
                  text-white
                  text-[10px]
                  font-medium
                "
              >
                Generate
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}