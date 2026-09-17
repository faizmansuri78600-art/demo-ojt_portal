const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    companyId: {
      type: String,
    },

    createdByCoordinatorId: {
      type: String,
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    department: {
      type: String,
    },

    duration: {
      type: String,
    },

    location: {
      type: String,
    },

    stipend: {
      type: Number,
    },

    vacancies: {
      type: Number,
    },

    lastDate: {
      type: String,
    },

    skillsRequired: {
      type: String,
    },

    eligibility: {
      type: String,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
    },

    postedOn: {
      type: String,
    },
  },
  {
    collection: "ojtopportunities",
  }
);

const Opportunity = mongoose.model(
  "Opportunity",
  opportunitySchema
);

module.exports = Opportunity;