const express = require("express");
const router = express.Router();
const { getAssignedStudents } = require("../controllers/assignedStudentsController");

router.get("/:facultyId/assigned-students", getAssignedStudents);

module.exports = router;