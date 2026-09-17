const User = require("../models/User");
const Company = require("../models/Company");
const Opportunity = require("../models/Opportunity");
const Application = require("../models/Application");
const Student = require("../models/Student");
const Announcement = require("../models/Announcement");
const bcrypt = require("bcryptjs");

// ======================================
// Get All Users
// ======================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name || user.email?.split("@")[0] || "User",
      email: user.email,
      role: user.role,
      phone: user.phone || "—",
      status: user.status || "Active",
      date: user.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedUsers.length,
      users: formattedUsers,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// ======================================
// Add New User
// ======================================

const addUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, status } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = "U" + Date.now();

    const user = await User.create({
      _id: userId,
      name: name || "",
      email: email,
      passwordHash: passwordHash,
      role: role,
      phone: phone || "",
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
        date: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Add User Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// ======================================
// Update User
// ======================================

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      role,
      phone,
      status,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check duplicate email
    if (email && email !== user.email) {
      const existingUser = await User.findOne({
        email: email,
        _id: { $ne: id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already used by another user",
        });
      }

      user.email = email;
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (status !== undefined) {
      user.status = status;
    }

    // Update password only if provided
    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        status: updatedUser.status,
        date: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Update User Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// ======================================
// Delete User
// ======================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// ======================================
// Admin Dashboard Statistics
// ======================================

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      role: { $regex: /^student$/i },
    });

    const totalFaculty = await User.countDocuments({
      role: { $regex: /^faculty$/i },
    });

    const totalCompanyCoordinators = await User.countDocuments({
      role: { $regex: /^companycoordinator$/i },
    });

    const totalCollegeCoordinators = await User.countDocuments({
      role: { $regex: /^collegecoordinator$/i },
    });

    const totalAdministrators = await User.countDocuments({
      role: { $regex: /^administrator$/i },
    });

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalStudents,
        totalFaculty,
        totalCompanyCoordinators,
        totalCollegeCoordinators,
        totalAdministrators,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

// ======================================
// Complete Admin Dashboard
// ======================================

const getAdminDashboard = async (req, res) => {
  try {
    // ----------------------------------
    // 1. USER DATA
    // ----------------------------------

    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      role: { $regex: /^student$/i },
    });

    const totalFaculty = await User.countDocuments({
      role: { $regex: /^faculty$/i },
    });

    const totalCompanyCoordinators = await User.countDocuments({
      role: { $regex: /^companycoordinator$/i },
    });

    const totalCollegeCoordinators = await User.countDocuments({
      role: { $regex: /^collegecoordinator$/i },
    });

    const totalAdministrators = await User.countDocuments({
      role: { $regex: /^administrator$/i },
    });
 
    // ----------------------------------
    // 2. COMPANY DATA
    // ----------------------------------

    const totalCompanies = await Company.countDocuments();

    const verifiedCompanies = await Company.countDocuments({
      isVerified: true,
    });

    // ----------------------------------
    // 3. OPPORTUNITY DATA
    // ----------------------------------

    const totalOpportunities = await Opportunity.countDocuments();

    const openOpportunities = await Opportunity.countDocuments({
      status: "Open",
    });

    // ----------------------------------
    // 4. APPLICATION DATA
    // ----------------------------------

    const totalApplications = await Application.countDocuments();

    const pendingApplications = await Application.countDocuments({
      status: "Applied",
    });

    const selectedApplications = await Application.countDocuments({
      status: "Selected",
    });

    const rejectedApplications = await Application.countDocuments({
      status: "Rejected",
    });

    // ----------------------------------
    // 5. TOP COMPANIES
    // ----------------------------------

    const opportunities = await Opportunity.find();

    const companyMap = {};

    opportunities.forEach((opportunity) => {
      const companyId = opportunity.companyId;

      if (!companyId) {
        return;
      }

      if (!companyMap[companyId]) {
        companyMap[companyId] = 0;
      }

      companyMap[companyId]++;
    });

    const topCompanyIds = Object.entries(companyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topCompanies = await Promise.all(
      topCompanyIds.map(async ([companyId, opportunityCount]) => {
        const company = await Company.findById(companyId);

        return {
          companyId: companyId,
          companyName:
            company?.companyName || "Unknown Company",
          city: company?.city || "—",
          opportunityCount: opportunityCount,
        };
      })
    );

    // ----------------------------------
    // 6. RECENT APPLICATIONS
    // ----------------------------------

    const recentApplications = await Application.find()
      .sort({ appliedOn: -1 })
      .limit(5);

    const formattedApplications = await Promise.all(
      recentApplications.map(async (application) => {
        const student = await Student.findById(
          application.studentId
        );

        const opportunity = await Opportunity.findById(
          application.opportunityId
        );

        return {
          applicationId: application._id,

          studentId: application.studentId,

          studentName:
            student?.name || "Unknown Student",

          opportunityId:
            application.opportunityId,

          opportunityTitle:
            opportunity?.title ||
            "Unknown Opportunity",

          companyId:
            opportunity?.companyId || "—",

          location:
            opportunity?.location || "—",

          status:
            application.status,

          appliedOn:
            application.appliedOn,

          reviewedOn:
            application.reviewedOn,
        };
      })
    );

    // ----------------------------------
    // 7. RECENT ANNOUNCEMENTS
    // ----------------------------------

    const recentAnnouncements =
      await Announcement.find()
        .sort({ publishedOn: -1 })
        .limit(5);

    // ----------------------------------
    // FINAL RESPONSE
    // ----------------------------------

    res.status(200).json({
      success: true,

      dashboard: {
        users: {
          total: totalUsers,
          students: totalStudents,
          faculty: totalFaculty,
          companyCoordinators:
            totalCompanyCoordinators,
          collegeCoordinators:
            totalCollegeCoordinators,
          administrators:
            totalAdministrators,
        },

        companies: {
          total: totalCompanies,
          verified: verifiedCompanies,
        },

        opportunities: {
          total: totalOpportunities,
          open: openOpportunities,
        },

        applications: {
          total: totalApplications,
          pending: pendingApplications,
          approved: selectedApplications,
          rejected: rejectedApplications,
        },

        topCompanies: topCompanies,

        recentApplications:
          formattedApplications,

        recentAnnouncements:
          recentAnnouncements,
      },
    });
  } catch (error) {
    console.error(
      "Admin Dashboard Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch admin dashboard data",
    });
  }
};

// ======================================
// EXPORT ALL FUNCTIONS
// ======================================

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getDashboardStats,
  getAdminDashboard,
};