const express = require('express');
const router = express.Router();
const { 
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaignController');

// Create a new campaign
router.post('/', createCampaign);

// Get all campaigns
router.get('/', getAllCampaigns);

// Get a campaign by ID
router.get('/:id', getCampaignById);

// Update a campaign
router.put('/:id', updateCampaign);

// Delete a campaign
router.delete('/:id', deleteCampaign);

module.exports = router;
