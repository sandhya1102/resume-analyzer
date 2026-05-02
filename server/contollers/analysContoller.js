import mammoth from "mammoth";
import fs from "fs";
import {
  calculateScore,
  extractKeywords,
  generateSuggestions,
} from "../utils/resumeAnalyzer.js";

export const analyzeResumeFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    let text = "";

    // 📄 PDF
   if (file.mimetype === "application/pdf") {
  const dataBuffer = fs.readFileSync(file.path);

  const pdfParseModule = await import("pdf-parse");
  const pdfParse = pdfParseModule.default || pdfParseModule;

  const data = await pdfParse(dataBuffer);
  text = data.text;
}

    // 📄 DOCX
    else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({
        path: file.path,
      });
      text = data.value;
    }

    // 🧠 ANALYSIS LOGIC
    const score = calculateScore(text);
    const keywords = extractKeywords(text);
    const suggestions = generateSuggestions(text);

    res.status(200).json({
      success: true,
      score,
      keywords,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
