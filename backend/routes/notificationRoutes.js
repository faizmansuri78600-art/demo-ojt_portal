const express = require("express");

const {
  getAllNotifications,
  getNotificationsByUserId,
  getUnreadNotifications,
  addNotification,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const router = express.Router();

// Get all notifications
router.get("/", getAllNotifications);

// Get unread notifications of a user
router.get("/unread/:userId", getUnreadNotifications);

// Get notifications of a user
router.get("/user/:userId", getNotificationsByUserId);

// Add notification
router.post("/", addNotification);

// Mark notification as read
router.put("/:id/read", markAsRead);

// Delete notification
router.delete("/:id", deleteNotification);

module.exports = router;