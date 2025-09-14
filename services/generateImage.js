const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');

const generateImage = async (pages, child_appearance, style, child_photo_url) => {
  const images = [];

  for (let i = 0; i < pages.length; i++) {
    const prompt = `Hand-painted watercolor, classic Mongolian folk tale style, A4 full-page illustration, featuring a Mongolian child ${child_appearance}, ${style} style, scene of story page ${i + 1}`;
    
    // Example using hypothetical AI API call
    const response = await axios.post('https://ai-image-api.com/generate', {
      prompt: prompt,
      photo_url: child_photo_url
    });

    const imageBuffer = Buffer.from(response.data.image, 'base64');
    const imagePath = `temp/page_${i+1}.png`;
    await sharp(imageBuffer).toFile(imagePath);
    images.push(imagePath);
  }

  return images; // array of image file paths
};

module.exports = generateImage;