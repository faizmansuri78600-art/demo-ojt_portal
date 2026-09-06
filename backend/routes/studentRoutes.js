const express = require("express");

const {
  getAllStudents,
  getStudentById,
  getVerifiedStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();


// Get all students
router.get("/", getAllStudents);

// Get verified students
router.get("/verified", getVerifiedStudents);

// Get student by ID
router.get("/:id", getStudentById);

// Add student
router.post("/", addStudent);

// Update student
router.put("/:id", updateStudent);

// Delete student
router.delete("/:id", deleteStudent);


module.exports = router;