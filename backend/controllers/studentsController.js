const AssignOjt = require("../models/AssignOjt");
const Attendance = require("../models/Attendance");
const Evaluation = require("../models/Evaluation");

const getAssignedStudents = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const assignments = await AssignOjt.find({ facultyId })
      .populate({
        path: "applicationId",
        populate: { path: "studentId", model: "Student" },
      })
      .lean();

    const assignedOjtIds = assignments.map((a) => a._id);

    const attendanceRecords = await Attendance.find({
      assignedOjtId: { $in: assignedOjtIds },
    }).lean();

    const evaluations = await Evaluation.find({
      assignedOjtId: { $in: assignedOjtIds },
    }).lean();

    const studentsList = assignments.map((a) => {
      const student = a.applicationId?.studentId;

      const attendanceForThis = attendanceRecords.filter(
        (att) => String(att.assignedOjtId) === String(a._id)
      );

      const totalDays = attendanceForThis.length;

      const presentDays = attendanceForThis.filter(
        (att) => att.status === "Present"
      ).length;

      const progressPercent =
        totalDays > 0
          ? Math.round((presentDays / totalDays) * 100)
          : 0;

      const hasEvaluation = evaluations.some(
        (ev) => String(ev.assignedOjtId) === String(a._id)
      );

      return {
        assignOjtId: a._id,
        studentId: student?._id || null,
        name: student?.name || "N/A",
        rollNumber: student?.rollNumber || "N/A",
        department: student?.department || "N/A",
        cgpa: student?.cgpa ?? null,
        profilePhotoUrl: student?.profilePhotoUrl || null,
        company: null,
        role: null,
        startDate: a.startDate,
        endDate: a.endDate,
        status: a.status,
        progressPercent,
        isEvaluated: hasEvaluation,
      };
    });

    return res.status(200).json({
      success: true,
      count: studentsList.length,
      data: studentsList,
    });
  } catch (error) {
    console.error("Assigned Students API error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assigned students",
      error: error.message,
    });
  }
};

module.exports = { getAssignedStudents };