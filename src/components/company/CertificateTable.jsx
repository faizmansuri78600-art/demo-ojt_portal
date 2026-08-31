import { useState } from "react";
import {
  Eye,
  Download,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const students = [
  {
    initials: "RS",
    color: "bg-pink-100 text-pink-700",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "Web Development Intern",
    dept: "Computer Science",
    date: "15 Jul 2025",
    id: "CERT-2025-0001",
    status: "Issued",
  },
  {
    initials: "PP",
    color: "bg-green-100 text-green-700",
    name: "Priya Patel",
    email: "priya21@gmail.com",
    role: "Data Science Intern",
    dept: "Data Science",
    date: "14 Jul 2025",
    id: "CERT-2025-0002",
    status: "Issued",
  },
  {
    initials: "AS",
    color: "bg-purple-100 text-purple-700",
    name: "Aniket Singh",
    email: "aniket@gmail.com",
    role: "UI/UX Design Intern",
    dept: "IT / Design",
    date: "12 Jul 2025",
    id: "CERT-2025-0003",
    status: "Issued",
  },
  {
    initials: "SV",
    color: "bg-pink-100 text-pink-700",
    name: "Sneha Verma",
    email: "sneha.verma@gmail.com",
    role: "Web Development Intern",
    dept: "Computer Science",
    date: "10 Jul 2025",
    id: "CERT-2025-0004",
    status: "Issued",
  },
  {
    initials: "AG",
    color: "bg-orange-100 text-orange-700",
    name: "Aman Gupta",
    email: "aman.gupta@gmail.com",
    role: "Data Analyst Intern",
    dept: "Data Science",
    date: "09 Jul 2025",
    id: "CERT-2025-0005",
    status: "Issued",
  },
  {
    initials: "NK",
    color: "bg-blue-100 text-blue-700",
    name: "Neha Kulkarni",
    email: "neha.k@gmail.com",
    role: "Android Developer Intern",
    dept: "Computer Science",
    date: "-",
    id: "-",
    status: "Pending",
  },
  {
    initials: "VP",
    color: "bg-purple-100 text-purple-700",
    name: "Vikram Purohit",
    email: "vikram.p@gmail.com",
    role: "Cybersecurity Intern",
    dept: "Information Tech.",
    date: "-",
    id: "-",
    status: "Pending",
  },
  {
    initials: "MB",
    color: "bg-pink-100 text-pink-700",
    name: "Megha Bansal",
    email: "megha.b@gmail.com",
    role: "Digital Marketing Intern",
    dept: "Marketing",
    date: "-",
    id: "-",
    status: "Pending",
  },
];

const statusStyles = {
  Issued: "bg-green-50 text-green-700",
  Pending: "bg-orange-50 text-orange-700",
};

export default function CertificateTable() {
  const [tab, setTab] = useState("list");

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">

      {/* TABS */}

      <div className="flex items-center gap-6 px-5 border-b border-[#E5E7EB]">

        <button
          onClick={() => setTab("list")}
          className={`text-[12px] font-semibold py-3 border-b-2 ${
            tab === "list"
              ? "text-[#1E5EFF] border-[#1E5EFF]"
              : "text-[#6B7280] border-transparent"
          }`}
        >
          Certificate List
        </button>

        <button
          onClick={() => setTab("templates")}
          className={`text-[12px] font-semibold py-3 border-b-2 ${
            tab === "templates"
              ? "text-[#1E5EFF] border-[#1E5EFF]"
              : "text-[#6B7280] border-transparent"
          }`}
        >
          Certificate Templates
        </button>

      </div>


      {tab === "list" ? (
        <>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b border-[#E5E7EB]">

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    Student Name
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    Internship / Opportunity
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    Department
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    Completion Date
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    Certificate ID
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-medium text-[#64748B]">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {students.map((student, index) => (

                  <tr
                    key={student.email}
                    className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]"
                  >

                    {/* NUMBER */}

                    <td className="px-4 py-3.5 text-[11px] text-[#64748B]">
                      {index + 1}
                    </td>


                    {/* STUDENT */}

                    <td className="px-4 py-3.5">

                      <div className="flex items-center gap-3">

                        <span
                          className={`
                            w-8
                            h-8
                            rounded-full
                            flex
                            items-center
                            justify-center
                            text-[10px]
                            font-bold
                            shrink-0
                            ${student.color}
                          `}
                        >
                          {student.initials}
                        </span>

                        <div>

                          <p className="text-[11px] font-semibold text-[#111827] whitespace-nowrap">
                            {student.name}
                          </p>

                          <p className="text-[9px] text-[#9CA3AF] whitespace-nowrap">
                            {student.email}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* OPPORTUNITY */}

                    <td className="px-4 py-3.5 text-[11px] text-[#374151] whitespace-nowrap">
                      {student.role}
                    </td>


                    {/* DEPARTMENT */}

                    <td className="px-4 py-3.5 text-[11px] text-[#374151] whitespace-nowrap">
                      {student.dept}
                    </td>


                    {/* DATE */}

                    <td className="px-4 py-3.5 text-[11px] text-[#374151] whitespace-nowrap">
                      {student.date}
                    </td>


                    {/* ID */}

                    <td className="px-4 py-3.5 text-[11px] text-[#374151] whitespace-nowrap">
                      {student.id}
                    </td>


                    {/* STATUS */}

                    <td className="px-4 py-3.5">

                      <span
                        className={`
                          inline-flex
                          px-2.5
                          py-1
                          rounded-full
                          text-[10px]
                          font-semibold
                          ${statusStyles[student.status]}
                        `}
                      >
                        {student.status}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-4 py-3.5">

                      <div className="flex items-center gap-3">

                        {student.status === "Issued" ? (
                          <>
                            <button
                              type="button"
                              className="text-[#64748B] hover:text-[#1E5EFF]"
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              type="button"
                              className="text-[#1E5EFF]"
                            >
                              <Download size={15} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="text-[#1E5EFF]"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              type="button"
                              className="text-[#DC2626]"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* PAGINATION */}

          <div className="px-5 py-4 flex items-center justify-between border-t border-[#F1F5F9]">

            <p className="text-[11px] text-[#64748B]">
              Showing 1 to 8 of 18 entries
            </p>


            <div className="flex items-center gap-1">

              <button
                className="
                  w-8
                  h-8
                  rounded-[7px]
                  border
                  border-[#E5E7EB]
                  flex
                  items-center
                  justify-center
                  text-[#64748B]
                "
              >
                <ChevronLeft size={14} />
              </button>

              <button
                className="
                  w-8
                  h-8
                  rounded-[7px]
                  bg-[#1E5EFF]
                  text-white
                  text-[11px]
                  font-semibold
                "
              >
                1
              </button>

              <button className="w-8 h-8 text-[11px] text-[#374151]">
                2
              </button>

              <button className="w-8 h-8 text-[11px] text-[#374151]">
                3
              </button>

              <span className="px-1 text-[11px] text-[#9CA3AF]">
                ...
              </span>

              <button
                className="
                  w-8
                  h-8
                  rounded-[7px]
                  border
                  border-[#E5E7EB]
                  flex
                  items-center
                  justify-center
                  text-[#64748B]
                "
              >
                <ChevronRight size={14} />
              </button>

            </div>


            <div
              className="
                h-8
                px-3
                rounded-[7px]
                border
                border-[#E5E7EB]
                flex
                items-center
                text-[10px]
                text-[#374151]
              "
            >
              10 per page
            </div>

          </div>


          {/* INFORMATION — KEEP INSIDE TABLE CARD */}

          <div className="mx-5 mb-4 px-3 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[7px]">

            <p className="text-[10px] text-[#64748B] flex items-center gap-2">

              <span className="text-[#1E5EFF] text-[12px]">
                ⓘ
              </span>

              Certificates are generated only for students who have completed
              their internship and evaluation.

            </p>

          </div>

        </>

      ) : (

        <div className="py-12 text-center">

          <p className="text-[12px] text-[#6B7280]">
            Certificate templates will appear here.
          </p>

        </div>

      )}

    </div>
  );
}