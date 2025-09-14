const path = require("path");
const fs = require("fs");

const generateImage = async (childName) => {
  const dir = path.join(__dirname, "../temp");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const placeholder = path.join(dir, "placeholder.png");
  // create an empty file if needed
  if (!fs.existsSync(placeholder)) fs.writeFileSync(placeholder, "");
  return placeholder;
};

module.exports = generateImage;
