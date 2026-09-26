// Load environment variables before importing app components
require("dotenv").config();

const app = require("./app");

// Use PORT from environment variables with 5001 as default
const PORT = process.env.PORT || 5001;

// Start the HTTP server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
