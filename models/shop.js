const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: String,
  locationName: String,   // East / West
  lat: Number,
  lng: Number,
  products: [String]
});

module.exports = mongoose.model("Shop", shopSchema);
