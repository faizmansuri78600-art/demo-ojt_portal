const express = require("express");

const {
  createApplication,
  getApplicationStats,
  applyToOpportunity,
  getMyApplications,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================
// Recent Applications
// ======================================


// ======================================
// Application Statistics
// ======================================
router.get("/stats", getApplicationStats);

// ======================================
// My Applications (logged-in student)
// ======================================
router.get("/mine", protect, getMyApplications);

// ======================================
// Apply to an Opportunity
// ======================================
router.post("/apply", protect, applyToOpportunity);

module.exports = router;