const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    sentOn: {
      type: String,
    },
  },
  {
    collection: "notification",
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;