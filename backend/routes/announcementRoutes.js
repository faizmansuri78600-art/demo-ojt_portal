const express = require("express");

const {
  getRecentAnnouncements,
} = require("../controllers/announcementController");

const router = express.Router();

// Get Recent Announcements
router.get("/recent", getRecentAnnouncements);

module.exports = router;