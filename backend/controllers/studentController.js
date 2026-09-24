const Student = require("../models/Student");

const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student profile not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("Get My Profile Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch student profile" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ success: true, count: students.length, students });
  } catch (error) {
    console.error("Get All Students Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

const getVerifiedStudents = async (req, res) => {
  try {
    const students = await Student.find({ isVerified: true });
    res.status(200).json({ success: true, count: students.length, students });
  } catch (error) {
    console.error("Get Verified Students Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch verified students" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("Get Student By Id Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch student" });
  }
};

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
      return res.status(400).json({ success: false, message: "_id is required" });
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
      isVerified,
    });

    res.status(201).json({ success: true, student });
  } catch (error) {
    console.error("Add Student Error:", error);
    res.status(500).json({ success: false, message: "Failed to add student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("Update Student Error:", error);
    res.status(500).json({ success: false, message: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete Student Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};

module.exports = {
  getMyProfile,
  getAllStudents,
  getVerifiedStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};