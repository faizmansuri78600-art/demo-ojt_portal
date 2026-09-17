const Notification = require("../models/Notification");

// Get All Notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ sentOn: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Get All Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// Get Notifications By User ID
const getNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      userId,
    }).sort({ sentOn: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Get User Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user notifications",
    });
  }
};

// Get Unread Notifications
const getUnreadNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      userId,
      isRead: false,
    }).sort({ sentOn: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Get Unread Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch unread notifications",
    });
  }
};

// Add Notification
const addNotification = async (req, res) => {
  try {
    const {
      _id,
      userId,
      message,
      isRead,
      sentOn,
    } = req.body;

    if (!_id || !userId || !message) {
      return res.status(400).json({
        success: false,
        message: "Notification ID, userId and message are required",
      });
    }

    const existingNotification = await Notification.findById(_id);

    if (existingNotification) {
      return res.status(400).json({
        success: false,
        message: "Notification already exists",
      });
    }

    const notification = await Notification.create({
      _id,
      userId,
      message,
      isRead: isRead ?? false,
      sentOn,
    });

    res.status(201).json({
      success: true,
      message: "Notification added successfully",
      notification,
    });
  } catch (error) {
    console.error("Add Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add notification",
    });
  }
};

// Mark Notification As Read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    const updatedNotification = await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification,
    });
  } catch (error) {
    console.error("Mark Notification Read Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
    });
  }
};

// Delete Notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await Notification.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationsByUserId,
  getUnreadNotifications,
  addNotification,
  markAsRead,
  deleteNotification,
};