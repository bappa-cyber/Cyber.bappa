const express = require("express");
const router = express.Router();

const User = require("../models/user");

// Register
router.post("/register", async (req, res) => {

  const user = new User(req.body);
  await user.save();

  res.json({ message: "Registered" });
});

// Login
router.post("/login", async (req, res) => {

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (!user) {
    return res.json({ message: "Invalid login" });
  }

  res.json(user);
});

module.exports = router;
