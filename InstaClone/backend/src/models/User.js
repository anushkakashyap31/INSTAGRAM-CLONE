const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    },
    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ]
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
