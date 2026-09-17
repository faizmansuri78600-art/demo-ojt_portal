const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Used by the current authentication controller
    passwordHash: {
      type: String,
      default: "",
    },

    // Kept for compatibility if any old user has this field
    password: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      required: true,
      enum: [
        "student",
        "Student",
        "company",
        "Company",
        "mentor",
        "Faculty",
        "coordinator",
        "CollegeCoordinator",
        "CompanyCoordinator",
        "admin",
        "Admin",
      ],
    },

    subRole: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      default: "Active",
    },

    // Student information
    rollNumber: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    semester: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      default: "",
    },

    academicYear: {
      type: String,
      default: "",
    },

    admissionYear: {
      type: String,
      default: "",
    },

    universityRegNo: {
      type: String,
      default: "",
    },

    cgpa: {
      type: Number,
      default: 0,
    },

    // Personal information
    gender: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    pinCode: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    // Professional information
    skills: {
      type: String,
      default: "",
    },

    linkedIn: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    profilePhotoUrl: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    // Resume metadata
    resumeFileName: {
      type: String,
      default: "",
    },

    resumeUploadedOn: {
      type: String,
      default: "",
    },

    resumeSize: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;