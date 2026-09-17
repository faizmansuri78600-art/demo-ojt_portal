const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    assignedOjtId: {
      type: String,
      required: true,
    },

    issuedByCoordinatorId: {
      type: String,
    },

    issueDate: {
      type: String,
    },

    certificateUrl: {
      type: String,
    },
  },
  {
    collection: "certificates",
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;