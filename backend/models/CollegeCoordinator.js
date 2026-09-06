const mongoose = require("mongoose");

const collegeCoordinatorSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
    },

    name: {
      type: String,
    },

    department: {
      type: String,
    },
  },
  {
    collection: "collagecoordinator",
  }
);

const CollegeCoordinator = mongoose.model(
  "CollegeCoordinator",
  collegeCoordinatorSchema
);

module.exports = CollegeCoordinator;