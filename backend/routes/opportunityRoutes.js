const express = require("express");
const router = express.Router();

const { getOpenOpportunities } = require("../controllers/opportunityController");

// Get all open OJT opportunities (public — used by students browsing)
router.get("/open", getOpenOpportunities);

module.exports = router;