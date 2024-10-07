const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path based on your project structure

class Recipient extends Model {}

Recipient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bloodType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactInfo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        campaignId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Campaigns', // Adjust to your campaign model name
                key: 'id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Recipient',
        tableName: 'recipients',
        timestamps: true,
        underscored: true, // If you prefer snake_case for column names
    }
);

// Export the model
module.exports = Recipient;
