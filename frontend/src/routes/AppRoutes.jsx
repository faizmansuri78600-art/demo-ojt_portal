
// import { Routes, Route, Navigate } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";

// import AdminLogin from "../pages/AdminLogin";

// // ================= PUBLIC =================
// import PublicLayout from "../layouts/PublicLayout";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import About from "../pages/About";
// import Contact from "../pages/Contact";

// // ================= COMPANY =================
// import CompanyDashboard from "../pages/Company/CompanyDashboard";
// import CompanyProfile from "../pages/Company/CompanyProfile";
// import ManageOjtOpportunities from "../pages/Company/ManageOjtOpportunities";
// import Certificate from "../pages/Company/Certificate";
// import NotificationsSettings from "../pages/Company/NotificationsSettings";
// import Evaluation from "../pages/Company/Evaluation";
// import Applications from "../pages/Company/Applications";

// // ================= ADMIN =================
// import AdminLayout from "../Adminlayouts/AdminLayout";
// import Dashboard from "../pages/admin/Dashboard";
// import ManageUsers from "../pages/admin/ManageUsers";
// import Analytics from "../pages/admin/Analytics";
// import Settings from "../pages/admin/Settings";

// // ================= STUDENT =================
// import Attendance from "../pages/Student/Attendance";
// import MarkAttendance from "../pages/Student/MarkAttendance";
// import Certificates from "../pages/Student/Certificates";
// import StudentDashboard from "../pages/Student/StudentDashboard";
// import BrowseOJT from "../pages/Student/BrowseOjt";
// import MyProfile from "../pages/Student/MyProfile";
// import WeeklyDiary from "../pages/Student/WeeklyDiary";
// import MyApplication from "../pages/Student/MyApplications";
// import Reports from "../pages/Student/Reports";
// import Feedback from "../pages/Student/Feedback";
// import SSettings from "../pages/Student/Settings";

// // ================= FACULTY =================
// import FacultyDashboard from "../pages/faculty/FacultyDashboard";
// import AssignedStudents from "../pages/faculty/AssignedStudents";
// import StudentDetails from "../pages/faculty/StudentDetails";
// import ReviewReports from "../pages/faculty/ReviewReports";
// import ApproveDiary from "../pages/faculty/ApproveDiary";
// import Evaluationfaculty from "../pages/faculty/Evaluation";

// // ================= COLLEGE COORDINATOR =================
// import CoordinatorLayout from "../layouts/CoordinatorLayout";
// import CoordinatorDashboard from "../pages/collegeCoordinator/CoordinatorDashboard";
// import StudentManagement from "../pages/collegeCoordinator/StudentManagement";
// import CompanyManagement from "../pages/collegeCoordinator/CompanyManagement";
// import MentorAssignment from "../pages/collegeCoordinator/MentorAssignment";
// import OJTTracking from "../pages/collegeCoordinator/OJTTracking";
// import Announcements from "../pages/collegeCoordinator/Announcements";
// import OJTReports from "../pages/collegeCoordinator/OJTReports";


// function AppRoutes() {
//   return (
//     <Routes>

//       {/* =====================================================
//           PUBLIC ROUTES
//       ====================================================== */}

//       <Route element={<PublicLayout />}>

//         <Route path="/" element={<Home />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         <Route path="/about" element={<About />} />

//         <Route path="/contact" element={<Contact />} />

//       </Route>


//       {/* =====================================================
//           ADMIN LOGIN
//           Public
//       ====================================================== */}

//       <Route
//         path="/admin/login"
//         element={<AdminLogin />}
//       />


//       {/* =====================================================
//           ADMIN ROUTES
//           Protected: Administrator only
//       ====================================================== */}

//       <Route
//         element={
//           <ProtectedRoute allowedRole="Administrator" />
//         }
//       >

//         <Route
//           path="/admin"
//           element={<AdminLayout />}
//         >

//           <Route
//             index
//             element={
//               <Navigate
//                 to="/admin/dashboard"
//                 replace
//               />
//             }
//           />

//           <Route
//             path="dashboard"
//             element={<Dashboard />}
//           />

//           <Route
//             path="users"
//             element={<ManageUsers />}
//           />

//           <Route
//             path="analytics"
//             element={<Analytics />}
//           />

//           <Route
//             path="settings"
//             element={<Settings />}
//           />

//         </Route>

//       </Route>


//       {/* =====================================================
//           FACULTY ROUTES
//           Protected: Faculty only
//       ====================================================== */}

//       <Route
//         element={
//           <ProtectedRoute allowedRole="Faculty" />
//         }
//       >

