const { Campaign, User, Admin, BloodHistory } = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { validateCampaignData, validateUserUpdate } = require('../utils/validation');

// Helper function to verify JWT token and get user data
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
};

// Admin actions

// Create a new campaign
const createCampaign = async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;

        // Validate campaign data
        const validationResult = validateCampaignData({ title, description, startDate, endDate });
        if (!validationResult.isValid) {
            return res.status(400).json({ errors: validationResult.errors });
        }

        const newCampaign = await Campaign.create({ title, description, startDate, endDate });
        res.status(201).json(newCampaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create campaign' });
    }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.findAll();
        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve campaigns' });
    }
};

// Get a specific campaign by ID
const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findByPk(id);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        res.status(200).json(campaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve campaign' });
    }
};

// Update a specific campaign
const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, startDate, endDate } = req.body;

        const campaign = await Campaign.findByPk(id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        // Validate campaign data
        const validationResult = validateCampaignData({ title, description, startDate, endDate });
        if (!validationResult.isValid) {
            return res.status(400).json({ errors: validationResult.errors });
        }

        const updatedCampaign = await campaign.update({ title, description, startDate, endDate });
        res.status(200).json(updatedCampaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update campaign' });
    }
};

// Delete a specific campaign
const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findByPk(id);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        await campaign.destroy();
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete campaign' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

// View donation and reception history of all users
const getBloodHistory = async (req, res) => {
    try {
        const bloodHistory = await BloodHistory.findAll({
            include: [User]  // Include user information with blood history
        });
        res.status(200).json(bloodHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve blood history' });
    }
};

// Export the functions
module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    getAllUsers,
    deleteUser,
    getBloodHistory
};
