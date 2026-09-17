const Faculty = require("../models/Faculty");
const AssignedOjt = require("../models/AssignedOjt");
const Application = require("../models/Application");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");
const Company = require("../models/Company");
const User = require("../models/User");
const WeeklyReport = require("../models/WeeklyReport");
const Evaluation = require("../models/Evaluation");
// Get All Faculty
const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();

    res.status(200).json({
      success: true,
      count: faculty.length,
      faculty,
    });
  } catch (error) {
    console.error("Get All Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
    });
  }
};

// Get Faculty By ID
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    console.error("Get Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
    });
  }
};

// Get Faculty By Department
const getFacultyByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const faculty = await Faculty.find({
      department,
    });

    res.status(200).json({
      success: true,
      count: faculty.length,
      faculty,
    });
  } catch (error) {
    console.error("Get Faculty By Department Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
    });
  }
};

// Add Faculty
const addFaculty = async (req, res) => {
  try {
    const {
      _id,
      userId,
      name,
      department,
      designation,
    } = req.body;

    if (!_id || !userId || !name) {
      return res.status(400).json({
        success: false,
        message: "Faculty ID, userId and name are required",
      });
    }

    const existingFaculty = await Faculty.findById(_id);

    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty already exists",
      });
    }

    const faculty = await Faculty.create({
      _id,
      userId,
      name,
      department,
      designation,
    });

    res.status(201).json({
      success: true,
      message: "Faculty added successfully",
      faculty,
    });
  } catch (error) {
    console.error("Add Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add faculty",
    });
  }
};

// Update Faculty
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const {
      userId,
      name,
      department,
      designation,
    } = req.body;

    if (userId !== undefined) {
      faculty.userId = userId;
    }

    if (name !== undefined) {
      faculty.name = name;
    }

    if (department !== undefined) {
      faculty.department = department;
    }

    if (designation !== undefined) {
      faculty.designation = designation;
    }

    const updatedFaculty = await faculty.save();

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      faculty: updatedFaculty,
    });
  } catch (error) {
    console.error("Update Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update faculty",
    });
  }
};

// Delete Faculty
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    await Faculty.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    console.error("Delete Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete faculty",
    });
  }
};
// Get Faculty Dashboard Data
const getFacultyDashboard = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    // Only assignments belonging to this faculty
    const assignedOjt = await AssignedOjt.find({ facultyId });

    const dashboardData = [];

    for (const assignment of assignedOjt) {
      const application = await Application.findById(
        assignment.applicationId
      );

      if (!application) continue;

      const student = await Student.findById(application.studentId);

      const opportunity = await Opportunity.findById(
        application.opportunityId
      );

      let company = null;

      if (opportunity) {
        company = await Company.findById(opportunity.companyId);
      }

      // Calculate OJT progress
      let progress = 0;

if (assignment.startDate && assignment.endDate) {
  const startDate = new Date(assignment.startDate);
  const endDate = new Date(assignment.endDate);
  const today = new Date();

  const totalDuration = endDate - startDate;
  const elapsedDuration = today - startDate;

  if (totalDuration > 0) {
    progress = Math.round(
      (elapsedDuration / totalDuration) * 100
    );
  }

  progress = Math.max(0, Math.min(100, progress));
}

if (assignment.status === "Completed") {
  progress = 100;
}

      dashboardData.push({
  assignmentId: assignment._id,
  studentName: student ? student.name : "N/A",
  companyName: company ? company.companyName : "N/A",
  role: opportunity ? opportunity.title : "N/A",
  startDate: assignment.startDate,
  endDate: assignment.endDate,
  status: assignment.status,
  progress: progress,
});
    }
    res.status(200).json({
      success: true,
      assignedOjtCount: assignedOjt.length,
      assignedStudents: dashboardData,
    });
  } catch (error) {
    console.error("Faculty Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty dashboard data",
    });
  }
};
// Get Assigned Students
const getAssignedStudents = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    const assignedOjt = await AssignedOjt.find({ facultyId });

    const assignedStudents = [];

    for (const assignment of assignedOjt) {
      const application = await Application.findById(
        assignment.applicationId
      );

      if (!application) continue;

      const student = await Student.findById(application.studentId);
      const opportunity = await Opportunity.findById(
        application.opportunityId
      );

      let company = null;

      if (opportunity) {
        company = await Company.findById(opportunity.companyId);
      }

      assignedStudents.push({
        assignmentId: assignment._id,
        studentId: application.studentId,
        studentName: student ? student.name : "N/A",
        rollNumber: student ? student.rollNumber : "N/A",
        department: student ? student.department : "N/A",
        companyName: company ? company.companyName : "N/A",
        role: opportunity ? opportunity.title : "N/A",
        startDate: assignment.startDate,
        endDate: assignment.endDate,
        status: assignment.status,
      });
    }

    res.status(200).json({
      success: true,
      count: assignedStudents.length,
      assignedStudents,
    });
  } catch (error) {
    console.error("Get Assigned Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned students",
    });
  }
};
// Get Student Weekly Reports
const getStudentWeeklyReports = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find student's applications
    const applications = await Application.find({
      studentId: studentId,
    });

    let assignedOjt = null;

    // Find assigned OJT
    for (const app of applications) {
      const assignment = await AssignedOjt.findOne({
        applicationId: app._id,
      });

      if (assignment) {
        assignedOjt = assignment;
        break;
      }
    }

    if (!assignedOjt) {
      return res.status(200).json({
        success: true,
        count: 0,
        weeklyReports: [],
      });
    }

    // Get weekly reports
    const weeklyReports = await WeeklyReport.find({
      assignedOjtId: assignedOjt._id,
    }).sort({ submittedOn: 1 });

    res.status(200).json({
      success: true,
      count: weeklyReports.length,
      weeklyReports,
    });
  } catch (error) {
    console.error("Get Weekly Reports Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch weekly reports",
    });
  }
};
// Get Student Evaluation
const getStudentEvaluation = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find student's applications
    const applications = await Application.find({
      studentId: studentId,
    });

    let assignedOjt = null;

    // Find assigned OJT
    for (const app of applications) {
      const assignment = await AssignedOjt.findOne({
        applicationId: app._id,
      });

      if (assignment) {
        assignedOjt = assignment;
        break;
      }
    }

    if (!assignedOjt) {
      return res.status(200).json({
        success: true,
        count: 0,
        evaluations: [],
      });
    }

    // Get evaluations for this OJT
    const evaluations = await Evaluation.find({
      assignedOjtId: assignedOjt._id,
    }).sort({ evaluatedOn: -1 });
    console.log("Student ID:", studentId);
    console.log("Assigned OJT ID:", assignedOjt._id);
    console.log("Evaluations:", evaluations);

    res.status(200).json({
      success: true,
      count: evaluations.length,
      evaluations,
    });
  } catch (error) {
    console.error("Get Student Evaluation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student evaluation",
    });
  }
};
const getStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Find student user details
    const user = student.userId
      ? await User.findById(student.userId)
      : null;

    // Find all applications of this student
    const applications = await Application.find({
      studentId: studentId,
    });

    let application = null;
    let assignedOjt = null;

    // Find the application which is actually assigned for OJT
    for (const app of applications) {
      const assignment = await AssignedOjt.findOne({
        applicationId: app._id,
      });

      if (assignment) {
        application = app;
        assignedOjt = assignment;
        break;
      }
    }

    let opportunity = null;
    let company = null;
    let faculty = null;

