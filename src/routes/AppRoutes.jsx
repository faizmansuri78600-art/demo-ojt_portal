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
import Evaluation from "../pages/Company/Evaluation";
import Applications from "../pages/Company/Applications";


//admin

import AdminLayout from "../Adminlayouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

// student
import Attendance from "../pages/Student/Attendance";
import MarkAttendance from "../pages/Student/MarkAttendance"; // ADDED
import Certificates from "../pages/Student/Certificates";
import StudentDashboard from "../pages/Student/StudentDashboard";
import BrowseOJT from "../pages/Student/BrowseOjt";
import MyProfile from "../pages/Student/MyProfile";
import WeeklyDiary from "../pages/Student/WeeklyDiary";
import MyApplication from "../pages/Student/MyApplications";
import Reports from "../pages/Student/Reports";
import Feedback from "../pages/Student/Feedback";
import SSettings from "../pages/Student/Settings";


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
        <Route path="/company/evaluation" element={<Evaluation />} />
      <Route path="/company/applications-students" element={<Applications />} />
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

    // student
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/browse-ojt" element={<BrowseOJT />} />
        <Route path="/student/profile" element={<MyProfile />} />
        <Route path="/student/weekly-diary" element={<WeeklyDiary />} />
        <Route path="/student/Myapplication" element={<MyApplication/>}/>
        <Route path="/student/Reports" element={<Reports/>}/>
        <Route path="/student/Feedback" element={<Feedback/>}/>
        <Route path="/student/Settings" element={<SSettings/>}/>
         
            
              <Route path="/student/attendance" element={<Attendance />} />
              <Route path="/student/attendance/mark" element={<MarkAttendance />} /> {/* ADDED */}
              <Route path="/student/certificates" element={<Certificates />} />
              <Route path="/certificates" element={<Certificates />} />

    </Routes>
  );
}

export default AppRoutes;
