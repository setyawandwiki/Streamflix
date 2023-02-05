const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["Name is required", true],
  },
  email: {
    type: String,
    required: ["Email is required", true],
    validate: [isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: ["Password is required", true],
    minLength: ["Minimum character 2", true],
    maxLength: ["Maximum character 10", true],
  },
  movie: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
