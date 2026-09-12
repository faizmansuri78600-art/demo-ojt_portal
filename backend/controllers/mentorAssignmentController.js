const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const AssignedOjt = require("../models/AssignedOjt");

// ======================================================
// GET ALL MENTOR ASSIGNMENT DATA
// ======================================================
// Returns:
// 1. Faculty mentors
// 2. Selected applications
// 3. Existing mentor assignments
// ======================================================

const getMentorAssignmentData = async (req, res) => {
  try {
    // --------------------------------------------------
    // GET ALL FACULTY MENTORS
    // --------------------------------------------------

    const mentors = await Faculty.find({})
      .sort({ name: 1 })
      .lean();

    // --------------------------------------------------
    // GET SELECTED APPLICATIONS
    // --------------------------------------------------
    // Only selected applications are available for
    // mentor assignment.

    const applications = await Application.find({
      status: "Selected",
    })
      .sort({ appliedOn: -1 })
      .lean();

    // --------------------------------------------------
    // GET STUDENTS
    // --------------------------------------------------

    const students = await Student.find({}).lean();

    // --------------------------------------------------
    // GET OJT OPPORTUNITIES
    // --------------------------------------------------

    const opportunities = await Opportunity.find({}).lean();

    // --------------------------------------------------
    // GET EXISTING ASSIGNMENTS
    // --------------------------------------------------

    const assignments = await AssignedOjt.find({})
      .sort({ createdAt: -1 })
      .lean();

    // --------------------------------------------------
    // CREATE QUICK LOOKUP MAPS
    // --------------------------------------------------

    const studentMap = new Map();

    students.forEach((student) => {
      studentMap.set(String(student._id), student);
    });

    const opportunityMap = new Map();

    opportunities.forEach((opportunity) => {
      opportunityMap.set(
        String(opportunity._id),
        opportunity
      );
    });

    const assignmentMap = new Map();

    assignments.forEach((assignment) => {
      assignmentMap.set(
        String(assignment.applicationId),
        assignment
      );
    });

    // --------------------------------------------------
    // FORMAT APPLICATION DATA
    // --------------------------------------------------

    const formattedApplications = applications.map(
      (application) => {
        const student = studentMap.get(
          String(application.studentId)
        );

        const opportunity = opportunityMap.get(
          String(application.opportunityId)
        );

        const existingAssignment =
          assignmentMap.get(
            String(application._id)
          );

        return {
          applicationId: application._id,

          studentId: application.studentId,

          studentName: student
            ? student.name
            : "Unknown Student",

          rollNumber: student
            ? student.rollNumber
            : "",

          studentDepartment: student
            ? student.department
            : "",

          cgpa: student
            ? student.cgpa
            : null,

          opportunityId: application.opportunityId,

          opportunityTitle: opportunity
            ? opportunity.title
            : "Unknown Opportunity",

          companyId: opportunity
            ? opportunity.companyId
            : "",

          appliedOn: application.appliedOn || "",

          applicationStatus:
            application.status || "Selected",

          assigned: !!existingAssignment,

          assignmentId: existingAssignment
            ? existingAssignment._id
            : null,

          facultyId: existingAssignment
            ? existingAssignment.facultyId
            : "",

          startDate: existingAssignment
            ? existingAssignment.startDate
            : "",

          endDate: existingAssignment
            ? existingAssignment.endDate
            : "",

          assignmentStatus: existingAssignment
            ? existingAssignment.status
            : "",
        };
      }
    );

    // --------------------------------------------------
    // ADD ASSIGNED COUNT TO EACH MENTOR
    // --------------------------------------------------

    const mentorAssignmentCounts = {};

    assignments.forEach((assignment) => {
      const facultyId = String(
        assignment.facultyId
      );

      mentorAssignmentCounts[facultyId] =
        (mentorAssignmentCounts[facultyId] || 0) + 1;
    });

    // --------------------------------------------------
    // FORMAT MENTOR DATA
    // --------------------------------------------------

    const formattedMentors = mentors.map(
      (mentor) => {
        const assigned =
          mentorAssignmentCounts[
            String(mentor._id)
          ] || 0;

        return {
          id: mentor._id,

          name: mentor.name || "Unnamed Mentor",

          department: mentor.department || "",

          designation: mentor.designation || "",

          userId: mentor.userId || "",

          assigned,

          capacity: 8,

          availableCapacity: Math.max(
            8 - assigned,
            0
          ),

          status:
            assigned >= 8
              ? "Full"
              : assigned > 0
              ? "Assigned"
              : "Available",
        };
      }
    );

    // --------------------------------------------------
    // FORMAT ASSIGNMENTS
    // --------------------------------------------------

    const formattedAssignments = assignments.map(
      (assignment) => {
        const application = applications.find(
          (item) =>
            String(item._id) ===
            String(assignment.applicationId)
        );

        const student = studentMap.get(
          String(
            assignment.studentId ||
              (application
                ? application.studentId
                : "")
          )
        );

        const opportunity = opportunityMap.get(
          String(
            application
              ? application.opportunityId
              : ""
          )
        );

        const mentor = mentors.find(
          (item) =>
            String(item._id) ===
            String(assignment.facultyId)
        );

        return {
          ...assignment,

          applicationId:
            assignment.applicationId || "",

          studentId:
            assignment.studentId ||
            (application
              ? application.studentId
              : ""),

          studentName: student
            ? student.name
            : "Unknown Student",

          rollNumber: student
            ? student.rollNumber
            : "",

          studentDepartment: student
            ? student.department
            : "",

          cgpa: student
            ? student.cgpa
            : null,

          facultyId:
            assignment.facultyId || "",

          mentorName: mentor
            ? mentor.name
            : "Unknown Mentor",

          mentorDepartment: mentor
            ? mentor.department
            : "",

          mentorDesignation: mentor
            ? mentor.designation
            : "",

          opportunityId: application
            ? application.opportunityId
            : "",

          opportunityTitle: opportunity
            ? opportunity.title
            : "Unknown Opportunity",

          companyId: opportunity
            ? opportunity.companyId
            : "",

          applicationStatus: application
            ? application.status
            : "Unknown",
        };
      }
    );

    // --------------------------------------------------
    // SUCCESS RESPONSE
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      mentors: formattedMentors,

      applications: formattedApplications,

      assignments: formattedAssignments,
    });
  } catch (error) {
    console.error(
      "Get mentor assignment data error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch mentor assignment data",

      error: error.message,
    });
  }
};

