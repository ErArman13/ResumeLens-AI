const { GoogleGenAI } = require("@google/genai");

// Initialize Gemini client 
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

module.exports = ai;
