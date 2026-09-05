const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedByCoordinatorId: { type: mongoose.Schema.Types.ObjectId },
    rollNumber: { type: String },
    name: { type: String },
    department: { type: String },
    cgpa: { type: Number },
    profilePhotoUrl: { type: String },
    resumeUrl: { type: String },
    isVerified: { type: Boolean },
  },
  { collection: "student" }
);

module.exports = mongoose.model("Student", studentSchema);