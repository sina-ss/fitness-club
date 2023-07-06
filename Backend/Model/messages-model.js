const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('gym_management_system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Message = sequelize.define('Message', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    senderUsername: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    receiverUsername: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = Message;