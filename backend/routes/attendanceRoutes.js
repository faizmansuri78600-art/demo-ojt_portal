const express = require("express");

const {
  getAllAttendance,
  getAttendanceByOjtId,
  getAttendanceByDate,
  getAttendanceStats,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();


// Get all attendance
router.get("/", getAllAttendance);


// Get attendance statistics
router.get("/stats", getAttendanceStats);


// Get attendance by assigned OJT ID
router.get(
  "/ojt/:assignedOjtId",
  getAttendanceByOjtId
);


// Get attendance by date
router.get(
  "/date/:date",
  getAttendanceByDate
);


// Add attendance
router.post(
  "/",
  addAttendance
);


// Update attendance
router.put(
  "/:id",
  updateAttendance
);


// Delete attendance
router.delete(
  "/:id",
  deleteAttendance
);


module.exports = router;