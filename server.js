const express = require("express");
const cors = require("cors");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// MongoDB
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://haldarriya128_db_user:iQRlz28mVuzuMlL1@cluster0.dgn59uv.mongodb.net/shoppingMall")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Socket
app.set("io", io);
require("./socket/socket")(io);

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

const shopRoutes = require("./routes/shopRoutes");
app.use("/shops", shopRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend Running");
});

// PORT FIX
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log("🚀 Server running");
});
