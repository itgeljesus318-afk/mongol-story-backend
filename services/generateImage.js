const path = require("path");
const fs = require("fs");

const generateImage = async (childName) => {
  const dir = path.join(__dirname, "../temp");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // Use a real placeholder image
  const placeholderPath = path.join(dir, "placeholder.png");

  // If you want, you can copy the placeholder for each child
  const childImagePath = path.join(dir, `${childName}.png`);
  if (!fs.existsSync(childImagePath)) {
    fs.copyFileSync(placeholderPath, childImagePath);
  }

  return childImagePath;
};

module.exports = generateImage;
