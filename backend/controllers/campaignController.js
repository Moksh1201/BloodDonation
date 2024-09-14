const { Campaign } = require('../models');

// Create a new campaign
const createCampaign = async (req, res) => {
    try {
        const { title, description, location, date, organizerId } = req.body;

        // Validate input
        if (!title || !description || !location || !date || !organizerId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCampaign = await Campaign.create({ title, description, location, date, organizerId });
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

// Get a campaign by ID
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

// Update a campaign
const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, date, status } = req.body;

        const campaign = await Campaign.findByPk(id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        const updatedCampaign = await campaign.update({ title, description, location, date, status });
        res.status(200).json(updatedCampaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update campaign' });
    }
};

// Delete a campaign
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

// Export functions
module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
};
