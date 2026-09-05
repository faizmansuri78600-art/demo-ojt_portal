import { X, Download, Send } from "lucide-react";
import logohe from "../../assets/logohe.jpeg";


export default function CertificateViewModal({
  certificate,
  onClose
}) {

  if (!certificate) {
    return null;
  }


  const handleDownload = () => {

    alert(
      `Certificate for ${certificate.name} is ready to download.`
    );

  };


  const handleSend = () => {

    alert(
      `Certificate sent to ${certificate.email}`
    );

  };


  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
        flex
        items-center
        justify-center
        p-6
      "
    >

      {/* ================= MODAL ================= */}

      <div
        className="
          relative
          w-[850px]
          max-w-full
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-[14px]
          shadow-2xl
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            sticky
            top-0
            z-20
            bg-white
            px-6
            py-4
            border-b
            border-[#E5E7EB]
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2 className="text-[17px] font-semibold text-[#111827]">
              Certificate
            </h2>

            <p className="text-[10px] text-[#64748B] mt-1">
              {certificate.id}
            </p>

          </div>


          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              text-[#64748B]
              hover:bg-[#F1F5F9]
              hover:text-[#111827]
            "
          >
            <X size={18} />
          </button>

        </div>


        {/* ================= CERTIFICATE ================= */}

        <div className="p-8 bg-[#F8FAFC]">

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

            {/* TOP GOLD CORNER */}

            <div
              className="
                absolute
                top-0
                left-0
                w-[75px]
                h-[75px]
                bg-[#F5B93E]
              "
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)"
              }}
            />


            {/* TOP BLUE STRIPE */}

            <div
              className="
                absolute
                top-0
                left-[28px]
                w-[75px]
                h-[75px]
                bg-[#0B3091]
              "
              style={{
                clipPath: "polygon(38% 0, 100% 0, 0 100%, 0 62%)"
              }}
            />


            {/* BOTTOM BLUE CORNER */}

            <div
              className="
                absolute
                bottom-0
                right-0
                w-[75px]
                h-[75px]
                bg-[#0B3091]
              "
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
              }}
            />


            {/* BOTTOM GOLD */}

            <div
              className="
                absolute
                bottom-0
                right-0
                w-[38px]
                h-[75px]
                bg-[#F5B93E]
              "
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
              }}
            />


            {/* ================= CONTENT ================= */}

            <img
              src={logohe}
              alt="ABC Technologies"
              className="
                w-[65px]
                h-[65px]
                object-contain
                mx-auto
                relative
                z-10
              "
            />


            <p
              className="
                text-[#0B3091]
                text-[12px]
                font-bold
                tracking-wider
                mt-2
              "
            >
              ABC TECHNOLOGIES
            </p>


            <h1
              className="
                text-[#17346D]
                text-[36px]
                font-serif
                font-bold
                tracking-wide
                mt-4
              "
            >
              CERTIFICATE
            </h1>


            <p
              className="
                text-[#9CA3AF]
                text-[10px]
                tracking-[0.35em]
                mt-1
              "
            >
              OF INTERNSHIP
            </p>


            <div className="w-[110px] h-[2px] bg-[#D9B24C] mx-auto mt-4 mb-5" />


            <p className="text-[#6B7280] text-[11px]">
              This is to certify that
            </p>


            <p
              className="
                text-[#17346D]
                text-[30px]
                font-serif
                italic
                font-bold
                mt-2
              "
            >
              {certificate.name}
            </p>


            <p className="text-[#6B7280] text-[11px] mt-3">
              has successfully completed the
            </p>


            <p
              className="
                text-[#17346D]
                text-[14px]
                font-bold
                mt-1
              "
            >
              {certificate.role}
            </p>


            <p className="text-[#6B7280] text-[11px] mt-1">
              Department: {certificate.dept}
            </p>


            <p className="text-[#6B7280] text-[11px] mt-1">
              Completion Date: {certificate.date}
            </p>


            <p
              className="
                text-[#7B8494]
                text-[10px]
                leading-5
                mt-5
                px-10
              "
            >
              During this internship, the student has demonstrated
              dedication, hard work and excellent performance.
            </p>


            {/* ================= SIGNATURE ================= */}

            <div
              className="
                mt-10
                px-10
                flex
                items-end
                justify-between
              "
            >

              {/* DATE */}

              <div className="w-[100px] text-center">

                <p className="text-[#17346D] text-[10px] mb-1">
                  16 July 2025
                </p>

                <div className="w-full h-px bg-[#A7A7A7]" />

                <p className="text-[#9CA3AF] text-[8px] mt-1">
                  Date
                </p>

              </div>


              {/* SEAL */}

              <div
                className="
                  w-[55px]
                  h-[55px]
                  rounded-full
                  bg-[#F5B93E]
                  border-[4px]
                  border-[#D9A529]
                  flex
                  items-center
                  justify-center
                "
              >

                <div
                  className="
                    w-[39px]
                    h-[39px]
                    rounded-full
                    border-2
                    border-[#B47D13]
                    flex
                    items-center
                    justify-center
                    text-[#B47D13]
                    text-[16px]
                  "
                >
                  ★
                </div>

              </div>


              {/* MENTOR */}

              <div className="w-[130px] text-center">

                <p
                  className="
                    text-[#17346D]
                    text-[16px]
                    font-serif
                    italic
                    font-semibold
                    mb-1
                  "
                >
                  Jordan
                </p>

                <div className="w-full h-px bg-[#A7A7A7]" />

                <p className="text-[#9CA3AF] text-[8px] mt-1">
                  Mentor, ABC Technologies
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= DETAILS ================= */}

        <div className="px-8 py-5">

          <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5">

            <h3 className="text-[14px] font-semibold text-[#111827] mb-4">
              Certificate Details
            </h3>


            <div className="grid grid-cols-2 gap-y-3 gap-x-10">

              <Detail
                label="Student Name"
                value={certificate.name}
              />

              <Detail
                label="Email"
                value={certificate.email}
              />

              <Detail
                label="Internship"
                value={certificate.role}
              />

              <Detail
                label="Department"
                value={certificate.dept}
              />

              <Detail
                label="Completion Date"
                value={certificate.date}
              />

              <Detail
                label="Certificate ID"
                value={certificate.id}
              />

              <Detail
                label="Status"
                value={certificate.status}
              />

            </div>

          </div>

        </div>


        {/* ================= BUTTONS ================= */}

        <div
          className="
            px-8
            pb-6
            flex
            justify-end
            gap-3
          "
        >

          <button
            type="button"
            onClick={handleSend}
            className="
              h-[38px]
              px-5
              rounded-[8px]
              border
              border-[#E5E7EB]
              bg-white
              text-[#374151]
              text-[10px]
              font-medium
              flex
              items-center
              gap-2
              hover:bg-[#F8FAFC]
            "
          >
            <Send size={13} />
            Send to Student
          </button>


          <button
            type="button"
            onClick={handleDownload}
            className="
              h-[38px]
              px-5
              rounded-[8px]
              bg-[#1E5EFF]
              text-white
              text-[10px]
              font-medium
              flex
              items-center
              gap-2
              hover:bg-[#174dcc]
            "
          >
            <Download size={13} />
            Download Certificate
          </button>

        </div>

      </div>

    </div>
  );
}


/* ================= DETAIL ================= */

function Detail({ label, value }) {

  return (
    <div className="flex items-center justify-between gap-3">

      <span className="text-[10px] text-[#6B7280]">
        {label}
      </span>

      <span className="text-[10px] font-medium text-[#111827] text-right">
        {value}
      </span>

    </div>
  );
}