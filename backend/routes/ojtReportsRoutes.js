const express = require("express");

const {
  getReports,
} = require("../controllers/ojtReportsController");

const router =
  express.Router();

router.get(
  "/",
  getReports
);

module.exports = router;