const CollegeCoordinator = require("../models/CollegeCoordinator");

// Get All College Coordinators
const getAllCollegeCoordinators = async (req, res) => {
  try {
    const coordinators = await CollegeCoordinator.find();

    res.status(200).json({
      success: true,
      count: coordinators.length,
      coordinators: coordinators,
    });
  } catch (error) {
    console.error("Get College Coordinators Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch college coordinators",
    });
  }
};

// Get College Coordinator By ID
const getCollegeCoordinatorById = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator = await CollegeCoordinator.findById(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "College coordinator not found",
      });
    }

    res.status(200).json({
      success: true,
      coordinator: coordinator,
    });
  } catch (error) {
    console.error("Get College Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch college coordinator",
    });
  }
};

// Get Coordinators By Department
const getCoordinatorsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const coordinators = await CollegeCoordinator.find({
      department: department,
    });

    res.status(200).json({
      success: true,
      count: coordinators.length,
      coordinators: coordinators,
    });
  } catch (error) {
    console.error("Get Coordinators By Department Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coordinators by department",
    });
  }
};

// Add College Coordinator
const addCollegeCoordinator = async (req, res) => {
  try {
    const {
      _id,
      userId,
      name,
      department,
    } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Coordinator ID is required",
      });
    }

    const existingCoordinator =
      await CollegeCoordinator.findById(_id);

    if (existingCoordinator) {
      return res.status(400).json({
        success: false,
        message: "College coordinator already exists",
      });
    }

    const coordinator = await CollegeCoordinator.create({
      _id,
      userId,
      name,
      department,
    });

    res.status(201).json({
      success: true,
      message: "College coordinator added successfully",
      coordinator: coordinator,
    });
  } catch (error) {
    console.error("Add College Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add college coordinator",
    });
  }
};

// Update College Coordinator
const updateCollegeCoordinator = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator =
      await CollegeCoordinator.findById(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "College coordinator not found",
      });
    }

    const {
      userId,
      name,
      department,
    } = req.body;

    if (userId !== undefined) {
      coordinator.userId = userId;
    }

    if (name !== undefined) {
      coordinator.name = name;
    }

    if (department !== undefined) {
      coordinator.department = department;
    }

    const updatedCoordinator =
      await coordinator.save();

    res.status(200).json({
      success: true,
      message: "College coordinator updated successfully",
      coordinator: updatedCoordinator,
    });
  } catch (error) {
    console.error("Update College Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update college coordinator",
    });
  }
};

// Delete College Coordinator
const deleteCollegeCoordinator = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator =
      await CollegeCoordinator.findById(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "College coordinator not found",
      });
    }

    await CollegeCoordinator.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "College coordinator deleted successfully",
    });
  } catch (error) {
    console.error("Delete College Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete college coordinator",
    });
  }
};

module.exports = {
  getAllCollegeCoordinators,
  getCollegeCoordinatorById,
  getCoordinatorsByDepartment,
  addCollegeCoordinator,
  updateCollegeCoordinator,
  deleteCollegeCoordinator,
};