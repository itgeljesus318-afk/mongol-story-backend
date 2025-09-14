// services/generateImage.js
const fs = require("fs");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (childName, appearance, style, pageNumber = 1) => {
  try {
    const prompt = `Hand-painted watercolor, classic Mongolian folk tale, A4, featuring a Mongolian child ${appearance}, ${style}, story page ${pageNumber}`;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    });

    const imageBase64 = result.data[0].b64_json;
    const imageBuffer = Buffer.from(imageBase64, "base64");

    const imageDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

    const imagePath = path.join(imageDir, `page_${pageNumber}.png`);
    fs.writeFileSync(imagePath, imageBuffer);

    return imagePath;
  } catch (err) {
    console.error("❌ Error generating image:", err);
    throw err;
  }
};

module.exports = generateImage;