// ======================================================
// ASSIGN MENTOR
// ======================================================

const assignMentor = async (req, res) => {
  try {
    const {
      applicationId,
      facultyId,
      startDate,
      endDate,
      status,
    } = req.body;

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "Application is required",
      });
    }

    if (!facultyId) {
      return res.status(400).json({
        success: false,
        message: "Mentor is required",
      });
    }

    if (!startDate) {
      return res.status(400).json({
        success: false,
        message: "Start date is required",
      });
    }

    if (!endDate) {
      return res.status(400).json({
        success: false,
        message: "End date is required",
      });
    }

    // --------------------------------------------------
    // FIND APPLICATION
    // --------------------------------------------------

    const application =
      await Application.findOne({
        _id: applicationId,
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // --------------------------------------------------
    // ONLY SELECTED APPLICATIONS
    // --------------------------------------------------

    if (application.status !== "Selected") {
      return res.status(400).json({
        success: false,
        message:
          "Only selected student applications can be assigned",
      });
    }

    // --------------------------------------------------
    // FIND STUDENT
    // --------------------------------------------------

    const student = await Student.findOne({
      _id: application.studentId,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // --------------------------------------------------
    // FIND FACULTY
    // --------------------------------------------------

    const faculty = await Faculty.findOne({
      _id: facultyId,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty mentor not found",
      });
    }

    // --------------------------------------------------
    // CHECK DUPLICATE ASSIGNMENT
    // --------------------------------------------------

    const existingAssignment =
      await AssignedOjt.findOne({
        applicationId,
      });

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message:
          "This student application is already assigned to a mentor",
      });
    }

    // --------------------------------------------------
    // MAXIMUM 8 STUDENTS PER MENTOR
    // --------------------------------------------------

    const mentorAssignmentCount =
      await AssignedOjt.countDocuments({
        facultyId,
      });

    if (mentorAssignmentCount >= 8) {
      return res.status(400).json({
        success: false,
        message:
          "This mentor already has the maximum of 8 students",
      });
    }

    // --------------------------------------------------
    // CREATE ASSIGNMENT
    // --------------------------------------------------

    const assignment = new AssignedOjt({
      _id: `AO-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`,

      applicationId,

      studentId: application.studentId,

      facultyId,

      assignedByCoordinatorId:
        req.user?.id ||
        req.user?._id ||
        req.user?.userId ||
        "COLLEGE-COORD-001",

      startDate,

      endDate,

      status: status || "Assigned",
    });

    await assignment.save();

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    return res.status(201).json({
      success: true,

      message:
        "Mentor assigned successfully",

      assignment,
    });
  } catch (error) {
    console.error(
      "Assign mentor error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to assign mentor",

      error: error.message,
    });
  }
};

