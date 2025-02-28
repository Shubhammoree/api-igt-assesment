const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  

/* create pdfs directory*/
const pdfDir = path.join(__dirname, "pdfs");
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
}

/**
 * generate-pdf
 */
app.post("/generate-pdf", (req, res) => {
    const data = req.body;
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const pdfPath = path.join(pdfDir, "output.pdf");
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    doc.fontSize(20).text(data.title || "Default Title", { align: "center" });
    doc.moveDown();
    
    doc.fontSize(14).text(`Name: ${data.name || "N/A"}`);
    doc.text(`Email: ${data.email || "N/A"}`);
    doc.text(`Phone: ${data.phone || "N/A"}`);
    doc.text(`Address: ${data.address || "N/A"}`);
    doc.moveDown();

    const imagePath = path.join(__dirname, "public/images/static-image.jpg");
    if (fs.existsSync(imagePath)) {
        doc.image(imagePath, { fit: [150, 150], align: "center" });
    } else {
        doc.fontSize(12).text("Image not found", { align: "center" });
    }

    doc.end();

    stream.on("finish", () => {
        res.json({ success: true, pdfPath: `/pdfs/output.pdf` });
    });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));


