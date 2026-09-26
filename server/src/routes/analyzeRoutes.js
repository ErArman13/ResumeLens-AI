const express = require("express");
const router = express.Router();
const {
  getHealth,
  analyzeResumeController,
} = require("../controllers/analyzeController");
const { uploadResumeMiddleware } = require("../middlewares/uploadMiddleware");

// Health check endpoint: GET /api/health
router.get("/health", getHealth);

// Resume analysis endpoint: POST /api/analyze (accepts multipart/form-data with 'resume' PDF and 'jobDescriptionText')
router.post("/analyze", uploadResumeMiddleware, analyzeResumeController);

module.exports = router;
