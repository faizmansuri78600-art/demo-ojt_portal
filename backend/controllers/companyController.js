const Company = require("../models/Company");

// ======================================
// Get All Companies
// ======================================

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      success: true,
      count: companies.length,
      companies: companies,
    });
  } catch (error) {
    console.error("Get All Companies Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
    });
  }
};

// ======================================
// Get Verified Companies
// ======================================

const getVerifiedCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      isVerified: true,
    });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies: companies,
    });
  } catch (error) {
    console.error("Get Verified Companies Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch verified companies",
    });
  }
};

module.exports = {
  getAllCompanies,
  getVerifiedCompanies,
};