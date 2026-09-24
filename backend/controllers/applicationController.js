const Application = require("../models/Application");
const Student = require("../models/Student");

const createApplication = async (req, res) => {
  try {
    const applications = await Application.find({})
      .sort({ appliedOn: -1 })
      .limit(10)
      .populate("studentId", "name rollNumber department")
      .populate("opportunityId", "title companyId");

    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    console.error("Get Recent Applications Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch recent applications" });
  }
};

const getApplicationStats = async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const pending = await Application.countDocuments({ status: "Pending" });
    const inReview = await Application.countDocuments({ status: "In Review" });
    const shortlisted = await Application.countDocuments({ status: "Shortlisted" });
    const accepted = await Application.countDocuments({ status: "Accepted" });
    const rejected = await Application.countDocuments({ status: "Rejected" });

    res.status(200).json({
      success: true,
      stats: { total, pending, inReview, shortlisted, accepted, rejected },
    });
  } catch (error) {
    console.error("Get Application Stats Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch application stats" });
  }
};

const applyToOpportunity = async (req, res) => {
  try {
    const { studentId, opportunityId, status, appliedOn } = req.body;

    if (!studentId || !opportunityId) {
      return res
        .status(400)
        .json({ success: false, message: "studentId and opportunityId are required" });
    }

    const existing = await Application.findOne({ studentId, opportunityId });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "You have already applied to this opportunity" });
    }

    const application = await Application.create({
      _id: `AP${Date.now()}`,
      studentId,
      opportunityId,
      status: status || "Pending",
      appliedOn: appliedOn || new Date().toISOString().split("T")[0],
    });

    res.status(201).json({ success: true, application });
  } catch (error) {
    console.error("Apply To Opportunity Error:", error);
    res.status(500).json({ success: false, message: "Failed to submit application" });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student profile not found" });
    }

    const applications = await Application.find({ studentId: student._id });

    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    console.error("Get My Applications Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch your applications" });
  }
};

module.exports = {
  createApplication,
  getApplicationStats,
  applyToOpportunity,
  getMyApplications,
};