const Student = require("../models/Student");
const User = require("../models/User");

const AssignedOjt = require("../models/AssignedOjt");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const Company = require("../models/Company");
const Announcement = require("../models/Announcement");

const Task = require("../models/Task");
const Attendance = require("../models/Attendance");
const DashboardActivity = require("../models/DashboardActivity");
const DashboardNotification = require("../models/DashboardNotification");

// =====================================================
// GET ALL STUDENTS
// =====================================================
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get All Students Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET STUDENT BY ID
// =====================================================
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Get Student Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET VERIFIED STUDENTS
// =====================================================
const getVerifiedStudents = async (req, res) => {
  try {
    const students = await Student.find({
      isVerified: true,
    });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get Verified Students Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// ADD STUDENT
// =====================================================
const addStudent = async (req, res) => {
  try {
    const {
      userId,
      rollNumber,
      name,
      department,
      cgpa,
      profilePhotoUrl,
      resumeUrl,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Student name is required",
      });
    }

    const studentId = "S" + Date.now();

    const student = await Student.create({
      _id: studentId,
      userId: userId || "",
      rollNumber: rollNumber || "",
      name: name || "",
      department: department || "",
      cgpa: cgpa ? Number(cgpa) : 0,
      profilePhotoUrl: profilePhotoUrl || "",
      resumeUrl: resumeUrl || "",
      isVerified: false,
    });

    return res.status(201).json({
      success: true,
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    console.error("Add Student Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE STUDENT BY ID
// =====================================================
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Update Student Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE STUDENT
// =====================================================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// STUDENT DASHBOARD
// =====================================================
// =====================================================
// STUDENT DASHBOARD
// =====================================================
const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;

    // =================================================
    // GET USER
    // =================================================

    const user = await User.findById(userId).select("-passwordHash");

    // =================================================
    // GET STUDENT
    // =================================================

    const student = await Student.findOne({
      userId: String(userId),
    });

    if (!user || !student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const studentId = String(student._id);

    // =================================================
    // APPLICATIONS
    // =================================================

    const applications = await Application.find({
      studentId: studentId,
    });

    // =================================================
    // ASSIGNED OJT
    // =================================================

    let assignedOjt = null;
    let selectedApplication = null;
    let opportunity = null;
    let company = null;

    for (const app of applications) {
      const assignment = await AssignedOjt.findOne({
        applicationId: app._id,
      });

      if (assignment) {
        assignedOjt = assignment;
        selectedApplication = app;
        break;
      }
    }

    // =================================================
    // OPPORTUNITY
    // =================================================

    if (selectedApplication) {
      opportunity = await Opportunity.findById(
        selectedApplication.opportunityId
      );
    }

    // =================================================
    // COMPANY
    // =================================================

    if (opportunity?.companyId) {
      company = await Company.findById(
        opportunity.companyId
      );
    }

    // =================================================
    // OJT HOURS
    // =================================================

    const hoursCompleted =
      student?.ojt?.hoursCompleted || 0;

    const totalHours =
      student?.ojt?.totalHours || 0;

    const hoursPercent =
      totalHours > 0
        ? Math.round(
            (hoursCompleted / totalHours) * 100
          )
        : 0;

    // =================================================
    // ATTENDANCE
    // =================================================

    const attendanceRecords = await Attendance.find({
      studentId: studentId,
    }).sort({
      date: -1,
    });

    let present = 0;
    let absent = 0;
    let leave = 0;

    attendanceRecords.forEach((record) => {
      if (record.status === "Present") {
        present++;
      }

      if (record.status === "Absent") {
        absent++;
      }

      if (record.status === "Leave") {
        leave++;
      }
    });

    const attendanceTotal =
      present + absent + leave;

    const attendancePercent =
      attendanceTotal > 0
        ? Math.round(
            (present / attendanceTotal) * 100
          )
        : 0;
        const dailyAverage =
  present > 0
    ? Number(
        (hoursCompleted / present).toFixed(1)
      )
    : 0;

    // =================================================
    // RECENT ACTIVITIES
    // =================================================

    const recentActivities =
      await DashboardActivity.find({
        studentId: studentId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(4);

    // =================================================
    // UPCOMING DEADLINES
    // =================================================

    const upcomingDeadlines =
      await Task.find({
        studentId: studentId,
        status: {
          $ne: "Completed",
        },
        dueDate: {
          $gte: new Date(),
        },
      })
        .sort({
          dueDate: 1,
        })
        .limit(4);

    // =================================================
    // NOTIFICATIONS
    // =================================================

    const notifications =
      await DashboardNotification.find({
        studentId: studentId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(4);
        

        const announcements =
  await Announcement.find()
    .sort({
      publishedOn: -1,
    })
    .limit(4);
    // =================================================
    // DASHBOARD RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      dashboard: {
        // ---------------------------------------------
        // Student
        // ---------------------------------------------

        studentName:
          user.name ||
          student.name ||
          "",
          semester:
         student.semester || "",

        // ---------------------------------------------
        // Statistics
        // ---------------------------------------------

        appliedOpportunities:
          applications.length,

        activeOJT:
          assignedOjt ? 1 : 0,

        hoursCompleted:
          hoursCompleted,

        totalHours:
          totalHours,

        hoursPercent:
          hoursPercent,

        attendancePercent:
          attendancePercent,
          dailyAverage:
  dailyAverage,
        pendingReports:
          0,
          

        certificateStatus:
          "Not Issued",
       
        // ---------------------------------------------
        // Assigned Company
        // ---------------------------------------------

        company:
          company?.companyName || "",

          companyLogo:
  company?.logoUrl || "",

        opportunityTitle:
          opportunity?.title || "",

        mentor:
          student?.ojt?.mentor || "",

        joiningDate:
          assignedOjt?.startDate || "",

        expectedEndDate:
          assignedOjt?.endDate || "",

        location:
          opportunity?.location ||
          company?.city ||
          "",

        status:
          assignedOjt?.status || "",

        // ---------------------------------------------
        // Attendance Summary
        // ---------------------------------------------

        attendance: {
          present: present,
          absent: absent,
          leave: leave,
          total: attendanceTotal,
          percentage: attendancePercent,
        },

        // ---------------------------------------------
        // Recent Activities
        // ---------------------------------------------

        recentActivities:
          recentActivities,

        // ---------------------------------------------
        // Upcoming Deadlines
        // ---------------------------------------------

        upcomingDeadlines:
          upcomingDeadlines,

        // ---------------------------------------------
        // Notifications
        // ---------------------------------------------

        notifications:
          notifications,

         

announcements:
  announcements,
      },
    });
  } catch (error) {
    console.error(
      "Get dashboard error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
}; 

// =====================================================
// GET MY PROFILE
// =====================================================
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;

    const user = await User.findById(userId).select(
      "-passwordHash"
    );

    const student = await Student.findOne({
      userId: userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,

      student: {
        id: student?._id || user._id,

        userId: user._id,

        semester:
  student.semester || "",

        // Personal Information
        name:
          user.name ||
          student?.name ||
          "",

        email:
          user.email || "",

        gender:
          user.gender || "",

        dateOfBirth:
          user.dateOfBirth || "",

        address:
          user.address || "",

        city:
          user.city || "",

        state:
          user.state || "",

        pinCode:
          user.pinCode || "",

        bloodGroup:
          user.bloodGroup || "",

        emergencyContact:
          user.emergencyContact || "",

        mobile:
          user.mobile ||
          user.phone ||
          "",

        // Academic Information
        rollNumber:
          user.rollNumber ||
          student?.rollNumber ||
          "",

        department:
          user.department ||
          student?.department ||
          "",

        semester:
          user.semester || "",

        college:
          user.college || "",

        course:
          user.course || "",

        academicYear:
          user.academicYear || "",

        admissionYear:
          user.admissionYear || "",

        universityRegNo:
          user.universityRegNo || "",

        cgpa:
          user.cgpa ||
          student?.cgpa ||
          0,

        // Skills
        skills:
          user.skills || "",

        // Social / Professional
        linkedIn:
          user.linkedIn || "",

        github:
          user.github || "",

        portfolio:
          user.portfolio || "",

        // Profile Photo
        profilePhotoUrl:
          user.profilePhotoUrl ||
          student?.profilePhotoUrl ||
          "",

        // Resume
        resumeUrl:
          user.resumeUrl ||
          student?.resumeUrl ||
          "",

        resumeFileName:
          user.resumeFileName || "",

        resumeUploadedOn:
          user.resumeUploadedOn || "",

        resumeSize:
          user.resumeSize || "",

        // Documents
        documents: {
          aadhaarCard:
            student?.aadhaarCard || {},

          collegeIdCard:
            student?.collegeIdCard || {},

          bonafideCertificate:
            student?.bonafideCertificate || {},

          tenthMarksheet:
            student?.tenthMarksheet || {},

          twelfthMarksheet:
            student?.twelfthMarksheet || {},
        },

        // OJT Information
        ojt:
          student?.ojt || {},

        // Status
        status:
          user.status || "Active",
      },
    });

  } catch (error) {
    console.error(
      "Get Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};

// =====================================================
// UPDATE MY PROFILE
// =====================================================
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const allowedFields = [
      "name",
      "rollNumber",
      "department",
      "semester",
      "college",
      "course",
      "academicYear",
      "admissionYear",
      "universityRegNo",
      "cgpa",
      "gender",
      "dateOfBirth",
      "address",
      "city",
      "state",
      "pinCode",
      "bloodGroup",
      "emergencyContact",
      "mobile",
      "skills",
      "linkedIn",
      "github",
      "portfolio",
      "profilePhotoUrl",
      "resumeUrl",
      "resumeFileName",
      "resumeUploadedOn",
      "resumeSize",
    ];

    const userUpdates = {};

    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        userUpdates[field] = updates[field];
      }
    });

    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          $set: userUpdates,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const studentUpdates = {};

    const studentFields = [
      "rollNumber",
      "name",
      "department",
      "cgpa",
      "profilePhotoUrl",
      "resumeUrl",
    ];

    studentFields.forEach((field) => {
      if (updates[field] !== undefined) {
        studentUpdates[field] = updates[field];
      }
    });

    const student =
      await Student.findOneAndUpdate(
        {
          userId: String(userId),
        },
        {
          $set: studentUpdates,
        },
        {
          new: true,
          runValidators: true,
          upsert: false,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",

      student: {
        name:
          updatedUser.name || "",

        email:
          updatedUser.email || "",

        role:
          updatedUser.role || "",

        status:
          updatedUser.status || "",

        studentId:
          student
            ? student._id
            : "",

        rollNumber:
          updatedUser.rollNumber || "",

        department:
          updatedUser.department || "",

        semester:
          updatedUser.semester || "",

        college:
          updatedUser.college || "",

        course:
          updatedUser.course || "",

        academicYear:
          updatedUser.academicYear || "",

        admissionYear:
          updatedUser.admissionYear || "",

        universityRegNo:
          updatedUser.universityRegNo || "",

        cgpa:
          updatedUser.cgpa || 0,

        gender:
          updatedUser.gender || "",

        dateOfBirth:
          updatedUser.dateOfBirth || "",

        address:
          updatedUser.address || "",

        city:
          updatedUser.city || "",

        state:
          updatedUser.state || "",

        pinCode:
          updatedUser.pinCode || "",

        bloodGroup:
          updatedUser.bloodGroup || "",

        emergencyContact:
          updatedUser.emergencyContact || "",

        mobile:
          updatedUser.mobile || "",

        skills:
          updatedUser.skills || "",

        linkedIn:
          updatedUser.linkedIn || "",

        github:
          updatedUser.github || "",

        portfolio:
          updatedUser.portfolio || "",

        profilePhotoUrl:
          updatedUser.profilePhotoUrl ||
          (student
            ? student.profilePhotoUrl
            : "") ||
          "",

        resumeUrl:
          updatedUser.resumeUrl ||
          (student
            ? student.resumeUrl
            : "") ||
          "",

        resumeFileName:
          updatedUser.resumeFileName || "",

        resumeUploadedOn:
          updatedUser.resumeUploadedOn || "",

        resumeSize:
          updatedUser.resumeSize || "",
      },
    });

  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update profile",
    });
  }
};

// =====================================================
// RESUME UPLOAD
// =====================================================
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    const userId =
      req.user._id ||
      req.user.userId;

    const resumeUrl =
      `/uploads/resume/${req.file.filename}`;

    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          resumeUrl: resumeUrl,

          resumeFileName:
            req.file.originalname,

          resumeUploadedOn:
            new Date(),

          resumeSize:
            `${(
              req.file.size / 1024
            ).toFixed(2)} KB`,
        },
        {
          new: true,
        }
      ).select("-passwordHash");

    await Student.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        resumeUrl: resumeUrl,
      }
    );

    return res.status(200).json({
      success: true,

      message:
        "Resume uploaded successfully",

      resumeUrl: resumeUrl,

      student:
        updatedUser,
    });

  } catch (error) {
    console.error(
      "Upload Resume Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload resume",
    });
  }
};

