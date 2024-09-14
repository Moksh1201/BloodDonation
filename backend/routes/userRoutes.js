const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    updateUserPreferences,
    getUserCampaigns,
    deleteUser
} = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user profile by ID
router.get('/profile/:id', getUserProfile);

// Update user profile
router.put('/profile/:id', updateUserProfile);

// Update user preferences
router.put('/preferences/:id', updateUserPreferences);

// Get a list of campaigns for a user
router.get('/campaigns/:id', getUserCampaigns);

// Delete a user
router.delete('/profile/:id', deleteUser);

module.exports = router;
