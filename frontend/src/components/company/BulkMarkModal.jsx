import { useMemo, useState } from "react";
import Modal from "./Modal";
import { useAttendance } from "./AttendanceContext";
import { daysInMonth } from "./AttendanceData";

export default function BulkMarkModal({
  onClose,
  day,
}) {
  const {
    bulkMark,
    records,
    monthKey,
    filteredStudents,
  } = useAttendance();

  // ==================================================
  // DATE
  // ==================================================

  const [selectedDay, setSelectedDay] = useState(
    Number(day) || 1
  );

  // ==================================================
  // STUDENT RANGE
  // ==================================================

  const [fromStudent, setFromStudent] = useState(
    filteredStudents[0]?.id ?? ""
  );

  const [toStudent, setToStudent] = useState(
    filteredStudents[
      filteredStudents.length - 1
    ]?.id ?? ""
  );

  // ==================================================
  // STATUS
  // ==================================================

  const [status, setStatus] = useState("present");

  // ==================================================
  // OVERWRITE
  // ==================================================

  const [overwrite, setOverwrite] = useState(true);

  // ==================================================
  // DAYS IN SELECTED MONTH
  // ==================================================

  const totalDays = daysInMonth(monthKey);

  // ==================================================
  // DATE INPUT VALUE
  // ==================================================

  const dateInputValue =
    `${monthKey}-${String(selectedDay).padStart(
      2,
      "0"
    )}`;

  // ==================================================
  // DISPLAY DATE
  // ==================================================

  const displayDate = useMemo(() => {
    const date = new Date(
      `${dateInputValue}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
      return `Day ${selectedDay}`;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, [dateInputValue, selectedDay]);

  // ==================================================
  // SELECTED STUDENT RANGE
  // ==================================================

  const selectedStudentRange = useMemo(() => {
    const fromIndex =
      filteredStudents.findIndex(
        (student) =>
          String(student.id) ===
          String(fromStudent)
      );

    const toIndex =
      filteredStudents.findIndex(
        (student) =>
          String(student.id) ===
          String(toStudent)
      );

    if (
      fromIndex === -1 ||
      toIndex === -1
    ) {
      return [];
    }

    const startIndex = Math.min(
      fromIndex,
      toIndex
    );

    const endIndex = Math.max(
      fromIndex,
      toIndex
    );

    return filteredStudents.slice(
      startIndex,
      endIndex + 1
    );
  }, [
    fromStudent,
    toStudent,
    filteredStudents,
  ]);

  // ==================================================
  // CURRENT RECORDS FOR SELECTED DATE
  // ==================================================

  const recordsForSelectedDate =
    records[monthKey]?.[selectedDay] || {};

  // ==================================================
  // STUDENT NAME
  // ==================================================

  function getStudentName(student) {
    if (!student) {
      return "";
    }

    return (
      student.name ||
      student.fullName ||
      student.studentName ||
      `Student ${student.id}`
    );
  }

  // ==================================================
  // FORMAT CURRENT STATUS
  // ==================================================

  function formatStatus(student) {
    const entry =
      recordsForSelectedDate[student.id];

    if (!entry) {
      return "Not marked";
    }

    if (!entry.status) {
      return "Not marked";
    }

    return (
      entry.status.charAt(0).toUpperCase() +
      entry.status.slice(1)
    );
  }

  // ==================================================
  // APPLY BULK ATTENDANCE
  // ==================================================

  function handleApply() {
    // Validate date
    if (!selectedDay) {
      alert(
        "Please select an attendance date."
      );
      return;
    }

    if (
      selectedDay < 1 ||
      selectedDay > totalDays
    ) {
      alert(
        "Please select a valid date."
      );
      return;
    }

    // Validate student range
    if (
      !fromStudent ||
      !toStudent
    ) {
      alert(
        "Please select a student range."
      );
      return;
    }

    if (
      selectedStudentRange.length === 0
    ) {
      alert(
        "No students found in the selected range."
      );
      return;
    }

    // ==================================================
    // APPLY TO EXACT DATE + STUDENT RANGE
    // ==================================================

    const result = bulkMark(
      monthKey,
      selectedDay,
      fromStudent,
      toStudent,
      status,
      overwrite
    );

    // Check if bulkMark failed
    if (!result.success) {
      alert(
        result.message ||
          "Bulk attendance could not be applied."
      );
      return;
    }

    // ==================================================
    // STUDENT INFORMATION
    // ==================================================

    const firstStudent =
      selectedStudentRange[0];

    const lastStudent =
      selectedStudentRange[
        selectedStudentRange.length - 1
      ];

    const formattedStatus =
      status.charAt(0).toUpperCase() +
      status.slice(1);

    // ==================================================
    // SUCCESS MESSAGE
    // ==================================================

    let message =
      `Bulk attendance applied successfully!\n\n` +
      `Date: ${displayDate}\n` +
      `Students: ${getStudentName(
        firstStudent
      )} → ${getStudentName(
        lastStudent
      )}\n` +
      `Students selected: ${selectedStudentRange.length}\n` +
      `Status: ${formattedStatus}`;

    if (result.filled > 0) {
      message +=
        `\nNew attendance marked: ${result.filled}`;
    }

    if (result.overwritten > 0) {
      message +=
        `\nExisting attendance overwritten: ${result.overwritten}`;
    }

    if (result.skipped > 0) {
      message +=
        `\nExisting attendance skipped: ${result.skipped}`;
    }

    if (
      overwrite &&
      result.overwritten > 0
    ) {
      message +=
        "\n\nExisting attendance has been replaced.";
    }

    if (
      !overwrite &&
      result.skipped > 0
    ) {
      message +=
        "\n\nExisting attendance was left unchanged because overwrite is OFF.";
    }

    alert(message);

    // Close modal
    onClose();
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <Modal
      title="Mark bulk attendance"
      onClose={onClose}
    >
      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <p className="mb-4 text-xs text-slate-500">
        Select a date and a range of students.
        The selected attendance status will be
        applied to those students on that exact
        date.
      </p>

      {/* ==================================================
          DATE
      ================================================== */}

      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
        <label className="mb-1 block text-xs font-medium text-blue-700">
          Attendance date
        </label>

        <input
          type="date"
          value={dateInputValue}
          min={`${monthKey}-01`}
          max={`${monthKey}-${String(
            totalDays
          ).padStart(2, "0")}`}
          onChange={(e) => {
            const value = e.target.value;

            if (!value) {
              return;
            }

            const selected =
              Number(
                value.split("-")[2]
              );

            setSelectedDay(selected);
          }}
          className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
        />

        <p className="mt-2 text-xs text-blue-600">
          Selected date:{" "}
          <span className="font-semibold">
            {displayDate}
          </span>
        </p>
      </div>

      {/* ==================================================
          STUDENT RANGE + STATUS
      ================================================== */}

      <div className="flex gap-3">

        {/* FROM STUDENT */}

        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">
            From student
          </label>

          <select
            value={fromStudent}
            onChange={(e) =>
              setFromStudent(
                e.target.value
              )
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            {filteredStudents.map(
              (student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {getStudentName(student)}
                </option>
              )
            )}
          </select>
        </div>

        {/* TO STUDENT */}

        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">
            To student
          </label>

          <select
            value={toStudent}
            onChange={(e) =>
              setToStudent(
                e.target.value
              )
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            {filteredStudents.map(
              (student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {getStudentName(student)}
                </option>
              )
            )}
          </select>
        </div>

        {/* STATUS */}

        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm capitalize text-slate-700 outline-none focus:border-blue-400"
          >
            {[
              "present",
              "late",
              "absent",
              "holiday",
            ].map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ==================================================
          DATE INFORMATION
      ================================================== */}

      <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
        <span className="font-semibold">
          Attendance date:
        </span>{" "}
        {displayDate}
      </div>

      {/* ==================================================
          SELECTED STUDENT RANGE
      ================================================== */}

      <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">

        <div>
          <span className="font-medium">
            Selected students:
          </span>{" "}
          {selectedStudentRange.length}
        </div>

        {selectedStudentRange.length >
          0 && (
          <div className="mt-1">
            {getStudentName(
              selectedStudentRange[0]
            )}

            {" → "}

            {getStudentName(
              selectedStudentRange[
                selectedStudentRange.length -
                  1
              ]
            )}
          </div>
        )}
      </div>

      {/* ==================================================
          CURRENT ATTENDANCE PREVIEW
      ================================================== */}

      {selectedStudentRange.length >
        0 && (
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">

          <div className="border-b border-slate-100 px-3 py-2">

            <p className="text-xs font-semibold text-slate-700">
              Attendance on{" "}
              {displayDate}
            </p>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Current attendance before
              applying changes
            </p>

          </div>

          <div className="max-h-40 overflow-y-auto">

            {selectedStudentRange.map(
              (student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between border-b border-slate-50 px-3 py-2 last:border-b-0"
                >
                  <span className="text-xs text-slate-600">
                    {getStudentName(
                      student
                    )}
                  </span>

                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                    {formatStatus(
                      student
                    )}
                  </span>
                </div>
              )
            )}

          </div>
        </div>
      )}

      {/* ==================================================
          OVERWRITE
      ================================================== */}

      <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">

        <input
          type="checkbox"
          checked={overwrite}
          onChange={(e) =>
            setOverwrite(
              e.target.checked
            )
          }
          className="h-3.5 w-3.5 rounded border-slate-300"
        />

        Overwrite existing attendance

      </label>

      <p className="mt-1 text-xs text-slate-400">
        {overwrite
          ? `Existing attendance on ${displayDate} will be replaced with "${status}".`
          : `Existing attendance on ${displayDate} will remain unchanged.`}
      </p>

      {/* ==================================================
          FINAL PREVIEW
      ================================================== */}

      {selectedStudentRange.length >
        0 && (
        <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">

          <span className="font-semibold">
            Final action:
          </span>{" "}

          On{" "}

          <span className="font-semibold">
            {displayDate}
          </span>

          ,{" "}

          <span className="font-semibold">
            {selectedStudentRange.length}
          </span>{" "}

          student
          {selectedStudentRange.length !==
          1
            ? "s"
            : ""}{" "}

          will be marked{" "}

          <span className="font-semibold capitalize">
            {status}
          </span>
          .

        </div>
      )}

      {/* ==================================================
          BUTTONS
      ================================================== */}

      <div className="mt-4 flex justify-end gap-2">

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleApply}
          disabled={
            !selectedDay ||
            filteredStudents.length ===
              0
          }
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>

      </div>
    </Modal>
  );
}