const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    assignedOjtId: {
      type: String,
      ref: "AssignOjt",
    },

    evaluatedByFacultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },

    evaluatedByCoordinatorId: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: Date,
    },
  },
  {
    collection: "evaluation",
  }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);