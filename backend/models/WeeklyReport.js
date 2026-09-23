const mongoose = require("mongoose");

const weeklyReportSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    assignedOjtId: {
      type: String,
      required: true,
    },

    weekNumber: {
      type: Number,
      required: true,
    },

    taskAssigned: {
      type: String,
    },

    workCompleted: {
      type: String,
    },

    submittedOn: {
      type: String,
    },

    facultyRemarks: {
      type: String,
    },
    status: {
     type: String,
    enum: ["Pending Review", "Approved", "Revision Requested"],
  default: "Pending Review",
},
  },
  {
    collection: "weeklyreport",
  }
);

const WeeklyReport = mongoose.model(
  "WeeklyReport",
  weeklyReportSchema
);

module.exports = WeeklyReport;