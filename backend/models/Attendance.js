const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },

    assignedOjtId: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    hoursLogged: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

module.exports = Attendance;
