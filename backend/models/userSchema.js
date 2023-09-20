const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name 🫡"],
    maxLength: [40, "Name cannot exceed 40 characters."],
    minLength: [4, "Name should have more than 4 character."],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email 🫡"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password 🙈"],
    minLength: [8, "Password should be grate than 4 characters."],
    select: false,
  },

  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//ComparePassword

userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcryptjs.compare(enterdPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
