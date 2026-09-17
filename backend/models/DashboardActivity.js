const mongoose = require("mongoose");

const dashboardActivitySchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    activityType: {
      type: String,
      enum: [
        "weeklyDiary",
        "attendance",
        "report",
        "meeting",
        "general",
      ],
      default: "general",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DashboardActivity",
  dashboardActivitySchema,
  "dashboardactivities"
);