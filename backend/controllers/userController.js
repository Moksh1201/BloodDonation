const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserRegistration, validateUserUpdate } = require('../utils/validation');

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate user data
        const validationResult = validateUserRegistration({ name, email, password, role });
        if (!validationResult.isValid) {
            return res.status(400).json({ errors: validationResult.errors });
        }

        // Check if user with the same name already exists
        const existingUserByName = await User.findOne({ where: { name } });
        if (existingUserByName) {
            return res.status(400).json({ message: 'Name is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword, role });
        const token = generateToken(newUser);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

// User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to log in' });
    }
};

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
        const { name, email, password, bio, phoneNumber, address } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate user data
        const validationResult = validateUserUpdate({ name, email, password, bio, phoneNumber, address });
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
            bio, 
            phoneNumber, 
            address 
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user profile' });
    }
};

// Update user preferences
const updateUserPreferences = async (req, res) => {
    try {
        const { id } = req.params;
        const { preference } = req.body;

        // Validate preference
        if (!['donate', 'receive'].includes(preference)) {
            return res.status(400).json({ message: 'Invalid preference' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update preference
        const updatedUser = await user.update({ preference });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update preferences' });
    }
};

// Get a list of campaigns for a user
const getUserCampaigns = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const campaigns = await Campaign.findAll({ where: { userId: id } });
        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user campaigns' });
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

// Export the functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    updateUserPreferences,
    getUserCampaigns,
    deleteUser
};
