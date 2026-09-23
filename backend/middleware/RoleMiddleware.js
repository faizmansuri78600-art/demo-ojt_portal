const authorizeRoles = (allowedRole, allowedSubRoles = null) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      if (user.role !== allowedRole) {
        return res.status(403).json({ success: false, message: "Access denied for this role" });
      }

      if (
        allowedSubRoles &&
        user.role === "coordinator" &&
        !allowedSubRoles.includes(user.subRole)
      ) {
        return res.status(403).json({ success: false, message: "Access denied for this sub-role" });
      }

      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      res.status(500).json({ success: false, message: "Authorization check failed" });
    }
  };
};

module.exports = { authorizeRoles };