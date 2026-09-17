const Application = require("../models/Application");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");

// ======================================
// Get Recent Applications
// ======================================

const getRecentApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ appliedOn: -1 })
      .limit(5);

    const formattedApplications = await Promise.all(
      applications.map(async (application) => {
        const student = await Student.findById(application.studentId);

        const opportunity = await Opportunity.findById(
          application.opportunityId
        );

        return {
          applicationId: application._id,

          studentId: application.studentId,

          studentName: student?.name || "Unknown Student",

          opportunityId: application.opportunityId,

          opportunityTitle:
            opportunity?.title || "Unknown Opportunity",

          companyId: opportunity?.companyId || "—",

          location: opportunity?.location || "—",

          status: application.status,

          appliedOn: application.appliedOn,

          reviewedOn: application.reviewedOn,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: formattedApplications.length,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error("Get Recent Applications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent applications",
    });
  }
};

// ======================================
// Get Application Statistics
// ======================================

const getApplicationStats = async (req, res) => {
  try {
    // Total applications
    const totalApplications = await Application.countDocuments();

    // Applications with status Applied
    const totalPending = await Application.countDocuments({
      status: "Applied",
    });

    // Applications with status Selected
    const totalSelected = await Application.countDocuments({
      status: "Selected",
    });

    // Applications with status Rejected
    const totalRejected = await Application.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      success: true,

      stats: {
        totalApplications: totalApplications,

        pending: totalPending,

        approved: totalSelected,

        rejected: totalRejected,
      },
    });
  } catch (error) {
    console.error("Application Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch application statistics",
    });
  }
};

// ======================================
// Export Functions
// ======================================

module.exports = {
  getRecentApplications,
  getApplicationStats,
};