const express = require("express");

const {
  getAllEvaluations,
  getEvaluationById,
  getEvaluationsByOjtId,
  addEvaluation,
  updateEvaluation,
  deleteEvaluation,
  getEvaluationStudentsByFacultyId,
} = require("../controllers/evaluationController");

const router = express.Router();

// Get all evaluations
router.get("/", getAllEvaluations);

// Get evaluations by OJT ID
router.get("/ojt/:assignedOjtId", getEvaluationsByOjtId);

// Get evaluation students by Faculty ID
router.get("/faculty/:facultyId",getEvaluationStudentsByFacultyId
);

// Get evaluation by ID
router.get("/:id", getEvaluationById);

// Add evaluation
router.post("/", addEvaluation);

// Update evaluation
router.put("/:id", updateEvaluation);

// Delete evaluation
router.delete("/:id", deleteEvaluation);

module.exports = router;