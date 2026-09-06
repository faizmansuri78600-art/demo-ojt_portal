const express = require("express");

const {
  getAllFaculty,
  getFacultyById,
  getFacultyByDepartment,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");

const router = express.Router();

// Get all faculty
router.get("/", getAllFaculty);

// Get faculty by department
router.get("/department/:department", getFacultyByDepartment);

// Get faculty by ID
router.get("/:id", getFacultyById);

// Add faculty
router.post("/", addFaculty);

// Update faculty
router.put("/:id", updateFaculty);

// Delete faculty
router.delete("/:id", deleteFaculty);

module.exports = router;