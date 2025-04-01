// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const newAdmissionRoutes = require('./routes/newAdmissionRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Import the admin routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminAuthRoutes"));
app.use("/api", newAdmissionRoutes); // Mount the new admission routes under /api
app.use('/api/admin', adminRoutes); // Mount the admin routes
app.use("/api", adminRoutes);
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Prevent Port Conflict
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});