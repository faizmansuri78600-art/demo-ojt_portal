const express = require("express");

const {
  getStudentTask,
  completeTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/student", protect, getStudentTask);

router.put("/:id/complete", protect, completeTask);

module.exports = router;