//         <Route
//           path="/faculty"
//           element={<FacultyDashboard />}
//         />

//         <Route
//           path="/faculty/dashboard"
//           element={<FacultyDashboard />}
//         />

//         <Route
//           path="/faculty/AssignedStudents"
//           element={<AssignedStudents />}
//         />

//         <Route
//           path="/faculty/StudentDetails"
//           element={<StudentDetails />}
//         />

//         <Route
//           path="/faculty/ReviewReports"
//           element={<ReviewReports />}
//         />

//         <Route
//           path="/faculty/ApproveDiary"
//           element={<ApproveDiary />}
//         />

//         <Route
//           path="/faculty/Evaluation"
//           element={<Evaluationfaculty />}
//         />

//       </Route>


//       {/* =====================================================
//     COMPANY ROUTES
//     Protected: Company only
// ====================================================== */}

// <Route
//   element={
//     <ProtectedRoute allowedRole="Company" />
//   }
// >

//   <Route
//     path="/company"
//     element={<CompanyDashboard />}
//   />

//   <Route
//     path="/company/dashboard"
//     element={<CompanyDashboard />}
//   />

//   <Route
//     path="/company/CompanyDashboard"
//     element={<CompanyDashboard />}
//   />

//   <Route
//     path="/company/company-profile"
//     element={<CompanyProfile />}
//   />

//   <Route
//     path="/company/manage-ojt-opportunities"
//     element={<ManageOjtOpportunities />}
//   />

//   <Route
//     path="/company/certificate"
//     element={<Certificate />}
//   />

//   <Route
//     path="/company/notifications-settings"
//     element={<NotificationsSettings />}
//   />

//   <Route
//     path="/company/evaluation"
//     element={<Evaluation />}
//   />

//   <Route
//     path="/company/applications-students"
//     element={<Applications />}
//   />

// </Route>


//       {/* =====================================================
//           STUDENT ROUTES
//           Protected: Student only
//       ====================================================== */}

//       <Route
//         element={
//           <ProtectedRoute allowedRole="Student" />
//         }
//       >

//         <Route
//           path="/student"
//           element={<StudentDashboard />}
//         />

//         <Route
//           path="/student/dashboard"
//           element={<StudentDashboard />}
//         />

//         <Route
//           path="/student/browse-ojt"
//           element={<BrowseOJT />}
//         />

//         <Route
//           path="/student/profile"
//           element={<MyProfile />}
//         />

//         <Route
//           path="/student/weekly-diary"
//           element={<WeeklyDiary />}
//         />

//         <Route
//           path="/student/Myapplication"
//           element={<MyApplication />}
//         />

//         <Route
//           path="/student/Reports"
//           element={<Reports />}
//         />

//         <Route
//           path="/student/Feedback"
//           element={<Feedback />}
//         />

//         <Route
//           path="/student/Settings"
//           element={<SSettings />}
//         />

//         <Route
//           path="/student/attendance"
//           element={<Attendance />}
//         />

//         <Route
//           path="/student/attendance/mark"
//           element={<MarkAttendance />}
//         />

//         <Route
//           path="/student/certificates"
//           element={<Certificates />}
//         />

//         <Route
//           path="/certificates"
//           element={<Certificates />}
//         />

//       </Route>


//       {/* =====================================================
//           COLLEGE COORDINATOR ROUTES
//           Protected: College Coordinator only
//       ====================================================== */}

//       <Route
//         element={
//           <ProtectedRoute allowedRole="CollegeCoordinator" />
//         }
//       >

//         <Route
//           path="/coordinator"
//           element={<CoordinatorLayout />}
//         >

//           <Route
//             index
//             element={
//               <Navigate
//                 to="dashboard"
//                 replace
//               />
//             }
//           />

//           <Route
//             path="dashboard"
//             element={<CoordinatorDashboard />}
//           />

//           <Route
//             path="students"
//             element={<StudentManagement />}
//           />

//           <Route
//             path="companies"
//             element={<CompanyManagement />}
//           />

//           <Route
//             path="mentors"
//             element={<MentorAssignment />}
//           />

//           <Route
//             path="tracking"
//             element={<OJTTracking />}
//           />

//           <Route
//             path="announcements"
//             element={<Announcements />}
//           />

//           <Route
//             path="reports"
//             element={<OJTReports />}
//           />

//         </Route>


//         {/* Alternative coordinator URL */}

//         <Route
//           path="/college-coordinator"
//           element={<CoordinatorLayout />}
//         >

//           <Route
//             index
//             element={
//               <Navigate
//                 to="dashboard"
//                 replace
//               />
//             }
//           />

//           <Route
//             path="dashboard"
//             element={<CoordinatorDashboard />}
//           />

