const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// ======================================
// Connect to MongoDB Atlas
// ======================================

connectDB();

// ======================================
// Create Express Application
// ======================================

const app = express();

// ======================================
// Middleware
// ======================================

app.use(cors());

app.use(express.json());

// resume uploads
app.use("/uploads", express.static("uploads"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================================
// Routes
// ======================================

// Authentication routes
const authRoutes = require("./routes/authRoutes");

app.use(
  "/api/auth",
  authRoutes
);

// ======================================
// Admin Routes
// ======================================

// Admin routes
// const adminRoutes = require("./routes/adminRoutes");

// app.use(
//   "/api/admin",
//   adminRoutes
// );

// ======================================
// Application Routes
// ======================================

const applicationRoutes =
  require("./routes/applicationRoutes");

app.use(
  "/api/applications",
  applicationRoutes
);

// ======================================
// Announcement Routes
// ======================================

const announcementRoutes =
  require("./routes/announcementRoutes");

app.use(
  "/api/announcements",
  announcementRoutes
);

// ======================================
// Company Routes
// ======================================

const companyRoutes =
  require("./routes/companyRoutes");

app.use(
  "/api/companies",
  companyRoutes
);

// ======================================
// Opportunity Routes
// ======================================

const opportunityRoutes =
  require("./routes/opportunityRoutes");

app.use(
  "/api/opportunities",
  opportunityRoutes
);

// ======================================
// Student Routes
// ======================================

const studentRoutes =
  require("./routes/studentRoutes");

app.use(
  "/api/students",
  studentRoutes
);

// ======================================
// Task routes
// ======================================

app.use(
  "/api/tasks",
  taskRoutes
);


// ======================================
// Attendance Routes
// ======================================

const attendanceRoutes =
  require("./routes/attendanceRoutes");

app.use(
  "/api/attendance",
  attendanceRoutes
);

// ======================================
// Weekly Report Routes
// ======================================

const weeklyReportRoutes =
  require("./routes/weeklyReportRoutes");

app.use(
  "/api/weekly-reports",
  weeklyReportRoutes
);

// ======================================
// Certificate Routes
// ======================================

// ======================================
// Certificate Routes
// ======================================

const certificateRoutes =
  require("./routes/certificateRoutes");

app.use(
  "/api/certificates",
  certificateRoutes
);

// ======================================
// Notification Routes
// ======================================

const notificationRoutes =
  require("./routes/notificationRoutes");

app.use(
  "/api/notifications",
  notificationRoutes
);

// ======================================
// Assigned OJT Routes
// ======================================

// ======================================
// Assigned OJT Routes
// ======================================

const assignedOjtRoutes =
  require("./routes/assignedOjtRoutes");

app.use(
  "/api/assigned-ojt",
  assignedOjtRoutes
);

// app.use(
//   "/api/evaluations",
//   evaluationRoutes
// );

// ======================================
// Evaluation Routes
// ======================================

const evaluationRoutes =
  require("./routes/evaluationRoutes");

app.use(
  "/api/evaluations",
  evaluationRoutes
);


// ======================================
// Faculty Routes
// ======================================

const facultyRoutes =
  require("./routes/facultyRoutes");

app.use(
  "/api/faculty",
  facultyRoutes
);


// ======================================
// Company Coordinator Routes
// ======================================

const companyCoordinatorRoutes =
  require("./routes/companyCoordinatorRoutes");

app.use(
  "/api/company-coordinators",
  companyCoordinatorRoutes
);

// ======================================
// Company Coordinator Routes
// ======================================

// ======================================
// College Coordinator Routes
// ======================================

const collegeCoordinatorRoutes =
  require("./routes/collegeCoordinatorRoutes");

app.use(
  "/api/college-coordinators",
  collegeCoordinatorRoutes
);

const mentorAssignmentRoutes =
  require("./routes/mentorAssignmentRoutes");

app.use(
  "/api/college-coordinators/mentor-assignment",
  mentorAssignmentRoutes
);

// ======================================
// COLLEGE COORDINATOR ROUTES
// ======================================
// Keep this AFTER mentor assignment routes.
// collegeCoordinatorRoutes contains:
//
// router.get("/:id", getCollegeCoordinatorById);
//
// Therefore this must come after more specific
// routes such as /mentor-assignment.
// ======================================

// const collegeCoordinatorRoutes =
//   require("./routes/collegeCoordinatorRoutes");

// app.use(
//   "/api/college-coordinators",
//   collegeCoordinatorRoutes
// );
const settingsRoutes = require("./routes/settingsRoutes");

app.use(
  "/api/settings",
  settingsRoutes
);
// ======================================
// Test Route
// ======================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "AISC OJT Portal Backend is running",
  });
});

// ======================================
// 404 Route
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      "API route not found",
  });
});

// ======================================
// Error Handler
// ======================================

app.use(
  (err, req, res, next) => {
    console.error(
      "Server Error:",
      err.message
    );

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
);

// ======================================
// Start Server
// ======================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});