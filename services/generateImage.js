// services/generateImage.js
const path = require("path");
const fs = require("fs");

const generateImage = async (childName) => {
  const dir = path.join(__dirname, "../temp");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const placeholderPath = path.join(dir, "placeholder.png");

  // Create a blank placeholder image if it doesn't exist
  if (!fs.existsSync(placeholderPath)) {
    const emptyBuffer = Buffer.alloc(1024); // small empty file
    fs.writeFileSync(placeholderPath, emptyBuffer);
  }

  return placeholderPath;
};

module.exports = generateImage;
