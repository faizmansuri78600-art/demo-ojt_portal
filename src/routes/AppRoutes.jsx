import { Routes, Route } from "react-router-dom";

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


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

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
    </Routes>
  );
}

export default AppRoutes;