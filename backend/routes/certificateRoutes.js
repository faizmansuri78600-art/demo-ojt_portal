const express = require("express");

const {
  getMyCertificates,
  downloadCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificatesByOjtId,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get the logged-in student's own certificates
router.get("/my", protect, getMyCertificates);

// Get all certificates
router.get("/", getAllCertificates);

// Get certificates by OJT ID
router.get("/ojt/:assignedOjtId", getCertificatesByOjtId);

// Download a certificate (owner only)
router.get("/:id/download", protect, downloadCertificate);

// Get certificate by ID
router.get("/:id", getCertificateById);

// Add certificate
router.post("/", addCertificate);

// Update certificate
router.put("/:id", updateCertificate);

// Delete certificate
router.delete("/:id", deleteCertificate);

module.exports = router;