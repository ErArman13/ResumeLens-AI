const multer = require("multer");
const path = require("path");

// Configure in-memory storage to prevent saving resumes to disk
const storage = multer.memoryStorage();

// File filter to only accept PDF files and reject images, docs, and arbitrary files
const fileFilter = (req, file, cb) => {
  const isPdfMime = file.mimetype === "application/pdf";
  const isPdfExt = path.extname(file.originalname).toLowerCase() === ".pdf";

  if (isPdfMime && isPdfExt) {
    cb(null, true);
  } else {
    const error = new Error(
      "Only PDF files are allowed. Please upload a valid .pdf file."
    );
    error.code = "INVALID_FILE_TYPE";
    cb(error, false);
  }
};

// Initialize Multer with memory storage, 10MB limit, and PDF file filter
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter,
});

/**
 * Middleware wrapper for single PDF upload on field 'resume'.
 * Catches Multer errors (invalid file type, limit exceed) and returns HTTP 400.
 */
const uploadResumeMiddleware = (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({ error: err.message });
      }

      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            error: "File size exceeds the 10MB limit. Please upload a smaller PDF.",
          });
        }
        return res.status(400).json({
          error: `File upload error: ${err.message}`,
        });
      }

      return res.status(400).json({
        error: err.message || "Failed to process uploaded file",
      });
    }

    next();
  });
};

module.exports = {
  uploadResumeMiddleware,
};
