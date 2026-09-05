
import React from "react";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const ResumePreview = ({
  file,
  studentName,
  application,
  onBack,
  onDownload,
}) => {

  const name = studentName || "Sample Student";

  const email =
    application?.email || "student@example.com";

  const phone =
    application?.phone || "+91 98765 43210";

  const location =
    application?.location || "Pune, Maharashtra";

  const education =
    application?.education?.length
      ? application.education
      : [
          {
            degree: "B.Sc. Computer Applications",
            institution: "Abeda Inamdar Senior College",
            year: "2024 - 2027",
          },
          {
            degree: "Higher Secondary Certificate",
            institution: "Abeda Inamdar Junior College",
            year: "2024",
          },
        ];

  const skills =
    application?.skills?.length
      ? application.skills
      : [
          "React.js",
          "JavaScript",
          "HTML",
          "CSS",
          "Java",
          "PHP",
          "MySQL",
        ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">

        {/* BACK */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft size={15} />
          Back to Application
        </button>

        {/* FILE + DOWNLOAD */}
        <div className="flex items-center gap-3">

          <p className="text-xs text-gray-400">
            {file?.name || "Sample_Resume.pdf"}
          </p>

          {/* SMALL DOWNLOAD BUTTON */}
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg"
          >
            <Download size={13} />
            Download
          </button>

        </div>

      </div>

      {/* RESUME AREA */}
      <div className="py-8 px-4">

        <div className="max-w-[800px] mx-auto bg-white shadow-lg">

          {/* HEADER */}
          <div className="px-10 py-8 border-b border-gray-200">

            <h1 className="text-2xl font-bold text-gray-900">
              {name}
            </h1>

            <p className="text-sm text-blue-600 mt-1">
              Computer Applications Student
            </p>

            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">

              <span className="flex items-center gap-1.5">
                <Mail size={12} />
                {email}
              </span>

              <span className="flex items-center gap-1.5">
                <Phone size={12} />
                {phone}
              </span>

              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {location}
              </span>

            </div>

          </div>

          {/* BODY */}
          <div className="px-10 py-8 space-y-7">

            {/* PROFILE */}
            <section>

              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
                Profile
              </h2>

              <p className="text-xs text-gray-600 leading-relaxed">
                {application?.about ||
                  "Motivated Computer Applications student with an interest in web development, software development and database technologies. Passionate about learning new technologies and building practical applications."}
              </p>

            </section>

            {/* EDUCATION */}
            <section>

              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
                Education
              </h2>

              <div className="space-y-4">

                {education.map((ed, index) => (
                  <div key={index}>

                    <p className="text-xs font-semibold text-gray-800">
                      {ed.degree}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {ed.institution}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {ed.year}
                    </p>

                  </div>
                ))}

              </div>

            </section>

            {/* SKILLS */}
            <section>

              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">

                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-[11px] bg-gray-100 text-gray-700 px-3 py-1.5 rounded"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </section>

            {/* PROJECTS */}
            <section>

              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
                Projects
              </h2>

              <div className="space-y-4">

                <div>

                  <p className="text-xs font-semibold text-gray-800">
                    Student Management System
                  </p>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Developed a student management system for managing
                    student information using web technologies and a
                    database.
                  </p>

                </div>

                <div>

                  <p className="text-xs font-semibold text-gray-800">
                    AI Resume Analyzer
                  </p>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Developed an application concept for analyzing resumes,
                    matching candidate skills with job requirements and
                    generating candidate rankings.
                  </p>

                </div>

              </div>

            </section>

            {/* LANGUAGES */}
            <section>

              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
                Languages
              </h2>

              <p className="text-xs text-gray-600">
                {application?.languages ||
                  "English, Hindi, Marathi"}
              </p>

            </section>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumePreview;

