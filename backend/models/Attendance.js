const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    assignedOjtId: {
      type: String,
      ref: "AssignOjt",
    },

    date: {
      type: Date,
    },

    status: {
      type: String, // e.g. "Present", "Absent"
    },

    hoursLogged: {
      type: Number,
    },
  },
  {
    collection: "attendence",
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);