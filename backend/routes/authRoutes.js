// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

module.exports = router;
