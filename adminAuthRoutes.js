// routes/adminAuthRoutes.js
const express = require('express');
const router = express.Router();
const adminSignupController = require('../controllers/adminSignupController'); // Updated import

router.post('/signup', adminSignupController.registerAdmin);
router.post('/login', adminSignupController.loginAdmin);

module.exports = router;