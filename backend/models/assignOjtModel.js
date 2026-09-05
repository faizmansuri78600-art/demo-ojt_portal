const mongoose = require("mongoose");

const assignOjtSchema = new mongoose.Schema({
  _id: { type: String },
  applicationId: { type: String },
  facultyId: { type: String },
  assignedByCoordinatorId: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String },
});

// 3rd argument forces mongoose to use the exact collection name "assignojt"
module.exports = mongoose.model("AssignOJT", assignOjtSchema, );