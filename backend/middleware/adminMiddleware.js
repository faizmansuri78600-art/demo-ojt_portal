const adminOnly = (req, res, next) => {
  // Check user
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  // Check admin role
  if (req.user.role.toLowerCase() !== "administrator") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  // Admin hai
  next();
};

module.exports = adminOnly;