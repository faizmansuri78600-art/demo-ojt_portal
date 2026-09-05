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
  { initials: "RS", color: "bg-pink-100 text-pink-700", name: "Rahul Sharma", email: "rahul@gmail.com", role: "Web Development Intern", dept: "Computer Science", date: "15 Jul 2025", id: "CERT-2025-0001", status: "Issued" },
  { initials: "PP", color: "bg-green-100 text-green-700", name: "Priya Patel", email: "priya21@gmail.com", role: "Data Science Intern", dept: "Data Science", date: "14 Jul 2025", id: "CERT-2025-0002", status: "Issued" },
  { initials: "AS", color: "bg-purple-100 text-purple-700", name: "Aniket Singh", email: "aniket@gmail.com", role: "UI/UX Design Intern", dept: "IT / Design", date: "12 Jul 2025", id: "CERT-2025-0003", status: "Issued" },
  { initials: "SV", color: "bg-pink-100 text-pink-700", name: "Sneha Verma", email: "sneha.verma@gmail.com", role: "Web Development Intern", dept: "Computer Science", date: "10 Jul 2025", id: "CERT-2025-0004", status: "Issued" },
  { initials: "AG", color: "bg-orange-100 text-orange-700", name: "Aman Gupta", email: "aman.gupta@gmail.com", role: "Data Analyst Intern", dept: "Data Science", date: "09 Jul 2025", id: "CERT-2025-0005", status: "Issued" },
  { initials: "NK", color: "bg-blue-100 text-blue-700", name: "Neha Kulkarni", email: "neha.k@gmail.com", role: "Android Developer Intern", dept: "Computer Science", date: "-", id: "-", status: "Pending" },
  { initials: "VP", color: "bg-purple-100 text-purple-700", name: "Vikram Purohit", email: "vikram.p@gmail.com", role: "Cybersecurity Intern", dept: "Information Tech.", date: "-", id: "-", status: "Pending" },
  { initials: "MB", color: "bg-pink-100 text-pink-700", name: "Megha Bansal", email: "megha.b@gmail.com", role: "Digital Marketing Intern", dept: "Marketing", date: "-", id: "-", status: "Pending" },
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


  /* ================= DOWNLOAD =================
     Rebuilt to visually match the on-screen popup / CertificatePreview.jsx:
     same gold/blue corner accents (pure CSS clip-path, no image needed —
     that's what keeps this safe to open as a standalone file), same gold
     divider line, same gold seal, same "Jordan" mentor signature line. */

  const downloadCertificate = (student) => {

    const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
<title>Certificate - ${student.name}</title>

<style>

  * { box-sizing: border-box; }

  body {
    font-family: Arial, sans-serif;
    background: #F8FAFC;
    display: flex;
    justify-content: center;
    padding: 40px;
    margin: 0;
  }

  .certificate {
    position: relative;
    width: 650px;
    min-height: 430px;
    background: white;
    border: 1px solid #D9D9D9;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    padding: 40px 48px;
    text-align: center;
    overflow: hidden;
  }

  .corner {
    position: absolute;
    width: 75px;
    height: 75px;
  }

  .corner.gold-top    { top: 0; left: 0; background: #F5B93E;
    clip-path: polygon(0 0, 100% 0, 0 100%); }
  .corner.blue-top     { top: 0; left: 28px; background: #0B3091;
    clip-path: polygon(38% 0, 100% 0, 0 100%, 0 62%); }
  .corner.blue-bottom  { bottom: 0; right: 0; background: #0B3091;
    clip-path: polygon(100% 0, 100% 100%, 0 100%); }
  .corner.gold-bottom  { bottom: 0; right: 0; width: 38px; background: #F5B93E;
    clip-path: polygon(100% 0, 100% 100%, 0 100%); }

  .company {
    color: #0B3091;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  h1 {
    color: #17346D;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 16px 0 2px;
  }

  .sub {
    color: #9CA3AF;
    font-size: 10px;
    letter-spacing: 4px;
    margin: 0;
  }

  .gold-line {
    width: 110px;
    height: 2px;
    background: #D9B24C;
    margin: 18px auto 20px;
  }

  p.muted {
    color: #6B7280;
    font-size: 11px;
    margin: 4px 0;
  }

  .name {
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 30px;
    font-weight: bold;
    color: #17346D;
    margin: 8px 0;
  }

  .role {
    color: #17346D;
    font-size: 14px;
    font-weight: bold;
    margin: 4px 0;
  }

  .desc {
    color: #7B8494;
    font-size: 10px;
    line-height: 1.5;
    margin: 20px 40px 0;
  }

  .signature-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 40px;
    padding: 0 40px;
  }

  .sig-block { width: 100px; text-align: center; }
  .sig-line { border-top: 1px solid #A7A7A7; margin-top: 6px; padding-top: 4px; }
  .sig-label { color: #9CA3AF; font-size: 8px; margin-top: 2px; }
  .sig-value { color: #17346D; font-size: 10px; margin: 0; }
  .sig-name { color: #17346D; font-family: Georgia, serif; font-style: italic;
    font-weight: 600; font-size: 16px; margin: 0; }

  .seal {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: #F5B93E;
    border: 4px solid #D9A529;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .seal-inner {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    border: 2px solid #B47D13;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #B47D13;
    font-size: 16px;
  }

</style>

</head>

<body>

<div class="certificate">

  <div class="corner gold-top"></div>
  <div class="corner blue-top"></div>
  <div class="corner blue-bottom"></div>
  <div class="corner gold-bottom"></div>

  <p class="company">ABC TECHNOLOGIES</p>

  <h1>CERTIFICATE</h1>
  <p class="sub">OF INTERNSHIP</p>

  <div class="gold-line"></div>

  <p class="muted">This is to certify that</p>
  <div class="name">${student.name}</div>

  <p class="muted">has successfully completed the</p>
  <p class="role">${student.role}</p>

  <p class="muted">Department: ${student.dept}</p>
  <p class="muted">Completion Date: ${student.date}</p>

  <p class="desc">
    During this internship, the student has demonstrated dedication,
    hard work and excellent performance.
  </p>

  <div class="signature-row">

    <div class="sig-block">
      <p class="sig-value">16 July 2025</p>
      <div class="sig-line"></div>
      <p class="sig-label">Date</p>
    </div>

    <div class="seal">
      <div class="seal-inner">&#9733;</div>
    </div>

    <div class="sig-block" style="width:130px;">
      <p class="sig-name">Jordan</p>
      <div class="sig-line"></div>
      <p class="sig-label">Mentor, ABC Technologies</p>
    </div>

  </div>

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


      {/* ================= VIEW POPUP =================
          Rebuilt to match CertificatePreview.jsx exactly: gold/blue clip-path
          corners, gold divider line, serif "CERTIFICATE" title, gold seal,
          "Jordan" mentor signature — instead of the old plain blue-border box. */}

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
              w-[720px]
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
                z-20
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
                relative
                mx-auto
                w-[650px]
                max-w-full
                min-h-[430px]
                bg-white
                border
                border-[#D9D9D9]
                shadow-md
                text-center
                px-12
                py-10
                overflow-hidden
              "
            >

              {/* TOP LEFT GOLD */}
              <div
                className="absolute top-0 left-0 w-[75px] h-[75px] bg-[#F5B93E]"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />

              {/* TOP LEFT BLUE */}
              <div
                className="absolute top-0 left-[28px] w-[75px] h-[75px] bg-[#0B3091]"
                style={{ clipPath: "polygon(38% 0, 100% 0, 0 100%, 0 62%)" }}
              />

              {/* BOTTOM RIGHT BLUE */}
              <div
                className="absolute bottom-0 right-0 w-[75px] h-[75px] bg-[#0B3091]"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />

              {/* BOTTOM RIGHT GOLD */}
              <div
                className="absolute bottom-0 right-0 w-[38px] h-[75px] bg-[#F5B93E]"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />

              <p className="text-[#0B3091] text-[12px] font-bold tracking-wider mt-1 relative z-10">
                ABC TECHNOLOGIES
              </p>

              <h1 className="text-[#17346D] text-[36px] font-serif font-bold tracking-wide mt-4">
                CERTIFICATE
              </h1>

              <p className="text-[#9CA3AF] text-[10px] tracking-[0.35em] mt-1">
                OF INTERNSHIP
              </p>

              <div className="w-[110px] h-[2px] bg-[#D9B24C] mx-auto mt-4 mb-5" />

              <p className="text-[#6B7280] text-[11px]">
                This is to certify that
              </p>

              <p className="text-[#17346D] text-[30px] font-serif italic font-bold mt-2">
                {viewStudent.name}
              </p>

              <p className="text-[#6B7280] text-[11px] mt-3">
                has successfully completed the
              </p>

              <p className="text-[#17346D] text-[14px] font-bold mt-1">
                {viewStudent.role}
              </p>

              <p className="text-[#6B7280] text-[11px] mt-1">
                Department: {viewStudent.dept}
              </p>

              <p className="text-[#6B7280] text-[11px] mt-1">
                Completion Date: {viewStudent.date}
              </p>

              <p className="text-[#7B8494] text-[10px] leading-5 mt-5 px-10">
                During this internship, the student has demonstrated
                dedication, hard work and excellent performance.
              </p>


              {/* SIGNATURE */}

              <div className="mt-10 px-10 flex items-end justify-between">

                <div className="w-[100px] text-center">
                  <p className="text-[#17346D] text-[10px] mb-1">
                    16 July 2025
                  </p>
                  <div className="w-full h-px bg-[#A7A7A7]" />
                  <p className="text-[#9CA3AF] text-[8px] mt-1">
                    Date
                  </p>
                </div>

                <div
                  className="
                    w-[55px] h-[55px] rounded-full bg-[#F5B93E]
                    border-[4px] border-[#D9A529]
                    flex items-center justify-center
                  "
                >
                  <div
                    className="
                      w-[39px] h-[39px] rounded-full border-2 border-[#B47D13]
                      flex items-center justify-center text-[#B47D13] text-[16px]
                    "
                  >
                    ★
                  </div>
                </div>

                <div className="w-[130px] text-center">
                  <p className="text-[#17346D] text-[16px] font-serif italic font-semibold mb-1">
                    Jordan
                  </p>
                  <div className="w-full h-px bg-[#A7A7A7]" />
                  <p className="text-[#9CA3AF] text-[8px] mt-1">
                    Mentor, ABC Technologies
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