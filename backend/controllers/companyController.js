const Company = require("../models/Company");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const Student = require("../models/Student");

// =====================================================
// Get all companies
// =====================================================

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
      error: error.message,
    });
  }
};

// =====================================================
// Get verified companies
// =====================================================

const getVerifiedCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isVerified: true });

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch verified companies",
      error: error.message,
    });
  }
};

// =====================================================
// Get one company by ID
// =====================================================

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch company",
      error: error.message,
    });
  }
};

// =====================================================
// Create new company profile
// =====================================================

const createCompany = async (req, res) => {
  try {
    const allowedFields = [
      "companyName",
      "yearOfEstablishment",
      "registrationNumber",
      "companySize",
      "industry",
      "headOffice",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
      "website",
      "contactPerson",
      "alternateEmail",
      "email",
      "mobileNumber",
      "phoneNumber",
      "description",
      "logoUrl",
    ];

    const companyData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        companyData[field] = req.body[field];
      }
    });

    // Find the latest old-style company ID
    const companies = await Company.find(
      {
        _id: /^company_\d+$/,
      },
      {
        _id: 1,
      }
    );

    let nextNumber = 1;

    companies.forEach((company) => {
      const number = parseInt(
        company._id.replace("company_", ""),
        10
      );

      if (!isNaN(number) && number >= nextNumber) {
        nextNumber = number + 1;
      }
    });

    const newCompanyId = `company_${String(
      nextNumber
    ).padStart(3, "0")}`;

    const company = await Company.create({
      _id: newCompanyId,
      ...companyData,
    });

    res.status(201).json({
      success: true,
      message: "New company profile created successfully",
      company,
    });
  } catch (error) {
    console.error("Error creating company:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create company profile",
      error: error.message,
    });
  }
};

// =====================================================
// Update existing company profile by ID
// =====================================================

const updateCompany = async (req, res) => {
  try {
    const allowedFields = [
      "companyName",
      "yearOfEstablishment",
      "registrationNumber",
      "companySize",
      "industry",
      "headOffice",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
      "website",
      "contactPerson",
      "alternateEmail",
      "email",
      "mobileNumber",
      "phoneNumber",
      "description",
      "logoUrl",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      company,
    });
  } catch (error) {
    console.error("Error updating company:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update company profile",
      error: error.message,
    });
  }
};

// =====================================================
// GET LOGGED-IN COMPANY PROFILE
// =====================================================

const getMyCompanyProfile = async (req, res) => {
  try {
    // Get email of currently logged-in Company user
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "Logged-in user email not found",
      });
    }

    // Find company using logged-in user's email
    const company = await Company.findOne({
      email: userEmail,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get My Company Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch company profile",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE LOGGED-IN COMPANY PROFILE
// =====================================================

const updateMyCompanyProfile = async (req, res) => {
  try {
    // Get email of currently logged-in Company user
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "Logged-in user email not found",
      });
    }

    const allowedFields = [
      "companyName",
      "yearOfEstablishment",
      "registrationNumber",
      "companySize",
      "industry",
      "headOffice",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
      "website",
      "contactPerson",
      "alternateEmail",
      "email",
      "mobileNumber",
      "phoneNumber",
      "description",
      "logoUrl",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Update only the company belonging to logged-in user
    const company = await Company.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      company,
    });
  } catch (error) {
    console.error("Update My Company Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update company profile",
      error: error.message,
    });
  }
};

// =====================================================
// UPLOAD COMPANY LOGO
// =====================================================

const uploadCompanyLogo = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "Logged-in user email not found",
      });
    }

    // Check if a logo was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a company logo",
      });
    }

    // Find company using logged-in user's email
    const company = await Company.findOne({
      email: userEmail,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found for this user",
      });
    }

    // Path that will be stored in MongoDB
    const logoUrl = `/uploads/company-logos/${req.file.filename}`;

    // Save logo path in company document
    company.logoUrl = logoUrl;

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company logo uploaded successfully",
      logoUrl: company.logoUrl,
      company,
    });
  } catch (error) {
    console.error("Upload Company Logo Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload company logo",
      error: error.message,
    });
  }
};

// =====================================================
// COMPANY DASHBOARD - RECENT APPLICATIONS
// =====================================================

