const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Routes for admission data
router.get("/admissions", adminController.getAllAdmissions);
router.delete("/admissions/:id", adminController.deleteAdmission);

// Routes for student login requests
router.get("/login-requests", adminController.getAllLoginRequests);
router.post("/approve-login", adminController.approveLoginRequest);
router.post("/deny-login", adminController.denyLoginRequest);

// Fetch all approved students
router.get("/students", adminController.getAllStudents);

// ✅ Delete student by ID (Using adminController)
router.delete("/students/:id", adminController.deleteStudent);

module.exports = router;
