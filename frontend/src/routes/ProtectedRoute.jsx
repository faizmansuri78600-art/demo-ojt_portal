// import { Navigate, Outlet } from "react-router-dom";

// function ProtectedRoute({ allowedRole }) {
//   // Get normal user authentication
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   // Get admin authentication
//   const adminToken = localStorage.getItem("adminToken");
//   const adminUser = localStorage.getItem("adminUser");

//   // Use whichever authenticated user exists
//   const activeToken = token || adminToken;
//   const activeUser = user || adminUser;

//   // User is not logged in
//   if (!activeToken || !activeUser) {
//     return <Navigate to="/login" replace />;
//   }

//   // Convert stored user data from JSON
//   let userData;

//   try {
//     userData = JSON.parse(activeUser);
//   } catch (error) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminUser");

//     return <Navigate to="/login" replace />;
//   }

//   // Get actual role from stored user
//   const userRole = userData.role;

//   // User data does not contain a role
//   if (!userRole) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminUser");

//     return <Navigate to="/login" replace />;
//   }

//   // Normalize roles so "Company Coordinator",
//   // "CompanyCoordinator", etc. can be compared safely
//   const normalizedUserRole = userRole
//     .toLowerCase()
//     .replace(/\s+/g, "");

//   const normalizedAllowedRole = allowedRole
//     ? allowedRole.toLowerCase().replace(/\s+/g, "")
//     : "";

//   // Allow Admin route to match backend role "Administrator"
//   const isAdmin =
//     normalizedUserRole === "administrator" ||
//     normalizedUserRole === "admin";

//   const roleMatches =
//     normalizedAllowedRole === "admin"
//       ? isAdmin
//       : normalizedUserRole === normalizedAllowedRole;

//   // User is logged in but does not have the required role
//   if (allowedRole && !roleMatches) {
//     return <Navigate to="/" replace />;
//   }

//   // User is authenticated and has the correct role
//   return <Outlet />;
// }

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // User is not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  let userData;

  try {
    userData = JSON.parse(user);
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  // User data must contain a role
  if (!userData?.role) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  // Normalize role names
  const normalizedUserRole = userData.role
    .toLowerCase()
    .replace(/\s+/g, "");

  const normalizedAllowedRole = allowedRole
    ? allowedRole.toLowerCase().replace(/\s+/g, "")
    : "";

  // Check role
  if (
    allowedRole &&
    normalizedUserRole !== normalizedAllowedRole
  ) {
    return <Navigate to="/" replace />;
  }

  // Authentication + role successful
  return <Outlet />;
}

export default ProtectedRoute;