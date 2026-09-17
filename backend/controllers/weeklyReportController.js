const WeeklyReport = require("../models/WeeklyReport");
const AssignedOjt = require("../models/AssignedOjt");
const Application = require("../models/Application");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");
const Company = require("../models/Company");

// ======================================
// Get All Weekly Reports
// ======================================

const getAllWeeklyReports = async (req, res) => {
  try {
    const reports = await WeeklyReport.find()
      .sort({ submittedOn: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports: reports,
    });
  } catch (error) {
    console.error(
      "Get All Weekly Reports Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch weekly reports",
    });
  }
};


// ======================================
// Get Weekly Report By ID
// ======================================

const getWeeklyReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await WeeklyReport.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Weekly report not found",
      });
    }

    res.status(200).json({
      success: true,
      report: report,
    });
  } catch (error) {
    console.error(
      "Get Weekly Report Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch weekly report",
    });
  }
};


// ======================================
// Get Reports By Assigned OJT ID
// ======================================

const getReportsByOjtId = async (req, res) => {
  try {
    const { assignedOjtId } = req.params;

    const reports = await WeeklyReport.find({
      assignedOjtId: assignedOjtId,
    }).sort({ weekNumber: 1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports: reports,
    });
  } catch (error) {
    console.error(
      "Get Reports By OJT ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch OJT weekly reports",
    });
  }
};

// ======================================
// Get Weekly Reports By Faculty ID
// ======================================

const getReportsByFacultyId = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const assignedOjts = await AssignedOjt.find({ facultyId });

    const reports = [];

    for (const assignment of assignedOjts) {

      const weeklyReports = await WeeklyReport.find({
        assignedOjtId: assignment._id,
      }).sort({ weekNumber: 1 });

      for (const report of weeklyReports) {

        const application = await Application.findById(
          assignment.applicationId
        );

        if (!application) continue;

        const student = await Student.findById(
          application.studentId
        );

        const opportunity = await Opportunity.findById(
          application.opportunityId
        );

        let company = null;

        if (opportunity) {
          company = await Company.findById(
            opportunity.companyId
          );
        }

        reports.push({
          id: report._id,
           studentId: student ? student._id : null,
  assignedOjtId: assignment._id,
 taskAssigned: report.taskAssigned || "",
workCompleted: report.workCompleted || "",
facultyRemarks: report.facultyRemarks || "",
name: student ? student.name : "N/A",

          initials: student
            ? student.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
            : "NA",

          company: company
            ? company.companyName
            : "N/A",

          reportType: "Weekly Diary",

          week: `Week ${report.weekNumber}`,

          dateRange: `${assignment.startDate || ""} - ${
            assignment.endDate || ""
          }`,

          submittedDate: report.submittedOn || "N/A",

          submittedTime: "",

          status: report.status || "Pending Review",
        });
      }
    }

    res.status(200).json({
      success: true,
      count: reports.length,
      reports: reports,
    });

  } catch (error) {

    console.error(
      "Get Reports By Faculty ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty weekly reports",
    });
  }
};

// ======================================
// Add Weekly Report
// ======================================

const addWeeklyReport = async (req, res) => {
  try {
    const {
      _id,
      assignedOjtId,
      weekNumber,
      taskAssigned,
      workCompleted,
      submittedOn,
      facultyRemarks,
    } = req.body;

    if (
      !_id ||
      !assignedOjtId ||
      weekNumber === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Report ID, assignedOjtId and weekNumber are required",
      });
    }

    const existingReport =
      await WeeklyReport.findById(_id);

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: "Weekly report already exists",
      });
    }

    const report = await WeeklyReport.create({
      _id,
      assignedOjtId,
      weekNumber,
      taskAssigned,
      workCompleted,
      submittedOn,
      facultyRemarks,
    });

    res.status(201).json({
      success: true,
      message: "Weekly report added successfully",
      report: report,
    });
  } catch (error) {
    console.error(
      "Add Weekly Report Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add weekly report",
    });
  }
};


// ======================================
// Update Weekly Report
// ======================================

const updateWeeklyReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report =
      await WeeklyReport.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Weekly report not found",
      });
    }

    const {
      assignedOjtId,
      weekNumber,
      taskAssigned,
      workCompleted,
      submittedOn,
      facultyRemarks,
      status,
    } = req.body;

    if (assignedOjtId !== undefined) {
      report.assignedOjtId =
        assignedOjtId;
    }

    if (weekNumber !== undefined) {
      report.weekNumber =
        weekNumber;
    }

    if (taskAssigned !== undefined) {
      report.taskAssigned =
        taskAssigned;
    }

    if (workCompleted !== undefined) {
      report.workCompleted =
        workCompleted;
    }

    if (submittedOn !== undefined) {
      report.submittedOn =
        submittedOn;
    }

    if (facultyRemarks !== undefined) {
      report.facultyRemarks =
        facultyRemarks;
    }
    if (status !== undefined) {
    report.status = status;
    }

    const updatedReport =
      await report.save();

    res.status(200).json({
      success: true,
      message:
        "Weekly report updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    console.error(
      "Update Weekly Report Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update weekly report",
    });
  }
};


// ======================================
// Delete Weekly Report
// ======================================

const deleteWeeklyReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report =
      await WeeklyReport.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Weekly report not found",
      });
    }

    await WeeklyReport.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Weekly report deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Weekly Report Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete weekly report",
    });
  }
};


// ======================================
// Export
// ======================================

module.exports = {
  getAllWeeklyReports,
  getWeeklyReportById,
  getReportsByOjtId,
  getReportsByFacultyId,
  addWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport,
};