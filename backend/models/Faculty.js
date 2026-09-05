const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    department: { type: String },
    designation: { type: String },
  },
  { collection: "faculty" }
);

module.exports = mongoose.model("Faculty", facultySchema);