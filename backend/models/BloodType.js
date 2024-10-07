// models/bloodType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig'); // Import your Sequelize instance

const BloodType = sequelize.define('BloodType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [1, 5],
                msg: 'Blood type must be between 1 and 5 characters.'
            }
        }
    }
}, {
    timestamps: true
});

module.exports = BloodType;
