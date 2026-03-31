const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 🔥 middleware (json data read করার জন্য)
app.use(express.json());

/* ================= DATABASE CONNECT ================= */

// ❗ এখানে তোমার MongoDB Atlas URL বসাবে
mongoose.connect("mongodb+srv://haldarriya128_db_user:iQRlz28mVuzuMlL1@cluster0.dgn59uv.mongodb.net/?appName=Cluster0")
.then(() => console.log("✅ Database connected"))
.catch(err => console.log("❌ DB error:", err));

/* ================= SCHEMA ================= */

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("User", UserSchema);

/* ================= ROUTES ================= */

// Home
app.get("/", (req, res) => {
  res.send("🔥 Backend Hero Running");
});

// POST → data save
app.post("/data", async (req, res) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);
    await newUser.save();

    res.send({
      message: "✅ Data saved successfully",
      data: newUser
    });

  } catch (error) {
    res.status(500).send("❌ Error saving data");
  }
});

// GET → সব user দেখাও
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("❌ Error fetching users");
  }
});

/* ================= SERVER ================= */

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
