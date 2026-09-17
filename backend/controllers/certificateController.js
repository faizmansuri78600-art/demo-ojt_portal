const Certificate = require("../models/Certificate");

// Get All Certificates
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      certificates,
    });
  } catch (error) {
    console.error("Get All Certificates Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
    });
  }
};

// Get Certificate By ID
const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      certificate,
    });
  } catch (error) {
    console.error("Get Certificate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate",
    });
  }
};

// Get Certificates By OJT ID
const getCertificatesByOjtId = async (req, res) => {
  try {
    const { assignedOjtId } = req.params;

    const certificates = await Certificate.find({
      assignedOjtId,
    }).sort({ issueDate: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      certificates,
    });
  } catch (error) {
    console.error("Get Certificates By OJT ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch OJT certificates",
    });
  }
};

// Add Certificate
const addCertificate = async (req, res) => {
  try {
    const {
      _id,
      assignedOjtId,
      issuedByCoordinatorId,
      issueDate,
      certificateUrl,
    } = req.body;

    if (!_id || !assignedOjtId) {
      return res.status(400).json({
        success: false,
        message: "Certificate ID and assignedOjtId are required",
      });
    }

    const existingCertificate = await Certificate.findById(_id);

    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: "Certificate already exists",
      });
    }

    const certificate = await Certificate.create({
      _id,
      assignedOjtId,
      issuedByCoordinatorId,
      issueDate,
      certificateUrl,
    });

    res.status(201).json({
      success: true,
      message: "Certificate added successfully",
      certificate,
    });
  } catch (error) {
    console.error("Add Certificate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add certificate",
    });
  }
};

// Update Certificate
const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    const {
      assignedOjtId,
      issuedByCoordinatorId,
      issueDate,
      certificateUrl,
    } = req.body;

    if (assignedOjtId !== undefined) {
      certificate.assignedOjtId = assignedOjtId;
    }

    if (issuedByCoordinatorId !== undefined) {
      certificate.issuedByCoordinatorId = issuedByCoordinatorId;
    }

    if (issueDate !== undefined) {
      certificate.issueDate = issueDate;
    }

    if (certificateUrl !== undefined) {
      certificate.certificateUrl = certificateUrl;
    }

    const updatedCertificate = await certificate.save();

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      certificate: updatedCertificate,
    });
  } catch (error) {
    console.error("Update Certificate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update certificate",
    });
  }
};

// Delete Certificate
const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    await Certificate.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    console.error("Delete Certificate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete certificate",
    });
  }
};

module.exports = {
  getAllCertificates,
  getCertificateById,
  getCertificatesByOjtId,
  addCertificate,
  updateCertificate,
  deleteCertificate,
};