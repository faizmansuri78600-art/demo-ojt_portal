const express = require("express");

const {
  getAllOpportunities,
  getOpenOpportunities,
  getTopCompanies,
} = require("../controllers/opportunityController");

const router = express.Router();

router.get("/", getAllOpportunities);

router.get("/open", getOpenOpportunities);

router.get("/top-companies", getTopCompanies);

module.exports = router;