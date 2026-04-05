const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect("mongodb+srv://haldarriya128_db_user:iQRlz28mVuzuMlL1@cluster0.dgn59uv.mongodb.net/?appName=Cluster0");

// Schema
const User = mongoose.model("User", {
  name: String,
  email: String
});

// static folder serve
app.use(express.static(path.join(__dirname, "public")));
// API
app.post("/save", async (req, res) => {
  const { name, email } = req.body;

  const newUser = new User({ name, email });
  await newUser.save();

  res.send("Data Saved");
});

app.listen(3000, () => console.log("Server running"));
