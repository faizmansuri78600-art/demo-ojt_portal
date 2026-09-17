const AssignedOjt = require("../models/AssignedOjt");

// Get All Assigned OJT
const getAllAssignedOjt = async (req, res) => {
  try {
    const assignedOjts = await AssignedOjt.find().sort({
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: assignedOjts.length,
      assignedOjts,
    });
  } catch (error) {
    console.error("Get All Assigned OJT Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned OJT records",
    });
  }
};

// Get Assigned OJT By ID
const getAssignedOjtById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignedOjt = await AssignedOjt.findById(id);

    if (!assignedOjt) {
      return res.status(404).json({
        success: false,
        message: "Assigned OJT record not found",
      });
    }

    res.status(200).json({
      success: true,
      assignedOjt,
    });
  } catch (error) {
    console.error("Get Assigned OJT Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned OJT record",
    });
  }
};

// Get Assigned OJT By Application ID
const getAssignedOjtByApplicationId = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const assignedOjts = await AssignedOjt.find({
      applicationId,
    });

    res.status(200).json({
      success: true,
      count: assignedOjts.length,
      assignedOjts,
    });
  } catch (error) {
    console.error("Get Assigned OJT By Application ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned OJT records",
    });
  }
};

// Get Assigned OJT By Faculty ID
const getAssignedOjtByFacultyId = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const assignedOjts = await AssignedOjt.find({
      facultyId,
    }).sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: assignedOjts.length,
      assignedOjts,
    });
  } catch (error) {
    console.error("Get Assigned OJT By Faculty ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty assigned OJT records",
    });
  }
};

// Get Ongoing OJT
const getOngoingOjt = async (req, res) => {
  try {
    const assignedOjts = await AssignedOjt.find({
      status: "Ongoing",
    }).sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: assignedOjts.length,
      assignedOjts,
    });
  } catch (error) {
    console.error("Get Ongoing OJT Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing OJT records",
    });
  }
};

// Add Assigned OJT
const addAssignedOjt = async (req, res) => {
  try {
    const {
      _id,
      applicationId,
      facultyId,
      assignedByCoordinatorId,
      startDate,
      endDate,
      status,
    } = req.body;

    if (!_id || !applicationId) {
      return res.status(400).json({
        success: false,
        message: "Assigned OJT ID and applicationId are required",
      });
    }

    const existingRecord = await AssignedOjt.findById(_id);

    if (existingRecord) {
      return res.status(400).json({
        success: false,
        message: "Assigned OJT record already exists",
      });
    }

    const assignedOjt = await AssignedOjt.create({
      _id,
      applicationId,
      facultyId,
      assignedByCoordinatorId,
      startDate,
      endDate,
      status,
    });

    res.status(201).json({
      success: true,
      message: "OJT assigned successfully",
      assignedOjt,
    });
  } catch (error) {
    console.error("Add Assigned OJT Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to assign OJT",
    });
  }
};

// Update Assigned OJT
const updateAssignedOjt = async (req, res) => {
  try {
    const { id } = req.params;

    const assignedOjt = await AssignedOjt.findById(id);

    if (!assignedOjt) {
      return res.status(404).json({
        success: false,
        message: "Assigned OJT record not found",
      });
    }

    const {
      applicationId,
      facultyId,
      assignedByCoordinatorId,
      startDate,
      endDate,
      status,
    } = req.body;

    if (applicationId !== undefined) {
      assignedOjt.applicationId = applicationId;
    }

    if (facultyId !== undefined) {
      assignedOjt.facultyId = facultyId;
    }

    if (assignedByCoordinatorId !== undefined) {
      assignedOjt.assignedByCoordinatorId =
        assignedByCoordinatorId;
    }

    if (startDate !== undefined) {
      assignedOjt.startDate = startDate;
    }

    if (endDate !== undefined) {
      assignedOjt.endDate = endDate;
    }

    if (status !== undefined) {
      assignedOjt.status = status;
    }

    const updatedAssignedOjt = await assignedOjt.save();

    res.status(200).json({
      success: true,
      message: "Assigned OJT updated successfully",
      assignedOjt: updatedAssignedOjt,
    });
  } catch (error) {
    console.error("Update Assigned OJT Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update assigned OJT",
    });
  }
};

// Delete Assigned OJT
const deleteAssignedOjt = async (req, res) => {
  try {
    const { id } = req.params;

    const assignedOjt = await AssignedOjt.findById(id);

    if (!assignedOjt) {
      return res.status(404).json({
        success: false,
        message: "Assigned OJT record not found",
      });
    }

    await AssignedOjt.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Assigned OJT deleted successfully",
    });
  } catch (error) {
    console.error("Delete Assigned OJT Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete assigned OJT",
    });
  }
};

module.exports = {
  getAllAssignedOjt,
  getAssignedOjtById,
  getAssignedOjtByApplicationId,
  getAssignedOjtByFacultyId,
  getOngoingOjt,
  addAssignedOjt,
  updateAssignedOjt,
  deleteAssignedOjt,
};