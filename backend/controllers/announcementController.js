const Announcement = require("../models/Announcement");

const getAnnouncementPayload = (body) => ({
  title: String(body.title || "").trim(),

  message: String(
    body.message ?? body.description ?? ""
  ).trim(),

  publishedOn:
    body.publishedOn ||
    body.date ||
    "",

  audience:
    body.audience ||
    "All Students",

  priority:
    body.priority ||
    "Medium",

  status:
    body.status ||
    "Published",

  publishedByCoordinatorId:
    body.publishedByCoordinatorId ||
    "",
});

// =========================================================
// GET ALL ANNOUNCEMENTS
// =========================================================

const getAnnouncements = async (req, res) => {
  try {
    const announcements =
      await Announcement.find().sort({
        publishedOn: -1,
        _id: -1,
      });

    res.status(200).json({
      success: true,
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    console.error(
      "Get Announcements Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch announcements",
    });
  }
};

// =========================================================
// GET RECENT ANNOUNCEMENTS
// Existing API preserved
// =========================================================

const getRecentAnnouncements = async (
  req,
  res
) => {
  try {
    const announcements =
      await Announcement.find()
        .sort({
          publishedOn: -1,
          _id: -1,
        })
        .limit(5);

    res.status(200).json({
      success: true,
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    console.error(
      "Get Recent Announcements Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch announcements",
    });
  }
};

// =========================================================
// GET ANNOUNCEMENT BY ID
// =========================================================

const getAnnouncementById = async (
  req,
  res
) => {
  try {
    const announcement =
      await Announcement.findById(
        req.params.id
      );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message:
          "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      announcement,
    });
  } catch (error) {
    console.error(
      "Get Announcement By ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch announcement",
    });
  }
};

// =========================================================
// ADD ANNOUNCEMENT
// =========================================================

const addAnnouncement = async (
  req,
  res
) => {
  try {
    const payload =
      getAnnouncementPayload(req.body);

    if (
      !payload.title ||
      !payload.message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Announcement title and message are required",
      });
    }

    if (!payload.publishedOn) {
      return res.status(400).json({
        success: false,
        message:
          "Announcement date is required",
      });
    }

    const announcementId =
      req.body._id ||
      `announcement-${Date.now()}`;

    const existingAnnouncement =
      await Announcement.findById(
        announcementId
      );

    if (existingAnnouncement) {
      return res.status(400).json({
        success: false,
        message:
          "Announcement with this ID already exists",
      });
    }

    const announcement =
      await Announcement.create({
        _id: announcementId,
        ...payload,
      });

    res.status(201).json({
      success: true,
      message:
        "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error(
      "Add Announcement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create announcement",
    });
  }
};

// =========================================================
// UPDATE ANNOUNCEMENT
// =========================================================

const updateAnnouncement = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const payload =
      getAnnouncementPayload(req.body);

    if (
      !payload.title ||
      !payload.message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Announcement title and message are required",
      });
    }

    if (!payload.publishedOn) {
      return res.status(400).json({
        success: false,
        message:
          "Announcement date is required",
      });
    }

    const announcement =
      await Announcement.findByIdAndUpdate(
        id,
        payload,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message:
          "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Announcement updated successfully",
      announcement,
    });
  } catch (error) {
    console.error(
      "Update Announcement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update announcement",
    });
  }
};

// =========================================================
// DELETE ANNOUNCEMENT
// =========================================================

const deleteAnnouncement = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const announcement =
      await Announcement.findByIdAndDelete(
        id
      );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message:
          "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Announcement deleted successfully",
      announcement,
    });
  } catch (error) {
    console.error(
      "Delete Announcement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete announcement",
    });
  }
};

module.exports = {
  getAnnouncements,
  getRecentAnnouncements,
  getAnnouncementById,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};