const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupStudent);
router.post('/login', authController.loginStudent);

module.exports = router;