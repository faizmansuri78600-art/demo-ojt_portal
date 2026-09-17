const express = require("express");

const {
  getAllStudents,
  getStudentById,
  getVerifiedStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getDashboard,
  getProfile,
  updateProfile,
  uploadResume,
  uploadDocument,
    getMyApplications
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");
const { upload, documentUpload } = require("../config/multer");
const router = express.Router();

// Student Profile

router.get("/dashboard", protect, getDashboard);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.get(
  "/applications",
  protect,
  getMyApplications
);

//Resume routs
router.post(
  "/profile/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

router.post(
  "/profile/documents/:type",
  protect,
  documentUpload.single("document"),
  uploadDocument
);

// Student CRUD
router.get("/", getAllStudents);
router.get("/verified", getVerifiedStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;