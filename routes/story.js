const express = require("express");
const router = express.Router();
const generateText = require("../services/generateText");
const generateImage = require("../services/generateImage");
const createPDF = require("../services/createPDF");

router.post("/create", async (req, res) => {
  try {
    const { childName, appearance, story } = req.body;

    // Generate story text (placeholder)
    const storyText = await generateText(childName, story);

    // Generate image (placeholder)
    const imagePath = await generateImage(childName);

    // Generate PDF
    const pdfPath = await createPDF(childName, storyText, imagePath);

    return res.json({
      message: "Story created successfully",
      pdfUrl: `https://<your-backend-url>/temp/story-${childName}.pdf`
    });
  } catch (err) {
    console.error("❌ ERROR in /api/story/create:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

module.exports = router;
