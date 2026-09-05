const mongoose = require("mongoose");

const assignOjtSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
    },

    facultyId: {
      type: String,
      ref: "Faculty",
    },

    assignedByCoordinatorId: {
      type: String,
    },

    startDate: {
      type: String,
    },

    endDate: {
      type: String,
    },

    status: {
      type: String,
    },
  },
  { collection: "assignojt" }
);

module.exports = mongoose.model("AssignOjt", assignOjtSchema);