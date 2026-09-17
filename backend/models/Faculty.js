const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
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

    designation: {
      type: String,
    },
  },
  {
    collection: "faculty",
  }
);

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;