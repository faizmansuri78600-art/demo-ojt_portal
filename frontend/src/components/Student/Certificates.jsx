import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Award,
  CheckCircle2,
  Clock,
  CalendarDays,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Info,
  Stamp,
} from "lucide-react";
import CertificateModal from "./CertificateModal";

const CERTIFICATES = [
  {
    id: "AISC/OJT/2024-25/015",
    studentName: "Noziya Patel",
    program: "Web Development Internship",
    company: "Tech Solutions Pvt. Ltd.",
    completionDate: "15 May 2025",
    status: "Issued",
    downloaded: true,
    border: "border-blue-300",
    accent: "text-blue-600",
    seal: "bg-amber-400",
  },
  {
    id: "AISC/OJT/2024-25/007",
    studentName: "Mohammad Zaid",
    program: "Software Testing Internship",
    company: "QualitySoft Pvt. Ltd.",
    completionDate: "20 Feb 2025",
    status: "Issued",
    downloaded: true,
    border: "border-emerald-400",
    accent: "text-emerald-600",
    seal: "bg-amber-400",
  },
  {
    id: "AISC/OJT/2024-25/002",
    studentName: "Mohammad Zaid",
    program: "Data Analytics Internship",
    company: "DataMinds Analytics",
    completionDate: "10 Dec 2024",
    status: "Issued",
    downloaded: false,
    border: "border-fuchsia-300",
    accent: "text-fuchsia-600",
    seal: "bg-rose-400",
  },
];

const CERTIFICATE_TYPE_OPTIONS = ["All Certificates", "Issued", "Pending"];
const SORT_OPTIONS = ["Newest First", "Oldest First"];

function CertificateThumb({ border, accent, seal }) {
  return (
    <div
      className={`relative flex h-[46px] w-16 flex-shrink-0 flex-col items-center justify-center rounded-md border-2 ${border} bg-white px-1`}
    >
      <span className={`absolute left-0.5 top-0.5 h-1.5 w-1.5 rounded-full ${seal}`} />
      <span className={`absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full ${seal}`} />
      <span className={`absolute bottom-0.5 left-0.5 h-1.5 w-1.5 rounded-full ${seal}`} />
      <span className={`absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full ${seal}`} />

      <span className={`text-[6px] font-extrabold tracking-wide ${accent}`}>CERTIFICATE</span>
      <span className="text-[4.5px] tracking-wide text-slate-400">OF COMPLETION</span>
      <div className={`mt-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ${seal}`}>
        <Stamp size={9} className="text-white" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, iconBg, iconColor, label, value, caption }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
      >
        <Icon size={22} />
      </div>
      <div>
        <div className="mb-0.5 text-[13px] font-medium text-slate-500">{label}</div>
        <div className="text-2xl font-extrabold leading-tight text-slate-900">{value}</div>
        <div className="mt-0.5 text-xs text-slate-400">{caption}</div>
      </div>
    </div>
  );
}

