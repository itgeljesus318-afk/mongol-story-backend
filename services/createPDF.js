const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

const createPDF = async (textPages, imagePaths) => {
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < textPages.length; i++) {
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 in points
    const imageBytes = fs.readFileSync(imagePaths[i]);
    const pngImage = await pdfDoc.embedPng(imageBytes);

    const { width, height } = pngImage.scale(0.7);
    page.drawImage(pngImage, { x: 50, y: 250, width, height });

    page.drawText(textPages[i], {
      x: 50,
      y: 200,
      size: 14,
      color: rgb(0, 0, 0),
      maxWidth: 495
    });
  }

  const pdfBytes = await pdfDoc.save();
  const pdfPath = `temp/personalized_story_${Date.now()}.pdf`;
  fs.writeFileSync(pdfPath, pdfBytes);

  return pdfPath;
};

module.exports = createPDF;
