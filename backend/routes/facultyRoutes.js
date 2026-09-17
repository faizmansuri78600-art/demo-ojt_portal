const express = require("express");

const {
  getAllFaculty,
  getFacultyById,
  getFacultyByDepartment,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getFacultyDashboard,
  getAssignedStudents,
  getStudentWeeklyReports,
  getStudentEvaluation,
  getStudentDetails,
} = require("../controllers/facultyController");

const router = express.Router();

// Get all faculty
router.get("/", getAllFaculty);

// Get faculty by department
router.get("/department/:department", getFacultyByDepartment);

//Get faculty dashboard
router.get("/dashboard/:facultyId",getFacultyDashboard);

//Get assigned students
router.get("/assigned-students/:facultyId",getAssignedStudents);

//Get Student Details
router.get("/student-details/:studentId", getStudentDetails);

router.get("/student-weekly-reports/:studentId", getStudentWeeklyReports);

router.get("/student-evaluation/:studentId", getStudentEvaluation);

// Get faculty by ID
router.get("/:id", getFacultyById);

// Add faculty
router.post("/", addFaculty);

// Update faculty
router.put("/:id", updateFaculty);

// Delete faculty
router.delete("/:id", deleteFaculty);

module.exports = router;