//           <Route
//             path="students"
//             element={<StudentManagement />}
//           />

//           <Route
//             path="companies"
//             element={<CompanyManagement />}
//           />

//           <Route
//             path="mentors"
//             element={<MentorAssignment />}
//           />

//           <Route
//             path="tracking"
//             element={<OJTTracking />}
//           />

//           <Route
//             path="announcements"
//             element={<Announcements />}
//           />

//           <Route
//             path="reports"
//             element={<OJTReports />}
//           />

//         </Route>

//       </Route>


//       {/* =====================================================
//           FALLBACK
//       ====================================================== */}

//       <Route
//         path="*"
//         element={
//           <Navigate
//             to="/"
//             replace
//           />
//         }
//       />

//     </Routes>
//   );
// }

// export default AppRoutes;



import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AdminLogin from "../pages/AdminLogin";


// ================= PUBLIC =================
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/UserLogin";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";

// ============================================================
// COMPANY
// ============================================================
import AttendancePage from "../pages/Company/AttendancePage";
import CompanyDashboard from "../pages/Company/CompanyDashboard";
import CompanyProfile from "../pages/Company/CompanyProfile";
import ManageOjtOpportunities from "../pages/Company/ManageOjtOpportunities";
import Certificate from "../pages/Company/Certificate";
import NotificationsSettings from "../pages/Company/NotificationsSettings";
import CompanyEvaluation from "../pages/Company/Evaluation";
import Applications from "../pages/Company/Applications";


// ============================================================
// ADMIN
// ============================================================

import AdminLayout from "../Adminlayouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

// student
import AssignedOJT from "../pages/Student/AssignedOJT";
// ================= STUDENT =================
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

// Faculty

// ================= FACULTY =================
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import AssignedStudents from "../pages/faculty/AssignedStudents";
import StudentDetails from "../pages/faculty/StudentDetails";
import ReviewReports from "../pages/faculty/ReviewReports";
import ApproveDiary from "../pages/faculty/ApproveDiary";
import Evaluation from "../pages/faculty/Evaluation";

// ============================================================
// COORDINATOR
// ============================================================

import Evaluationfaculty from "../pages/faculty/Evaluation";
import Notifications from "../pages/faculty/Notifications";
import Reminders from "../pages/faculty/Reminders";

// ================= COLLEGE COORDINATOR =================
import CoordinatorLayout from "../layouts/CoordinatorLayout";
import CoordinatorDashboard from "../pages/collegeCoordinator/CoordinatorDashboard";
import StudentManagement from "../pages/collegeCoordinator/StudentManagement";
import CompanyManagement from "../pages/collegeCoordinator/CompanyManagement";
import MentorAssignment from "../pages/collegeCoordinator/MentorAssignment";
import OJTTracking from "../pages/collegeCoordinator/OJTTracking";
import Announcements from "../pages/collegeCoordinator/Announcements";
import OJTReports from "../pages/collegeCoordinator/OJTReports";


