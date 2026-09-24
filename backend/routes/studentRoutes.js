const express = require("express");

const {
  getAllStudents,
  getStudentById,
  getVerifiedStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getMyProfile,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.get("/", getAllStudents);
router.get("/verified", getVerifiedStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;