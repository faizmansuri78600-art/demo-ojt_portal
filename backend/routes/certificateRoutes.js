const express = require("express");

const {
  getAllCertificates,
  getCertificateById,
  getCertificatesByOjtId,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

const router = express.Router();

// Get all certificates
router.get("/", getAllCertificates);

// Get certificates by OJT ID
router.get("/ojt/:assignedOjtId", getCertificatesByOjtId);

// Get certificate by ID
router.get("/:id", getCertificateById);

// Add certificate
router.post("/", addCertificate);

// Update certificate
router.put("/:id", updateCertificate);

// Delete certificate
router.delete("/:id", deleteCertificate);

module.exports = router;