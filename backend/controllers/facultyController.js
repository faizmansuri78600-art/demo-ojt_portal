const Faculty = require("../models/Faculty");

// Get All Faculty
const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();

    res.status(200).json({
      success: true,
      count: faculty.length,
      faculty,
    });
  } catch (error) {
    console.error("Get All Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
    });
  }
};

// Get Faculty By ID
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    console.error("Get Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
    });
  }
};

// Get Faculty By Department
const getFacultyByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const faculty = await Faculty.find({
      department,
    });

    res.status(200).json({
      success: true,
      count: faculty.length,
      faculty,
    });
  } catch (error) {
    console.error("Get Faculty By Department Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
    });
  }
};

// Add Faculty
const addFaculty = async (req, res) => {
  try {
    const {
      _id,
      userId,
      name,
      department,
      designation,
    } = req.body;

    if (!_id || !userId || !name) {
      return res.status(400).json({
        success: false,
        message: "Faculty ID, userId and name are required",
      });
    }

    const existingFaculty = await Faculty.findById(_id);

    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty already exists",
      });
    }

    const faculty = await Faculty.create({
      _id,
      userId,
      name,
      department,
      designation,
    });

    res.status(201).json({
      success: true,
      message: "Faculty added successfully",
      faculty,
    });
  } catch (error) {
    console.error("Add Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add faculty",
    });
  }
};

// Update Faculty
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const {
      userId,
      name,
      department,
      designation,
    } = req.body;

    if (userId !== undefined) {
      faculty.userId = userId;
    }

    if (name !== undefined) {
      faculty.name = name;
    }

    if (department !== undefined) {
      faculty.department = department;
    }

    if (designation !== undefined) {
      faculty.designation = designation;
    }

    const updatedFaculty = await faculty.save();

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      faculty: updatedFaculty,
    });
  } catch (error) {
    console.error("Update Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update faculty",
    });
  }
};

// Delete Faculty
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    await Faculty.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    console.error("Delete Faculty Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete faculty",
    });
  }
};

module.exports = {
  getAllFaculty,
  getFacultyById,
  getFacultyByDepartment,
  addFaculty,
  updateFaculty,
  deleteFaculty,
};