// ======================================================
// UPDATE MENTOR ASSIGNMENT
// ======================================================

const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      facultyId,
      startDate,
      endDate,
      status,
    } = req.body;

    // --------------------------------------------------
    // FIND ASSIGNMENT
    // --------------------------------------------------

    const assignment =
      await AssignedOjt.findOne({
        _id: id,
      });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message:
          "Mentor assignment not found",
      });
    }

    // --------------------------------------------------
    // CHANGE MENTOR
    // --------------------------------------------------

    if (
      facultyId &&
      facultyId !== assignment.facultyId
    ) {
      const faculty =
        await Faculty.findOne({
          _id: facultyId,
        });

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message:
            "Faculty mentor not found",
        });
      }

      // Check new mentor capacity
      const mentorAssignmentCount =
        await AssignedOjt.countDocuments({
          facultyId,

          _id: {
            $ne: id,
          },
        });

      if (mentorAssignmentCount >= 8) {
        return res.status(400).json({
          success: false,
          message:
            "This mentor already has the maximum of 8 students",
        });
      }

      assignment.facultyId = facultyId;
    }

    // --------------------------------------------------
    // UPDATE START DATE
    // --------------------------------------------------

    if (startDate !== undefined) {
      assignment.startDate = startDate;
    }

    // --------------------------------------------------
    // UPDATE END DATE
    // --------------------------------------------------

    if (endDate !== undefined) {
      assignment.endDate = endDate;
    }

    // --------------------------------------------------
    // UPDATE STATUS
    // --------------------------------------------------

    if (status !== undefined) {
      assignment.status = status;
    }

    await assignment.save();

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "Mentor assignment updated successfully",

      assignment,
    });
  } catch (error) {
    console.error(
      "Update assignment error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to update mentor assignment",

      error: error.message,
    });
  }
};

// ======================================================
// DELETE MENTOR ASSIGNMENT
// ======================================================

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    // --------------------------------------------------
    // FIND ASSIGNMENT
    // --------------------------------------------------

    const assignment =
      await AssignedOjt.findOne({
        _id: id,
      });

    if (!assignment) {
      return res.status(404).json({
        success: false,

        message:
          "Mentor assignment not found",
      });
    }

    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    await AssignedOjt.deleteOne({
      _id: id,
    });

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "Mentor assignment deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete assignment error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to delete mentor assignment",

      error: error.message,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  getMentorAssignmentData,
  assignMentor,
  updateAssignment,
  deleteAssignment,
};