const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    verifiedByCoordinatorId: {
      type: String,
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
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    zipCode: {
      type: String,
    },

    country: {
      type: String,
    },

    website: {
      type: String,
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
    },

    logoUrl: {
      type: String,
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