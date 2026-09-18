const express = require("express");

const {
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
} = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");

const { logoUpload } = require("../config/multer");

const router = express.Router();

// =====================================================
// COMPANY LIST
// =====================================================

// Get all companies
router.get("/", getAllCompanies);

// Get verified companies
router.get("/verified", getVerifiedCompanies);


// =====================================================
// LOGGED-IN COMPANY PROFILE
// =====================================================

// Get profile of currently logged-in Company
router.get("/me", protect, getMyCompanyProfile);

// Update profile of currently logged-in Company
router.put("/me", protect, updateMyCompanyProfile);

// Upload company logo
router.post(
  "/me/logo",
  protect,
  logoUpload.single("logo"),
  uploadCompanyLogo
);


// =====================================================
// COMPANY DASHBOARD
// =====================================================

// Recent Applications
router.get(
  "/:id/dashboard/applications",
  getCompanyDashboardApplications
);

// Statistics
router.get(
  "/:id/dashboard/stats",
  getCompanyDashboardStats
);

// Application Trend
router.get(
  "/:id/dashboard/application-trend",
  getCompanyDashboardApplicationTrend
);

// Department Statistics
router.get(
  "/:id/dashboard/department-stats",
  getCompanyDashboardDepartmentStats
);


// =====================================================
// COMPANY BY ID
// =====================================================

// Get one company by ID
router.get("/:id", getCompanyById);

// Create new company
router.post("/", createCompany);

// Update company by ID
router.put("/:id", updateCompany);

module.exports = router;