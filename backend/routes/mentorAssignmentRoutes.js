const express = require("express");

const {
  getMentorAssignmentData,
  assignMentor,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/mentorAssignmentController");

const router = express.Router();

// ======================================================
// GET ALL MENTOR ASSIGNMENT DATA
// ======================================================

router.get("/", getMentorAssignmentData);

// ======================================================
// ASSIGN MENTOR
// ======================================================

router.post("/", assignMentor);

// ======================================================
// UPDATE MENTOR ASSIGNMENT
// ======================================================

router.put("/:id", updateAssignment);

// ======================================================
// DELETE MENTOR ASSIGNMENT
// ======================================================

router.delete("/:id", deleteAssignment);

module.exports = router;