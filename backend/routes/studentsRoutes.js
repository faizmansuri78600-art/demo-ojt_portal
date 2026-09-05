const express = require("express");
const router = express.Router();
const { getAssignedStudents } = require("../controllers/studentsController");

router.get("/:facultyId/assigned-students", getAssignedStudents);

module.exports = router;