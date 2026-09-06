const express = require("express");

const {
  getRecentApplications,
  getApplicationStats,
} = require("../controllers/applicationController");

const router = express.Router();

// ======================================
// Recent Applications
// ======================================

router.get("/recent", getRecentApplications);

// ======================================
// Application Statistics
// ======================================

router.get("/stats", getApplicationStats);

module.exports = router;