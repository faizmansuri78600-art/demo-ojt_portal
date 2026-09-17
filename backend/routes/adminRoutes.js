const express = require("express");

const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getDashboardStats,
  getAdminDashboard,
} = require("../controllers/adminController");

const {protect} = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Dashboard
router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/dashboard/full", protect, adminOnly, getAdminDashboard);

// Users
router.get("/users", protect, adminOnly, getAllUsers);
router.post("/users", protect, adminOnly, addUser);
router.put("/users/:id", protect, adminOnly, updateUser);
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;