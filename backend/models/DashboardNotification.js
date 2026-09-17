const mongoose = require("mongoose");

const dashboardNotificationSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "info",
        "success",
        "warning",
        "general",
      ],
      default: "info",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DashboardNotification",
  dashboardNotificationSchema,
  "dashboardnotifications"
);