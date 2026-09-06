const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    studentId: {
      type: String,
      required: true,
    },

    opportunityId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Applied",
    },

    appliedOn: {
      type: String,
      default: "",
    },

    reviewedOn: {
      type: String,
      default: null,
    },
  },
  {
    collection: "application",
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

module.exports = Application;