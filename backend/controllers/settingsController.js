const Setting = require("../models/Setting");

// =====================================================
// DEFAULT SETTINGS
// =====================================================

const defaultSettings = {
  _id: "SYSTEM_SETTINGS",

  portalName: "AISC OJT Portal",

  tagline:
    "Connecting Students, Companies & Opportunities",

  organization:
    "Abeda Inamdar Senior College Of Arts, Science & Commerce",

  address:
    "2390-B, K.B. Hidayatullah Road, Azam Campus, Pune - 411001, Maharashtra, India",

  email: "ojtportal@aisc.edu.in",

  phone: "+91 20 2646 6121",

  timezone: "(GMT+05:30) Asia / Kolkata",

  dateFormat:
    "DD MMM YYYY (17 May 2025)",

  timeFormat:
    "12 Hour (02:30 PM)",

  maxFileSize: "10 MB",

  allowedFiles:
    "jpg, png, pdf, doc, docx, xls, xlsx",

  autoUpdate: true,

  daylightSaving: false,
};


// =====================================================
// GET SETTINGS
// =====================================================

const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findById(
      "SYSTEM_SETTINGS"
    );

    // If settings do not exist, create default settings
    if (!settings) {
      settings = await Setting.create(
        defaultSettings
      );
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "Get Settings Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};


// =====================================================
// UPDATE SETTINGS
// =====================================================

const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findById(
      "SYSTEM_SETTINGS"
    );

    // Create settings if they do not exist
    if (!settings) {
      settings = await Setting.create(
        defaultSettings
      );
    }

    const {
      portalName,
      tagline,
      organization,
      address,
      email,
      phone,
      timezone,
      dateFormat,
      timeFormat,
      maxFileSize,
      allowedFiles,
      autoUpdate,
      daylightSaving,
    } = req.body;

    settings.portalName =
      portalName ?? settings.portalName;

    settings.tagline =
      tagline ?? settings.tagline;

    settings.organization =
      organization ?? settings.organization;

    settings.address =
      address ?? settings.address;

    settings.email =
      email ?? settings.email;

    settings.phone =
      phone ?? settings.phone;

    settings.timezone =
      timezone ?? settings.timezone;

    settings.dateFormat =
      dateFormat ?? settings.dateFormat;

    settings.timeFormat =
      timeFormat ?? settings.timeFormat;

    settings.maxFileSize =
      maxFileSize ?? settings.maxFileSize;

    settings.allowedFiles =
      allowedFiles ?? settings.allowedFiles;

    settings.autoUpdate =
      autoUpdate ?? settings.autoUpdate;

    settings.daylightSaving =
      daylightSaving ?? settings.daylightSaving;

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error(
      "Update Settings Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};


// =====================================================
// RESET SETTINGS
// =====================================================

const resetSettings = async (req, res) => {
  try {
    const settings =
      await Setting.findOneAndUpdate(
        { _id: "SYSTEM_SETTINGS" },
        defaultSettings,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Settings reset to default successfully",
      settings,
    });
  } catch (error) {
    console.error(
      "Reset Settings Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to reset settings",
    });
  }
};


module.exports = {
  getSettings,
  updateSettings,
  resetSettings,
};