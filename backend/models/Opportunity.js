const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    companyId: { type: String, required: true, ref: "Company" },
    createdByCoordinatorId: { type: String, ref: "CompanyCoordinator" },
    title: { type: String, required: true },
    description: { type: String },
    skillsRequired: { type: String },
    duration: { type: String },
    location: { type: String },
    isPaid: { type: Boolean, default: false },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
    postedOn: { type: Date, default: Date.now },
  },
  { collection: "ojtopportunities" }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
