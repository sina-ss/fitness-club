const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users-model')
const Course = require('./courses-model')
const sequelize = new Sequelize('gym_management_system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const RegisteredCourse = sequelize.define('RegisteredCourse', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    attended: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: false
});

RegisteredCourse.belongsTo(User, { foreignKey: 'memberId', as: 'member' });
RegisteredCourse.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
User.hasMany(RegisteredCourse, { foreignKey: 'memberId', as: 'registeredCourses' });
Course.hasMany(RegisteredCourse, { foreignKey: 'courseId', as: 'registeredCourses' });

module.exports = RegisteredCourse;