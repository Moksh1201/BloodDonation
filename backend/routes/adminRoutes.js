const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Campaign routes
router.post('/campaigns', adminController.createCampaign);
router.get('/campaigns', adminController.getAllCampaigns);
router.get('/campaigns/:id', adminController.getCampaignById);
router.put('/campaigns/:id', adminController.updateCampaign);
router.delete('/campaigns/:id', adminController.deleteCampaign);

// User management routes
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

// Blood history route
router.get('/blood-history', adminController.getBloodHistory);

module.exports = router;
