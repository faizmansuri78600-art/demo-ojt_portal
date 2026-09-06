const express = require("express");

const {
  loginUser,
  registerUser,
  getUsers,
} = require("../controllers/authController");

const router = express.Router();

// =====================================================
// REGISTER
// =====================================================

router.post("/register", registerUser);


// =====================================================
// LOGIN
// =====================================================

router.post("/login", loginUser);


// =====================================================
// GET USERS
// =====================================================

router.get("/users", getUsers);

module.exports = router;