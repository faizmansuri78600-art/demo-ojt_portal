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

    website: {
      type: String,
    },

    description: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "companies",
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;