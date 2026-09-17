const express = require("express");

const {
  getAnnouncements,
  getRecentAnnouncements,
  getAnnouncementById,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const router =
  express.Router();

// =========================================================
// RECENT ANNOUNCEMENTS
// Must stay before /:id
// =========================================================

router.get(
  "/recent",
  getRecentAnnouncements
);

// =========================================================
// ANNOUNCEMENT CRUD
// =========================================================

router.get(
  "/",
  getAnnouncements
);

router.post(
  "/",
  addAnnouncement
);

router.get(
  "/:id",
  getAnnouncementById
);

router.put(
  "/:id",
  updateAnnouncement
);

router.delete(
  "/:id",
  deleteAnnouncement
);

module.exports = router;