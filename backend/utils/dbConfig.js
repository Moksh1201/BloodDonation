// dbconfig.js

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance for connecting to the PostgreSQL database
const sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database user
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST, // Database host, e.g., 'localhost'
        dialect: 'postgres',
        port: process.env.DB_PORT, // Database port, e.g., 5432
        logging: false, // Disable logging; set to true for SQL query logs
        pool: {
            max: 5, // Maximum number of connection in pool
            min: 0, // Minimum number of connection in pool
            acquire: 30000, // The maximum time (in milliseconds) that pool will try to get connection before throwing error
            idle: 10000 // The maximum time (in milliseconds) that a connection can be idle before being released
        }
    }
);

// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

module.exports = sequelize;
