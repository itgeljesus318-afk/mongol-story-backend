const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ✅ Middleware must come BEFORE routes
app.use(cors());
app.use(bodyParser.json());     // parse JSON bodies
app.use(express.json());        // extra safety

// routes
const storyRoutes = require("./routes/story");
app.use("/api/story", storyRoutes);

app.get("/", (req, res) => {
  res.send("✅ Mongolian Story Backend is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
