import { useEffect, useState } from "react";

import {
  Eye,
  Download,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";


const initialStudents = [
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


export default function CertificateTable({
  onSelectStudent,
}) {

  const [students, setStudents] = useState(initialStudents);

  const [tab, setTab] = useState("list");

  const [filters, setFilters] = useState({
    search: "",
    opportunity: "All Opportunities",
    department: "All Departments",
    status: "All Status",
  });

  const [viewStudent, setViewStudent] = useState(null);

  const [editStudent, setEditStudent] = useState(null);

  const [deleteStudent, setDeleteStudent] = useState(null);


  /* ================= RECEIVE FILTERS ================= */

  useEffect(() => {

    const handleFilters = (event) => {

      setFilters(event.detail);

    };

    window.addEventListener(
      "certificateFilters",
      handleFilters
    );

    return () => {

      window.removeEventListener(
        "certificateFilters",
        handleFilters
      );

    };

  }, []);


  /* ================= FILTER DATA ================= */

  const filteredStudents = students.filter((student) => {

    const searchText =
      filters.search.toLowerCase().trim();

    const matchesSearch =
      searchText === "" ||
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.role.toLowerCase().includes(searchText);


    const matchesOpportunity =
      filters.opportunity === "All Opportunities" ||
      student.role === filters.opportunity;


    const matchesDepartment =
      filters.department === "All Departments" ||
      student.dept === filters.department;


    const matchesStatus =
      filters.status === "All Status" ||
      student.status === filters.status;


    return (
      matchesSearch &&
      matchesOpportunity &&
      matchesDepartment &&
      matchesStatus
    );

  });


  /* ================= SELECT STUDENT ================= */

  const selectStudent = (student) => {

    if (onSelectStudent) {
      onSelectStudent(student);
    }

  };


  /* ================= DOWNLOAD ================= */

  const downloadCertificate = (student) => {

    const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
<title>Certificate - ${student.name}</title>

<style>

body {
  font-family: Arial, sans-serif;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.certificate {
  width: 800px;
  min-height: 550px;
  background: white;
  border: 8px solid #0B3091;
  padding: 50px;
  text-align: center;
  box-sizing: border-box;
}

h1 {
  color: #0B3091;
  font-size: 42px;
}

.name {
  font-size: 34px;
  color: #17346D;
  font-weight: bold;
}

.gold {
  color: #D9A529;
}

</style>

</head>

<body>

<div class="certificate">

  <h2 class="gold">
    ABC TECHNOLOGIES
  </h2>

  <h1>
    CERTIFICATE
  </h1>

  <p>
    OF INTERNSHIP
  </p>

  <p>
    This is to certify that
  </p>

  <div class="name">
    ${student.name}
  </div>

  <p>
    has successfully completed the
  </p>

  <h3>
    ${student.role}
  </h3>

  <p>
    Department: ${student.dept}
  </p>

  <p>
    Completion Date: ${student.date}
  </p>

  <br />

  <p>
    Certificate ID: ${student.id}
  </p>

  <br />

  <p>
    Mentor, ABC Technologies
  </p>

</div>

</body>
</html>
`;


    const blob = new Blob(
      [certificateHTML],
      { type: "text/html" }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      `${student.name.replaceAll(" ", "_")}_Certificate.html`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  };


  /* ================= DELETE ================= */

  const confirmDelete = () => {

    setStudents((previous) =>
      previous.filter(
        (student) =>
          student.email !== deleteStudent.email
      )
    );

    alert(
      `${deleteStudent.name}'s certificate record deleted.`
    );

    setDeleteStudent(null);

  };


  /* ================= EDIT ================= */

  const saveEdit = () => {

    setStudents((previous) =>
      previous.map((student) =>
        student.email === editStudent.email
          ? editStudent
          : student
      )
    );


    if (onSelectStudent) {
      onSelectStudent(editStudent);
    }


    alert("Certificate details updated successfully.");

    setEditStudent(null);

  };


  return (
    <div
      className="
        w-full
        bg-white
        border
        border-[#E5E7EB]
        rounded-[10px]
        overflow-hidden
      "
    >

      {/* ================= TABS ================= */}

      <div
        className="
          flex
          items-center
          gap-6
          px-5
          border-b
          border-[#E5E7EB]
        "
      >

        <button
          type="button"
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
          type="button"
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


      {/* ================= LIST ================= */}

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

                {filteredStudents.length > 0 ? (

                  filteredStudents.map((student, index) => (

                    <tr
                      key={student.email}
                      onClick={() => selectStudent(student)}
                      className="
                        border-b
                        border-[#F1F5F9]
                        hover:bg-[#F8FAFC]
                        cursor-pointer
                      "
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

                      <td
                        className="px-4 py-3.5"
                        onClick={(e) => e.stopPropagation()}
                      >

                        <div className="flex items-center gap-3">

                          {/* VIEW */}

                          <button
                            type="button"
                            title="View Certificate"
                            onClick={() => {
                              selectStudent(student);
                              setViewStudent(student);
                            }}
                            className="text-[#64748B] hover:text-[#1E5EFF]"
                          >
                            <Eye size={15} />
                          </button>


                          {/* ISSUED */}

                          {student.status === "Issued" ? (

                            <button
                              type="button"
                              title="Download Certificate"
                              onClick={() =>
                                downloadCertificate(student)
                              }
                              className="text-[#1E5EFF] hover:text-[#174dcc]"
                            >
                              <Download size={15} />
                            </button>

                          ) : (

                            <>

                              {/* EDIT */}

                              <button
                                type="button"
                                title="Edit"
                                onClick={() =>
                                  setEditStudent({
                                    ...student,
                                  })
                                }
                                className="text-[#1E5EFF] hover:text-[#174dcc]"
                              >
                                <Pencil size={15} />
                              </button>


                              {/* DELETE */}

                              <button
                                type="button"
                                title="Delete"
                                onClick={() =>
                                  setDeleteStudent(student)
                                }
                                className="text-[#DC2626] hover:text-[#B91C1C]"
                              >
                                <Trash2 size={15} />
                              </button>

                            </>

                          )}

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="
                        text-center
                        py-10
                        text-[11px]
                        text-[#64748B]
                      "
                    >
                      No certificates found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* ================= PAGINATION ================= */}

          <div
            className="
              px-5
              py-4
              flex
              items-center
              justify-between
              border-t
              border-[#F1F5F9]
            "
          >

            <p className="text-[11px] text-[#64748B]">

              Showing {filteredStudents.length} of{" "}
              {students.length} entries

            </p>


            <div className="flex items-center gap-1">

              <button
                type="button"
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
                type="button"
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


              <button
                type="button"
                className="w-8 h-8 text-[11px] text-[#374151]"
              >
                2
              </button>


              <button
                type="button"
                className="w-8 h-8 text-[11px] text-[#374151]"
              >
                3
              </button>


              <span className="px-1 text-[11px] text-[#9CA3AF]">
                ...
              </span>


              <button
                type="button"
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


          {/* INFORMATION */}

          <div
            className="
              mx-5
              mb-4
              px-3
              py-2.5
              bg-[#F8FAFC]
              border
              border-[#E5E7EB]
              rounded-[7px]
            "
          >

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

        /* ================= TEMPLATES ================= */

        <div className="p-5">

          <h3 className="text-[14px] font-semibold text-[#111827] mb-1">
            Certificate Templates
          </h3>

          <p className="text-[10px] text-[#64748B] mb-5">
            Select a certificate template for generating student certificates.
          </p>


          <div className="grid grid-cols-2 gap-4">

            {/* TEMPLATE 1 */}

            <div
              className="
                border
                border-[#E5E7EB]
                rounded-[10px]
                p-4
                hover:border-[#1E5EFF]
                cursor-pointer
                transition
              "
              onClick={() =>
                alert("Classic Certificate template selected.")
              }
            >

              <div
                className="
                  h-[130px]
                  bg-[#F8FAFC]
                  border
                  border-[#D9D9D9]
                  rounded-[7px]
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >

                <p className="text-[8px] text-[#0B3091] font-bold">
                  ABC TECHNOLOGIES
                </p>

                <p className="text-[18px] font-serif font-bold text-[#17346D] mt-2">
                  CERTIFICATE
                </p>

                <p className="text-[7px] text-[#9CA3AF]">
                  OF INTERNSHIP
                </p>

              </div>

              <p className="text-[11px] font-semibold text-[#111827] mt-3">
                Classic Certificate
              </p>

              <p className="text-[9px] text-[#64748B] mt-1">
                Blue and gold internship certificate.
              </p>

            </div>


            {/* TEMPLATE 2 */}

            <div
              className="
                border
                border-[#E5E7EB]
                rounded-[10px]
                p-4
                hover:border-[#1E5EFF]
                cursor-pointer
                transition
              "
              onClick={() =>
                alert("Modern Certificate template selected.")
              }
            >

              <div
                className="
                  h-[130px]
                  bg-white
                  border
                  border-[#D9D9D9]
                  rounded-[7px]
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >

                <p className="text-[8px] text-[#1E5EFF] font-bold">
                  ABC TECHNOLOGIES
                </p>

                <p className="text-[17px] font-semibold text-[#111827] mt-2">
                  INTERNSHIP
                </p>

                <div className="w-[55px] h-[2px] bg-[#1E5EFF] mt-2" />

                <p className="text-[7px] text-[#64748B] mt-2">
                  CERTIFICATE
                </p>

              </div>

              <p className="text-[11px] font-semibold text-[#111827] mt-3">
                Modern Certificate
              </p>

              <p className="text-[9px] text-[#64748B] mt-1">
                Clean and modern certificate design.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* ================= VIEW POPUP ================= */}

      {viewStudent && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
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
              rounded-[12px]
              shadow-2xl
              w-[650px]
              max-h-[90vh]
              overflow-auto
              relative
              p-6
            "
          >

            <button
              type="button"
              onClick={() => setViewStudent(null)}
              className="
                absolute
                right-4
                top-4
                text-[#64748B]
                hover:text-[#111827]
              "
            >
              <X size={18} />
            </button>


            <h2 className="text-[16px] font-semibold text-[#111827] mb-5">
              Certificate Preview
            </h2>


            <div
              className="
                border-[5px]
                border-[#0B3091]
                bg-white
                p-10
                text-center
              "
            >

              <p className="text-[12px] font-bold text-[#0B3091]">
                ABC TECHNOLOGIES
              </p>

              <h1 className="text-[34px] font-serif font-bold text-[#17346D] mt-5">
                CERTIFICATE
              </h1>

              <p className="text-[9px] tracking-[0.3em] text-[#9CA3AF]">
                OF INTERNSHIP
              </p>

              <div className="w-[80px] h-px bg-[#D9B24C] mx-auto my-5" />

              <p className="text-[10px] text-[#64748B]">
                This is to certify that
              </p>

              <p className="text-[30px] font-serif italic font-bold text-[#17346D] mt-2">
                {viewStudent.name}
              </p>

              <p className="text-[10px] text-[#64748B] mt-4">
                has successfully completed the
              </p>

              <p className="text-[13px] font-bold text-[#17346D] mt-1">
                {viewStudent.role}
              </p>

              <p className="text-[10px] text-[#64748B] mt-2">
                Department: {viewStudent.dept}
              </p>

              <p className="text-[10px] text-[#64748B] mt-1">
                Completion Date: {viewStudent.date}
              </p>

              <p className="text-[9px] text-[#94A3B8] mt-6">
                Certificate ID: {viewStudent.id}
              </p>

              <div className="flex justify-between mt-12">

                <div className="w-[120px] border-t border-[#999] pt-1">
                  <p className="text-[8px] text-[#64748B]">
                    Date
                  </p>
                </div>

                <div className="w-[120px] border-t border-[#999] pt-1">
                  <p className="text-[8px] text-[#64748B]">
                    Mentor
                  </p>
                </div>

              </div>

            </div>


            <div className="flex justify-end gap-2 mt-5">

              <button
                type="button"
                onClick={() =>
                  downloadCertificate(viewStudent)
                }
                className="
                  h-[36px]
                  px-4
                  rounded-[8px]
                  bg-[#1E5EFF]
                  text-white
                  text-[10px]
                  flex
                  items-center
                  gap-2
                "
              >
                <Download size={13} />
                Download
              </button>


              <button
                type="button"
                onClick={() => setViewStudent(null)}
                className="
                  h-[36px]
                  px-4
                  rounded-[8px]
                  border
                  border-[#E5E7EB]
                  text-[10px]
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================= EDIT POPUP ================= */}

      {editStudent && (

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
              w-[430px]
              rounded-[12px]
              shadow-xl
              p-6
            "
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-[16px] font-semibold text-[#111827]">
                  Edit Certificate
                </h2>

                <p className="text-[10px] text-[#64748B] mt-1">
                  Update certificate information.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setEditStudent(null)}
              >
                <X size={17} className="text-[#64748B]" />
              </button>

            </div>


            {/* NAME */}

            <label className="block text-[10px] font-medium mb-1.5">
              Student Name
            </label>

            <input
              value={editStudent.name}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  name: e.target.value,
                })
              }
              className="
                w-full
                h-[38px]
                border
                border-[#E5E7EB]
                rounded-[8px]
                px-3
                text-[11px]
                mb-4
                outline-none
                focus:border-[#1E5EFF]
              "
            />


            {/* OPPORTUNITY */}

            <label className="block text-[10px] font-medium mb-1.5">
              Internship / Opportunity
            </label>

            <input
              value={editStudent.role}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  role: e.target.value,
                })
              }
              className="
                w-full
                h-[38px]
                border
                border-[#E5E7EB]
                rounded-[8px]
                px-3
                text-[11px]
                mb-4
                outline-none
                focus:border-[#1E5EFF]
              "
            />


            {/* DEPARTMENT */}

            <label className="block text-[10px] font-medium mb-1.5">
              Department
            </label>

            <input
              value={editStudent.dept}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  dept: e.target.value,
                })
              }
              className="
                w-full
                h-[38px]
                border
                border-[#E5E7EB]
                rounded-[8px]
                px-3
                text-[11px]
                mb-4
                outline-none
                focus:border-[#1E5EFF]
              "
            />


            {/* DATE */}

            <label className="block text-[10px] font-medium mb-1.5">
              Completion Date
            </label>

            <input
              value={editStudent.date}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  date: e.target.value,
                })
              }
              className="
                w-full
                h-[38px]
                border
                border-[#E5E7EB]
                rounded-[8px]
                px-3
                text-[11px]
                mb-5
                outline-none
                focus:border-[#1E5EFF]
              "
            />


            <div className="flex justify-end gap-2">

              <button
                type="button"
                onClick={() => setEditStudent(null)}
                className="
                  h-[36px]
                  px-4
                  border
                  border-[#E5E7EB]
                  rounded-[8px]
                  text-[10px]
                "
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={saveEdit}
                className="
                  h-[36px]
                  px-4
                  bg-[#1E5EFF]
                  text-white
                  rounded-[8px]
                  text-[10px]
                "
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================= DELETE POPUP ================= */}

      {deleteStudent && (

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
              w-[360px]
              rounded-[12px]
              shadow-xl
              p-6
              text-center
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-full
                bg-red-50
                text-red-600
                flex
                items-center
                justify-center
                mx-auto
                mb-4
              "
            >
              <Trash2 size={19} />
            </div>


            <h2 className="text-[15px] font-semibold text-[#111827]">
              Delete Certificate?
            </h2>


            <p className="text-[10px] text-[#64748B] mt-2">
              Are you sure you want to delete the certificate record
              for <b>{deleteStudent.name}</b>?
            </p>


            <div className="flex justify-center gap-2 mt-5">

              <button
                type="button"
                onClick={() => setDeleteStudent(null)}
                className="
                  h-[36px]
                  px-4
                  border
                  border-[#E5E7EB]
                  rounded-[8px]
                  text-[10px]
                "
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={confirmDelete}
                className="
                  h-[36px]
                  px-4
                  bg-[#DC2626]
                  text-white
                  rounded-[8px]
                  text-[10px]
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}