/** Reusable dropdown used for the three filter/sort buttons */
function FilterDropdown({ label, options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300"
      >
        {selected || label}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[10px] border border-slate-200 bg-white py-1.5 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-slate-50 ${
                selected === opt ? "font-semibold text-blue-600" : "text-slate-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Certificates — CENTER CONTENT.
 */
export default function Certificates() {
  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Certificates");
  const [programFilter, setProgramFilter] = useState("All OJT Programs");
  const [sortOrder, setSortOrder] = useState("Newest First");

  const programOptions = useMemo(
    () => ["All OJT Programs", ...new Set(CERTIFICATES.map((c) => c.program))],
    []
  );

  const stats = useMemo(() => {
    const total = CERTIFICATES.length;
    const downloaded = CERTIFICATES.filter((c) => c.downloaded).length;
    const pending = CERTIFICATES.filter((c) => c.status !== "Issued").length;
    const latest = CERTIFICATES[0];
    return { total, downloaded, pending, latest };
  }, []);

  const filtered = useMemo(() => {
    let result = [...CERTIFICATES];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.program.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All Certificates") {
      result = result.filter((c) => c.status === statusFilter);
    }

    if (programFilter !== "All OJT Programs") {
      result = result.filter((c) => c.program === programFilter);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.completionDate);
      const dateB = new Date(b.completionDate);
      return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [search, statusFilter, programFilter, sortOrder]);

  const handleDownload = (cert) => {
    alert(`Downloading "${cert.program}" certificate (${cert.id})...`);
  };

  return (
    <main className="px-8 pb-12 pt-7">
      {/* Header */}
      <div className="mb-5">
        <h1 className="mb-1.5 text-[28px] font-extrabold text-slate-900">Certificates</h1>
        <div className="flex items-center gap-2 text-[13px] text-slate-500">
          <a href="/student/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </a>
          <span>&gt;</span>
          <span className="text-slate-500">Certificates</span>
        </div>
      </div>

      {/* Info banner */}
      <div className="mb-5 flex items-start gap-3.5 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-blue-100 text-blue-600">
          <Award size={20} />
        </div>
        <div>
          <div className="mb-0.5 text-[15px] font-bold text-slate-900">
            View and download your OJT completion certificates.
          </div>
          <div className="text-[13px] text-slate-500">
            All certificates issued for your completed OJT programs are listed below.
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Award}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Total Certificates"
          value={stats.total}
          caption="All certificates earned"
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Downloaded"
          value={stats.downloaded}
          caption="Certificates downloaded"
        />
        <StatCard
          icon={Clock}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Pending"
          value={stats.pending}
          caption="Certificates pending"
        />
        <StatCard
          icon={CalendarDays}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          label="Latest Certificate"
          value={stats.latest.completionDate}
          caption="Completion Date"
        />
      </div>

      {/* Toolbar */}
      <div className="mb-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2.5 text-slate-400">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search certificates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        <FilterDropdown
          label="All Certificates"
          options={CERTIFICATE_TYPE_OPTIONS}
          selected={statusFilter}
          onSelect={setStatusFilter}
        />

        <FilterDropdown
          label="All OJT Programs"
          options={programOptions}
          selected={programFilter}
          onSelect={setProgramFilter}
        />

        <FilterDropdown
          label="Newest First"
          options={SORT_OPTIONS}
          selected={sortOrder}
          onSelect={setSortOrder}
        />
      </div>

      {/* Table */}
      <div className="mb-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="hidden grid-cols-[40px_2.4fr_1.5fr_1fr_1.3fr_0.9fr_1.4fr] items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-4 text-[12.5px] font-bold text-slate-500 lg:grid">
          <div>#</div>
          <div>Certificate Details</div>
          <div>OJT Program</div>
          <div>Completion Date</div>
          <div>Certificate ID</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filtered.map((cert, idx) => (
          <div
            key={cert.id}
            className="grid grid-cols-1 gap-3 border-b border-slate-100 px-6 py-4 last:border-b-0 lg:grid-cols-[40px_2.4fr_1.5fr_1fr_1.3fr_0.9fr_1.4fr] lg:items-center"
          >
            <div className="hidden text-sm text-slate-700 lg:block">{idx + 1}</div>

            <div className="flex items-center gap-3.5">
              <CertificateThumb border={cert.border} accent={cert.accent} seal={cert.seal} />
              <div>
                <div className="text-sm font-bold text-slate-900">
                  OJT Completion Certificate
                </div>
                <div className="mt-0.5 text-[12.5px] text-slate-400">
                  This certifies that you have successfully completed your On-the-Job Training.
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-800">{cert.program}</div>
              <div className="mt-0.5 text-[12.5px] text-slate-400">{cert.company}</div>
            </div>

            <div className="text-[13.5px] text-slate-700">{cert.completionDate}</div>
            <div className="text-[13.5px] text-slate-700">{cert.id}</div>

            <div>
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[12.5px] font-bold text-green-600">
                {cert.status}
              </span>
            </div>

            <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:items-start">
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="flex items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-[13px] font-semibold text-blue-600 hover:bg-blue-50"
              >
                <Eye size={15} /> View
              </button>
              <button
                type="button"
                onClick={() => handleDownload(cert)}
                className="flex items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-[13px] font-semibold text-blue-600 hover:bg-blue-50"
              >
                <Download size={15} /> Download
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-slate-400">
            No certificates match your filters.
          </div>
        )}
      </div>

      {/* Footer / pagination */}
      <div className="mb-5 flex flex-col items-start justify-between gap-3 text-[13px] text-slate-500 sm:flex-row sm:items-center">
        <span>
          Showing 1 to {filtered.length} of {CERTIFICATES.length} certificates
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-300"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-sm font-semibold text-white"
          >
            1
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Note banner */}
      <div className="flex items-start gap-3.5 rounded-xl border border-green-100 bg-green-50 p-4">
        <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Info size={18} />
        </div>
        <div>
          <div className="mb-0.5 text-sm font-bold text-green-900">Important Note</div>
          <div className="text-[13px] text-green-800">
            Certificates will be issued only after successful completion and approval of your
            OJT program by both the company and college.
          </div>
        </div>
      </div>

      {/* Certificate view/download modal */}
      <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
    </main>
  );
}