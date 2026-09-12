const Student = require("../models/Student");
const Company = require("../models/Company");
const AssignedOjt = require("../models/AssignedOjt");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const Announcement = require("../models/Announcement");
const Faculty = require("../models/Faculty");

const getSafeProgress = (assignment) => {
  const value = Number(assignment?.progress);

  if (!Number.isNaN(value)) {
    return Math.max(0, Math.min(100, value));
  }

  const start = assignment?.startDate
    ? new Date(assignment.startDate)
    : null;

  const end = assignment?.endDate
    ? new Date(assignment.endDate)
    : null;

  if (
    !start ||
    !end ||
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end <= start
  ) {
    return 0;
  }

  const today = new Date();

  if (today <= start) {
    return 0;
  }

  if (today >= end) {
    return 100;
  }

  const total = end.getTime() - start.getTime();
  const elapsed = today.getTime() - start.getTime();

  return Math.round((elapsed / total) * 100);
};

const isCompletedAssignment = (assignment) => {
  const status = String(assignment?.status || "").toLowerCase();
  const progress = getSafeProgress(assignment);

  return (
    status === "completed" ||
    status === "complete" ||
    progress >= 100
  );
};

const isActiveAssignment = (assignment) => {
  const status = String(assignment?.status || "").toLowerCase();

  if (isCompletedAssignment(assignment)) {
    return false;
  }

  if (
    status === "cancelled" ||
    status === "canceled" ||
    status === "rejected"
  ) {
    return false;
  }

  return true;
};

const getActivityDate = (assignment) => {
  if (assignment?.updatedAt) {
    const updated = new Date(assignment.updatedAt);

    if (!Number.isNaN(updated.getTime())) {
      return updated;
    }
  }

  if (assignment?.startDate) {
    const start = new Date(assignment.startDate);

    if (!Number.isNaN(start.getTime())) {
      return start;
    }
  }

  return new Date(0);
};

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name = "") => {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "ST"
  );
};

