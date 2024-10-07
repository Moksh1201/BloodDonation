// controllers/userController.js
const { User } = require('../models/User');
const { validateUserUpdate } = require('../utils/validation');
const bcrypt = require('bcrypt');

// Get user profile by ID
const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user profile' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, bio } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate user data
        const validationResult = validateUserUpdate({ name, email, password, bio });
        if (!validationResult.isValid) {
            return res.status(400).json({ errors: validationResult.errors });
        }

        // Check if the new name is already taken
        if (name && name !== user.name) {
            const existingUserByName = await User.findOne({ where: { name } });
            if (existingUserByName) {
                return res.status(400).json({ message: 'Name is already taken' });
            }
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        const updatedUser = await user.update({ 
            name, 
            email, 
            password: hashedPassword, 
            bio 
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user profile' });
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

module.exports = {
    getUserProfile,
    updateUserProfile,
    deleteUser
};
