const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    studentId: { type: String, ref: "Student" },
    opportunityId: { type: String, ref: "Opportunity" },
    status: {
      type: String,
      enum: ["Pending", "In Review", "Shortlisted", "Accepted", "Rejected"],
      default: "Pending",
    },
    appliedOn: { type: String },
    reviewedOn: { type: String },
  },
  { collection: "application" }
);

module.exports = mongoose.model("Application", applicationSchema);