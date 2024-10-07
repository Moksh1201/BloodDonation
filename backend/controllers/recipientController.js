const { Recipient } = require('../models');
const { validateRecipientData } = require('../utils/validation');

// Create a new recipient
const createRecipient = async (req, res) => {
    try {
        const { name, bloodType, contactInfo, address, campaignId } = req.body;

        // Validate recipient data
        const validationResult = validateRecipientData({ name, bloodType, contactInfo, address, campaignId });
        if (!validationResult.isValid) {
            return res.status(400).json({ errors: validationResult.errors });
        }

        const newRecipient = await Recipient.create({
            name,
            bloodType,
            contactInfo,
            address,
            campaignId
        });

        res.status(201).json(newRecipient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create recipient' });
    }
};

// Get a recipient by ID
const getRecipientById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        res.status(200).json(recipient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve recipient' });
    }
};

// Get all recipients
const getAllRecipients = async (req, res) => {
    try {
        const recipients = await Recipient.findAll();
        res.status(200).json(recipients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve recipients' });
    }
};

// Update a recipient by ID
const updateRecipient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, bloodType, contactInfo, address, campaignId } = req.body;

        const recipient = await Recipient.findByPk(id);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Validate recipient data
        const validationResult = validateRecipientData({ name, bloodType, contactInfo, address, campaignId });
        if (!validationResult.isValid) {
            return res.status(400).json({ errors: validationResult.errors });
        }

        const updatedRecipient = await recipient.update({
            name,
            bloodType,
            contactInfo,
            address,
            campaignId
        });

        res.status(200).json(updatedRecipient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update recipient' });
    }
};

// Delete a recipient by ID
const deleteRecipient = async (req, res) => {
    try {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        await recipient.destroy();
        res.status(200).json({ message: 'Recipient deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete recipient' });
    }
};

// Export the functions
module.exports = {
    createRecipient,
    getRecipientById,
    getAllRecipients,
    updateRecipient,
    deleteRecipient
};
