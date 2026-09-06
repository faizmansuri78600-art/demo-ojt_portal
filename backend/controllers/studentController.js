const Student = require("../models/Student");

// ======================================
// Get All Students
// ======================================

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      students: students,
    });
  } catch (error) {
    console.error("Get All Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};


// ======================================
// Get Student By ID
// ======================================

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student: student,
    });
  } catch (error) {
    console.error("Get Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
};


// ======================================
// Get Verified Students
// ======================================

const getVerifiedStudents = async (req, res) => {
  try {
    const students = await Student.find({
      isVerified: true,
    });

    res.status(200).json({
      success: true,
      count: students.length,
      students: students,
    });
  } catch (error) {
    console.error("Get Verified Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch verified students",
    });
  }
};


// ======================================
// Add Student
// ======================================

const addStudent = async (req, res) => {
  try {
    const {
      _id,
      userId,
      verifiedByCoordinatorId,
      rollNumber,
      name,
      department,
      cgpa,
      profilePhotoUrl,
      resumeUrl,
      isVerified,
    } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const existingStudent = await Student.findById(_id);

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const student = await Student.create({
      _id,
      userId,
      verifiedByCoordinatorId,
      rollNumber,
      name,
      department,
      cgpa,
      profilePhotoUrl,
      resumeUrl,
      isVerified: isVerified || false,
    });

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student: student,
    });
  } catch (error) {
    console.error("Add Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add student",
    });
  }
};


// ======================================
// Update Student
// ======================================

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const {
      userId,
      verifiedByCoordinatorId,
      rollNumber,
      name,
      department,
      cgpa,
      profilePhotoUrl,
      resumeUrl,
      isVerified,
    } = req.body;

    if (userId !== undefined) {
      student.userId = userId;
    }

    if (verifiedByCoordinatorId !== undefined) {
      student.verifiedByCoordinatorId = verifiedByCoordinatorId;
    }

    if (rollNumber !== undefined) {
      student.rollNumber = rollNumber;
    }

    if (name !== undefined) {
      student.name = name;
    }

    if (department !== undefined) {
      student.department = department;
    }

    if (cgpa !== undefined) {
      student.cgpa = cgpa;
    }

    if (profilePhotoUrl !== undefined) {
      student.profilePhotoUrl = profilePhotoUrl;
    }

    if (resumeUrl !== undefined) {
      student.resumeUrl = resumeUrl;
    }

    if (isVerified !== undefined) {
      student.isVerified = isVerified;
    }

    const updatedStudent = await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Update Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student",
    });
  }
};


// ======================================
// Delete Student
// ======================================

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};


// ======================================
// Export
// ======================================

module.exports = {
  getAllStudents,
  getStudentById,
  getVerifiedStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};