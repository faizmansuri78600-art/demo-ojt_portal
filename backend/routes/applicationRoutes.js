const express = require("express");

const {
  createApplication,
  getRecentApplications,
  getApplicationStats,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// STUDENT APPLY
// =====================================================

router.post("/", protect, createApplication);


// =====================================================
// APPLICATION DATA
// =====================================================

router.get("/recent", getRecentApplications);

router.get("/stats", getApplicationStats);


module.exports = router;