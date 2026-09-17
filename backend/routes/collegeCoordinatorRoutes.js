const express = require("express");

const {
  getAllCollegeCoordinators,
  getCollegeCoordinatorById,
  getCoordinatorsByDepartment,
  addCollegeCoordinator,
  updateCollegeCoordinator,
  deleteCollegeCoordinator,

  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,

  getCompanies,
  addCompany,
  updateCompany,
  approveCompany,
  rejectCompany,
  deleteCompany,
} = require("../controllers/collegeCoordinatorController");

const {
  getTrackingStudents,
  updateTrackingProgress,
} = require("../controllers/ojtTrackingController");

const {
  getReports,
} = require("../controllers/ojtReportsController");

const router =
  express.Router();

const {
  getDashboard,
} = require("../controllers/coordinatorDashboardController");

// =========================================================
// COLLEGE COORDINATOR ROUTES
// =========================================================

router.get(
  "/",
  getAllCollegeCoordinators
);

router.get(
  "/department/:department",
  getCoordinatorsByDepartment
);

// =========================================================
// STUDENT MANAGEMENT
// These must stay before /:id
// =========================================================

router.get(
  "/students",
  getStudents
);

router.post(
  "/students",
  addStudent
);

router.put(
  "/students/:id",
  updateStudent
);

router.delete(
  "/students/:id",
  deleteStudent
);

// =========================================================
// COMPANY MANAGEMENT
// =========================================================

router.get(
  "/companies",
  getCompanies
);

router.post(
  "/companies",
  addCompany
);

router.put(
  "/companies/:id/approve",
  approveCompany
);

router.put(
  "/companies/:id/reject",
  rejectCompany
);

router.put(
  "/companies/:id",
  updateCompany
);

router.delete(
  "/companies/:id",
  deleteCompany
);

// =========================================================
// OJT TRACKING
// =========================================================

router.get(
  "/tracking",
  getTrackingStudents
);

router.put(
  "/tracking/:id/progress",
  updateTrackingProgress
);

// =========================================================
// OJT REPORTS
// =========================================================

router.get(
  "/reports",
  getReports
);

// DASHBOARD
router.get(
  "/dashboard",
  getDashboard
);
// =========================================================
// SINGLE COLLEGE COORDINATOR
// These must remain LAST
// =========================================================

router.get(
  "/:id",
  getCollegeCoordinatorById
);

router.post(
  "/",
  addCollegeCoordinator
);

router.put(
  "/:id",
  updateCollegeCoordinator
);

router.delete(
  "/:id",
  deleteCollegeCoordinator
);

module.exports = router;