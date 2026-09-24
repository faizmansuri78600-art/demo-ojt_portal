const path = require("path");
const fs = require("fs");
const Certificate = require("../models/Certificate");
const Student = require("../models/Student");
const Application = require("../models/Application");
const AssignedOjt = require("../models/AssignedOjt");
const Opportunity = require("../models/Opportunity");
const Company = require("../models/Company");

// ======================================
// Get My Certificates (logged-in student)
// ======================================
// Certificates only store assignedOjtId, so we resolve the rest of the
// chain the same way the rest of this codebase does:
// Student -> Application (by studentId) -> AssignedOjt (by applicationId)
// -> Certificate (by assignedOjtId), then enrich with Opportunity/Company.
const getMyCertificates = async (req, res) => {
  try {
    // req.user is the decoded JWT: { userId, role }
    const student = await Student.findOne({ userId: req.user.userId });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found for this account",
      });
    }

    const applications = await Application.find({ studentId: student._id });
    const applicationIds = applications.map((a) => a._id);

    const assignedOjts = await AssignedOjt.find({
      applicationId: { $in: applicationIds },
    });
    const assignedOjtIds = assignedOjts.map((a) => a._id);

    const certificates = await Certificate.find({
      assignedOjtId: { $in: assignedOjtIds },
    }).sort({ issueDate: -1 });

    // Lookup maps so we don't re-query per certificate
    const assignedOjtById = Object.fromEntries(assignedOjts.map((a) => [a._id, a]));
    const applicationById = Object.fromEntries(applications.map((a) => [a._id, a]));

    const opportunityIds = [
      ...new Set(applications.map((a) => a.opportunityId).filter(Boolean)),
    ];
    const opportunities = await Opportunity.find({ _id: { $in: opportunityIds } });
    const opportunityById = Object.fromEntries(opportunities.map((o) => [o._id, o]));

    const companyIds = [
      ...new Set(opportunities.map((o) => o.companyId).filter(Boolean)),
    ];
    const companies = await Company.find({ _id: { $in: companyIds } });
    const companyById = Object.fromEntries(companies.map((c) => [c._id, c]));

    const formatted = certificates.map((cert) => {
      const assignedOjt = assignedOjtById[cert.assignedOjtId];
      const application = assignedOjt ? applicationById[assignedOjt.applicationId] : null;
      const opportunity = application ? opportunityById[application.opportunityId] : null;
      const company = opportunity ? companyById[opportunity.companyId] : null;

      return {
        _id: cert._id,
        id: cert._id,
        studentName: student.name || "",
        program: opportunity?.title || "",
        company: company?.companyName || "",
        completionDate: cert.issueDate || assignedOjt?.endDate || "",
        status: cert.certificateUrl ? "Issued" : "Pending",
        certificateUrl: cert.certificateUrl || "",
      };
    });

    res.status(200).json({
      success: true,
      count: formatted.length,
      certificates: formatted,
    });
  } catch (error) {
    console.error("Get My Certificates Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch your certificates",
    });
  }
};

// ======================================
// Download Certificate (logged-in student, own certificate only)
// ======================================
const downloadCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    const student = await Student.findOne({ userId: req.user.userId });

    if (!student) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to download this certificate",
      });
    }

    // Verify this certificate really belongs to the requesting student by
    // walking the same chain: certificate -> assignedOjt -> application
    const assignedOjt = await AssignedOjt.findById(certificate.assignedOjtId);
    const application = assignedOjt
      ? await Application.findById(assignedOjt.applicationId)
      : null;

    if (!application || application.studentId !== student._id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to download this certificate",
      });
    }

    if (!certificate.certificateUrl) {
      return res.status(404).json({
        success: false,
        message: "No certificate file has been uploaded for this record yet",
      });
    }

    // Cloud-hosted file (S3/Cloudinary/etc.) — redirect to it
    if (/^https?:\/\//i.test(certificate.certificateUrl)) {
      return res.redirect(certificate.certificateUrl);
    }

    // Local file — stream it down as an attachment
    const absolutePath = path.join(__dirname, "..", certificate.certificateUrl);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({
        success: false,
        message: "Certificate file missing on server",
      });
    }

    const downloadName = `${certificate._id}.pdf`;
    return res.download(absolutePath, downloadName);
  } catch (error) {
    console.error("Download Certificate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to download certificate",
    });
  }
};

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
  getMyCertificates,
  downloadCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificatesByOjtId,
  addCertificate,
  updateCertificate,
  deleteCertificate,
};