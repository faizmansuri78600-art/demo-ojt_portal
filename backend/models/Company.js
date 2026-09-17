const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    verifiedByCoordinatorId: {
      type: String,
      default: "",
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      default: "Other",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    companyPhone: {
      type: String,
      default: "",
      trim: true,
    },

    street: {
      type: String,
      default: "",
      trim: true,
    },

    zipCode: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    collection: "companies",
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;