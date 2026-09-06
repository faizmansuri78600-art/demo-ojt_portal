const express = require("express");

const {
  getAllCompanies,
  getVerifiedCompanies,
} = require("../controllers/companyController");

const router = express.Router();

// Get all companies
router.get("/", getAllCompanies);

// Get only verified companies
router.get("/verified", getVerifiedCompanies);

module.exports = router;