if (assignedOjt && assignedOjt.facultyId) {
  faculty = await Faculty.findById(assignedOjt.facultyId);
}

    // Get opportunity and company
    if (application) {
      opportunity = await Opportunity.findById(
        application.opportunityId
      );

      if (opportunity) {
        company = await Company.findById(
          opportunity.companyId
        );
      }
    }

    // Calculate OJT progress
    let progress = 0;

    if (
      assignedOjt &&
      assignedOjt.startDate &&
      assignedOjt.endDate
    ) {
      const startDate = new Date(assignedOjt.startDate);
      const endDate = new Date(assignedOjt.endDate);
      const today = new Date();

      const totalDuration = endDate - startDate;
      const elapsedDuration = today - startDate;

      if (totalDuration > 0) {
        progress = Math.round(
          (elapsedDuration / totalDuration) * 100
        );
      }

      progress = Math.max(0, Math.min(100, progress));
    }

    if (
      assignedOjt &&
      assignedOjt.status === "Completed"
    ) {
      progress = 100;
    }

    // Get weekly reports
    const weeklyReports = assignedOjt
      ? await WeeklyReport.find({
          assignedOjtId: assignedOjt._id,
        }).sort({ submittedOn: 1 })
      : [];

    // Get evaluation
    const evaluation = assignedOjt
      ? await Evaluation.findOne({
          assignedOjtId: assignedOjt._id,
        })
      : null;
          // Create dynamic timeline
    const timeline = [];

    if (assignedOjt) {
      // OJT Started
      timeline.push({
        step: 1,
        label: "OJT Started",
        date: assignedOjt.startDate,
        state: "done",
      });

      // Progress Review
      if (weeklyReports.length > 0) {
        const latestReport =
          weeklyReports[weeklyReports.length - 1];

        timeline.push({
          step: timeline.length + 1,
          label: "Progress Review",
          date: latestReport.submittedOn,
          state: "current",
        });
      }

      // Final Evaluation
      if (evaluation) {
        timeline.push({
          step: timeline.length + 1,
          label: "Final Evaluation",
          date: evaluation.evaluatedOn,
          state: "done",
        });
      }

      // OJT Completion
      timeline.push({
        step: timeline.length + 1,
        label: "OJT Completion",
        date: assignedOjt.endDate,
        state:
          assignedOjt.status === "Completed"
            ? "done"
            : "upcoming",
      });
    }

    res.status(200).json({ 
  success: true, 
  student: { 
    studentId: student._id, 
    name: student.name, 
    rollNumber: student.rollNumber, 
    department: student.department, 

    userId: student.userId || "",

    email: user ? user.email : "", 
    phone: user ? user.phone : "",
 
    profilePhotoUrl: 
      student.profilePhotoUrl || "", 
 
    resumeUrl: 
      student.resumeUrl || "", 

        status: user ? user.status : "Active",

        companyName: company
          ? company.companyName
          : "",

        role: opportunity
          ? opportunity.title
          : "",

        startDate: assignedOjt
          ? assignedOjt.startDate
          : "",

        endDate: assignedOjt
          ? assignedOjt.endDate
          : "",

        ojtStatus: assignedOjt
          ? assignedOjt.status
          : "",

        progress: progress,

        timeline: timeline,
      },
      mentorNote: weeklyReports.length > 0
  ? {
      text:
        weeklyReports[weeklyReports.length - 1].facultyRemarks || "",
      updated:
        weeklyReports[weeklyReports.length - 1].submittedOn || "",
      author: faculty ? faculty.name : "Faculty Mentor",
    }
  : null,
    });
  } catch (error) {
    console.error(
      "Get Student Details Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch student details",
    });
  }
};
module.exports = {
  getAllFaculty,
  getFacultyById,
  getFacultyByDepartment,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getFacultyDashboard,
  getAssignedStudents,
  getStudentWeeklyReports,
  getStudentEvaluation,
  getStudentDetails,
};