const express = require("express");

const {
  getAllCollegeCoordinators,
  getCollegeCoordinatorById,
  getCoordinatorsByDepartment,
  addCollegeCoordinator,
  updateCollegeCoordinator,
  deleteCollegeCoordinator,
} = require("../controllers/collegeCoordinatorController");

const router = express.Router();

// Get all
router.get("/", getAllCollegeCoordinators);

// Get by department
router.get(
  "/department/:department",
  getCoordinatorsByDepartment
);

// Get by ID
router.get("/:id", getCollegeCoordinatorById);

// Add
router.post("/", addCollegeCoordinator);

// Update
router.put("/:id", updateCollegeCoordinator);

// Delete
router.delete("/:id", deleteCollegeCoordinator);

module.exports = router;