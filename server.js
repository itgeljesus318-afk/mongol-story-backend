const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// initialize express first ✅
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// health check route
app.get("/", (req, res) => {
  res.send("✅ Mongolian Story Backend is running!");
});

// routes
const storyRoutes = require("./routes/story");
app.use("/api/story", storyRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
