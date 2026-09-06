const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Existing User ID
    _id: {
      type: String,
      required: true,
    },

    // User Name
    name: {
      type: String,
      default: "",
    },

    // Email
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Password is stored as hashed password
    passwordHash: {
      type: String,
      required: true,
    },

    // User Role
    role: {
      type: String,
      required: true,
    },

    // Phone Number
    phone: {
      type: String,
      default: "",
    },

    // Account Status
    status: {
      type: String,
      default: "Active",
    },

    // Account Creation Date
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;