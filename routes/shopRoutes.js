const express = require("express");
const router = express.Router();

const Shop = require("../models/shop");

// Distance function
function getDistance(lat1, lng1, lat2, lng2) {
  return Math.sqrt(
    Math.pow(lat1 - lat2, 2) +
    Math.pow(lng1 - lng2, 2)
  );
}

// Find nearest shop
router.post("/nearest", async (req, res) => {

  const { lat, lng } = req.body;

  const shops = await Shop.find();

  let nearest = null;
  let minDist = Infinity;

  shops.forEach(shop => {
    let dist = getDistance(lat, lng, shop.lat, shop.lng);

    if (dist < minDist) {
      minDist = dist;
      nearest = shop;
    }
  });

  res.json(nearest);
});

module.exports = router;
