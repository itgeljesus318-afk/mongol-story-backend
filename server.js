app.get("/", (req, res) => {
  res.send("✅ Mongolian Story Backend is running!");
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const storyRoute = require('./routes/story');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/story', storyRoute);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
