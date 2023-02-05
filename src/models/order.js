const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  statusPayment: {
    type: String,
    default: "Success",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
