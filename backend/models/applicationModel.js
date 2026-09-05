const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  _id: { type: String },
  studentId: { type: String },
  opportunityId: { type: String },
  status: { type: String },
  appliedOn: { type: Date },
  reviewedOn: { type: Date },
});

module.exports = mongoose.model("Application", applicationSchema, "application");