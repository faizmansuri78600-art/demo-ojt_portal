// const User = require("../models/User");
// const Faculty = require("../models/Faculty");
// const Student = require("../models/Student");
// const bcrypt = require("bcryptjs");
// const generateToken = require("../utils/generateToken");

// // ======================================
// // Login User
// // ======================================

// const loginUser = async (req, res) => {
//   try {
//     // Check what Postman is sending
//     console.log("Login Request Body:", req.body);

//     const { email, password } = req.body;

// let facultyId = null;

// if (user.role === "Faculty") {
// const faculty = await Faculty.findOne({ userId: user._id });

// if (!faculty) {
//    return res.status(404).json({
//      success: false,
//      message: "Faculty profile not found",
// });
//  }

// facultyId = faculty._id;
// }

//     // Check password
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user.passwordHash
//     );

//     if (!isPasswordCorrect) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Generate JWT token
//     const token = generateToken(user._id, user.role);

//     // Login successful
//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token: token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ======================================
// // Get All Users - Testing Only
// // ======================================

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();

//     return res.status(200).json({
//       success: true,
//       count: users.length,
//       users: users,
//     });
//   } catch (error) {
//     console.error("Get Users Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ======================================
// // Export
// // ======================================

// module.exports = {
//   loginUser,
//   getUsers,
// };


const User = require("../models/User");
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// =====================================================
// LOGIN USER
// =====================================================

const loginUser = async (req, res) => {
  try {
    console.log("Login Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

  const user = await User.findOne({ email });

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}

let facultyId = null;
let facultyName = null;

if (user.role === "Faculty") {
  const faculty = await Faculty.findOne({ userId: user._id });

  if (!faculty) {
    return res.status(404).json({
      success: false,
      message: "Faculty profile not found",
    });
  }

  facultyId = faculty._id;
  facultyName = faculty.name;
}

const isPasswordCorrect = await bcrypt.compare(
  password,
  user.passwordHash
);

if (!isPasswordCorrect) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}

const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: "Login successful",

      token: token,

      user: {
  id: user._id,
  email: user.email,
  role: user.role,
  facultyId: facultyId,
  facultyName: facultyName,
},
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// REGISTER USER
// =====================================================

const registerUser = async (req, res) => {
  try {
    console.log("Registration Request:", req.body);

    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      phone,
      rollNumber,
      department,
      cgpa,
    } = req.body;

    // ---------------------------------------------
    // Required fields
    // ---------------------------------------------

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ---------------------------------------------
    // Password confirmation
    // ---------------------------------------------

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // ---------------------------------------------
    // Check existing email
    // ---------------------------------------------

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // ---------------------------------------------
    // Hash password
    // ---------------------------------------------

    const passwordHash = await bcrypt.hash(password, 10);

    // ---------------------------------------------
    // Create User ID
    // ---------------------------------------------

    const userId = "U" + Date.now();

    // ---------------------------------------------
    // Convert frontend role to database role
    // ---------------------------------------------

    let databaseRole = role;

    if (role === "Student") {
      databaseRole = "Student";
    }

    if (role === "Faculty") {
      databaseRole = "Faculty";
    }

    if (role === "College Coordinator") {
      databaseRole = "CollegeCoordinator";
    }

    if (role === "Company Coordinator") {
      databaseRole = "CompanyCoordinator";
    }

    // ---------------------------------------------
    // Create user
    // ---------------------------------------------

    const user = await User.create({
      _id: userId,
      name: name,
      email: email,
      passwordHash: passwordHash,
      role: databaseRole,
      phone: phone || "",
      status: "Active",
    });

    // ---------------------------------------------
    // Create Student Profile
    // Only for Student registration
    // ---------------------------------------------

    let student = null;

    if (role === "Student") {
      const studentId = "S" + Date.now();

      student = await Student.create({
        _id: studentId,
        userId: userId,
        rollNumber: rollNumber || "",
        name: name,
        department: department || "",
        cgpa: cgpa ? Number(cgpa) : 0,
        profilePhotoUrl: "",
        resumeUrl: "",
        isVerified: false,
      });
    }

    // ---------------------------------------------
    // Success response
    // ---------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },

      student: student
        ? {
            id: student._id,
            userId: student.userId,
            rollNumber: student.rollNumber,
            department: student.department,
            cgpa: student.cgpa,
          }
        : null,
    });

  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};


// =====================================================
// GET ALL USERS
// =====================================================

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    return res.status(200).json({
      success: true,
      count: users.length,
      users: users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  loginUser,
  registerUser,
  getUsers,
};