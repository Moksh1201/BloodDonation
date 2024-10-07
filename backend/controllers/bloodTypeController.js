const { BloodType } = require('../models'); // Assuming you have a BloodType model

// Create a new blood type
const createBloodType = async (req, res) => {
    try {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ message: 'Blood type is required' });
        }

        const existingBloodType = await BloodType.findOne({ where: { type } });
        if (existingBloodType) {
            return res.status(400).json({ message: 'Blood type already exists' });
        }

        const newBloodType = await BloodType.create({ type });
        res.status(201).json(newBloodType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create blood type' });
    }
};

// Get all blood types
const getAllBloodTypes = async (req, res) => {
    try {
        const bloodTypes = await BloodType.findAll();
        res.status(200).json(bloodTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve blood types' });
    }
};

// Get blood type by ID
const getBloodTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const bloodType = await BloodType.findByPk(id);

        if (!bloodType) {
            return res.status(404).json({ message: 'Blood type not found' });
        }

        res.status(200).json(bloodType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve blood type' });
    }
};

// Update blood type by ID
const updateBloodType = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ message: 'Blood type is required' });
        }

        const bloodType = await BloodType.findByPk(id);
        if (!bloodType) {
            return res.status(404).json({ message: 'Blood type not found' });
        }

        await bloodType.update({ type });
        res.status(200).json(bloodType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update blood type' });
    }
};

// Delete blood type by ID
const deleteBloodType = async (req, res) => {
    try {
        const { id } = req.params;
        const bloodType = await BloodType.findByPk(id);

        if (!bloodType) {
            return res.status(404).json({ message: 'Blood type not found' });
        }

        await bloodType.destroy();
        res.status(200).json({ message: 'Blood type deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete blood type' });
    }
};

// Export the functions
module.exports = {
    createBloodType,
    getAllBloodTypes,
    getBloodTypeById,
    updateBloodType,
    deleteBloodType
};
