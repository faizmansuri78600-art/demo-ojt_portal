const Notification = require("../models/Notification");
const Student = require("../models/Student");

// Get notifications for logged-in student
const getStudentNotifications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;

    // Find student using logged-in user's ID
    const student = await Student.findOne({
      userId: String(userId),
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    console.log("STUDENT FOUND:", student);

    // Find notifications using student's ID
    const notifications = await Notification.find({
      userId: String(student._id),
    })
      .sort({ dateTime: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load notifications",
    });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ dateTime: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get all notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load notifications",
    });
  }
};

// Get notifications by user ID
const getNotificationsByUserId = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ dateTime: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get user notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load user notifications",
    });
  }
};

// Get unread notifications
const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
      status: "Unread",
    }).sort({ dateTime: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get unread notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load unread notifications",
    });
  }
};

// Add notification
const addNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);

    return res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Add notification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add notification",
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          status: "Read",
        },
        {
          new: true,
        }
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Mark notification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to mark notification",
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};

// Export all controllers
module.exports = {
  getStudentNotifications,
  getAllNotifications,
  getNotificationsByUserId,
  getUnreadNotifications,
  addNotification,
  markAsRead,
  deleteNotification,
};