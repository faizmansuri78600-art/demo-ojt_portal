const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  rollNumber: { type: String },
  department: { type: String },
  // ...keep any other existing fields you already have
}, { strict: false }); // strict:false so it doesn't break if student has more fields

module.exports = mongoose.model("Student", studentSchema, "student");