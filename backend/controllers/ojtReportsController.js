const AssignedOjt = require("../models/AssignedOjt");
const Application = require("../models/Application");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");
const Company = require("../models/Company");
const Faculty = require("../models/Faculty");
const Attendance = require("../models/Attendance");
const WeeklyReport = require("../models/WeeklyReport");
const Evaluation = require("../models/Evaluation");

const parseDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};

const getDateProgress = (
  startDate,
  endDate
) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (
    !start ||
    !end ||
    end <= start
  ) {
    return 0;
  }

  const today = new Date();

  const total =
    end.getTime() -
    start.getTime();

  const elapsed =
    today.getTime() -
    start.getTime();

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

const getInitials = (name) => {
  const initials = String(
    name || "Unknown Student"
  )
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(
      (part) =>
        part[0]?.toUpperCase() || ""
    )
    .join("");

  return initials || "ST";
};

const getCompletionStatus = ({
  assignmentStatus,
  progress,
  attendance,
}) => {
  const normalizedStatus =
    String(
      assignmentStatus || ""
    ).toLowerCase();

  if (
    normalizedStatus === "completed" ||
    progress >= 100
  ) {
    return "Completed";
  }

  if (
    progress < 50 ||
    attendance < 80
  ) {
    return "Needs Attention";
  }

  return "In Progress";
};

const calculateAttendance = (
  attendanceRecords
) => {
  const present =
    attendanceRecords.filter(
      (item) =>
        String(item.status).toLowerCase() ===
        "present"
    ).length;

  const absent =
    attendanceRecords.filter(
      (item) =>
        String(item.status).toLowerCase() ===
        "absent"
    ).length;

  const leave =
    attendanceRecords.filter(
      (item) =>
        String(item.status).toLowerCase() ===
        "leave"
    ).length;

  const totalDays =
    present +
    absent +
    leave;

  const percentage =
    totalDays > 0
      ? Math.round(
          (present / totalDays) * 100
        )
      : 0;

  return {
    present,
    absent,
    leave,
    totalDays,
    percentage,
  };
};

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = parseDate(value);

  if (!date) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const getReports = async (
  req,
  res
) => {
  try {
    const assignments =
      await AssignedOjt.find().sort({
        createdAt: -1,
        startDate: -1,
      });

    const reports = [];

    for (
      const assignment of assignments
    ) {
      const application =
        await Application.findOne({
          _id:
            assignment.applicationId,
        });

      if (!application) {
        continue;
      }

      const student =
        await Student.findOne({
          _id: application.studentId,
        });

      if (!student) {
        continue;
      }

      const opportunity =
        await Opportunity.findOne({
          _id:
            application.opportunityId,
        });

      const company =
        opportunity?.companyId
          ? await Company.findOne({
              _id:
                opportunity.companyId,
            })
          : null;

      const faculty =
        assignment.facultyId
          ? await Faculty.findOne({
              _id:
                assignment.facultyId,
            })
          : null;

      const attendanceRecords =
        await Attendance.find({
          assignedOjtId:
            assignment._id,
        }).sort({
          date: -1,
        });

      const attendance =
        calculateAttendance(
          attendanceRecords
        );

      const weeklyReports =
        await WeeklyReport.find({
          assignedOjtId:
            assignment._id,
        }).sort({
          weekNumber: 1,
        });

      const evaluation =
        await Evaluation.findOne({
          assignedOjtId:
            assignment._id,
        });

      const dateProgress =
        getDateProgress(
          assignment.startDate,
          assignment.endDate
        );

      const progress =
        assignment.progress !==
          null &&
        assignment.progress !==
          undefined
          ? Number(
              assignment.progress
            )
          : dateProgress;

      const safeProgress =
        Math.max(
          0,
          Math.min(
            100,
            Number.isNaN(
              progress
            )
              ? 0
              : progress
          )
        );

      const completion =
        getCompletionStatus({
          assignmentStatus:
            assignment.status,
          progress:
            safeProgress,
          attendance:
            attendance.percentage,
        });

      const mentorFeedbackSubmitted =
        weeklyReports.some(
          (report) =>
            String(
              report.facultyRemarks ||
                ""
            ).trim().length > 0
        );

      const start =
        parseDate(
          assignment.startDate
        );

      const end =
        parseDate(
          assignment.endDate
        );

      let totalOjtDays = 0;

      if (
        start &&
        end &&
        end >= start
      ) {
        totalOjtDays =
          Math.ceil(
            (end.getTime() -
              start.getTime()) /
              86400000
          ) + 1;
      }

      const completedDays =
        Math.min(
          attendance.present,
          totalOjtDays ||
            attendance.present
        );

      reports.push({
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
          getInitials(
            student.name
          ),

        rollNumber:
          student.rollNumber ||
          "N/A",

        department:
          student.department ||
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

        startDateFormatted:
          formatDate(
            assignment.startDate
          ),

        endDateFormatted:
          formatDate(
            assignment.endDate
          ),

        progress:
          safeProgress,

        attendance:
          attendance.percentage,

        attendancePresent:
          attendance.present,

        attendanceAbsent:
          attendance.absent,

        attendanceLeave:
          attendance.leave,

        attendanceDays:
          attendance.totalDays,

        totalOjtDays,

        completedDays,

        mentorFeedback:
          mentorFeedbackSubmitted
            ? "Submitted"
            : "Pending",

        weeklyReports:
          weeklyReports.length,

        evaluationSubmitted:
          Boolean(evaluation),

        totalMarks:
          evaluation?.totalMarks ??
          null,

        performanceMarks:
          evaluation?.performanceMarks ??
          null,

        punctualityMarks:
          evaluation?.punctualityMarks ??
          null,

        hoursMarks:
          evaluation?.hoursMarks ??
          null,

        weeklyReportMarks:
          evaluation?.weeklyReportMarks ??
          null,

        finalReportMarks:
          evaluation?.finalReportMarks ??
          null,

        vivaMarks:
          evaluation?.vivaMarks ??
          null,

        evaluatedOn:
          evaluation?.evaluatedOn ||
          "",

        completion,

        assignmentStatus:
          assignment.status ||
          "Assigned",

        location:
          opportunity?.location ||
          "Not specified",

        weeklyReportCount:
          weeklyReports.length,

        lastWeeklyReport:
          weeklyReports.length > 0
            ? weeklyReports[
                weeklyReports.length - 1
              ].submittedOn || ""
            : "",
      });
    }

    const statistics = {
      total:
        reports.length,

      completed:
        reports.filter(
          (item) =>
            item.completion ===
            "Completed"
        ).length,

      inProgress:
        reports.filter(
          (item) =>
            item.completion ===
            "In Progress"
        ).length,

      needsAttention:
        reports.filter(
          (item) =>
            item.completion ===
            "Needs Attention"
        ).length,

      feedbackSubmitted:
        reports.filter(
          (item) =>
            item.mentorFeedback ===
            "Submitted"
        ).length,

      feedbackPending:
        reports.filter(
          (item) =>
            item.mentorFeedback ===
            "Pending"
        ).length,

      evaluationCompleted:
        reports.filter(
          (item) =>
            item.evaluationSubmitted
        ).length,
    };

    res.status(200).json({
      success: true,
      count: reports.length,
      statistics,
      reports,
    });
  } catch (error) {
    console.error(
      "Get OJT Reports Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch OJT reports",
      error: error.message,
    });
  }
};

module.exports = {
  getReports,
};