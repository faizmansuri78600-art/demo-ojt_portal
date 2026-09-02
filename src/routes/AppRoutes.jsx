import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";

// ============================================================
// COMPANY
// ============================================================

import CompanyDashboard from "../pages/Company/CompanyDashboard";
import CompanyProfile from "../pages/Company/CompanyProfile";
import ManageOjtOpportunities from "../pages/Company/ManageOjtOpportunities";
import Certificate from "../pages/Company/Certificate";
import NotificationsSettings from "../pages/Company/NotificationsSettings";

// ============================================================
// ADMIN
// ============================================================

import AdminLayout from "../Adminlayouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

// ============================================================
// STUDENT
// ============================================================

import StudentDashboard from "../pages/Student/StudentDashboard";
import BrowseOJT from "../pages/Student/BrowseOjt";
import MyProfile from "../pages/Student/MyProfile";
import WeeklyDiary from "../pages/Student/WeeklyDiary";
import MyApplication from "../pages/Student/MyApplications";
import Reports from "../pages/Student/Reports";
import Feedback from "../pages/Student/Feedback";
import SSettings from "../pages/Student/Settings";

// ============================================================
// COORDINATOR
// ============================================================

import CoordinatorLayout from "../layouts/CoordinatorLayout";
import CoordinatorDashboard from "../pages/collegeCoordinator/CoordinatorDashboard";
import StudentManagement from "../pages/collegeCoordinator/StudentManagement";
import CompanyManagement from "../pages/collegeCoordinator/CompanyManagement";
import MentorAssignment from "../pages/collegeCoordinator/MentorAssignment";
import OJTTracking from "../pages/collegeCoordinator/OJTTracking";
import Announcements from "../pages/collegeCoordinator/Announcements";
import OJTReports from "../pages/collegeCoordinator/OJTReports";

// ============================================================
// APP ROUTES
// ============================================================

function AppRoutes() {
  return (
    <Routes>

      {/* ======================================================
          PUBLIC ROUTES
      ======================================================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />


      {/* ======================================================
          COMPANY ROUTES
      ======================================================= */}

      <Route
        path="/company/CompanyDashboard"
        element={<CompanyDashboard />}
      />

      <Route
        path="/company/company-profile"
        element={<CompanyProfile />}
      />

      <Route
        path="/company/manage-ojt-opportunities"
        element={<ManageOjtOpportunities />}
      />

      <Route
        path="/company/certificate"
        element={<Certificate />}
      />

      <Route
        path="/company/notifications-settings"
        element={<NotificationsSettings />}
      />


      {/* ======================================================
          ADMIN ROUTES
      ======================================================= */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        {/* /admin → /admin/dashboard */}
        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* Manage Users */}
        <Route
          path="users"
          element={<ManageUsers />}
        />

        {/* Analytics */}
        <Route
          path="analytics"
          element={<Analytics />}
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>


      {/* ======================================================
          STUDENT ROUTES
      ======================================================= */}

      <Route
        path="/student"
        element={<StudentDashboard />}
      />

      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/student/browse-ojt"
        element={<BrowseOJT />}
      />

      <Route
        path="/student/profile"
        element={<MyProfile />}
      />

      <Route
        path="/student/weekly-diary"
        element={<WeeklyDiary />}
      />

      <Route
        path="/student/Myapplication"
        element={<MyApplication />}
      />

      <Route
        path="/student/Reports"
        element={<Reports />}
      />

      <Route
        path="/student/Feedback"
        element={<Feedback />}
      />

      <Route
        path="/student/Settings"
        element={<SSettings />}
      />


      {/* ======================================================
          COORDINATOR ROUTES
          
          CoordinatorLayout provides:
          - Sidebar
          - Top Navbar
          - Main content area
          
          Individual pages render through <Outlet />.
      ======================================================= */}

      <Route
        path="/coordinator"
        element={<CoordinatorLayout />}
      >

        {/* /coordinator → /coordinator/dashboard */}
        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        {/* Coordinator Dashboard */}
        <Route
          path="dashboard"
          element={<CoordinatorDashboard />}
        />

        {/* Student Management */}
        <Route
          path="students"
          element={<StudentManagement />}
        />

        {/* Company Management */}
        <Route
          path="companies"
          element={<CompanyManagement />}
        />

        {/* Mentor Assignment */}
        <Route
          path="mentors"
          element={<MentorAssignment />}
        />

        {/* OJT Tracking */}
        <Route
          path="tracking"
          element={<OJTTracking />}
        />

        {/* Announcements */}
        <Route
          path="announcements"
          element={<Announcements />}
        />

        {/* OJT Reports */}
        <Route
          path="reports"
          element={<OJTReports />}
        />

      </Route>


      {/* ======================================================
          FALLBACK ROUTE
      ======================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/coordinator/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRoutes;