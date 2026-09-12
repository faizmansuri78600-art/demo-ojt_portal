


// import { Navigate, Outlet } from "react-router-dom";

// function ProtectedRoute({ allowedRole }) {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   // User is not logged in
//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   let userData;

//   try {
//     userData = JSON.parse(user);
//   } catch (error) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     return <Navigate to="/login" replace />;
//   }

//   // User data must contain a role
//   if (!userData?.role) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     return <Navigate to="/login" replace />;
//   }

//   // Normalize role names
//   const normalizedUserRole = userData.role
//     .toLowerCase()
//     .replace(/\s+/g, "");

//   const normalizedAllowedRole = allowedRole
//     ? allowedRole.toLowerCase().replace(/\s+/g, "")
//     : "";

//   // Check role
//   if (
//     allowedRole &&
//     normalizedUserRole !== normalizedAllowedRole
//   ) {
//     return <Navigate to="/" replace />;
//   }

//   // Authentication + role successful
//   return <Outlet />;
// }

// export default ProtectedRoute;


import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // =====================================================
  // 1. USER IS NOT LOGGED IN
  // =====================================================

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }


  // =====================================================
  // 2. CHECK USER DATA
  // =====================================================

  let userData;

  try {
    userData = JSON.parse(user);
  } catch (error) {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // =====================================================
  // 3. CHECK ROLE
  // =====================================================

  if (!userData || !userData.role) {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // =====================================================
  // 4. NORMALIZE ROLE
  // =====================================================

  const normalizedUserRole =
    String(userData.role)
      .toLowerCase()
      .replace(/\s+/g, "");

  const normalizedAllowedRole =
    allowedRole
      ? String(allowedRole)
          .toLowerCase()
          .replace(/\s+/g, "")
      : "";


  // =====================================================
  // 5. CHECK AUTHORIZED ROLE
  // =====================================================

  if (
    allowedRole &&
    normalizedUserRole !== normalizedAllowedRole
  ) {

    // User is logged in but does not have permission
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  // =====================================================
  // 6. AUTHENTICATED + CORRECT ROLE
  // =====================================================

  return <Outlet />;
}

export default ProtectedRoute;