function AppRoutes() {
  return (
    <Routes>

//Faculty

      <Route path="/faculty" element={<FacultyDashboard />} />
      <Route path="/faculty/AssignedStudents" element={<AssignedStudents />} />
      <Route path="/faculty/StudentDetails" element={<StudentDetails />} />
      <Route path="/faculty/ReviewReports" element={<ReviewReports/>} />
      <Route path="/faculty/ApproveDiary" element={<ApproveDiary/>} />
      <Route path="/faculty/Evaluation" element={<Evaluation/>} />

// company
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
          path="/company/notifications-settings"
          element={<NotificationsSettings />}
        />
        <Route path="/company/evaluation" element={<CompanyEvaluation />} />
      <Route path="/company/applications-students" element={<Applications />} />
      <Route path="/company/attendance" element={<AttendancePage />} />
//Admin


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

      <Route
        path="/company/application"
        element={<Applications />}
      />
      <Route path="/company/attendance" element={<AttendancePage/>}/>
      <Route path="/company/evaluation" element={<CompanyEvaluation/>}/>


      {/* ======================================================
          ADMIN ROUTES
      ======================================================= */}
      {/* =====================================================
          PUBLIC ROUTES
      ====================================================== */}

      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

      </Route>


      {/* =====================================================
          ADMIN LOGIN
          Public
      ====================================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =====================================================
          ADMIN ROUTES
          Protected: Administrator only
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute allowedRole="Administrator" />
        }
      >
        {/* /admin → /admin/dashboard */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="users"
            element={<ManageUsers />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Route>


      {/* =====================================================
          FACULTY ROUTES
          Protected: Faculty only
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute allowedRole="Faculty" />
        }
      >

        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        {/* Dashboard */}
        <Route
          path="/faculty/dashboard"
          element={<FacultyDashboard />}
        />

        {/* Manage Users */}
        <Route
          path="/faculty/AssignedStudents"
          element={<AssignedStudents />}
        />

        {/* Analytics */}
        {/* Student Details - without ID */}
<Route
  path="/faculty/StudentDetails"
  element={<StudentDetails />}
/>

{/* Student Details - with Student ID */}
<Route
  path="/faculty/StudentDetails/:studentId"
  element={<StudentDetails />}
/>

        <Route
          path="/faculty/ReviewReports"
          element={<ReviewReports />}
        />

        {/* Settings */}
        <Route
          path="/faculty/ApproveDiary"
          element={<ApproveDiary />}
        />

        <Route
          path="/faculty/Evaluation"
          element={<Evaluationfaculty />}
        />

<Route
  path="/faculty/Notifications"
  element={<Notifications />}
/>
<Route
  path="/faculty/Reminders"
  element={<Reminders />}
/>
      </Route>


      {/* =====================================================
          COMPANY ROUTES
          Protected: Company only
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute allowedRole="Company" />
        }
      >

        <Route
          path="/company"
          element={<CompanyDashboard />}
        />

        <Route
          path="/company/dashboard"
          element={<CompanyDashboard />}
        />

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
          path="/company/applications-students"
          element={<Applications />}
        />

        <Route
          path="/company/evaluation"
          element={<Evaluation />}
        />

        <Route
          path="/company/certificate"
          element={<Certificate />}
        />

        <Route
          path="/company/notifications-settings"
          element={<NotificationsSettings />}
        />
      </Route>


      {/* =====================================================
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
/>

      <Route
        element={
          <ProtectedRoute allowedRole="Student" />
        }
      >

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        {/* Coordinator Dashboard */}
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        {/* Student Management */}
        <Route
          path="/student/browse-ojt"
          element={<BrowseOJT />}
        />

        {/* Company Management */}
        <Route
          path="/student/profile"
          element={<MyProfile />}
        />

        {/* Mentor Assignment */}
        <Route
          path="/student/weekly-diary"
          element={<WeeklyDiary />}
        />

        {/* OJT Tracking */}
        <Route
          path="/student/Myapplication"
          element={<MyApplication />}
        />

        {/* Announcements */}
        <Route
          path="/student/Reports"
          element={<Reports />}
        />

        {/* OJT Reports */}
        <Route
          path="/student/Feedback"
          element={<Feedback />}
        />

        <Route
          path="/student/Settings"
          element={<SSettings />}
        />

        <Route
          path="/student/attendance"
          element={<Attendance />}
        />

        <Route
          path="/student/attendance/mark"
          element={<MarkAttendance />}
        />

        <Route
          path="/student/certificates"
          element={<Certificates />}
        />

        <Route
          path="/certificates"
          element={<Certificates />}
        />


      </Route>


      {/* =====================================================
          COLLEGE COORDINATOR ROUTES
          Protected: College Coordinator only
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute allowedRole="CollegeCoordinator" />
        }
      >

        <Route
          path="/coordinator"
          element={<CoordinatorLayout />}
        >

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<CoordinatorDashboard />}
          />

          <Route
            path="students"
            element={<StudentManagement />}
          />

          <Route
            path="companies"
            element={<CompanyManagement />}
          />

          <Route
            path="mentors"
            element={<MentorAssignment />}
          />

          <Route
            path="tracking"
            element={<OJTTracking />}
          />

          <Route
            path="announcements"
            element={<Announcements />}
          />

          <Route
            path="reports"
            element={<OJTReports />}
          />

        </Route>


        {/* Alternative coordinator URL */}

        <Route
          path="/college-coordinator"
          element={<CoordinatorLayout />}
        >

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<CoordinatorDashboard />}
          />

          <Route
            path="students"
            element={<StudentManagement />}
          />

          <Route
            path="companies"
            element={<CompanyManagement />}
          />

          <Route
            path="mentors"
            element={<MentorAssignment />}
          />

          <Route
            path="tracking"
            element={<OJTTracking />}
          />

          <Route
            path="announcements"
            element={<Announcements />}
          />

          <Route
            path="reports"
            element={<OJTReports />}
          />

        </Route>

      </Route>


      {/* =====================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/coordinator/dashboard"
            replace
          />
        }
      />

    // student
    <Route path="/student/assigned-ojt" element={<AssignedOJT />} />
      <Route path="/assigned-ojt" element={<AssignedOJT />} />
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