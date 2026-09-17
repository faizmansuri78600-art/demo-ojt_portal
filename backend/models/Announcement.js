const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    publishedByCoordinatorId: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    publishedOn: {
      type: String,
      default: "",
    },

    audience: {
      type: String,
      enum: [
        "All Students",
        "Selected Students",
        "Active OJT Students",
        "Companies",
        "Mentors",
      ],
      default: "All Students",
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
  },
  {
    collection: "announcement",
  }
);

const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);

module.exports = Announcement;