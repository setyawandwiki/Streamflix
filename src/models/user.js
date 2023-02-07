const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "invalid email"],
    unique: [true, "User already exist"],
  },
  password: {
    type: String,
    required: [true, "Name is required"],
  },
  money: {
    type: Number,
    default: 100000,
  },
  movie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
