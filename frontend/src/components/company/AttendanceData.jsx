// Static reference data for the Attendance module.
// Live attendance state now lives in AttendanceContext — this file only
// seeds it and provides lookups (student list, month options, columns).

export const students = [
  { id: 1, initials: "RS", name: "Rahul Sharma", program: "Computer Science", internship: "Web Development Intern", department: "Computer Science" },
  { id: 2, initials: "PP", name: "Priya Patel", program: "Data Science", internship: "Data Science Intern", department: "Data Science" },
  { id: 3, initials: "AS", name: "Aniket Singh", program: "IT Project", internship: "UI/UX Design Intern", department: "Information Tech." },
  { id: 4, initials: "SV", name: "Sneha Verma", program: "Computer Science", internship: "Web Development Intern", department: "Computer Science" },
  { id: 5, initials: "AG", name: "Aman Gupta", program: "Data Science", internship: "Data Analyst Intern", department: "Data Science" },
  { id: 6, initials: "NK", name: "Neha Kulkarni", program: "Android Developer", internship: "Android Developer Intern", department: "Information Tech." },
  { id: 7, initials: "VP", name: "Vikram Purohit", program: "Information Tech.", internship: "Cybersecurity Intern", department: "Information Tech." },
  { id: 8, initials: "MB", name: "Megha Bansal", program: "Marketing", internship: "Digital Marketing Intern", department: "Marketing" },
];

// The student the "student" role view acts as. Swap for your real logged-in
// user id once auth is wired up.
export const CURRENT_STUDENT_ID = 1;

export const MONTH_OPTIONS = ["July 2026", "August 2026", "September 2026"];

export function monthLabelToKey(label) {
  const [monthName, year] = label.split(" ");
  const idx = new Date(`${monthName} 1, 2000`).getMonth() + 1;
  return `${year}-${String(idx).padStart(2, "0")}`;
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function daysInMonth(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month, 0).getDate();
}

export function dayLabel(monthKey, day) {
  const [year, month] = monthKey.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const monthShort = d.toLocaleDateString("en-US", { month: "short" });
  return { label: `${String(day).padStart(2, "0")} ${monthShort}`, sub: WEEKDAY_SHORT[d.getDay()] };
}

// Seed pattern per student (offset varies the mix a bit) — used only to
// populate localStorage the first time the app runs.
const STATUS_CYCLE = ["present", "present", "present", "late", "absent", "present", "present"];

// Each attendance entry is: { status, verified, source }
// source: "student" (self-marked, awaiting company verification) or "company"
// (marked/verified by the company — always counts as verified).
export function seedRecords() {
  const monthKeys = MONTH_OPTIONS.map(monthLabelToKey);
  const records = {}; // records[monthKey][day][studentId] = { status, verified, source }
  const today = new Date();

  monthKeys.forEach((monthKey) => {
    const total = daysInMonth(monthKey);
    const [year, month] = monthKey.split("-").map(Number);
    records[monthKey] = {};
    for (let day = 1; day <= total; day++) {
      const dateObj = new Date(year, month - 1, day);
      const dow = dateObj.getDay();
      const diffDays = Math.floor((today - dateObj) / 86400000);
      const isRecent = diffDays >= 0 && diffDays <= 2; // today + previous 2 days

      records[monthKey][day] = {};
      students.forEach((s, idx) => {
        if (dow === 0) {
          records[monthKey][day][s.id] = { status: "holiday", verified: true, source: "company" };
          return;
        }
        const status = STATUS_CYCLE[(day + idx + s.id) % STATUS_CYCLE.length];
        // Simulate: recent days were self-marked by the student and still
        // await company verification for about half the students; everything
        // else (older days, or company-marked days) is already verified.
        if (isRecent && idx % 2 === 0) {
          records[monthKey][day][s.id] = { status, verified: false, source: "student" };
        } else {
          records[monthKey][day][s.id] = { status, verified: true, source: "company" };
        }
      });
    }
  });

  return records;
}