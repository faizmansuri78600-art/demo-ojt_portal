import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";

// company

import CompanyDashboard from "../pages/Company/CompanyDashboard";
import CompanyProfile from "../pages/Company/CompanyProfile";
import ManageOjtOpportunities from "../pages/Company/ManageOjtOpportunities";
import Certificate from "../pages/Company/Certificate";
import NotificationsSettings from "../pages/Company/NotificationsSettings";

//admin

import AdminLayout from "../Adminlayouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

// company

      <Route path="/company/CompanyDashboard" element={<CompanyDashboard />} />

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
//Admin

        {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>

        {/* /admin -> /admin/dashboard
        <Route
          index
          element={<Navigate to="/admin/dashboard" replace />}
        /> */}

        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        {/* Manage Users */}
        <Route
          path="/admin/users"
          element={<ManageUsers />}
        />

        {/* Analytics & Reports */}
        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />

        {/* System Settings */}
        <Route
          path="/admin/settings"
          element={<Settings />}
        />

      </Route>

      {/* Any wrong URL */}
      <Route
        path="*"
        element={<Navigate to="/admin/dashboard" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;