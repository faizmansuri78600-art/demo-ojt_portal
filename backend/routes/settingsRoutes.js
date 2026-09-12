const express = require("express");

const {
  getSettings,
  updateSettings,
  resetSettings,
} = require("../controllers/settingsController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();


// =====================================================
// GET SETTINGS
// =====================================================

router.get(
  "/",
  protect,
  adminOnly,
  getSettings
);


// =====================================================
// UPDATE SETTINGS
// =====================================================

router.put(
  "/",
  protect,
  adminOnly,
  updateSettings
);


// =====================================================
// RESET SETTINGS
// =====================================================

router.post(
  "/reset",
  protect,
  adminOnly,
  resetSettings
);


module.exports = router;