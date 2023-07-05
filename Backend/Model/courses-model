const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users-model')
const sequelize = new Sequelize('gym_management_system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Course = sequelize.define('Course', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    trainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false
});

Course.belongsTo(User, { foreignKey: 'trainerId', as: 'trainer' });
User.hasMany(Course, { foreignKey: 'trainerId', as: 'courses' });

module.exports = Course;