const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, ref: "User" },
    verifiedByCoordinatorId: { type: String, default: null },
    rollNumber: { type: String },
    name: { type: String },
    department: { type: String },
    cgpa: { type: Number },
    profilePhotoUrl: { type: String },
    resumeUrl: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { collection: "student" }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;