const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getAllCompanies,
  getVerifiedCompanies,
  getApplications,
  updateApplicationStatus,
} = require("../controllers/companyController");

// const protect = require("../middleware/authMiddleware");

const { logoUpload } = require("../config/multer");

const router = express.Router();

// Public company directory
router.get("/", getAllCompanies);
router.get("/verified", getVerifiedCompanies);

// Protected company application routes - FIX: real role name is "CompanyCoordinator"
router.get(
  "/applications",
  protect,
  authorizeRoles("CompanyCoordinator"),
  getApplications
);

router.put(
  "/applications/:id",
  protect,
  authorizeRoles("CompanyCoordinator"),
  updateApplicationStatus
);

module.exports = router;