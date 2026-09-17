const AssignedOjt = require("../models/AssignedOjt");
const Application = require("../models/Application");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");
const Company = require("../models/Company");
const Faculty = require("../models/Faculty");
const Attendance = require("../models/Attendance");
const WeeklyReport = require("../models/WeeklyReport");

// ======================================================
// HELPER: PARSE DATE
// ======================================================

const parseDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

// ======================================================
// HELPER: CALCULATE DATE BASED PROGRESS
// ======================================================

const getDateProgress = (startDate, endDate) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end || end <= start) {
    return 0;
  }

  const today = new Date();

  const total =
    end.getTime() - start.getTime();

  const elapsed =
    today.getTime() - start.getTime();

  if (elapsed <= 0) {
    return 0;
  }

  if (elapsed >= total) {
    return 100;
  }

  return Math.round(
    (elapsed / total) * 100
  );
};

// ======================================================
// HELPER: DISPLAY STATUS
// ======================================================

const getDisplayStatus = (
  assignmentStatus,
  progress,
  attendance
) => {
  if (
    String(assignmentStatus).toLowerCase() ===
      "completed" ||
    progress >= 100
  ) {
    return "Completed";
  }

  if (progress >= 85) {
    return "Completing Soon";
  }

  if (
    progress < 50 ||
    attendance < 80
  ) {
    return "Needs Attention";
  }

  return "In Progress";
};

// ======================================================
// HELPER: LAST UPDATE
// ======================================================

