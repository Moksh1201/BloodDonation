const { BloodHistory, User, Campaign } = require('../models');

// Create a new blood history record
const createBloodHistory = async (req, res) => {
    try {
        const { user_id, action, doctor_name, campaign_id } = req.body;

        const newRecord = await BloodHistory.create({
            user_id,
            action,
            doctor_name,
            campaign_id,
        });

        res.status(201).json(newRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create blood history record' });
    }
};

// Get all blood history for a specific user
const getBloodHistoryByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        const history = await BloodHistory.findAll({
            where: { user_id },
            include: [
                { model: User, attributes: ['name'] },
                { model: Campaign, attributes: ['title'] }
            ]
        });

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve blood history' });
    }
};

// Get all blood history records (admin view)
const getAllBloodHistory = async (req, res) => {
    try {
        const history = await BloodHistory.findAll({
            include: [
                { model: User, attributes: ['name'] },
                { model: Campaign, attributes: ['title'] }
            ]
        });

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve blood history' });
    }
};

module.exports = {
    createBloodHistory,
    getBloodHistoryByUserId,
    getAllBloodHistory
};
