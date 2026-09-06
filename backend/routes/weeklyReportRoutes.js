const express = require("express");

const {
  getAllWeeklyReports,
  getWeeklyReportById,
  getReportsByOjtId,
  addWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport,
} = require("../controllers/weeklyReportController");

const router = express.Router();


// Get all weekly reports
router.get("/", getAllWeeklyReports);


// Get reports by assigned OJT ID
router.get(
  "/ojt/:assignedOjtId",
  getReportsByOjtId
);


// Get report by ID
router.get(
  "/:id",
  getWeeklyReportById
);


// Add weekly report
router.post(
  "/",
  addWeeklyReport
);


// Update weekly report
router.put(
  "/:id",
  updateWeeklyReport
);


// Delete weekly report
router.delete(
  "/:id",
  deleteWeeklyReport
);


module.exports = router;