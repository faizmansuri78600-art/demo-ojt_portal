const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    opportunityId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String },
    appliedOn: { type: Date },
    reviewedOn: { type: Date },
  },
  { collection: "application" }
);

module.exports = mongoose.model("Application", applicationSchema);