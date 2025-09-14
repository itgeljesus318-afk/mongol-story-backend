// services/generateImage.js
const fs = require("fs");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (childName, appearance, style) => {
  const prompt = `Hand-painted watercolor, classic Mongolian folk tale, A4, featuring a Mongolian child ${appearance}, ${style}`;
  
  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt: prompt,
    size: "1024x1024"
  });

  const imageBase64 = result.data[0].b64_json;
  const buffer = Buffer.from(imageBase64, "base64");

  const dir = path.join(__dirname, "../temp");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const imagePath = path.join(dir, `${childName}.png`);
  fs.writeFileSync(imagePath, buffer);

  return imagePath;
};

module.exports = generateImage;
