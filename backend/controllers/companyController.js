const Company = require("../models/Company");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const CompanyCoordinator = require("../models/CompanyCoordinator");
const Student = require("../models/Student");
const User = require("../models/User");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json({ success: true, count: companies.length, companies });
  } catch (error) {
    console.error("Get All Companies Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch companies" });
  }
};

const getVerifiedCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isVerified: true });
    res.status(200).json({ success: true, count: companies.length, companies });
  } catch (error) {
    console.error("Get Verified Companies Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch verified companies" });
  }
};

const getApplications = async (req, res) => {
  try {
    // 1. Find the company this logged-in coordinator represents
    const coordinator = await CompanyCoordinator.findOne({ userId: req.user._id });
    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "No company profile is linked to this account yet",
      });
    }

    // 2. Opportunities posted by that company
    const opportunities = await Opportunity.find({ companyId: coordinator.companyId });
    const opportunityIds = opportunities.map((o) => o._id);
    const titleMap = Object.fromEntries(opportunities.map((o) => [o._id, o.title]));

    // 3. Applications against those opportunities
    const applications = await Application.find({
      opportunityId: { $in: opportunityIds },
    }).sort({ appliedOn: -1 });

    // 4. Student + user details (Application has no name/email/skills itself)
    const studentIds = [...new Set(applications.map((a) => a.studentId))];
    const students = await Student.find({ _id: { $in: studentIds } });
    const studentMap = Object.fromEntries(students.map((s) => [s._id, s]));

    const userIds = students.map((s) => s.userId).filter(Boolean);
    const users = await User.find({ _id: { $in: userIds } });
    const userMap = Object.fromEntries(users.map((u) => [u._id, u]));

    const getInitials = (name = "") =>
      name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);

    const shaped = applications.map((a) => {
      const student = studentMap[a.studentId] || {};
      const user = userMap[student.userId] || {};
      return {
        id: a._id,
        name: student.name || "",
        initials: getInitials(student.name),
        email: user.email || "",
        college: student.department || "", // no separate "college" field yet — known gap
        department: student.department || "",
        skills: [], // Student schema has no skills field yet — known gap
        opportunity: titleMap[a.opportunityId] || "",
        status: a.status,
        appliedOn: a.appliedOn,
      };
    });

    res.status(200).json({ success: true, count: shaped.length, applications: shaped });
  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status, reviewedOn: new Date().toISOString().split("T")[0] },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Update Application Status Error:", error);
    res.status(500).json({ success: false, message: "Failed to update application status" });
  }
};

module.exports = { getAllCompanies, getVerifiedCompanies, getApplications, updateApplicationStatus };