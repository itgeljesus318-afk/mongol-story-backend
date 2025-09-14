const path = require("path");
const fs = require("fs");

const generateImage = async (childName) => {
  const dir = path.join(__dirname, "../temp");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const placeholderPath = path.join(dir, "placeholder.png");

  // Create a tiny empty file if it doesn't exist
  if (!fs.existsSync(placeholderPath)) fs.writeFileSync(placeholderPath, "");

  return placeholderPath;
};

module.exports = generateImage;
