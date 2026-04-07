const express = require("express");          // Express import
const cors = require("cors");                // Cross origin allow
const app = express();
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const http = require("http").createServer(app);   // HTTP server
const io = require("socket.io")(http, {
  cors: { origin: "*" }                      // All allow (dev mode)
});

app.use(cors());                             // Enable CORS
app.use(express.json());                     // JSON support

const mongoose = require("mongoose");

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/shoppingMall", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));
// Socket access globally
app.set("io", io);

// Routes import
const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

const shopRoutes = require("./routes/shopRoutes");
app.use("/shops", shopRoutes);
// Socket setup
require("./socket/socket")(io);

// Start server
http.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
