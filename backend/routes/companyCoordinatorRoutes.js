const express = require("express");

const {
  getAllCompanyCoordinators,
  getCompanyCoordinatorById,
  getCoordinatorsByCompanyId,
  addCompanyCoordinator,
  updateCompanyCoordinator,
  deleteCompanyCoordinator,
} = require("../controllers/companyCoordinatorController");

const router = express.Router();

// Get all
router.get("/", getAllCompanyCoordinators);

// Get by company
router.get("/company/:companyId", getCoordinatorsByCompanyId);

// Get by ID
router.get("/:id", getCompanyCoordinatorById);

// Add
router.post("/", addCompanyCoordinator);

// Update
router.put("/:id", updateCompanyCoordinator);

// Delete
router.delete("/:id", deleteCompanyCoordinator);

module.exports = router;