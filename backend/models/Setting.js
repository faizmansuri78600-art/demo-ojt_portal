const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    portalName: {
      type: String,
      default: "AISC OJT Portal",
    },

    tagline: {
      type: String,
      default:
        "Connecting Students, Companies & Opportunities",
    },

    organization: {
      type: String,
      default:
        "Abeda Inamdar Senior College Of Arts, Science & Commerce",
    },

    address: {
      type: String,
      default:
        "2390-B, K.B. Hidayatullah Road, Azam Campus, Pune - 411001, Maharashtra, India",
    },

    email: {
      type: String,
      default: "ojtportal@aisc.edu.in",
    },

    phone: {
      type: String,
      default: "+91 20 2646 6121",
    },

    timezone: {
      type: String,
      default: "(GMT+05:30) Asia / Kolkata",
    },

    dateFormat: {
      type: String,
      default: "DD MMM YYYY (17 May 2025)",
    },

    timeFormat: {
      type: String,
      default: "12 Hour (02:30 PM)",
    },

    maxFileSize: {
      type: String,
      default: "10 MB",
    },

    allowedFiles: {
      type: String,
      default:
        "jpg, png, pdf, doc, docx, xls, xlsx",
    },

    autoUpdate: {
      type: Boolean,
      default: true,
    },

    daylightSaving: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "settings",
    timestamps: true,
  }
);

const Setting = mongoose.model(
  "Setting",
  settingSchema
);

module.exports = Setting;