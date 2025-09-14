const express = require('express');
const router = express.Router();
const generateText = require('../services/generateText');
const generateImage = require('../services/generateImage');
const createPDF = require('../services/createPDF');

router.post('/create', async (req, res) => {
  try {
    const { story, child_name, child_appearance, style, child_photo_url } = req.body;

    // 1. Replace hero name in story text
    const storyTextPages = await generateText(story, child_name);

    // 2. Generate illustrations (array of image paths)
    const illustrations = await generateImage(storyTextPages, child_appearance, style, child_photo_url);

    // 3. Create A4 PDF combining text + illustrations
    const pdfPath = await createPDF(storyTextPages, illustrations);

    res.json({ pdf_url: `https://mongol-story-backend.onrender.com/${pdfPath}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
