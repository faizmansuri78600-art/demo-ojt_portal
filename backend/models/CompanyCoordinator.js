const mongoose = require("mongoose");

const companyCoordinatorSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String },
    companyId: { type: String },
    name: { type: String },
    designation: { type: String },
  },
  {
    collection: "companycoordinator",
  }
);

const CompanyCoordinator = mongoose.model(
  "CompanyCoordinator",
  companyCoordinatorSchema
);

module.exports = CompanyCoordinator;