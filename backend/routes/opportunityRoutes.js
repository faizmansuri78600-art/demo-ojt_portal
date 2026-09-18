const express = require("express");

const {
  getAllOpportunities,
  getOpenOpportunities,
  getTopCompanies,
  getOpportunitiesByCompany,
  getMyOpportunities,
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Get all opportunities
router.get("/", getAllOpportunities);

// Get only open opportunities
router.get("/open", getOpenOpportunities);

// Get top companies
router.get("/top-companies", getTopCompanies);

// ======================================
// Company Opportunity Routes
// ======================================

// Get opportunities of the logged-in company
router.get(
  "/my",
  protect,
  getMyOpportunities
);

// Get opportunities of a specific company
router.get(
  "/company/:companyId",
  getOpportunitiesByCompany
);

// ======================================
// Company CRUD Routes
// ======================================

// Add new opportunity
router.post(
  "/",
  protect,
  addOpportunity
);

// Update an opportunity
router.put(
  "/:id",
  protect,
  updateOpportunity
);

// Delete an opportunity
router.delete(
  "/:id",
  protect,
  deleteOpportunity
);

module.exports = router;