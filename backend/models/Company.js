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

    yearOfEstablishment: {
      type: String,
    },

    registrationNumber: {
      type: String,
    },

    companySize: {
      type: String,
    },

    industry: {
      type: String,
    },

    headOffice: {
      type: String,
    },

    street: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    zipCode: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    contactPerson: {
      type: String,
    },

    alternateEmail: {
      type: String,
    },

    email: {
      type: String,
    },

    mobileNumber: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    logoUrl: {
      type: String,
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