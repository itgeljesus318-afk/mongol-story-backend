router.post("/create", async (req, res) => {
  try {
    console.log("📩 Request body:", req.body);

    const { childName, appearance } = req.body; // make sure JSON keys match

    if (!childName || !appearance) {
      return res.status(400).json({ error: "childName and appearance required" });
    }

    // fake response for testing first
    return res.json({ message: "Test success", childName, appearance });

  } catch (err) {
    console.error("❌ ERROR in /api/story/create:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});
