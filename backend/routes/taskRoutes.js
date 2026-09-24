const express = require("express");

const {
  getStudentTask,
  completeTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get tasks assigned to logged-in student
router.get("/student", protect, getStudentTask);

// Mark a task as completed
router.put("/:id/complete", protect, completeTask);

module.exports = router;