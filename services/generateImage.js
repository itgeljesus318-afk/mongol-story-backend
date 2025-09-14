// services/generateImage.js
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // set this in Render environment variables
});
const openai = new OpenAIApi(configuration);

const generateImage = async (pages, childAppearance, style, childPhotoUrl) => {
  const images = [];

  for (let i = 0; i < pages.length; i++) {
    const prompt = `Hand-painted watercolor, classic Mongolian folk tale, A4, featuring a Mongolian child ${childAppearance}, ${style}, scene of story page ${i + 1}`;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    });

    const imageBase64 = result.data[0].b64_json;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    const imagePath = `temp/page_${i + 1}.png`;
    fs.writeFileSync(imagePath, imageBuffer);
    images.push(imagePath);
  }

  return images;
};

module.exports = generateImage;
