const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    publishedByCoordinatorId: {
      type: String,
    },

    title: {
      type: String,
    },

    message: {
      type: String,
    },

    publishedOn: {
      type: String,
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