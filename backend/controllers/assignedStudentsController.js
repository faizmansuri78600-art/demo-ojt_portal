const AssignOJT = require("../models/assignOjtModel");
const Application = require("../models/applicationModel");
const Student = require("../models/studentModel");

exports.getAssignedStudents = async (req, res) => {
  try {
    const { facultyId } = req.params;

    if (!facultyId) {
      return res.status(400).json({
        success: false,
        message: "facultyId is required",
      });
    }

    // Step 1: get all assignments for this faculty
    const assignments = await AssignOJT.find({ facultyId });

    if (!assignments || assignments.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Step 2 & 3: for each assignment, get application -> student
    const results = await Promise.all(
      assignments.map(async (assign) => {
        const application = await Application.findOne({
          _id: assign.applicationId,
        });

        if (!application) return null;

        const student = await Student.findOne({
          _id: application.studentId,
        });

        if (!student) return null;

        return {
          assignOjtId: assign._id,
          studentId: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          department: student.department,
          startDate: assign.startDate,
          endDate: assign.endDate,
          status: assign.status,
        };
      })
    );

    // remove any nulls (broken/missing references)
    const cleanData = results.filter((item) => item !== null);

    return res.status(200).json({
      success: true,
      data: cleanData,
    });
  } catch (error) {
    console.error("Error in getAssignedStudents:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching assigned students",
    });
  }
};