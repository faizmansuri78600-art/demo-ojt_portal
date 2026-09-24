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
      default: "",
    },

    registrationNumber: {
      type: String,
      default: "",
    },

    companySize: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    headOffice: {
      type: String,
      default: "",
    },

    companyPhone: {
      type: String,
      default: "",
    },

    street: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    zipCode: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    contactPerson: {
      type: String,
      default: "",
    },

    alternateEmail: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    mobileNumber: {
      type: String,
      default: "",
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    logoUrl: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "companies",
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;