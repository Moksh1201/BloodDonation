const express = require('express');
const { createBloodHistory, getBloodHistoryByUserId, getAllBloodHistory } = require('../controllers/bloodHistoryController');

const router = express.Router();

// Create a new blood history record
router.post('/', createBloodHistory);

// Get blood history by user ID
router.get('/:user_id', getBloodHistoryByUserId);

// Get all blood history records (admin view)
router.get('/', getAllBloodHistory);

module.exports = router;