// =====================================================
// DOCUMENT UPLOAD
// =====================================================
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a document",
      });
    }

    const userId =
      req.user._id ||
      req.user.userId;

    const type =
      req.params.type;

    const allowedTypes = [
      "aadhaarCard",
      "collegeIdCard",
      "bonafideCertificate",
      "tenthMarksheet",
      "twelfthMarksheet",
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid document type",
      });
    }

    const fileUrl =
      `/uploads/documents/${req.file.filename}`;

    const updateData = {};

    updateData[type] = {
      fileName:
        req.file.originalname,

      fileUrl:
        fileUrl,

      uploaded:
        true,
    };

    const student =
      await Student.findOneAndUpdate(
        {
          userId: userId,
        },
        updateData,
        {
          new: true,
        }
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Document uploaded successfully",

      document:
        student[type],
    });

  } catch (error) {
    console.error(
      "Upload Document Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload document",
    });
  }
};


//application 

const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;

    // Find logged-in student
    const student = await Student.findOne({
      userId: String(userId),
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const studentId = String(student._id);

    // Get student's applications
    const applications = await Application.find({
      studentId: studentId,
    }).sort({
      appliedOn: -1,
    });

    const result = [];

    for (const application of applications) {

      // Find opportunity
      const opportunity = await Opportunity.findById(
        application.opportunityId
      );

      // Find company
      let company = null;

      if (opportunity?.companyId) {
        company = await Company.findById(
          opportunity.companyId
        );
      }

      result.push({
        applicationId: application._id,

        company:
          company?.companyName || "",

        companyLogo:
          company?.logoUrl || "",

        jobRole:
          opportunity?.title || "",

        location:
          opportunity?.location ||
          company?.city ||
          "",

        appliedOn:
          application.appliedOn || "",

        reviewedOn:
          application.reviewedOn || null,

        status:
          application.status || "",
      });
    }

    return res.status(200).json({
      success: true,
      applications: result,
    });

  } catch (error) {

    console.error(
      "Get my applications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load applications",
    });
  }
};

// =====================================================
// EXPORT ALL CONTROLLERS
// =====================================================
module.exports = {
  getAllStudents,
  getStudentById,
  getVerifiedStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getDashboard,
  getProfile,
  updateProfile,
  uploadResume,
  uploadDocument,
  getMyApplications,
};