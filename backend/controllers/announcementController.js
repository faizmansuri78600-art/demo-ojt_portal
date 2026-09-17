const Announcement = require("../models/Announcement");

// ======================================
// Get Recent Announcements
// ======================================

const getRecentAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ publishedOn: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      count: announcements.length,
      announcements: announcements,
    });
  } catch (error) {
    console.error(
      "Get Recent Announcements Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
    });
  }
};

// ======================================
// Export
// ======================================

module.exports = {
  getRecentAnnouncements,
};