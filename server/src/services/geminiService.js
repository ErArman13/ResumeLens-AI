const ai = require("../config/gemini");

// Define the response schema to guarantee structured JSON output
const analysisSchema = {
  type: "object",
  properties: {
    skillGaps: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "List of technical skills required by the job that are missing or insufficiently demonstrated in the candidate's resume.",
    },
    interviewQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "The technical interview question text.",
          },
          topic: {
            type: "string",
            description: "The technical topic or skill category the question assesses.",
          },
        },
        required: ["question", "topic"],
      },
      description:
        "List of relevant technical interview questions based on the job requirements and identified skill gaps.",
    },
  },
  required: ["skillGaps", "interviewQuestions"],
};

/**
 * Analyzes candidate resume against a job description using Gemini.
 * Acts as an expert technical recruiter to identify missing/insufficient skills
 * and formulate targeted interview questions without making hiring decisions.
 *
 * @param {string} resumeText
 * @param {string} jobDescriptionText
 * @returns {Promise<object>} Parsed structured JSON analysis
 */
const analyzeResume = async (resumeText, jobDescriptionText) => {
  const prompt = `You are an expert technical recruiter.

Compare the following candidate resume against the target job description.

Your task:
1. Identify technical skills required by the job description that are missing from the resume.
2. Identify technical skills that are mentioned in the resume but are insufficiently demonstrated based on the job requirements.
3. Formulate relevant technical interview questions based on the job requirements and identified skill gaps to assess the candidate's capabilities.

Important Instructions:
- Do NOT make any hiring decisions or provide an overall hiring verdict.
- Focus strictly on technical skills and relevant technical interview questions.

--- CANDIDATE RESUME ---
${resumeText}

--- TARGET JOB DESCRIPTION ---
${jobDescriptionText}
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
    },
  });

  // Parse the structured JSON response into a JavaScript object
  const parsedResult = JSON.parse(response.text);
  return parsedResult;
};

module.exports = {
  analyzeResume,
};
