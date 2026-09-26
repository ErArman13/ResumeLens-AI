const { getDocumentProxy, extractText } = require("unpdf");

/**
 * PDF Text Extraction Service
 *
 * Responsibility:
 * PDF Buffer -> extract text -> return resumeText
 *
 * @param {Buffer} pdfBuffer - The in-memory buffer of the uploaded PDF file
 * @returns {Promise<string>} - Extracted text content from the PDF
 */
const extractTextFromPDF = async (pdfBuffer) => {
  if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer) || pdfBuffer.length === 0) {
    throw new Error("Invalid or empty PDF buffer provided");
  }

  // Convert Node.js Buffer to Uint8Array for unpdf processing
  const uint8Array = new Uint8Array(pdfBuffer);

  // Load the PDF document
  const pdfDocument = await getDocumentProxy(uint8Array);

  // Extract text with all pages merged into a single string
  const { text } = await extractText(pdfDocument, { mergePages: true });

  return text ? text.trim() : "";
};

module.exports = {
  extractTextFromPDF,
};