const getDashboard = async (req, res) => {
  try {
    /*
     * =========================================================
     * 1. BASIC COUNTS FROM MONGODB
     * =========================================================
     */

    const [
      totalStudents,
      verifiedStudents,
      pendingStudents,
      totalCompanies,
      approvedCompanies,
      pendingCompanies,
      rejectedCompanies,
      assignments,
      announcements,
    ] = await Promise.all([
      Student.countDocuments({}),
      Student.countDocuments({ isVerified: true }),
      Student.countDocuments({
        $or: [
          { isVerified: false },
          { isVerified: { $exists: false } },
        ],
      }),

      Company.countDocuments({}),
      Company.countDocuments({
        $or: [
          { status: "Approved" },
          { isVerified: true },
        ],
      }),
      Company.countDocuments({
        status: "Pending",
      }),
      Company.countDocuments({
        status: "Rejected",
      }),

      AssignedOjt.find({})
        .sort({
          updatedAt: -1,
          createdAt: -1,
        })
        .lean(),

      Announcement.find({})
        .sort({
          publishedOn: -1,
          createdAt: -1,
        })
        .limit(5)
        .lean(),
    ]);

    /*
     * =========================================================
     * 2. OJT COUNTS
     * =========================================================
     */

    const completedAssignments = assignments.filter(
      isCompletedAssignment
    );

    const activeAssignments = assignments.filter(
      isActiveAssignment
    );

    const activeOjt = activeAssignments.length;

    const completedOjt = completedAssignments.length;

    /*
     * =========================================================
     * 3. OJT PROGRESS
     * =========================================================
     */

    const allProgress = assignments.map((assignment) =>
      getSafeProgress(assignment)
    );

    const averageProgress = allProgress.length
      ? Math.round(
          allProgress.reduce(
            (total, value) => total + value,
            0
          ) / allProgress.length
        )
      : 0;

    const needsAttention = activeAssignments.filter(
      (assignment) => getSafeProgress(assignment) < 50
    ).length;

    /*
     * =========================================================
     * 4. STUDENTS BY DEPARTMENT
     * =========================================================
     */

    const students = await Student.find({})
      .select("_id name rollNumber department cgpa isVerified")
      .lean();

    const departmentMap = {};

    students.forEach((student) => {
      const department =
        student.department?.trim() || "Not Assigned";

      if (!departmentMap[department]) {
        departmentMap[department] = 0;
      }

      departmentMap[department] += 1;
    });

    const departmentBreakdown = Object.entries(
      departmentMap
    )
      .map(([department, count]) => ({
        department,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    /*
     * =========================================================
     * 5. COMPANY STATUS
     * =========================================================
     */

    const companyBreakdown = [
      {
        status: "Approved",
        count: approvedCompanies,
      },
      {
        status: "Pending",
        count: pendingCompanies,
      },
      {
        status: "Rejected",
        count: rejectedCompanies,
      },
    ];

    /*
     * =========================================================
     * 6. RECENT ANNOUNCEMENTS
     * =========================================================
     */

    const recentAnnouncements = announcements.map(
      (announcement) => ({
        id: announcement._id,
        title: announcement.title || "Untitled Announcement",
        message: announcement.message || "",
        audience:
          announcement.audience || "All Students",
        priority:
          announcement.priority || "Medium",
        status:
          announcement.status || "Published",
        publishedOn:
          announcement.publishedOn ||
          announcement.createdAt ||
          "",
      })
    );

    /*
     * =========================================================
     * 7. RECENT OJT ACTIVITY
     *
     * Resolve:
     * AssignedOjt
     *     ↓
     * Application
     *     ↓
     * Student
     *     ↓
     * Opportunity
     *     ↓
     * Company
     * =========================================================
     */

    const recentAssignmentRecords = [
      ...assignments,
    ]
      .sort(
        (a, b) =>
          getActivityDate(b).getTime() -
          getActivityDate(a).getTime()
      )
      .slice(0, 6);

    const recentAssignments = [];

    for (const assignment of recentAssignmentRecords) {
      const application = await Application.findOne({
        _id: assignment.applicationId,
      }).lean();

      const student = application
        ? await Student.findOne({
            _id: application.studentId,
          }).lean()
        : null;

      const opportunity = application
        ? await Opportunity.findOne({
            _id: application.opportunityId,
          }).lean()
        : null;

      const company = opportunity?.companyId
        ? await Company.findOne({
            _id: opportunity.companyId,
          }).lean()
        : null;

      const faculty = assignment.facultyId
        ? await Faculty.findOne({
            _id: assignment.facultyId,
          }).lean()
        : null;

      const progress = getSafeProgress(assignment);

      let status = "In Progress";

      if (isCompletedAssignment(assignment)) {
        status = "Completed";
      } else if (progress < 50) {
        status = "Needs Attention";
      }

      recentAssignments.push({
        id: assignment._id,
        assignmentId: assignment._id,
        studentId: student?._id || "",
        student:
          student?.name ||
          "Student not found",
        initials: getInitials(student?.name),
        rollNumber:
          student?.rollNumber || "N/A",
        company:
          company?.companyName ||
          "Company not found",
        companyId:
          opportunity?.companyId || "",
        position:
          opportunity?.title ||
          "OJT Position",
        mentor:
          faculty?.name ||
          "Mentor not assigned",
        department:
          student?.department ||
          "Not Assigned",
        progress,
        status,
        startDate:
          assignment.startDate || "",
        endDate:
          assignment.endDate || "",
        updatedAt:
          assignment.updatedAt ||
          assignment.createdAt ||
          "",
        displayDate: formatDate(
          assignment.updatedAt ||
            assignment.createdAt ||
            assignment.startDate
        ),
      });
    }

    /*
     * =========================================================
     * 8. FINAL DASHBOARD RESPONSE
     * =========================================================
     */

    const dashboardData = {
      stats: {
        totalStudents,
        totalCompanies,
        activeOjt,
        completedOjt,
      },

      studentStats: {
        total: totalStudents,
        verified: verifiedStudents,
        pending: pendingStudents,
      },

      companyStats: {
        total: totalCompanies,
        approved: approvedCompanies,
        pending: pendingCompanies,
        rejected: rejectedCompanies,
      },

      ojtStats: {
        total: assignments.length,
        active: activeOjt,
        completed: completedOjt,
        needsAttention,
        averageProgress,
      },

      recentAnnouncements,

      recentAssignments,

      departmentBreakdown,

      companyBreakdown,
    };

    return res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error(
      "Get coordinator dashboard error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch coordinator dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};