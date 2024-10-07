// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    deleteUser
} = require('../controllers/userController');

// Get user profile by ID
router.get('/:id', getUserProfile);

// Update user profile
router.put('/:id', updateUserProfile);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;
