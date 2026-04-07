const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: String,
  location: String,
  status: String
});

module.exports = mongoose.model("Order", orderSchema);
