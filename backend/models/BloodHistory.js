const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/dbConfig');

class BloodHistory extends Model {}

BloodHistory.init({
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', 
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('donate', 'receive'),
        allowNull: false
    },
    doctor_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    campaign_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'campaigns',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: true
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'BloodHistory',
    timestamps: false // Avoid Sequelize adding 'updatedAt'
});

module.exports = BloodHistory;
