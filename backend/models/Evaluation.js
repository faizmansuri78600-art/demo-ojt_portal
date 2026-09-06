const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    assignedOjtId: {
      type: String,
      required: true,
    },

    evaluatedByFacultyId: {
      type: String,
    },

    evaluatedByCoordinatorId: {
      type: String,
    },

    hoursMarks: {
      type: Number,
    },

    performanceMarks: {
      type: Number,
    },

    punctualityMarks: {
      type: Number,
    },

    weeklyReportMarks: {
      type: Number,
    },

    finalReportMarks: {
      type: Number,
    },

    vivaMarks: {
      type: Number,
    },

    totalMarks: {
      type: Number,
    },

    evaluatedOn: {
      type: String,
    },
  },
  {
    collection: "evaluation",
  }
);

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;