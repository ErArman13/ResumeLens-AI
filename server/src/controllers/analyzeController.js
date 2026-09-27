const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResume } = require("../services/geminiService");

const getHealth = (req, res) => {
  res.json({ message: "Server is running" });
};

/**
 * Analyze resume controller
 * POST /api/analyze
 *
 * Accepts multipart/form-data with:
 * - resume: PDF file
 * - jobDescriptionText: text
 */
const analyzeResumeController = async (req, res) => {
  try {
    const resumeFile = req.file;
    const { jobDescriptionText } = req.body;

    // Validate that the resume file was provided
    if (!resumeFile) {
      return res.status(400).json({
        error: "Resume file is required. Please upload a PDF file under the 'resume' field.",
      });
    }

    // Validate that jobDescriptionText exists and is not empty
    if (
      !jobDescriptionText ||
      typeof jobDescriptionText !== "string" ||
      jobDescriptionText.trim() === ""
    ) {
      return res.status(400).json({
        error: "jobDescriptionText is required and cannot be empty.",
      });
    }

    // Extract text from the uploaded PDF buffer via the PDF service
    let resumeText = "";
    try {
      resumeText = await extractTextFromPDF(resumeFile.buffer);
    } catch (pdfError) {
      console.error("PDF extraction error:", pdfError.message || pdfError);
      return res.status(400).json({
        error: "Invalid or corrupted PDF file. Please ensure you upload a valid PDF document.",
      });
    }

    // Validate that readable text was successfully extracted from the PDF
    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        error:
          "Unable to extract readable text from the uploaded PDF. Please ensure the PDF contains selectable text and is not an image-only scan or blank document.",
      });
    }

    // Send the extracted resume text and job description to Gemini service
    const result = await analyzeResume(resumeText.trim(), jobDescriptionText.trim());

    // Return the structured JSON response
    return res.json(result);
  } catch (error) {
    // Log error internally for debugging without exposing sensitive details or API keys
    console.error("Error analyzing resume:", error.message || error);

    const isHighDemand =
      error?.status === 503 ||
      (typeof error?.message === "string" && error.message.includes("503"));

    const errorMessage = isHighDemand
      ? "Google Gemini is currently experiencing a temporary demand spike. Please wait a few seconds and try again."
      : "Failed to analyze resume. Please try again.";

    return res.status(500).json({
      error: errorMessage,
    });
  }
};

module.exports = {
  getHealth,
  analyzeResumeController,
};
