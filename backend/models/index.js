const { Sequelize } = require('sequelize');
const sequelize = require('../utils/dbConfig');

// Import models
const User = require('./User');
const Campaign = require('./Campaign');

// Set up associations if needed
User.hasMany(Campaign, { foreignKey: 'organizerId' });
Campaign.belongsTo(User, { foreignKey: 'organizerId' });

module.exports = {
    User,
    Campaign,
    sequelize
};