const getCompanyDashboardApplications = async (req, res) => {
  try {
    const { id } = req.params;

    // Find opportunities belonging to this company
    const opportunities = await Opportunity.find({
      companyId: id,
    });

    const opportunityIds = opportunities.map(
      (opportunity) => opportunity._id
    );

    // Find applications for those opportunities
    const applications = await Application.find({
      opportunityId: { $in: opportunityIds },
    })
      .sort({ appliedOn: -1 })
      .limit(5);

    const formattedApplications = await Promise.all(
      applications.map(async (application) => {
        const student = await Student.findById(
          application.studentId
        );

        const opportunity = opportunities.find(
          (item) => item._id === application.opportunityId
        );

        return {
          applicationId: application._id,
          studentId: application.studentId,
          studentName:
            student?.name || "Unknown Student",
          opportunityId: application.opportunityId,
          opportunityTitle:
            opportunity?.title || "Unknown Opportunity",
          companyId: id,
          location:
            opportunity?.location || "—",
          status: application.status,
          appliedOn: application.appliedOn,
          reviewedOn: application.reviewedOn,
        };
      })
    );

    res.status(200).json({
      success: true,
      companyId: id,
      count: formattedApplications.length,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error(
      "Company Dashboard Applications Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch company dashboard applications",
      error: error.message,
    });
  }
};

// =====================================================
// COMPANY DASHBOARD - STATISTICS
// =====================================================

const getCompanyDashboardStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all opportunities belonging to this company
    console.log("COMPANY ID:", id);

const allOpportunities = await Opportunity.find({});
console.log("ALL OPPORTUNITIES:", allOpportunities);

const opportunities = await Opportunity.find({ companyId: id });
console.log("MATCHING OPPORTUNITIES:", opportunities);
    const opportunityIds = opportunities.map(
      (opportunity) => opportunity._id
    );

    // Total opportunities
    const totalOpportunities =
      opportunities.length;

    // Open opportunities
    const activeOpportunities =
      opportunities.filter(
        (opportunity) =>
          opportunity.status === "Open"
      ).length;

    // Find applications belonging to this company
    const applications = await Application.find({
      opportunityId: { $in: opportunityIds },
    });

    // Total applications
    const totalApplications =
      applications.length;

    // Selected students
    const selectedStudents =
      applications.filter(
        (application) =>
          application.status === "Selected"
      ).length;

    res.status(200).json({
      success: true,
      companyId: id,
      stats: {
        totalOpportunities,
        activeOpportunities,
        totalApplications,
        selectedStudents,
      },
    });
  } catch (error) {
    console.error(
      "Company Dashboard Stats Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch company dashboard statistics",
      error: error.message,
    });
  }
};

// =====================================================
// COMPANY DASHBOARD - APPLICATION TREND
// =====================================================

const getCompanyDashboardApplicationTrend = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { month } = req.query;

    // Find opportunities belonging to this company
    const opportunities = await Opportunity.find({
      companyId: id,
    });

    const opportunityIds = opportunities.map(
      (opportunity) => opportunity._id
    );

    // Find applications for those opportunities
    const applications = await Application.find({
      opportunityId: { $in: opportunityIds },
    });

    // Optional month filter
    // Example: ?month=2026-09
    const filteredApplications = month
      ? applications.filter((application) =>
          application.appliedOn?.startsWith(month)
        )
      : applications;

    // Count applications by date
    const applicationCounts = {};

    filteredApplications.forEach((application) => {
      const date = application.appliedOn;

      if (!date) return;

      applicationCounts[date] =
        (applicationCounts[date] || 0) + 1;
    });

    // Convert into chart format
    const trend = Object.entries(applicationCounts)
      .sort(([dateA], [dateB]) =>
        dateA.localeCompare(dateB)
      )
      .map(([date, applications]) => ({
        date,
        applications,
      }));

    res.status(200).json({
      success: true,
      companyId: id,
      trend,
    });
  } catch (error) {
    console.error(
      "Company Dashboard Application Trend Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch application trend",
      error: error.message,
    });
  }
};

// =====================================================
// COMPANY DASHBOARD - DEPARTMENT STATS
// =====================================================

const getCompanyDashboardDepartmentStats = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // Find opportunities belonging to this company
    const opportunities = await Opportunity.find({
      companyId: id,
    });

    const opportunityIds = opportunities.map(
      (opportunity) => opportunity._id
    );

    // Find applications for this company's opportunities
    const applications = await Application.find({
      opportunityId: { $in: opportunityIds },
    });

    const departmentCounts = {};

    // Find department of every applicant
    for (const application of applications) {
      const student = await Student.findById(
        application.studentId
      );

      const department =
        student?.department || "Other";

      departmentCounts[department] =
        (departmentCounts[department] || 0) + 1;
    }

    // Convert into chart format
    const departments = Object.entries(
      departmentCounts
    ).map(([name, value]) => ({
      name,
      value,
    }));

    res.status(200).json({
      success: true,
      companyId: id,
      departments,
    });
  } catch (error) {
    console.error(
      "Company Dashboard Department Stats Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch department statistics",
      error: error.message,
    });
  }
};

// =====================================================
// Export
// =====================================================

module.exports = {
  getAllCompanies,
  getVerifiedCompanies,
  getCompanyById,
  createCompany,
  updateCompany,

  getMyCompanyProfile,
  updateMyCompanyProfile,
  uploadCompanyLogo,

  getCompanyDashboardApplications,
  getCompanyDashboardStats,
  getCompanyDashboardApplicationTrend,
  getCompanyDashboardDepartmentStats,
};