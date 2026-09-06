const mongoose = require("mongoose");

const assignedOjtSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    applicationId: {
      type: String,
      required: true,
    },

    facultyId: {
      type: String,
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
  {
    collection: "assignojt",
  }
);

const AssignedOjt = mongoose.model("AssignedOjt", assignedOjtSchema);

module.exports = AssignedOjt;