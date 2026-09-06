const CompanyCoordinator = require("../models/CompanyCoordinator");

// Get All Company Coordinators
const getAllCompanyCoordinators = async (req, res) => {
  try {
    const coordinators = await CompanyCoordinator.find();

    res.status(200).json({
      success: true,
      count: coordinators.length,
      coordinators: coordinators,
    });
  } catch (error) {
    console.error("Get Company Coordinators Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch company coordinators",
    });
  }
};

// Get Company Coordinator By ID
const getCompanyCoordinatorById = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator = await CompanyCoordinator.findById(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "Company coordinator not found",
      });
    }

    res.status(200).json({
      success: true,
      coordinator: coordinator,
    });
  } catch (error) {
    console.error("Get Company Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch company coordinator",
    });
  }
};

// Get Coordinators By Company ID
const getCoordinatorsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    const coordinators = await CompanyCoordinator.find({
      companyId: companyId,
    });

    res.status(200).json({
      success: true,
      count: coordinators.length,
      coordinators: coordinators,
    });
  } catch (error) {
    console.error("Get Coordinators By Company Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch company coordinators",
    });
  }
};

// Add Company Coordinator
const addCompanyCoordinator = async (req, res) => {
  try {
    const {
      _id,
      userId,
      companyId,
      name,
      designation,
    } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Coordinator ID is required",
      });
    }

    const existingCoordinator =
      await CompanyCoordinator.findById(_id);

    if (existingCoordinator) {
      return res.status(400).json({
        success: false,
        message: "Company coordinator already exists",
      });
    }

    const coordinator = await CompanyCoordinator.create({
      _id,
      userId,
      companyId,
      name,
      designation,
    });

    res.status(201).json({
      success: true,
      message: "Company coordinator added successfully",
      coordinator: coordinator,
    });
  } catch (error) {
    console.error("Add Company Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add company coordinator",
    });
  }
};

// Update Company Coordinator
const updateCompanyCoordinator = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator =
      await CompanyCoordinator.findById(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "Company coordinator not found",
      });
    }

    const {
      userId,
      companyId,
      name,
      designation,
    } = req.body;

    if (userId !== undefined) {
      coordinator.userId = userId;
    }

    if (companyId !== undefined) {
      coordinator.companyId = companyId;
    }

    if (name !== undefined) {
      coordinator.name = name;
    }

    if (designation !== undefined) {
      coordinator.designation = designation;
    }

    const updatedCoordinator = await coordinator.save();

    res.status(200).json({
      success: true,
      message: "Company coordinator updated successfully",
      coordinator: updatedCoordinator,
    });
  } catch (error) {
    console.error("Update Company Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update company coordinator",
    });
  }
};

// Delete Company Coordinator
const deleteCompanyCoordinator = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator =
      await CompanyCoordinator.findById(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "Company coordinator not found",
      });
    }

    await CompanyCoordinator.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Company coordinator deleted successfully",
    });
  } catch (error) {
    console.error("Delete Company Coordinator Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete company coordinator",
    });
  }
};

module.exports = {
  getAllCompanyCoordinators,
  getCompanyCoordinatorById,
  getCoordinatorsByCompanyId,
  addCompanyCoordinator,
  updateCompanyCoordinator,
  deleteCompanyCoordinator,
};