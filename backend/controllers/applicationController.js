const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const Student = require("../models/Student");
const Company = require("../models/Company");
const User = require("../models/User");
const Notification = require("../models/Notification");

// =====================================================
// CREATE APPLICATION
// Student applies for an OJT opportunity
// =====================================================

const createApplication = async (req, res) => {
  try {
    // Logged-in user's ID comes from authMiddleware
    const userId = req.user._id;

    // Get opportunity ID from frontend
    const { opportunityId } = req.body;

    if (!opportunityId) {
      return res.status(400).json({
        success: false,
        message: "Opportunity ID is required",
      });
    }

    // -------------------------------------------------
    // Find the student belonging to the logged-in user
    // -------------------------------------------------

    const student = await Student.findOne({
      userId: userId,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // -------------------------------------------------
    // Find opportunity
    // -------------------------------------------------

    const opportunity = await Opportunity.findById(opportunityId);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    // -------------------------------------------------
    // Check if opportunity is open
    // -------------------------------------------------

    if (
      opportunity.status &&
      opportunity.status.toLowerCase() !== "open"
    ) {
      return res.status(400).json({
        success: false,
        message: "This opportunity is not open for applications",
      });
    }

    // -------------------------------------------------
    // Check duplicate application
    // -------------------------------------------------

    const existingApplication = await Application.findOne({
      studentId: student._id,
      opportunityId: opportunity._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this opportunity",
      });
    }

    // -------------------------------------------------
    // Find company
    // -------------------------------------------------

    const company = await Company.findById(
      opportunity.companyId
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company associated with this opportunity not found",
      });
    }

    // -------------------------------------------------
    // Find company user
    // Company is linked with User through email
    // -------------------------------------------------

    const companyUser = await User.findOne({
      email: company.email,
    });

    if (!companyUser) {
      return res.status(404).json({
        success: false,
        message: "Company user account not found",
      });
    }

    // -------------------------------------------------
    // Create application
    // -------------------------------------------------

    const application = await Application.create({
      _id: `APP${Date.now()}`,
      studentId: student._id,
      opportunityId: opportunity._id,
      status: "Applied",
      appliedOn: new Date().toISOString().split("T")[0],
      reviewedOn: null,
    });

    // -------------------------------------------------
    // Create notification automatically
    // -------------------------------------------------

    await Notification.create({
      _id: `N${Date.now()}`,
      userId: companyUser._id,
      message: `${student.name || "A student"} applied for ${opportunity.title}.`,
      isRead: false,
      sentOn: new Date().toISOString(),
    });

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: error.message,
    });
  }
};


// =====================================================
// GET RECENT APPLICATIONS
// =====================================================

const getRecentApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ appliedOn: -1 })
      .limit(5);

    const result = [];

    for (const application of applications) {
      const student = await Student.findById(
        application.studentId
      );

      const opportunity = await Opportunity.findById(
        application.opportunityId
      );

      result.push({
        ...application.toObject(),

        student: student || null,

        opportunity: opportunity || null,
      });
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      applications: result,
    });

  } catch (error) {
    console.error("GET RECENT APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET APPLICATION STATS
// =====================================================

const getApplicationStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();

    const applied = await Application.countDocuments({
      status: "Applied",
    });

    const shortlisted = await Application.countDocuments({
      status: "Shortlisted",
    });

    const selected = await Application.countDocuments({
      status: "Selected",
    });

    const rejected = await Application.countDocuments({
      status: "Rejected",
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalApplications,
        applied,
        shortlisted,
        selected,
        rejected,
      },
    });

  } catch (error) {
    console.error("GET APPLICATION STATS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createApplication,
  getRecentApplications,
  getApplicationStats,
};