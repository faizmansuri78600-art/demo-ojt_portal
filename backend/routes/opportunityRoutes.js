const express = require("express");

const {
  getAllOpportunities,
  getOpenOpportunities,
  getTopCompanies,
  getOpportunitiesByCompany,
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

const router = express.Router();

// ======================================
// Existing Routes
// ======================================

router.get("/", getAllOpportunities);

router.get("/open", getOpenOpportunities);

router.get("/top-companies", getTopCompanies);

// ======================================
// Company Opportunity Routes
// ======================================

// Get opportunities of a specific company
router.get(
  "/company/:companyId",
  getOpportunitiesByCompany
);

// Add new opportunity
router.post(
  "/",
  addOpportunity
);

// Update opportunity
router.put(
  "/:id",
  updateOpportunity
);

// Delete opportunity
router.delete(
  "/:id",
  deleteOpportunity
);

module.exports = router;