const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const storyRoutes = require("./routes/story");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/story", storyRoutes);

// Serve temp folder for PDFs
app.use("/temp", express.static("temp"));

app.get("/", (req, res) => {
  res.send("✅ Mongolian Story Backend is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
