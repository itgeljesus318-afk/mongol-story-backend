const express = require("express");
const router = express.Router();
const generateText = require("../services/generateText");
const generateImage = require("../services/generateImage");
const createPDF = require("../services/createPDF");

router.post("/create", async (req, res) => {
  try {
    console.log("📩 Request body:", req.body);

    const { childName, appearance } = req.body;
    if (!childName || !appearance) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "childName and appearance required" });
    }

    // 1. generate story
    const story = await generateText(childName, appearance);
    console.log("✅ Story:", story);

    // 2. generate image
    const imagePath = await generateImage(childName, appearance);
    console.log("✅ Image saved at:", imagePath);

    // 3. generate PDF
    const pdfPath = await createPDF(childName, story, imagePath);
    console.log("✅ PDF created:", pdfPath);

    return res.json({
      message: "Story created successfully",
      pdfUrl: pdfPath
    });
  } catch (err) {
    console.error("❌ ERROR in /api/story/create:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

module.exports = router;
