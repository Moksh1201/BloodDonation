const express = require('express');
const router = express.Router();
const {
    createRecipient,
    getRecipientById,
    updateRecipient,
    deleteRecipient,
    getAllRecipients
} = require('../controllers/recipientController');

// Create a new recipient
router.post('/', createRecipient);

// Get recipient by ID
router.get('/:id', getRecipientById);

// Update recipient by ID
router.put('/:id', updateRecipient);

// Delete recipient by ID
router.delete('/:id', deleteRecipient);

// Get all recipients
router.get('/', getAllRecipients);

module.exports = router;
