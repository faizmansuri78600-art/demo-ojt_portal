const mongoose = require("mongoose");

const assignedOjtSchema =
  new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
      },

      applicationId: {
        type: String,
        required: true,
      },

      studentId: {
        type: String,
        default: "",
      },

      facultyId: {
        type: String,
        default: "",
      },

      assignedByCoordinatorId: {
        type: String,
        default: "",
      },

      startDate: {
        type: String,
        default: "",
      },

      endDate: {
        type: String,
        default: "",
      },

      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },

      status: {
        type: String,
        default: "Assigned",
      },
    },
    {
      collection: "assignojt",
      timestamps: true,
    }
  );

const AssignedOjt =
  mongoose.model(
    "AssignedOjt",
    assignedOjtSchema
  );

module.exports = AssignedOjt;