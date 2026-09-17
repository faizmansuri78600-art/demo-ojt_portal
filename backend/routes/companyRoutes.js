const express = require("express");

const {
  getAllCompanies,
  getVerifiedCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  getCompanyDashboardApplications,
  getCompanyDashboardStats,
  getCompanyDashboardApplicationTrend,
  getCompanyDashboardDepartmentStats,
} = require("../controllers/companyController");

const router = express.Router();

// Get all companies
router.get("/", getAllCompanies);

// Get verified companies
router.get("/verified", getVerifiedCompanies);

// Company Dashboard - Recent Applications
router.get(
  "/:id/dashboard/applications",
  getCompanyDashboardApplications
);

// Company Dashboard - Statistics
router.get(
  "/:id/dashboard/stats",
  getCompanyDashboardStats
);

// Company Dashboard - Application Trend
router.get(
  "/:id/dashboard/application-trend",
  getCompanyDashboardApplicationTrend
);

// Company Dashboard - Department Statistics
router.get(
  "/:id/dashboard/department-stats",
  getCompanyDashboardDepartmentStats
);

// Get one company by ID
router.get("/:id", getCompanyById);

// Create new company
router.post("/", createCompany);

// Update company
router.put("/:id", updateCompany);

module.exports = router;