const formatLastUpdate = (
  assignment,
  latestAttendance
) => {
  const candidates = [];

  if (assignment.updatedAt) {
    candidates.push(
      new Date(assignment.updatedAt)
    );
  }

  if (latestAttendance?.date) {
    candidates.push(
      new Date(latestAttendance.date)
    );
  }

  const validDates = candidates.filter(
    (date) =>
      !Number.isNaN(date.getTime())
  );

  if (!validDates.length) {
    return "Not available";
  }

  const latest = validDates.sort(
    (a, b) =>
      b.getTime() - a.getTime()
  )[0];

  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(
    today.getDate() - 1
  );

  if (
    latest.toDateString() ===
    today.toDateString()
  ) {
    return "Today";
  }

  if (
    latest.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }

  return latest.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

// ======================================================
// GET OJT TRACKING DATA
// ======================================================

const getTrackingStudents = async (
  req,
  res
) => {
  try {
    const assignments =
      await AssignedOjt.find().sort({
        createdAt: -1,
        startDate: -1,
      });

    const trackingData = [];

    for (const assignment of assignments) {
      // ------------------------------------------------
      // FIND APPLICATION
      // ------------------------------------------------

      const application =
        await Application.findOne({
          _id: assignment.applicationId,
        });

      if (!application) {
        continue;
      }

      // ------------------------------------------------
      // FIND STUDENT
      // ------------------------------------------------

      const student =
        await Student.findOne({
          _id: application.studentId,
        });

      if (!student) {
        continue;
      }

      // ------------------------------------------------
      // FIND OPPORTUNITY
      // ------------------------------------------------

      const opportunity =
        await Opportunity.findOne({
          _id: application.opportunityId,
        });

      // ------------------------------------------------
      // FIND COMPANY
      // ------------------------------------------------

      const company =
        opportunity?.companyId
          ? await Company.findOne({
              _id: opportunity.companyId,
            })
          : null;

      // ------------------------------------------------
      // FIND FACULTY MENTOR
      // ------------------------------------------------

      const faculty =
        await Faculty.findOne({
          _id: assignment.facultyId,
        });

      // ------------------------------------------------
      // FIND ATTENDANCE
      // ------------------------------------------------

      const attendance =
        await Attendance.find({
          assignedOjtId: assignment._id,
        }).sort({
          date: -1,
        });

      // ------------------------------------------------
      // ATTENDANCE CALCULATION
      // ------------------------------------------------

      const present =
        attendance.filter(
          (item) =>
            String(item.status)
              .toLowerCase() ===
            "present"
        ).length;

      const absent =
        attendance.filter(
          (item) =>
            String(item.status)
              .toLowerCase() ===
            "absent"
        ).length;

      const leave =
        attendance.filter(
          (item) =>
            String(item.status)
              .toLowerCase() ===
            "leave"
        ).length;

      const attendanceDays =
        present +
        absent +
        leave;

      const attendancePercentage =
        attendanceDays
          ? Math.round(
              (present /
                attendanceDays) *
                100
            )
          : 0;

      // ------------------------------------------------
      // PROGRESS
      // ------------------------------------------------

      const dateProgress =
        getDateProgress(
          assignment.startDate,
          assignment.endDate
        );

      const progress =
        assignment.progress !== null &&
        assignment.progress !== undefined
          ? Number(
              assignment.progress
            )
          : dateProgress;

      // ------------------------------------------------
      // TOTAL OJT DAYS
      // ------------------------------------------------

      const totalDays = (() => {
        const start = parseDate(
          assignment.startDate
        );

        const end = parseDate(
          assignment.endDate
        );

        if (
          !start ||
          !end ||
          end < start
        ) {
          return 0;
        }

        return (
          Math.ceil(
            (end.getTime() -
              start.getTime()) /
              86400000
          ) + 1
        );
      })();

      // ------------------------------------------------
      // COMPLETED DAYS
      // ------------------------------------------------

      const completedDays =
        Math.min(
          present,
          totalDays || present
        );

      // ------------------------------------------------
      // DISPLAY STATUS
      // ------------------------------------------------

      const status =
        getDisplayStatus(
          assignment.status,
          progress,
          attendancePercentage
        );

      // ------------------------------------------------
      // WEEKLY REPORT COUNT
      // ------------------------------------------------

      const weeklyReports =
        await WeeklyReport.countDocuments({
          assignedOjtId:
            assignment._id,
        });

      // ------------------------------------------------
      // STUDENT INITIALS
      // ------------------------------------------------

      const initials =
        (student.name || "Unknown Student")
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map(
            (part) =>
              part[0].toUpperCase()
          )
          .join("");

      // ------------------------------------------------
      // FINAL RESPONSE OBJECT
      // ------------------------------------------------

      trackingData.push({
        id: assignment._id,

        assignmentId:
          assignment._id,

        applicationId:
          assignment.applicationId,

        studentId:
          student._id,

        student:
          student.name ||
          "Unknown Student",

        initials:
          initials || "ST",

        rollNumber:
          student.rollNumber ||
          "N/A",

        company:
          company?.companyName ||
          opportunity?.companyId ||
          "Company not found",

        companyId:
          opportunity?.companyId ||
          "",

        position:
          opportunity?.title ||
          "Opportunity not found",

        department:
          student.department ||
          "N/A",

        mentor:
          faculty?.name ||
          "Unknown Mentor",

        mentorDepartment:
          faculty?.department ||
          "",

        startDate:
          assignment.startDate ||
          "",

        endDate:
          assignment.endDate ||
          "",

        progress: Math.max(
          0,
          Math.min(
            100,
            progress
          )
        ),

        attendance:
          attendancePercentage,

        attendancePresent:
          present,

        attendanceAbsent:
          absent,

        attendanceLeave:
          leave,

        status,

        assignmentStatus:
          assignment.status ||
          "Assigned",

        location:
          opportunity?.location ||
          "Not specified",

        totalDays,

        completedDays,

        weeklyReports,

        lastUpdate:
          formatLastUpdate(
            assignment,
            attendance[0]
          ),
      });
    }

    res.status(200).json({
      success: true,
      count: trackingData.length,
      trackingData,
    });
  } catch (error) {
    console.error(
      "Get OJT tracking error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch OJT tracking data",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE OJT PROGRESS
// ======================================================

const updateTrackingProgress =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const progress =
        Number(req.body.progress);

      // ------------------------------------------------
      // VALIDATION
      // ------------------------------------------------

      if (
        Number.isNaN(progress) ||
        progress < 0 ||
        progress > 100
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Progress must be a number between 0 and 100",
        });
      }

      // ------------------------------------------------
      // FIND ASSIGNMENT
      // ------------------------------------------------

      const assignment =
        await AssignedOjt.findOne({
          _id: id,
        });

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message:
            "Assigned OJT record not found",
        });
      }

      // ------------------------------------------------
      // UPDATE
      // ------------------------------------------------

      assignment.progress =
        progress;

      if (progress >= 100) {
        assignment.status =
          "Completed";
      } else {
        assignment.status =
          "Ongoing";
      }

      await assignment.save();

      res.status(200).json({
        success: true,
        message:
          "OJT progress updated successfully",
        assignment,
      });
    } catch (error) {
      console.error(
        "Update OJT progress error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update OJT progress",
        error: error.message,
      });
    }
  };

module.exports = {
  getTrackingStudents,
  updateTrackingProgress,
};