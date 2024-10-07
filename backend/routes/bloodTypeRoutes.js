// routes/bloodTypeRoutes.js
const express = require('express');
const router = express.Router();
const {
    createBloodType,
    getAllBloodTypes,
    getBloodTypeById,
    updateBloodType,
    deleteBloodType
} = require('../controllers/bloodTypeController');

// Create a new blood type
router.post('/', createBloodType);

// Get all blood types
router.get('/', getAllBloodTypes);

// Get a specific blood type by ID
router.get('/:id', getBloodTypeById);

// Update a blood type by ID
router.put('/:id', updateBloodType);

// Delete a blood type by ID
router.delete('/:id', deleteBloodType);

module.exports = router;
