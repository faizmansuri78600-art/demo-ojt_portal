import { Download, Send } from "lucide-react";
import logohe from "../../assets/logohe.jpeg";

const details = [
  { label: "Student Name", value: "Rahul Sharma" },
  { label: "Internship", value: "Web Development Intern" },
  { label: "Department", value: "Computer Science" },
  { label: "Duration", value: "15 Apr 2025 - 15 Jul 2025" },
  { label: "Issued On", value: "16 Jul 2025" },
  { label: "Certificate ID", value: "CERT-2025-0001" },
  { label: "Issued By", value: "Mentor - ABC Technologies" },
];

export default function CertificatePreview() {
  return (
    <div className="w-[320px] shrink-0 flex flex-col gap-4">

      {/* TITLE */}
      <h2 className="text-[15px] font-semibold text-[#111827]">
        Certificate Preview
      </h2>

      {/* ================= CERTIFICATE ================= */}
      <div
        className="
          relative
          w-full
          h-[320px]
          bg-white
          border
          border-[#D9D9D9]
          rounded-[10px]
          overflow-hidden
          shadow-sm
          text-center
          px-7
          pt-5
        "
      >

        {/* TOP LEFT GOLD CORNER */}
        <div
          className="
            absolute
            top-0
            left-0
            w-[48px]
            h-[48px]
            bg-[#F5B93E]
          "
          style={{
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />

        {/* TOP LEFT BLUE STRIPE */}
        <div
          className="
            absolute
            top-0
            left-[18px]
            w-[48px]
            h-[48px]
            bg-[#0B3091]
          "
          style={{
            clipPath: "polygon(38% 0, 100% 0, 0 100%, 0 62%)",
          }}
        />


        {/* BOTTOM RIGHT BLUE CORNER */}
        <div
          className="
            absolute
            bottom-0
            right-0
            w-[50px]
            h-[50px]
            bg-[#0B3091]
          "
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />

        {/* BOTTOM RIGHT GOLD STRIPE */}
        <div
          className="
            absolute
            bottom-0
            right-0
            w-[25px]
            h-[50px]
            bg-[#F5B93E]
          "
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />


        {/* ================= CONTENT ================= */}

        {/* LOGO */}
        <img
          src={logohe}
          alt="ABC Technologies"
          className="
            w-[43px]
            h-[43px]
            object-contain
            mx-auto
            relative
            z-10
          "
        />

        {/* COMPANY */}
        <p
          className="
            text-[#0B3091]
            text-[8px]
            font-bold
            tracking-wide
            mt-1
          "
        >
          ABC TECHNOLOGIES
        </p>


        {/* CERTIFICATE */}
        <h3
          className="
            text-[#17346D]
            text-[21px]
            font-serif
            font-bold
            tracking-wide
            mt-2
          "
        >
          CERTIFICATE
        </h3>

        <p
          className="
            text-[#9CA3AF]
            text-[7px]
            tracking-[0.3em]
            mt-0.5
          "
        >
          OF INTERNSHIP
        </p>


        {/* GOLD LINE */}
        <div className="w-[72px] h-[1px] bg-[#D9B24C] mx-auto mt-2 mb-2" />


        {/* CERTIFY */}
        <p className="text-[#6B7280] text-[8px]">
          This is to certify that
        </p>


        {/* NAME */}
        <p
          className="
            text-[#17346D]
            text-[20px]
            font-serif
            italic
            font-bold
            mt-1
          "
        >
          Rahul Sharma
        </p>


        {/* COMPLETION */}
        <p className="text-[#6B7280] text-[8px] mt-1">
          has successfully completed the
        </p>

        <p className="text-[#17346D] text-[9px] font-bold mt-0.5">
          Web Development Internship
        </p>

        <p className="text-[#6B7280] text-[8px] mt-0.5">
          from 15 April 2025 to 15 July 2025.
        </p>


        {/* DESCRIPTION */}
        <p
          className="
            text-[#7B8494]
            text-[7px]
            leading-[1.25]
            mt-2
            px-2
          "
        >
          During this internship, he/she has demonstrated dedication,
          hard work and excellent performance.
        </p>


        {/* ================= BOTTOM SIGNATURE AREA ================= */}
        <div
          className="
            absolute
            left-[22px]
            right-[22px]
            bottom-[12px]
            h-[45px]
            flex
            items-end
            justify-between
          "
        >

          {/* DATE */}
          <div className="w-[68px] text-center">

            <p
              className="
                text-[#17346D]
                text-[7px]
                font-medium
                whitespace-nowrap
                mb-[3px]
              "
            >
              16 July 2025
            </p>

            <div className="w-full h-px bg-[#A7A7A7]" />

            <p className="text-[#9CA3AF] text-[6px] mt-[3px]">
              Date
            </p>

          </div>


          {/* SEAL */}
          <div
            className="
              w-[35px]
              h-[35px]
              rounded-full
              bg-[#F5B93E]
              border-[3px]
              border-[#D9A529]
              flex
              items-center
              justify-center
              shrink-0
              mb-[2px]
            "
          >
            <div
              className="
                w-[24px]
                h-[24px]
                rounded-full
                border
                border-[#B47D13]
                flex
                items-center
                justify-center
                text-[#B47D13]
                text-[10px]
              "
            >
              ★
            </div>
          </div>


          {/* JORDAN */}
          <div className="w-[90px] text-center">

            <p
              className="
                text-[#17346D]
                text-[11px]
                font-serif
                italic
                font-semibold
                mb-[3px]
              "
            >
              Jordan
            </p>

            <div className="w-full h-px bg-[#A7A7A7]" />

            <p
              className="
                text-[#9CA3AF]
                text-[6px]
                mt-[3px]
                whitespace-nowrap
              "
            >
              Mentor, ABC Technologies
            </p>

          </div>

        </div>

      </div>


      {/* ================= CERTIFICATE DETAILS ================= */}
      <div
        className="
          bg-white
          rounded-[10px]
          border
          border-[#E5E7EB]
          shadow-sm
          p-5
        "
      >

        <h3 className="text-[13px] font-semibold text-[#111827] mb-4">
          Certificate Details
        </h3>

        <div className="flex flex-col gap-2.5">

          {details.map((d) => (
            <div
              key={d.label}
              className="
                flex
                items-center
                justify-between
                gap-4
                text-[11px]
              "
            >

              <span className="text-[#6B7280]">
                {d.label}
              </span>

              <span className="text-[#111827] font-medium text-right">
                {d.value}
              </span>

            </div>
          ))}

          <div className="flex items-center justify-between text-[11px]">

            <span className="text-[#6B7280]">
              Status
            </span>

            <span
              className="
                bg-green-50
                text-green-700
                text-[10px]
                font-semibold
                px-2.5
                py-1
                rounded-full
              "
            >
              Issued
            </span>

          </div>

        </div>

      </div>


      {/* ================= BUTTONS ================= */}
      <div className="flex gap-3">

        <button
          className="
            flex-1
            h-[38px]
            rounded-[8px]
            bg-[#1E5EFF]
            hover:bg-[#174dcc]
            text-white
            text-[10px]
            font-medium
            flex
            items-center
            justify-center
            gap-1.5
            transition-colors
            duration-200
          "
        >
          <Download size={13} />
          Download Certificate
        </button>

        <button
          className="
            flex-1
            h-[38px]
            rounded-[8px]
            border
            border-[#E5E7EB]
            bg-white
            text-[#374151]
            text-[10px]
            font-medium
            flex
            items-center
            justify-center
            gap-1.5
            hover:bg-slate-50
            transition-colors
            duration-200
          "
        >
          <Send size={13} />
          Send to Student
        </button>

      </div>

    </div>
  );
}