const express = require("express");
const router = express.Router();
const { getFacultyDashboard } = require("../controllers/dashboardController");

router.get("/dashboard/:facultyId", getFacultyDashboard);

module.exports = router;