const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const createPDF = async (childName, storyText, imagePath) => {
  return new Promise((resolve, reject) => {
    try {
      const tempDir = path.join(__dirname, "../temp");
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

      const pdfPath = path.join(tempDir, `story-${childName}.pdf`);
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      // Add title
      doc.fontSize(24).text(`Story for ${childName}`, { align: "center" });
      doc.moveDown();

      // Add story text
      doc.fontSize(14).text(storyText, { align: "left" });
      doc.moveDown();

      // Add image if exists
      if (fs.existsSync(imagePath)) {
        doc.image(imagePath, { fit: [400, 400], align: "center" });
      }

      doc.end();

      stream.on("finish", () => {
        resolve(pdfPath);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = createPDF;
