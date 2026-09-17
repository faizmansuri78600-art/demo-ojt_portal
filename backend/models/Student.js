const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
    },

    verifiedByCoordinatorId: {
      type: String,
      default: null,
    },

    rollNumber: {
      type: String,
    },

    name: {
      type: String,
    },

    department: {
      type: String,
    },

    semester: {
    type: String,
    },

    cgpa: {
      type: Number,
    },

    profilePhotoUrl: {
      type: String,
    },

    resumeUrl: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "student",
    // Documents
aadhaarCard: {
  fileName: { type: String, default: "" },
  fileUrl: { type: String, default: "" },
  uploaded: { type: Boolean, default: false }
},

collegeIdCard: {
  fileName: { type: String, default: "" },
  fileUrl: { type: String, default: "" },
  uploaded: { type: Boolean, default: false }
},

bonafideCertificate: {
  fileName: { type: String, default: "" },
  fileUrl: { type: String, default: "" },
  uploaded: { type: Boolean, default: false }
},

tenthMarksheet: {
  fileName: { type: String, default: "" },
  fileUrl: { type: String, default: "" },
  uploaded: { type: Boolean, default: false }
},

twelfthMarksheet: {
  fileName: { type: String, default: "" },
  fileUrl: { type: String, default: "" },
  uploaded: { type: Boolean, default: false }
},

// OJT Information
ojt: {
  company: { type: String, default: "" },
  mentor: { type: String, default: "" },
  joiningDate: { type: String, default: "" },
  expectedEndDate: { type: String, default: "" },
  location: { type: String, default: "" },
  hoursCompleted: { type: Number, default: 0 },
  totalHours: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 }
},
  }
  
);



const Student = mongoose.model("Student", studentSchema);

module.exports = Student;