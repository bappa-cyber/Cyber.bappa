const express = require("express");
const router = express.Router();

const Order = require("../models/order");

// Create Order
router.post("/", async (req, res) => {

  const order = new Order({
    product: req.body.product,
    location: req.body.location,
    status: "Pending"
  });

  await order.save();

  req.app.get("io").emit("newOrder", order);

  res.json(order);
});

// Get Orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update Order
router.put("/:id", async (req, res) => {

  let order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  req.app.get("io").emit("updateOrder", order);

  res.json(order);
});

module.exports = router;
