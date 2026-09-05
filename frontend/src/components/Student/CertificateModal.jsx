import React from "react";
import { X } from "lucide-react";
import aiscLogo1 from "../../assets/aisc-logo1.png"; // update path to match your project

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg hover:bg-slate-100"
        >
          <X size={18} />
        </button>

        {/* Certificate card */}
        <div
          id="certificate-print-area"
          className="relative overflow-hidden rounded-2xl bg-white p-10 shadow-2xl"
          style={{
            border: "10px solid #1e3a8a",
            backgroundImage:
              "linear-gradient(135deg, rgba(30,58,138,0.05) 0%, transparent 40%), linear-gradient(315deg, rgba(234,179,8,0.07) 0%, transparent 40%)",
          }}
        >
          <div className="pointer-events-none absolute inset-3 rounded-xl border-2 border-amber-400" />

          <div className="relative flex flex-col items-center px-4 py-6 text-center">
            {/* AISC Logo */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-amber-400 bg-white p-2">
              <img
                src={aiscLogo1}
                alt="AISC Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              AISC OJT Portal
            </p>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
              Certificate of Completion
            </h1>

            <p className="mt-5 text-sm text-slate-500">This is to certify that</p>

            <h2 className="mt-2 border-b-2 border-amber-300 px-6 pb-1 text-2xl font-bold text-blue-900">
              {certificate.studentName || "Mohammad Zaid"}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600">
              has successfully completed the On-the-Job Training (OJT) process in{" "}
              <span className="font-semibold text-slate-800">{certificate.program}</span> at{" "}
              <span className="font-semibold text-slate-800">{certificate.company}</span>,
              fulfilling all required hours, tasks, and evaluations under the AISC OJT
              Portal.
            </p>

            <div className="mt-8 grid w-full grid-cols-2 gap-8 border-t border-dashed border-slate-300 pt-5 text-left">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Completion Date
                </p>
                <p className="font-semibold text-slate-800">{certificate.completionDate}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Certificate ID
                </p>
                <p className="font-semibold text-slate-800">{certificate.id}</p>
              </div>
            </div>

            {/* Dummy signatures — replace with real signature images later */}
            <div className="mt-10 flex w-full justify-between px-4">
              <div className="flex flex-col items-center">
                <p
                  className="mb-1 w-40 text-2xl text-blue-900"
                  style={{ fontFamily: "'Brush Script MT', cursive" }}
                >
                  R. Sharma
                </p>
                <div className="mb-1 h-px w-32 bg-slate-400" />
                <p className="text-xs text-slate-500">Company Signatory</p>
              </div>
              <div className="flex flex-col items-center">
                <p
                  className="mb-1 w-40 text-2xl text-blue-900"
                  style={{ fontFamily: "'Brush Script MT', cursive" }}
                >
                  A. Verma
                </p>
                <div className="mb-1 h-px w-32 bg-slate-400" />
                <p className="text-xs text-slate-500">College Coordinator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}