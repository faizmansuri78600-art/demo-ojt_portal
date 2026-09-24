const express = require("express");

const {
  getAllNotifications,
  getNotificationsByUserId,
  getUnreadNotifications,
  addNotification,
  markAsRead,
  deleteNotification,
  getStudentNotifications,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// Get all notifications
// ==========================================
router.get("/", getAllNotifications);

// ==========================================
// Get unread notifications of a user
// ==========================================
router.get("/unread/:userId", getUnreadNotifications);

// ==========================================
// Get notifications of a user
// ==========================================
router.get("/user/:userId", getNotificationsByUserId);

// ==========================================
// Get notifications for logged-in student
// ==========================================
router.get("/student", protect, getStudentNotifications);

// ==========================================
// Add notification
// ==========================================
router.post("/", addNotification);

// ==========================================
// Mark notification as read
// ==========================================
router.put("/:id/read", markAsRead);

// ==========================================
// Delete notification
// ==========================================
router.delete("/:id", deleteNotification);

module.exports = router;