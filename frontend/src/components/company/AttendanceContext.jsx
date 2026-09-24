import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  students,
  MONTH_OPTIONS,
  monthLabelToKey,
  daysInMonth,
  seedRecords,
} from "./AttendanceData";

const AttendanceContext = createContext(null);

const STORAGE_KEY = "ojt_attendance_records_v2";

function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn(
      "Could not read attendance from localStorage",
      e
    );
  }

  return seedRecords();
}

function badgeForPercent(pct) {
  if (pct >= 90) return "Excellent";
  if (pct >= 80) return "Good";
  if (pct >= 65) return "Average";
  if (pct >= 50) return "Needs Improvement";
  return "Poor";
}

export function AttendanceProvider({ children }) {
  const [records, setRecords] = useState(loadRecords);

  const [filters, setFilters] = useState({
    internship: "All",
    department: "All Departments",
    month: MONTH_OPTIONS[0],
  });

  // Save attendance whenever records change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(records)
    );
  }, [records]);

  const monthKey = monthLabelToKey(filters.month);

  // --------------------------------------------------
  // FILTERED STUDENTS
  // --------------------------------------------------

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (
        filters.department !== "All Departments" &&
        s.department !== filters.department
      ) {
        return false;
      }

      if (
        filters.internship !== "All" &&
        s.internship !== filters.internship
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // --------------------------------------------------
  // SET SINGLE ATTENDANCE ENTRY
  // --------------------------------------------------

  function setEntry(
    targetMonthKey,
    day,
    studentId,
    entry
  ) {
    setRecords((prev) => ({
      ...prev,

      [targetMonthKey]: {
        ...prev[targetMonthKey],

        [day]: {
          ...prev[targetMonthKey]?.[day],

          [studentId]: entry,
        },
      },
    }));
  }

  // --------------------------------------------------
  // SINGLE ATTENDANCE
  // --------------------------------------------------

  function markAttendance(
    targetMonthKey,
    day,
    studentId,
    status
  ) {
    setEntry(
      targetMonthKey,
      day,
      studentId,
      {
        status,
        verified: true,
        source: "company",
      }
    );
  }

  // ==================================================
  // BULK ATTENDANCE
  // ==================================================
  //
  // IMPORTANT:
  //
  // Bulk attendance works on:
  //
  // ONE DATE
  // +
  // ONE STUDENT RANGE
  //
  // Example:
  //
  // Date       = 4 September 2026
  // From       = Student 2
  // To         = Student 5
  // Status     = Present
  //
  // Result:
  //
  // Student 2 -> Present
  // Student 3 -> Present
  // Student 4 -> Present
  // Student 5 -> Present
  //
  // Only that selected date is changed.
  //
  // overwrite = true
  // Existing attendance is replaced.
  //
  // overwrite = false
  // Existing attendance stays unchanged.
  // ==================================================

  function bulkMark(
    targetMonthKey,
    day,
    fromStudentId,
    toStudentId,
    status,
    overwrite = true
  ) {
    // Make sure day is a number
    const numericDay = Number(day);

    // Invalid day
    if (
      !numericDay ||
      numericDay < 1 ||
      numericDay >
        daysInMonth(targetMonthKey)
    ) {
      return {
        success: false,
        filled: 0,
        overwritten: 0,
        skipped: 0,
        message: "Invalid attendance date.",
      };
    }

    // ------------------------------------------------
    // FIND STUDENT RANGE
    // ------------------------------------------------

    const fromIndex =
      filteredStudents.findIndex(
        (student) =>
          String(student.id) ===
          String(fromStudentId)
      );

    const toIndex =
      filteredStudents.findIndex(
        (student) =>
          String(student.id) ===
          String(toStudentId)
      );

    // Student not found
    if (
      fromIndex === -1 ||
      toIndex === -1
    ) {
      return {
        success: false,
        filled: 0,
        overwritten: 0,
        skipped: 0,
        message:
          "Could not find the selected students.",
      };
    }

    // ------------------------------------------------
    // ALLOW RANGE IN BOTH DIRECTIONS
    // ------------------------------------------------

    const startIndex = Math.min(
      fromIndex,
      toIndex
    );

    const endIndex = Math.max(
      fromIndex,
      toIndex
    );

    const selectedStudents =
      filteredStudents.slice(
        startIndex,
        endIndex + 1
      );

    // ------------------------------------------------
    // GET CURRENT RECORDS FOR THIS EXACT DATE
    // ------------------------------------------------

    const currentDayRecord =
      records[targetMonthKey]?.[
        numericDay
      ] || {};

    // ------------------------------------------------
    // CALCULATE COUNTS BEFORE STATE UPDATE
    // ------------------------------------------------

    let filled = 0;
    let overwritten = 0;
    let skipped = 0;

    selectedStudents.forEach(
      (student) => {
        const existing =
          currentDayRecord[student.id];

        // No attendance yet
        if (!existing) {
          filled++;
          return;
        }

        // Attendance exists
        if (overwrite === true) {
          overwritten++;
        } else {
          skipped++;
        }
      }
    );

    // ------------------------------------------------
    // UPDATE RECORDS
    // ------------------------------------------------

    setRecords((prev) => {
      const monthRecords = {
        ...(prev[targetMonthKey] || {}),
      };

      const dayRecord = {
        ...(monthRecords[numericDay] || {}),
      };

      selectedStudents.forEach(
        (student) => {
          const existing =
            dayRecord[student.id];

          // Student has no attendance
          if (!existing) {
            dayRecord[student.id] = {
              status,
              verified: true,
              source: "company",
            };

            return;
          }

          // Overwrite existing attendance
          if (overwrite === true) {
            dayRecord[student.id] = {
              status,
              verified: true,
              source: "company",
            };
          }

          // If overwrite is false,
          // do nothing to existing entry.
        }
      );

      monthRecords[numericDay] =
        dayRecord;

      return {
        ...prev,

        [targetMonthKey]:
          monthRecords,
      };
    });

    return {
      success: true,
      filled,
      overwritten,
      skipped,
    };
  }

  // --------------------------------------------------
  // VERIFY SINGLE DAY
  // --------------------------------------------------

  function verifyDay(
    targetMonthKey,
    day,
    studentId
  ) {
    setRecords((prev) => {
      const entry =
        prev[targetMonthKey]?.[
          day
        ]?.[studentId];

      if (!entry) {
        return prev;
      }

      return {
        ...prev,

        [targetMonthKey]: {
          ...prev[targetMonthKey],

          [day]: {
            ...prev[targetMonthKey][day],

            [studentId]: {
              ...entry,
              verified: true,
            },
          },
        },
      };
    });
  }

  // --------------------------------------------------
  // VERIFY ALL PENDING
  // --------------------------------------------------

  function verifyAllPending() {
    let count = 0;

    setRecords((prev) => {
      const monthRecords = {
        ...(prev[monthKey] || {}),
      };

      const visibleIds = new Set(
        filteredStudents.map(
          (s) => s.id
        )
      );

      Object.keys(monthRecords).forEach(
        (day) => {
          const dayRecord = {
            ...monthRecords[day],
          };

          Object.entries(dayRecord).forEach(
            ([sid, entry]) => {
              if (
                visibleIds.has(
                  Number(sid)
                ) &&
                entry &&
                !entry.verified
              ) {
                dayRecord[sid] = {
                  ...entry,
                  verified: true,
                };

                count++;
              }
            }
          );

          monthRecords[day] =
            dayRecord;
        }
      );

      return {
        ...prev,
        [monthKey]: monthRecords,
      };
    });

    return count;
  }

  // --------------------------------------------------
  // STUDENT STATISTICS
  // --------------------------------------------------

  const studentStats = useMemo(() => {
    const monthRecords =
      records[monthKey] || {};

    const total =
      daysInMonth(monthKey);

    const stats = {};

    students.forEach((s) => {
      let present = 0;
      let absent = 0;
      let late = 0;
      let holiday = 0;
      let marked = 0;
      let pending = 0;

      for (
        let day = 1;
        day <= total;
        day++
      ) {
        const entry =
          monthRecords[day]?.[
            s.id
          ];

        if (!entry) {
          continue;
        }

        marked++;

        if (!entry.verified) {
          pending++;
        }

        if (
          entry.status ===
          "present"
        ) {
          present++;
        } else if (
          entry.status ===
          "absent"
        ) {
          absent++;
        } else if (
          entry.status === "late"
        ) {
          late++;
        } else if (
          entry.status ===
          "holiday"
        ) {
          holiday++;
        }
      }

      const denom =
        marked - holiday;

      const pct =
        denom > 0
          ? (present / denom) *
            100
          : 0;

      stats[s.id] = {
        present,
        absent,
        late,
        holiday,
        marked,
        pending,
        pct,
        badge:
          badgeForPercent(pct),
      };
    });

    return stats;
  }, [records, monthKey]);

  // --------------------------------------------------
  // TOTALS
  // --------------------------------------------------

  const totals = useMemo(() => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let holiday = 0;
    let pending = 0;

    filteredStudents.forEach(
      (s) => {
        const st =
          studentStats[s.id];

        if (!st) {
          return;
        }

        present += st.present;
        absent += st.absent;
        late += st.late;
        holiday += st.holiday;
        pending += st.pending;
      }
    );

    const total =
      present +
      absent +
      late +
      holiday;

    return {
      totalStudents:
        filteredStudents.length,

      present,
      absent,
      late,
      holiday,
      pending,
      total,

      presentPct: total
        ? (present / total) *
          100
        : 0,

      absentPct: total
        ? (absent / total) *
          100
        : 0,

      latePct: total
        ? (late / total) *
          100
        : 0,

      holidayPct: total
        ? (holiday / total) *
          100
        : 0,
    };
  }, [
    filteredStudents,
    studentStats,
  ]);

  // --------------------------------------------------
  // CONTEXT VALUE
  // --------------------------------------------------

  const value = {
    students,
    filteredStudents,

    records,
    monthKey,

    filters,
    setFilters,

    markAttendance,
    bulkMark,

    verifyDay,
    verifyAllPending,

    studentStats,
    totals,
  };

  return (
    <AttendanceContext.Provider
      value={value}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const ctx =
    useContext(AttendanceContext);

  if (!ctx) {
    throw new Error(
      "useAttendance must be used within AttendanceProvider"
    );
  }

  return ctx;
}