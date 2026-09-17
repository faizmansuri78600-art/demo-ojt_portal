const express = require("express");

const {
  getAllAssignedOjt,
  getAssignedOjtById,
  getAssignedOjtByApplicationId,
  getAssignedOjtByFacultyId,
  getOngoingOjt,
  addAssignedOjt,
  updateAssignedOjt,
  deleteAssignedOjt,
} = require("../controllers/assignedOjtController");

const router = express.Router();

// Get all assigned OJT
router.get("/", getAllAssignedOjt);

// Get ongoing OJT
router.get("/ongoing", getOngoingOjt);

// Get by Application ID
router.get("/application/:applicationId", getAssignedOjtByApplicationId);

// Get by Faculty ID
router.get("/faculty/:facultyId", getAssignedOjtByFacultyId);

// Get by Assigned OJT ID
router.get("/:id", getAssignedOjtById);

// Add assigned OJT
router.post("/", addAssignedOjt);

// Update assigned OJT
router.put("/:id", updateAssignedOjt);

// Delete assigned OJT
router.delete("/:id", deleteAssignedOjt);

module.exports = router;